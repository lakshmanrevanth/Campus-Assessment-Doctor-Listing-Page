import  { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import FilterPanel from './components/FilterPanel';
import DoctorList from './components/DoctorList';
import { fetchDoctors, extractSpecialties } from './utils/api';
import { Doctor } from './types';
import { useQueryParams } from './hooks/useQueryParams';

function App() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [specialties, setSpecialties] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { filters, setFilters } = useQueryParams();

  useEffect(() => {
    const loadDoctors = async () => {
      setLoading(true);
      try {
        const data = await fetchDoctors();
        if (Array.isArray(data)) {
          setDoctors(data);
          setSpecialties(extractSpecialties(data));
        } else {
          console.error('Invalid data format received from API');
          setDoctors([]);
          setSpecialties([]);
        }
      } catch (error) {
        console.error('Error loading doctors:', error);
        setDoctors([]);
        setSpecialties([]);
      } finally {
        setLoading(false);
      }
    };

    loadDoctors();
  }, []);

  const handleSearch = (searchValue: string) => {
    setFilters({
      ...filters,
      search: searchValue
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-700 py-4 px-4 shadow-md">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center text-white">
              {/* Removed the Stethoscope symbol */}
            </div>
          </div>
          <SearchBar 
            doctors={doctors}
            onSearch={handleSearch}
            searchValue={filters.search}
          />
        </div>
      </header>
      
      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
            <p className="mt-2 text-gray-600">Loading doctors...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Filter Panel */}
            <div className="md:col-span-1">
              <FilterPanel 
                filters={filters} 
                setFilters={setFilters} 
                allSpecialties={specialties}
              />
            </div>
            
            {/* Doctor List */}
            <div className="md:col-span-3">
              <DoctorList doctors={doctors} filters={filters} />
            </div>
          </div>
        )}
      </main>
      
      {/* Footer */}
      <footer className="bg-blue-800 text-white py-4 mt-8">
        <div className="container mx-auto px-4 text-center">
          <p>© 2025 DoctorListing - Find the best doctors near you</p>
        </div>
      </footer>
    </div>
  );
}

export default App;