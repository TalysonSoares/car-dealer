'use client';

import React, { useState, useEffect } from 'react';
import MakeSelector from './MakeSelector';
import YearSelector from './YearSelector';
import NextButton from './NextButton';

const MainContent = () => {
  const [makes, setMakes] = useState([]);
  const [selectedMake, setSelectedMake] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  useEffect(() => {
    async function fetchMakes() {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/GetMakesForVehicleType/car?format=json`,
      );
      const data = await response.json();
      setMakes(data.Results || []);
    }
    fetchMakes();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-4 w-full flex-grow">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
        Find Your Perfect Car
      </h1>
      <p className="text-center text-gray-600 mb-6">
        Select the make and year of the car you're looking for. Start browsing
        the available models now!
      </p>
      <div className="flex flex-col md:flex-row w-full justify-between gap-4 mb-6">
        <div className="w-full md:w-1/2">
          <MakeSelector
            makes={makes}
            selectedMake={selectedMake}
            setSelectedMake={setSelectedMake}
          />
        </div>
        <div className="w-full md:w-1/2">
          <YearSelector
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
          />
        </div>
      </div>
      <NextButton selectedMake={selectedMake} selectedYear={selectedYear} />
    </div>
  );
};

export default MainContent;
