"use client";

import CarCard from '../../../components/CarCard';
import NoResultsMessage from '../../../components/NoResult';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function ResultPage() {
  const { makeId, year } = useParams();

  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (makeId && year) {
      async function fetchModels() {
        try {
          setLoading(true);
          const response = await fetch(
            `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`
          );
          const data = await response.json();
          setModels(data.Results || []);
        } catch (err) {
          setError("Failed to fetch models.");
        } finally {
          setLoading(false);
        }
      }
      fetchModels();
    }
  }, [makeId, year]);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Available Models for {year}</h1>
      {models.length > 0 ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {models.map((model, index) => (
            <CarCard key={`${model.Model_ID}-${index}`} modelName={model.Model_Name} />
          ))}
        </div>
      ) : (
        <NoResultsMessage message="No models available for the selected criteria." />
      )}
    </div>
  );
}
