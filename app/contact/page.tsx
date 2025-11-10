import { redirect } from '../../lib/navigation';

export default function ContactPage() {
  redirect({ href: '/contact', locale: 'en' });
}
