'use client';

import { useState, useEffect } from 'react';
import MakeSelector from '../components/MakeSelector';
import YearSelector from '../components/YearSelector';
import NextButton from '../components/NextButton';

export default function VehicleFilterPage() {
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
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Car Dealer App</h1>
      <div className="flex flex-col space-y-4">
        <MakeSelector
          makes={makes}
          selectedMake={selectedMake}
          setSelectedMake={setSelectedMake}
        />

        <YearSelector
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
        />

        <NextButton selectedMake={selectedMake} selectedYear={selectedYear} />
      </div>
    </div>
  );
}
