#!/usr/bin/env node
/**
 * projects/<slug>/meta.json ফাইলগুলো স্ক্যান করে:
 *   1. assets/js/projects.js, sitemap.xml, llms.txt অটোমেটিক জেনারেট করে
 *   2. প্রতিটা projects/<slug>/index.html-এর <head>-এ SEO ব্লক (title,
 *      description, keywords, canonical, favicon, Open Graph, Twitter
 *      card, JSON-LD) ইনজেক্ট করে — যাতে মূল হাবের favicon প্রতিটা
 *      প্রজেক্ট পেজেও দেখা যায় এবং সার্চ ইঞ্জিন/AI এজেন্ট সহজে প্রতিটা
 *      পেজ বুঝতে ও ইনডেক্স করতে পারে
 *
 * নতুন প্রজেক্ট অ্যাড করতে শুধু একটা ফোল্ডার বানান:
 *
 *   projects/<slug>/index.html   → প্রজেক্টের নিজস্ব পেজ
 *   projects/<slug>/meta.json    → হাব কার্ডের তথ্য (নিচে ফরম্যাট দেখুন)
 *
 * meta.json ফরম্যাট:
 * {
 *   "title": "...", "tagline": "...", "description": "...",
 *   "category": "...", "tags": ["..."], "status": "live|beta|development",
 *   "icon": "🔔"
 * }
 *
 * এরপর push করলেই GitHub Actions (.github/workflows/sync-projects.yml)
 * এই স্ক্রিপ্ট চালিয়ে সব ফাইল অটোমেটিক আপডেট ও কমিট করে দেয়।
 * লোকালি ম্যানুয়ালি রান করতেও পারেন: node scripts/generate-projects.js
 * (স্ক্রিপ্টটা idempotent — বারবার চালালেও ডুপ্লিকেট ব্লক তৈরি হয় না।)
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const PROJECTS_DIR = path.join(ROOT, "projects");
const OUTPUT_FILE = path.join(ROOT, "assets", "js", "projects.js");
const SITEMAP_FILE = path.join(ROOT, "sitemap.xml");
const LLMS_FILE = path.join(ROOT, "llms.txt");
const SITE_ORIGIN = "https://systems.subromart.com";

function readProjects() {
  if (!fs.existsSync(PROJECTS_DIR)) return [];

  const slugs = fs
    .readdirSync(PROJECTS_DIR, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name)
    .sort((a, b) => a.localeCompare(b));

  const projects = [];
  for (const slug of slugs) {
    const metaPath = path.join(PROJECTS_DIR, slug, "meta.json");
    const indexPath = path.join(PROJECTS_DIR, slug, "index.html");

    if (!fs.existsSync(indexPath)) {
      console.warn(`⚠️  projects/${slug}/index.html পাওয়া যায়নি — বাদ দেওয়া হলো।`);
      continue;
    }
    if (!fs.existsSync(metaPath)) {
      console.warn(`⚠️  projects/${slug}/meta.json পাওয়া যায়নি — বাদ দেওয়া হলো।`);
      continue;
    }

    let meta;
    try {
      meta = JSON.parse(fs.readFileSync(metaPath, "utf8"));
    } catch (err) {
      console.warn(`⚠️  projects/${slug}/meta.json পার্স করা যায়নি — বাদ দেওয়া হলো। (${err.message})`);
      continue;
    }

    const required = ["title", "tagline", "description", "category", "status"];
    const missing = required.filter(k => !meta[k]);
    if (missing.length) {
      console.warn(`⚠️  projects/${slug}/meta.json-এ ফিল্ড নেই: ${missing.join(", ")} — বাদ দেওয়া হলো।`);
      continue;
    }

    projects.push({
      id: slug,
      title: meta.title,
      tagline: meta.tagline,
      description: meta.description,
      url: `projects/${slug}/`,
      category: meta.category,
      tags: Array.isArray(meta.tags) ? meta.tags : [],
      status: meta.status,
      icon: meta.icon || "🧩"
    });
  }

  return projects;
}

function render(projects) {
  const entries = projects
    .map(p => `  {
    id: ${JSON.stringify(p.id)},
    title: ${JSON.stringify(p.title)},
    tagline: ${JSON.stringify(p.tagline)},
    description: ${JSON.stringify(p.description)},
    url: ${JSON.stringify(p.url)},
    category: ${JSON.stringify(p.category)},
    tags: ${JSON.stringify(p.tags)},
    status: ${JSON.stringify(p.status)},
    icon: ${JSON.stringify(p.icon)}
  }`)
    .join(",\n");

  return `/**
 * =============================================================
 *  ⚠️  এই ফাইলটি অটো-জেনারেটেড — সরাসরি এডিট করবেন না।
 *
 *  নতুন সিস্টেম/প্রজেক্ট অ্যাড করতে চাইলে:
 *    projects/<slug>/index.html   → প্রজেক্টের নিজস্ব পেজ
 *    projects/<slug>/meta.json    → হাব কার্ডের তথ্য (title, tagline,
 *                                    description, category, tags,
 *                                    status, icon)
 *
 *  তারপর শুধু push করলেই GitHub Actions অটোমেটিক এই ফাইলটা
 *  রিজেনারেট করে দেবে — assets/js/projects.js হাতে এডিট করার
 *  দরকার নেই।
 *
 *  লোকালি রিজেনারেট করতে: node scripts/generate-projects.js
 * =============================================================
 */

