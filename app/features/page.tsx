import { redirect } from '../../lib/navigation';

export default function FeaturesPage() {
  redirect({ href: '/features', locale: 'en' });
}
