#!/usr/bin/env node
/**
 * projects/<slug>/meta.json ফাইলগুলো স্ক্যান করে assets/js/projects.js
 * অটোমেটিক জেনারেট করে। নতুন প্রজেক্ট অ্যাড করতে শুধু একটা ফোল্ডার বানান:
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
 * এই স্ক্রিপ্ট চালিয়ে assets/js/projects.js অটোমেটিক আপডেট ও কমিট করে দেয়।
 * লোকালি ম্যানুয়ালি রান করতেও পারেন: node scripts/generate-projects.js
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

function renderSitemap(projects) {
  const urls = [
    `  <url>\n    <loc>${SITE_ORIGIN}/</loc>\n    <changefreq>weekly</changefreq>\n    <priority>1.0</priority>\n  </url>`,
    ...projects.map(
      p => `  <url>\n    <loc>${SITE_ORIGIN}/${p.url}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.8</priority>\n  </url>`
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
  console.log(`✅ ${projects.length} টা প্রজেক্ট দিয়ে assets/js/projects.js, sitemap.xml, llms.txt জেনারেট হলো।`);
}

main();
