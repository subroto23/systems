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
 *
 *  ==== নতুন প্রজেক্ট নিজের সাইটেই (এই রিপোর মধ্যে) রাখতে চাইলে ====
 *  আলাদা কোনো ডোমেইন/সাবডোমেইন না থাকলেও সমস্যা নেই — এই রিপোর ভেতরেই
 *  একটা ফোল্ডার বানিয়ে সেই প্রজেক্টের নিজস্ব পেজ রাখতে পারেন:
 *
 *      projects/<project-slug>/index.html
 *
 *  তারপর নিচের url ফিল্ডে দিন:  "projects/<project-slug>/"
 *  (যেমন এই রিপোতে "notification" প্রজেক্টটা projects/notification/index.html এ আছে)
 * =============================================================
 */

const PROJECTS = [
  {
    id: "notification",
    title: "Push Notification System",
    tagline: "লাখো ইউজারকে রিয়েল-টাইম পুশ নোটিফিকেশন — স্কেলেবল ও রিলায়েবল",
    description:
      "queue-based (BullMQ) worker আর্কিটেকচার দিয়ে ৫ লাখ+ ইউজারকে batch-এ (FCM প্রতি কলে ৫০০ token) নোটিফিকেশন পাঠায়। cursor-based pagination, throttling, Redis distributed lock দিয়ে duplicate-job প্রতিরোধ, retry with exponential backoff, dead-token cleanup এবং cache-stampede প্রোটেকশন — সব একসাথে অ্যানিমেটেড স্টোরি আকারে ব্যাখ্যা করা আছে।",
    url: "projects/notification/",
    category: "Infrastructure",
    tags: ["notification", "push", "fcm", "queue", "bullmq", "redis", "scalability", "infrastructure"],
    status: "live",
    icon: "🔔"
  },
  {
    id: "redis-scale-story",
    title: "৫ লাখ ইউজারের গল্প",
    tagline: "Redis দিয়ে স্কেল করার গল্প — একটা সমস্যা থেকে আরেকটা সমাধান",
    description:
      "৫ লাখ+ ইউজারের লোড হ্যান্ডেল করতে গিয়ে ধাপে ধাপে কোন সমস্যা এসেছিল আর Redis দিয়ে কীভাবে প্রতিটা সমাধান করা হয়েছে — cache, queue, distributed lock, rate-limiting — সব একটা অ্যানিমেটেড, ইন্টারঅ্যাক্টিভ স্টোরি আকারে।",
    url: "projects/redis/",
    category: "Infrastructure",
    tags: ["redis", "scale", "cache", "queue", "lock", "rate-limit", "infrastructure", "story"],
    status: "live",
    icon: "📖"
  },
  {
    id: "redis-in-production",
    title: "প্রোডাকশনে Redis",
    tagline: "Redis প্রোডাকশনে ব্যবহার করার প্র্যাকটিক্যাল গাইড",
    description:
      "Redis প্রোডাকশন এনভায়রনমেন্টে কীভাবে সেটআপ, কনফিগার ও মেইনটেইন করতে হয় — persistence, memory eviction, connection pooling ও কমন পিটফল সহ প্র্যাকটিক্যাল, ভিজ্যুয়াল ব্যাখ্যা।",
    url: "projects/how_to_use_redis/",
    category: "Infrastructure",
    tags: ["redis", "production", "guide", "persistence", "caching", "infrastructure"],
    status: "live",
    icon: "🛠️"
  }

  // 👇 নতুন সিস্টেম অ্যাড করতে এখানে কমা দিয়ে আরেকটা object যোগ করুন
];
