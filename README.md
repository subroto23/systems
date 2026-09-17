# Systems Hub

আমার সকল প্রজেক্ট/সিস্টেমের কেন্দ্রীয় ডিরেক্টরি। প্লেইন HTML/CSS/JS — কোনো বিল্ড টুল বা ফ্রেমওয়ার্ক লাগে না, GitHub Pages-এ সরাসরি ডিপ্লয়যোগ্য।

## ফাইল স্ট্রাকচার

```
index.html                    → মূল পেজ (structure/markup)
assets/css/style.css          → সব স্টাইল (dark/light theme সহ)
assets/js/projects.js         → ⚠️ অটো-জেনারেটেড — হাতে এডিট করবেন না
assets/js/main.js             → রেন্ডারিং, সার্চ, ফিল্টার লজিক
assets/favicon.svg            → লোগো/ফেভিকন
manifest.json                 → PWA manifest
robots.txt                    → সার্চ ইঞ্জিন ক্রলিং
sitemap.xml / llms.txt        → ⚠️ অটো-জেনারেটেড — হাতে এডিট করবেন না
projects/<slug>/index.html    → প্রতিটা প্রজেক্টের নিজস্ব পেজ
projects/<slug>/meta.json     → ★ হাব কার্ডের তথ্য — নতুন প্রজেক্ট অ্যাড করতে এখানেই লিখবেন
scripts/generate-projects.js  → projects/*/meta.json থেকে projects.js, sitemap.xml, llms.txt বানায়
.github/workflows/sync-projects.yml → push করলে উপরের স্ক্রিপ্ট অটোমেটিক চালায়
```

## নতুন সিস্টেম/প্রজেক্ট অ্যাড করবেন কীভাবে (সম্পূর্ণ অটোমেটিক)

`assets/js/projects.js` আর হাতে এডিট করতে হয় না — এটা অটো-জেনারেটেড। নতুন প্রজেক্ট অ্যাড করতে শুধু একটা ফোল্ডার বানান:

```
projects/
  my-new-system/
    index.html    → প্রজেক্টের নিজস্ব পেজ
    meta.json      → হাব কার্ডের তথ্য
```

`meta.json`:

```json
{
  "title": "My New System",
  "tagline": "এক লাইনে এই সিস্টেম কী কাজ করে",
  "description": "দুই-তিন লাইনের বিস্তারিত বিবরণ।",
  "category": "Operations",
  "tags": ["keyword1", "keyword2"],
  "status": "live",
  "icon": "🚀"
}
```

তারপর `git add`, `commit`, `push` করুন main ব্রাঞ্চে — GitHub Actions (`.github/workflows/sync-projects.yml`) নিজে থেকেই `projects/*/meta.json` স্ক্যান করে `assets/js/projects.js` রিজেনারেট করে কমিট করে দেবে। মূল হাব পেজে (`index.html`) নতুন কার্ড, ফিল্টার চিপ ও সার্চ — সব অটোমেটিক আপডেট হয়ে যাবে। `url` ফিল্ড, `id` — কোনোটাই হাতে বসাতে হবে না, ফোল্ডারের নাম থেকেই তৈরি হয়।

`sitemap.xml` ও `llms.txt`-ও একই স্ক্রিপ্ট থেকে অটো-জেনারেট হয় — এগুলোতেও হাতে কিছু যোগ করার দরকার নেই।

### প্রতিটা প্রজেক্ট পেজে SEO + favicon — এটাও অটোমেটিক

স্ক্রিপ্টটা প্রতিটা `projects/<slug>/index.html`-এর `<head>`-এ (একটা মার্ক করা `AUTO-SEO` ব্লকে) নিজে থেকে বসিয়ে দেয়:

