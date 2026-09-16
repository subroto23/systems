# Systems Hub

আমার সকল প্রজেক্ট/সিস্টেমের কেন্দ্রীয় ডিরেক্টরি। প্লেইন HTML/CSS/JS — কোনো বিল্ড টুল বা ফ্রেমওয়ার্ক লাগে না, GitHub Pages-এ সরাসরি ডিপ্লয়যোগ্য।

## ফাইল স্ট্রাকচার

```
index.html                 → মূল পেজ (structure/markup)
assets/css/style.css       → সব স্টাইল (dark/light theme সহ)
assets/js/projects.js      → ★ সিস্টেমের ডেটা — এখানেই নতুন প্রজেক্ট অ্যাড করবেন
assets/js/main.js          → রেন্ডারিং, সার্চ, ফিল্টার লজিক
assets/favicon.svg         → লোগো/ফেভিকন
manifest.json              → PWA manifest
robots.txt / sitemap.xml   → সার্চ ইঞ্জিন ক্রলিং
llms.txt                   → AI/LLM ক্রলারদের জন্য সংক্ষিপ্ত সিস্টেম-তালিকা
```

## নতুন সিস্টেম অ্যাড করবেন কীভাবে

`assets/js/projects.js` ফাইল খুলুন, `PROJECTS` array-এর শেষে একটা নতুন object যোগ করুন:

```js
{
  id: "my-new-system",
  title: "My New System",
  tagline: "এক লাইনে এই সিস্টেম কী কাজ করে",
  description: "দুই-তিন লাইনের বিস্তারিত বিবরণ।",
  url: "https://my-new-system.subromart.com",
  category: "Operations",       // filter chip এ এই নামেই দেখাবে
  tags: ["keyword1", "keyword2"], // সার্চের জন্য
  status: "live",                // live | beta | development
  icon: "🚀"
}
```

সেভ করুন — ব্যস, পেজে নতুন কার্ড, নতুন ফিল্টার চিপ (যদি নতুন ক্যাটাগরি হয়), এবং সার্চ — সব অটোমেটিক আপডেট হয়ে যাবে। কোনো বিল্ড/কম্পাইল স্টেপ নেই।

(ঐচ্ছিক) SEO/AI সার্চের জন্য `llms.txt` এবং `sitemap.xml` ফাইলেও একই সিস্টেমের একটা লাইন যোগ করে রাখতে পারেন।

## প্রজেক্টের নিজস্ব পেজ এই রিপোর ভেতরেই রাখতে চাইলে

সব প্রজেক্টের আলাদা ডোমেইন না থাকলেও সমস্যা নেই — এই রিপোর ভেতরেই প্রতিটা প্রজেক্টের জন্য একটা ফোল্ডার বানিয়ে সেখানে তার নিজস্ব `index.html` রাখা যায়:

```
projects/
  notification/
    index.html      → এই প্রজেক্টের নিজস্ব পেজ (নিজের স্টাইল/স্ক্রিপ্ট থাকতে পারে)
  <আরেকটা-প্রজেক্ট>/
    index.html
```

তারপর `assets/js/projects.js`-এ সেই প্রজেক্টের `url` ফিল্ডে দিন: `"projects/<project-slug>/"`

প্রতিটা প্রজেক্ট পেজে সুবিধার জন্য রাখুন:
- `<title>` ও `<meta name="description">` — নিজের মতো করে
- `<link rel="canonical" href="https://systems.subromart.com/projects/<slug>/">`
- একটা "← Systems Hub" ব্যাক লিংক (`../../index.html`), `projects/notification/index.html`-এ যেভাবে আছে

নতুন প্রজেক্ট পেজ অ্যাড করার পর `sitemap.xml`-এও একটা `<url>` এন্ট্রি যোগ করে রাখুন।

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
- SEO: meta tags, Open Graph, Twitter Card, JSON-LD (`CollectionPage` + প্রতিটি প্রজেক্টের জন্য `SoftwareApplication` ItemList — dynamically injected)
- AI সার্চ: `llms.txt` কনভেনশন অনুসরণ করে
- Accessible: skip-link, aria-labels, semantic HTML
