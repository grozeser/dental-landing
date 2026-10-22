import { Footer } from "@/components/sections/Footer";
import { Header } from "@/components/sections/Header";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main" className="min-h-[60vh]">
        <div className="shell py-24">
          <h1 className="text-4xl font-bold">Лечим зубы без боли и страха</h1>
        </div>
      </main>
      <Footer />
    </>
  );
}
