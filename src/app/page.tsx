import { Contacts } from "@/components/sections/Contacts";
import { Doctors } from "@/components/sections/Doctors";
import { Faq } from "@/components/sections/Faq";
import { Features } from "@/components/sections/Features";
import { Footer } from "@/components/sections/Footer";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { Reviews } from "@/components/sections/Reviews";
import { Services } from "@/components/sections/Services";
import { Steps } from "@/components/sections/Steps";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <Features />
        <Services />
        <Doctors />
        <Steps />
        <Reviews />
        <Faq />
        <Contacts />
      </main>
      <Footer />
    </>
  );
}
