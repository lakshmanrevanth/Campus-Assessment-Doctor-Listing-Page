import React from "react";
import { MapPin, Building, Award } from "lucide-react";
import { Doctor } from "../types";

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  return (
    <div
      data-testid="doctor-card"
      className="bg-white/90 backdrop-blur-md border border-gray-200 rounded-2xl shadow-xl transition-all hover:shadow-2xl hover:scale-[1.01] duration-300 p-6 group"
    >
      <div className="flex flex-col md:flex-row gap-6">
        {/* Profile Image */}
        <div className="flex-shrink-0">
          <div className="relative w-24 h-24 rounded-full border-4 border-blue-500 overflow-hidden shadow-lg">
            <img
              src={`https://picsum.photos/seed/${doctor.id}/200`}
              alt={doctor.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Doctor Details */}
        <div className="flex-grow">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
              <h2
                data-testid="doctor-name"
                className="text-2xl font-bold text-gray-800 group-hover:text-blue-700 transition-colors"
              >
                {doctor.name}
              </h2>
              <p className="text-sm text-gray-500 mt-1 tracking-wide">
                {Array.isArray(doctor.specialty)
                  ? doctor.specialty.join(", ")
                  : ""}
              </p>
              {doctor.qualification && (
                <p className="text-sm text-gray-400 mt-1 italic">
                  {doctor.qualification}
                </p>
              )}
            </div>
            <div
              data-testid="doctor-fee"
              className="mt-3 sm:mt-0 text-lg font-semibold text-blue-600"
            >
              ₹{doctor.fees}
            </div>
          </div>

          {/* Experience */}
          <div className="mt-3 flex items-center gap-2 text-sm text-gray-700">
            <Award className="w-4 h-4 text-yellow-500" />
            <span>{doctor.experience} yrs experience</span>
          </div>

          {/* Consultation Type Badges */}
          <div className="mt-4 flex flex-wrap gap-3">
            {doctor.consultationType?.map((type, index) => (
              <span
                key={index}
                className={`px-3 py-1 text-xs font-medium rounded-full shadow-sm border ${
                  type === "Video Consult"
                    ? "bg-blue-50 text-blue-700 border-blue-200"
                    : "bg-green-50 text-green-700 border-green-200"
                }`}
              >
                {type}
              </span>
            ))}
          </div>

          {/* Clinic & Location */}
          <div className="mt-4 text-sm text-gray-600 space-y-1">
            <div className="flex items-center gap-2">
              <Building className="w-4 h-4 text-gray-400" />
              <span>{doctor.clinicName}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-400" />
              <span>{doctor.location}</span>
            </div>
          </div>
        </div>

        {/* Appointment Button */}
        <div className="flex md:flex-col items-end justify-between mt-4 md:mt-0 gap-2 md:gap-4">
          <button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold px-6 py-2 rounded-xl text-sm shadow-lg transition duration-200">
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
