import React, { useState } from 'react';
import ItemNumber from './ItemNumber';
import ItemLeft from './ItemLeft';
import AllActiveCompleted from './AllActiveCompleted';
import ClearCompleted from './ClearCompleted';

// Type yahan define kar diya, ab import error nahi aayega
export type FilterType = 'All' | 'Active' | 'Completed';

const Footer: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('All');

  return (
    <footer className="w-full bg-white px-6 py-4 flex items-center justify-between rounded-b-2xl border-t border-zinc-100">
      {/* Left side */}
      <div className="flex items-center gap-1.5 min-w-30">
        <ItemNumber count={0} />
        <ItemLeft />
      </div>

      {/* Center Filter Buttons */}
      <AllActiveCompleted
        currentFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      {/* Right side */}
      <div className="min-w-30 flex justify-end">
        <ClearCompleted />
      </div>
    </footer>
  );
};

export default Footer;