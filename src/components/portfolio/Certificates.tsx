
import React, { forwardRef, useState } from 'react';
import { Image as ImageIcon, Award, ExternalLink } from 'lucide-react';

interface Certificate {
  title: string;
  image: string;
  category: string;
  issuer?: string;
  date?: string;
}

const Certificates = forwardRef<HTMLElement>((props, ref) => {
  const [certificates, setCertificates] = useState<Certificate[]>([
    {
      title: "1-1 Marks Sheet",
      image: "/certificates/1-1.jpg",
      category: "VVIT Marks Sheets",
      issuer: "VVIT University",
      date: "2023"
    },
    {
      title: "1-2 Marks Sheet",
      image: "/certificates/1-2.jpg",
      category: "VVIT Marks Sheets",
      issuer: "VVIT University",
      date: "2023"
    },
    {
      title: "2-1 Marks Sheet",
      image: "/certificates/2-1.jpg",
      category: "VVIT Marks Sheets",
      issuer: "VVIT University",
      date: "2024"
    }
  ]);

  const groupedCertificates = certificates.reduce((groups, cert) => {
    const category = cert.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(cert);
    return groups;
  }, {} as Record<string, Certificate[]>);

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-orange-50 to-red-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Certificates & Achievements</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            My academic records and professional certifications
          </p>
        </div>

        <div className="space-y-12">
          {Object.entries(groupedCertificates).map(([category, certs]) => (
            <div key={category} className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <Award className="mr-3 text-orange-600" />
                {category}
              </h3>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {certs.map((cert, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="aspect-video bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                      <ImageIcon className="w-12 h-12 text-gray-400" />
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
                    
                    <button className="flex items-center text-orange-600 hover:text-orange-700 text-sm font-medium">
                      <ExternalLink className="w-4 h-4 mr-1" />
                      View Certificate
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-orange-600 text-white px-8 py-3 rounded-lg hover:bg-orange-700 transition-colors font-medium">
            Add New Certificate
          </button>
        </div>
      </div>
    </section>
  );
});

Certificates.displayName = 'Certificates';

export default Certificates;
