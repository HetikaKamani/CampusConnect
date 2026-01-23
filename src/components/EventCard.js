// // import "./EventCard.css";
// // import { Link } from "react-router-dom";
// // import committees from "../data/committees";

// // function EventCard({ event }) {
// //   const committee=committees.find(
// //     (c) => c.id ===event.committeeId
// //   );
// //   return (
// //     <div className="event-card">

// //       {/* IMAGE SECTION */}
// //       <div
// //         className="event-image"
// //         style={{ backgroundImage: `url(${event.image})` }}
// //       >
// //         <div className="event-overlay"></div>

// //         <span className="badge status">{event.status}</span>
// //         <span className="badge committee">{event.committee}</span>

// //         <div className="event-date">
// //           <span className="day">{event.date.day}</span>
// //           <span className="month">{event.date.monthYear}</span>
// //         </div>
// //       </div>

// //       {/* CONTENT */}
// //       <div className="event-content">
// //         <h3 className="event-title">{event.title}</h3>

// //         <p className="event-description">
// //           {event.description}
// //         </p>

// //         <div className="event-meta">
// //           <span>🕒 {event.time}</span>
// //           <span>📍 {event.venue}</span>
// //         </div>

// //         <div className="event-tags">
// //           {event.tags.map((tag) => (
// //             <span key={tag}>#{tag}</span>
// //           ))}
// //         </div>

// //         <Link to={`/events/${event.id}`} className="event-link">
// //           View Details →
// //         </Link>
// //       </div>

// //     </div>
// //   );
// // }

// // export default EventCard;
// // import "./EventCard.css";
// // import { Link } from "react-router-dom";
// // import committees from "../data/committees";

// // function EventCard({ event }) {
// //   const committee = committees.find(
// //     (c) => c.id === event.committeeId
// //   );

// //   return (
// //     <div
// //       className={`event-card-wrapper ${committee?.color}`}>
// //       <div className="event-card">
// //       style={{
// //         border: `2px solid ${committee?.gradient ? "transparent" : ""}`,
// //         boxShadow: `0 0 20px ${committee?.color ? "" : ""}`,
// //       }}
// //       onMouseEnter={(e) => {
// //         e.currentTarget.style.boxShadow =
// //           `0 0 25px ${committee?.color || "#ec4899"}`;
// //       }}
// //       onMouseLeave={(e) => {
// //         e.currentTarget.style.boxShadow = "";
// //       }}
// //     >
// //       {/* IMAGE SECTION */}
// //       <div
// //         className="event-image"
// //         style={{ backgroundImage: `url(${event.image})` }}
// //       >
// //         <div className="event-overlay"></div>

// //         <span className="badge status">{event.status}</span>

// //         {/* ✅ COMMITTEE TAG (DYNAMIC COLOR) */}
// //         <span
// //           className="badge committee"
// //           style={{ background: committee?.gradient }}
// //         >
// //           {event.committee}
// //         </span>

// //         <div className="event-date">
// //           <span className="day">{event.date.day}</span>
// //           <span className="month">{event.date.monthYear}</span>
// //         </div>
// //       </div>

// //       {/* CONTENT */}
// //       <div className="event-content">
// //         <h3 className="event-title">{event.title}</h3>

// //         <p className="event-description">
// //           {event.description}
// //         </p>

// //         <div className="event-meta">
// //           <span>🕒 {event.time}</span>
// //           <span>📍 {event.venue}</span>
// //         </div>

// //         <div className="event-tags">
// //           {event.tags.map((tag) => (
// //             <span key={tag}>#{tag}</span>
// //           ))}
// //         </div>

// //         <Link to={`/events/${event.id}`} className="event-link">
// //           View Details →
// //         </Link>
// //       </div>
// //     </div>

// //   );
// // }

// // export default EventCard;
// import "./EventCard.css";
// import { Link } from "react-router-dom";
// import committees from "../data/committees";

// function EventCard({ event }) {
//   const committee = committees.find(
//     (c) => c.id === event.committeeId
//   );

//   return (
//     <div className={`event-card-wrapper ${committee?.color}`}>
//       <div className="event-card">

//         {/* IMAGE SECTION */}
//         <div
//           className="event-image"
//           style={{ backgroundImage: `url(${event.image})` }}
//         >
//           <div className="event-overlay"></div>

//           <span className="badge status">{event.status}</span>

//           {/* Committee badge with gradient */}
//           <span
//             className="badge committee"
//             style={{ background: committee?.gradient }}
//           >
//             {event.committee}
//           </span>

//           <div className="event-date">
//             <span className="day">{event.date.day}</span>
//             <span className="month">{event.date.monthYear}</span>
//           </div>
//         </div>

//         {/* CONTENT */}
//         <div className="event-content">
//           <h3 className="event-title">{event.title}</h3>

//           <p className="event-description">
//             {event.description}
//           </p>

//           <div className="event-meta">
//             <span>🕒 {event.time}</span>
//             <span>📍 {event.venue}</span>
//           </div>

//           <div className="event-tags">
//             {event.tags.map((tag) => (
//               <span key={tag}>#{tag}</span>
//             ))}
//           </div>

//           <Link to={`/events/${event.id}`} className="event-link">
//             View Details →
//           </Link>
//         </div>

//       </div>
//     </div>
//   );
// }

// export default EventCard;

import "./EventCard.css";
import { Link } from "react-router-dom";
import committees from "../data/committees";

function EventCard({ event }) {
  const committee = committees.find(
    (c) => c.id === event.committeeId
  );

  return (
    <div className={`event-card-wrapper ${committee?.color || ""}`}>
      <div className="event-card">
        {/* IMAGE SECTION */}
        <div
          className="event-image"
          style={{ backgroundImage: `url(${event.image})` }}
        >
          <div className="event-overlay"></div>

          <span className="badge status">
            {event.status || "Upcoming"}
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
