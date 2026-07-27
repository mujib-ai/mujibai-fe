import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { BLOG_POSTS, getPostsByCategory } from '@/features/blog/data';
import { Container } from '@/shared/components/atoms/Container';
import { Reveal } from '@/shared/components/atoms/Reveal';
import { PageBackground } from '@/shared/components/templates/PageBackground';
import { createNoIndexMetadata, createSeoMetadata } from '@/shared/seo';

export function generateStaticParams() {
  const categorySlugs = new Set(BLOG_POSTS.map(post => post.categorySlug));
  return Array.from(categorySlugs).map(categorySlug => ({ categorySlug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ categorySlug: string }>;
}): Promise<Metadata> {
  const { categorySlug } = await params;
  const posts = getPostsByCategory(categorySlug);

  if (posts.length === 0) {
    return createNoIndexMetadata('Category not found - mujibai', '');
  }

  const categoryLabel = posts[0].category;

  return createSeoMetadata({
    path: `/blog/category/${categorySlug}`,
    title: `${categoryLabel} - mujibai Blog`,
    description: `Posts in the ${categoryLabel} category.`,
    keywords: [categoryLabel, 'mujibai blog'],
    category: 'Blog',
  });
}

export default async function BlogCategoryPage({
  params,
}: {
  params: Promise<{ categorySlug: string }>;
}) {
  const { categorySlug } = await params;
  const posts = getPostsByCategory(categorySlug);

  if (posts.length === 0) {
    notFound();
  }

  return (
    <PageBackground>
      <Container className="py-16 md:py-20">
        <Reveal>
          <h1 className="text-3xl font-bold capitalize md:text-4xl">
            {posts[0].category}
          </h1>
        </Reveal>

        <Reveal
          as="ul"
          stagger={0.06}
          className="mt-10 grid gap-4 sm:grid-cols-2"
        >
          {posts.map(post => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="border-border hover:border-primary block h-full rounded-2xl border p-5 transition-colors"
              >
                <span className="text-lg font-semibold">{post.title}</span>
                <p className="mt-1 text-sm text-(--ink-3)">{post.excerpt}</p>
              </Link>
            </li>
          ))}
        </Reveal>
      </Container>
    </PageBackground>
  );
}
