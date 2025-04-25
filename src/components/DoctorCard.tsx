import React from 'react';
import { MapPin, Building, Award } from 'lucide-react';
import { Doctor } from '../types';

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  return (
    <div data-testid="doctor-card" className="bg-white rounded-lg shadow-md p-6 mb-4 transition-all hover:shadow-lg">
      <div className="flex flex-col md:flex-row md:items-start gap-4">
        <div className="flex-shrink-0">
          <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
            <img 
              src={`https://picsum.photos/seed/${doctor.id}/200`} 
              alt={doctor.name} 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="flex-grow">
          <h2 data-testid="doctor-name" className="text-xl font-semibold text-gray-800">{doctor.name}</h2>
          
          <div data-testid="doctor-specialty" className="mt-1 text-gray-600">
            {Array.isArray(doctor.specialty) ? doctor.specialty.join(', ') : ''}
          </div>
          
          <div className="mt-2 text-sm text-gray-500">{doctor.qualification}</div>
          
          <div data-testid="doctor-experience" className="mt-2 flex items-center text-gray-700">
            <Award className="inline mr-1 h-4 w-4" />
            <span>{doctor.experience} yrs exp.</span>
          </div>
          
          <div className="mt-3 flex flex-wrap gap-2">
            {Array.isArray(doctor.consultationType) && doctor.consultationType.map((type, index) => (
              <span 
                key={index} 
                className={`text-xs px-2 py-1 rounded ${
                  type === 'Video Consult' 
                    ? 'bg-blue-100 text-blue-800' 
                    : 'bg-green-100 text-green-800'
                }`}
              >
                {type}
              </span>
            ))}
          </div>
          
          <div className="mt-3 flex items-center text-gray-600">
            <Building className="inline mr-1 h-4 w-4" />
            <span>{doctor.clinicName}</span>
          </div>
          
          <div className="mt-1 flex items-center text-gray-600">
            <MapPin className="inline mr-1 h-4 w-4" />
            <span>{doctor.location}</span>
          </div>
        </div>

        <div className="flex flex-col items-end mt-4 md:mt-0">
          <div data-testid="doctor-fee" className="text-lg font-semibold">₹{doctor.fees}</div>
          <button className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors">
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;