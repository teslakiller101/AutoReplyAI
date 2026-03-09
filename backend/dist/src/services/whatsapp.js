"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendWhatsAppMessage = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const sendWhatsAppMessage = async (phoneNumberId, accessToken, to, body) => {
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
exports.sendWhatsAppMessage = sendWhatsAppMessage;
