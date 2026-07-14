import Link from 'next/link';

import { Container } from '@/shared/components/atoms/Container';
import { PageBackground } from '@/shared/components/templates/PageBackground';

type PlaceholderPageItem = {
  href: string;
  title: string;
  description: string;
};

export function PlaceholderPage({
  title,
  description,
  items,
}: {
  title: string;
  description: string;
  items?: PlaceholderPageItem[];
}) {
  return (
    <PageBackground>
      <Container className="py-16 md:py-20">
        <h1 className="text-3xl font-bold md:text-4xl">{title}</h1>
        <p className="mt-4 max-w-2xl text-base text-(--ink-3) md:text-lg">
          {description}
        </p>

        {items && items.length > 0 && (
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {items.map(item => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="border-border hover:border-primary block h-full rounded-2xl border p-5 transition-colors"
                >
                  <span className="text-lg font-semibold">{item.title}</span>
                  <p className="mt-1 text-sm text-(--ink-3)">
                    {item.description}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </PageBackground>
  );
}

export default PlaceholderPage;
