import React from "react";
import { CalendarIcon, Download, Upload } from "lucide-react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { handleDownload, handleFileUpload } from "@/lib/todoFunctions";

interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
}

interface AddTasksProps {
  task: string;
  tasks: Task[];
  setTask: React.Dispatch<React.SetStateAction<string>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  date: Date | undefined;
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  saveData: () => void;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const AddTasks: React.FC<AddTasksProps> = ({
  task,
  tasks,
  setTask,
  description,
  setDescription,
  date,
  setDate,
  saveData,
  setTasks,
}) => {
  return (
    <>
      <div className="order-1 md:order-2 w-full max-w-sm mx-auto md:mx-0">
        <div className="p-6 bg-white/40 dark:bg-neutral-950/40 backdrop-blur-lg shadow-xl rounded-xl border border-neutral-200/50 dark:border-neutral-800/50">
          <h2 className="text-2xl font-semibold uppercase text-neutral-900 dark:text-white mb-6">
            Add a New TODO
          </h2>
          <div className="space-y-5">
            <div className="space-y-2">
              <label
                className="text-sm font-medium text-neutral-700 dark:text-neutral-300"
                htmlFor="inputTodo"
              >
                Todo
              </label>
              <Input
                id="inputTodo"
                placeholder="Enter your task"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                className="w-full rounded-lg border-neutral-200 dark:border-neutral-700 focus:ring-2 focus:ring-blue-500 mb-1"
              />
            </div>
            <div className="space-y-2">
              <label
                className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1"
                htmlFor="inputDescription"
              >
                Description
              </label>
              <Textarea
                id="inputDescription"
                placeholder="Tell us a little bit about what you want to do"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full rounded-lg border-neutral-200 dark:border-neutral-700 focus:ring-2 focus:ring-blue-500 min-h-[100px] max-h-[150px] resize-none overflow-auto"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Due Date
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-between text-left font-normal",
                      !date && "text-neutral-500"
                    )}
                  >
                    {date ? format(date, "PPP") : "Pick a date"}
                    <CalendarIcon className="w-5 h-5 text-neutral-500" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    className="rounded-md border-0"
                  />
                </PopoverContent>
              </Popover>
            </div>
            <Button
              size="lg"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
              onClick={saveData}
            >
              Add to List
            </Button>

            {/* DATABASE LOCAL */}
            <div className="flex justify-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                aria-label="Download"
                onClick={() => handleDownload(tasks)}
              >
                <Download className="h-5 w-5" /> Download
              </Button>
              <input
                type="file"
                accept="application/json"
                id="fileUpload"
                className="hidden"
                onChange={(event) => handleFileUpload(event, setTasks)}
              />
              <Button
                variant="outline"
                size="sm"
                aria-label="Upload"
                onClick={() => document.getElementById("fileUpload")?.click()}
              >
                <Upload className="h-5 w-5" /> Upload
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddTasks;
