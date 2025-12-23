/**
 * Authentication & Authorization
 * Google Identity Services + JWT sessions
 */

import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { User, UserRole, Session, Permission, PERMISSIONS } from './types';
import { createSession, getSession, deleteSession } from './redis';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key-min-32-chars-change-in-production'
);

const ALLOWED_DOMAIN = 'samanvayfoundation.org';
const COOKIE_NAME = 'cms_session';
const COOKIE_MAX_AGE = 7 * 24 * 60 * 60; // 7 days

function getAdminEmails(): string[] {
  const emails = process.env.CMS_ADMIN_EMAILS || '';
  return emails.split(',').map(e => e.trim()).filter(Boolean);
}

export function determineRole(email: string): UserRole {
  const adminEmails = getAdminEmails();
  if (adminEmails.includes(email)) {
    return 'admin';
  }
  return 'author';
}

export function hasPermission(role: UserRole, permission: Permission): boolean {
  return (PERMISSIONS[role] as readonly string[]).includes(permission);
}

export async function verifyGoogleToken(idToken: string): Promise<User | null> {
  try {
    const response = await fetch(
      `https://oauth2.googleapis.com/tokeninfo?id_token=${idToken}`
    );
    
    if (!response.ok) return null;
    
    const payload = await response.json();
    
    // Verify email domain
    if (!payload.email || !payload.email.endsWith(`@${ALLOWED_DOMAIN}`)) {
      return null;
    }
    
    // Verify email is verified
    if (!payload.email_verified) {
      return null;
    }
    
    const user: User = {
      email: payload.email,
      name: payload.name || payload.email.split('@')[0],
      picture: payload.picture,
      role: determineRole(payload.email),
    };
    
    return user;
  } catch (error) {
    console.error('Error verifying Google token:', error);
    return null;
  }
}

export async function createJWT(user: User): Promise<string> {
  const token = await new SignJWT({ user })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(JWT_SECRET);
  
  return token;
}

export async function verifyJWT(token: string): Promise<Session | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    
    if (!payload.user) return null;
    
    const session: Session = {
      user: payload.user as User,
      token,
      expiresAt: new Date((payload.exp || 0) * 1000).toISOString(),
    };
    
    return session;
  } catch (error) {
    return null;
  }
}

export async function setSessionCookie(token: string): Promise<void> {
  const cookieStore = await cookies();
  
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: COOKIE_MAX_AGE,
    path: '/',
  });
}

export function getSessionCookieConfig() {
  return {
    name: COOKIE_NAME,
    options: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax' as const,
      maxAge: COOKIE_MAX_AGE,
      path: '/',
    }
  };
}

export async function clearSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function getSessionFromCookie(): Promise<Session | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  
  if (!token) return null;
  
  // First check Redis
  const redisSession = await getSession(token);
  if (redisSession) return redisSession;
  
  // Fallback to JWT verification
  const jwtSession = await verifyJWT(token);
  if (!jwtSession) return null;
  
  // Store in Redis for future requests
  await createSession(jwtSession);
  
  return jwtSession;
}

export async function requireAuth(): Promise<Session> {
  const session = await getSessionFromCookie();
  
  if (!session) {
    throw new Error('Unauthorized');
  }
  
  return session;
}

export async function requireRole(role: UserRole): Promise<Session> {
  const session = await requireAuth();
  
  if (session.user.role !== role && session.user.role !== 'admin') {
    throw new Error('Forbidden');
  }
  
  return session;
}

export async function requirePermission(permission: Permission): Promise<Session> {
  const session = await requireAuth();
  
  if (!hasPermission(session.user.role, permission)) {
    throw new Error('Forbidden');
  }
  
  return session;
}

export async function logout(): Promise<void> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  
  if (token) {
    await deleteSession(token);
  }
  
  await clearSessionCookie();
}
