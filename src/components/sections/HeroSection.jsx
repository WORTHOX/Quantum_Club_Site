import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

export default function HeroSection() {
  const [showScrollHint, setShowScrollHint] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollHint(window.scrollY < 180);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 overflow-hidden pt-20">
      {/* Orbital animation background elements */}
      <div className="absolute opacity-15 pointer-events-none flex items-center justify-center inset-0">
        <div className="absolute w-[50rem] h-[50rem] rounded-full border border-blue-500/20 animate-spin-slow"></div>
        <div className="absolute w-[35rem] h-[35rem] rounded-full border border-indigo-500/20 animate-spin-slow-reverse"></div>
        <div className="absolute w-[20rem] h-[20rem] rounded-full border border-purple-500/20 animate-spin-slow"></div>
      </div>

      {/* Content */}
      <div className="container relative z-10 max-w-6xl mx-auto py-12">
        <div className="flex flex-col items-start text-left">
          <div className="mb-4">
            <span className="font-display text-blue-400 text-sm md:text-base uppercase tracking-wider font-semibold px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20">
              Welcome to
            </span>
          </div>
          
          <h1 className="font-title text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold mb-6 tracking-tight leading-[1.1] max-w-4xl text-white">
            <span className="gradient-text">
              Symbiosis Quantum Club
            </span>
          </h1>
          
          <p className="font-display text-lg sm:text-xl md:text-2xl mb-8 text-gray-300 max-w-2xl leading-relaxed">
            Exploring the quantum realm, one qubit at a time. Join us in pushing the boundaries of computation and quantum innovation.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Button asChild variant="default" className="bg-blue-600 hover:bg-blue-500 text-white font-display text-base px-8 py-6 h-auto rounded-md shadow-lg shadow-blue-600/20">
              <Link to="/events">Explore Events</Link>
            </Button>
            
            <Button asChild variant="outline" className="border-blue-700/50 text-blue-300 hover:bg-blue-900/30 font-display text-base px-8 py-6 h-auto rounded-md">
              <Link to="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Scroll Hint */}
      {showScrollHint && (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 hidden md:block">
          <div className="flex flex-col items-center animate-bounce opacity-70">
            <span className="text-xs font-display text-gray-400 mb-1 tracking-wider uppercase">Scroll to explore</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-blue-400">
              <path d="M12 5V19M12 19L5 12M12 19L19 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      )}
    </section>
  );
}
