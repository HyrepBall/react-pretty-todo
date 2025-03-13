"use client";
import { useState } from "react";
import { Edit2, Trash } from "lucide-react";

import { Task, useTasks } from "@/lib/taskContext";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import EditTaskModal from "@/components/EditTaskModal";

export default function TaskItem({ id, title, completed, priority }: Task) {
  const { removeTask, toggleTask } = useTasks();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        className={cn(
          "flex items-center justify-between p-3 bg-gradient-to-r from-primary/3 to-transparent border rounded-lg shadow-sm",
          "transition-all hover:shadow-lg ",
          completed && "opacity-50"
        )}
      >
        <div className="flex items-center justify-between gap-3 flex-1 pr-6">
          <input
            type="checkbox"
            checked={completed}
            onChange={() => toggleTask(id)}
            className="h-5 min-w-5 rounded border-gray-300 text-primary focus:ring-primary"
          />
          <span
            className={cn(
              "text-foreground px-4 flex-1",
              completed && "line-through text-muted-foreground"
            )}
          >
            {title}
          </span>
          <span
            className={cn(
              "min-w-3 h-3 rounded-full", // Фиксированный размер и круглая форма
              priority === "high" && "bg-red-400", // Красный для высокого приоритета
              priority === "medium" && "bg-orange-400", // Оранжевый для среднего
              priority === "low" && "bg-green-400" // Зелёный для низкого
            )}
            title={
              priority === "high"
                ? "Высокий"
                : priority === "medium"
                ? "Средний"
                : "Низкий"
            } // Подсказка при наведении
          />
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsModalOpen(true)} // Открываем модалку
            className="transition-transform hover:scale-105 cursor-pointer"
          >
            <Edit2 className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => removeTask(id)}
            className="transition-transform hover:scale-105 cursor-pointer"
          >
            <Trash className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
          </Button>
        </div>
      </div>

      <EditTaskModal
        id={id}
        title={title}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        priority={priority}
      />
    </>
  );
}
