"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskSchema, TaskFormData } from "@/lib/schema";
import { Priority, useTasks } from "@/lib/taskContext";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function TaskForm() {
  const { addTask } = useTasks();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      priority: "medium", // Значение по умолчанию для приоритета
    },
  });

  const onSubmit = (data: TaskFormData) => {
    console.log(data);
    addTask(data.title, data.priority);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-4 flex flex-wrap gap-2 animate-in fade-in duration-500"
    >
      {/* Поле "Название" */}
      <div className="w-full min-w-0 flex-1 sm:w-auto">
        <div className="mb-2">
          <Input
            {...register("title")}
            placeholder="Название..."
            className={cn(
              "w-full border-primary/20 focus:ring-2 focus:ring-primary transition-all",
              errors.title && "border-red-500 focus:ring-red-500"
            )}
          />
        </div>
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
        )}
      </div>

      {/* Поле "Приоритет" */}
      <div className="w-full min-w-[150px] sm:w-auto">
        <Select
          defaultValue="medium" // Начальное значение
          onValueChange={(value) => setValue("priority", value as Priority)}
        >
          <SelectTrigger
            className={cn(
              "w-full border-primary/20 focus:ring-2 focus:ring-primary transition-all",
              errors.priority && "border-red-500 focus:ring-red-500"
            )}
          >
            <SelectValue placeholder="Приоритет" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="low">Низкий</SelectItem>
            <SelectItem value="medium">Средний</SelectItem>
            <SelectItem value="high">Высокий</SelectItem>
          </SelectContent>
        </Select>
        {/* Скрытое поле для валидации */}
        <input type="hidden" {...register("priority")} />
        {errors.priority && (
          <p className="text-red-500 text-sm mt-1">{errors.priority.message}</p>
        )}
      </div>

      {/* Кнопка "Создать" */}
      <div className="w-full sm:w-auto">
        <Button
          type="submit"
          size="lg"
          className="w-full bg-primary hover:bg-primary/90 transition-all hover:scale-105 sm:w-auto"
        >
          Создать
        </Button>
      </div>
    </form>
  );
}
