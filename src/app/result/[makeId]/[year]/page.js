'use client';

import { Suspense, lazy, useEffect, useState } from 'react';
import NoResultsMessage from '../../../components/NoResult';
import { useParams } from 'next/navigation';

const CarCard = lazy(() => import('../../../components/CarCard'));

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
            `${process.env.NEXT_PUBLIC_API_URL}/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`,
          );
          const data = await response.json();
          setModels(data.Results || []);
        } catch (err) {
          setError('Failed to fetch models.');
        } finally {
          setLoading(false);
        }
      }
      fetchModels();
    }
  }, [makeId, year]);

  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Available Models for {year}</h1>
      {loading ? (
        <div className="flex items-center justify-center space-x-2 mt-4">
          <svg
            className="animate-spin h-5 w-5 text-indigo-500"
            viewBox="0 0 24 24"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
          </svg>
          <span className="text-indigo-500">Loading models...</span>
        </div>
      ) : models.length > 0 ? (
        <Suspense fallback={<div>Loading models...</div>}>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {models.map((model, index) => (
              <CarCard
                key={`${model.Model_ID}-${index}`}
                modelName={model.Model_Name}
              />
            ))}
          </div>
        </Suspense>
      ) : (
        <NoResultsMessage message="No models available for the selected criteria." />
      )}
    </div>
  );
}