const PROJECTS = [
${entries}
];
`;
}

function escapeHtml(str) {
  return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function escapeAttr(str) {
  return escapeHtml(str).replace(/"/g, "&quot;");
}

const SEO_START = "<!-- AUTO-SEO:START (scripts/generate-projects.js জেনারেট করে — সরাসরি এডিট করবেন না) -->";
const SEO_END = "<!-- AUTO-SEO:END -->";

function seoBlock(p, includeTitle) {
  const url = `${SITE_ORIGIN}/${p.url}`;
  const keywords = (p.tags || []).join(", ");
  const ld = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: p.title,
    description: p.description,
    url,
    applicationCategory: p.category,
    isPartOf: { "@type": "CollectionPage", name: "Systems Hub", url: `${SITE_ORIGIN}/` },
    author: { "@type": "Person", name: "Subroto Das" }
  };

  return `${SEO_START}
${includeTitle ? `<title>${escapeHtml(p.title)}</title>\n` : ""}<meta name="description" content="${escapeAttr(p.description)}">
<meta name="keywords" content="${escapeAttr(keywords)}">
<meta name="author" content="Subroto Das">
<meta name="robots" content="index, follow">
<link rel="canonical" href="${url}">
<link rel="icon" href="../../assets/favicon.svg" type="image/svg+xml">
<link rel="manifest" href="../../manifest.json">
<meta property="og:type" content="article">
<meta property="og:title" content="${escapeAttr(p.title)}">
<meta property="og:description" content="${escapeAttr(p.tagline)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${SITE_ORIGIN}/assets/og-cover.png">
<meta property="og:locale" content="bn_BD">
<meta property="og:site_name" content="Systems Hub">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${escapeAttr(p.title)}">
<meta name="twitter:description" content="${escapeAttr(p.tagline)}">
<meta name="twitter:image" content="${SITE_ORIGIN}/assets/og-cover.png">
<script type="application/ld+json">${JSON.stringify(ld)}</script>
${SEO_END}`;
}

function injectSeo(projects) {
  for (const p of projects) {
    const filePath = path.join(PROJECTS_DIR, p.id, "index.html");
    if (!fs.existsSync(filePath)) continue;

    let html = fs.readFileSync(filePath, "utf8");

    // আগের AUTO-SEO ব্লক (থাকলে) সরিয়ে ফেলি, যাতে "head-এ আগে থেকেই <title> আছে কিনা"
    // সেটা নির্ভুলভাবে চেক করা যায় (নাহলে আগের রানের ইনজেক্টেড title-কেও আসল title ভেবে বসবে)।
    const prevStart = html.indexOf(SEO_START);
    if (prevStart !== -1) {
      let prevEnd = html.indexOf(SEO_END, prevStart);
      if (prevEnd !== -1) {
        prevEnd += SEO_END.length;
        // আগের রানে ব্লকের ঠিক পরে যে "\n" জোড়া হয়েছিল, সেটাও সরিয়ে ফেলি —
        // নাহলে প্রতি রানে একটা করে ফাঁকা লাইন জমতে থাকবে (idempotent নয়)।
        if (html[prevEnd] === "\n") prevEnd += 1;
        html = html.slice(0, prevStart) + html.slice(prevEnd);
      }
    }

    if (!html.includes("</head>")) {
      console.warn(`⚠️  projects/${p.id}/index.html-এ </head> পাওয়া যায়নি — SEO ব্লক যোগ করা গেল না।`);
      continue;
    }

    const headEnd = html.indexOf("</head>");
    const hasTitle = /<title[\s>]/i.test(html.slice(0, headEnd));
    const block = seoBlock(p, !hasTitle);
    html = html.slice(0, headEnd) + `${block}\n` + html.slice(headEnd);

    fs.writeFileSync(filePath, html, "utf8");
  }
}

const BACKLINK_START = "<!-- AUTO-BACKLINK:START (scripts/generate-projects.js জেনারেট করে — সরাসরি এডিট করবেন না) -->";
const BACKLINK_END = "<!-- AUTO-BACKLINK:END -->";

function backLinkBlock() {
  return `${BACKLINK_START}
