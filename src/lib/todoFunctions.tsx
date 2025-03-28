interface Task {
    id: number;
    title: string;
    description: string;
    dueDate: string; // Store as string for localStorage
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

export const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, setTasks: React.Dispatch<React.SetStateAction<Task[]>>) => {
  const file = event.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const uploadedTasks = JSON.parse(e.target?.result as string);
      if (Array.isArray(uploadedTasks) && uploadedTasks.every(isValidTask)) {
        setTasks(uploadedTasks);
        localStorage.setItem("tasks", JSON.stringify(uploadedTasks));
      } else {
        alert(`Error parsing file. Please ensure it was backup from here.`);
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
