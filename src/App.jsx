import React, { useState, useEffect } from "react";
import TaskList from "./components/taskSection/TaskList";
import Calendar from "./components/calendarSection/Calendar";

const App = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [calendarTasks, setCalendarTasks] = useState(() => {
    const savedCalendarTasks = localStorage.getItem("calendarTasks");
    return savedCalendarTasks ? JSON.parse(savedCalendarTasks) : [];
  });

  const [currentMonth, setCurrentMonth] = useState(() => new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(() =>
    new Date().getFullYear()
  );

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("calendarTasks", JSON.stringify(calendarTasks));
  }, [calendarTasks]);

  const handleAddTask = (task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  const handleDeleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    setCalendarTasks((prevCalendarTasks) =>
      prevCalendarTasks.filter((task) => task.id !== id)
    );
  };

  const handleTaskAssignToDate = (taskId, date) => {
    const taskToAssign = tasks.find((task) => task.id === taskId);

    if (!taskToAssign) return;

    const existingCalendarTask = calendarTasks.find(
      (task) => task.id === taskId
    );

    if (existingCalendarTask) {
      setCalendarTasks((prevCalendarTasks) =>
        prevCalendarTasks.map((task) =>
          task.id === taskId ? { ...task, date } : task
        )
      );
    } else {
      const newCalendarTask = {
        ...taskToAssign,
        date,
      };

      setCalendarTasks((prevCalendarTasks) => [
        ...prevCalendarTasks,
        newCalendarTask,
      ]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-12 flex flex-col items-center justify-center gap-2">
          <h1 className="text-2xl font-bold text-gray-800">Task Calendar</h1>
          <p className="text-gray-600">
            Drag and drop items in the calendar specific date
          </p>
        </header>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Calendar */}
          <div className="lg:col-span-3">
            <Calendar
              tasks={calendarTasks}
              currentMonth={currentMonth}
              currentYear={currentYear}
              setCurrentMonth={setCurrentMonth}
              setCurrentYear={setCurrentYear}
              onDeleteTask={handleDeleteTask}
              onTaskAssignToDate={handleTaskAssignToDate}
            />
          </div>

          {/* Task list sidebar */}
          <div className="lg:col-span-1">
            <TaskList
              tasks={tasks}
              onAddTask={handleAddTask}
              onDeleteTask={handleDeleteTask}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
