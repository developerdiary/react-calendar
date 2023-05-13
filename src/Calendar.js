import React, { useState } from 'react';
import './Calendar.css';

const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const Calendar = () => {
  const [date, setDate] = useState(new Date());

  const handlePrevYearClick = () => {
    setDate(new Date(date.getFullYear() - 1, date.getMonth(), 1));
  };

  const handleNextYearClick = () => {
    setDate(new Date(date.getFullYear() + 1, date.getMonth(), 1));
  };

  const handleMonthClick = (month) => {
    setDate(new Date(date.getFullYear(), month, 1));
  };

  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

  const dates = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyCells = Array.from({ length: firstDayOfMonth }, () => null);
  const cells = emptyCells.concat(dates);

  const rows = [];
  let cellsRow = [];

  cells.forEach((cell, index) => {
    if (index % 7 === 0 && cellsRow.length) {
      rows.push(cellsRow);
      cellsRow = [];
    }
    cellsRow.push(cell);
  });

  if (cellsRow.length < 7) {
    const remainingCells = 7 - cellsRow.length;
    cellsRow = cellsRow.concat(Array.from({ length: remainingCells }, () => null));
  }
  rows.push(cellsRow);

  return (
    <div className="calendar-container">

      <div className="year-container">
        <button className="nav-button" onClick={handlePrevYearClick}>{'<'}</button>
        <div className="year">{date.toLocaleString('default', { year: 'numeric' })}</div>
        <button className="nav-button" onClick={handleNextYearClick}>{'>'}</button>
      </div>
      

      <div className="weekday-container">
        <table>
          <thead>
            <tr>
              {weekdays.map((weekday) => (
                <th className="date" key={weekday}>{weekday}</th>
              ))}
            </tr>
          </thead>
        </table>
      </div>

      <div className="dates-container">
        <table>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className={`date ${cell === null ? 'empty' : ''} ${cell === date.getDate() ? 'selected' : ''}`}
                    onClick={() => cell !== null && setDate(new Date(date.getFullYear(), date.getMonth(), cell))}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="months-container">
        {new Array(12).fill(null).map((_, index) => (
          <div
            key={index}
            className={`month-option ${date.getMonth() === index ? 'selected' : ''}`}
            onClick={() => handleMonthClick(index)}
          >
            {new Date(date.getFullYear(), index, 1).toLocaleString('default', { month: 'short' })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;