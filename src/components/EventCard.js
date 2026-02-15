import "./EventCard.css";
import { Link } from "react-router-dom";
import committees from "../data/committees";

function EventCard({ event }) {
    const now = new Date();
  const startDate = new Date(event.startDate);
  const endDate = event.endDate
    ? new Date(event.endDate)
    : new Date(event.startDate);

  let statusText = "Upcoming";
  let statusClass = "upcoming";

  if (now >= startDate && now <= endDate) {
    statusText = "Happening Now";
    statusClass = "live";
  } else if (now > endDate) {
    statusText = "Completed";
    statusClass = "completed";
  }

  const committee = committees.find(
    (c) => c.id === event.committeeId
  );

  return (
    <div className={`event-card-wrapper ${committee?.color || ""}`}>
      <div className="event-card">
       
        <div
          className="event-image"
          style={{ backgroundImage: `url(${event.image})` }}
        >
          <div className="event-overlay"></div>

          {/* <span className="badge status">
            {event.status || "Upcoming"}
          </span> */}
          <span className={`badge status ${statusClass}`}>
  {statusText}
</span>


          <span
            className="badge committee"
            style={{ background: committee?.gradient }}
          >
            {event.committee}
          </span>

          {event.date && (
            <div className="event-date">
              <span className="day">{event.date.day}</span>
              <span className="month">{event.date.monthYear}</span>
            </div>
          )}
        </div>

        {/* CONTENT */}
        <div className="event-content">
          <h3 className="event-title">{event.title}</h3>

          <p className="event-description">
            {event.description}
          </p>

          <div className="event-meta">
            {event.time && <span>🕒 {event.time}</span>}
            <span>📍 {event.venue}</span>
          </div>

          <div className="event-tags">
            {event.tags?.map((tag) => (
              <span key={tag}>#{tag}</span>
            ))}
          </div>

          <Link
            to={`/events/${event._id}`}
            className="event-link"
          >
            View Details →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default EventCard;
