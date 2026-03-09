import { Worker, Job } from 'bullmq';
import { connection } from '../services/queue';
import { PrismaClient } from '@prisma/client';
import { sendWhatsAppMessage } from '../services/whatsapp';
import { generateAIResponse } from '../services/ai';
import dotenv from 'dotenv';
dotenv.config();

const prisma = new PrismaClient();

export const worker = new Worker('whatsapp-messages', async (job: Job) => {
    console.log(`Processing job ${job.id}`);
    const { message, contact, businessPhoneNumberId } = job.data;

    if (!message || !message.text) return; // Only process text messages for now
    const userMessage = message.text.body;
    const phoneNumber = contact?.wa_id || message.from;
    const name = contact?.profile?.name;

    // 1. Find the business by phone number ID
    const business = await prisma.business.findFirst({
        where: { waPhoneNumberId: businessPhoneNumberId },
        include: { rules: true }
    });

    if (!business || !business.waAccessToken) {
        console.log(`Business not found or access token missing for ${businessPhoneNumberId}`);
        return;
    }

    // 2. Find or Create Contact
    let dbContact = await prisma.contact.findFirst({
        where: { businessId: business.id, phoneNumber }
    });

    if (!dbContact) {
        dbContact = await prisma.contact.create({
            data: {
                businessId: business.id,
                phoneNumber,
                name
            }
        });
    } else {
        dbContact = await prisma.contact.update({
            where: { id: dbContact.id },
            data: { lastActive: new Date(), name: name || dbContact.name }
        });
    }

    // 3. Save User Message
    await prisma.message.create({
        data: {
            businessId: business.id,
            contactId: dbContact.id,
            content: userMessage,
            role: 'USER'
        }
    });

    // 4. Rule Engine Check
    let botReply = '';
    const matchedRule = business.rules.find((r: any) => userMessage.toLowerCase().includes(r.keyword.toLowerCase()));

    if (matchedRule) {
        botReply = matchedRule.response;
    } else {
        // 5. AI Generation
        const history = await prisma.message.findMany({
            where: { contactId: dbContact.id },
            orderBy: { createdAt: 'asc' },
            take: 10
        });

        botReply = await generateAIResponse(business.id, userMessage, history);
    }

    // 6. Send message back via WhatsApp
    await sendWhatsAppMessage(businessPhoneNumberId, business.waAccessToken, phoneNumber, botReply);

    // 7. Save Bot Message
    await prisma.message.create({
        data: {
            businessId: business.id,
            contactId: dbContact.id,
            content: botReply,
            role: 'BOT'
        }
    });

    // 8. Update usage
    await prisma.business.update({
        where: { id: business.id },
        data: { messagesUsed: { increment: 1 } }
    });

    console.log(`Successfully replied to ${phoneNumber}`);
}, { connection: connection as any });
