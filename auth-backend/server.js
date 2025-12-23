/**
 * Avni CMS Authentication Backend
 * Dedicated Express server on Render for Google OAuth
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 10000;

// ============================================================================
// CONFIGURATION
// ============================================================================

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const JWT_SECRET = process.env.JWT_SECRET;
const FRONTEND_URL = process.env.FRONTEND_URL || 'https://avni-2.netlify.app';
const BACKEND_URL = process.env.BACKEND_URL || `http://localhost:${PORT}`;
const ALLOWED_DOMAIN = process.env.ALLOWED_DOMAIN || 'samanvayfoundation.org';
const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || '').split(',').map(e => e.trim()).filter(Boolean);

// Validate required environment variables
if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !JWT_SECRET) {
  console.error('ERROR: Missing required environment variables');
  console.error('Required: GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, JWT_SECRET');
  process.exit(1);
}

// ============================================================================
// MIDDLEWARE
// ============================================================================

app.use(cors({
  origin: FRONTEND_URL,
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

// ============================================================================
// PASSPORT GOOGLE OAUTH STRATEGY
// ============================================================================

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: `${BACKEND_URL}/auth/google/callback`,
  scope: ['profile', 'email'],
},
async (accessToken, refreshToken, profile, done) => {
  try {
    const email = profile.emails?.[0]?.value;
    
    if (!email) {
      return done(null, false, { message: 'No email found in Google profile' });
    }
    
    // Verify email domain
    if (!email.endsWith(`@${ALLOWED_DOMAIN}`)) {
      return done(null, false, { 
        message: `Unauthorized domain. Only @${ALLOWED_DOMAIN} emails are allowed.` 
      });
    }
    
    // Verify email is verified
    if (!profile.emails[0].verified) {
      return done(null, false, { message: 'Email not verified' });
    }
    
    // Determine user role
    const role = ADMIN_EMAILS.includes(email) ? 'admin' : 'author';
    
    // Create user object
    const user = {
      email,
      name: profile.displayName || email.split('@')[0],
      picture: profile.photos?.[0]?.value,
      role,
    };
    
    return done(null, user);
  } catch (error) {
    console.error('OAuth error:', error);
    return done(error, false);
  }
}));

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function createJWT(user) {
  return jwt.sign(
    { user },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

function verifyJWT(token) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded.user;
  } catch (error) {
    return null;
  }
}

function extractToken(req) {
  // Try cookie first
  if (req.cookies && req.cookies.cms_session) {
    return req.cookies.cms_session;
  }
  
  // Try Authorization header
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }
  
  return null;
}

// ============================================================================
// MIDDLEWARE: AUTH GUARD
// ============================================================================

function requireAuth(req, res, next) {
  const token = extractToken(req);
  
  if (!token) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  
  const user = verifyJWT(token);
  
  if (!user) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
  
  req.user = user;
  next();
}

// ============================================================================
// ROUTES
// ============================================================================

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    service: 'avni-auth-backend',
    timestamp: new Date().toISOString()
  });
});

// ============================================================================
// TEMPORARY: HARDCODED EMAIL/PASSWORD AUTH FOR TESTING
// ============================================================================

const HARDCODED_USERS = [
  {
    email: 'admin@samanvayfoundation.org',
    password: 'Incorrect@2026',
    name: 'Admin User',
    role: 'admin',
    picture: 'https://ui-avatars.com/api/?name=Admin+User&background=419372&color=fff'
  },
  {
    email: 'publisher@samanvayfoundation.org',
    password: 'Incorrect@2026',
    name: 'Publisher User',
    role: 'author',
    picture: 'https://ui-avatars.com/api/?name=Publisher+User&background=419372&color=fff'
  }
];

// Simple email/password login (TEMPORARY FOR TESTING)
app.post('/auth/login', (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }
    
    // Find user
    const user = HARDCODED_USERS.find(u => u.email === email && u.password === password);
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    
    // Create JWT
    const { password: _, ...userWithoutPassword } = user;
    const token = createJWT(userWithoutPassword);
    
    // Set cookie
    res.cookie('cms_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'none',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      path: '/',
    });
    
    res.json({ 
      success: true, 
      user: userWithoutPassword 
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Initiate Google OAuth
app.get('/auth/google', 
  passport.authenticate('google', { 
    session: false,
    scope: ['profile', 'email']
  })
);

// Google OAuth callback
app.get('/auth/google/callback',
  passport.authenticate('google', { 
    session: false,
    failureRedirect: `${FRONTEND_URL}/cms?error=auth_failed`
  }),
  (req, res) => {
    try {
      if (!req.user) {
        return res.redirect(`${FRONTEND_URL}/cms?error=unauthorized`);
      }
      
      // Create JWT
      const token = createJWT(req.user);
      
      // Set cookie (no domain - let browser handle it)
      res.cookie('cms_session', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'none', // Required for cross-site cookies
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        path: '/',
      });
      
      // Redirect back to frontend
      res.redirect(`${FRONTEND_URL}/cms/dashboard?auth=success`);
    } catch (error) {
      console.error('Callback error:', error);
      res.redirect(`${FRONTEND_URL}/cms?error=callback_failed`);
    }
  }
);

// Get authenticated user
app.get('/auth/me', requireAuth, (req, res) => {
  res.json({ user: req.user });
});

// Logout
app.post('/auth/logout', (req, res) => {
  res.clearCookie('cms_session', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'none',
    path: '/',
  });
  
  res.json({ success: true });
});

// ============================================================================
// ERROR HANDLING
// ============================================================================

app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// ============================================================================
// START SERVER
// ============================================================================

app.listen(PORT, () => {
  console.log(`🚀 Avni Auth Backend running on port ${PORT}`);
  console.log(`📍 Backend URL: ${BACKEND_URL}`);
  console.log(`🌐 Frontend URL: ${FRONTEND_URL}`);
  console.log(`🔒 Allowed domain: @${ALLOWED_DOMAIN}`);
  console.log(`👥 Admin emails: ${ADMIN_EMAILS.length} configured`);
});
