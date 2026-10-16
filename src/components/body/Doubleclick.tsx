import React, { useEffect, useRef, useState } from "react";
import { RxCheck, RxCross2, RxPencil1 } from "react-icons/rx";

interface DoubleclickProps {
  content: string;
  completed: boolean;
  onSave: (newContent: string) => void;
}

const Doubleclick: React.FC<DoubleclickProps> = ({
  content,
  completed,
  onSave,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(content);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setValue(content);
  }, [content]);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isEditing]);

  const handleSave = () => {
    const trimmed = value.trim();
    if (trimmed && trimmed !== content) {
      onSave(trimmed);
    } else {
      setValue(content);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setValue(content);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };

  if (isEditing) {
    return (
      <div className="flex-1 min-w-0 flex items-center gap-1.5">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 min-w-0 bg-white border border-zinc-300 rounded px-2.5 py-1 text-sm text-[#0a0a0a] outline-none focus:border-black focus:ring-1 focus:ring-black shadow-xs transition-all"
        />
        <button
          type="button"
          onClick={handleSave}
          title="Save (Enter)"
          className="w-6 h-6 flex items-center justify-center rounded text-zinc-600 hover:text-black hover:bg-zinc-200 transition-colors cursor-pointer shrink-0"
        >
          <RxCheck className="text-base font-bold" />
        </button>
        <button
          type="button"
          onClick={handleCancel}
          title="Cancel (Esc)"
          className="w-6 h-6 flex items-center justify-center rounded text-zinc-400 hover:text-red-600 hover:bg-zinc-200 transition-colors cursor-pointer shrink-0"
        >
          <RxCross2 className="text-sm" />
        </button>
      </div>
    );
  }

  return (
    <div
      onDoubleClick={() => setIsEditing(true)}
      title="Double-click to edit"
      className="flex-1 min-w-0 flex items-center justify-between gap-2 group/text cursor-pointer select-none"
    >
      <span
        className={`truncate text-sm transition-colors ${
          completed ? "line-through text-zinc-300" : "text-[#0a0a0a]"
        }`}
      >
        {content}
      </span>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setIsEditing(true);
        }}
        title="Edit task"
        className="opacity-0 group-hover/text:opacity-100 hover:text-black text-zinc-400 p-1 rounded transition-opacity"
      >
        <RxPencil1 className="text-xs" />
      </button>
    </div>
  );
};

export default Doubleclick;
