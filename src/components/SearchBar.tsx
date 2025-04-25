import React, { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { Doctor } from '../types';

interface SearchBarProps {
  doctors: Doctor[];
  onSearch: (value: string) => void;
  searchValue: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ doctors, onSearch, searchValue }) => {
  const [inputValue, setInputValue] = useState(searchValue);
  const [suggestions, setSuggestions] = useState<Doctor[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setInputValue(searchValue);
  }, [searchValue]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current && 
        !suggestionsRef.current.contains(event.target as Node) && 
        inputRef.current && 
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    
    if (value.trim() === '') {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    
    // Filter doctors by name and limit to top 3 matches
    const filtered = doctors
      .filter(doctor => doctor.name.toLowerCase().includes(value.toLowerCase()))
      .slice(0, 3);
    
    setSuggestions(filtered);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (name: string) => {
    setInputValue(name);
    onSearch(name);
    setShowSuggestions(false);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch(inputValue);
      setShowSuggestions(false);
    }
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          data-testid="autocomplete-input"
          className="w-full p-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          placeholder="Search doctors by name..."
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          onFocus={() => inputValue.trim() !== '' && setSuggestions(doctors.filter(doctor => 
            doctor.name.toLowerCase().includes(inputValue.toLowerCase())).slice(0, 3)) && setShowSuggestions(true)}
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="h-6 w-6 text-gray-400" />
        </div>
      </div>
      
      {showSuggestions && suggestions.length > 0 && (
        <div 
          ref={suggestionsRef}
          className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-lg border border-gray-200 overflow-hidden"
        >
          {suggestions.map((doctor) => (
            <div
              key={doctor.id}
              data-testid="suggestion-item"
              className="px-4 py-3 cursor-pointer hover:bg-gray-100 border-b border-gray-100 last:border-0"
              onClick={() => handleSuggestionClick(doctor.name)}
            >
              {doctor.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;