import { DocsNav } from './DocsNav';

export function DocsSidebar() {
  return (
    <aside className="thin-scrollbar sticky top-20 hidden h-[calc(100vh-6rem)] w-56 shrink-0 overflow-y-auto lg:block">
      <DocsNav />
    </aside>
  );
}