- `<title>`, `<meta name="description">`, `<meta name="keywords">` (মেটা.json থেকে)
- মূল হাবের favicon (`../../assets/favicon.svg`) ও PWA manifest লিংক
- `<link rel="canonical">` — নিজের সঠিক URL
- Open Graph + Twitter Card ট্যাগ (শেয়ার করলে প্রিভিউ সুন্দর দেখাবে)
- JSON-LD `SoftwareApplication` (হাবের সাথে `isPartOf` লিংক করা) + `BreadcrumbList` — যাতে Google, Bing ও AI এজেন্ট (ChatGPT/Claude search ইত্যাদি) পেজটা সহজে বুঝতে ও ইনডেক্স করতে পারে, এবং Google-এর সার্চ রেজাল্টে breadcrumb দেখাতে পারে
- Google Analytics (gtag.js, GA4) — প্রতিটা পেজে ভিজিটর ট্র্যাক করার জন্য
- একটা "← Systems Hub" ব্যাক বাটন (যদি পেজে নিজস্ব একটা আগে থেকে না থাকে)

এটা হাতে লেখা কিছুর দরকার নেই — `meta.json` ঠিকঠাক থাকলেই এই পুরো ব্লক অটো বসে যায়, এবং বারবার রান করলেও ব্লকটা রিপ্লেস হয় (ডুপ্লিকেট হয় না)।

### সার্চ ইঞ্জিনকে দ্রুত জানানো (IndexNow)

`.github/workflows/indexnow.yml` — main ব্রাঞ্চে যেকোনো push হলেই `sitemap.xml`-এর সব URL [IndexNow](https://www.indexnow.org/) প্রোটোকল দিয়ে Bing/Yandex-কে পাঠিয়ে দেয়, যাতে নতুন/পরিবর্তিত পেজ ক্রল হতে অপেক্ষা করতে না হয়। এর জন্য কোনো লগইন/API-কী লাগে না — রুটে থাকা `<key>.txt` ফাইলটাই ভেরিফিকেশন। (Google নিজে IndexNow সাপোর্ট করে না — Google-এর জন্য Search Console-এ সাইটম্যাপ সাবমিট করাই এখনো সবচেয়ে ভালো উপায়, এটা ম্যানুয়াল।)

লোকালি টেস্ট করতে চাইলে push না করেও চালাতে পারেন:

```bash
node scripts/generate-projects.js
```

## লোকালি টেস্ট করা

`fetch()` ব্যবহার করা হয়নি বলে `index.html` ফাইলটা সরাসরি ব্রাউজারে ডাবল-ক্লিক করে খুললেও (`file://`) কাজ করবে। তবে দ্রুত রিলোডের জন্য চাইলে:

```bash
python3 -m http.server 8000
# তারপর ব্রাউজারে http://localhost:8000 খুলুন
```

## GitHub Pages এ ডিপ্লয়

```bash
git init
git add .
git commit -m "Initial Systems Hub"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

তারপর GitHub রিপোতে গিয়ে **Settings → Pages → Source → main branch → / (root)** সিলেক্ট করে Save করুন। কিছুক্ষণের মধ্যে `https://<username>.github.io/<repo>/` এ লাইভ হয়ে যাবে। কাস্টম ডোমেইন (যেমন `systems.subromart.com`) ব্যবহার করতে চাইলে **Settings → Pages → Custom domain**-এ বসিয়ে DNS-এ CNAME রেকর্ড যোগ করুন।

> নোট: `index.html`, `manifest.json`, `robots.txt`, `sitemap.xml`, `llms.txt` — এই ফাইলগুলোতে `https://systems.subromart.com` হার্ডকোড করা আছে। আসল ডোমেইন ভিন্ন হলে এই ফাইলগুলোতে find & replace করে বদলে নিন।

## ফিচার

- ইনস্ট্যান্ট ক্লায়েন্ট-সাইড সার্চ (কীবোর্ড শর্টকাট: `/`)
- ক্যাটাগরি ফিল্টার চিপ
- Dark/Light থিম (সিস্টেম প্রেফারেন্স + ম্যানুয়াল টগল, লোকাল স্টোরেজে মনে রাখে)
- Responsive — মোবাইল থেকে ডেস্কটপ
- SEO: meta tags, Open Graph, Twitter Card, JSON-LD — মূল হাব পেজে ও প্রতিটা প্রজেক্ট পেজে আলাদা আলাদাভাবে, অটো-জেনারেটেড
- AI সার্চ: `llms.txt` কনভেনশন অনুসরণ করে
- Accessible: skip-link, aria-labels, semantic HTML
