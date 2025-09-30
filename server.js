import express from 'express';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import fs from 'fs';
import bcrypt from 'bcryptjs';
import fetch from 'node-fetch';
import { fileURLToPath } from 'url';

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 10000;
const SITE_NAME = process.env.SITE_NAME || 'World SMS';
const OWNER_CONTACT = process.env.OWNER_CONTACT || '+2347071145778';

const db = { users: [] };

app.use(cors());
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/health', (req, res) => res.json({ ok: true, service: SITE_NAME }));

app.post('/api/signup', async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ ok: false });
  const password_hash = await bcrypt.hash(password, 12);
  db.users.push({ email, password_hash });
  res.json({ ok: true, user: { email } });
});

app.listen(PORT, () => console.log('Server running on', PORT));
