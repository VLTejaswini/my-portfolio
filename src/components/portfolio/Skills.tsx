
import React, { forwardRef, useState } from 'react';
import { Code, Edit, Save, X, Plus, Trash2 } from 'lucide-react';

interface SkillsProps {
  skills: string[];
  updateSkills: (skills: string[]) => void;
}

const Skills = forwardRef<HTMLElement, SkillsProps>(({ skills, updateSkills }, ref) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editSkills, setEditSkills] = useState([...skills]);
  const [newSkill, setNewSkill] = useState('');

  const handleSave = () => {
    updateSkills(editSkills.filter(skill => skill.trim() !== ''));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditSkills([...skills]);
    setNewSkill('');
    setIsEditing(false);
  };

  const addSkill = () => {
    if (newSkill.trim() !== '') {
      setEditSkills([...editSkills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (index: number) => {
    setEditSkills(editSkills.filter((_, i) => i !== index));
  };

  const updateSkill = (index: number, value: string) => {
    const updated = [...editSkills];
    updated[index] = value;
    setEditSkills(updated);
  };

  return (
    <section ref={ref} className="portfolio-section">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="section-title">Skills</h2>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="p-2 text-brown-600 hover:text-brown-800 hover:bg-brown-100 rounded-full transition-colors"
          >
            <Edit className="w-5 h-5" />
          </button>
        </div>

        {isEditing ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {editSkills.map((skill, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={skill}
                    onChange={(e) => updateSkill(index, e.target.value)}
                    className="flex-1 p-2 border border-brown-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
                  />
                  <button
                    onClick={() => removeSkill(index)}
                    className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                placeholder="Add new skill..."
                className="flex-1 p-2 border border-brown-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
              />
              <button
                onClick={addSkill}
                className="p-2 bg-brown-600 text-white rounded-md hover:bg-brown-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                <Save className="w-4 h-4" />
                Save
              </button>
              <button
                onClick={handleCancel}
                className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
              >
                <X className="w-4 h-4" />
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="bg-white text-brown-600 px-4 py-2 rounded-lg text-center border border-brown-200 shadow-sm"
              >
                <Code className="inline-block w-4 h-4 mr-2 text-brown-400" />
                {skill}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
});

Skills.displayName = 'Skills';

export default Skills;
