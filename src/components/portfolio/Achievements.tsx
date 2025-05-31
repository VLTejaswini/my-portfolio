
import React, { forwardRef, useState } from 'react';
import { Trophy, Star, Target, Zap, Edit2, Save, X, Plus, Trash2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

interface Achievement {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  year: string;
}

const Achievements = forwardRef<HTMLElement>((props, ref) => {
  const [isEditing, setIsEditing] = useState(false);
  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: '1',
      icon: <Trophy className="w-8 h-8" />,
      title: "Best Developer Award",
      description: "Recognized as the top performing developer in 2023 for outstanding code quality and innovation.",
      year: "2023"
    },
    {
      id: '2',
      icon: <Star className="w-8 h-8" />,
      title: "Open Source Contributor",
      description: "Contributed to 15+ open source projects with over 1000 GitHub stars collectively.",
      year: "2022-2023"
    },
    {
      id: '3',
      icon: <Target className="w-8 h-8" />,
      title: "Project Lead Success",
      description: "Successfully led a team of 5 developers to deliver a complex project 2 weeks ahead of schedule.",
      year: "2022"
    },
    {
      id: '4',
      icon: <Zap className="w-8 h-8" />,
      title: "Performance Optimization",
      description: "Improved application performance by 40% through code optimization and architectural improvements.",
      year: "2023"
    }
  ]);

  const [editAchievements, setEditAchievements] = useState(achievements);

  const iconOptions = [
    { value: 'Trophy', component: <Trophy className="w-8 h-8" /> },
    { value: 'Star', component: <Star className="w-8 h-8" /> },
    { value: 'Target', component: <Target className="w-8 h-8" /> },
    { value: 'Zap', component: <Zap className="w-8 h-8" /> }
  ];

  React.useEffect(() => {
    const saved = localStorage.getItem('portfolioAchievements');
    if (saved) {
      const parsedData = JSON.parse(saved);
      const dataWithIcons = parsedData.map((achievement: any) => ({
        ...achievement,
        icon: iconOptions.find(opt => opt.value === achievement.iconType)?.component || <Trophy className="w-8 h-8" />
      }));
      setAchievements(dataWithIcons);
      setEditAchievements(dataWithIcons);
    }
  }, []);

  const handleSave = () => {
    const dataToSave = editAchievements.map(achievement => ({
      ...achievement,
      iconType: getIconType(achievement.icon)
    }));
    setAchievements(editAchievements);
    localStorage.setItem('portfolioAchievements', JSON.stringify(dataToSave));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditAchievements(achievements);
    setIsEditing(false);
  };

  const getIconType = (icon: React.ReactNode): string => {
    const iconString = icon?.toString() || '';
    if (iconString.includes('Trophy')) return 'Trophy';
    if (iconString.includes('Star')) return 'Star';
    if (iconString.includes('Target')) return 'Target';
    if (iconString.includes('Zap')) return 'Zap';
    return 'Trophy';
  };

  const addAchievement = () => {
    const newAchievement: Achievement = {
      id: Date.now().toString(),
      icon: <Trophy className="w-8 h-8" />,
      title: "",
      description: "",
      year: ""
    };
    setEditAchievements(prev => [...prev, newAchievement]);
  };

  const updateAchievement = (id: string, field: keyof Achievement, value: string | React.ReactNode) => {
    setEditAchievements(prev => prev.map(achievement => 
      achievement.id === id ? { ...achievement, [field]: value } : achievement
    ));
  };

  const removeAchievement = (id: string) => {
    setEditAchievements(prev => prev.filter(achievement => achievement.id !== id));
  };

  return (
    <section ref={ref} className="portfolio-section">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="section-title">Achievements</h2>
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
                onClick={addAchievement}
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
        
        <div className="grid md:grid-cols-2 gap-6">
          {(isEditing ? editAchievements : achievements).map((achievement) => (
            <div key={achievement.id} className="portfolio-card">
              <div className="flex items-start space-x-4">
                <div className="text-brown-600 mt-1">
                  {achievement.icon}
                </div>
                <div className="flex-1">
                  {isEditing ? (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Input
                          placeholder="Achievement Title"
                          value={achievement.title}
                          onChange={(e) => updateAchievement(achievement.id, 'title', e.target.value)}
                          className="flex-1 mr-2"
                        />
                        <Button
                          onClick={() => removeAchievement(achievement.id)}
                          size="sm"
                          variant="outline"
                          className="text-red-600 border-red-300"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <Input
                        placeholder="Year"
                        value={achievement.year}
                        onChange={(e) => updateAchievement(achievement.id, 'year', e.target.value)}
                      />
                      <Textarea
                        placeholder="Description..."
                        value={achievement.description}
                        onChange={(e) => updateAchievement(achievement.id, 'description', e.target.value)}
                        rows={3}
                      />
                      <div className="flex gap-2">
                        {iconOptions.map((option) => (
                          <button
                            key={option.value}
                            onClick={() => updateAchievement(achievement.id, 'icon', option.component)}
                            className="p-2 border rounded hover:bg-brown-100 text-brown-600"
                          >
                            {option.component}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold text-brown-800 text-lg">{achievement.title}</h3>
                        <span className="text-brown-500 text-sm font-medium">{achievement.year}</span>
                      </div>
                      <p className="text-brown-600 leading-relaxed">{achievement.description}</p>
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

Achievements.displayName = 'Achievements';

export default Achievements;
