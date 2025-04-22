import React from 'react';
import { X } from 'lucide-react';

const Task = ({ task, onDelete, isDraggable = true }) => {
  const handleDragStart = (e) => {
    e.dataTransfer.setData('application/json', JSON.stringify(task));
    e.dataTransfer.effectAllowed = 'move';
    
    const ghostElement = document.createElement('div');
    ghostElement.classList.add('bg-white', 'p-2', 'rounded', 'shadow-md', 'text-sm');
    ghostElement.textContent = task.title;
    document.body.appendChild(ghostElement);
    ghostElement.style.position = 'absolute';
    ghostElement.style.top = '-1000px';
    
    e.dataTransfer.setDragImage(ghostElement, 0, 0);
    
    setTimeout(() => {
      document.body.removeChild(ghostElement);
    }, 0);
  };

  return (
    <div
      className={`group relative p-2 mb-2 rounded-md ${
        task.color ? task.color : 'bg-white'
      } shadow-sm border border-gray-200 transition-all duration-200 ${
        isDraggable ? 'cursor-grab active:cursor-grabbing hover:shadow-md' : ''
      }`}
      draggable={isDraggable}
      onDragStart={isDraggable ? handleDragStart : undefined}
    >
      <div className="flex justify-between items-start">
        <h3 className="text-sm font-medium line-clamp-2">{task.title}</h3>
        {onDelete && (
          <button
            onClick={() => onDelete(task.id)}
            className="text-gray-400 hover:text-red-500 transition-colors ml-1 opacity-0 group-hover:opacity-100"
            aria-label="Delete task"
          >
            <X size={14} />
          </button>
        )}
      </div>
      {task.description && (
        <p className="text-xs text-gray-600 mt-1 line-clamp-2">{task.description}</p>
      )}
    </div>
  );
};

export default Task;