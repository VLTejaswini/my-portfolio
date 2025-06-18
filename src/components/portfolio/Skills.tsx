import React, { forwardRef, useState } from 'react';
import { Code } from 'lucide-react';

const Skills = forwardRef<HTMLElement>((props, ref) => {
  const [skills, setSkills] = useState<string[]>(["HTML", "Python", "SQL", "CSS", "Java"]);

  return (
    <section ref={ref} className="portfolio-section">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="section-title mb-6">Skills</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="bg-white text-brown-600 px-4 py-2 rounded-lg text-center border border-brown-200 shadow-sm"
            >
              <Code className="inline-block w-4 h-4 mr-2 text-brown-400" />
              {skill}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

Skills.displayName = 'Skills';

export default Skills;
