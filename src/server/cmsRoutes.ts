import { Router, Response } from 'express';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';
import { 
  CmsStore, 
  EducationItem, 
  ExperienceCmsItem, 
  SkillCmsItem, 
  CertificateCmsItem, 
  ProjectCmsItem, 
  ServiceCmsItem, 
  AchievementCmsItem, 
  TestimonialCmsItem, 
  SocialLinkCmsItem, 
  NavCmsItem,
  MediaItem
} from './cmsStore';
import { 
  requireAdminAuth, 
  AuthenticatedRequest, 
  generateToken, 
  checkRateLimit, 
  recordFailedAttempt, 
  clearRateLimit 
} from './auth';

const router = Router();
const cmsStore = CmsStore.getInstance();

// ==========================================
// 1. PUBLIC API ROUTES
// ==========================================

router.get('/cms/public-data', (req, res) => {
  try {
    const publicData = cmsStore.getPublicData();
    res.json({ success: true, data: publicData });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch public portfolio data.' });
  }
});

// Dynamic robots.txt
router.get('/robots.txt', (req, res) => {
  const db = cmsStore.getDatabase();
  res.type('text/plain');
  res.send(db.seo?.robotsTxt || 'User-agent: *\nAllow: /\nSitemap: https://sayedahmedsijan.com/sitemap.xml');
});

// Dynamic sitemap.xml
router.get('/sitemap.xml', (req, res) => {
  const db = cmsStore.getDatabase();
  res.type('application/xml');
  res.send(db.seo?.sitemapXml || '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://sayedahmedsijan.com/</loc></url></urlset>');
});

// ==========================================
// 2. AUTHENTICATION ROUTES
// ==========================================

router.post('/auth/login', async (req, res) => {
  const ip = req.ip || req.socket.remoteAddress || '127.0.0.1';
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ error: 'Username and password are required.' });
    return;
  }

  const rateLimitKey = `${ip}_${username.toLowerCase()}`;
  const rateStatus = checkRateLimit(rateLimitKey);

  if (rateStatus.isLocked) {
    cmsStore.logActivity(username, 'Login Blocked (Rate Limit)', `Brute force lock active. Remaining lockout: ${rateStatus.remainingMinutes} min.`, ip);
    res.status(429).json({ 
      error: `Too many failed login attempts. For your security, this account is locked for ${rateStatus.remainingMinutes} minutes.` 
    });
    return;
  }

  const db = cmsStore.getDatabase();
  const user = db.users.find(u => u.username.toLowerCase() === username.toLowerCase());

  if (!user) {
    const attempt = recordFailedAttempt(rateLimitKey);
    cmsStore.logActivity(username, 'Failed Login Attempt', `Unknown username attempted. Attempts left before lockout: ${attempt.attemptsLeft}`, ip);
    res.status(401).json({ 
      error: 'Invalid credentials provided.', 
      attemptsLeft: attempt.attemptsLeft 
    });
    return;
  }

  const isMatch = bcrypt.compareSync(password, user.passwordHash);
  if (!isMatch) {
    const attempt = recordFailedAttempt(rateLimitKey);
    cmsStore.logActivity(user.username, 'Failed Login Attempt', `Incorrect password supplied. Attempts left before lockout: ${attempt.attemptsLeft}`, ip);
    res.status(401).json({ 
      error: 'Invalid credentials provided.', 
      attemptsLeft: attempt.attemptsLeft 
    });
    return;
  }

  // Clear rate limit on successful authentication
  clearRateLimit(rateLimitKey);

  // Update user last login
  user.lastLogin = new Date().toISOString();
  cmsStore.saveDatabase({ users: db.users }, user.username, 'Admin Login', 'Admin user authenticated successfully.', ip);

  const token = generateToken({
    userId: user.id,
    username: user.username,
    role: user.role,
    mustChangePassword: user.mustChangePassword
  });

  // Set HTTP-only secure cookie
  res.cookie('admin_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  });

  res.json({
    success: true,
    token,
    user: {
      id: user.id,
      username: user.username,
      role: user.role,
      mustChangePassword: user.mustChangePassword,
      lastLogin: user.lastLogin
    }
  });
});

router.post('/auth/logout', requireAdminAuth, (req: AuthenticatedRequest, res) => {
  const user = req.adminUser?.username || 'Admin';
  const ip = req.ip || '127.0.0.1';
  cmsStore.logActivity(user, 'Admin Logout', 'Admin user logged out.', ip);

  res.clearCookie('admin_token');
  res.json({ success: true, message: 'Logged out successfully.' });
});

