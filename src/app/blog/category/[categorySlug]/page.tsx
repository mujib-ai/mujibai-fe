import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { BLOG_POSTS, getPostsByCategory } from '@/features/blog/data';
import { Container } from '@/shared/components/atoms/Container';
import { PageBackground } from '@/shared/components/templates/PageBackground';
import { createNoIndexMetadata } from '@/shared/seo';

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
  return createNoIndexMetadata(
    `${categorySlug} - mujibai Blog`,
    `Posts in the ${categorySlug} category.`
  );
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
        <h1 className="text-3xl font-bold capitalize md:text-4xl">
          {posts[0].category}
        </h1>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
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
        </ul>
      </Container>
    </PageBackground>
  );
}
