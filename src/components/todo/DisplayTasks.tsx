import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CheckCircle, Pencil, Trash2 } from "lucide-react";
import { EditTaskModal } from "@/components/todo/TaskEditor";
import { Task } from "@/lib/todoFunctions";

interface DisplayTasksProps {
  tasks: Task[];
  editTask: Task | null;
  setEditTask: (task: Task | null) => void;
  activeTaskId: number | null;
  toggleButtons: (id: number) => void;
  handleDelete: (id: number) => void;
  handleEditSave: (id: number, title: string, description: string) => void;
  handleComplete: (id: number) => void;
  loading: boolean;
  error: string | null;
}

const DisplayTasks = ({
  tasks,
  editTask,
  setEditTask,
  activeTaskId,
  toggleButtons,
  handleDelete,
  handleEditSave,
  handleComplete,
  loading,
  error,
}: DisplayTasksProps) => {
  return (
    <div className="order-2 md:order-1 text-center md:text-left space-y-4">
      <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white leading-tight">
        You Have to Do {tasks.filter((t) => !t.completed).length} Task/s
      </h1>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {loading && <p className="text-neutral-600">Loading tasks...</p>}
      <div
        className={cn(
          "flex flex-col gap-2 h-[400px] max-h-[50vh] overflow-y-auto p-1",
          "fade-edges no-scrollbar"
        )}
      >
        {!loading &&
          tasks.map((t) => (
            <div
              key={t.id}
              className={cn(
                "relative group card flex flex-row justify-between items-center gap-4",
                t.completed
                  ? "bg-green-300/40 dark:bg-green-900/40"
                  : "bg-white/40 dark:bg-neutral-950/40",
                "backdrop-blur-lg shadow-xl rounded-xl border border-neutral-200/50 dark:border-neutral-800/50 p-3"
              )}
              onClick={() => toggleButtons(t.id)}
            >
              <div className="text-start">
                <h5
                  className={cn(
                    "text-lg font-bold",
                    t.completed && "line-through text-gray-500"
                  )}
                >
                  {t.title}
                </h5>
                <p className="text-neutral-600">
                  {t.description || "No description"}
                </p>
                <p className="text-sm">
                  {t.dueDate && t.dueDate !== ""
                    ? format(new Date(t.dueDate), "PPP")
                    : "No due date"}
                </p>
              </div>
              <div
                className={cn(
                  "absolute right-0 top-1/2 -translate-y-1/2 transition-all duration-300 flex flex-col gap-1",
                  activeTaskId === t.id
                    ? "visible opacity-100"
                    : "invisible opacity-0",
                  "md:invisible md:opacity-0 md:group-hover:visible md:group-hover:opacity-100"
                )}
              >
                <button
                  className="p-2 bg-blue-500/70 hover:bg-blue-600/40 focus:bg-blue-600/40 text-white rounded-tr-lg shadow-md transition duration-300 flex items-center gap-1 backdrop-blur-md border border-white/10 dark:border-neutral-800/30"
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditTask(t);
                  }}
                  aria-label={`Edit task: ${t.title}`}
                  disabled={loading}
                >
                  <Pencil className="w-3 h-3" />
                </button>
                <button
                  className="p-2 bg-red-500/70 hover:bg-red-600/40 focus:bg-red-600/40 text-white shadow-md transition duration-300 flex items-center gap-1 backdrop-blur-md border border-white/10 dark:border-neutral-800/30"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(t.id);
                  }}
                  aria-label={`Delete task: ${t.title}`}
                  disabled={loading}
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
                  onClick={(e) => {
                    e.stopPropagation();
                    handleComplete(t.id);
                  }}
                  aria-label={
                    t.completed
                      ? `Unmark task as complete: ${t.title}`
                      : `Mark task as complete: ${t.title}`
                  }
                  disabled={loading}
                >
                  <CheckCircle className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        {!loading && tasks.length === 0 && (
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
