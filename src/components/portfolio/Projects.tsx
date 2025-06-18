import React, { forwardRef } from 'react';
import { ExternalLink, Github } from 'lucide-react';

const Projects = forwardRef<HTMLElement>((props, ref) => {
  const projects = [
    {
      title: "MIND GRID: THE SUDOKU GAME",
      description: "A Python Flask-based Sudoku puzzle game with a web interface.",
      technologies: ["HTML", "CSS", "JS", "TS"],
      demoLink: "https://sudoku-game-3.onrender.com",
      githubLink: "https://github.com/VLTejaswini/my-portfolio"
    }
  ];

  return (
    <section ref={ref} className="portfolio-section">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="section-title mb-8">Projects</h2>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="portfolio-card">
              <h3 className="text-xl font-bold text-brown-800 mb-2">{project.title}</h3>
              <p className="text-brown-600 mb-3">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech, idx) => (
                  <span key={idx} className="bg-brown-100 text-brown-600 px-3 py-1 rounded-full text-sm">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex gap-4">
                <a
                  href={project.demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
                >
                  <ExternalLink className="w-4 h-4" /> Demo
                </a>
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 text-white bg-gray-700 rounded hover:bg-gray-800"
                >
                  <Github className="w-4 h-4" /> GitHub
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

Projects.displayName = 'Projects';

export default Projects;
