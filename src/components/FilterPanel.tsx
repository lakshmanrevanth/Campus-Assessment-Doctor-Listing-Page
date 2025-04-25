import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { FilterState } from '../types';

interface FilterPanelProps {
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
  allSpecialties: string[];
}

const FilterPanel: React.FC<FilterPanelProps> = ({ filters, setFilters, allSpecialties }) => {
  const [specialtiesOpen, setSpecialtiesOpen] = React.useState(true);
  const [consultationOpen, setConsultationOpen] = React.useState(true);
  const [sortOpen, setSortOpen] = React.useState(true);

  const handleConsultationTypeChange = (type: string) => {
    setFilters({
      ...filters,
      consultationType: filters.consultationType === type ? '' : type
    });
  };

  const handleSpecialtyChange = (specialty: string) => {
    const newSpecialties = filters.specialties.includes(specialty)
      ? filters.specialties.filter(s => s !== specialty)
      : [...filters.specialties, specialty];
    
    setFilters({
      ...filters,
      specialties: newSpecialties
    });
  };

  const handleSortChange = (sortBy: string) => {
    setFilters({
      ...filters,
      sortBy: sortBy
    });
  };

  const clearAllFilters = () => {
    setFilters({
      search: '',
      consultationType: '',
      specialties: [],
      sortBy: '',
    });
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium">Filters</h2>
        {(filters.consultationType || filters.specialties.length > 0 || filters.sortBy) && (
          <button
            className="text-blue-600 text-sm font-medium hover:text-blue-800"
            onClick={clearAllFilters}
          >
            Clear All
          </button>
        )}
      </div>

      {/* Sort By Filter */}
      <div className="border-t pt-4">
        <div 
          className="flex justify-between items-center cursor-pointer" 
          onClick={() => setSortOpen(!sortOpen)}
        >
          <h3 data-testid="filter-header-sort" className="font-medium">Sort By</h3>
          {sortOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
        
        {sortOpen && (
          <div className="mt-2 space-y-2">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                data-testid="sort-fees"
                checked={filters.sortBy === 'fees'}
                onChange={() => handleSortChange('fees')}
                className="h-4 w-4 text-blue-600"
              />
              <span>Price: Low-High</span>
            </label>
            
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                data-testid="sort-experience"
                checked={filters.sortBy === 'experience'}
                onChange={() => handleSortChange('experience')}
                className="h-4 w-4 text-blue-600"
              />
              <span>Experience: Most Experience first</span>
            </label>
          </div>
        )}
      </div>
      
      {/* Consultation Mode Filter */}
      <div className="border-t pt-4">
        <div 
          className="flex justify-between items-center cursor-pointer" 
          onClick={() => setConsultationOpen(!consultationOpen)}
        >
          <h3 data-testid="filter-header-moc" className="font-medium">Mode of Consultation</h3>
          {consultationOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
        
        {consultationOpen && (
          <div className="mt-2 space-y-2">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                data-testid="filter-video-consult"
                checked={filters.consultationType === 'Video Consult'}
                onChange={() => handleConsultationTypeChange('Video Consult')}
                className="h-4 w-4 text-blue-600"
              />
              <span>Video Consult</span>
            </label>
            
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                data-testid="filter-in-clinic"
                checked={filters.consultationType === 'In Clinic'}
                onChange={() => handleConsultationTypeChange('In Clinic')}
                className="h-4 w-4 text-blue-600"
              />
              <span>In Clinic</span>
            </label>
          </div>
        )}
      </div>
      
      {/* Specialties Filter */}
      <div className="border-t pt-4">
        <div 
          className="flex justify-between items-center cursor-pointer" 
          onClick={() => setSpecialtiesOpen(!specialtiesOpen)}
        >
          <h3 data-testid="filter-header-speciality" className="font-medium">Speciality</h3>
          {specialtiesOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
        
        {specialtiesOpen && (
          <div className="mt-2 max-h-64 overflow-y-auto space-y-2">
            {allSpecialties.map(specialty => (
              <label key={specialty} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  data-testid={`filter-specialty-${specialty.replace(/\//g, '-')}`}
                  checked={filters.specialties.includes(specialty)}
                  onChange={() => handleSpecialtyChange(specialty)}
                  className="h-4 w-4 text-blue-600 rounded"
                />
                <span>{specialty}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterPanel;