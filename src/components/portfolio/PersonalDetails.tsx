
import React, { forwardRef, useState } from 'react';
import { GraduationCap, Calendar, MapPin, Mail, Edit2, Save, X, Plus, Trash2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

interface Degree {
  id: string;
  degree: string;
  institution: string;
  year: string;
}

interface ProfileData {
  name: string;
  bio: string;
  profileImage: string;
}

interface PersonalDetailsProps {
  profileData: ProfileData;
}

const PersonalDetails = forwardRef<HTMLElement, PersonalDetailsProps>(({ profileData }, ref) => {
  const [isEditing, setIsEditing] = useState(false);
  const [details, setDetails] = useState([
    {
      icon: <Mail className="w-6 h-6" />,
      label: "Email",
      value: "john.doe@email.com",
      key: "email"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      label: "Location",
      value: "New York, NY",
      key: "location"
    }
  ]);

  const [degrees, setDegrees] = useState<Degree[]>([
    {
      id: '1',
      degree: "Bachelor of Computer Science",
      institution: "University of Technology",
      year: "2024"
    },
    {
      id: '2',
      degree: "Master of Software Engineering",
      institution: "Tech Institute",
      year: "2026"
    }
  ]);

  const [editData, setEditData] = useState(details);
  const [editDegrees, setEditDegrees] = useState(degrees);

  React.useEffect(() => {
    const savedDetails = localStorage.getItem('portfolioPersonalDetails');
    const savedDegrees = localStorage.getItem('portfolioDegrees');
    
    if (savedDetails) {
      const parsedData = JSON.parse(savedDetails);
      setDetails(parsedData);
      setEditData(parsedData);
    }
    
    if (savedDegrees) {
      const parsedDegrees = JSON.parse(savedDegrees);
      setDegrees(parsedDegrees);
      setEditDegrees(parsedDegrees);
    }
  }, []);

  const handleSave = () => {
    setDetails(editData);
    setDegrees(editDegrees);
    localStorage.setItem('portfolioPersonalDetails', JSON.stringify(editData));
    localStorage.setItem('portfolioDegrees', JSON.stringify(editDegrees));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(details);
    setEditDegrees(degrees);
    setIsEditing(false);
  };

  const updateField = (key: string, value: string) => {
    setEditData(prev => prev.map(item => 
      item.key === key ? { ...item, value } : item
    ));
  };

  const addDegree = () => {
    const newDegree: Degree = {
      id: Date.now().toString(),
      degree: "",
      institution: "",
      year: ""
    };
    setEditDegrees(prev => [...prev, newDegree]);
  };

  const updateDegree = (id: string, field: keyof Degree, value: string) => {
    setEditDegrees(prev => prev.map(degree => 
      degree.id === id ? { ...degree, [field]: value } : degree
    ));
  };

  const removeDegree = (id: string) => {
    setEditDegrees(prev => prev.filter(degree => degree.id !== id));
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
        
        <div className="space-y-6">
          {/* Education Section */}
          <div className="portfolio-card">
            <div className="flex items-center mb-4">
              <GraduationCap className="w-6 h-6 text-brown-600 mr-3" />
              <h3 className="font-semibold text-brown-800 text-lg">Education</h3>
              {isEditing && (
                <Button
                  onClick={addDegree}
                  size="sm"
                  variant="outline"
                  className="ml-auto text-brown-600 border-brown-300"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Degree
                </Button>
              )}
            </div>
            
            <div className="space-y-4">
              {(isEditing ? editDegrees : degrees).map((degree, index) => (
                <div key={degree.id} className="bg-brown-50 p-4 rounded-lg">
                  {isEditing ? (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Input
                          placeholder="Degree (e.g., Bachelor of Computer Science)"
                          value={degree.degree}
                          onChange={(e) => updateDegree(degree.id, 'degree', e.target.value)}
                          className="flex-1 mr-2"
                        />
                        <Button
                          onClick={() => removeDegree(degree.id)}
                          size="sm"
                          variant="outline"
                          className="text-red-600 border-red-300"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <Input
                        placeholder="Institution"
                        value={degree.institution}
                        onChange={(e) => updateDegree(degree.id, 'institution', e.target.value)}
                      />
                      <Input
                        placeholder="Graduation Year"
                        value={degree.year}
                        onChange={(e) => updateDegree(degree.id, 'year', e.target.value)}
                      />
                    </div>
                  ) : (
                    <div>
                      <h4 className="font-semibold text-brown-800">{degree.degree}</h4>
                      <p className="text-brown-600">{degree.institution}</p>
                      <p className="text-brown-500 text-sm">Graduated: {degree.year}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Other Details */}
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
      </div>
    </section>
  );
});

PersonalDetails.displayName = 'PersonalDetails';

export default PersonalDetails;
