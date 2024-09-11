import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

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
  return (
    <main>
      <div className="flex flex-col min-h-screen bg-background max-w-5xl m-auto">
        <Header params={params} />
        {children}
        <Footer />
      </div>
    </main>
  );
}
