
import React, { forwardRef, useState } from 'react';
import { Code, Database, Globe, Smartphone, Edit2, Save, X, Plus, Trash2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

const Skills = forwardRef<HTMLElement>((props, ref) => {
  const [isEditing, setIsEditing] = useState(false);
  const [skillCategories, setSkillCategories] = useState([
    {
      icon: <Code className="w-8 h-8" />,
      title: "Frontend Development",
      skills: ["React", "JavaScript", "TypeScript", "HTML/CSS", "Tailwind CSS"]
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: "Backend Development",
      skills: ["Node.js", "Python", "PostgreSQL", "MongoDB", "REST APIs"]
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Web Technologies",
      skills: ["Git", "Docker", "AWS", "Vercel", "Webpack"]
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Mobile Development",
      skills: ["React Native", "Flutter", "iOS", "Android", "Expo"]
    }
  ]);

  const [editData, setEditData] = useState(skillCategories);

  React.useEffect(() => {
    const saved = localStorage.getItem('portfolioSkills');
    if (saved) {
      const parsedData = JSON.parse(saved);
      setSkillCategories(parsedData);
      setEditData(parsedData);
    }
  }, []);

  const handleSave = () => {
    setSkillCategories(editData);
    localStorage.setItem('portfolioSkills', JSON.stringify(editData));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(skillCategories);
    setIsEditing(false);
  };

  const updateCategoryTitle = (categoryIndex: number, title: string) => {
    setEditData(prev => prev.map((cat, idx) => 
      idx === categoryIndex ? { ...cat, title } : cat
    ));
  };

  const addSkill = (categoryIndex: number) => {
    setEditData(prev => prev.map((cat, idx) => 
      idx === categoryIndex ? { ...cat, skills: [...cat.skills, "New Skill"] } : cat
    ));
  };

  const updateSkill = (categoryIndex: number, skillIndex: number, skill: string) => {
    setEditData(prev => prev.map((cat, idx) => 
      idx === categoryIndex ? {
        ...cat,
        skills: cat.skills.map((s, sIdx) => sIdx === skillIndex ? skill : s)
      } : cat
    ));
  };

  const removeSkill = (categoryIndex: number, skillIndex: number) => {
    setEditData(prev => prev.map((cat, idx) => 
      idx === categoryIndex ? {
        ...cat,
        skills: cat.skills.filter((_, sIdx) => sIdx !== skillIndex)
      } : cat
    ));
  };

  return (
    <section ref={ref} className="portfolio-section">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="section-title">Skills</h2>
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
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {(isEditing ? editData : skillCategories).map((category, categoryIndex) => (
            <div key={categoryIndex} className="portfolio-card text-center">
              <div className="text-brown-600 mb-4 flex justify-center">
                {category.icon}
              </div>
              {isEditing ? (
                <Input
                  value={category.title}
                  onChange={(e) => updateCategoryTitle(categoryIndex, e.target.value)}
                  className="font-bold text-brown-800 mb-4 text-center"
                />
              ) : (
                <h3 className="font-bold text-brown-800 mb-4">{category.title}</h3>
              )}
              <ul className="space-y-2">
                {category.skills.map((skill, skillIndex) => (
                  <li key={skillIndex} className="flex items-center gap-2">
                    {isEditing ? (
                      <>
                        <Input
                          value={skill}
                          onChange={(e) => updateSkill(categoryIndex, skillIndex, e.target.value)}
                          className="text-brown-600 bg-brown-50 text-sm"
                        />
                        <Button
                          onClick={() => removeSkill(categoryIndex, skillIndex)}
                          variant="ghost"
                          size="sm"
                          className="p-1 h-auto"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </>
                    ) : (
                      <span className="text-brown-600 bg-brown-50 px-3 py-1 rounded-full text-sm">
                        {skill}
                      </span>
                    )}
                  </li>
                ))}
                {isEditing && (
                  <li>
                    <Button
                      onClick={() => addSkill(categoryIndex)}
                      variant="outline"
                      size="sm"
                      className="text-brown-600 border-brown-300"
                    >
                      <Plus className="w-3 h-3 mr-1" />
                      Add Skill
                    </Button>
                  </li>
                )}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

Skills.displayName = 'Skills';

export default Skills;
