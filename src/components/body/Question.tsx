import React, { useState } from 'react';
import { BiPlus } from 'react-icons/bi';
import { IoIosArrowRoundBack } from 'react-icons/io';

interface QuestionProps {
  onAddTask: (text: string) => void;
}

const Question: React.FC<QuestionProps> = ({ onAddTask }) => {
  const [taskText, setTaskText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskText.trim()) return;
    onAddTask(taskText.trim());
    setTaskText('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center justify-between w-full bg-white px-4 py-3.5 rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.05)] border border-zinc-100/80 transition-colors"
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <BiPlus className="text-zinc-400 text-lg flex-shrink-0" />
        <input
          type="text"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          placeholder="What needs to be done?"
          className="w-full bg-transparent text-sm text-[#0a0a0a] font-normal placeholder-zinc-400 outline-none"
        />
      </div>

      <button
        type="submit"
        className="flex items-center gap-0.5 px-2 py-1 bg-zinc-100 text-[11px] font-mono text-zinc-500 rounded-md select-none border border-zinc-200/60 hover:text-zinc-700 hover:bg-zinc-200/80 transition cursor-pointer"
      >
        <IoIosArrowRoundBack className="text-sm" />
        <span>Enter</span>
      </button>
    </form>
  );
};

export default Question;