router.get('/auth/me', requireAdminAuth, (req: AuthenticatedRequest, res) => {
  const db = cmsStore.getDatabase();
  const user = db.users.find(u => u.id === req.adminUser?.userId);

  if (!user) {
    res.status(404).json({ error: 'User not found.' });
    return;
  }

  res.json({
    success: true,
    user: {
      id: user.id,
      username: user.username,
      role: user.role,
      mustChangePassword: user.mustChangePassword,
      lastLogin: user.lastLogin
    }
  });
});

router.post('/auth/change-password', requireAdminAuth, (req: AuthenticatedRequest, res) => {
  const { currentPassword, newPassword } = req.body;
  const ip = req.ip || '127.0.0.1';

  if (!currentPassword || !newPassword) {
    res.status(400).json({ error: 'Current password and new password are required.' });
    return;
  }

  if (newPassword.length < 8) {
    res.status(400).json({ error: 'New password must be at least 8 characters long.' });
    return;
  }

  const db = cmsStore.getDatabase();
  const userIndex = db.users.findIndex(u => u.id === req.adminUser?.userId);

  if (userIndex === -1) {
    res.status(404).json({ error: 'User account not found.' });
    return;
  }

  const user = db.users[userIndex];
  const isMatch = bcrypt.compareSync(currentPassword, user.passwordHash);

  if (!isMatch) {
    cmsStore.logActivity(user.username, 'Failed Password Change', 'Incorrect current password provided.', ip);
    res.status(401).json({ error: 'Current password is incorrect.' });
    return;
  }

  const salt = bcrypt.genSaltSync(10);
  user.passwordHash = bcrypt.hashSync(newPassword, salt);
  user.mustChangePassword = false;
  user.updatedAt = new Date().toISOString();

  db.users[userIndex] = user;
  cmsStore.saveDatabase({ users: db.users }, user.username, 'Password Changed', 'User changed their password successfully.', ip);

  res.json({ success: true, message: 'Password has been updated securely.' });
});

// ==========================================
// 3. ADMIN PROTECTED CMS ROUTES
// ==========================================

// Get entire database for CMS admin
router.get('/cms/all', requireAdminAuth, (req: AuthenticatedRequest, res) => {
  const db = cmsStore.getDatabase();
  // Never expose user password hashes
  const sanitized = {
    ...db,
    users: db.users.map(u => ({
      id: u.id,
      username: u.username,
      role: u.role,
      mustChangePassword: u.mustChangePassword,
      lastLogin: u.lastLogin,
      createdAt: u.createdAt,
      updatedAt: u.updatedAt
    }))
  };
  res.json({ success: true, data: sanitized });
});

// Publish everything
router.post('/cms/publish', requireAdminAuth, (req: AuthenticatedRequest, res) => {
  const user = req.adminUser?.username || 'Admin';
  const ip = req.ip || '127.0.0.1';
  const updated = cmsStore.publishAll(user, ip);
  res.json({ success: true, message: 'All changes successfully published to live website.', data: updated });
});

// Reset to seeded defaults
router.post('/cms/reset-defaults', requireAdminAuth, (req: AuthenticatedRequest, res) => {
  const user = req.adminUser?.username || 'Admin';
  const ip = req.ip || '127.0.0.1';
  const updated = cmsStore.resetToDefaults(user, ip);
  res.json({ success: true, message: 'CMS Database reset to default portfolio contents.', data: updated });
});

// Update Profile
router.put('/cms/profile', requireAdminAuth, (req: AuthenticatedRequest, res) => {
  const user = req.adminUser?.username || 'Admin';
  const ip = req.ip || '127.0.0.1';
  const updated = cmsStore.saveDatabase({ personalInfo: req.body }, user, 'Updated Profile', 'Edited personal information and bio.', ip);
  res.json({ success: true, data: updated.personalInfo });
});

// Update Hero
router.put('/cms/hero', requireAdminAuth, (req: AuthenticatedRequest, res) => {
  const user = req.adminUser?.username || 'Admin';
  const ip = req.ip || '127.0.0.1';
  const updated = cmsStore.saveDatabase({ hero: req.body }, user, 'Updated Hero', 'Edited hero section headlines, stats, and CTAs.', ip);
  res.json({ success: true, data: updated.hero });
});

