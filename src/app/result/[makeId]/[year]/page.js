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

  if (error)
    return <div className="text-center text-red-600 text-lg mt-4">{error}</div>;

  return (
    <div className="mmin-h-screen bg-gray-50 py-8 px-4">
      <h1 className="text-3xl font-semibold text-gray-800 text-center mb-6">
        Available Models for <span className="text-indigo-600">{year}</span>
      </h1>
      {loading ? (
        <div className="flex items-center justify-center space-x-2 mt-4">
          <svg
            className="animate-spin h-8 w-8 text-indigo-500"
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
          <span className="text-lg text-indigo-600">Loading models...</span>
        </div>
      ) : models.length > 0 ? (
        <Suspense
          fallback={
            <div className="text-center text-indigo-500">Loading models...</div>
          }
        >
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-8">
            {models.map((model, index) => (
              <CarCard
                key={`${model.Model_ID}-${index}`}
                modelName={model.Model_Name}
                className="transition transform hover:scale-105 hover:shadow-lg"
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
