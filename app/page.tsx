import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import DealsSection from "./components/DealsSection";
import LatestArrivals from "./components/LatestArrival";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Navbar />
      <Hero />
      <DealsSection />
      <LatestArrivals />
      <Footer />
    </main>
  );
}