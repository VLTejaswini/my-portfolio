
import React, { forwardRef } from 'react';
import { Trophy, Star, Target, Zap } from 'lucide-react';

const Achievements = forwardRef<HTMLElement>((props, ref) => {
  const achievements = [
    {
      icon: <Trophy className="w-8 h-8" />,
      title: "Best Developer Award",
      description: "Recognized as the top performing developer in 2023 for outstanding code quality and innovation.",
      year: "2023"
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "Open Source Contributor",
      description: "Contributed to 15+ open source projects with over 1000 GitHub stars collectively.",
      year: "2022-2023"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Project Lead Success",
      description: "Successfully led a team of 5 developers to deliver a complex project 2 weeks ahead of schedule.",
      year: "2022"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Performance Optimization",
      description: "Improved application performance by 40% through code optimization and architectural improvements.",
      year: "2023"
    }
  ];

  return (
    <section ref={ref} className="portfolio-section">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="section-title">Achievements</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          {achievements.map((achievement, index) => (
            <div key={index} className="portfolio-card">
              <div className="flex items-start space-x-4">
                <div className="text-brown-600 mt-1">
                  {achievement.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-brown-800 text-lg">{achievement.title}</h3>
                    <span className="text-brown-500 text-sm font-medium">{achievement.year}</span>
                  </div>
                  <p className="text-brown-600 leading-relaxed">{achievement.description}</p>
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
