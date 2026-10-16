import React from "react";
import Footer from "../components/footer/Footer";
import type { FilterType } from "../components/body/List";

interface MergedFooterProps {
  remainingCount: number;
  activeFilter: FilterType;
  setActiveFilter: (filter: FilterType) => void;
  onClearCompleted: () => void;
}

const MergedFooter: React.FC<MergedFooterProps> = ({
  remainingCount,
  activeFilter,
  setActiveFilter,
  onClearCompleted,
}) => {
  return (
    <div className="w-full">
      <Footer
        remainingCount={remainingCount}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        onClearCompleted={onClearCompleted}
      />
    </div>
  );
};

export default MergedFooter;