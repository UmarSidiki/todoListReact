import { useState } from "react";

export interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string; // Store as string for localStorage
  completed: boolean;
}

const isValidTask = (item: {
  id: number;
  title: string;
  description: string;
  dueDate: string;
}): item is Task => {
  return (
    typeof item.id === "number" &&
    typeof item.title === "string" &&
    typeof item.description === "string" &&
    (typeof item.dueDate === "string" || item.dueDate === "")
  );
};

export const handleFileUpload = (
  event: React.ChangeEvent<HTMLInputElement>,
  setTasks: React.Dispatch<React.SetStateAction<Task[]>> // Correct type
) => {
  const file = event.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const uploadedTasks = JSON.parse(e.target?.result as string);
      if (Array.isArray(uploadedTasks) && uploadedTasks.every(isValidTask)) {
        setTasks(uploadedTasks); // Works because setTasks accepts Task[]
        localStorage.setItem("tasks", JSON.stringify(uploadedTasks));
      } else {
        alert("Error parsing file. Please ensure it was backed up from here.");
      }
    } catch (e) {
      alert(`Invalid file format. Please upload a valid tasks JSON file. ${e}`);
    }
  };
  reader.readAsText(file);
  event.target.value = ""; // Reset input
};

export const handleDownload = (tasks: Task[]) => {
  const savedTasks = localStorage.getItem("tasks");
  const tasksToDownload = savedTasks ? JSON.parse(savedTasks) : tasks;

  const dataStr =
    "data:text/json;charset=utf-8," +
    encodeURIComponent(JSON.stringify(tasksToDownload, null, 2));

  const link = document.createElement("a");
  link.setAttribute("href", dataStr);
  link.setAttribute("download", "tasks.json");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const useTodoManager = () => {
  const [task, setTask] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<Date | undefined>(undefined); // No default date
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [activeTaskId, setActiveTaskId] = useState<number | null>(null);
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("tasks");
    try {
      const parsed = savedTasks ? JSON.parse(savedTasks) : [];
      return Array.isArray(parsed) && parsed.every(isValidTask) ? parsed : [];
    } catch (e) {
      console.error("Failed to parse saved tasks:", e);
      return [];
    }
  });

  const toggleButtons = (id: number) => {
    setActiveTaskId(activeTaskId === id ? null : id);
  };

  const handleDelete = (id: number) => {
    try {
      const updatedTasks = tasks.filter((task) => task.id !== id);
      setTasks(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  const handleEditSave = (
    id: number,
    newTitle: string,
    newDescription: string
  ) => {
    try {
      const updatedTasks = tasks.map((task) =>
        task.id === id
          ? { ...task, title: newTitle, description: newDescription }
          : task
      );
      setTasks(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    } catch (error) {
      console.error("Failed to edit task:", error);
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
    }
  };

  const saveData = () => {
    if (task.trim() === "") return;

    const newTask: Task = {
      id: Date.now() + Math.random(), // Reduce collision risk
      title: task,
      description: description,
      dueDate: date?.toISOString() || "",
      completed: false,
    };

    try {
      setTasks((prevTasks) => [...prevTasks, newTask]); // Use functional update
      localStorage.setItem("tasks", JSON.stringify([...tasks, newTask]));
      setTask("");
      setDescription("");
      setDate(undefined);
    } catch (error) {
      console.error("Failed to save task:", error);
    }
  };

  return {
    task,
    setTask,
    description,
    setDescription,
    date,
    setDate,
    tasks,
    setTasks,
    saveData,
    editTask,
    setEditTask,
    activeTaskId,
    toggleButtons,
    handleDelete,
    handleEditSave,
    handleComplete,
  };
};
