import Navbar from "./Navbar";

export default function Header({
  params,
}: {
  params: { locale: string; companyId: string };
}) {
  return (
    <header className="w-full">
      <Navbar params={params} />
    </header>
  );
}
