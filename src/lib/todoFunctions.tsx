import { useState, useEffect } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";

export interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
  createdAt?: string;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string | null;
}

const isValidTask = (item: {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
}): item is Task => {
  return (
    typeof item.id === "number" &&
    typeof item.title === "string" &&
    typeof item.description === "string" &&
    (typeof item.dueDate === "string" || item.dueDate === "") &&
    typeof item.completed === "boolean"
  );
};

export const handleFileUpload = async (
  event: React.ChangeEvent<HTMLInputElement>,
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>,
  getToken: () => Promise<string | null>
) => {
  const file = event.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = async (e) => {
    try {
      const uploadedTasks = JSON.parse(e.target?.result as string);
      if (!Array.isArray(uploadedTasks) || !uploadedTasks.every(isValidTask)) {
        alert("Invalid file format. Ensure it contains valid task data.");
        return;
      }

      const token = await getToken();
      if (!token) {
        alert("Authentication error. Unable to retrieve token.");
        return;
      }

      const uploadResults = await Promise.all(
        uploadedTasks.map(async (task) => {
          const response = await fetch("http://localhost:3000/todos", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(task),
          });

          if (!response.ok)
            throw new Error(`Failed to upload task: ${response.statusText}`);
          return await response.json();
        })
      );

      setTasks((prevTasks) => [...prevTasks, ...uploadResults]);
    } catch (e) {
      alert(`Upload failed. Error: ${e}`);
    }
  };

  reader.readAsText(file);
  event.target.value = ""; // Reset file input
};

export const handleDownload = (tasks: Task[]) => {
  if (!Array.isArray(tasks) || tasks.length === 0) {
    alert("No tasks to download.");
    return;
  }
  try {
    const dataStr = JSON.stringify(tasks, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "tasks.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    alert(`Download failed. ${error}`);
  }
};

export const useTodoManager = () => {
  const { getToken } = useAuth();
  const { user } = useUser();
  const [task, setTask] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [activeTaskId, setActiveTaskId] = useState<number | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch user profile from backend immediately after authentication
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = await getToken();
        if (!token) return;

        const response = await fetch("http://localhost:3000/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) {
          throw new Error(`Failed to fetch user profile: ${response.status}`);
        }
        const data = await response.json();
        setUserProfile(data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    if (user) {
      fetchUserProfile();
    }
  }, [getToken, user]);

  // Fetch tasks and update immediately after any action
  useEffect(() => {
    const fetchTasks = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const token = await getToken();
        if (!token) throw new Error("Authentication error");

        const response = await fetch("http://localhost:3000/todos", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            `Failed to fetch tasks: ${response.status} - ${errorText}`
          );
        }
        const data = await response.json();
        console.log("Fetched tasks:", data);
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setError(
          error instanceof Error ? error.message : "Failed to load tasks"
        );
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchTasks();
    }
  }, [getToken, user]);

  const refreshTasks = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const token = await getToken();
      if (!token) throw new Error("Authentication error");

      const response = await fetch("http://localhost:3000/todos", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch tasks: ${response.status}`);
      }
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error refreshing tasks:", error);
      setError(
        error instanceof Error ? error.message : "Failed to refresh tasks"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const toggleButtons = (id: number) => {
    setActiveTaskId(activeTaskId === id ? null : id);
  };

  const handleDelete = async (id: number) => {
    try {
      const token = await getToken();
      if (!token) throw new Error("Authentication error");

      const response = await fetch(`http://localhost:3000/todos/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok)
        throw new Error(`Failed to delete task: ${response.statusText}`);

      // Refresh tasks immediately after deletion
      await refreshTasks();
    } catch (error) {
      console.error("Failed to delete task:", error);
      setError(
        error instanceof Error ? error.message : "Failed to delete task"
      );
    }
  };

  const handleEditSave = async (
    id: number,
    newTitle: string,
    newDescription: string,
    newDueDate?: string
  ) => {
    try {
      const currentTask = tasks.find((t) => t.id === id);
      if (!currentTask) return;

      const token = await getToken();
      if (!token) throw new Error("Authentication error");

      const response = await fetch(`http://localhost:3000/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: newTitle,
          description: newDescription,
          dueDate: newDueDate !== undefined ? newDueDate : currentTask.dueDate,
          completed: currentTask.completed,
        }),
      });
      if (!response.ok)
        throw new Error(`Failed to update task: ${response.statusText}`);

      // Refresh tasks immediately after update
      await refreshTasks();
      return await response.json();
    } catch (error) {
      console.error("Failed to edit task:", error);
      setError(
        error instanceof Error ? error.message : "Failed to update task"
      );
      return null;
    }
  };

  const handleComplete = async (id: number) => {
    try {
      const task = tasks.find((t) => t.id === id);
      if (!task) return;

      const token = await getToken();
      if (!token) throw new Error("Authentication error");

      const response = await fetch(`http://localhost:3000/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          completed: !task.completed,
        }),
      });
      if (!response.ok)
        throw new Error(
          `Failed to update task completion: ${response.statusText}`
        );

      // Refresh tasks immediately after toggling completion
      await refreshTasks();
    } catch (error) {
      console.error("Failed to toggle task completion:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Failed to update task completion"
      );
    }
  };

  const saveData = async () => {
    if (task.trim() === "") return;
    setError(null);
    try {
      const token = await getToken();
      if (!token) throw new Error("Authentication error");

      const response = await fetch("http://localhost:3000/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: task,
          description: description,
          dueDate: date?.toISOString() || "",
          completed: false,
        }),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Failed to create task: ${response.statusText} - ${errorText}`
        );
      }
      // Refresh tasks immediately after creation
      await refreshTasks();

      // Clear the form fields
      setTask("");
      setDescription("");
      setDate(undefined);
    } catch (error) {
      console.error("Failed to save task:", error);
      setError(
        error instanceof Error ? error.message : "Failed to create task"
      );
    }
  };

  const handleFileUploadWrapper = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    await handleFileUpload(event, setTasks, getToken);
    // Refresh tasks immediately after file upload
    await refreshTasks();
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
    userProfile,
    saveData,
    editTask,
    setEditTask,
    activeTaskId,
    toggleButtons,
    handleDelete,
    handleEditSave,
    handleComplete,
    refreshTasks,
    handleFileUpload: handleFileUploadWrapper,
    handleDownload: () => handleDownload(tasks),
    isLoading,
    error,
    setError,
  };
};
