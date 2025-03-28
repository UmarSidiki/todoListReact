// components/DisplayTasks.tsx
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CheckCircle, Pencil, Trash2 } from "lucide-react";
import { EditTaskModal } from "@/components/todo/TaskEditor"; // Import the new component

export interface Task {
  completed: boolean;
  id: number;
  title: string;
  description: string;
  dueDate: string;
}

interface DisplayTasksProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const DisplayTasks: React.FC<DisplayTasksProps> = ({ tasks, setTasks }) => {
  const [editTask, setEditTask] = useState<Task | null>(null);

  const handleDelete = (id: number) => {
    try {
      const updatedTasks = tasks.filter((task) => task.id !== id);
      setTasks(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    } catch (error) {
      console.error("Failed to delete task:", error);
      // Error feedback could be added here with another modal if desired
    }
  };

  const handleEditSave = (id: number, newTitle: string, newDescription: string) => {
    try {
      const updatedTasks = tasks.map((task) =>
        task.id === id ? { ...task, title: newTitle, description: newDescription } : task
      );
      setTasks(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    } catch (error) {
      console.error("Failed to edit task:", error);
      // Error feedback is handled in EditTaskModal
    }
  };

  const handleComplete = (id: number) => {
    try {
      const updatedTasks = tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      );
      const sortedTasks = [
        ...updatedTasks.filter((task) => !task.completed),
        ...updatedTasks.filter((task) => task.completed),
      ];
      setTasks(sortedTasks);
      localStorage.setItem("tasks", JSON.stringify(sortedTasks));
    } catch (error) {
      console.error("Failed to toggle task completion:", error);
      // Error feedback could be added here with another modal if desired
    }
  };

  return (
    <div className="order-2 md:order-1 text-center md:text-left space-y-4">
      <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white leading-tight">
        You Have to Do {tasks.filter((t) => !t.completed).length} Task/s
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
            className={cn(
              "relative group card flex flex-row justify-between items-center gap-4",
              t.completed
                ? "bg-green-300/40 dark:bg-green-900/40"
                : "bg-white/40 dark:bg-neutral-950/40",
              "backdrop-blur-lg shadow-xl rounded-xl border border-neutral-200/50 dark:border-neutral-800/50 p-3"
            )}
          >
            <div className="text-start">
              <h5 className={cn("text-lg font-bold", t.completed && "line-through text-gray-500")}>
                {t.title}
              </h5>
              <p className="text-neutral-600">
                {t.description || "No description"}
              </p>
              <p className="text-sm">
                {t.dueDate ? format(new Date(t.dueDate), "PPP") : "No due date"}
              </p>
            </div>
            <div className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 sm:group-active:opacity-100 transition-opacity flex flex-col gap-1 -m-2 mt-0.25">
              <button
                className="p-2 bg-blue-500/70 hover:bg-blue-600/40 focus:bg-blue-600/40 text-white rounded-tr-lg shadow-md transition duration-300 flex items-center gap-1 backdrop-blur-md border border-white/10 dark:border-neutral-800/30"
                onClick={() => setEditTask(t)}
                aria-label={`Edit task: ${t.title}`}
              >
                <Pencil className="w-3 h-3" />
              </button>
              <button
                className="p-2 bg-red-500/70 hover:bg-red-600/40 focus:bg-red-600/40 text-white shadow-md transition duration-300 flex items-center gap-1 backdrop-blur-md border border-white/10 dark:border-neutral-800/30"
                onClick={() => handleDelete(t.id)}
                aria-label={`Delete task: ${t.title}`}
              >
                <Trash2 className="w-3 h-3" />
              </button>
              <button
                className={cn(
                  "p-2 text-white rounded-br-lg shadow-md transition duration-300 flex items-center gap-1 backdrop-blur-md border border-white/10 dark:border-neutral-800/30",
                  t.completed
                    ? "bg-gray-400 hover:bg-gray-500/40 focus:bg-gray-500/40"
                    : "bg-green-500/70 hover:bg-green-600/40 focus:bg-green-600/40"
                )}
                onClick={() => handleComplete(t.id)}
                aria-label={t.completed ? `Unmark task as complete: ${t.title}` : `Mark task as complete: ${t.title}`}
              >
                <CheckCircle className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
        {tasks.length === 0 && (
          <p className="text-neutral-600">No tasks yet!</p>
        )}
      </div>
      {editTask && (
        <EditTaskModal
          task={editTask}
          onSave={handleEditSave}
          onClose={() => setEditTask(null)}
          isOpen={!!editTask}
        />
      )}
    </div>
  );
};

export default DisplayTasks;