import Header from "../components/ui/header.jsx";
import TeamMemberCard from "../components/ui/teammembercards.jsx";
import Footer from "../components/ui/footer.jsx";
import Hero from "../components/ui/hero.jsx";
import FreelancerCard from "../components/ui/freelancercard.jsx";
import ServiceCard from "../components/ui/servicecard.jsx";
import { useRef } from "react";
import { teamMembers } from "../data/info.js";
import { useNavigate } from "react-router-dom";

const GradWorkLanding = () => {
  const navigate = useNavigate();
  const handleSignInClick = () => {
    navigate("/register");
  };
  const aboutUsRef = useRef(null);

  const scrollToAboutUs = () => {
    aboutUsRef.current?.scrollIntoView({ behavior: "smooth" });
    navigate("/");
  };
  return (
    <div className="min-h-screen">
      <Header onAboutUsClick={scrollToAboutUs} />
      <Hero />

      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Boost your Freelancing Journey
          </h2>
          <h3 className="text-xl mb-6 font-bold">
            with <span className="text-red-600">Grad</span>Work.
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Welcome to{" "}
            <span className="font-bold">
              <span className="text-red-600">Grad</span>Work
            </span>, where graduates and working professionals connect with
            opportunities that match their skills, find jobs, create profiles,
            and collaborate seamlessly, all in one convenient platform. Join us
            to turn your expertise into success!
          </p>
          <button
            className="mt-6 bg-red-500 text-white px-6 py-2 rounded-md"
            onClick={handleSignInClick}
          >
            Join Now
          </button>
        </div>

        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Top Rated</h2>
          <FreelancerCard />
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Explore Services</h2>
          <div>
            <ServiceCard />
          </div>
        </section>

        <section className="mb-16" ref={aboutUsRef}>
          <h2 className="text-2xl font-bold mb-6">About US</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {teamMembers.map((member, index) => (
              <TeamMemberCard key={index} {...member} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default GradWorkLanding;
