import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import UsersServices from "@/services/user/UsersServices";
import { SalesContextProvider } from "@/context/salesContext";

export default async function AppLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: {
    locale: string;
    companyId: string;
  };
}>) {
  const { isAdmin } = await UsersServices.userSession();

  return (
    <main>
      <div className="flex flex-col min-h-screen bg-background md:max-w-5xl m-auto text-xs md:text-sm">
        <Header params={params} isAdmin={isAdmin} />
        <SalesContextProvider>{children}</SalesContextProvider>
      </div>
      <Footer />
    </main>
  );
}
