export default function MakeSelector({ makes, selectedMake, setSelectedMake }) {
    return (
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
    );
  }
  