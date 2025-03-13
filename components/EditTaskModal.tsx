"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Priority, useTasks } from "@/lib/taskContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

type EditTaskModalProps = {
  id: string;
  title: string;
  priority: Priority;
  isOpen: boolean;
  onClose: () => void;
};

export default function EditTaskModal({
  id,
  title,
  priority,
  isOpen,
  onClose,
}: EditTaskModalProps) {
  const { editTask } = useTasks();
  const [newTitle, setNewTitle] = useState(title);
  const [newPriority, setNewPriority] = useState<Priority>(priority);

  const handleSave = () => {
    if (newTitle.trim()) {
      editTask(id, newTitle, newPriority); // Сохраняем изменения
      onClose(); // Закрываем модалку
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Редактировать задачу</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <Input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Новый заголовок..."
            className="w-full mb-4"
          />

          <Select
            value={newPriority}
            onValueChange={(value: Priority) => setNewPriority(value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Выберите приоритет" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Низкий</SelectItem>
              <SelectItem value="medium">Средний</SelectItem>
              <SelectItem value="high">Высокий</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            className="cursor-pointer"
          >
            Отменить
          </Button>
          <Button className="cursor-pointer" onClick={handleSave}>
            Сохранить
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