// Update About
router.put('/cms/about', requireAdminAuth, (req: AuthenticatedRequest, res) => {
  const user = req.adminUser?.username || 'Admin';
  const ip = req.ip || '127.0.0.1';
  const updated = cmsStore.saveDatabase({ about: req.body }, user, 'Updated About Me', 'Edited about story, mission, and vision.', ip);
  res.json({ success: true, data: updated.about });
});

// Update Contact
router.put('/cms/contact', requireAdminAuth, (req: AuthenticatedRequest, res) => {
  const user = req.adminUser?.username || 'Admin';
  const ip = req.ip || '127.0.0.1';
  const updated = cmsStore.saveDatabase({ contact: req.body }, user, 'Updated Contact Info', 'Edited contact channels and form settings.', ip);
  res.json({ success: true, data: updated.contact });
});

// Update SEO
router.put('/cms/seo', requireAdminAuth, (req: AuthenticatedRequest, res) => {
  const user = req.adminUser?.username || 'Admin';
  const ip = req.ip || '127.0.0.1';
  const updated = cmsStore.saveDatabase({ seo: req.body }, user, 'Updated SEO Settings', 'Edited meta tags, OpenGraph, and structured schemas.', ip);
  res.json({ success: true, data: updated.seo });
});

// Update Website Settings
router.put('/cms/settings', requireAdminAuth, (req: AuthenticatedRequest, res) => {
  const user = req.adminUser?.username || 'Admin';
  const ip = req.ip || '127.0.0.1';
  const updated = cmsStore.saveDatabase({ siteSettings: req.body }, user, 'Updated Website Settings', 'Edited maintenance mode and site preferences.', ip);
  res.json({ success: true, data: updated.siteSettings });
});

// ==========================================
// 4. EDUCATION CRUD
// ==========================================

router.post('/cms/education', requireAdminAuth, (req: AuthenticatedRequest, res) => {
  const user = req.adminUser?.username || 'Admin';
  const ip = req.ip || '127.0.0.1';
  const db = cmsStore.getDatabase();
  const newEdu: EducationItem = {
    ...req.body,
    id: `edu-${Date.now()}`,
    displayOrder: req.body.displayOrder || (db.education.length + 1),
    published: req.body.published ?? true
  };
  db.education.push(newEdu);
  cmsStore.saveDatabase({ education: db.education }, user, 'Added Education', `Added ${newEdu.degree} at ${newEdu.institution}`, ip);
  res.json({ success: true, data: newEdu });
});

router.put('/cms/education/:id', requireAdminAuth, (req: AuthenticatedRequest, res) => {
  const user = req.adminUser?.username || 'Admin';
  const ip = req.ip || '127.0.0.1';
  const db = cmsStore.getDatabase();
  const idx = db.education.findIndex(e => e.id === req.params.id);
  if (idx === -1) {
    res.status(404).json({ error: 'Education record not found.' });
    return;
  }
  db.education[idx] = { ...db.education[idx], ...req.body, id: req.params.id };
  cmsStore.saveDatabase({ education: db.education }, user, 'Updated Education', `Updated ${db.education[idx].degree}`, ip);
  res.json({ success: true, data: db.education[idx] });
});

router.delete('/cms/education/:id', requireAdminAuth, (req: AuthenticatedRequest, res) => {
  const user = req.adminUser?.username || 'Admin';
  const ip = req.ip || '127.0.0.1';
  const db = cmsStore.getDatabase();
  const removed = db.education.find(e => e.id === req.params.id);
  db.education = db.education.filter(e => e.id !== req.params.id);
  cmsStore.saveDatabase({ education: db.education }, user, 'Deleted Education', `Deleted ${removed?.degree || req.params.id}`, ip);
  res.json({ success: true, message: 'Education record deleted.' });
});

// ==========================================
// 5. WORK EXPERIENCE CRUD
// ==========================================

router.post('/cms/experience', requireAdminAuth, (req: AuthenticatedRequest, res) => {
  const user = req.adminUser?.username || 'Admin';
  const ip = req.ip || '127.0.0.1';
  const db = cmsStore.getDatabase();
  const newExp: ExperienceCmsItem = {
    ...req.body,
    id: `exp-${Date.now()}`,
    displayOrder: req.body.displayOrder || (db.experience.length + 1),
    published: req.body.published ?? true
  };
  db.experience.push(newExp);
  cmsStore.saveDatabase({ experience: db.experience }, user, 'Added Experience', `Added ${newExp.position} at ${newExp.company}`, ip);
  res.json({ success: true, data: newExp });
});

