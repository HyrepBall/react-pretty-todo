"use client";

import { Button } from "@/components/ui/button";
import TaskItem from "@/components/TaskItem";
import { useTasks } from "@/lib/taskContext";

export default function TaskList() {
  const { filteredTasks, filter, setFilter } = useTasks();

  return (
    <div className="space-y-6">
      {/* Фильтры */}
      <div className="flex flex-col sm:flex-row gap-3 justify-start">
        <Button
          onClick={() => setFilter("all")}
          variant={filter === "all" ? "default" : "outline"}
          className="w-full sm:w-auto transition-transform hover:scale-105 cursor-pointer"
        >
          Все
        </Button>
        <Button
          onClick={() => setFilter("completed")}
          variant={filter === "completed" ? "default" : "outline"}
          className="w-full sm:w-auto transition-transform hover:scale-105 cursor-pointer"
        >
          Выполненные
        </Button>
        <Button
          onClick={() => setFilter("pending")}
          variant={filter === "pending" ? "default" : "outline"}
          className="w-full sm:w-auto transition-transform hover:scale-105 cursor-pointer"
        >
          К выполнению
        </Button>
      </div>

      {/* Список задач */}
      <div className="grid gap-4">
        {filteredTasks.length === 0 ? (
          <p className="text-center text-muted-foreground">Пока задач нет...</p>
        ) : (
          filteredTasks.map((task) => <TaskItem key={task.id} {...task} />)
        )}
      </div>
    </div>
  );
}
