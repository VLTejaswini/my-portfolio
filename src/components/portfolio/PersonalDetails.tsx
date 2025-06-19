
import React, { forwardRef, useState } from 'react';
import { School, GraduationCap, Edit, Save, X } from 'lucide-react';

interface PersonalDetailsProps {
  portfolioData: {
    degree: string;
    college: string;
    batch: string;
    school: string;
  };
  updatePortfolioData: (updates: any) => void;
}

const PersonalDetails = forwardRef<HTMLElement, PersonalDetailsProps>(({ portfolioData, updatePortfolioData }, ref) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    degree: portfolioData.degree,
    college: portfolioData.college,
    batch: portfolioData.batch,
    school: portfolioData.school
  });

  const handleSave = () => {
    updatePortfolioData(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({
      degree: portfolioData.degree,
      college: portfolioData.college,
      batch: portfolioData.batch,
      school: portfolioData.school
    });
    setIsEditing(false);
  };

  return (
    <section ref={ref} className="portfolio-section">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="section-title">Personal Details</h2>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="p-2 text-brown-600 hover:text-brown-800 hover:bg-brown-100 rounded-full transition-colors"
          >
            <Edit className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6">
          <div className="portfolio-card">
            {isEditing ? (
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <GraduationCap className="w-6 h-6 text-brown-600" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-brown-800 mb-2">Degree</h4>
                    <input
                      type="text"
                      value={editData.degree}
                      onChange={(e) => setEditData({...editData, degree: e.target.value})}
                      className="w-full p-2 border border-brown-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
                    />
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <School className="w-6 h-6 text-brown-600" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-brown-800 mb-2">College</h4>
                    <input
                      type="text"
                      value={editData.college}
                      onChange={(e) => setEditData({...editData, college: e.target.value})}
                      className="w-full p-2 border border-brown-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
                    />
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <School className="w-6 h-6 text-brown-600" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-brown-800 mb-2">Batch</h4>
                    <input
                      type="text"
                      value={editData.batch}
                      onChange={(e) => setEditData({...editData, batch: e.target.value})}
                      className="w-full p-2 border border-brown-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
                    />
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <School className="w-6 h-6 text-brown-600" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-brown-800 mb-2">School</h4>
                    <input
                      type="text"
                      value={editData.school}
                      onChange={(e) => setEditData({...editData, school: e.target.value})}
                      className="w-full p-2 border border-brown-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
                    />
                  </div>
                </div>
                
                <div className="flex gap-3 mt-6">
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
              <>
                <div className="flex items-center space-x-4 mb-3">
                  <GraduationCap className="w-6 h-6 text-brown-600" />
                  <div>
                    <h4 className="font-semibold text-brown-800">Degree</h4>
                    <p className="text-brown-600">{portfolioData.degree}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 mb-3">
                  <School className="w-6 h-6 text-brown-600" />
                  <div>
                    <h4 className="font-semibold text-brown-800">College</h4>
                    <p className="text-brown-600">{portfolioData.college}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 mb-3">
                  <School className="w-6 h-6 text-brown-600" />
                  <div>
                    <h4 className="font-semibold text-brown-800">Batch</h4>
                    <p className="text-brown-600">{portfolioData.batch}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <School className="w-6 h-6 text-brown-600" />
                  <div>
                    <h4 className="font-semibold text-brown-800">School</h4>
                    <p className="text-brown-600">{portfolioData.school}</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
});

PersonalDetails.displayName = 'PersonalDetails';

export default PersonalDetails;
