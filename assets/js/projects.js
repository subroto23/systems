/**
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
  {
    id: "how_to_use_redis",
    title: "প্রোডাকশনে Redis",
    tagline: "Redis প্রোডাকশনে ব্যবহার করার প্র্যাকটিক্যাল গাইড",
    description: "Redis প্রোডাকশন এনভায়রনমেন্টে কীভাবে সেটআপ, কনফিগার ও মেইনটেইন করতে হয় — persistence, memory eviction, connection pooling ও কমন পিটফল সহ প্র্যাকটিক্যাল, ভিজ্যুয়াল ব্যাখ্যা।",
    url: "projects/how_to_use_redis/",
    category: "Infrastructure",
    tags: ["redis","production","guide","persistence","caching","infrastructure"],
    status: "live",
    icon: "🛠️"
  },
  {
    id: "notification",
    title: "Push Notification System",
    tagline: "লাখো ইউজারকে রিয়েল-টাইম পুশ নোটিফিকেশন — স্কেলেবল ও রিলায়েবল",
    description: "queue-based (BullMQ) worker আর্কিটেকচার দিয়ে ৫ লাখ+ ইউজারকে batch-এ (FCM প্রতি কলে ৫০০ token) নোটিফিকেশন পাঠায়। cursor-based pagination, throttling, Redis distributed lock দিয়ে duplicate-job প্রতিরোধ, retry with exponential backoff, dead-token cleanup এবং cache-stampede প্রোটেকশন — সব একসাথে অ্যানিমেটেড স্টোরি আকারে ব্যাখ্যা করা আছে।",
    url: "projects/notification/",
    category: "Infrastructure",
    tags: ["notification","push","fcm","queue","bullmq","redis","scalability","infrastructure"],
    status: "live",
    icon: "🔔"
  },
  {
    id: "redis",
    title: "৫ লাখ ইউজারের গল্প",
    tagline: "Redis দিয়ে স্কেল করার গল্প — একটা সমস্যা থেকে আরেকটা সমাধান",
    description: "৫ লাখ+ ইউজারের লোড হ্যান্ডেল করতে গিয়ে ধাপে ধাপে কোন সমস্যা এসেছিল আর Redis দিয়ে কীভাবে প্রতিটা সমাধান করা হয়েছে — cache, queue, distributed lock, rate-limiting — সব একটা অ্যানিমেটেড, ইন্টারঅ্যাক্টিভ স্টোরি আকারে।",
    url: "projects/redis/",
    category: "Infrastructure",
    tags: ["redis","scale","cache","queue","lock","rate-limit","infrastructure","story"],
    status: "live",
    icon: "📖"
  }
];
