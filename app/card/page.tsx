import type { Metadata } from 'next';
import { CardClient } from './card-client';

export const metadata: Metadata = {
  title: 'Card · Virtual Business Card',
  description: 'Save my contact details — virtual business card.',
};

export default function CardPage() {
  return <CardClient />;
}
