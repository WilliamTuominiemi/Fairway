import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-items-center min-h-screen pb-20 gap-16 font-[family-name:var(--font-geist-sans)]">
      <Navbar />
      <main className="flex flex-col items-center sm:items-start">
          <h1 className="text-4xl">Fairway</h1>
          <p className="text-lg">Golf activity tracker</p>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        William Tuominiemi 2025
      </footer>
    </div>
  );
}
