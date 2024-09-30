import Navbar from "./Navbar";

export default function Header({
  params,
  isBasic,
}: {
  params: { locale: string; companyId: string };
  isBasic: boolean;
}) {
  return (
    <header className="w-full">
      <Navbar params={params} isBasic={isBasic} />
    </header>
  );
}
