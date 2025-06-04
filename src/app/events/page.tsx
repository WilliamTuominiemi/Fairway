import Navbar from '@/components/Navbar';
import Occurrences from '@/components/events/Occurrences';

export default function Events() {
  return (
    <div className="flex flex-col items-center justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]">
      <Navbar />
      <main className="flex flex-col items-center sm:items-start p-5">
        <Occurrences />
      </main>
    </div>
  );
}
