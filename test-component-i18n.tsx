import { useTranslations } from 'next-intl';

export default function TestComponent() {
  const t = useTranslations('test');

  return (
    <div>
      <h1>{t('welcome_to_our_platf_0')}</h1>
      <p>{t('this_is_a_test_compo_1')}</p>
      <button>{t('get_started_2')}</button>
      <span>{t('contact_support_3')}</span>
    </div>
  );
}