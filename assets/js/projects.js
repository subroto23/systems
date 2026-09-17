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
    id: "acid",
    title: "ACID — Database Transactions",
    tagline: "রহিম ৫০০০ টাকা পাঠাল, করিম পেল না — কেন? ACID দিয়ে ব্যাখ্যা",
    description: "টাকা ট্রান্সফারের একটা বাস্তব উদাহরণ দিয়ে Atomicity, Consistency, Isolation, Durability — ACID-এর প্রতিটা প্রপার্টি ধাপে ধাপে ব্যাখ্যা করা হয়েছে। কোথায় transaction ফেইল করলে কী হয় আর database কীভাবে সেটা সামলায় — সব একটা অ্যানিমেটেড, ইন্টারঅ্যাক্টিভ স্টোরি আকারে।",
    url: "projects/acid/",
    category: "Database",
    tags: ["acid","transaction","database","consistency","atomicity","isolation","durability"],
    status: "live",
    icon: "💳"
  },
  {
    id: "auth-system",
    title: "Auth System — JWT, Redis, Permission",
    tagline: "পুরো Auth System এক নজরে — তুমি কে, তার প্রমাণ কীভাবে হয়?",
    description: "JWT টোকেন, Redis সেশন ও রোল-বেজড পারমিশন দিয়ে একটা সম্পূর্ণ Authentication ও Authorization সিস্টেম কীভাবে কাজ করে — লগইন থেকে শুরু করে টোকেন রিফ্রেশ, পারমিশন চেক পর্যন্ত পুরো ফ্লো ভিজ্যুয়ালি ব্যাখ্যা করা হয়েছে।",
    url: "projects/auth-system/",
    category: "Security",
    tags: ["auth","jwt","redis","permission","session","security"],
    status: "live",
    icon: "🔑"
  },
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
    id: "oop",
    title: "OOP — Object Oriented Programming",
    tagline: "প্রতিবার কি নতুন করে সব লিখতে হবে? OOP দিয়ে সমাধান",
    description: "কোড রিপিটিশনের সমস্যা থেকে শুরু করে ক্লাস, ইনহেরিটেন্স, এনক্যাপসুলেশন ও পলিমরফিজম — অবজেক্ট ওরিয়েন্টেড প্রোগ্রামিং-এর মূল ধারণাগুলো একটা বাস্তব সমস্যা-সমাধান স্টোরি আকারে ব্যাখ্যা করা হয়েছে।",
    url: "projects/oop/",
    category: "Programming Concepts",
    tags: ["oop","class","inheritance","design-patterns","reusability"],
    status: "live",
    icon: "🧩"
  },
  {
    id: "project-active-chat",
    title: "Active Chat System — Deep Dive",
    tagline: "রিয়েল-টাইম চ্যাট আর্কিটেকচার — গভীরভাবে বিশ্লেষণ",
    description: "মেসেজ ডেলিভারি, অনলাইন/অফলাইন স্ট্যাটাস, রুম ম্যানেজমেন্ট ও স্কেলিং চ্যালেঞ্জসহ একটা প্রোডাকশন-গ্রেড রিয়েল-টাইম চ্যাট সিস্টেমের ভেতরের আর্কিটেকচার ডিটেইলে ব্যাখ্যা করা হয়েছে।",
    url: "projects/project-active-chat/",
    category: "Realtime",
    tags: ["chat","realtime","websocket","deep-dive","architecture"],
    status: "live",
    icon: "💬"
  },
  {
    id: "project-add-ons",
    title: "AddOn Service System — Deep Dive",
    tagline: "১০০ জন শিক্ষকের জন্য কি একই সার্ভিস? — AddOn সিস্টেম ডিজাইন",
    description: "প্রতিটা ইউজারের আলাদা আলাদা অ্যাড-অন সার্ভিস দরকার হলে সেটা কীভাবে ফ্লেক্সিবল স্কিমা দিয়ে ম্যানেজ করা যায় — কমন ভুল আর তার সমাধান সহ পুরো ডিজাইন প্রসেস গভীরভাবে ব্যাখ্যা করা হয়েছে।",
    url: "projects/project-add-ons/",
    category: "Architecture",
    tags: ["addon","service","schema-design","deep-dive","architecture"],
    status: "live",
    icon: "🧱"
  },
  {
    id: "project-auth-system",
    title: "subrohub Auth System",
    tagline: "subrohub-এর জন্য বানানো সেন্ট্রালাইজড Auth সিস্টেম",
    description: "মাল্টি-অ্যাপ এনভায়রনমেন্টে একটাই সেন্ট্রালাইজড Auth সিস্টেম দিয়ে লগইন, টোকেন ম্যানেজমেন্ট ও পারমিশন কন্ট্রোল কীভাবে হ্যান্ডেল করা হয়েছে তার প্র্যাকটিক্যাল ব্যাখ্যা।",
    url: "projects/project-auth-system/",
    category: "Security",
    tags: ["auth","jwt","sso","security","subrohub"],
    status: "live",
    icon: "🛡️"
  },
  {
    id: "project-comment",
    title: "Comment System — Production Architecture",
    tagline: "নেস্টেড কমেন্ট ও রিপ্লাই — প্রোডাকশন-গ্রেড আর্কিটেকচার",
    description: "সেলফ-রেফারেন্সিয়াল ও রিকার্সিভ ডেটা স্ট্রাকচার দিয়ে নেস্টেড কমেন্ট/রিপ্লাই সিস্টেম কীভাবে এফিশিয়েন্টভাবে ডিজাইন ও কোয়েরি করা যায় তার প্রোডাকশন-রেডি আর্কিটেকচার ব্যাখ্যা করা হয়েছে।",
    url: "projects/project-comment/",
    category: "Database",
    tags: ["comment","recursive","self-referential","database","architecture"],
    status: "live",
    icon: "💭"
  },
  {
    id: "project-connection",
    title: "Socket.IO — Production Architecture",
    tagline: "কেন শুধু HTTP যথেষ্ট না — Socket.IO দিয়ে প্রোডাকশন আর্কিটেকচার",
    description: "রিয়েল-টাইম কানেকশনের জন্য HTTP কেন যথেষ্ট নয়, আর Socket.IO দিয়ে কীভাবে স্কেলেবল, রিলায়েবল প্রোডাকশন-গ্রেড কানেকশন আর্কিটেকচার বানানো যায় তার বিস্তারিত ব্যাখ্যা।",
    url: "projects/project-connection/",
    category: "Realtime",
    tags: ["socket.io","websocket","realtime","architecture","production"],
    status: "live",
    icon: "🔌"
  },
  {
    id: "project-postgresql",
    title: "PostgreSQL — ভেতরে কি হয়?",
    tagline: "তুমি INSERT INTO লিখলে ভেতরে আসলে কি ঘটে?",
    description: "একটা সাধারণ INSERT কোয়েরি লেখার পর PostgreSQL-এর ভেতরে ধাপে ধাপে কী ঘটে — WAL, buffer, index update, disk write — সব একটা ভিজ্যুয়াল, ইন্টারঅ্যাক্টিভ গল্প আকারে দেখানো হয়েছে।",
    url: "projects/project-postgresql/",
    category: "Database",
    tags: ["postgresql","database","internals","wal","insert"],
    status: "live",
    icon: "🐘"
  },
  {
    id: "project-reusable-code",
    title: "PostgreSQL + Prisma — Real-World Design Patterns",
    tagline: "PostgreSQL আর Prisma দিয়ে বাস্তব প্রজেক্টের ডিজাইন প্যাটার্ন",
    description: "PostgreSQL ও Prisma ORM একসাথে ব্যবহার করে বাস্তব প্রজেক্টে কীভাবে রিইউজেবল, মডিউল-বেজড ও মেইনটেইনেবল ডিজাইন প্যাটার্ন তৈরি করা যায় তার প্র্যাকটিক্যাল ব্যাখ্যা।",
    url: "projects/project-reusable-code/",
    category: "Database",
    tags: ["postgresql","prisma","orm","design-patterns","reusable-code"],
    status: "live",
    icon: "♻️"
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
  },
  {
    id: "system-active-chat",
    title: "Active Chat System",
    tagline: "Naive Approach কেন Fail করে? মেসেজ যাত্রার ৭টা Stage",
    description: "চ্যাট মেসেজ পাঠানোর naive পদ্ধতি কেন স্কেলে ফেইল করে, আর একটা মেসেজ পাঠানো থেকে ডেলিভার হওয়া পর্যন্ত ৭টা স্টেজে কী ঘটে — এই বেসিক কনসেপ্টগুলো সহজভাবে ব্যাখ্যা করা হয়েছে।",
    url: "projects/system-active-chat/",
    category: "Realtime",
    tags: ["chat","realtime","messaging","basics"],
    status: "live",
    icon: "💬"
  },
  {
    id: "system-add-ons",
    title: "AddOn Service System",
    tagline: "সমস্যাটা কী, আর ৫-Table Design দিয়ে সমাধান",
    description: "অ্যাড-অন সার্ভিস ম্যানেজ করার আসল সমস্যাটা কোথায় আর সেটা সমাধানে ব্যবহৃত ৫-টেবিলের সম্পূর্ণ স্কিমা ডিজাইন সহজভাবে ব্যাখ্যা করা হয়েছে।",
    url: "projects/system-add-ons/",
    category: "Architecture",
    tags: ["addon","service","schema-design","database"],
    status: "live",
    icon: "🧱"
  },
  {
    id: "system-pgbouncer",
    title: "PgBouncer + PostgreSQL",
    tagline: "১০০০ জন একসাথে লগইন করলে database কি টিকবে?",
    description: "হাজারো কনকারেন্ট কানেকশন সরাসরি PostgreSQL-এ গেলে কী সমস্যা হয়, আর PgBouncer দিয়ে connection pooling করে কীভাবে সেটা সামলানো যায় — সব ভিজ্যুয়ালি ব্যাখ্যা করা হয়েছে।",
    url: "projects/system-pgbouncer/",
    category: "Database",
    tags: ["pgbouncer","postgresql","connection-pooling","scalability"],
    status: "live",
    icon: "🚦"
  },
  {
    id: "system-project",
    title: "Comment System — Self-Referential & Recursive",
    tagline: "সবাই যে ভুলগুলো করে — Self-Referential Table Design",
    description: "নেস্টেড কমেন্ট সিস্টেম বানাতে গিয়ে সবাই যে কমন ভুলগুলো করে, আর সেলফ-রেফারেন্সিয়াল টেবিল ডিজাইন দিয়ে কীভাবে সেটা সঠিকভাবে করা যায় তার বেসিক ব্যাখ্যা।",
    url: "projects/system-project/",
    category: "Database",
    tags: ["comment","recursive","self-referential","database"],
    status: "live",
    icon: "💭"
  },
  {
    id: "system-reusable-code",
    title: "PostgreSQL + Prisma Patterns",
    tagline: "যে ভুলটা সবাই করে — Module-Based Architecture দিয়ে সমাধান",
    description: "PostgreSQL আর Prisma ব্যবহার করার সময় বেশিরভাগ ডেভেলপার যে কমন ভুলটা করে, আর মডিউল-বেজড আর্কিটেকচার দিয়ে কীভাবে রিইউজেবল কোড লেখা যায় তার বেসিক ব্যাখ্যা।",
    url: "projects/system-reusable-code/",
    category: "Database",
    tags: ["postgresql","prisma","orm","module-based","reusable-code"],
    status: "live",
    icon: "♻️"
  },
  {
    id: "system-socket-connection",
    title: "Socket.IO — Realtime System",
    tagline: "কেন HTTP যথেষ্ট না? — Socket System Architecture বেসিক",
    description: "রিকোয়েস্ট-রেসপন্স ভিত্তিক HTTP কেন রিয়েল-টাইম কমিউনিকেশনের জন্য যথেষ্ট নয়, আর Socket.IO দিয়ে বানানো একটা বেসিক রিয়েল-টাইম সিস্টেম আর্কিটেকচার কেমন দেখতে হয় তার সহজ ব্যাখ্যা।",
    url: "projects/system-socket-connection/",
    category: "Realtime",
    tags: ["socket.io","websocket","realtime","basics"],
    status: "live",
    icon: "🔌"
  }
];
