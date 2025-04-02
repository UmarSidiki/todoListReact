import HomeTemplate from "@/components/templates/HomeTemplate";
import "@/style/bg.css";
import DisplayTasks from "@/components/todo/DisplayTasks";
import AddTasks from "@/components/todo/AddTasks";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import HomeNoLoggedIn from "@/components/templates/HomeNoLoggedIn";
import { useTodoManager } from "@/lib/todoFunctions";

const Home = () => {
  const {
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
  } = useTodoManager();

  return (
    <>
      <SignedIn>
        <HomeTemplate className="overflow-hidden">
          <div className="container mx-auto px-4 py-8 md:py-12 max-w-7xl overflow-y-auto no-scrollbar">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start justify-items-center">
              <DisplayTasks
                tasks={tasks}
                editTask={editTask}
                setEditTask={setEditTask}
                activeTaskId={activeTaskId}
                toggleButtons={toggleButtons}
                handleDelete={handleDelete}
                handleEditSave={handleEditSave}
                handleComplete={handleComplete}
                loading={false}
                error={null}
              />
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
