import { DocsNav } from './DocsNav';

export function DocsSidebar() {
  return (
    <aside className="sticky top-20 hidden h-[calc(100vh-6rem)] w-56 shrink-0 overflow-y-auto thin-scrollbar lg:block">
      <DocsNav />
    </aside>
  );
}
