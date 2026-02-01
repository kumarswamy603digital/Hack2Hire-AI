import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { AssessmentFlow } from "@/components/AssessmentFlow";
import { Features } from "@/components/Features";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <Hero />
        <AssessmentFlow />
        <Features />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
