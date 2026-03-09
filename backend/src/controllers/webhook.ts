import { Request, Response } from 'express';
import { messageQueue } from '../services/queue';

const VERIFY_TOKEN = process.env.WEBHOOK_VERIFY_TOKEN || 'my-verify-token';

export const verifyWebhook = (req: Request, res: Response): void => {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode && token) {
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {
            console.log('WEBHOOK_VERIFIED');
            res.status(200).send(challenge);
            return;
        } else {
            res.sendStatus(403);
            return;
        }
    }
    res.sendStatus(400);
};

export const receiveMessage = async (req: Request, res: Response): Promise<void> => {
    try {
        const { body } = req;

        // Check if this is a WhatsApp status update or message
        if (body.object === 'whatsapp_business_account') {
            if (body.entry) {
                for (const entry of body.entry) {
                    for (const change of entry.changes) {
                        if (change.value && change.value.messages && change.value.messages[0]) {
                            const message = change.value.messages[0];
                            const contact = change.value.contacts?.[0];
                            const businessPhoneNumberId = change.value.metadata.phone_number_id;

                            // Add job to BullMQ queue immediately
                            await messageQueue.add('process-message', {
                                message,
                                contact,
                                businessPhoneNumberId
                            });
                        }
                    }
                }
            }
            res.status(200).send('EVENT_RECEIVED');
            return;
        } else {
            res.sendStatus(404);
            return;
        }
    } catch (error) {
        console.error('Webhook processing error:', error);
        // Always return 200 so WhatsApp doesn't keep retrying
        res.status(200).send('ERROR_RECEIVED');
    }
};
