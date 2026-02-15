import "./Calendar.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const committeeColors = {
  technical: "#6366f1",
  cultural: "#ec4899",
  sports: "#22c55e",
  literary: "#f97316",
  entrepreneurship: "#10b981",
};

function Calendar() {
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/events")
      .then((res) => res.json())
      .then((data) => Array.isArray(data) && setEvents(data))
      .catch(console.error);
  }, []);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const changeMonth = (dir) => {
    setCurrentDate(new Date(year, month + dir, 1));
    setSelectedDate(null);
  };

  const isSameDay = (d1, d2) =>
    d1 &&
    d2 &&
    d1.getDate() === d2.getDate() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getFullYear() === d2.getFullYear();

  const eventsOnDay = (day) =>
    events.filter((e) => {
      const d = new Date(e.startDate);
      return (
        d.getDate() === day &&
        d.getMonth() === month &&
        d.getFullYear() === year
      );
    });

  const selectedDayEvents = selectedDate
    ? events.filter((e) => {
        const d = new Date(e.startDate);
        return isSameDay(d, selectedDate);
      })
    : [];

  return (
    <div className="calendar-page">
      <h1 className="calendar-title">
        Event <span>Calendar</span>
      </h1>
      <p className="calendar-sub">
        View all campus events organized by date
      </p>

      <div className="calendar-layout">
        {/* CALENDAR */}
        <div className="calendar-box">
          <div className="calendar-header">
            <button onClick={() => changeMonth(-1)}>‹ Previous</button>
            <h2>
              {currentDate.toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
            </h2>
            <button onClick={() => changeMonth(1)}>Next ›</button>
          </div>

          <div className="calendar-grid">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
              <div key={d} className="calendar-day-name">
                {d}
              </div>
            ))}

            {[...Array(firstDay)].map((_, i) => (
              <div key={`empty-${i}`} />
            ))}

            {[...Array(daysInMonth)].map((_, i) => {
              const day = i + 1;
              const dayEvents = eventsOnDay(day);
              const dateObj = new Date(year, month, day);

              return (
                <div
                  key={day}
                  className={`calendar-day ${
                    isSameDay(dateObj, selectedDate) ? "active" : ""
                  }`}
                  onClick={() => setSelectedDate(dateObj)}
                >
                  <span>{day}</span>

                  <div className="event-dots">
                    {dayEvents.map((e) => (
                      <span
                        key={e._id}
                        className="event-dot"
                        style={{
                          backgroundColor:
                            committeeColors[e.committeeId] || "#6366f1",
                        }}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* SIDE PANEL */}
        <div className="calendar-side">
          {selectedDate ? (
            <>
              <h3>
                📅{" "}
                {selectedDate.toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </h3>

              {selectedDayEvents.length === 0 ? (
                <p className="no-events">No events on this day</p>
              ) : (
                selectedDayEvents.map((event) => (
                  <div
                    key={event._id}
                    className="calendar-event-card"
                    onClick={() => navigate(`/events/${event._id}`)}
                  >
                    <span
                      className="event-badge"
                      style={{
                        backgroundColor:
                          committeeColors[event.committeeId] || "#6366f1",
                      }}
                    >
                      {event.committee}
                    </span>

                    <h4>{event.title}</h4>
                    <p>
                      {new Date(event.startDate).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}{" "}
                      • {event.venue}
                    </p>
                  </div>
                ))
              )}
            </>
          ) : (
            <div className="no-date">
              <p>Click on a date to see events</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Calendar;
