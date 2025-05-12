interface GolfclubProps {
  type: string | null;
  name: string | null;
}

export default function Golfclub({ type, name }: GolfclubProps) {
  return (
    <div className="flex flex-col w-42 gap-4 p-5 bg-emerald-50 border-1 border-slate-500 rounded-lg text-black">
      <h1>{type}</h1>
      <h1>{name}</h1>
    </div>
  );
}