router.put('/cms/experience/:id', requireAdminAuth, (req: AuthenticatedRequest, res) => {
  const user = req.adminUser?.username || 'Admin';
  const ip = req.ip || '127.0.0.1';
  const db = cmsStore.getDatabase();
  const idx = db.experience.findIndex(e => e.id === req.params.id);
  if (idx === -1) {
    res.status(404).json({ error: 'Experience record not found.' });
    return;
  }
  db.experience[idx] = { ...db.experience[idx], ...req.body, id: req.params.id };
  cmsStore.saveDatabase({ experience: db.experience }, user, 'Updated Experience', `Updated ${db.experience[idx].position}`, ip);
  res.json({ success: true, data: db.experience[idx] });
});

router.delete('/cms/experience/:id', requireAdminAuth, (req: AuthenticatedRequest, res) => {
  const user = req.adminUser?.username || 'Admin';
  const ip = req.ip || '127.0.0.1';
  const db = cmsStore.getDatabase();
  const removed = db.experience.find(e => e.id === req.params.id);
  db.experience = db.experience.filter(e => e.id !== req.params.id);
  cmsStore.saveDatabase({ experience: db.experience }, user, 'Deleted Experience', `Deleted ${removed?.position || req.params.id}`, ip);
  res.json({ success: true, message: 'Experience record deleted.' });
});

// ==========================================
// 6. SKILLS CRUD
// ==========================================

router.post('/cms/skills', requireAdminAuth, (req: AuthenticatedRequest, res) => {
  const user = req.adminUser?.username || 'Admin';
  const ip = req.ip || '127.0.0.1';
  const db = cmsStore.getDatabase();
  const newSkill: SkillCmsItem = {
    ...req.body,
    id: `skill-${Date.now()}`,
    displayOrder: req.body.displayOrder || (db.skills.length + 1),
    published: req.body.published ?? true
  };
  db.skills.push(newSkill);
  cmsStore.saveDatabase({ skills: db.skills }, user, 'Added Skill', `Added ${newSkill.name} (${newSkill.category})`, ip);
  res.json({ success: true, data: newSkill });
});

router.put('/cms/skills/:id', requireAdminAuth, (req: AuthenticatedRequest, res) => {
  const user = req.adminUser?.username || 'Admin';
  const ip = req.ip || '127.0.0.1';
  const db = cmsStore.getDatabase();
  const idx = db.skills.findIndex(s => s.id === req.params.id);
  if (idx === -1) {
    res.status(404).json({ error: 'Skill not found.' });
    return;
  }
  db.skills[idx] = { ...db.skills[idx], ...req.body, id: req.params.id };
  cmsStore.saveDatabase({ skills: db.skills }, user, 'Updated Skill', `Updated ${db.skills[idx].name}`, ip);
  res.json({ success: true, data: db.skills[idx] });
});

router.delete('/cms/skills/:id', requireAdminAuth, (req: AuthenticatedRequest, res) => {
  const user = req.adminUser?.username || 'Admin';
  const ip = req.ip || '127.0.0.1';
  const db = cmsStore.getDatabase();
  const removed = db.skills.find(s => s.id === req.params.id);
  db.skills = db.skills.filter(s => s.id !== req.params.id);
  cmsStore.saveDatabase({ skills: db.skills }, user, 'Deleted Skill', `Deleted ${removed?.name || req.params.id}`, ip);
  res.json({ success: true, message: 'Skill deleted.' });
});

// ==========================================
// 7. CERTIFICATES CRUD
// ==========================================

router.post('/cms/certificates', requireAdminAuth, (req: AuthenticatedRequest, res) => {
  const user = req.adminUser?.username || 'Admin';
  const ip = req.ip || '127.0.0.1';
  const db = cmsStore.getDatabase();
  const newCert: CertificateCmsItem = {
    ...req.body,
    id: `cert-${Date.now()}`,
    displayOrder: req.body.displayOrder || (db.certificates.length + 1),
    published: req.body.published ?? true
  };
  db.certificates.push(newCert);
  cmsStore.saveDatabase({ certificates: db.certificates }, user, 'Added Certificate', `Added ${newCert.title} from ${newCert.issuer}`, ip);
  res.json({ success: true, data: newCert });
});

