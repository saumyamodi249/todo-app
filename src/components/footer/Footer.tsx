import React from "react";
import ItemNumber from "./ItemNumber";
import ItemLeft from "./ItemLeft";
import AllActiveCompleted from "./AllActiveCompleted";
import ClearCompleted from "./ClearCompleted";
import type { FilterType } from "../body/List";

interface FooterProps {
  remainingCount: number;
  activeFilter: FilterType;
  setActiveFilter: (filter: FilterType) => void;
  onClearCompleted: () => void;
}

const Footer: React.FC<FooterProps> = ({
  remainingCount,
  activeFilter,
  setActiveFilter,
  onClearCompleted,
}) => {
  return (
    <footer className="w-full bg-white px-6 py-4 flex items-center justify-between gap-3 rounded-b-2xl border-t border-zinc-100">
      <div className="flex items-center gap-1.5 shrink-0">
        <ItemNumber count={remainingCount} />
        <ItemLeft />
      </div>

      <AllActiveCompleted
        currentFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      <div className="flex justify-end shrink-0">
        <ClearCompleted onClear={onClearCompleted} />
      </div>
    </footer>
  );
};

export default Footer;
