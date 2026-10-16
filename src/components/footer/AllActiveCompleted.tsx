import React from 'react';

export type FilterType = 'All' | 'Active' | 'Completed';

interface AllActiveCompletedProps {
  currentFilter?: FilterType;
  onFilterChange?: (filter: FilterType) => void;
}

const AllActiveCompleted: React.FC<AllActiveCompletedProps> = ({
  currentFilter = 'All',
  onFilterChange,
}) => {
  const filters: FilterType[] = ['All', 'Active', 'Completed'];

  return (
    <div className="flex items-center bg-gray-100 p-1 rounded-lg gap-1 font-mono text-xs">
      {filters.map((filter) => {
        const isActive = currentFilter === filter;
        return (
          <button
            key={filter}
            type="button"
            onClick={() => onFilterChange && onFilterChange(filter)}
            className={`px-3 py-1 rounded transition-colors font-medium cursor-pointer ${
              isActive
                ? 'bg-black text-white'
                : 'bg-transparent text-gray-600 hover:text-black'
            }`}
          >
            {filter}
          </button>
        );
      })}
    </div>
  );
};

export default AllActiveCompleted;