router.put('/cms/certificates/:id', requireAdminAuth, (req: AuthenticatedRequest, res) => {
  const user = req.adminUser?.username || 'Admin';
  const ip = req.ip || '127.0.0.1';
  const db = cmsStore.getDatabase();
  const idx = db.certificates.findIndex(c => c.id === req.params.id);
  if (idx === -1) {
    res.status(404).json({ error: 'Certificate not found.' });
    return;
  }
  db.certificates[idx] = { ...db.certificates[idx], ...req.body, id: req.params.id };
  cmsStore.saveDatabase({ certificates: db.certificates }, user, 'Updated Certificate', `Updated ${db.certificates[idx].title}`, ip);
  res.json({ success: true, data: db.certificates[idx] });
});

router.delete('/cms/certificates/:id', requireAdminAuth, (req: AuthenticatedRequest, res) => {
  const user = req.adminUser?.username || 'Admin';
  const ip = req.ip || '127.0.0.1';
  const db = cmsStore.getDatabase();
  const removed = db.certificates.find(c => c.id === req.params.id);
  db.certificates = db.certificates.filter(c => c.id !== req.params.id);
  cmsStore.saveDatabase({ certificates: db.certificates }, user, 'Deleted Certificate', `Deleted ${removed?.title || req.params.id}`, ip);
  res.json({ success: true, message: 'Certificate deleted.' });
});

// ==========================================
// 8. PROJECTS & CASE STUDIES CRUD
// ==========================================

router.post('/cms/projects', requireAdminAuth, (req: AuthenticatedRequest, res) => {
  const user = req.adminUser?.username || 'Admin';
  const ip = req.ip || '127.0.0.1';
  const db = cmsStore.getDatabase();
  const newProj: ProjectCmsItem = {
    ...req.body,
    id: `proj-${Date.now()}`,
    slug: req.body.slug || req.body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    displayOrder: req.body.displayOrder || (db.projects.length + 1),
    published: req.body.published ?? true
  };
  db.projects.push(newProj);
  cmsStore.saveDatabase({ projects: db.projects }, user, 'Added Project', `Added ${newProj.title}`, ip);
  res.json({ success: true, data: newProj });
});

router.put('/cms/projects/:id', requireAdminAuth, (req: AuthenticatedRequest, res) => {
  const user = req.adminUser?.username || 'Admin';
  const ip = req.ip || '127.0.0.1';
  const db = cmsStore.getDatabase();
  const idx = db.projects.findIndex(p => p.id === req.params.id);
  if (idx === -1) {
    res.status(404).json({ error: 'Project not found.' });
    return;
  }
  db.projects[idx] = { ...db.projects[idx], ...req.body, id: req.params.id };
  cmsStore.saveDatabase({ projects: db.projects }, user, 'Updated Project', `Updated ${db.projects[idx].title}`, ip);
  res.json({ success: true, data: db.projects[idx] });
});

router.delete('/cms/projects/:id', requireAdminAuth, (req: AuthenticatedRequest, res) => {
  const user = req.adminUser?.username || 'Admin';
  const ip = req.ip || '127.0.0.1';
  const db = cmsStore.getDatabase();
  const removed = db.projects.find(p => p.id === req.params.id);
  db.projects = db.projects.filter(p => p.id !== req.params.id);
  cmsStore.saveDatabase({ projects: db.projects }, user, 'Deleted Project', `Deleted ${removed?.title || req.params.id}`, ip);
  res.json({ success: true, message: 'Project deleted.' });
});

// ==========================================
// 9. SERVICES CRUD
// ==========================================

router.post('/cms/services', requireAdminAuth, (req: AuthenticatedRequest, res) => {
  const user = req.adminUser?.username || 'Admin';
  const ip = req.ip || '127.0.0.1';
  const db = cmsStore.getDatabase();
  const newServ: ServiceCmsItem = {
    ...req.body,
    id: `serv-${Date.now()}`,
    displayOrder: req.body.displayOrder || (db.services.length + 1),
    published: req.body.published ?? true
  };
  db.services.push(newServ);
  cmsStore.saveDatabase({ services: db.services }, user, 'Added Service', `Added ${newServ.title}`, ip);
  res.json({ success: true, data: newServ });
});

