export default function CarCard({ modelName }) {
  return (
    <div className="p-4 border rounded-lg shadow bg-white">
      <h2 className="text-lg font-semibold">{modelName}</h2>
      <p className="text-gray-600">Details about this model</p>

      <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        View More
      </button>
    </div>
  );
}
