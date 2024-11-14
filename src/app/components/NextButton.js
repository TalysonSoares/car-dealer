import { useRouter } from 'next/navigation';

export default function NextButton({ selectedMake, selectedYear }) {
  const router = useRouter();

  const handleClick = () => {
    if (selectedMake && selectedYear) {
      router.push(`/result/${selectedMake}/${selectedYear}`);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={!selectedMake || !selectedYear}
      className="p-2 mt-4 bg-blue-500 text-white rounded disabled:bg-gray-300"
    >
      Next
    </button>
  );
}
