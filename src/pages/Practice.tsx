import { Header } from "@/components/Header";
import { PracticeSession } from "@/components/PracticeSession";

const Practice = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <PracticeSession />
      </main>
    </div>
  );
};

export default Practice;
