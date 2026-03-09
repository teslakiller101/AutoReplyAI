"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBusinessConfig = exports.deleteRule = exports.createRule = exports.getRules = exports.getConversations = exports.getContacts = exports.getDashboardStats = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getBusiness = async (userId) => {
    if (!userId)
        return null;
    return prisma.business.findUnique({ where: { userId } });
};
const getDashboardStats = async (req, res) => {
    try {
        const business = await getBusiness(req.user?.id);
        if (!business) {
            res.status(404).json({ error: 'Business not found' });
            return;
        }
        const messageCount = await prisma.message.count({ where: { businessId: business.id } });
        const leadCount = await prisma.contact.count({ where: { businessId: business.id } });
        res.json({
            messagesUsed: business.messagesUsed,
            totalMessages: messageCount,
            totalLeads: leadCount,
            plan: business.plan,
            businessName: business.name
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
exports.getDashboardStats = getDashboardStats;
const getContacts = async (req, res) => {
    try {
        const business = await getBusiness(req.user?.id);
        if (!business) {
            res.status(404).json({ error: 'Business not found' });
            return;
        }
        const contacts = await prisma.contact.findMany({
            where: { businessId: business.id },
            orderBy: { lastActive: 'desc' }
        });
        res.json(contacts);
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
exports.getContacts = getContacts;
const getConversations = async (req, res) => {
    try {
        const business = await getBusiness(req.user?.id);
        if (!business) {
            res.status(404).json({ error: 'Business not found' });
            return;
        }
        const { contactId } = req.params;
        const messages = await prisma.message.findMany({
            where: { businessId: business.id, contactId: contactId },
            orderBy: { createdAt: 'asc' }
        });
        res.json(messages);
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
exports.getConversations = getConversations;
const getRules = async (req, res) => {
    try {
        const business = await getBusiness(req.user?.id);
        if (!business) {
            res.status(404).json({ error: 'Business not found' });
            return;
        }
        const rules = await prisma.autoRule.findMany({ where: { businessId: business.id } });
        res.json(rules);
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
exports.getRules = getRules;
const createRule = async (req, res) => {
    try {
        const business = await getBusiness(req.user?.id);
        if (!business) {
            res.status(404).json({ error: 'Business not found' });
            return;
        }
        const { keyword, response } = req.body;
        const rule = await prisma.autoRule.create({
            data: { businessId: business.id, keyword, response }
        });
        res.json(rule);
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
exports.createRule = createRule;
const deleteRule = async (req, res) => {
    try {
        const business = await getBusiness(req.user?.id);
        if (!business) {
            res.status(404).json({ error: 'Business not found' });
            return;
        }
        const { id } = req.params;
        await prisma.autoRule.deleteMany({
            where: { id: id, businessId: business.id }
        });
        res.json({ success: true });
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
exports.deleteRule = deleteRule;
const updateBusinessConfig = async (req, res) => {
    try {
        const business = await getBusiness(req.user?.id);
        if (!business) {
            res.status(404).json({ error: 'Business not found' });
            return;
        }
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
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
exports.updateBusinessConfig = updateBusinessConfig;
