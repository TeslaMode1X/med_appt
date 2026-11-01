/**
 * StayHealthy authentication API.
 *
 *   POST /api/auth/register  { name, email, password, phone, role }  -> { authtoken, name, email, phone, role }
 *   POST /api/auth/login     { email, password }                     -> { authtoken, name, email, phone, role }
 *   GET  /api/auth/user      headers: Authorization: Bearer <token>, Email -> user details
 *   PUT  /api/auth/user      headers as above, body { name, phone }  -> updated user
 *
 * Users are stored in server/data/users.json so the API runs without a database.
 * When server/build exists (npm run build), the React app is served from it too.
 */
import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, 'data');
const DATA_FILE = join(DATA_DIR, 'users.json');
const BUILD_DIR = join(__dirname, 'build');
const PORT = process.env.PORT || 8181;
const JWT_SECRET = process.env.JWT_SECRET || 'stayhealthy-dev-secret';

const app = express();
app.use(cors());
app.use(express.json());

/* ---------- tiny JSON "database" ---------- */
function loadUsers() {
  if (!existsSync(DATA_FILE)) return [];
  try {
    return JSON.parse(readFileSync(DATA_FILE, 'utf8'));
  } catch {
    return [];
  }
}
function saveUsers(users) {
  if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });
  writeFileSync(DATA_FILE, JSON.stringify(users, null, 2));
}
function publicUser(user) {
  const { password, ...rest } = user;
  return rest;
}
function issueToken(user) {
  return jwt.sign({ user: { id: user.id, email: user.email } }, JWT_SECRET, { expiresIn: '1d' });
}

/* ---------- validation ---------- */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^\d{10}$/;

function validationErrors(checks) {
  return checks.filter(([ok]) => !ok).map(([, msg, param]) => ({ msg, param }));
}

/* ---------- auth middleware ---------- */
function authenticate(req, res, next) {
  const header = req.header('Authorization') || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : header;
  if (!token) return res.status(401).json({ error: 'No token, authorization denied' });
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload.user;
    next();
  } catch {
    res.status(401).json({ error: 'Token is not valid' });
  }
}

/* ---------- routes ---------- */
app.get('/api', (_req, res) => res.json({ status: 'ok', service: 'StayHealthy API' }));

app.post('/api/auth/register', async (req, res) => {
  const { name = '', email = '', password = '', phone = '', role = 'Patient' } = req.body || {};
  const errors = validationErrors([
    [name.trim().length > 0, 'Name is required', 'name'],
    [EMAIL_RE.test(email), 'Please enter a valid email', 'email'],
    [password.length >= 6, 'Password must be at least 6 characters', 'password'],
    [PHONE_RE.test(phone), 'Phone number must be 10 digits', 'phone'],
  ]);
  if (errors.length) return res.status(400).json({ errors });

  const users = loadUsers();
  const normalizedEmail = email.trim().toLowerCase();
  if (users.some((u) => u.email === normalizedEmail)) {
    return res.status(400).json({ errors: [{ msg: 'A user with this email already exists', param: 'email' }] });
  }

  const user = {
    id: Date.now().toString(36),
    name: name.trim(),
    email: normalizedEmail,
    phone,
    role: role === 'Doctor' ? 'Doctor' : 'Patient',
    password: await bcrypt.hash(password, 10),
    createdAt: new Date().toISOString(),
  };
  users.push(user);
  saveUsers(users);

  res.status(201).json({ authtoken: issueToken(user), ...publicUser(user) });
});

app.post('/api/auth/login', async (req, res) => {
  const { email = '', password = '' } = req.body || {};
  const errors = validationErrors([
    [EMAIL_RE.test(email), 'Please enter a valid email', 'email'],
    [password.length > 0, 'Password is required', 'password'],
  ]);
  if (errors.length) return res.status(400).json({ errors });

  const user = loadUsers().find((u) => u.email === email.trim().toLowerCase());
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ errors: [{ msg: 'Invalid email or password' }] });
  }

  res.json({ authtoken: issueToken(user), ...publicUser(user) });
});

app.get('/api/auth/user', authenticate, (req, res) => {
  const user = loadUsers().find((u) => u.id === req.user.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(publicUser(user));
});

app.put('/api/auth/user', authenticate, (req, res) => {
  const users = loadUsers();
  const user = users.find((u) => u.id === req.user.id);
  if (!user) return res.status(404).json({ error: 'User not found' });

  const { name, phone } = req.body || {};
  if (name !== undefined) {
    if (!name.trim()) return res.status(400).json({ errors: [{ msg: 'Name is required', param: 'name' }] });
    user.name = name.trim();
  }
  if (phone !== undefined) {
    if (!PHONE_RE.test(phone)) return res.status(400).json({ errors: [{ msg: 'Phone number must be 10 digits', param: 'phone' }] });
    user.phone = phone;
  }
  saveUsers(users);
  res.json(publicUser(user));
});

/* ---------- static front-end (production build) ---------- */
if (existsSync(BUILD_DIR)) {
  app.use('/med_appt', express.static(BUILD_DIR));
  app.get('/med_appt/*', (_req, res) => res.sendFile(join(BUILD_DIR, 'index.html')));
  app.get('/', (_req, res) => res.redirect('/med_appt/'));
}

app.listen(PORT, () => {
  console.log(`StayHealthy API listening on http://localhost:${PORT}`);
});
