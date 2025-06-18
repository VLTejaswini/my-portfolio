
import React, { forwardRef, useState } from 'react';
import { Upload, Award, Download, Trash2, Eye, Edit2, Save, X, Plus, FileText } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
}

interface CertificateFile {
  id: string;
  name: string;
  url: string;
  type: string;
  uploadDate: string;
}

const Certificates = forwardRef<HTMLElement>((props, ref) => {
  const [isEditing, setIsEditing] = useState(false);
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

  const [certificateFiles, setCertificateFiles] = useState<CertificateFile[]>([]);
  const [editCertificates, setEditCertificates] = useState(certificates);

  React.useEffect(() => {
    const saved = localStorage.getItem('portfolioCertificates');
    const savedFiles = localStorage.getItem('portfolioCertificateFiles');
    
    if (saved) {
      const parsedData = JSON.parse(saved);
      setCertificates(parsedData);
      setEditCertificates(parsedData);
    }
    
    if (savedFiles) {
      const parsedFiles = JSON.parse(savedFiles);
      setCertificateFiles(parsedFiles);
    }
  }, []);

  const handleSave = () => {
    setCertificates(editCertificates);
    localStorage.setItem('portfolioCertificates', JSON.stringify(editCertificates));
    localStorage.setItem('portfolioCertificateFiles', JSON.stringify(certificateFiles));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditCertificates(certificates);
    setIsEditing(false);
  };

  const addCertificate = () => {
    const newCert: Certificate = {
      id: Date.now().toString(),
      title: "",
      issuer: "",
      date: ""
    };
    setEditCertificates(prev => [...prev, newCert]);
  };

  const updateCertificate = (id: string, field: keyof Certificate, value: string) => {
    setEditCertificates(prev => prev.map(cert => 
      cert.id === id ? { ...cert, [field]: value } : cert
    ));
  };

  const removeCertificate = (id: string) => {
    setEditCertificates(prev => prev.filter(cert => cert.id !== id));
  };

  const handleMultipleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newFiles: CertificateFile[] = Array.from(files).map(file => ({
      id: Date.now().toString() + Math.random().toString(),
      name: file.name,
      url: URL.createObjectURL(file),
      type: file.type,
      uploadDate: new Date().toLocaleDateString()
    }));

    setCertificateFiles(prev => [...prev, ...newFiles]);
    localStorage.setItem('portfolioCertificateFiles', JSON.stringify([...certificateFiles, ...newFiles]));
  };

  const removeFile = (fileId: string) => {
    const updatedFiles = certificateFiles.filter(file => file.id !== fileId);
    setCertificateFiles(updatedFiles);
    localStorage.setItem('portfolioCertificateFiles', JSON.stringify(updatedFiles));
  };

  const viewFile = (file: CertificateFile) => {
    if (file.type.includes('pdf')) {
      window.open(file.url, '_blank');
    } else {
      window.open(file.url, '_blank');
    }
  };

  return (
    <section ref={ref} className="portfolio-section">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="section-title">Certificates</h2>
          {!isEditing ? (
            <Button
              onClick={() => setIsEditing(true)}
              variant="outline"
              size="sm"
              className="text-brown-600 border-brown-300 hover:bg-brown-50"
            >
              <Edit2 className="w-4 h-4 mr-2" />
              Edit
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button
                onClick={addCertificate}
                size="sm"
                variant="outline"
                className="text-brown-600 border-brown-300"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add
              </Button>
              <Button
                onClick={handleSave}
                size="sm"
                className="bg-green-600 hover:bg-green-700"
              >
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
              <Button
                onClick={handleCancel}
                variant="outline"
                size="sm"
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </div>
          )}
        </div>
        
        {/* Certificate Upload Area */}
        <div className="portfolio-card mb-8">
          <h3 className="font-bold text-brown-800 text-lg mb-4 flex items-center">
            <Upload className="w-5 h-5 mr-2" />
            Upload Certificate Files
          </h3>
          
          <label className="flex flex-col items-center justify-center gap-4 bg-brown-100 hover:bg-brown-200 text-brown-700 p-8 rounded-lg cursor-pointer transition-colors border-2 border-dashed border-brown-300 mb-6">
            <Upload className="w-8 h-8" />
            <div className="text-center">
              <p className="font-medium">Click to upload certificate files</p>
              <p className="text-sm text-brown-500">Select multiple PDF, JPG, PNG files</p>
            </div>
            <input
              type="file"
              onChange={handleMultipleFileUpload}
              className="hidden"
              accept=".pdf,.jpg,.jpeg,.png,.gif"
              multiple
            />
          </label>

          {/* Uploaded Files Display */}
          {certificateFiles.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-semibold text-brown-800">Uploaded Certificate Files</h4>
              {certificateFiles.map((file) => (
                <div key={file.id} className="bg-brown-50 p-4 rounded-lg flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-5 h-5 text-brown-600" />
                    <div>
                      <p className="font-medium text-brown-800">{file.name}</p>
                      <p className="text-xs text-brown-500">
                        {file.type.split('/')[1].toUpperCase()} • Uploaded: {file.uploadDate}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => viewFile(file)}
                      className="text-brown-600 hover:text-brown-800 transition-colors p-2"
                      title="View"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <a
                      href={file.url}
                      download={file.name}
                      className="text-brown-600 hover:text-brown-800 transition-colors p-2"
                      title="Download"
                    >
                      <Download className="w-4 h-4" />
                    </a>
                    <button
                      onClick={() => removeFile(file.id)}
                      className="text-red-600 hover:text-red-800 transition-colors p-2"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Certificate Details */}
        <div className="grid md:grid-cols-2 gap-6">
          {(isEditing ? editCertificates : certificates).map((cert) => (
            <div key={cert.id} className="portfolio-card">
              <div className="flex items-start space-x-4">
                <div className="text-brown-600 mt-1">
                  <Award className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  {isEditing ? (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Input
                          placeholder="Certificate Title"
                          value={cert.title}
                          onChange={(e) => updateCertificate(cert.id, 'title', e.target.value)}
                          className="flex-1 mr-2"
                        />
                        <Button
                          onClick={() => removeCertificate(cert.id)}
                          size="sm"
                          variant="outline"
                          className="text-red-600 border-red-300"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <Input
                        placeholder="Issuer"
                        value={cert.issuer}
                        onChange={(e) => updateCertificate(cert.id, 'issuer', e.target.value)}
                      />
                      <Input
                        placeholder="Date"
                        value={cert.date}
                        onChange={(e) => updateCertificate(cert.id, 'date', e.target.value)}
                      />
                    </div>
                  ) : (
                    <>
                      <h3 className="font-bold text-brown-800 text-lg mb-1">{cert.title}</h3>
                      <p className="text-brown-600 mb-1">{cert.issuer}</p>
                      <p className="text-brown-500 text-sm">{cert.date}</p>
                    </>
                  )}
                </div>
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
