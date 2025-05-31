
import React, { forwardRef, useState } from 'react';
import { Briefcase, Calendar, Edit2, Save, X, Plus, Trash2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

interface ExperienceItem {
  id: string;
  title: string;
  company: string;
  period: string;
  description: string;
}

const Experience = forwardRef<HTMLElement>((props, ref) => {
  const [isEditing, setIsEditing] = useState(false);
  const [experiences, setExperiences] = useState<ExperienceItem[]>([
    {
      id: '1',
      title: "Senior Frontend Developer",
      company: "Tech Solutions Inc.",
      period: "2022 - Present",
      description: "Led development of responsive web applications using React and TypeScript. Collaborated with cross-functional teams to deliver high-quality software solutions."
    },
    {
      id: '2',
      title: "Full Stack Developer",
      company: "Digital Agency",
      period: "2021 - 2022",
      description: "Developed and maintained web applications using MERN stack. Implemented RESTful APIs and optimized database queries for improved performance."
    },
    {
      id: '3',
      title: "Junior Developer",
      company: "StartUp Co.",
      period: "2020 - 2021",
      description: "Built responsive websites and learned modern web development practices. Participated in code reviews and agile development processes."
    }
  ]);

  const [editExperiences, setEditExperiences] = useState(experiences);

  React.useEffect(() => {
    const saved = localStorage.getItem('portfolioExperience');
    if (saved) {
      const parsedData = JSON.parse(saved);
      setExperiences(parsedData);
      setEditExperiences(parsedData);
    }
  }, []);

  const handleSave = () => {
    setExperiences(editExperiences);
    localStorage.setItem('portfolioExperience', JSON.stringify(editExperiences));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditExperiences(experiences);
    setIsEditing(false);
  };

  const addExperience = () => {
    const newExp: ExperienceItem = {
      id: Date.now().toString(),
      title: "",
      company: "",
      period: "",
      description: ""
    };
    setEditExperiences(prev => [...prev, newExp]);
  };

  const updateExperience = (id: string, field: keyof ExperienceItem, value: string) => {
    setEditExperiences(prev => prev.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    ));
  };

  const removeExperience = (id: string) => {
    setEditExperiences(prev => prev.filter(exp => exp.id !== id));
  };

  return (
    <section ref={ref} className="portfolio-section">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="section-title">Experience</h2>
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
                onClick={addExperience}
                size="sm"
                variant="outline"
                className="text-brown-600 border-brown-300"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add
              </Button>
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
          {(isEditing ? editExperiences : experiences).map((exp) => (
            <div key={exp.id} className="portfolio-card">
              <div className="flex items-start space-x-4">
                <div className="text-brown-600 mt-1">
                  <Briefcase className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  {isEditing ? (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Input
                          placeholder="Job Title"
                          value={exp.title}
                          onChange={(e) => updateExperience(exp.id, 'title', e.target.value)}
                          className="flex-1 mr-2"
                        />
                        <Button
                          onClick={() => removeExperience(exp.id)}
                          size="sm"
                          variant="outline"
                          className="text-red-600 border-red-300"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <Input
                        placeholder="Company"
                        value={exp.company}
                        onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                      />
                      <Input
                        placeholder="Period (e.g., 2022 - Present)"
                        value={exp.period}
                        onChange={(e) => updateExperience(exp.id, 'period', e.target.value)}
                      />
                      <Textarea
                        placeholder="Job description..."
                        value={exp.description}
                        onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                        rows={3}
                      />
                    </div>
                  ) : (
                    <>
                      <h3 className="font-bold text-brown-800 text-xl mb-1">{exp.title}</h3>
                      <h4 className="font-semibold text-brown-600 mb-2">{exp.company}</h4>
                      <div className="flex items-center text-brown-500 mb-3">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>{exp.period}</span>
                      </div>
                      <p className="text-brown-600 leading-relaxed">{exp.description}</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

Experience.displayName = 'Experience';

export default Experience;
