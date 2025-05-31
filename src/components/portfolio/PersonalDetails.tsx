
import React, { forwardRef, useState } from 'react';
import { GraduationCap, Calendar, MapPin, Mail, Edit2, Save, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

const PersonalDetails = forwardRef<HTMLElement>((props, ref) => {
  const [isEditing, setIsEditing] = useState(false);
  const [details, setDetails] = useState([
    {
      icon: <GraduationCap className="w-6 h-6" />,
      label: "Education",
      value: "Bachelor of Computer Science",
      key: "education"
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      label: "Batch",
      value: "2020-2024",
      key: "batch"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      label: "College",
      value: "University of Technology",
      key: "college"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      label: "Email",
      value: "john.doe@email.com",
      key: "email"
    }
  ]);

  const [editData, setEditData] = useState(details);

  React.useEffect(() => {
    const saved = localStorage.getItem('portfolioPersonalDetails');
    if (saved) {
      const parsedData = JSON.parse(saved);
      setDetails(parsedData);
      setEditData(parsedData);
    }
  }, []);

  const handleSave = () => {
    setDetails(editData);
    localStorage.setItem('portfolioPersonalDetails', JSON.stringify(editData));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(details);
    setIsEditing(false);
  };

  const updateField = (key: string, value: string) => {
    setEditData(prev => prev.map(item => 
      item.key === key ? { ...item, value } : item
    ));
  };

  return (
    <section ref={ref} className="portfolio-section">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="section-title">Personal Details</h2>
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
        
        <div className="grid md:grid-cols-2 gap-6">
          {(isEditing ? editData : details).map((detail, index) => (
            <div key={index} className="portfolio-card flex items-center space-x-4">
              <div className="text-brown-600">
                {detail.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-brown-800 mb-1">{detail.label}</h3>
                {isEditing ? (
                  <Input
                    value={detail.value}
                    onChange={(e) => updateField(detail.key, e.target.value)}
                    className="text-brown-600"
                  />
                ) : (
                  <p className="text-brown-600">{detail.value}</p>
                )}
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
