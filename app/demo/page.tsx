import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import DemoHero from "@/components/sections/demo/DemoHero";
import DemoSteps from "@/components/sections/demo/DemoSteps";
import DemoAccounts from "@/components/sections/demo/DemoAccounts";

export const metadata = {
  title: "Demo | Experience Avni In Action",
  description: "Try our functional demos to see how Avni can transform your field operations",
};

export default function DemoPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <DemoHero />
      <DemoSteps />
      <DemoAccounts />
      <Footer />
    </main>
  );
}
