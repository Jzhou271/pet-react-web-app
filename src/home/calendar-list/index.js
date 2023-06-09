import React, { useEffect, useState } from "react";
import EventSummaryItem from "./calendar-list-item.js";
import { useSelector, useDispatch } from "react-redux";
import { findEventsThunk } from "../../services/event-thunks";

const Calendar = () => {
  const { events } = useSelector((state) => state.events);
  const dispatch = useDispatch();
  const [numEventsDisplayed, setNumEventsDisplayed] = useState(3);
  useEffect(() => {
    dispatch(findEventsThunk());
  }, [dispatch]);
  const sortedEvents = [...events].sort((a, b) => new Date(a.time) - new Date(b.time));
  const toggleShowAllEvents = () => {
    setNumEventsDisplayed((prevNumEvents) =>
        prevNumEvents === 3 ? events.length : 3
    );
  };
  return (
      <ul className="list-group">
        <li className="list-group-item pt-3 pb-0 bg-light">
          <h4>Coming Event..</h4>
        </li>
        {sortedEvents.slice(0, numEventsDisplayed).map((details) => (
            <EventSummaryItem key={details._id} post={details} />
        ))}
        {events.length > 3 && (
            <li
                className="list-group-item text-center bg-light"
                onClick={toggleShowAllEvents}
                style={{ cursor: "pointer" }}>
              {numEventsDisplayed === 3 ? "More event" : "Close"}
            </li>
        )}
      </ul>
  );
};
export default Calendar;