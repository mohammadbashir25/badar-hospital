import TrustSignals from "@/components/Hero/TrustSignals";
import Navbar from "../../components/Layout/Navbar";
import Hero from "@/components/Hero/Hero";
import About from "@/components/About/About";
import Specialties from "@/components/Specialties/Specialties";
import Services from "@/components/Services/Services";
import Doctors from "@/components/Doctors/Doctors";
import WhyChooseBadar from "@/components/Why badar/WhyChooseBadar";
import Facilities from "@/components/Facilities/Facilities";
import Testimonials from "@/components/Testimonials/Testimonials";
import AppointmentEmergency from "@/components/CTA & emergency/AppointmentEmergency";

export default async function HomePage() {
  return (
    <>
      <main>
        <Hero />
        <TrustSignals />
        <About />
        <Specialties />
        <Services />
        <Doctors />
        <WhyChooseBadar />
        <Facilities />
        <Testimonials />
        <AppointmentEmergency />
      </main>
    </>
  );
}
