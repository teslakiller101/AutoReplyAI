import dotenv from 'dotenv';
dotenv.config();

export const sendWhatsAppMessage = async (
    phoneNumberId: string,
    accessToken: string,
    to: string,
    body: string
) => {
    const url = `https://graph.facebook.com/v17.0/${phoneNumberId}/messages`;

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            messaging_product: 'whatsapp',
            recipient_type: 'individual',
            to: to,
            type: 'text',
            text: {
                preview_url: false,
                body,
            },
        })
    });

    if (!response.ok) {
        const errorData = await response.text();
        console.error('WhatsApp API Error:', errorData);
        throw new Error('Failed to send WhatsApp message');
    }
};
