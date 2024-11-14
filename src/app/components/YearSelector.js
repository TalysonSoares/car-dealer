export default function YearSelector({ selectedYear, setSelectedYear }) {
    return (
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
    );
  }
  