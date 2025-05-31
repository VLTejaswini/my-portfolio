
import React, { forwardRef } from 'react';
import { GraduationCap, Calendar, MapPin, Mail } from 'lucide-react';

const PersonalDetails = forwardRef<HTMLElement>((props, ref) => {
  const details = [
    {
      icon: <GraduationCap className="w-6 h-6" />,
      label: "Education",
      value: "Bachelor of Computer Science"
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      label: "Batch",
      value: "2020-2024"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      label: "College",
      value: "University of Technology"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      label: "Email",
      value: "john.doe@email.com"
    }
  ];

  return (
    <section ref={ref} className="portfolio-section">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="section-title">Personal Details</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          {details.map((detail, index) => (
            <div key={index} className="portfolio-card flex items-center space-x-4">
              <div className="text-brown-600">
                {detail.icon}
              </div>
              <div>
                <h3 className="font-semibold text-brown-800 mb-1">{detail.label}</h3>
                <p className="text-brown-600">{detail.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

PersonalDetails.displayName = 'PersonalDetails';

export default PersonalDetails;
