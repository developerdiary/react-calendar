import React from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

function Events(props) {
  const currentMonthView = props.selectedMonth;
  const currentSelectedDay = props.selectedDay;
  const monthEvents = props.selectedMonthEvents;
  const removeEvent = props.removeEvent;

  const monthEventsRendered = monthEvents.map((event, i) => {
    return (
      <div
        key={event.title}
        className="event-container"
        onClick={() => removeEvent(i)}
      >
        <ReactCSSTransitionGroup
          component="div"
          className="animated-time"
          transitionName="time"
          transitionAppear={true}
          transitionAppearTimeout={500}
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
        >
          <div className="event-time event-attribute">
            {event.date.format("HH:mm")}
          </div>
        </ReactCSSTransitionGroup>
        <ReactCSSTransitionGroup
          component="div"
          className="animated-title"
          transitionName="title"
          transitionAppear={true}
          transitionAppearTimeout={500}
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
        >
          <div className="event-title event-attribute">{event.title}</div>
        </ReactCSSTransitionGroup>
      </div>
    );
  });

  const dayEventsRendered = monthEventsRendered.filter((event) =>
    event.props.children[0].props.children.isSame(currentSelectedDay, "day")
  );

  return <div className="day-events">{dayEventsRendered}</div>;
}


export default Events