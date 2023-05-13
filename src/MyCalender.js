import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function MyCalender() {
  const [tasks, setTasks] = useState({});

  const handleAddTask = (date, description) => {
    setTasks(prevTasks => {
      const tasksForDate = prevTasks[date] || [];
      return { ...prevTasks, [date]: [...tasksForDate, description] };
    });
  };

  const handleDeleteTask = (date, index) => {
    const tasksForDate = [...tasks[date]];
    tasksForDate.splice(index, 1);
    if (tasksForDate.length === 0) {
      const updatedTasks = { ...tasks };
      delete updatedTasks[date];
      setTasks(updatedTasks);
    } else {
      setTasks({ ...tasks, [date]: tasksForDate });
    }
  };

  return (
    <div>
      <Calendar
        onChange={() => {}}
        value={new Date()}
        tileContent={({ date }) => {
          if (tasks[date.toDateString()]) {
            return tasks[date.toDateString()].map((description, index) => (
              <div
                key={index}
                onClick={() => handleDeleteTask(date.toDateString(), index)}
                style={{ cursor: 'pointer' }}
              >
                {description}
              </div>
            ));
          }
        }}
        onClickDay={(date) => {
          const description = prompt('Enter task description:');
          handleAddTask(date.toDateString(), description);
        }}
      />
    </div>
  );
}

export default MyCalender;
