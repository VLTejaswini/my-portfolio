
import React, { forwardRef, useState } from 'react';
import { Image as ImageIcon, Award, ExternalLink, Upload, Plus, Edit2, Save, X, Eye } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

interface Certificate {
  id: string;
  title: string;
  image: string;
  category: string;
  issuer?: string;
  date?: string;
}

const Certificates = forwardRef<HTMLElement>((props, ref) => {
  const [isEditing, setIsEditing] = useState(false);
  const [viewingCertificate, setViewingCertificate] = useState<Certificate | null>(null);
  const [certificates, setCertificates] = useState<Certificate[]>([
    {
      id: '1',
      title: "1-1 Marks Sheet",
      image: "/certificates/1-1.jpg",
      category: "VVIT Marks Sheets",
      issuer: "VVIT University",
      date: "2023"
    },
    {
      id: '2',
      title: "1-2 Marks Sheet",
      image: "/certificates/1-2.jpg",
      category: "VVIT Marks Sheets",
      issuer: "VVIT University",
      date: "2023"
    },
    {
      id: '3',
      title: "2-1 Marks Sheet",
      image: "/certificates/2-1.jpg",
      category: "VVIT Marks Sheets",
      issuer: "VVIT University",
      date: "2024"
    }
  ]);

  const [editCertificates, setEditCertificates] = useState(certificates);

  const handleImageUpload = (certId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        setEditCertificates(prev => prev.map(cert => 
          cert.id === certId ? { ...cert, image: imageUrl } : cert
        ));
      };
      reader.readAsDataURL(file);
    }
  };

  const addCertificate = () => {
    const newCert: Certificate = {
      id: Date.now().toString(),
      title: "",
      image: "",
      category: "New Category",
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

  const handleSave = () => {
    setCertificates(editCertificates);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditCertificates(certificates);
    setIsEditing(false);
  };

  const handleViewCertificate = (cert: Certificate) => {
    console.log('Viewing certificate:', cert);
    setViewingCertificate(cert);
  };

  const groupedCertificates = (isEditing ? editCertificates : certificates).reduce((groups, cert) => {
    const category = cert.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(cert);
    return groups;
  }, {} as Record<string, Certificate[]>);

  return (
    <>
      <section ref={ref} className="py-20 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="flex items-center justify-between mb-8">
              <div className="flex-1">
                <h2 className="text-4xl font-bold text-gray-800 mb-4">Certificates & Achievements</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  My academic records and professional certifications
                </p>
              </div>
              {!isEditing ? (
                <Button
                  onClick={() => setIsEditing(true)}
                  variant="outline"
                  className="text-orange-600 border-orange-300 hover:bg-orange-50"
                >
                  <Edit2 className="w-4 h-4 mr-2" />
                  Edit Certificates
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button
                    onClick={addCertificate}
                    variant="outline"
                    className="text-orange-600 border-orange-300"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Certificate
                  </Button>
                  <Button
                    onClick={handleSave}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                  <Button
                    onClick={handleCancel}
                    variant="outline"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-12">
            {Object.entries(groupedCertificates).map(([category, certs]) => (
              <div key={category} className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <Award className="mr-3 text-orange-600" />
                  {category}
                </h3>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {certs.map((cert) => (
                    <div
                      key={cert.id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      {isEditing ? (
                        <div className="space-y-3">
                          <div className="aspect-video bg-gray-100 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
                            {cert.image ? (
                              <img src={cert.image} alt={cert.title} className="w-full h-full object-cover" />
                            ) : (
                              <ImageIcon className="w-12 h-12 text-gray-400" />
                            )}
                            <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                              <Upload className="w-8 h-8 text-white" />
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageUpload(cert.id, e)}
                                className="hidden"
                              />
                            </label>
                          </div>
                          
                          <Input
                            placeholder="Certificate Title"
                            value={cert.title}
                            onChange={(e) => updateCertificate(cert.id, 'title', e.target.value)}
                          />
                          
                          <Input
                            placeholder="Category"
                            value={cert.category}
                            onChange={(e) => updateCertificate(cert.id, 'category', e.target.value)}
                          />
                          
                          <Input
                            placeholder="Issued by"
                            value={cert.issuer || ''}
                            onChange={(e) => updateCertificate(cert.id, 'issuer', e.target.value)}
                          />
                          
                          <Input
                            placeholder="Date"
                            value={cert.date || ''}
                            onChange={(e) => updateCertificate(cert.id, 'date', e.target.value)}
                          />
                          
                          <Button
                            onClick={() => removeCertificate(cert.id)}
                            variant="outline"
                            className="w-full text-red-600 border-red-300"
                          >
                            Remove Certificate
                          </Button>
                        </div>
                      ) : (
                        <>
                          <div className="aspect-video bg-gray-100 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                            {cert.image ? (
                              <img src={cert.image} alt={cert.title} className="w-full h-full object-cover" />
                            ) : (
                              <ImageIcon className="w-12 h-12 text-gray-400" />
                            )}
                          </div>
                          
                          <h4 className="font-semibold text-gray-800 mb-2">{cert.title}</h4>
                          
                          {cert.issuer && (
                            <p className="text-sm text-gray-600 mb-1">
                              <strong>Issued by:</strong> {cert.issuer}
                            </p>
                          )}
                          
                          {cert.date && (
                            <p className="text-sm text-gray-600 mb-3">
                              <strong>Date:</strong> {cert.date}
                            </p>
                          )}
                          
                          <button 
                            onClick={() => handleViewCertificate(cert)}
                            className="flex items-center text-orange-600 hover:text-orange-700 text-sm font-medium"
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            View Certificate
                          </button>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certificate Viewer Modal */}
      {viewingCertificate && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl max-h-[90vh] overflow-auto">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="text-xl font-bold">{viewingCertificate.title}</h3>
              <button
                onClick={() => setViewingCertificate(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-4">
              {viewingCertificate.image ? (
                <img
                  src={viewingCertificate.image}
                  alt={viewingCertificate.title}
                  className="w-full h-auto max-h-[70vh] object-contain"
                />
              ) : (
                <div className="flex items-center justify-center h-64 bg-gray-100">
                  <ImageIcon className="w-16 h-16 text-gray-400" />
                  <p className="ml-4 text-gray-500">No image available</p>
                </div>
              )}
              <div className="mt-4">
                {viewingCertificate.issuer && (
                  <p className="text-gray-600 mb-2">
                    <strong>Issued by:</strong> {viewingCertificate.issuer}
                  </p>
                )}
                {viewingCertificate.date && (
                  <p className="text-gray-600">
                    <strong>Date:</strong> {viewingCertificate.date}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
});

Certificates.displayName = 'Certificates';

export default Certificates;
