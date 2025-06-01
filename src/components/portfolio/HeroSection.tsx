
import React, { forwardRef, useState } from 'react';
import { Camera, Edit, Sparkles, Code, Coffee } from 'lucide-react';

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
    <section ref={ref} className="hero-section min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden">
      {/* Modern background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-20 h-20 bg-white rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-32 right-32 w-16 h-16 bg-white rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-20 w-12 h-12 bg-white rounded-full blur-xl animate-pulse delay-2000"></div>
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        {/* Modern Profile Section */}
        <div className="relative inline-block mb-12">
          {/* Round Profile Image */}
          <div className="relative">
            <div className="w-56 h-56 mx-auto rounded-full overflow-hidden border-4 border-white/30 shadow-2xl bg-white/10 backdrop-blur-sm relative">
              <img
                src={profileData.profileImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-brown-900/20 to-transparent"></div>
            </div>
            
            {/* Camera icon with modern styling */}
            <label className="absolute -bottom-2 -right-2 bg-gradient-to-r from-brown-600 to-brown-700 hover:from-brown-700 hover:to-brown-800 text-white p-3 rounded-full cursor-pointer transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-110 group">
              <Camera className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>

          {/* Floating decorative elements */}
          <div className="absolute -top-4 -left-4 text-white/20">
            <Sparkles className="w-8 h-8 animate-pulse" />
          </div>
          <div className="absolute -bottom-4 -right-12 text-white/20">
            <Code className="w-6 h-6 animate-bounce" />
          </div>
          <div className="absolute top-8 -right-8 text-white/20">
            <Coffee className="w-5 h-5 animate-pulse delay-1000" />
          </div>
        </div>

        {/* Simple Modern Content without box */}
        {isEditing ? (
          <div className="space-y-8 relative z-10">
            {/* Modern input styling */}
            <div className="relative">
              <input
                type="text"
                value={editData.name}
                onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                className="w-full text-4xl md:text-6xl font-bold text-center bg-transparent border-0 border-b-2 border-white/30 px-0 py-4 text-white placeholder-white/70 focus:outline-none focus:border-white/60 transition-all duration-300"
                placeholder="Your Name"
              />
            </div>
            
            <div className="relative">
              <textarea
                value={editData.bio}
                onChange={(e) => setEditData({ ...editData, bio: e.target.value })}
                className="w-full text-xl md:text-2xl text-center bg-transparent border-0 border-b-2 border-white/30 p-4 text-white placeholder-white/70 focus:outline-none focus:border-white/60 resize-none transition-all duration-300"
                placeholder="Write your bio here..."
                rows={3}
              />
            </div>
            
            <div className="flex gap-4 justify-center mt-8">
              <button
                onClick={handleSave}
                className="px-8 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-full transition-all duration-300 shadow-lg hover:shadow-xl font-medium"
              >
                Save Changes
              </button>
              <button
                onClick={handleCancel}
                className="px-8 py-3 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white rounded-full transition-all duration-300 shadow-lg hover:shadow-xl font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="relative z-10">
            {/* Modern name display without box */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="relative">
                <h1 className="text-5xl md:text-7xl font-bold text-white drop-shadow-2xl tracking-tight">
                  {profileData.name}
                </h1>
                {/* Elegant underline */}
                <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-white/80 to-transparent"></div>
              </div>
              
              <button
                onClick={() => setIsEditing(true)}
                className="text-white/60 hover:text-white p-3 transition-all duration-300 hover:bg-white/10 rounded-full hover:scale-110 group ml-4"
              >
                <Edit className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
              </button>
            </div>
            
            {/* Modern bio display without box */}
            <div className="relative mb-12">
              <p className="text-xl md:text-2xl text-white/95 leading-relaxed max-w-4xl mx-auto font-light tracking-wide">
                {profileData.bio}
              </p>
            </div>
            
            {/* Modern status indicator */}
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-white/90">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
              <span className="text-sm font-medium tracking-wide">Available for new opportunities</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
});

HeroSection.displayName = 'HeroSection';

export default HeroSection;
