import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div data-testid="hero-section"></div>
        <div data-testid="features-section"></div>
        <div data-testid="social-proof-section"></div>
        <div data-testid="pricing-section"></div>
        <div data-testid="lead-capture-section"></div>
      </main>
      <Footer />
    </>
  );
}
