import { Container } from '@/shared/components/atoms/Container';
import { Reveal } from '@/shared/components/atoms/Reveal';
import { PageBackground } from '@/shared/components/templates/PageBackground';

import { ContactForm } from '../organisms/ContactForm';
import { ContactInfo } from '../organisms/ContactInfo';

export function ContactPage() {
  return (
    <PageBackground>
      <Container className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-10 left-1/2 h-105 w-255 max-w-full -translate-x-1/2 bg-[radial-gradient(ellipse,color-mix(in_oklab,var(--brand)_13%,transparent)_0%,transparent_70%)]"
        />

        <Reveal
          stagger={0.15}
          className="relative mt-13 grid items-start gap-12 lg:grid-cols-2 lg:gap-16"
        >
          <ContactInfo />
          <ContactForm />
        </Reveal>
      </Container>
    </PageBackground>
  );
}

export default ContactPage;
