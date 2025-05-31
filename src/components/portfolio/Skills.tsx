
import React, { forwardRef } from 'react';
import { Code, Database, Globe, Smartphone } from 'lucide-react';

const Skills = forwardRef<HTMLElement>((props, ref) => {
  const skillCategories = [
    {
      icon: <Code className="w-8 h-8" />,
      title: "Frontend Development",
      skills: ["React", "JavaScript", "TypeScript", "HTML/CSS", "Tailwind CSS"]
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: "Backend Development",
      skills: ["Node.js", "Python", "PostgreSQL", "MongoDB", "REST APIs"]
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Web Technologies",
      skills: ["Git", "Docker", "AWS", "Vercel", "Webpack"]
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Mobile Development",
      skills: ["React Native", "Flutter", "iOS", "Android", "Expo"]
    }
  ];

  return (
    <section ref={ref} className="portfolio-section">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="section-title">Skills</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, index) => (
            <div key={index} className="portfolio-card text-center">
              <div className="text-brown-600 mb-4 flex justify-center">
                {category.icon}
              </div>
              <h3 className="font-bold text-brown-800 mb-4">{category.title}</h3>
              <ul className="space-y-2">
                {category.skills.map((skill, skillIndex) => (
                  <li key={skillIndex} className="text-brown-600 bg-brown-50 px-3 py-1 rounded-full text-sm">
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

Skills.displayName = 'Skills';

export default Skills;
