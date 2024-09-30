import AdminNavigation from '@/components/admin/AdminNavigation';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function AppPage({
  params: { locale },
}: {
  params: { locale: string};
}) {
  const cookieStore = cookies();
  const isAuthenticated = cookieStore.get('isAuthenticated')?.value === 'true';

  if (!isAuthenticated) {
    redirect(`${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/${locale}/admin/access`);
  }

  return (
    <main>
      <AdminNavigation locale={locale} />
    </main>
  );
}
