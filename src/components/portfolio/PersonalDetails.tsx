import React, { forwardRef } from 'react';
import { School, GraduationCap } from 'lucide-react';

const PersonalDetails = forwardRef<HTMLElement>((props, ref) => {
  return (
    <section ref={ref} className="portfolio-section">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="section-title mb-6">Personal Details</h2>

        <div className="space-y-6">
          <div className="portfolio-card">
            <div className="flex items-center space-x-4 mb-3">
              <GraduationCap className="w-6 h-6 text-brown-600" />
              <div>
                <h4 className="font-semibold text-brown-800">Degree</h4>
                <p className="text-brown-600">B.Tech - CSM (Artificial Intelligence and Machine Learning)</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 mb-3">
              <School className="w-6 h-6 text-brown-600" />
              <div>
                <h4 className="font-semibold text-brown-800">College</h4>
                <p className="text-brown-600">VVIT University</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 mb-3">
              <School className="w-6 h-6 text-brown-600" />
              <div>
                <h4 className="font-semibold text-brown-800">Batch</h4>
                <p className="text-brown-600">2023 – 2027</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <School className="w-6 h-6 text-brown-600" />
              <div>
                <h4 className="font-semibold text-brown-800">School</h4>
                <p className="text-brown-600">Kennedy School, Passed out: 2021</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

PersonalDetails.displayName = 'PersonalDetails';

export default PersonalDetails;
