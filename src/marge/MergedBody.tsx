
import React, { useEffect, useState } from "react";
import Question from "../components/body/Question";
import List from "../components/body/List";
import type { TaskItem, FilterType } from "../components/body/List";
import MergedFooter from "./MergedFooter";


interface MergedBodyProps {
  onTaskCountChange: (count: number) => void;
}

const MergedBody: React.FC<MergedBodyProps> = ({
  onTaskCountChange,
}) => {
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [activeFilter, setActiveFilter] =
    useState<FilterType>("All");

  useEffect(() => {
    onTaskCountChange(tasks.length);
  }, [tasks.length, onTaskCountChange]);

  const handleAddTask = (content: string) => {
    const trimmed = content.trim();
    if (!trimmed) return;

    setTasks((prev) => [
      {
        key: Date.now(),
        content: trimmed,
        completed: false,
      },
      ...prev,
    ]);
  };

  const handleClearCompleted = () => {
    setTasks((prev) => prev.filter((task) => !task.completed));
  };

  const remainingCount = tasks.filter(
    (task) => !task.completed,
  ).length;

  return (
    <div className="w-full">
      <div className="px-4 pt-4 bg-zinc-50/70">
        <Question onAddTask={handleAddTask} />
      </div>

      <List
        tasks={tasks}
        setTasks={setTasks}
        activeFilter={activeFilter}
      />

      <MergedFooter
        remainingCount={remainingCount}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        onClearCompleted={handleClearCompleted}
      />
    </div>
  );
};

export default MergedBody;