import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

import { getAllPosts } from '@/features/blog/data';
import { Container } from '@/shared/components/atoms/Container';
import { PageBackground } from '@/shared/components/templates/PageBackground';
import { createNoIndexMetadata } from '@/shared/seo';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('marketing.blogIndex');
  return createNoIndexMetadata(t('title'), t('description'));
}

export default async function BlogPage() {
  const t = await getTranslations('marketing.blogIndex');
  const posts = getAllPosts();

  return (
    <PageBackground>
      <Container className="py-16 md:py-20">
        <h1 className="text-3xl font-bold md:text-4xl">{t('title')}</h1>
        <p className="mt-4 max-w-2xl text-base text-(--ink-3) md:text-lg">
          {t('description')}
        </p>

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
