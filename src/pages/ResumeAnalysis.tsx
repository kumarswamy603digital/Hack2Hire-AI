import { Header } from "@/components/Header";
import { ResumeAnalyzer } from "@/components/ResumeAnalyzer";
import { Footer } from "@/components/Footer";

const ResumeAnalysisPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <ResumeAnalyzer />
      </main>
      <Footer />
    </div>
  );
};

export default ResumeAnalysisPage;
