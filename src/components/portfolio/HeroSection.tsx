
import React, { forwardRef, useState } from 'react';
import { Camera, Edit } from 'lucide-react';

interface ProfileData {
  name: string;
  bio: string;
  profileImage: string;
}

interface HeroSectionProps {
  profileData: ProfileData;
  setProfileData: (data: ProfileData) => void;
}

const HeroSection = forwardRef<HTMLElement, HeroSectionProps>(({ profileData, setProfileData }, ref) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(profileData);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newData = { ...profileData, profileImage: e.target?.result as string };
        setProfileData(newData);
        localStorage.setItem('portfolioProfile', JSON.stringify(newData));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setProfileData(editData);
    localStorage.setItem('portfolioProfile', JSON.stringify(editData));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(profileData);
    setIsEditing(false);
  };

  React.useEffect(() => {
    const saved = localStorage.getItem('portfolioProfile');
    if (saved) {
      const parsedData = JSON.parse(saved);
      setProfileData(parsedData);
      setEditData(parsedData);
    }
  }, [setProfileData]);

  return (
    <section ref={ref} className="hero-section min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-4xl mx-auto text-center">
        <div className="relative inline-block mb-8">
          <div className="w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-white shadow-2xl bg-white">
            <img
              src={profileData.profileImage}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <label className="absolute bottom-2 right-2 bg-brown-600 hover:bg-brown-700 text-white p-2 rounded-full cursor-pointer transition-colors shadow-lg">
            <Camera className="w-5 h-5" />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
        </div>

        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 shadow-2xl">
          {isEditing ? (
            <div className="space-y-4">
              <input
                type="text"
                value={editData.name}
                onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                className="w-full text-3xl font-bold text-center bg-transparent border-b-2 border-white text-white placeholder-white/70 focus:outline-none focus:border-white/90"
                placeholder="Your Name"
              />
              <textarea
                value={editData.bio}
                onChange={(e) => setEditData({ ...editData, bio: e.target.value })}
                className="w-full text-lg text-center bg-transparent border-2 border-white rounded-lg p-4 text-white placeholder-white/70 focus:outline-none focus:border-white/90 resize-none"
                placeholder="Write your bio here..."
                rows={4}
              />
              <div className="flex gap-4 justify-center">
                <button
                  onClick={handleSave}
                  className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-center gap-2 mb-4">
                <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
                  {profileData.name}
                </h1>
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-white/80 hover:text-white p-2 transition-colors"
                >
                  <Edit className="w-5 h-5" />
                </button>
              </div>
              <p className="text-xl text-white/90 leading-relaxed max-w-2xl mx-auto drop-shadow">
                {profileData.bio}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
});

HeroSection.displayName = 'HeroSection';

export default HeroSection;
