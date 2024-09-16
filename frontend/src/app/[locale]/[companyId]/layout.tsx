import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function Layout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: {
    locale: string;
    companyId: string;
  };
}>) {
  const cookiesStore = cookies();
  const session = cookiesStore.get("session")?.value;

  if (!session) {
    redirect(`${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/`);
  }
  
  const sessionData = JSON.parse(session);
  const isAdmin = sessionData && sessionData.dataUser.role === "ADMIN";

  return (
    <main>
      <div className="flex flex-col min-h-screen bg-background md:max-w-5xl m-auto text-xs md:text-sm">
        <Header params={params} isAdmin={isAdmin} />
        {children}
        <Footer />
      </div>
    </main>
  );
}
