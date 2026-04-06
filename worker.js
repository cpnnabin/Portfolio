/**
 * portfolio-api — Cloudflare Worker
 * Serves all portfolio data from D1 and handles contact form submissions.
 *
 * Bind your D1 database as "DB" in wrangler.toml:
 *   [[d1_databases]]
 *   binding = "DB"
 *   database_name = "portfolio"
 *   database_id   = "56a2ce6c-17ed-4e3e-a885-ce0699aac212"
 */

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
  });
}

function err(message, status = 500) {
  return json({ error: message }, status);
}

/* ── Route helpers ───────────────────────────────────────────────────── */

async function getProfile(db) {
  try {
    const row = await db.prepare('SELECT * FROM profile WHERE id = 1').first();
    if (!row) return err('Profile not found', 404);
    return json(row);
  } catch (e) {
    return err('Failed to load profile: ' + e.message);
  }
}

async function getSkills(db) {
  try {
    const { results } = await db
      .prepare('SELECT * FROM skills ORDER BY category, id')
      .all();
    return json(results);
  } catch (e) {
    return err('Failed to load skills: ' + e.message);
  }
}

async function getProjects(db) {
  try {
    const { results } = await db
      .prepare('SELECT * FROM projects ORDER BY id')
      .all();
    return json(results);
  } catch (e) {
    return err('Failed to load projects: ' + e.message);
  }
}

async function getEducation(db) {
  try {
    const { results } = await db
      .prepare('SELECT * FROM education ORDER BY sort_order, id')
      .all();
    return json(results);
  } catch (e) {
    return err('Failed to load education: ' + e.message);
  }
}

async function getExperience(db) {
  try {
    const { results } = await db
      .prepare('SELECT * FROM experience ORDER BY sort_order, id')
      .all();
    return json(results);
  } catch (e) {
    return err('Failed to load experience: ' + e.message);
  }
}

async function getSocialLinks(db) {
  try {
    const { results } = await db
      .prepare('SELECT * FROM social_links ORDER BY id')
      .all();
    return json(results);
  } catch (e) {
    return err('Failed to load social links: ' + e.message);
  }
}

async function getTechStack(db) {
  try {
    const { results } = await db
      .prepare('SELECT * FROM tech_stack ORDER BY display_order, id')
      .all();
    return json(results);
  } catch (e) {
    return err('Failed to load tech stack: ' + e.message);
  }
}

async function getAllData(db) {
  try {
    const [profile, skills, projects, education, experience, social, tech] =
      await Promise.all([
        db.prepare('SELECT * FROM profile WHERE id = 1').first(),
        db.prepare('SELECT * FROM skills ORDER BY category, id').all(),
        db.prepare('SELECT * FROM projects ORDER BY id').all(),
        db.prepare('SELECT * FROM education ORDER BY sort_order, id').all(),
        db.prepare('SELECT * FROM experience ORDER BY sort_order, id').all(),
        db.prepare('SELECT * FROM social_links ORDER BY id').all(),
        db.prepare('SELECT * FROM tech_stack ORDER BY display_order, id').all(),
      ]);

    return json({
      profile,
      skills: skills.results,
      projects: projects.results,
      education: education.results,
      experience: experience.results,
      socialLinks: social.results,
      techStack: tech.results,
    });
  } catch (e) {
    return err('Failed to load portfolio data: ' + e.message);
  }
}

async function postContact(request, db) {
  try {
    const body = await request.json().catch(() => null);
    if (!body) return err('Invalid JSON body', 400);

    const { name, email, subject, message } = body;
    if (!name || !email || !subject || !message) {
      return err('All fields are required', 400);
    }

    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(email)) return err('Invalid email address', 400);
    if (name.trim().length < 2)  return err('Name is too short', 400);
    if (subject.trim().length < 5) return err('Subject is too short', 400);
    if (message.trim().length < 10) return err('Message is too short', 400);

    await db
      .prepare(
        'INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)'
      )
      .bind(
        name.trim(),
        email.trim(),
        `[${subject.trim()}] ${message.trim()}`
      )
      .run();

    return json({ success: true, message: 'Message received! I\'ll get back to you soon.' });
  } catch (e) {
    return err('Failed to save message: ' + e.message);
  }
}

/* ── Main fetch handler ──────────────────────────────────────────────── */

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/$/, '') || '/';
    const method = request.method.toUpperCase();

    // Preflight
    if (method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }

    const db = env.DB;
    if (!db) return err('Database binding not configured', 503);

    // Router
    if (method === 'GET') {
      if (path === '/api/all')        return getAllData(db);
      if (path === '/api/profile')    return getProfile(db);
      if (path === '/api/skills')     return getSkills(db);
      if (path === '/api/projects')   return getProjects(db);
      if (path === '/api/education')  return getEducation(db);
      if (path === '/api/experience') return getExperience(db);
      if (path === '/api/social')     return getSocialLinks(db);
      if (path === '/api/tech-stack') return getTechStack(db);
    }

    if (method === 'POST') {
      if (path === '/api/contact') return postContact(request, db);
    }

    return err('Not found', 404);
  },
};