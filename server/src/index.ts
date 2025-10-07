// server/src/index.ts
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db';
import authRoutes from './routes/authRoutes';
import vaultRoutes from './routes/vaultRoutes';

dotenv.config();
connectDB();

const app = express();

app.use(cors()); 
app.use(express.json()); 

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/auth', authRoutes);
app.use('/api/vault', vaultRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));