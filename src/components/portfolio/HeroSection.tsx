import React, { forwardRef } from 'react';
import { Sparkles, Code, Coffee } from 'lucide-react';
import profileImage from '../assets/profile1.jpg'; // make sure to place the image in /assets

const HeroSection = forwardRef<HTMLElement>((props, ref) => {
  return (
    <section ref={ref} className="hero-section min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-20 h-20 bg-white rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-32 right-32 w-16 h-16 bg-white rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-20 w-12 h-12 bg-white rounded-full blur-xl animate-pulse delay-2000"></div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto text-center relative z-10">
        <div className="relative inline-block mb-12">
          <div className="w-56 h-56 mx-auto rounded-full overflow-hidden border-4 border-white/30 shadow-2xl bg-white/10 backdrop-blur-sm relative">
            <img
              src={profileImage}
              alt="Profile"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brown-900/20 to-transparent"></div>
          </div>

          {/* Decorative Icons */}
          <div className="absolute -top-4 -left-4 text-white/20">
            <Sparkles className="w-8 h-8 animate-pulse" />
          </div>
          <div className="absolute -bottom-4 -right-12 text-white/20">
            <Code className="w-6 h-6 animate-bounce" />
          </div>
          <div className="absolute top-8 -right-8 text-white/20">
            <Coffee className="w-5 h-5 animate-pulse delay-1000" />
          </div>
        </div>

        {/* Name and Bio (STATIC) */}
        <div className="relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold text-white drop-shadow-2xl tracking-tight">
          Vuddanti Lakshmi Tejaswini
          </h1>
          <div className="w-24 h-0.5 mx-auto mt-2 bg-gradient-to-r from-transparent via-white/80 to-transparent"></div>

          <p className="text-xl md:text-2xl text-white/95 leading-relaxed mt-8 max-w-3xl mx-auto font-light tracking-wide">
            I am CSM student at VVITU, Roll No: 23BQ1A42I4.
          </p>

          {/* Status Indicator */}
          <div className="inline-flex items-center gap-3 px-6 py-3 mt-10 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-white/90">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
            <span className="text-sm font-medium tracking-wide">Available for new opportunities</span>
          </div>
        </div>
      </div>
    </section>
  );
});

HeroSection.displayName = 'HeroSection';

export default HeroSection;
