import React from "react";

const Inline: React.FC = () => {
  return (
    <div className="w-full text-center mt-12 select-none">
      <p className="font-mono text-xs text-zinc-400 tracking-wide">
        Double-click any task to edit inline
      </p>
    </div>
  );
};

export default Inline;
