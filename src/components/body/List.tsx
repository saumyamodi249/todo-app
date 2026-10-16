import React from "react";
import { Checkbox } from "antd";
import { RxCross2 } from "react-icons/rx";
import type { DragEndEvent } from "@dnd-kit/core";
import { DndContext } from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export interface TaskItem {
  key: number;
  content: string;
  completed: boolean;
}

export type FilterType = "All" | "Active" | "Completed";

interface ListProps {
  tasks: TaskItem[];
  setTasks: React.Dispatch<React.SetStateAction<TaskItem[]>>;
  activeFilter?: FilterType;
}

const SortableRow: React.FC<{
  item: TaskItem;
  onToggle: (key: number) => void;
  onDelete: (key: number) => void;
}> = ({ item, onToggle, onDelete }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.key });

  const style: React.CSSProperties = {
    transform: CSS.Translate.toString(transform),
    transition,
    zIndex: isDragging ? 999 : "auto",
    opacity: isDragging ? 0.6 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="group flex items-center gap-3 w-full bg-white hover:bg-[#f4f4f5] px-4 py-3 rounded-xl border border-transparent shadow-[0_1px_2px_rgba(0,0,0,0.03)]"
    >
      <Checkbox
        checked={item.completed}
        onChange={() => onToggle(item.key)}
        className="task-checkbox shrink-0"
      />

      <span
        {...attributes}
        {...listeners}
        ref={setActivatorNodeRef}
        style={{ touchAction: "none" }}
        className={`flex-1 min-w-0 cursor-grab active:cursor-grabbing text-sm truncate transition-colors ${
          item.completed
            ? "line-through text-zinc-300"
            : "text-[#0a0a0a]"
        }`}
      >
        {item.content}
      </span>

      <button
        type="button"
        onClick={() => onDelete(item.key)}
        aria-label={`Delete ${item.content}`}
        className="opacity-0 group-hover:opacity-100 w-7 h-7 flex items-center justify-center rounded-md text-zinc-500 hover:bg-[#e4e4e7] hover:text-red-600 transition-all cursor-pointer shrink-0"
      >
        <RxCross2 className="text-base" />
      </button>
    </div>
  );
};

const List: React.FC<ListProps> = ({
  tasks,
  setTasks,
  activeFilter = "All",
}) => {
  const visibleTasks = tasks.filter((task) => {
    if (activeFilter === "Active") return !task.completed;
    if (activeFilter === "Completed") return task.completed;
    return true;
  });

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id) return;

    setTasks((prev) => {
      const oldIndex = prev.findIndex((task) => task.key === active.id);
      const newIndex = prev.findIndex((task) => task.key === over.id);

      if (oldIndex === -1 || newIndex === -1) return prev;

      return arrayMove(prev, oldIndex, newIndex);
    });
  };

  const handleToggle = (key: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.key === key
          ? { ...task, completed: !task.completed }
          : task,
      ),
    );
  };

  const handleDelete = (key: number) => {
    setTasks((prev) => prev.filter((task) => task.key !== key));
  };

  return (
    <div className="w-full h-[420px] max-h-[calc(100svh-450px)] min-h-[180px] overflow-y-auto overflow-x-hidden pr-0.5 scrollbar-hide">
      {visibleTasks.length === 0 ? (
        <div className="flex h-full items-center justify-center">
          <p className="w-full text-center text-xs font-mono text-zinc-400">
            {tasks.length === 0
              ? "No tasks yet. Type above and press Enter."
              : activeFilter === "Active"
                ? "No active tasks."
                : activeFilter === "Completed"
                  ? "No completed tasks."
                  : "No tasks to show."}
          </p>
        </div>
      ) : (
        <DndContext
          modifiers={[restrictToVerticalAxis]}
          onDragEnd={onDragEnd}
        >
          <SortableContext
            items={visibleTasks.map((task) => task.key)}
            strategy={verticalListSortingStrategy}
          >
            <div className="flex flex-col gap-2 w-full">
              {visibleTasks.map((item) => (
                <SortableRow
                  key={item.key}
                  item={item}
                  onToggle={handleToggle}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
};

export default List;