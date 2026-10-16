import React, { useState } from 'react';
import Question from '../components/body/Question';
import List from '../components/body/List';

// Yahan interface define karne se import/export collision ka koi issue nahi aayega
export interface TaskItem {
  key: number;
  content: string;
  completed: boolean;
}

const MergedBody: React.FC = () => {
  const [tasks, setTasks] = useState<TaskItem[]>([]);

  const handleAddTask = (content: string) => {
    const newTask: TaskItem = {
      key: Date.now(),
      content,
      completed: false,
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  return (
    <div className="w-full p-4 flex flex-col gap-5 bg-zinc-50/70 overflow-hidden">
      <Question onAddTask={handleAddTask} />
      <List tasks={tasks} setTasks={setTasks} />
    </div>
  );
};

export default MergedBody;