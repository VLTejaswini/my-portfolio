
import React, { forwardRef } from 'react';
import { Download, FileText, Eye } from 'lucide-react';

const Resume = forwardRef<HTMLElement>((props, ref) => {
  const handleDownload = () => {
    // Create a dummy PDF download link
    const link = document.createElement('a');
    link.href = '/placeholder.svg'; // In a real app, this would be your resume PDF
    link.download = 'John_Doe_Resume.pdf';
    link.click();
  };

  const handleView = () => {
    // Open resume in new tab
    window.open('/placeholder.svg', '_blank');
  };

  return (
    <section ref={ref} className="portfolio-section">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <h2 className="section-title">Resume</h2>
        
        <div className="portfolio-card">
          <div className="text-brown-600 mb-6 flex justify-center">
            <FileText className="w-16 h-16" />
          </div>
          
          <h3 className="font-bold text-brown-800 text-xl mb-4">Download My Resume</h3>
          <p className="text-brown-600 mb-6 leading-relaxed">
            Get a comprehensive overview of my experience, skills, and qualifications. 
            My resume includes detailed information about my professional background, 
            education, and key achievements.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleView}
              className="flex items-center justify-center gap-2 bg-brown-100 hover:bg-brown-200 text-brown-700 px-6 py-3 rounded-lg transition-colors font-medium"
            >
              <Eye className="w-5 h-5" />
              View Resume
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center justify-center gap-2 bg-brown-600 hover:bg-brown-700 text-white px-6 py-3 rounded-lg transition-colors font-medium"
            >
              <Download className="w-5 h-5" />
              Download PDF
            </button>
          </div>
          
          <div className="mt-6 text-sm text-brown-500">
            <p>Last updated: November 2023</p>
            <p>File size: ~150KB</p>
          </div>
        </div>
      </div>
    </section>
  );
});

Resume.displayName = 'Resume';

export default Resume;
