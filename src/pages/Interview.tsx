import { Header } from "@/components/Header";
import { InterviewSession } from "@/components/InterviewSession";
import { Footer } from "@/components/Footer";

const InterviewPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <InterviewSession />
      </main>
      <Footer />
    </div>
  );
};

export default InterviewPage;
