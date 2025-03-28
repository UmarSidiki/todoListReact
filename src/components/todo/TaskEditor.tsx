// components/EditTaskModal.tsx
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Task } from "./DisplayTasks"; // Import Task interface

interface EditTaskModalProps {
  task: Task;
  onSave: (id: number, title: string, description: string) => void;
  onClose: () => void;
  isOpen: boolean;
}

export const EditTaskModal: React.FC<EditTaskModalProps> = ({ task, onSave, onClose, isOpen }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || "");
  const [error, setError] = useState<string | null>(null);

  const handleSave = () => {
    if (!title.trim()) {
      setError("Title cannot be empty.");
      return;
    }
    try {
      onSave(task.id, title, description);
      onClose();
    } catch (err) {
      setError("Failed to save task. Please try again.");
      console.error("Error saving task:", err);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px] bg-white/30 dark:bg-neutral-800/60 backdrop-blur-lg">
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <label htmlFor="editTitle" className="text-sm font-medium">
              Title
            </label>
            <Input
              id="editTitle"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full"
              aria-required="true"
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="editDescription" className="text-sm font-medium">
              Description
            </label>
            <Textarea
              id="editDescription"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full min-h-[100px]"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};