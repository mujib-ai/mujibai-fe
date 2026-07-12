import {
  DocsBreadcrumbs,
  DocsHeader,
  DocsPager,
  DocsSidebar,
} from '@/features/docs';
import { Container } from '@/shared/components/atoms/Container';
import { PageBackground } from '@/shared/components/templates/PageBackground';

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <DocsHeader />
      <PageBackground
        showHeader={false}
        className="items-stretch py-0"
        glowClassName="opacity-40"
      >
        <Container className="max-w-7xl px-4 py-6 sm:px-6 md:py-8 lg:px-8">
          <div className="flex items-start gap-6 lg:gap-8">
            <DocsSidebar />
            <main className="min-w-0 flex-1">
              <DocsBreadcrumbs />
              <div id="docs-content" className="mt-6">
                {children}
                <DocsPager />
              </div>
            </main>
          </div>
        </Container>
      </PageBackground>
    </div>
  );
}
