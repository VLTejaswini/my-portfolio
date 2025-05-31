
import React, { forwardRef, useState } from 'react';
import { Upload, Award, Download, Trash2, Eye } from 'lucide-react';

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  file?: {
    name: string;
    url: string;
    type: string;
  };
}

const Certificates = forwardRef<HTMLElement>((props, ref) => {
  const [certificates, setCertificates] = useState<Certificate[]>([
    {
      id: '1',
      title: 'React Developer Certification',
      issuer: 'Meta',
      date: '2023'
    },
    {
      id: '2',
      title: 'AWS Solutions Architect',
      issuer: 'Amazon Web Services',
      date: '2023'
    },
    {
      id: '3',
      title: 'Full Stack Web Development',
      issuer: 'freeCodeCamp',
      date: '2022'
    }
  ]);

  const handleFileUpload = (certId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const fileData = {
      name: file.name,
      url: URL.createObjectURL(file),
      type: file.type
    };

    setCertificates(prev => prev.map(cert => 
      cert.id === certId
        ? { ...cert, file: fileData }
        : cert
    ));
  };

  const removeFile = (certId: string) => {
    setCertificates(prev => prev.map(cert => 
      cert.id === certId
        ? { ...cert, file: undefined }
        : cert
    ));
  };

  const viewFile = (file: { url: string; type: string }) => {
    if (file.type.includes('pdf')) {
      window.open(file.url, '_blank');
    } else {
      // For images, you could open in a modal or new tab
      window.open(file.url, '_blank');
    }
  };

  return (
    <section ref={ref} className="portfolio-section">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="section-title">Certificates</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          {certificates.map((cert) => (
            <div key={cert.id} className="portfolio-card">
              <div className="flex items-start space-x-4 mb-4">
                <div className="text-brown-600 mt-1">
                  <Award className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-brown-800 text-lg mb-1">{cert.title}</h3>
                  <p className="text-brown-600 mb-1">{cert.issuer}</p>
                  <p className="text-brown-500 text-sm">{cert.date}</p>
                </div>
              </div>

              <div className="border-t border-brown-200 pt-4">
                {!cert.file ? (
                  <label className="flex items-center justify-center gap-2 bg-brown-100 hover:bg-brown-200 text-brown-700 px-4 py-3 rounded-lg cursor-pointer transition-colors border-2 border-dashed border-brown-300">
                    <Upload className="w-5 h-5" />
                    Upload Certificate (PDF/Image)
                    <input
                      type="file"
                      onChange={(e) => handleFileUpload(cert.id, e)}
                      className="hidden"
                      accept=".pdf,.jpg,.jpeg,.png,.gif"
                    />
                  </label>
                ) : (
                  <div className="bg-brown-50 p-3 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-brown-800">{cert.file.name}</p>
                        <p className="text-xs text-brown-500 capitalize">{cert.file.type.split('/')[1]} file</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => viewFile(cert.file!)}
                          className="text-brown-600 hover:text-brown-800 transition-colors p-1"
                          title="View"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <a
                          href={cert.file.url}
                          download={cert.file.name}
                          className="text-brown-600 hover:text-brown-800 transition-colors p-1"
                          title="Download"
                        >
                          <Download className="w-4 h-4" />
                        </a>
                        <button
                          onClick={() => removeFile(cert.id)}
                          className="text-red-600 hover:text-red-800 transition-colors p-1"
                          title="Remove"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
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

Certificates.displayName = 'Certificates';

export default Certificates;
