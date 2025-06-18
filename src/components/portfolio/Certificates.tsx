
import React, { forwardRef, useState } from 'react';
import { Upload, Award, Download, Trash2, Eye, Edit2, Save, X, Plus, FileText, FolderOpen } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';

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

interface CertificateCategory {
  id: string;
  name: string;
  files: CertificateFile[];
  isOpen: boolean;
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

  const [categories, setCategories] = useState<CertificateCategory[]>([
    {
      id: '1',
      name: 'VVIT Mark Sheets',
      files: [],
      isOpen: true
    },
    {
      id: '2',
      name: 'Professional Certifications',
      files: [],
      isOpen: false
    },
    {
      id: '3',
      name: 'Course Certificates',
      files: [],
      isOpen: false
    },
    {
      id: '4',
      name: 'Achievement Awards',
      files: [],
      isOpen: false
    }
  ]);

  const [editCertificates, setEditCertificates] = useState(certificates);

  React.useEffect(() => {
    const saved = localStorage.getItem('portfolioCertificates');
    const savedCategories = localStorage.getItem('portfolioCertificateCategories');
    
    if (saved) {
      const parsedData = JSON.parse(saved);
      setCertificates(parsedData);
      setEditCertificates(parsedData);
    }
    
    if (savedCategories) {
      const parsedCategories = JSON.parse(savedCategories);
      setCategories(parsedCategories);
    }
  }, []);

  const handleSave = () => {
    setCertificates(editCertificates);
    localStorage.setItem('portfolioCertificates', JSON.stringify(editCertificates));
    localStorage.setItem('portfolioCertificateCategories', JSON.stringify(categories));
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

  const handleCategoryFileUpload = (categoryId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newFiles: CertificateFile[] = Array.from(files).map(file => ({
      id: Date.now().toString() + Math.random().toString(),
      name: file.name,
      url: URL.createObjectURL(file),
      type: file.type,
      uploadDate: new Date().toLocaleDateString()
    }));

    setCategories(prev => prev.map(category => 
      category.id === categoryId 
        ? { ...category, files: [...category.files, ...newFiles] }
        : category
    ));
  };

  const removeFileFromCategory = (categoryId: string, fileId: string) => {
    setCategories(prev => prev.map(category => 
      category.id === categoryId 
        ? { ...category, files: category.files.filter(file => file.id !== fileId) }
        : category
    ));
  };

  const toggleCategory = (categoryId: string) => {
    setCategories(prev => prev.map(category => 
      category.id === categoryId 
        ? { ...category, isOpen: !category.isOpen }
        : category
    ));
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
        
        {/* Categorized Certificate Upload Areas */}
        <div className="space-y-6 mb-8">
          <h3 className="font-bold text-brown-800 text-xl mb-4 flex items-center">
            <FolderOpen className="w-6 h-6 mr-2" />
            Certificate Categories
          </h3>
          
          {categories.map((category) => (
            <div key={category.id} className="portfolio-card">
              <Collapsible open={category.isOpen} onOpenChange={() => toggleCategory(category.id)}>
                <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left hover:bg-brown-50 rounded-lg transition-colors">
                  <div className="flex items-center space-x-3">
                    <FolderOpen className="w-5 h-5 text-brown-600" />
                    <h4 className="font-semibold text-brown-800 text-lg">{category.name}</h4>
                    <span className="text-sm text-brown-500 bg-brown-100 px-2 py-1 rounded-full">
                      {category.files.length} files
                    </span>
                  </div>
                  <div className="text-brown-400">
                    {category.isOpen ? '−' : '+'}
                  </div>
                </CollapsibleTrigger>
                
                <CollapsibleContent className="px-4 pb-4">
                  {/* Upload Area for this category */}
                  <label className="flex flex-col items-center justify-center gap-3 bg-brown-50 hover:bg-brown-100 text-brown-700 p-6 rounded-lg cursor-pointer transition-colors border-2 border-dashed border-brown-300 mb-4">
                    <Upload className="w-6 h-6" />
                    <div className="text-center">
                      <p className="font-medium">Upload files to {category.name}</p>
                      <p className="text-sm text-brown-500">Select multiple PDF, JPG, PNG files</p>
                    </div>
                    <input
                      type="file"
                      onChange={(e) => handleCategoryFileUpload(category.id, e)}
                      className="hidden"
                      accept=".pdf,.jpg,.jpeg,.png,.gif"
                      multiple
                    />
                  </label>

                  {/* Files in this category */}
                  {category.files.length > 0 && (
                    <div className="space-y-3">
                      {category.files.map((file) => (
                        <div key={file.id} className="bg-white p-4 rounded-lg border border-brown-200 flex items-center justify-between">
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
                              onClick={() => removeFileFromCategory(category.id, file.id)}
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
                </CollapsibleContent>
              </Collapsible>
            </div>
          ))}
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
