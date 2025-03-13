"use client";
import { createContext, useContext, useState, useEffect } from "react";

type Filter = "all" | "completed" | "pending";
export type Priority = "low" | "medium" | "high";

export type Task = {
  id: string;
  title: string;
  completed: boolean;
  priority: Priority;
};

type TaskContextType = {
  tasks: Task[];
  filteredTasks: Task[];
  filter: Filter;
  addTask: (title: string, priority: Priority) => void;
  removeTask: (id: string) => void;
  toggleTask: (id: string) => void;
  setFilter: (filter: Filter) => void;
  editTask: (id: string, newTitle: string, newPriority: Priority) => void;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]); // Изначально пустой массив
  const [filter, setFilter] = useState<Filter>("all");

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  // Загружаем задачи из localStorage только на клиенте
  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []); // Выполняется один раз при монтировании

  // Сохраняем задачи в localStorage при их изменении
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (title: string, priority: Priority = "medium") => {
    setTasks([
      ...tasks,
      { id: Date.now().toString(), title, completed: false, priority },
    ]);
  };

  const removeTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const editTask = (id: string, newTitle: string, newPriority: Priority) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, title: newTitle, priority: newPriority }
          : task
      )
    );
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        filteredTasks,
        filter,
        setFilter,
        addTask,
        removeTask,
        toggleTask,
        editTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useTasks must be used within TaskProvider");
  return context;
};
