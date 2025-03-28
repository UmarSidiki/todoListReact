import React from "react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
}

interface DisplayTasksProps {
  tasks: Task[];
}

const DisplayTasks: React.FC<DisplayTasksProps> = ({ tasks }) => {
  return (
    <div className="order-2 md:order-1 text-center md:text-left space-y-4">
      <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white leading-tight">
        You Have to Do {tasks.length} Task/s
      </h1>
      <div
        className={cn(
          "flex flex-col gap-2 h-[400px] max-h-[50vh] overflow-y-auto p-1",
          "fade-edges no-scrollbar"
        )}
      >
        {tasks.map((t) => (
          <div
            key={t.id}
            className="relative group card flex flex-row justify-between items-center gap-4 bg-white/40 dark:bg-neutral-950/40 backdrop-blur-lg shadow-xl rounded-xl border border-neutral-200/50 dark:border-neutral-800/50 p-3"
          >
            {/* Task Details */}
            <div className="text-start">
              <h5 className="text-lg font-bold">{t.title}</h5>
              <p className="text-neutral-600">
                {t.description || "No description"}
              </p>
              <p className="text-sm">
                {t.dueDate ? format(new Date(t.dueDate), "PPP") : "No due date"}
              </p>
            </div>

            {/* Action Buttons - Visible on Hover */}
            <div className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-75 group-active:opacity-75 flex flex-col space-y-1 shadow-md p-2 rounded-lg transition-opacity duration-200 sm:bg-neutral-200/30 dark:bg-neutral-800/30 sm:backdrop-blur-lg">
              <button className="text-blue-500 hover:text-blue-700 font-semibold">
                Edit
              </button>
              <button className="text-red-500 hover:text-red-700 font-semibold">
                Delete
              </button>
              <button className="text-green-500 hover:text-green-700 font-semibold">
                Complete
              </button>
            </div>
          </div>
        ))}
        {tasks.length === 0 && (
          <p className="text-neutral-600">No tasks yet!</p>
        )}
      </div>
    </div>
  );
};

export default DisplayTasks;
