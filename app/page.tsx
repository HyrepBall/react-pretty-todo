import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Home() {
  return (
    <div className="min-h-screen max-w-4xl mx-auto py-6 sm:py-8 lg:py-12 px-4 sm:px-6 lg:px-8">
      <header className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4">
        {/* <h1 className="text-3xl font-bold text-foreground">To-Do List</h1> */}
        <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-gray-700 bg-clip-text text-transparent">
          Список задач
        </h1>
        <ThemeToggle />
      </header>

      <main className="space-y-8">
        <TaskForm />
        <TaskList />
      </main>
    </div>
  );
}
