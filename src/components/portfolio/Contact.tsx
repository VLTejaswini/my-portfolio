import React, { forwardRef } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const Contact = forwardRef<HTMLElement>((props, ref) => {
  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6" />,
      label: "Location",
      value: "India, Andhra Pradesh, Guntur",
      link: "#"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      label: "Email",
      value: "vuddantilakshmitejaswini@gmail.com",
      link: "mailto:vuddantilakshmitejaswini@gmail.com"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      label: "Phone",
      value: "63*******5",
      link: "tel:63*******5"
    }
  ];

  return (
    <section ref={ref} className="portfolio-section">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="section-title mb-6">Contact Me</h2>

        <div className="space-y-4">
          {contactInfo.map((info, index) => (
            <a
              key={index}
              href={info.link}
              className="flex items-center space-x-4 p-4 bg-white/50 rounded-lg hover:bg-white/70 transition-colors"
            >
              <div className="text-brown-600">{info.icon}</div>
              <div>
                <h4 className="font-semibold text-brown-800">{info.label}</h4>
                <p className="text-brown-600">{info.value}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
});

Contact.displayName = 'Contact';

export default Contact;
