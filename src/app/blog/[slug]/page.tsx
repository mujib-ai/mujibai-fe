import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { BLOG_POSTS, getPostBySlug } from '@/features/blog/data';
import { Container } from '@/shared/components/atoms/Container';
import { PageBackground } from '@/shared/components/templates/PageBackground';
import { createNoIndexMetadata } from '@/shared/seo';

export function generateStaticParams() {
  return BLOG_POSTS.map(post => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return createNoIndexMetadata('Post not found - mujibai', '');
  }

  return createNoIndexMetadata(`${post.title} - mujibai Blog`, post.excerpt);
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <PageBackground>
      <Container className="py-16 md:py-20">
        <span className="text-primary text-sm font-semibold">
          {post.category}
        </span>
        <h1 className="mt-2 text-3xl font-bold md:text-4xl">{post.title}</h1>
        <p className="mt-4 text-sm text-(--ink-3)">{post.date}</p>
        <p className="mt-6 max-w-2xl text-base leading-relaxed md:text-lg">
          {post.content}
        </p>
      </Container>
    </PageBackground>
  );
}
