import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AdminPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const cookieStore = cookies();
  const isAuthenticated = cookieStore.get('isAuthenticated')?.value === 'true';

  if (isAuthenticated) {
    redirect(`${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/${locale}/admin/app`);
  }

  return redirect(
    `${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/${locale}/admin/access`
  );
}
