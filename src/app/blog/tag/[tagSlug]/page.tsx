import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { BLOG_POSTS, getPostsByTag } from '@/features/blog/data';
import { Container } from '@/shared/components/atoms/Container';
import { Reveal } from '@/shared/components/atoms/Reveal';
import { PageBackground } from '@/shared/components/templates/PageBackground';
import { createNoIndexMetadata, createSeoMetadata } from '@/shared/seo';

export function generateStaticParams() {
  const tagSlugs = new Set(
    BLOG_POSTS.flatMap(post => post.tags.map(tag => tag.slug))
  );
  return Array.from(tagSlugs).map(tagSlug => ({ tagSlug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tagSlug: string }>;
}): Promise<Metadata> {
  const { tagSlug } = await params;
  const posts = getPostsByTag(tagSlug);

  if (posts.length === 0) {
    return createNoIndexMetadata('Tag not found - mujibai', '');
  }

  const tagLabel =
    posts[0].tags.find(tag => tag.slug === tagSlug)?.label ?? tagSlug;

  return createSeoMetadata({
    path: `/blog/tag/${tagSlug}`,
    title: `${tagLabel} - mujibai Blog`,
    description: `Posts tagged ${tagLabel}.`,
    keywords: [tagLabel, 'mujibai blog'],
    category: 'Blog',
  });
}

export default async function BlogTagPage({
  params,
}: {
  params: Promise<{ tagSlug: string }>;
}) {
  const { tagSlug } = await params;
  const posts = getPostsByTag(tagSlug);

  if (posts.length === 0) {
    notFound();
  }

  const tagLabel =
    posts[0].tags.find(tag => tag.slug === tagSlug)?.label ?? tagSlug;

  return (
    <PageBackground>
      <Container className="py-16 md:py-20">
        <Reveal>
          <h1 className="text-3xl font-bold md:text-4xl">{tagLabel}</h1>
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
