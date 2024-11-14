"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [makes, setMakes] = useState([]);

  const [selectedMake, setSelectedMake] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  useEffect(() => {
    async function fetchMakes() {
      const response = await fetch(
        'https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json'
      );
      const data = await response.json();
      console.log(data.Results)
      setMakes(data.Results || []);
    }
    fetchMakes();
  }, []);

  useEffect(() => {
    setIsButtonEnabled(selectedMake && selectedYear);
  }, [selectedMake, selectedYear]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Car Dealer App</h1>
      <div className="flex flex-col space-y-4">
        
        <div>
          <label htmlFor="make" className="block text-gray-700 mb-2">
            Vehicle Make
          </label>
          <select
            id="make"
            className="p-2 border rounded w-full"
            value={selectedMake}
            onChange={(e) => setSelectedMake(e.target.value)}
          >
            <option value="">Select a make</option>
            {makes.map((make) => (
              <option key={make.MakeId} value={make.MakeId}>
                {make.MakeName}
              </option>
            ))}
          </select>
        </div>

    
        <div>
          <label htmlFor="year" className="block text-gray-700 mb-2">
            Model Year
          </label>
          <select
            id="year"
            className="p-2 border rounded w-full"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option value="">Select a year</option>
            {Array.from({ length: new Date().getFullYear() - 2015 + 1 }, (_, i) => (
              <option key={i} value={2015 + i}>
                {2015 + i}
              </option>
            ))}
          </select>
        </div>

        
        <Link
          href={isButtonEnabled ? `/result/${selectedMake}/${selectedYear}` : '#'}
        >
          <button
            className={`px-4 py-2 rounded text-white ${
              isButtonEnabled ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400 cursor-not-allowed'
            }`}
            disabled={!isButtonEnabled}
          >
            Next
          </button>
        </Link>
      </div>
    </div>
  );
}
