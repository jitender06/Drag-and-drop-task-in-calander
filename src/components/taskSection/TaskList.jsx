import React, { useState } from "react";
import Task from "./Task";
import TaskModal from "./TaskModal";
import { Plus } from "lucide-react";

const TaskList = ({ tasks, onAddTask, onDeleteTask }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (values) => {
    const newTask = {
      id: Date.now().toString(),
      title: values.title.trim(),
      description: values.description.trim() || undefined,
      color: getRandomTaskColor(),
    };
    onAddTask(newTask);
    setIsModalOpen(false);
  };

  const getRandomTaskColor = () => {
    const colors = [
      "bg-blue-50 border-blue-200",
      "bg-green-50 border-green-200",
      "bg-yellow-50 border-yellow-200",
      "bg-purple-50 border-purple-200",
      "bg-pink-50 border-pink-200",
      "bg-indigo-50 border-indigo-200",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 h-full overflow-hidden flex flex-col">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Tasks</h2>

      <button
        onClick={() => setIsModalOpen(true)}
        className="flex items-center gap-2 w-full p-2 mb-4 text-sm text-left text-gray-600 hover:bg-gray-50 rounded-md transition-colors"
      >
        <Plus size={18} className="text-indigo-500" />
        <span>Add new task</span>
      </button>

      <div className="overflow-y-auto flex-grow pt-2">
        {tasks.length === 0 ? (
          <p className="text-center text-gray-500 text-sm py-4">
            Add a task to get started.
          </p>
        ) : (
          tasks.map((task) => (
            <Task key={task.id} task={task} onDelete={onDeleteTask} />
          ))
        )}
      </div>

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default TaskList;
