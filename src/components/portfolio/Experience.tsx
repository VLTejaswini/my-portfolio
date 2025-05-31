
import React, { forwardRef } from 'react';
import { Briefcase, Calendar } from 'lucide-react';

const Experience = forwardRef<HTMLElement>((props, ref) => {
  const experiences = [
    {
      title: "Senior Frontend Developer",
      company: "Tech Solutions Inc.",
      period: "2022 - Present",
      description: "Led development of responsive web applications using React and TypeScript. Collaborated with cross-functional teams to deliver high-quality software solutions."
    },
    {
      title: "Full Stack Developer",
      company: "Digital Agency",
      period: "2021 - 2022",
      description: "Developed and maintained web applications using MERN stack. Implemented RESTful APIs and optimized database queries for improved performance."
    },
    {
      title: "Junior Developer",
      company: "StartUp Co.",
      period: "2020 - 2021",
      description: "Built responsive websites and learned modern web development practices. Participated in code reviews and agile development processes."
    }
  ];

  return (
    <section ref={ref} className="portfolio-section">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="section-title">Experience</h2>
        
        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <div key={index} className="portfolio-card">
              <div className="flex items-start space-x-4">
                <div className="text-brown-600 mt-1">
                  <Briefcase className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-brown-800 text-xl mb-1">{exp.title}</h3>
                  <h4 className="font-semibold text-brown-600 mb-2">{exp.company}</h4>
                  <div className="flex items-center text-brown-500 mb-3">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{exp.period}</span>
                  </div>
                  <p className="text-brown-600 leading-relaxed">{exp.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

Experience.displayName = 'Experience';

export default Experience;
