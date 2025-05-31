
import React, { forwardRef, useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, Edit, Save, X, Plus, Trash2 } from 'lucide-react';

interface ContactInfo {
  icon: string;
  label: string;
  value: string;
  link: string;
}

const Contact = forwardRef<HTMLElement>((props, ref) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isEditing, setIsEditing] = useState(false);
  const [contactInfo, setContactInfo] = useState<ContactInfo[]>([
    {
      icon: "Mail",
      label: "Email",
      value: "john.doe@email.com",
      link: "mailto:john.doe@email.com"
    },
    {
      icon: "Phone",
      label: "Phone",
      value: "+1 (555) 123-4567",
      link: "tel:+15551234567"
    },
    {
      icon: "MapPin",
      label: "Location",
      value: "San Francisco, CA",
      link: "#"
    }
  ]);
  const [editContactInfo, setEditContactInfo] = useState<ContactInfo[]>(contactInfo);

  useEffect(() => {
    const saved = localStorage.getItem('portfolioContact');
    if (saved) {
      const parsedData = JSON.parse(saved);
      setContactInfo(parsedData);
      setEditContactInfo(parsedData);
    }
  }, []);

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'Mail': return <Mail className="w-6 h-6" />;
      case 'Phone': return <Phone className="w-6 h-6" />;
      case 'MapPin': return <MapPin className="w-6 h-6" />;
      default: return <Mail className="w-6 h-6" />;
    }
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log('Form submitted:', formData);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSaveContact = () => {
    setContactInfo(editContactInfo);
    localStorage.setItem('portfolioContact', JSON.stringify(editContactInfo));
    setIsEditing(false);
  };

  const handleCancelContact = () => {
    setEditContactInfo(contactInfo);
    setIsEditing(false);
  };

  const addContactInfo = () => {
    setEditContactInfo([...editContactInfo, {
      icon: "Mail",
      label: "New Contact",
      value: "",
      link: "#"
    }]);
  };

  const removeContactInfo = (index: number) => {
    setEditContactInfo(editContactInfo.filter((_, i) => i !== index));
  };

  const updateContactInfo = (index: number, field: keyof ContactInfo, value: string) => {
    const updated = editContactInfo.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    );
    setEditContactInfo(updated);
  };

  return (
    <section ref={ref} className="portfolio-section">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-center gap-4 mb-12">
          <h2 className="section-title">Contact Me</h2>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="text-brown-600 hover:text-brown-800 p-2 rounded-lg hover:bg-brown-100 transition-colors"
          >
            <Edit className="w-5 h-5" />
          </button>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div>
            <h3 className="font-bold text-brown-800 text-xl mb-6">Get In Touch</h3>
            <p className="text-brown-600 mb-6 leading-relaxed">
              I'm always interested in new opportunities and collaborations. 
              Whether you have a project in mind or just want to connect, 
              feel free to reach out!
            </p>
            
            {isEditing ? (
              <div className="space-y-4">
                {editContactInfo.map((info, index) => (
                  <div key={index} className="p-4 bg-white/50 rounded-lg border border-brown-200">
                    <div className="grid grid-cols-2 gap-2 mb-2">
                      <select
                        value={info.icon}
                        onChange={(e) => updateContactInfo(index, 'icon', e.target.value)}
                        className="px-3 py-2 border border-brown-200 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
                      >
                        <option value="Mail">Mail</option>
                        <option value="Phone">Phone</option>
                        <option value="MapPin">Location</option>
                      </select>
                      <input
                        type="text"
                        value={info.label}
                        onChange={(e) => updateContactInfo(index, 'label', e.target.value)}
                        className="px-3 py-2 border border-brown-200 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
                        placeholder="Label"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2 mb-2">
                      <input
                        type="text"
                        value={info.value}
                        onChange={(e) => updateContactInfo(index, 'value', e.target.value)}
                        className="px-3 py-2 border border-brown-200 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
                        placeholder="Value"
                      />
                      <input
                        type="text"
                        value={info.link}
                        onChange={(e) => updateContactInfo(index, 'link', e.target.value)}
                        className="px-3 py-2 border border-brown-200 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
                        placeholder="Link"
                      />
                    </div>
                    <button
                      onClick={() => removeContactInfo(index)}
                      className="text-red-600 hover:text-red-800 p-1 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                
                <div className="flex gap-2">
                  <button
                    onClick={addContactInfo}
                    className="flex items-center gap-2 px-4 py-2 bg-brown-600 text-white rounded-lg hover:bg-brown-700 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Add Contact Info
                  </button>
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={handleSaveContact}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    Save
                  </button>
                  <button
                    onClick={handleCancelContact}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <a
                    key={index}
                    href={info.link}
                    className="flex items-center space-x-4 p-4 bg-white/50 rounded-lg hover:bg-white/70 transition-colors"
                  >
                    <div className="text-brown-600">
                      {getIconComponent(info.icon)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-brown-800">{info.label}</h4>
                      <p className="text-brown-600">{info.value}</p>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Contact Form */}
          <div className="portfolio-card">
            <h3 className="font-bold text-brown-800 text-xl mb-6">Send Message</h3>
            
            {isSubmitted ? (
              <div className="text-center py-8">
                <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h4 className="font-semibold text-green-800 mb-2">Message Sent!</h4>
                <p className="text-green-600">Thank you for reaching out. I'll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-brown-700 font-medium mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-500 transition-colors ${
                      errors.name ? 'border-red-500' : 'border-brown-200'
                    }`}
                    placeholder="Your full name"
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-brown-700 font-medium mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-500 transition-colors ${
                      errors.email ? 'border-red-500' : 'border-brown-200'
                    }`}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="message" className="block text-brown-700 font-medium mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-500 transition-colors resize-none ${
                      errors.message ? 'border-red-500' : 'border-brown-200'
                    }`}
                    placeholder="Tell me about your project or just say hello..."
                  />
                  {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  className="w-full bg-brown-600 hover:bg-brown-700 text-white px-6 py-3 rounded-lg transition-colors font-medium flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
});

Contact.displayName = 'Contact';

export default Contact;
