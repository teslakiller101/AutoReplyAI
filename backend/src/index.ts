import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import webhookRoutes from './routes/webhook';
import businessRoutes from './routes/business';

// Import the worker so it starts running in the background when the server starts
import './workers/messageWorker';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/webhook', webhookRoutes);
app.use('/api/business', businessRoutes);

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

export const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
