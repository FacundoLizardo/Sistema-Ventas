import Navbar from "./Navbar";

export default function Header({
  params,
  isAdmin,
}: {
  params: { locale: string; companyId: string };
  isAdmin: boolean;
}) {
  return (
    <header className="w-full">
      <Navbar params={params} isAdmin={isAdmin} />
    </header>
  );
}
