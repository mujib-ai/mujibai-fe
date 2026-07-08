import { Container } from '@/shared/components/atoms/Container';

import { PageBackground } from './PageBackground';

export function LegalPagePlaceholder({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <PageBackground>
      <Container className="py-16 md:py-20">
        <h1 className="text-3xl font-bold md:text-4xl">{title}</h1>
        <p className="text-muted-foreground mt-4 max-w-2xl text-base md:text-lg">
          {description}
        </p>
        <p className="text-muted-foreground mt-10 text-sm">
          Content coming soon.
        </p>
      </Container>
    </PageBackground>
  );
}
