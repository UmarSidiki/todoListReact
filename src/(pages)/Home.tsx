import HomeTemplate from "@/components/templates/HomeTemplate";
import "@/style/bg.css";
import DisplayTasks from "@/components/todo/DisplayTasks";
import AddTasks from "@/components/todo/AddTasks";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { useState } from "react";
import HomeNoLoggedIn from "@/components/molecules/HomeNoLoggedIn";

interface Task {
  completed: boolean;
  id: number;
  title: string;
  description: string;
  dueDate: string;
}

const Home = () => {
  const [task, setTask] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const saveData = () => {
    if (task.trim() === "") return;

    const newTask: Task = {
      id: Date.now(),
      title: task,
      description: description,
      dueDate: date?.toISOString() || "",
      completed: false,
    };

    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks)); // Save array

    setTask("");
    setDescription("");
    setDate(new Date());
  };

  return (
    <>
      <SignedIn>
        <HomeTemplate className="overflow-hidden">
          <div className="container mx-auto px-4 py-8 md:py-12 max-w-7xl overflow-y-auto no-scrollbar">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start justify-items-center">
              <DisplayTasks tasks={tasks} setTasks={setTasks} />

              <AddTasks
                task={task}
                tasks={tasks}
                setTask={setTask}
                description={description}
                setDescription={setDescription}
                date={date}
                setDate={setDate}
                saveData={saveData}
                setTasks={setTasks}
              />
            </div>
          </div>
        </HomeTemplate>
      </SignedIn>
      <SignedOut>
        <HomeNoLoggedIn />
      </SignedOut>
    </>
  );
};

export default Home;