router.put('/cms/services/:id', requireAdminAuth, (req: AuthenticatedRequest, res) => {
  const user = req.adminUser?.username || 'Admin';
  const ip = req.ip || '127.0.0.1';
  const db = cmsStore.getDatabase();
  const idx = db.services.findIndex(s => s.id === req.params.id);
  if (idx === -1) {
    res.status(404).json({ error: 'Service not found.' });
    return;
  }
  db.services[idx] = { ...db.services[idx], ...req.body, id: req.params.id };
  cmsStore.saveDatabase({ services: db.services }, user, 'Updated Service', `Updated ${db.services[idx].title}`, ip);
  res.json({ success: true, data: db.services[idx] });
});

router.delete('/cms/services/:id', requireAdminAuth, (req: AuthenticatedRequest, res) => {
  const user = req.adminUser?.username || 'Admin';
  const ip = req.ip || '127.0.0.1';
  const db = cmsStore.getDatabase();
  const removed = db.services.find(s => s.id === req.params.id);
  db.services = db.services.filter(s => s.id !== req.params.id);
  cmsStore.saveDatabase({ services: db.services }, user, 'Deleted Service', `Deleted ${removed?.title || req.params.id}`, ip);
  res.json({ success: true, message: 'Service deleted.' });
});

// ==========================================
// 10. ACHIEVEMENTS CRUD
// ==========================================

router.post('/cms/achievements', requireAdminAuth, (req: AuthenticatedRequest, res) => {
  const user = req.adminUser?.username || 'Admin';
  const ip = req.ip || '127.0.0.1';
  const db = cmsStore.getDatabase();
  const newAch: AchievementCmsItem = {
    ...req.body,
    id: `ach-${Date.now()}`,
    displayOrder: req.body.displayOrder || (db.achievements.length + 1),
    published: req.body.published ?? true
  };
  db.achievements.push(newAch);
  cmsStore.saveDatabase({ achievements: db.achievements }, user, 'Added Achievement', `Added ${newAch.title}`, ip);
  res.json({ success: true, data: newAch });
});

router.put('/cms/achievements/:id', requireAdminAuth, (req: AuthenticatedRequest, res) => {
  const user = req.adminUser?.username || 'Admin';
  const ip = req.ip || '127.0.0.1';
  const db = cmsStore.getDatabase();
  const idx = db.achievements.findIndex(a => a.id === req.params.id);
  if (idx === -1) {
    res.status(404).json({ error: 'Achievement not found.' });
    return;
  }
  db.achievements[idx] = { ...db.achievements[idx], ...req.body, id: req.params.id };
  cmsStore.saveDatabase({ achievements: db.achievements }, user, 'Updated Achievement', `Updated ${db.achievements[idx].title}`, ip);
  res.json({ success: true, data: db.achievements[idx] });
});

router.delete('/cms/achievements/:id', requireAdminAuth, (req: AuthenticatedRequest, res) => {
  const user = req.adminUser?.username || 'Admin';
  const ip = req.ip || '127.0.0.1';
  const db = cmsStore.getDatabase();
  const removed = db.achievements.find(a => a.id === req.params.id);
  db.achievements = db.achievements.filter(a => a.id !== req.params.id);
  cmsStore.saveDatabase({ achievements: db.achievements }, user, 'Deleted Achievement', `Deleted ${removed?.title || req.params.id}`, ip);
  res.json({ success: true, message: 'Achievement deleted.' });
});

// ==========================================
// 11. TESTIMONIALS CRUD
// ==========================================

router.post('/cms/testimonials', requireAdminAuth, (req: AuthenticatedRequest, res) => {
  const user = req.adminUser?.username || 'Admin';
  const ip = req.ip || '127.0.0.1';
  const db = cmsStore.getDatabase();
  const newTest: TestimonialCmsItem = {
    ...req.body,
    id: `test-${Date.now()}`,
    displayOrder: req.body.displayOrder || (db.testimonials.length + 1),
    published: req.body.published ?? true
  };
  db.testimonials.push(newTest);
  cmsStore.saveDatabase({ testimonials: db.testimonials }, user, 'Added Testimonial', `Added review from ${newTest.name}`, ip);
  res.json({ success: true, data: newTest });
});

router.put('/cms/testimonials/:id', requireAdminAuth, (req: AuthenticatedRequest, res) => {
  const user = req.adminUser?.username || 'Admin';
  const ip = req.ip || '127.0.0.1';
  const db = cmsStore.getDatabase();
  const idx = db.testimonials.findIndex(t => t.id === req.params.id);
  if (idx === -1) {
    res.status(404).json({ error: 'Testimonial not found.' });
    return;
  }
  db.testimonials[idx] = { ...db.testimonials[idx], ...req.body, id: req.params.id };
  cmsStore.saveDatabase({ testimonials: db.testimonials }, user, 'Updated Testimonial', `Updated review from ${db.testimonials[idx].name}`, ip);
  res.json({ success: true, data: db.testimonials[idx] });
});

