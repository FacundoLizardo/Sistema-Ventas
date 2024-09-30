import AccessForm from "@/components/admin/access/AccessForm";

export default async function AdminPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  return (
    <main className="flex w-full min-h-screen items-center justify-center">
      <AccessForm locale={locale} />
    </main>
  );
}
