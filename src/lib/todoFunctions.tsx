import { useState, useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";

export interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
}

const API_URL = "http://localhost:3000/api";

export const handleFileUpload = (
  event: React.ChangeEvent<HTMLInputElement>,
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>
) => {
  const file = event.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = async (e) => {
    try {
      const uploadedTasks = JSON.parse(e.target?.result as string);
      
      // Import tasks to the database
      if (Array.isArray(uploadedTasks)) {
        // This would need to be implemented on your server
        // For now, just set tasks locally
        setTasks(uploadedTasks);
        
        // You could implement a batch import API endpoint for this feature
        alert("Tasks imported locally. Note: These are not saved to the database yet.");
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

export const handleDownload = async (tasks: Task[]) => {
  const dataStr =
    "data:text/json;charset=utf-8," +
    encodeURIComponent(JSON.stringify(tasks, null, 2));

  const link = document.createElement("a");
  link.setAttribute("href", dataStr);
  link.setAttribute("download", "tasks.json");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const useTodoManager = () => {
  const { getToken, isSignedIn } = useAuth();
  const [task, setTask] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [activeTaskId, setActiveTaskId] = useState<number | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch tasks from API
  useEffect(() => {
    const fetchTasks = async () => {
      if (!isSignedIn) return;
      
      try {
        setIsLoading(true);
        const token = await getToken();
        console.log("Using token:", token ? "Token received" : "No token");
        
        const response = await fetch(`${API_URL}/tasks`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error(`Server response: ${response.status}`, errorText);
          throw new Error(`Failed to fetch tasks: ${response.status} - ${errorText}`);
        }
        
        const data = await response.json();
        console.log("Tasks received:", data.length);
        setTasks(data);
      } catch (err) {
        console.error('Error fetching tasks:', err);
        setError('Failed to load tasks. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchTasks();
  }, [isSignedIn, getToken]);

  const toggleButtons = (id: number) => {
    setActiveTaskId(activeTaskId === id ? null : id);
  };

  const handleDelete = async (id: number) => {
    try {
      const token = await getToken();
      const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete task');
      }
      
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Failed to delete task:", error);
      setError('Failed to delete task. Please try again.');
    }
  };

  const handleEditSave = async (
    id: number,
    newTitle: string,
    newDescription: string
  ) => {
    try {
      const taskToUpdate = tasks.find(task => task.id === id);
      if (!taskToUpdate) return;
      
      const token = await getToken();
      const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: newTitle,
          description: newDescription,
          dueDate: taskToUpdate.dueDate,
          completed: taskToUpdate.completed
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to update task');
      }
      
      const updatedTask = await response.json();
      
      setTasks(tasks.map((task) =>
        task.id === id ? updatedTask : task
      ));
    } catch (error) {
      console.error("Failed to edit task:", error);
      setError('Failed to update task. Please try again.');
    }
  };

  const handleComplete = async (id: number) => {
    try {
      const token = await getToken();
      const response = await fetch(`${API_URL}/tasks/${id}/toggle`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to update task completion status');
      }
      
      const updatedTask = await response.json();
      
      // Update local state and sort tasks
      const updatedTasks = tasks.map((task) =>
        task.id === id ? updatedTask : task
      );
      
      const sortedTasks = [
        ...updatedTasks.filter((task) => !task.completed),
        ...updatedTasks.filter((task) => task.completed),
      ];
      
      setTasks(sortedTasks);
    } catch (error) {
      console.error("Failed to toggle task completion:", error);
      setError('Failed to update task status. Please try again.');
    }
  };

  const saveData = async () => {
    if (task.trim() === "") return;

    try {
      const token = await getToken();
      const response = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: task,
          description: description,
          dueDate: date?.toISOString() || null
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to create task');
      }
      
      const newTask = await response.json();
      
      setTasks((prevTasks) => [...prevTasks, newTask]);
      setTask("");
      setDescription("");
      setDate(undefined);
    } catch (error) {
      console.error("Failed to save task:", error);
      setError('Failed to create task. Please try again.');
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
    isLoading,
    error
  };
};