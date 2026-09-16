/**
 * =============================================================
 *  নতুন সিস্টেম/প্রজেক্ট অ্যাড করতে চাইলে শুধু নিচের PROJECTS
 *  array-এ একটা নতুন object যোগ করুন। কোনো বিল্ড/কম্পাইল লাগবে না —
 *  সেভ করে সরাসরি ডিপ্লয় করলেই চলবে।
 *
 *  ফিল্ডের অর্থ:
 *  - id          : ইউনিক আইডি (স্লাগ), URL/JSON-LD-তে ব্যবহার হয়
 *  - title       : সিস্টেমের নাম
 *  - tagline     : এক লাইনে কাজ কী (কার্ডে বড় করে দেখাবে)
 *  - description : ২-৩ লাইনের বিস্তারিত বিবরণ
 *  - url         : সিস্টেমের নিজস্ব লিংক (ক্লিক করলে এখানে যাবে)
 *  - category    : ফিল্টার চিপ-এ যে ক্যাটাগরির নিচে দেখাবে
 *  - tags        : সার্চের জন্য কীওয়ার্ড (array)
 *  - status      : "live" | "beta" | "development"
 *  - icon        : এক বা দুইটা ইমোজি (কার্ডের আইকন)
 * =============================================================
 */

const PROJECTS = [
  {
    id: "inventory-system",
    title: "Inventory Management System",
    tagline: "রিয়েল-টাইম স্টক ও ওয়্যারহাউজ ব্যবস্থাপনা",
    description:
      "মাল্টি-ওয়্যারহাউজ স্টক ট্র্যাকিং, লো-স্টক অ্যালার্ট, সাপ্লায়ার ও পারচেজ অর্ডার ম্যানেজমেন্ট সহ একটি সম্পূর্ণ ইনভেন্টরি সিস্টেম।",
    url: "https://inventory.subromart.com",
    category: "Operations",
    tags: ["inventory", "stock", "warehouse", "operations"],
    status: "live",
    icon: "📦"
  },
  {
    id: "billing-system",
    title: "Billing & Invoicing System",
    tagline: "স্বয়ংক্রিয় ইনভয়েস, পেমেন্ট ও রিপোর্টিং",
    description:
      "কাস্টমার ইনভয়েস জেনারেশন, পেমেন্ট ট্র্যাকিং, ট্যাক্স ক্যালকুলেশন এবং মাসিক আর্থিক রিপোর্ট অটোমেটিক তৈরি করে এই সিস্টেম।",
    url: "https://billing.subromart.com",
    category: "Finance",
    tags: ["billing", "invoice", "payment", "finance"],
    status: "live",
    icon: "🧾"
  },
  {
    id: "auth-gateway",
    title: "Auth Gateway",
    tagline: "সেন্ট্রালাইজড লগইন ও পারমিশন কন্ট্রোল",
    description:
      "সব সিস্টেমের জন্য একটাই লগইন — SSO, রোল-বেজড অ্যাক্সেস কন্ট্রোল এবং সিকিউর টোকেন ম্যানেজমেন্ট এই গেটওয়ে পরিচালনা করে।",
    url: "https://auth.subromart.com",
    category: "Infrastructure",
    tags: ["auth", "login", "sso", "security", "infrastructure"],
    status: "live",
    icon: "🔐"
  },
  {
    id: "crm-system",
    title: "Customer CRM",
    tagline: "কাস্টমার রিলেশনশিপ ও সেলস পাইপলাইন",
    description:
      "লিড ট্র্যাকিং, কাস্টমার হিস্ট্রি, ফলো-আপ রিমাইন্ডার এবং সেলস পাইপলাইন ভিজুয়ালাইজেশন — সব একসাথে।",
    url: "https://crm.subromart.com",
    category: "Sales",
    tags: ["crm", "sales", "customer", "leads"],
    status: "beta",
    icon: "🤝"
  },
  {
    id: "analytics-dashboard",
    title: "Analytics Dashboard",
    tagline: "সব সিস্টেমের ডেটা এক ড্যাশবোর্ডে",
    description:
      "প্রতিটা সিস্টেম থেকে আসা ডেটা একত্র করে রিয়েল-টাইম চার্ট, KPI ও ট্রেন্ড অ্যানালাইসিস দেখায় এই ড্যাশবোর্ড।",
    url: "https://analytics.subromart.com",
    category: "Analytics",
    tags: ["analytics", "dashboard", "reports", "kpi"],
    status: "development",
    icon: "📊"
  }

  // 👇 নতুন সিস্টেম অ্যাড করতে এখানে কমা দিয়ে আরেকটা object যোগ করুন
];
