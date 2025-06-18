import React, { forwardRef, useState } from 'react';
import { Image as ImageIcon } from 'lucide-react';

interface Certificate {
  title: string;
  image: string;
  category: string;
}

const Certificates = forwardRef<HTMLElement>((props, ref) => {
  const [certificates, setCertificates] = useState<Certificate[]>([
    {
      title: "1st Semester Marks Sheet",
      image: "certificates/vvit_sem1.jpg",
      category: "VVIT Marks Sheets"
    },
    {
      title: "2nd Semester Marks Sheet",
      image: "certificates/vvit_sem2.jpg",
      category: "VVIT Marks Sheets"
    }
  ]);

  const grouped = certificates.reduce((acc: Record<string, Certificate[]>, cert) => {
    acc[cert.category] = acc[cert.category] || [];
    acc[cert.category].push(cert);
    return acc;
  }, {});

  return (
    <section ref={ref} className="portfolio-section">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="section-title mb-8">Certificates</h2>
        {Object.keys(grouped).map((category, index) => (
          <div key={index} className="mb-10">
            <h3 className="text-2xl font-bold text-brown-800 mb-4">{category}</h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {grouped[category].map((cert, idx) => (
                <div key={idx} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <a href={cert.image} target="_blank" rel="noopener noreferrer">
                    <img src={cert.image} alt={cert.title} className="w-full h-48 object-cover" />
                  </a>
                  <div className="p-4">
                    <h4 className="font-semibold text-brown-700">{cert.title}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
});

Certificates.displayName = 'Certificates';

export default Certificates;
