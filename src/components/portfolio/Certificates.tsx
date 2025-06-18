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
      title: "1-1 Marks Sheet",
      image: "/certificates/1-1.jpg",
      category: "VVIT Marks Sheets"
    },
    {
      title: "1-2 Marks Sheet",
      image: "/certificates/1-2.jpg",
      category: "VVIT Marks Sheets"
    },
    {
      title: "2-1 Marks Sheet",
      image: "/certificates/2-1.jpg",
      category: "VVIT Marks Sheets"
    }
  ]); index) => (
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
