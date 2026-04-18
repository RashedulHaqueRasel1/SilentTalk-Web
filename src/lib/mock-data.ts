import type { Category, Post } from "@/types";

export const CATEGORIES: Category[] = [
  "Confessions",
  "Questions",
  "Rants",
  "Stories",
  "Advice",
  "Thoughts",
  "Work",
  "Relationships",
];

export const CATEGORY_META: Record<Category, { emoji: string; color: string }> = {
  Confessions: { emoji: "🤫", color: "bg-fuchsia-500/15 text-fuchsia-300 border-fuchsia-500/30" },
  Questions: { emoji: "❓", color: "bg-sky-500/15 text-sky-300 border-sky-500/30" },
  Rants: { emoji: "🔥", color: "bg-rose-500/15 text-rose-300 border-rose-500/30" },
  Stories: { emoji: "📖", color: "bg-amber-500/15 text-amber-300 border-amber-500/30" },
  Advice: { emoji: "💡", color: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30" },
  Thoughts: { emoji: "💭", color: "bg-violet-500/15 text-violet-300 border-violet-500/30" },
  Work: { emoji: "💼", color: "bg-blue-500/15 text-blue-300 border-blue-500/30" },
  Relationships: { emoji: "💞", color: "bg-pink-500/15 text-pink-300 border-pink-500/30" },
};

export const MOCK_POSTS: Post[] = [
  {
    id: "p1",
    author: "Anon_1024",
    category: "Confessions",
    timestamp: "2h ago",
    status: "APPROVED",
    content:
      "I've been pretending to love my job for the last three years. Every morning I put on a smile, greet my coworkers warmly, and laugh at the same recycled jokes in our stand-ups. But deep down, the moment I close my laptop at night, something inside me just breaks a little. The worst part isn't the work itself — it's the identity I've built around it. People say I'm the dependable one, the calm one, the one who 'always has it together.' So admitting I'm miserable feels like betraying a version of myself everyone else seems to believe in more than I do.",
    reactions: { like: 214, love: 87, sad: 312, angry: 12, wow: 44 },
    userReaction: null,
    commentsCount: 28,
    comments: [
      {
        id: "c1",
        author: "Anon_9901",
        content: "This hit me hard. I've been feeling the exact same way but never knew how to say it.",
        timestamp: "1h ago",
        likes: 34,
        replies: [
          {
            id: "c1r1",
            author: "Anon_1024",
            content: "You're not alone. Honestly just typing this out helped more than a year of pretending.",
            timestamp: "55m ago",
            likes: 12,
          },
        ],
      },
      {
        id: "c2",
        author: "Anon_4411",
        content: "Have you thought about what you'd do if money wasn't a factor? Sometimes that question unlocks something.",
        timestamp: "45m ago",
        likes: 18,
      },
    ],
  },
  {
    id: "p2",
    author: "Anon_7782",
    category: "Questions",
    timestamp: "4h ago",
    status: "APPROVED",
    content:
      "Does anyone else feel like the older they get, the harder it becomes to make real friends? Not acquaintances. Not coworkers you grab lunch with. I mean the kind of person who would show up at 2am if you texted 'I need you.' I'm 28 and I swear the friendship landscape gets lonelier every year.",
    reactions: { like: 456, love: 120, sad: 201, angry: 4, wow: 30 },
    userReaction: "like",
    commentsCount: 42,
    comments: [
      {
        id: "c3",
        author: "Anon_2020",
        content: "31 here — it's real. Everyone's busy surviving their own life.",
        timestamp: "3h ago",
        likes: 56,
      },
    ],
  },
  {
    id: "p3",
    author: "Anon_3345",
    category: "Thoughts",
    timestamp: "6h ago",
    status: "APPROVED",
    content: "The scariest thing about adulthood is realizing nobody actually knows what they're doing. We're all just performing confidence for each other.",
    reactions: { like: 889, love: 234, sad: 44, angry: 2, wow: 112 },
    userReaction: null,
    commentsCount: 67,
    comments: [],
  },
  {
    id: "p4",
    author: "Anon_5521",
    category: "Rants",
    timestamp: "8h ago",
    status: "APPROVED",
    content:
      "Why do open offices still exist in 2026? I have three meetings, a deep-focus task, and someone two desks down is on a speakerphone call about his dog's dental surgery. I've had noise-cancelling headphones on so long I'm pretty sure I've forgotten what silence sounds like. Every productivity study screams that this layout is a disaster, yet here we are — paying premium rent so 80 humans can suffer together in a single acoustic hellscape.",
    reactions: { like: 672, love: 88, sad: 12, angry: 421, wow: 18 },
    userReaction: "angry",
    commentsCount: 91,
    comments: [],
  },
  {
    id: "p5",
    author: "Anon_0090",
    category: "Stories",
    timestamp: "12h ago",
    status: "APPROVED",
    content:
      "Ten years ago I lent a stranger on a train twenty dollars when her card got declined. I never expected to see her again. Yesterday, she walked into my cafe, ordered a coffee, looked at me for a long moment, and left an envelope on the counter. Inside: a handwritten note that said 'you saved my week when I needed it most' and two hundred dollars. I've been crying on and off all day. The internet says kindness is dead. The internet is wrong.",
    reactions: { like: 1402, love: 980, sad: 12, angry: 0, wow: 345 },
    userReaction: "love",
    commentsCount: 156,
    comments: [],
  },
  {
    id: "p6",
    author: "Anon_6612",
    category: "Advice",
    timestamp: "1d ago",
    status: "APPROVED",
    content:
      "If you're in your 20s reading this: start a 'boring' index fund today, even if it's just $20/month. Future you will worship present you. That's it. That's the advice.",
    reactions: { like: 521, love: 189, sad: 4, angry: 3, wow: 44 },
    userReaction: null,
    commentsCount: 38,
    comments: [],
  },
  {
    id: "p7",
    author: "Anon_1111",
    category: "Relationships",
    timestamp: "1d ago",
    status: "APPROVED",
    content:
      "My partner and I have been together six years. We don't fight. We don't argue. We also don't really talk anymore. It's the quiet kind of drifting no one warns you about — not a storm, just fog rolling in slowly until you can't see the shore. I love them. I think. But I'm not sure love should feel like a roommate agreement.",
    reactions: { like: 312, love: 44, sad: 567, angry: 5, wow: 12 },
    userReaction: null,
    commentsCount: 73,
    comments: [],
  },
  {
    id: "p8",
    author: "Anon_4040",
    category: "Work",
    timestamp: "2d ago",
    status: "APPROVED",
    content:
      "Took a 30% pay cut to leave a toxic FAANG team for a small company where my manager actually asks how I'm doing and means it. Best decision of my career. Money is real, but so is your nervous system.",
    reactions: { like: 778, love: 322, sad: 4, angry: 2, wow: 88 },
    userReaction: null,
    commentsCount: 54,
    comments: [],
  },
  {
    id: "p9",
    author: "Anon_9988",
    category: "Confessions",
    timestamp: "2d ago",
    status: "PENDING",
    content: "I've been working on this post for a while. Waiting for moderation.",
    reactions: { like: 0, love: 0, sad: 0, angry: 0, wow: 0 },
    userReaction: null,
    commentsCount: 0,
    comments: [],
  },
  {
    id: "p10",
    author: "Anon_2277",
    category: "Thoughts",
    timestamp: "3d ago",
    status: "APPROVED",
    content:
      "Anonymity online isn't about hiding. It's about being honest without the weight of your name. Nobody here knows my job title, my income, my face — and that's exactly why I can finally say what I actually mean. Maybe every social platform should have had this option from the start.",
    reactions: { like: 923, love: 412, sad: 22, angry: 5, wow: 201 },
    userReaction: null,
    commentsCount: 48,
    comments: [],
  },
];

export const CURRENT_USER = {
  id: "me",
  username: "Anon_1024",
  joinedAt: "Joined Jan 2026",
  bio: "Thoughts shared into the void. Sometimes the void answers back.",
};
