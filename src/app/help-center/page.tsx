import type { Metadata } from 'next';

import HelpCenterPage from '@/features/HelpCenter/HelpCenterPage';
import {
  JsonLdScript,
  PUBLIC_SEO_ROUTES,
  createFaqPageSchema,
  createPageSchemas,
  createSeoMetadata,
} from '@/shared/seo';

const route = PUBLIC_SEO_ROUTES[1];

export async function generateMetadata(): Promise<Metadata> {
  return createSeoMetadata(route);
}

export default function HelpCenter() {
  return (
    <>
      <JsonLdScript
        data={createPageSchemas(route, [
          createFaqPageSchema([
            {
              question: 'How do I start using mujibai?',
              answer:
                'Sign in with an invite or email, create a workspace, and connect at least one social channel to unlock scheduling.',
            },
            {
              question: 'How do queue approvals work?',
              answer:
                'Posts move from draft to review to scheduled. Managers can approve content from the queue or notifications.',
            },
            {
              question: 'Will AI drafts publish automatically?',
              answer:
                'No. mujibai creates editable drafts, and your team explicitly confirms every post before it goes live.',
            },
          ]),
        ])}
      />
      <HelpCenterPage />
    </>
  );
}
