import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen">
      <Header />
      {children}
      <Footer />
    </main>
  );
}
