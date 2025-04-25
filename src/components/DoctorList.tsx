import React from 'react';
import DoctorCard from './DoctorCard';
import { Doctor, FilterState } from '../types';

interface DoctorListProps {
  doctors: Doctor[];
  filters: FilterState;
}

const DoctorList: React.FC<DoctorListProps> = ({ doctors, filters }) => {
  // Apply all filters and sorting to the doctor list
  const filteredDoctors = doctors.filter(doctor => {
    // Filter by search query
    if (filters.search && !doctor.name.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    
    // Filter by consultation type
    if (filters.consultationType && !doctor.consultationType.includes(filters.consultationType)) {
      return false;
    }
    
    // Filter by specialties (if any are selected)
    if (filters.specialties.length > 0) {
      const hasSpecialty = filters.specialties.some(specialty => 
        doctor.specialty.includes(specialty)
      );
      if (!hasSpecialty) {
        return false;
      }
    }
    
    return true;
  });
  
  // Sort the filtered doctors
  const sortedDoctors = [...filteredDoctors].sort((a, b) => {
    if (filters.sortBy === 'fees') {
      return a.fees - b.fees;
    } else if (filters.sortBy === 'experience') {
      return b.experience - a.experience;
    }
    return 0;
  });

  return (
    <div className="space-y-4">
      {sortedDoctors.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <h3 className="text-lg font-medium text-gray-800">No doctors found</h3>
          <p className="text-gray-600 mt-2">Try adjusting your filters or search query</p>
        </div>
      ) : (
        sortedDoctors.map(doctor => (
          <DoctorCard key={doctor.id} doctor={doctor} />
        ))
      )}
    </div>
  );
};

export default DoctorList;