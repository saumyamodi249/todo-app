import React from "react";
import Header from "../components/header/Header";

interface MergedHeaderProps {
  totalCount: number;
}

const MergedHeader: React.FC<MergedHeaderProps> = ({ totalCount }) => {
  return (
    <div className="w-full">
      <Header taskCount={totalCount} />
    </div>
  );
};

export default MergedHeader;
