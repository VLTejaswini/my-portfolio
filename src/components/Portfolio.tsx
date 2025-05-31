
import React, { useState, useRef } from 'react';
import Navigation from './portfolio/Navigation';
import HeroSection from './portfolio/HeroSection';
import PersonalDetails from './portfolio/PersonalDetails';
import Skills from './portfolio/Skills';
import Experience from './portfolio/Experience';
import Projects from './portfolio/Projects';
import Certificates from './portfolio/Certificates';
import Achievements from './portfolio/Achievements';
import Resume from './portfolio/Resume';
import Contact from './portfolio/Contact';
import Footer from './portfolio/Footer';

const Portfolio = () => {
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    bio: "I am a passionate software developer with expertise in web technologies and a love for creating innovative solutions.",
    profileImage: "/placeholder.svg"
  });

  const sectionRefs = {
    home: useRef<HTMLElement>(null),
    personal: useRef<HTMLElement>(null),
    skills: useRef<HTMLElement>(null),
    experience: useRef<HTMLElement>(null),
    projects: useRef<HTMLElement>(null),
    certificates: useRef<HTMLElement>(null),
    achievements: useRef<HTMLElement>(null),
    resume: useRef<HTMLElement>(null),
    contact: useRef<HTMLElement>(null),
  };

  const scrollToSection = (sectionKey: keyof typeof sectionRefs) => {
    sectionRefs[sectionKey].current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <div className="portfolio-container">
      <Navigation scrollToSection={scrollToSection} />
      
      <main>
        <HeroSection 
          ref={sectionRefs.home}
          profileData={profileData}
          setProfileData={setProfileData}
        />
        <PersonalDetails ref={sectionRefs.personal} />
        <Skills ref={sectionRefs.skills} />
        <Experience ref={sectionRefs.experience} />
        <Projects ref={sectionRefs.projects} />
        <Certificates ref={sectionRefs.certificates} />
        <Achievements ref={sectionRefs.achievements} />
        <Resume ref={sectionRefs.resume} />
        <Contact ref={sectionRefs.contact} />
      </main>
      
      <Footer />
    </div>
  );
};

export default Portfolio;
