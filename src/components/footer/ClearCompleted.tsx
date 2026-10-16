import React from 'react';

interface ClearCompletedProps {
  onClear?: () => void;
}

const ClearCompleted: React.FC<ClearCompletedProps> = ({ onClear }) => {
  return (
    <button
      onClick={onClear}
      className="font-mono text-xs text-zinc-500 hover:text-black transition-colors cursor-pointer"
    >
      Clear completed
    </button>
  );
};

export default ClearCompleted;