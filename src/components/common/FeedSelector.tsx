interface FeedSelectorProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const FeedSelector = ({ activeTab, setActiveTab }: FeedSelectorProps) => {
  return (
    <div className="m-4" data-testid="feed-selector">
      <div className="flex bg-emerald-50 backdrop-blur-sm rounded-full p-1 shadow-lg shadow-slate-400">
        <button
          onClick={() => setActiveTab('users')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-full font-semibold transition-all duration-300 ${
            activeTab === 'users'
              ? 'bg-green-700 text-white shadow-lg shadow-slate-100'
              : 'text-green-700 hover:text-green-900 hover:bg-white/5'
          }`}
        >
          Users
        </button>
        <button
          onClick={() => setActiveTab('events')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-full font-semibold transition-all duration-300 ${
            activeTab === 'events'
              ? 'bg-green-700 text-white shadow-lg shadow-slate-100'
              : 'text-green-700 hover:text-green-900 hover:bg-white/5'
          }`}
        >
          Events
        </button>
      </div>
    </div>
  );
};
export default FeedSelector;
