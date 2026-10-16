
import React, { createContext, useMemo } from "react";
import { Checkbox } from "antd";
import { RxCross2 } from "react-icons/rx";
import type { DragEndEvent, DraggableAttributes } from "@dnd-kit/core";
import { DndContext } from "@dnd-kit/core";
import type { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
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

interface ListProps {
  tasks: TaskItem[];
  setTasks: React.Dispatch<React.SetStateAction<TaskItem[]>>;
}

interface SortableItemContextProps {
  setActivatorNodeRef?: (element: HTMLElement | null) => void;
  listeners?: SyntheticListenerMap;
  attributes?: DraggableAttributes;
}

const SortableItemContext = createContext<SortableItemContextProps>({});

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

  const memoizedContext = useMemo(
    () => ({ setActivatorNodeRef, listeners, attributes }),
    [setActivatorNodeRef, listeners, attributes],
  );

  return (
    <SortableItemContext.Provider value={memoizedContext}>
      <div
        ref={setNodeRef}
        style={style}
        className="group flex items-center justify-between w-full bg-white hover:bg-[#f4f4f5] px-4 py-3 rounded-xl transition-all select-none border border-transparent shadow-[0_1px_2px_rgba(0,0,0,0.03)]"
      >
        <div className="flex items-center gap-3.5 flex-1 min-w-0">
          <Checkbox
            checked={item.completed}
            onChange={() => onToggle(item.key)}
            className="task-checkbox shrink-0"
          />

          <span
            className={`text-sm truncate transition-colors ${
              item.completed
                ? "line-through text-zinc-300"
                : "text-[#0a0a0a]"
            }`}
          >
            {item.content}
          </span>
        </div>

        <div
          ref={setActivatorNodeRef}
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing flex-1 self-stretch min-w-0"
          style={{ touchAction: "none" }}
        />

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(item.key);
          }}
          className="opacity-0 group-hover:opacity-100 w-7 h-7 flex items-center justify-center rounded-md text-zinc-500 hover:bg-[#e4e4e7] hover:text-red-600 transition-all cursor-pointer shrink-0"
          aria-label={`Delete ${item.content}`}
        >
          <RxCross2 className="text-base" />
        </button>
      </div>
    </SortableItemContext.Provider>
  );
};

const List: React.FC<ListProps> = ({ tasks, setTasks }) => {
  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id) return;

    setTasks((prev) => {
      const oldIndex = prev.findIndex((i) => i.key === active.id);
      const newIndex = prev.findIndex((i) => i.key === over.id);

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
      {tasks.length === 0 ? (
        <div className="flex h-full items-center justify-center">
  <p className="w-full text-center text-xs font-mono text-zinc-400">
    No tasks yet. Type above and press Enter.
  </p>
</div>
      ) : (
        <DndContext
          modifiers={[restrictToVerticalAxis]} 
          onDragEnd={onDragEnd}
        >
          <SortableContext
            items={tasks.map((item) => item.key)}
            strategy={verticalListSortingStrategy}
          >
            <div className="flex flex-col gap-2 w-full">
              {tasks.map((item) => (
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
