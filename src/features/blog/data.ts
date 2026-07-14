export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  categorySlug: string;
  tags: { label: string; slug: string }[];
  date: string;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'ai-voice-agents-for-business',
    title: 'How AI voice agents help businesses answer every call',
    excerpt:
      'A look at how AI voice agents pick up calls, book appointments, and escalate to a human when needed.',
    content:
      'A look at how AI voice agents pick up calls, book appointments, and escalate to a human when needed. This is placeholder content — real articles will replace this.',
    category: 'Product',
    categorySlug: 'product',
    tags: [
      { label: 'AI Voice Agent', slug: 'ai-voice-agent' },
      { label: 'Call Answering', slug: 'call-answering' },
    ],
    date: '2026-06-01',
  },
  {
    slug: 'arabic-dialects-and-ai-receptionists',
    title: 'Why Arabic dialects matter for AI receptionists',
    excerpt:
      'Arabic-speaking callers expect a receptionist that understands their dialect, not just Modern Standard Arabic.',
    content:
      'Arabic-speaking callers expect a receptionist that understands their dialect, not just Modern Standard Arabic. This is placeholder content — real articles will replace this.',
    category: 'Industry',
    categorySlug: 'industry',
    tags: [
      { label: 'Arabic', slug: 'arabic' },
      { label: 'Receptionist', slug: 'receptionist' },
    ],
    date: '2026-05-15',
  },
  {
    slug: 'after-hours-call-answering-checklist',
    title: 'An after-hours call answering checklist for growing teams',
    excerpt:
      'What to check before you rely on an AI agent to answer calls outside business hours.',
    content:
      'What to check before you rely on an AI agent to answer calls outside business hours. This is placeholder content — real articles will replace this.',
    category: 'Guides',
    categorySlug: 'guides',
    tags: [
      { label: 'After Hours', slug: 'after-hours' },
      { label: 'Call Answering', slug: 'call-answering' },
    ],
    date: '2026-04-22',
  },
];

export function getAllPosts(): BlogPost[] {
  return BLOG_POSTS;
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find(post => post.slug === slug);
}

export function getPostsByCategory(categorySlug: string): BlogPost[] {
  return BLOG_POSTS.filter(post => post.categorySlug === categorySlug);
}

export function getPostsByTag(tagSlug: string): BlogPost[] {
  return BLOG_POSTS.filter(post => post.tags.some(tag => tag.slug === tagSlug));
}