<a href="../../index.html" aria-label="Systems Hub-এ ফিরে যান" style="position:fixed;top:14px;left:14px;z-index:2147483647;display:inline-flex;align-items:center;gap:6px;padding:8px 14px;border-radius:999px;background:rgba(11,13,20,.82);color:#eef0f6;font:600 13px/1.2 'Hind Siliguri',system-ui,-apple-system,sans-serif;text-decoration:none;backdrop-filter:blur(6px);border:1px solid rgba(255,255,255,.14);box-shadow:0 4px 16px rgba(0,0,0,.35)"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="flex-shrink:0"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>Systems Hub</a>
${BACKLINK_END}`;
}

function injectBackLink(projects) {
  for (const p of projects) {
    const filePath = path.join(PROJECTS_DIR, p.id, "index.html");
    if (!fs.existsSync(filePath)) continue;

    let html = fs.readFileSync(filePath, "utf8");

    let prevStart = html.indexOf(BACKLINK_START);
    if (prevStart !== -1) {
      const prevEnd = html.indexOf(BACKLINK_END, prevStart);
      if (prevEnd !== -1) {
        // ইনজেক্ট করার সময় ব্লকের ঠিক আগে একটা "\n" জোড়া হয়েছিল, সেটাও সরিয়ে
        // ফেলি — নাহলে প্রতি রানে একটা করে ফাঁকা লাইন জমতে থাকবে।
        if (html[prevStart - 1] === "\n") prevStart -= 1;
        html = html.slice(0, prevStart) + html.slice(prevEnd + BACKLINK_END.length);
      }
    }

    // পেজে আগে থেকেই কারো হাতে বানানো "← Systems Hub" ব্যাক লিংক থাকলে
    // (যেমন notification/index.html-এ আছে) সেটাকেই রাখি, ডুপ্লিকেট বসাই না।
    if (/href=["']\.\.\/\.\.\/index\.html["']/.test(html)) {
      fs.writeFileSync(filePath, html, "utf8");
      continue;
    }

    const bodyMatch = html.match(/<body[^>]*>/);
    if (!bodyMatch) {
      console.warn(`⚠️  projects/${p.id}/index.html-এ <body> পাওয়া যায়নি — ব্যাক লিংক যোগ করা গেল না।`);
      fs.writeFileSync(filePath, html, "utf8");
      continue;
    }

    const insertAt = bodyMatch.index + bodyMatch[0].length;
    html = html.slice(0, insertAt) + "\n" + backLinkBlock() + html.slice(insertAt);
    fs.writeFileSync(filePath, html, "utf8");
  }
}

function renderSitemap(projects) {
  const today = new Date().toISOString().slice(0, 10);
  const urls = [
    `  <url>\n    <loc>${SITE_ORIGIN}/</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>1.0</priority>\n  </url>`,
    ...projects.map(
      p => `  <url>\n    <loc>${SITE_ORIGIN}/${p.url}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.8</priority>\n  </url>`
    )
  ];
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`;
}

function renderLlmsTxt(projects) {
  const lines = projects.map(
    p => `- [${p.title}](${SITE_ORIGIN}/${p.url}): ${p.description}`
  );
  return `# Systems Hub

> প্রডাকশন-গ্রেড সিস্টেম ও প্রজেক্টসমূহের কেন্দ্রীয় ডিরেক্টরি। প্রতিটি লিংক একটি স্বতন্ত্র সিস্টেমের বিস্তারিত পেজে যায়।

এই ফাইলটি AI/LLM-চালিত সার্চ ও ক্রলারদের জন্য — প্রতিটি সিস্টেমের নাম, কাজ, এবং লিংক এক জায়গায়।
⚠️ এই ফাইলটি অটো-জেনারেটেড (projects/*/meta.json থেকে) — সরাসরি এডিট করবেন না, node scripts/generate-projects.js চালান।

## Systems

${lines.join("\n")}
`;
}

function main() {
  const projects = readProjects();
  fs.writeFileSync(OUTPUT_FILE, render(projects), "utf8");
  fs.writeFileSync(SITEMAP_FILE, renderSitemap(projects), "utf8");
  fs.writeFileSync(LLMS_FILE, renderLlmsTxt(projects), "utf8");
  injectSeo(projects);
  injectBackLink(projects);
  console.log(`✅ ${projects.length} টা প্রজেক্ট দিয়ে assets/js/projects.js, sitemap.xml, llms.txt জেনারেট হলো, এবং প্রতিটা প্রজেক্ট পেজে SEO/favicon/ব্যাক-লিংক ইনজেক্ট করা হলো।`);
}

main();
