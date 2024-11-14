import Link from 'next/link';

export default function NextButton({ selectedMake, selectedYear }) {
  const isButtonEnabled = selectedMake && selectedYear;

  return (
    <Link href={isButtonEnabled ? `/result/${selectedMake}/${selectedYear}` : '#'}>
      <button
        className={`px-4 py-2 rounded text-white ${
          isButtonEnabled ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400 cursor-not-allowed'
        }`}
        disabled={!isButtonEnabled}
      >
        Next
      </button>
    </Link>
  );
}
