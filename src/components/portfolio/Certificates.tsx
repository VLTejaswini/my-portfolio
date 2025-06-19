
import React, { forwardRef, useState } from 'react';
import { Image as ImageIcon, Award, Upload, Plus, Edit2, Save, X, Eye } from 'lucide-react';
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

interface CertificatesProps {
  certificates: Certificate[];
  updateCertificates: (certificates: Certificate[]) => void;
}

const Certificates = forwardRef<HTMLElement, CertificatesProps>(({ certificates, updateCertificates }, ref) => {
  const [isEditing, setIsEditing] = useState(false);
  const [viewingCertificate, setViewingCertificate] = useState<Certificate | null>(null);
  const [editCertificates, setEditCertificates] = useState(certificates);

  // Update editCertificates when certificates prop changes
  React.useEffect(() => {
    setEditCertificates(certificates);
  }, [certificates]);

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
    updateCertificates(editCertificates);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditCertificates(certificates);
    setIsEditing(false);
  };

  const handleViewCertificate = (cert: Certificate) => {
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
                <h2 className="text-4xl font-bold text-gray-800 mb-4">Academic Records & Certificates</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  My academic achievements and professional certifications
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
                <h3 className="text-2xl font-bold text-gray-800 mb-8 flex items-center">
                  <Award className="mr-3 text-orange-600" />
                  {category}
                </h3>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {certs.map((cert) => (
                    <div
                      key={cert.id}
                      className="bg-gray-50 border border-gray-200 rounded-lg p-6 hover:shadow-md transition-all duration-200"
                    >
                      {isEditing ? (
                        <div className="space-y-4">
                          <div className="aspect-[4/3] bg-gray-100 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
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
                            className="mb-3"
                          />
                          
                          <Input
                            placeholder="Category"
                            value={cert.category}
                            onChange={(e) => updateCertificate(cert.id, 'category', e.target.value)}
                            className="mb-3"
                          />
                          
                          <Input
                            placeholder="Issued by"
                            value={cert.issuer || ''}
                            onChange={(e) => updateCertificate(cert.id, 'issuer', e.target.value)}
                            className="mb-3"
                          />
                          
                          <Input
                            placeholder="Date"
                            value={cert.date || ''}
                            onChange={(e) => updateCertificate(cert.id, 'date', e.target.value)}
                            className="mb-4"
                          />
                          
                          <Button
                            onClick={() => removeCertificate(cert.id)}
                            variant="outline"
                            className="w-full text-red-600 border-red-300 hover:bg-red-50"
                          >
                            Remove Certificate
                          </Button>
                        </div>
                      ) : (
                        <div className="h-full flex flex-col">
                          <div className="aspect-[4/3] bg-gray-100 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                            {cert.image ? (
                              <img 
                                src={cert.image} 
                                alt={cert.title} 
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-200 cursor-pointer"
                                onClick={() => handleViewCertificate(cert)}
                              />
                            ) : (
                              <ImageIcon className="w-12 h-12 text-gray-400" />
                            )}
                          </div>
                          
                          <div className="flex-1 flex flex-col">
                            <h4 className="font-semibold text-gray-800 mb-3 text-lg">{cert.title}</h4>
                            
                            <div className="space-y-2 mb-4 flex-1">
                              {cert.issuer && (
                                <p className="text-sm text-gray-600">
                                  <span className="font-medium">Issued by:</span> {cert.issuer}
                                </p>
                              )}
                              
                              {cert.date && (
                                <p className="text-sm text-gray-600">
                                  <span className="font-medium">Date:</span> {cert.date}
                                </p>
                              )}
                            </div>
                            
                            <Button
                              onClick={() => handleViewCertificate(cert)}
                              variant="outline"
                              className="w-full text-orange-600 border-orange-300 hover:bg-orange-50"
                            >
                              <Eye className="w-4 h-4 mr-2" />
                              View Certificate
                            </Button>
                          </div>
                        </div>
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
          <div className="bg-white rounded-lg max-w-5xl max-h-[90vh] overflow-auto">
            <div className="p-6 border-b flex justify-between items-center">
              <h3 className="text-xl font-bold">{viewingCertificate.title}</h3>
              <button
                onClick={() => setViewingCertificate(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6">
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
              <div className="mt-6 space-y-2">
                {viewingCertificate.issuer && (
                  <p className="text-gray-600">
                    <span className="font-medium">Issued by:</span> {viewingCertificate.issuer}
                  </p>
                )}
                {viewingCertificate.date && (
                  <p className="text-gray-600">
                    <span className="font-medium">Date:</span> {viewingCertificate.date}
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
