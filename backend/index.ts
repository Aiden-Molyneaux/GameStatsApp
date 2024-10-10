import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import gameRoutes from './routes/gameRoutes';
import gamerTagRoutes from './routes/gamerTagRoutes';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/games', gameRoutes);
app.use('/api/gamerTags', gamerTagRoutes);


const PORT = process.env.PORT || 5000;

const originalLog = console.log;
console.log = function (...args) {
  originalLog.apply(console, [...args, '\n']);
};

app.listen(PORT, () => {
  console.log(`Server Start SUCCESS: running on port ${PORT}`);
});