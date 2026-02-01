import { Header } from "@/components/Header";
import { CodingSandbox } from "@/components/CodingSandbox";

const Coding = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <CodingSandbox />
      </main>
    </div>
  );
};

export default Coding;
