
import React, { useCallback, useState } from "react";
import MergedHeader from "./marge/MergedHeader";
import MergedBody from "./marge/MergedBody";
import Inline from "./components/bottom_inline/Inline";

const Todo: React.FC = () => {
  const [totalCount, setTotalCount] = useState(0);

  const handleTaskCountChange = useCallback(
    (count: number) => {
      setTotalCount(count);
    },
    [],
  );

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col items-center pt-14 px-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-zinc-100 overflow-hidden">
        <MergedHeader totalCount={totalCount} />

        <MergedBody
          onTaskCountChange={handleTaskCountChange}
        />
      </div>

      <Inline />
    </div>
  );
};

export default Todo;
