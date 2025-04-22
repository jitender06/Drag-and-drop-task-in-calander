import React from 'react';
import Task from '../taskSection/Task';
import { isToday, isSameMonth } from '../../utils/dateUtils';


const CalendarDay = ({ 
  date, 
  tasks, 
  currentMonth, 
  currentYear, 
  onDeleteTask 
}) => {
  const isCurrentMonth = isSameMonth(date, currentMonth, currentYear);
  const todayClass = isToday(date) ? 'bg-indigo-50 font-bold text-indigo-700' : '';
  
  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    try {
      const taskData = JSON.parse(e.dataTransfer.getData('application/json'));
      if (taskData && taskData.id) {
        const customEvent = new CustomEvent('task-dropped', {
          detail: {
            taskId: taskData.id,
            date: date.toISOString().split('T')[0]
          },
          bubbles: true
        });
        e.currentTarget.dispatchEvent(customEvent);
      }
    } catch (error) {
      console.error('Error parsing dropped task data:', error);
    }
  };

  const dayTasks = tasks.filter(task => 
    task.date === date.toISOString().split('T')[0]
  );

  return (
    <div 
      className={`h-28 sm:h-32 md:h-36 border border-gray-200 p-1 overflow-hidden transition-colors ${
        isCurrentMonth ? 'bg-white' : 'bg-gray-50'
      } ${todayClass} ${
        isCurrentMonth ? 'hover:bg-indigo-50/30' : 'hover:bg-gray-100'
      }`}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className={`text-xs ${isCurrentMonth ? 'text-gray-800' : 'text-gray-400'}`}>
        {date.getDate()}
      </div>
      
      <div className="mt-1 overflow-y-auto max-h-[calc(100%-20px)]">
        {dayTasks.map(task => (
          <Task 
            key={task.id} 
            task={task}
            onDelete={onDeleteTask}
            isDraggable={false}
          />
        ))}
      </div>
    </div>
  );
};

export default CalendarDay;