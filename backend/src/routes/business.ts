import { Router } from 'express';
import { requireAuth } from '../middleware/auth';
import {
    getDashboardStats,
    getConversations,
    getRules,
    createRule,
    deleteRule,
    updateBusinessConfig,
    getContacts
} from '../controllers/business';

const router = Router();
router.use(requireAuth);

router.get('/stats', getDashboardStats);
router.get('/conversations/:contactId', getConversations);
router.get('/rules', getRules);
router.post('/rules', createRule);
router.delete('/rules/:id', deleteRule);
router.post('/config', updateBusinessConfig);
router.get('/contacts', getContacts);

export default router;
