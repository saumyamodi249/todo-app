import React, { useState } from 'react';

interface TaskTitleCountProps {
  initialCount?: number;
}

const TaskTitleCount: React.FC<TaskTitleCountProps> = ({ initialCount = 0 }) => {
  const [count, setCount] = useState<number>(initialCount);

  return (
    <div className="flex items-end gap-1.5">
      <div className="text-2xl font-semibold tracking-wide text-black">TASKS</div>
      <div className="text-xs font-mono text-zinc-400">[{count}]</div>
    </div>
  );
};

export default TaskTitleCount;