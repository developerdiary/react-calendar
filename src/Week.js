import React from "react";

function Week(props) {
  const days = [];
  let date = props.previousCurrentNextView;
  const currentMonthView = props.currentMonthView;
  const selected = props.selected;
  const select = props.select;
  const monthEvents = props.monthEvents;

  for (let i = 0; i < 7; i++) {
    let dayHasEvents = false;

    for (let j = 0; j < monthEvents.length; j++) {
      if (monthEvents[j].date.isSame(date, "day")) {
        dayHasEvents = true;
      }
    }

    const day = {
      name: date.format("dd").substring(0, 1),
      number: date.date(),
      isCurrentMonth: date.month() === currentMonthView.month(),
      isToday: date.isSame(new Date(), "day"),
      date: date,
      hasEvents: dayHasEvents,
    };

    days.push(<Day day={day} selected={selected} select={select} />);
    date = date.clone();
    date.add(1, "d");
  }

  return <div className="row week">{days}</div>;
}

export default Week;