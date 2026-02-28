"use client";

import { useRef } from "react";
import Link from "next/link";
import Header from "@/components/ui/header";
import TeamMemberCard from "@/components/ui/teammembercards";
import Footer from "@/components/ui/footer";
import Hero from "@/components/ui/hero";
import FreelancerCard from "@/components/ui/freelancercard";
import ServiceCard from "@/components/ui/servicecard";
import { teamMembers } from "@/data/info";
import { Briefcase, Search, FileText, MessageCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function Home() {
  const aboutUsRef = useRef<HTMLDivElement>(null);
  const { user, loading } = useAuth();
  const isLoggedIn = !!user && !loading;

  const scrollToAboutUs = () => {
    aboutUsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      <Header onAboutUsClick={scrollToAboutUs} />
      <Hero />

      <main>
        {/* Explore Services — setupprofile-style hover cards */}
        <section className="py-12 sm:py-16 lg:py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                Explore Popular Services
              </h2>
              <p className="mt-2 text-gray-500 dark:text-gray-400 text-sm sm:text-base max-w-lg mx-auto">
                Browse categories and find the right freelancer for your project
              </p>
            </div>
            <ServiceCard />
            <div className="text-center mt-8">
              <Link
                href="/explore"
                className="inline-block text-red-500 font-semibold hover:text-red-600 transition-colors text-sm sm:text-base"
              >
                View all categories →
              </Link>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="bg-gray-50 dark:bg-gray-800/50 py-12 sm:py-16 lg:py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">How It Works</h2>
              <p className="mt-2 text-gray-500 dark:text-gray-400 text-sm sm:text-base">Get started in minutes</p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
              {[
                {
                  icon: Search,
                  title: "Browse",
                  desc: "Explore gigs across categories like web dev, design, video editing and more.",
                },
                {
                  icon: Briefcase,
                  title: "Hire",
                  desc: "Found the right fit? Send a contract request to the freelancer instantly.",
                },
                {
                  icon: MessageCircle,
                  title: "Collaborate",
                  desc: "Chat in real-time, share requirements, and track project progress.",
                },
                {
                  icon: FileText,
                  title: "Complete",
                  desc: "Review the work, and build lasting professional connections.",
                },
              ].map((step) => (
                <div
                  key={step.title}
                  className="bg-white dark:bg-gray-800 rounded-xl p-5 sm:p-6 lg:p-8 text-center shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md hover:scale-[1.03] transition-all duration-200 cursor-default"
                >
                  <div className="w-12 h-12 mx-auto mb-4 bg-red-50 dark:bg-red-900/30 rounded-xl flex items-center justify-center">
                    <step.icon size={24} className="text-red-500" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{step.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Top Rated Freelancers */}
        <section className="py-12 sm:py-16 lg:py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between mb-8 sm:mb-10">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Top Rated Freelancers</h2>
                <p className="mt-1 text-gray-500 dark:text-gray-400 text-sm sm:text-base">Trusted by hundreds of clients</p>
              </div>
              <Link
                href="/explore"
                className="hidden sm:inline-block text-red-500 font-semibold hover:text-red-600 transition-colors text-sm"
              >
                See all →
              </Link>
            </div>
            <FreelancerCard />
            <div className="text-center mt-6 sm:hidden">
              <Link
                href="/explore"
                className="text-red-500 font-semibold hover:text-red-600 text-sm"
              >
                See all freelancers →
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Banner — only show for guests */}
        {!isLoggedIn && (
          <section className="bg-gray-900 dark:bg-gray-950 py-12 sm:py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">
                Ready to get started?
              </h2>
              <p className="text-gray-400 mb-6 sm:mb-8 text-sm sm:text-base max-w-lg mx-auto">
                Join GradWork today and connect with talented freelancers or find your next project.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center bg-red-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors text-sm sm:text-base"
                >
                  Join Now — It&apos;s Free
                </Link>
                <Link
                  href="/explore"
                  className="inline-flex items-center justify-center border-2 border-white/20 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors text-sm sm:text-base"
                >
                  Browse Gigs
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* About Us — temporarily hidden
        <section className="py-12 sm:py-16 lg:py-20" ref={aboutUsRef}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-8 sm:mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Meet the Team</h2>
              <p className="mt-2 text-gray-500 dark:text-gray-400 text-sm sm:text-base">The people behind GradWork</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {teamMembers.map((member, index) => (
                <TeamMemberCard key={index} {...member} />
              ))}
            </div>
          </div>
        </section>
        */}
      </main>

      <Footer />
    </div>
  );
}
