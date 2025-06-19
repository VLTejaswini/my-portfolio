import React, { useState, useRef, useEffect } from 'react';
import Navigation from './portfolio/Navigation';
import HeroSection from './portfolio/HeroSection';
import PersonalDetails from './portfolio/PersonalDetails';
import Skills from './portfolio/Skills';
import Experience from './portfolio/Experience';
import Projects from './portfolio/Projects';
import Certificates from './portfolio/Certificates';
import Resume from './portfolio/Resume';
import Contact from './portfolio/Contact';
import Footer from './portfolio/Footer';
import { updateURL, getDataFromURL } from '../utils/urlState';

const Portfolio = () => {
  const [portfolioData, setPortfolioData] = useState({
    name: "John Doe",
    bio: "I am a passionate software developer with expertise in web technologies and a love for creating innovative solutions.",
    profileImage: "/placeholder.svg",
    degree: "B.Tech - CSM (Artificial Intelligence and Machine Learning)",
    college: "VVIT University",
    batch: "2023 – 2027",
    school: "Kennedy School, Passed out: 2021",
    skills: ["HTML", "Python", "SQL", "CSS", "Java"]
  });

  const sectionRefs = {
    home: useRef<HTMLElement>(null),
    personal: useRef<HTMLElement>(null),
    skills: useRef<HTMLElement>(null),
    experience: useRef<HTMLElement>(null),
    projects: useRef<HTMLElement>(null),
    certificates: useRef<HTMLElement>(null),
    resume: useRef<HTMLElement>(null),
    contact: useRef<HTMLElement>(null),
  };

  // Load data from URL on component mount
  useEffect(() => {
    const urlData = getDataFromURL();
    if (urlData) {
      setPortfolioData(urlData);
    }
  }, []);

  // Update URL whenever portfolioData changes
  useEffect(() => {
    updateURL(portfolioData);
  }, [portfolioData]);

  const updatePortfolioData = (updates: Partial<typeof portfolioData>) => {
    setPortfolioData(prev => ({ ...prev, ...updates }));
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
          profileData={portfolioData}
          setProfileData={updatePortfolioData}
        />
        <PersonalDetails 
          ref={sectionRefs.personal} 
          portfolioData={portfolioData}
          updatePortfolioData={updatePortfolioData}
        />
        <Skills 
          ref={sectionRefs.skills}
          skills={portfolioData.skills}
          updateSkills={(skills) => updatePortfolioData({ skills })}
        />
        <Experience ref={sectionRefs.experience} />
        <Projects 
          ref={sectionRefs.projects}
          profileData={portfolioData}
        />
        <Certificates ref={sectionRefs.certificates} />
        <Resume ref={sectionRefs.resume} />
        <Contact ref={sectionRefs.contact} />
      </main>
      
      <Footer />
    </div>
  );
};

export default Portfolio;
