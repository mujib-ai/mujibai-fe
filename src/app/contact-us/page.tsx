import { Metadata } from 'next';

import ContactUsPage from '@/features/contactUs/pages/ContactUsPage';

export const metadata: Metadata = {
  title: '',
  description: '',
};

export default function page() {
  return <ContactUsPage />;
}
