import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
        <div className="flex flex-col min-h-screen container bg-background max-w-5xl m-auto">
          <Header />
          {children}
          <Footer />
        </div>
    </main>
  );
}
