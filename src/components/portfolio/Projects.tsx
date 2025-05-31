
import React, { forwardRef, useState } from 'react';
import { Upload, File, Download, Trash2, ExternalLink } from 'lucide-react';

interface ProjectFile {
  id: string;
  name: string;
  type: string;
  size: number;
  url?: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  files: ProjectFile[];
  demoUrl?: string;
  githubUrl?: string;
}

const Projects = forwardRef<HTMLElement>((props, ref) => {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      title: 'E-commerce Platform',
      description: 'A full-stack e-commerce solution with React frontend and Node.js backend.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      files: [],
      demoUrl: 'https://demo.example.com',
      githubUrl: 'https://github.com/username/project'
    },
    {
      id: '2',
      title: 'Task Management App',
      description: 'A collaborative task management application with real-time updates.',
      technologies: ['React', 'Socket.io', 'Express', 'PostgreSQL'],
      files: [],
      demoUrl: 'https://tasks.example.com'
    }
  ]);

  const handleFileUpload = (projectId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      const newFile: ProjectFile = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        name: file.name,
        type: file.type,
        size: file.size,
        url: URL.createObjectURL(file)
      };

      setProjects(prev => prev.map(project => 
        project.id === projectId
          ? { ...project, files: [...project.files, newFile] }
          : project
      ));
    });
  };

  const removeFile = (projectId: string, fileId: string) => {
    setProjects(prev => prev.map(project => 
      project.id === projectId
        ? { ...project, files: project.files.filter(f => f.id !== fileId) }
        : project
    ));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <section ref={ref} className="portfolio-section">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="section-title">Projects</h2>
        
        <div className="grid lg:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="portfolio-card">
              <h3 className="font-bold text-brown-800 text-xl mb-3">{project.title}</h3>
              <p className="text-brown-600 mb-4">{project.description}</p>
              
              <div className="mb-4">
                <h4 className="font-semibold text-brown-700 mb-2">Technologies:</h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="bg-brown-100 text-brown-700 px-3 py-1 rounded-full text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {(project.demoUrl || project.githubUrl) && (
                <div className="mb-4 flex gap-2">
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-brown-600 text-white px-4 py-2 rounded hover:bg-brown-700 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Demo
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      GitHub
                    </a>
                  )}
                </div>
              )}

              <div className="border-t border-brown-200 pt-4">
                <h4 className="font-semibold text-brown-700 mb-3">Project Files:</h4>
                
                <label className="flex items-center justify-center gap-2 bg-brown-100 hover:bg-brown-200 text-brown-700 px-4 py-3 rounded-lg cursor-pointer transition-colors mb-4 border-2 border-dashed border-brown-300">
                  <Upload className="w-5 h-5" />
                  Upload Files (Code, Docs, etc.)
                  <input
                    type="file"
                    multiple
                    onChange={(e) => handleFileUpload(project.id, e)}
                    className="hidden"
                    accept=".zip,.rar,.tar.gz,.js,.html,.css,.py,.java,.cpp,.pdf,.txt,.md"
                  />
                </label>

                {project.files.length > 0 && (
                  <div className="space-y-2">
                    {project.files.map((file) => (
                      <div key={file.id} className="flex items-center justify-between bg-brown-50 p-3 rounded">
                        <div className="flex items-center gap-3">
                          <File className="w-4 h-4 text-brown-600" />
                          <div>
                            <p className="text-sm font-medium text-brown-800">{file.name}</p>
                            <p className="text-xs text-brown-500">{formatFileSize(file.size)}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {file.url && (
                            <a
                              href={file.url}
                              download={file.name}
                              className="text-brown-600 hover:text-brown-800 transition-colors"
                            >
                              <Download className="w-4 h-4" />
                            </a>
                          )}
                          <button
                            onClick={() => removeFile(project.id, file.id)}
                            className="text-red-600 hover:text-red-800 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
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
