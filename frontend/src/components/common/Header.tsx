import Navbar from "./Navbar";

export default function Header({
  params,
  isSuperAdmin,
}: {
  params: { locale: string; companyId: string };
  isSuperAdmin: boolean;
}) {
  return (
    <header className="w-full">
      <Navbar params={params} isSuperAdmin={isSuperAdmin} />
    </header>
  );
}