router.delete('/cms/testimonials/:id', requireAdminAuth, (req: AuthenticatedRequest, res) => {
  const user = req.adminUser?.username || 'Admin';
  const ip = req.ip || '127.0.0.1';
  const db = cmsStore.getDatabase();
  const removed = db.testimonials.find(t => t.id === req.params.id);
  db.testimonials = db.testimonials.filter(t => t.id !== req.params.id);
  cmsStore.saveDatabase({ testimonials: db.testimonials }, user, 'Deleted Testimonial', `Deleted review from ${removed?.name || req.params.id}`, ip);
  res.json({ success: true, message: 'Testimonial deleted.' });
});

// ==========================================
// 12. SOCIAL MEDIA CRUD
// ==========================================

router.post('/cms/social', requireAdminAuth, (req: AuthenticatedRequest, res) => {
  const user = req.adminUser?.username || 'Admin';
  const ip = req.ip || '127.0.0.1';
  const db = cmsStore.getDatabase();
  const newSoc: SocialLinkCmsItem = {
    ...req.body,
    id: `soc-${Date.now()}`,
    displayOrder: req.body.displayOrder || (db.socialLinks.length + 1),
    enabled: req.body.enabled ?? true
  };
  db.socialLinks.push(newSoc);
  cmsStore.saveDatabase({ socialLinks: db.socialLinks }, user, 'Added Social Link', `Added ${newSoc.platform}`, ip);
  res.json({ success: true, data: newSoc });
});

router.put('/cms/social/:id', requireAdminAuth, (req: AuthenticatedRequest, res) => {
  const user = req.adminUser?.username || 'Admin';
  const ip = req.ip || '127.0.0.1';
  const db = cmsStore.getDatabase();
  const idx = db.socialLinks.findIndex(s => s.id === req.params.id);
  if (idx === -1) {
    res.status(404).json({ error: 'Social link not found.' });
    return;
  }
  db.socialLinks[idx] = { ...db.socialLinks[idx], ...req.body, id: req.params.id };
  cmsStore.saveDatabase({ socialLinks: db.socialLinks }, user, 'Updated Social Link', `Updated ${db.socialLinks[idx].platform}`, ip);
  res.json({ success: true, data: db.socialLinks[idx] });
});

router.delete('/cms/social/:id', requireAdminAuth, (req: AuthenticatedRequest, res) => {
  const user = req.adminUser?.username || 'Admin';
  const ip = req.ip || '127.0.0.1';
  const db = cmsStore.getDatabase();
  const removed = db.socialLinks.find(s => s.id === req.params.id);
  db.socialLinks = db.socialLinks.filter(s => s.id !== req.params.id);
  cmsStore.saveDatabase({ socialLinks: db.socialLinks }, user, 'Deleted Social Link', `Deleted ${removed?.platform || req.params.id}`, ip);
  res.json({ success: true, message: 'Social link deleted.' });
});

// ==========================================
// 13. NAVIGATION CRUD
// ==========================================

router.post('/cms/navigation', requireAdminAuth, (req: AuthenticatedRequest, res) => {
  const user = req.adminUser?.username || 'Admin';
  const ip = req.ip || '127.0.0.1';
  const db = cmsStore.getDatabase();
  const newNav: NavCmsItem = {
    ...req.body,
    id: `nav-${Date.now()}`,
    displayOrder: req.body.displayOrder || (db.navigation.length + 1),
    visible: req.body.visible ?? true
  };
  db.navigation.push(newNav);
  cmsStore.saveDatabase({ navigation: db.navigation }, user, 'Added Navigation Item', `Added ${newNav.name}`, ip);
  res.json({ success: true, data: newNav });
});

router.put('/cms/navigation/:id', requireAdminAuth, (req: AuthenticatedRequest, res) => {
  const user = req.adminUser?.username || 'Admin';
  const ip = req.ip || '127.0.0.1';
  const db = cmsStore.getDatabase();
  const idx = db.navigation.findIndex(n => n.id === req.params.id);
  if (idx === -1) {
    res.status(404).json({ error: 'Navigation item not found.' });
    return;
  }
  db.navigation[idx] = { ...db.navigation[idx], ...req.body, id: req.params.id };
  cmsStore.saveDatabase({ navigation: db.navigation }, user, 'Updated Navigation Item', `Updated ${db.navigation[idx].name}`, ip);
  res.json({ success: true, data: db.navigation[idx] });
});

