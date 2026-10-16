import React from "react";
import type { FilterType } from "../body/List";

interface Props {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

const AllActiveCompleted: React.FC<Props> = ({
  currentFilter,
  onFilterChange,
}) => {
  const filters: FilterType[] = ["All", "Active", "Completed"];

  return (
    <div className="flex items-center bg-gray-100 p-1 rounded-lg gap-1 font-mono text-xs">
      {filters.map((filter) => (
        <button
          key={filter}
          type="button"
          onClick={() => onFilterChange(filter)}
          className={`px-3 py-1 rounded transition-colors font-medium cursor-pointer ${
            currentFilter === filter
              ? "bg-black text-white"
              : "bg-transparent text-gray-600 hover:text-black"
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};

export default AllActiveCompleted;
