import { useEffect, useState } from 'react';
import { FilterState } from '../types';

// Custom hook to handle URL query parameters
export const useQueryParams = () => {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    consultationType: '',
    specialties: [],
    sortBy: '',
  });

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (filters.search) params.set('search', filters.search);
    if (filters.consultationType) params.set('type', filters.consultationType);
    if (filters.specialties.length > 0) params.set('specialties', filters.specialties.join(','));
    if (filters.sortBy) params.set('sort', filters.sortBy);
    
    const newUrl = `${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}`;
    window.history.pushState({ path: newUrl }, '', newUrl);
  }, [filters]);

  // Read URL parameters on page load
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    
    const search = params.get('search') || '';
    const consultationType = params.get('type') || '';
    const specialties = params.get('specialties') ? params.get('specialties')!.split(',') : [];
    const sortBy = params.get('sort') || '';
    
    setFilters({
      search,
      consultationType,
      specialties,
      sortBy,
    });
    
    // Handle browser navigation (back/forward)
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      
      setFilters({
        search: params.get('search') || '',
        consultationType: params.get('type') || '',
        specialties: params.get('specialties') ? params.get('specialties')!.split(',') : [],
        sortBy: params.get('sort') || '',
      });
    };
    
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return { filters, setFilters };
};