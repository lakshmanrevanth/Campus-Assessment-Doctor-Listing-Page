import { Doctor } from '../types';

// Fetch doctors data from the API
export const fetchDoctors = async (): Promise<Doctor[]> => {
  try {
    const response = await fetch(import.meta.env.VITE_API_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch doctors data');
    }
    const data = await response.json();
    
    // Ensure we're getting an array of doctors
    if (!Array.isArray(data)) {
      console.error('API response is not an array:', data);
      return [];
    }
    
    // Transform API data to match our Doctor interface
    return data.map(doctor => ({
      id: doctor.id || '',
      name: doctor.name || '',
      specialty: doctor.specialities ? doctor.specialities.map((s: { name: string }) => s.name) : [],
      experience: parseInt(doctor.experience?.split(' ')?.[0] || '0', 10),
      fees: parseInt(doctor.fees?.replace('₹', '').trim() || '0', 10),
      clinicName: doctor.clinic?.name || '',
      location: doctor.clinic?.address?.locality || '',
      qualification: '', // Not available in API
      consultationType: [
        ...(doctor.video_consult ? ['Video Consult'] : []),
        ...(doctor.in_clinic ? ['In Clinic'] : [])
      ]
    }));
  } catch (error) {
    console.error('Error fetching doctors:', error);
    return [];
  }
};

// Extract all unique specialties from the doctors data
export const extractSpecialties = (doctors: Doctor[]): string[] => {
  const specialtiesSet = new Set<string>();
  
  doctors.forEach(doctor => {
    if (Array.isArray(doctor.specialty)) {
      doctor.specialty.forEach(specialty => {
        if (specialty) {
          specialtiesSet.add(specialty);
        }
      });
    }
  });
  
  return Array.from(specialtiesSet).sort();
};