router.delete('/cms/navigation/:id', requireAdminAuth, (req: AuthenticatedRequest, res) => {
  const user = req.adminUser?.username || 'Admin';
  const ip = req.ip || '127.0.0.1';
  const db = cmsStore.getDatabase();
  const removed = db.navigation.find(n => n.id === req.params.id);
  db.navigation = db.navigation.filter(n => n.id !== req.params.id);
  cmsStore.saveDatabase({ navigation: db.navigation }, user, 'Deleted Navigation Item', `Deleted ${removed?.name || req.params.id}`, ip);
  res.json({ success: true, message: 'Navigation item deleted.' });
});

// ==========================================
// 14. MEDIA LIBRARY & FILE UPLOADS
// ==========================================

// Handle Base64 file upload securely
router.post('/cms/media/upload', requireAdminAuth, (req: AuthenticatedRequest, res) => {
  const user = req.adminUser?.username || 'Admin';
  const ip = req.ip || '127.0.0.1';
  const { fileName, fileType, base64Data } = req.body;

  if (!fileName || !base64Data) {
    res.status(400).json({ error: 'File name and data are required.' });
    return;
  }

  // Validate allowed MIME types
  const allowedMimes = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml', 'image/gif', 'application/pdf'];
  if (fileType && !allowedMimes.includes(fileType.toLowerCase())) {
    res.status(400).json({ error: 'Unsupported file type. Only JPG, PNG, WEBP, SVG, and PDF files are allowed.' });
    return;
  }

  try {
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const ext = path.extname(fileName) || (fileType?.includes('png') ? '.png' : fileType?.includes('pdf') ? '.pdf' : '.jpg');
    const sanitizedBase = path.basename(fileName, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
    const uniqueFileName = `${sanitizedBase}_${Date.now()}${ext}`;
    const filePath = path.join(uploadsDir, uniqueFileName);

    const base64Clean = base64Data.replace(/^data:([A-Za-z-+\/]+);base64,/, '');
    const buffer = Buffer.from(base64Clean, 'base64');

    // 10MB limit check
    if (buffer.length > 10 * 1024 * 1024) {
      res.status(400).json({ error: 'File size exceeds maximum 10MB limit.' });
      return;
    }

    fs.writeFileSync(filePath, buffer);

    const publicUrl = `/uploads/${uniqueFileName}`;
    const newMedia: MediaItem = {
      id: `media-${Date.now()}`,
      filename: uniqueFileName,
      originalName: fileName,
      url: publicUrl,
      mimeType: fileType || 'image/jpeg',
      size: buffer.length,
      uploadedAt: new Date().toISOString()
    };

    const db = cmsStore.getDatabase();
    db.media = [newMedia, ...(db.media || [])];
    cmsStore.saveDatabase({ media: db.media }, user, 'Uploaded Media', `Uploaded ${fileName} (${(buffer.length / 1024).toFixed(1)} KB)`, ip);

    res.json({ success: true, data: newMedia });
  } catch (err: any) {
    console.error('File upload failed:', err);
    res.status(500).json({ error: `File upload failed: ${err.message}` });
  }
});

router.delete('/cms/media/:id', requireAdminAuth, (req: AuthenticatedRequest, res) => {
  const user = req.adminUser?.username || 'Admin';
  const ip = req.ip || '127.0.0.1';
  const db = cmsStore.getDatabase();
  const mediaItem = db.media.find(m => m.id === req.params.id);

  if (mediaItem) {
    try {
      const filePath = path.join(process.cwd(), 'public', mediaItem.url);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    } catch (e) {
      // file might not exist on disk
    }
  }

  db.media = db.media.filter(m => m.id !== req.params.id);
  cmsStore.saveDatabase({ media: db.media }, user, 'Deleted Media', `Deleted file ${mediaItem?.originalName || req.params.id}`, ip);
  res.json({ success: true, message: 'Media file removed.' });
});

// Activity logs
router.get('/cms/activity-logs', requireAdminAuth, (req: AuthenticatedRequest, res) => {
  const db = cmsStore.getDatabase();
  res.json({ success: true, data: db.activityLogs || [] });
});

export default router;
