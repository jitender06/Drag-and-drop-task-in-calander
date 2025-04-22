export const getDaysInMonth = (year, month) => {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  return Array.from(
    { length: daysInMonth },
    (_, i) => new Date(year, month, i + 1)
  );
};

export const getDaysForCalendarView = (year, month) => {
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  // Get day of week for the first day (0 = Sunday, 6 = Saturday)
  const firstDayOfWeek = firstDayOfMonth.getDay();

  // Calculate days from previous month to include
  const daysFromPrevMonth = firstDayOfWeek;

  const totalDaysToShow = 42;
  const daysFromNextMonth =
    totalDaysToShow - lastDayOfMonth.getDate() - daysFromPrevMonth;

  // Get days from previous month
  const prevMonthDays = Array.from({ length: daysFromPrevMonth }, (_, i) => {
    const day = new Date(year, month, -daysFromPrevMonth + i + 1);
    return day;
  });

  // Get days for current month
  const currentMonthDays = Array.from(
    { length: lastDayOfMonth.getDate() },
    (_, i) => new Date(year, month, i + 1)
  );

  // Get days for next month
  const nextMonthDays = Array.from(
    { length: daysFromNextMonth },
    (_, i) => new Date(year, month + 1, i + 1)
  );

  // Combine all days
  return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];
};

export const formatDate = (date) => {
  return date.toISOString().split("T")[0];
};

export const isSameDay = (date1, date2) => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

export const isToday = (date) => {
  const today = new Date();
  return isSameDay(date, today);
};

export const isSameMonth = (date, month, year) => {
  return date.getMonth() === month && date.getFullYear() === year;
};

export const getMonthName = (month) => {
  return new Date(0, month).toLocaleString("default", { month: "long" });
};
