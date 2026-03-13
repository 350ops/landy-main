import { Hero } from "./sections/hero";
import { Pricing } from "./sections/pricing";
import { Features } from "./sections/features";
import { Mission } from "./sections/mission";
import { FAQ } from "./sections/faq";
import { CTA } from "./sections/cta";
import { Footer } from "./sections/footer";
import { Navbar } from "./sections/navbar";
import { Logos } from "./sections/logos";
import { Testimonials } from "./sections/testimonials";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Pricing />
      <Features />
      <Logos />
      <Mission />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}
