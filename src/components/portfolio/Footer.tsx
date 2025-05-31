
import React from 'react';
import { Github, Linkedin, Twitter, Mail, Heart } from 'lucide-react';

const Footer = () => {
  const socialLinks = [
    {
      icon: <Github className="w-5 h-5" />,
      label: "GitHub",
      url: "https://github.com/username"
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      label: "LinkedIn",
      url: "https://linkedin.com/in/username"
    },
    {
      icon: <Twitter className="w-5 h-5" />,
      label: "Twitter",
      url: "https://twitter.com/username"
    },
    {
      icon: <Mail className="w-5 h-5" />,
      label: "Email",
      url: "mailto:john.doe@email.com"
    }
  ];

  return (
    <footer className="bg-brown-800 text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h3 className="text-2xl font-bold mb-2">John Doe</h3>
            <p className="text-brown-200">Full Stack Developer</p>
          </div>
          
          <div className="flex space-x-4">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-brown-700 hover:bg-brown-600 p-3 rounded-full transition-colors"
                aria-label={link.label}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
        
        <div className="border-t border-brown-700 mt-8 pt-8 text-center text-brown-200">
          <p className="flex items-center justify-center gap-2">
            Made with <Heart className="w-4 h-4 text-red-400" /> by John Doe
          </p>
          <p className="mt-2 text-sm">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
