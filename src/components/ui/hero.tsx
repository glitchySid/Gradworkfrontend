import Link from "next/link";
import { ArrowRight } from "lucide-react";

const Hero = () => (
  <section className="relative overflow-hidden bg-gray-900">
    {/* Background image */}
    <div className="absolute inset-0">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1920&q=80"
        alt="Team collaborating on laptops"
        className="absolute inset-0 w-full h-full object-cover opacity-25"
      />
    </div>

    {/* Content */}
    <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
      <div className="flex flex-col justify-center min-h-[320px] sm:min-h-[400px] lg:min-h-[480px] pt-24 sm:pt-24 lg:pt-28 pb-12 sm:pb-16 lg:pb-20">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight max-w-2xl">
          Find the perfect{" "}
          <span className="text-red-400">freelance</span>{" "}
          services for your business
        </h1>
        <p className="mt-4 sm:mt-6 text-base sm:text-lg text-gray-300 max-w-lg leading-relaxed">
          Connect with talented college students and graduates. Quality work, affordable prices.
        </p>
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
          <Link
            href="/explore"
            className="inline-flex items-center justify-center gap-2 bg-red-500 text-white px-6 py-3 sm:px-8 sm:py-3.5 rounded-lg font-semibold text-sm sm:text-base hover:bg-red-600 transition-colors"
          >
            Explore Gigs
            <ArrowRight size={18} />
          </Link>
          <Link
            href="/register"
            className="inline-flex items-center justify-center gap-2 border-2 border-white/30 text-white px-6 py-3 sm:px-8 sm:py-3.5 rounded-lg font-semibold text-sm sm:text-base hover:bg-white/10 transition-colors"
          >
            Become a Seller
          </Link>
        </div>
      </div>
    </div>

    {/* Bottom gradient fade */}
    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white dark:from-gray-900 to-transparent" />
  </section>
);

export default Hero;
