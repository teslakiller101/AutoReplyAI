import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/auth';

const prisma = new PrismaClient();

const getBusiness = async (userId?: string) => {
    if (!userId) return null;
    return prisma.business.findUnique({ where: { userId } });
};

export const getDashboardStats = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const business = await getBusiness(req.user?.id);
        if (!business) { res.status(404).json({ error: 'Business not found' }); return; }

        const messageCount = await prisma.message.count({ where: { businessId: business.id } });
        const leadCount = await prisma.contact.count({ where: { businessId: business.id } });

        res.json({
            messagesUsed: business.messagesUsed,
            totalMessages: messageCount,
            totalLeads: leadCount,
            plan: business.plan,
            businessName: business.name
        });
    } catch (error) { res.status(500).json({ error: 'Server error' }); }
};

export const getContacts = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const business = await getBusiness(req.user?.id);
        if (!business) { res.status(404).json({ error: 'Business not found' }); return; }

        const contacts = await prisma.contact.findMany({
            where: { businessId: business.id },
            orderBy: { lastActive: 'desc' }
        });

        res.json(contacts);
    } catch (error) { res.status(500).json({ error: 'Server error' }); }
};

export const getConversations = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const business = await getBusiness(req.user?.id);
        if (!business) { res.status(404).json({ error: 'Business not found' }); return; }

        const { contactId } = req.params;
        const messages = await prisma.message.findMany({
            where: { businessId: business.id, contactId: contactId as string },
            orderBy: { createdAt: 'asc' }
        });

        res.json(messages);
    } catch (error) { res.status(500).json({ error: 'Server error' }); }
};

export const getRules = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const business = await getBusiness(req.user?.id);
        if (!business) { res.status(404).json({ error: 'Business not found' }); return; }

        const rules = await prisma.autoRule.findMany({ where: { businessId: business.id } });
        res.json(rules);
    } catch (error) { res.status(500).json({ error: 'Server error' }); }
};

export const createRule = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const business = await getBusiness(req.user?.id);
        if (!business) { res.status(404).json({ error: 'Business not found' }); return; }

        const { keyword, response } = req.body;
        const rule = await prisma.autoRule.create({
            data: { businessId: business.id, keyword, response }
        });
        res.json(rule);
    } catch (error) { res.status(500).json({ error: 'Server error' }); }
};

export const deleteRule = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const business = await getBusiness(req.user?.id);
        if (!business) { res.status(404).json({ error: 'Business not found' }); return; }

        const { id } = req.params;
        await prisma.autoRule.deleteMany({
            where: { id: id as string, businessId: business.id }
        });
        res.json({ success: true });
    } catch (error) { res.status(500).json({ error: 'Server error' }); }
};

export const updateBusinessConfig = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const business = await getBusiness(req.user?.id);
        if (!business) { res.status(404).json({ error: 'Business not found' }); return; }

        const { description, faq, products, waAccountId, waPhoneNumberId, waAccessToken } = req.body;

        const updated = await prisma.business.update({
            where: { id: business.id },
            data: {
                description: description ?? business.description,
                faq: faq ?? business.faq,
                products: products ?? business.products,
                waAccountId: waAccountId ?? business.waAccountId,
                waPhoneNumberId: waPhoneNumberId ?? business.waPhoneNumberId,
                waAccessToken: waAccessToken ?? business.waAccessToken,
            }
        });

        res.json(updated);
    } catch (error) { res.status(500).json({ error: 'Server error' }); }
};
