import { Header } from "@/components/Header";
import { JDAnalyzer } from "@/components/JDAnalyzer";
import { Footer } from "@/components/Footer";

const JDAnalysisPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <JDAnalyzer />
      </main>
      <Footer />
    </div>
  );
};

export default JDAnalysisPage;
