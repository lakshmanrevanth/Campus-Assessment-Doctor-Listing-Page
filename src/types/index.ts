export interface Doctor {
  id: string;
  name: string;
  specialty: string[];
  experience: number;
  fees: number;
  clinicName: string;
  location: string;
  qualification: string;
  consultationType: string[];
}

export interface FilterState {
  search: string;
  consultationType: string;
  specialties: string[];
  sortBy: string;
}