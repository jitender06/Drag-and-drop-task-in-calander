import React, { useEffect, useRef } from 'react';
import CalendarDay from './CalendarDay';
import { 
  getDaysForCalendarView, 
  getMonthName
} from '../../utils/dateUtils';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Calendar = ({
  tasks,
  currentMonth,
  currentYear,
  setCurrentMonth,
  setCurrentYear,
  onDeleteTask,
  onTaskAssignToDate
}) => {
  const calendarRef = useRef(null);
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const daysInMonth = getDaysForCalendarView(currentYear, currentMonth);

  const handlePreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  useEffect(() => {
    const handleTaskDropped = (e) => {
      const detail = e.detail;
      if (detail && detail.taskId && detail.date) {
        onTaskAssignToDate(detail.taskId, detail.date);
      }
    };

    const calendarElement = calendarRef.current;
    if (calendarElement) {
      calendarElement.addEventListener('task-dropped', handleTaskDropped);
    }

    return () => {
      if (calendarElement) {
        calendarElement.removeEventListener('task-dropped', handleTaskDropped);
      }
    };
  }, [onTaskAssignToDate]);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 h-full flex flex-col" ref={calendarRef}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          {getMonthName(currentMonth)} {currentYear}
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={handlePreviousMonth}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Previous month"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={handleNextMonth}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Next month"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-px flex-grow">
        {/* Day headers */}
        {daysOfWeek.map(day => (
          <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
            {day}
          </div>
        ))}

        {/* Calendar days */}
        {daysInMonth.map((date, index) => (
          <CalendarDay
            key={index}
            date={date}
            tasks={tasks}
            currentMonth={currentMonth}
            currentYear={currentYear}
            onDeleteTask={onDeleteTask}
          />
        ))}
      </div>
    </div>
  );
};

export default Calendar;