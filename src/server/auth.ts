import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { CmsStore } from './cmsStore';

const JWT_SECRET = process.env.AUTH_SECRET || 'sayed_secure_portfolio_cms_secret_key_2026_@#99';
const JWT_EXPIRES_IN = '24h';

// In-memory rate limiting map for brute force protection
interface RateLimitEntry {
  attempts: number;
  lockUntil: number;
}
const loginAttempts = new Map<string, RateLimitEntry>();
const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_PERIOD_MS = 15 * 60 * 1000; // 15 minutes

export interface AuthTokenPayload {
  userId: string;
  username: string;
  role: string;
  mustChangePassword?: boolean;
}

export interface AuthenticatedRequest extends Request {
  adminUser?: AuthTokenPayload;
}

export function generateToken(payload: AuthTokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function verifyToken(token: string): AuthTokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as AuthTokenPayload;
  } catch (err) {
    return null;
  }
}

export function checkRateLimit(identifier: string): { isLocked: boolean; remainingMinutes: number } {
  const entry = loginAttempts.get(identifier);
  if (!entry) return { isLocked: false, remainingMinutes: 0 };

  const now = Date.now();
  if (entry.lockUntil > now) {
    const remainingMinutes = Math.ceil((entry.lockUntil - now) / 60000);
    return { isLocked: true, remainingMinutes };
  }

  // If lockout expired, reset attempts
  if (entry.lockUntil > 0 && entry.lockUntil <= now) {
    loginAttempts.delete(identifier);
  }

  return { isLocked: false, remainingMinutes: 0 };
}

export function recordFailedAttempt(identifier: string): { isNowLocked: boolean; attemptsLeft: number } {
  const now = Date.now();
  const entry = loginAttempts.get(identifier) || { attempts: 0, lockUntil: 0 };

  entry.attempts += 1;
  if (entry.attempts >= MAX_FAILED_ATTEMPTS) {
    entry.lockUntil = now + LOCKOUT_PERIOD_MS;
    loginAttempts.set(identifier, entry);
    return { isNowLocked: true, attemptsLeft: 0 };
  }

  loginAttempts.set(identifier, entry);
  return { isNowLocked: false, attemptsLeft: MAX_FAILED_ATTEMPTS - entry.attempts };
}

export function clearRateLimit(identifier: string): void {
  loginAttempts.delete(identifier);
}

// Authentication Middleware
export function requireAdminAuth(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  // Check authorization header or cookie
  let token: string | undefined;

  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  } else if (req.cookies && req.cookies.admin_token) {
    token = req.cookies.admin_token;
  }

  if (!token) {
    res.status(401).json({ error: 'Unauthorized: No active session token found. Please log in.' });
    return;
  }

  const payload = verifyToken(token);
  if (!payload) {
    res.status(401).json({ error: 'Unauthorized: Session expired or token invalid. Please log in again.' });
    return;
  }

  const cmsStore = CmsStore.getInstance();
  const user = cmsStore.getDatabase().users.find(u => u.id === payload.userId);
  if (!user) {
    res.status(401).json({ error: 'Unauthorized: User account does not exist.' });
    return;
  }

  req.adminUser = {
    userId: user.id,
    username: user.username,
    role: user.role,
    mustChangePassword: user.mustChangePassword
  };

  next();
}
