import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import createError from 'http-errors';
import routes from './routes/index.js';
import { sequelize, User } from './models/index.js';

dotenv.config();

const app = express();
app.use(cors({ origin: process.env.CORS_ORIGIN?.split(',') || '*', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use('/uploads', express.static(process.env.UPLOAD_DIR || 'uploads'));

app.get('/health', (_req, res) => res.json({ ok: true }));
app.use('/api/v1', routes);

app.use((req, _res, next) => next(createError(404, `Route not found: ${req.method} ${req.originalUrl}`)));
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected');

    if (process.env.USE_SYNC === 'true') {
      console.log('USE_SYNC enabled: syncing database schema...');
      await sequelize.sync();
      // Ensure a default admin user exists
      const email = 'admin@example.com';
      const existing = await User.findOne({ where: { email } });
      if (!existing) {
        // Lazy require bcrypt to avoid circular import and only in sync mode
        const bcrypt = (await import('bcrypt')).default;
        const password = await bcrypt.hash('admin123', 10);
        await User.create({ name: 'Admin User', email, password, role: 'ADMIN' });
        console.log('Seeded default admin user (admin@example.com / admin123)');
      }
    }
  } catch (e) {
    console.error('Database connection error:', e.message);
  }
})();

export default app;
