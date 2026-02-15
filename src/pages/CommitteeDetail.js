
// import { useParams, Link } from "react-router-dom";
// import { useEffect, useState } from "react";
// import "./CommitteeDetail.css";
// import committees from "../data/committees";
// import EventCard from "../components/EventCard";

// function CommitteeDetail() {
//   const { id } = useParams();

//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const committee = committees.find((c) => c.id === id);


//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         const res = await fetch("http://localhost:5000/api/events");
//         const data = await res.json();
//         setEvents(data);
//       } catch (error) {
//         console.error("Failed to fetch events", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEvents();
//   }, []);

//   const pastCommitteeEvents = events.filter(
//     (event) =>
//       event.committeeId === id &&
//       event.status === "Completed"
//   );


//   if (!committee) {
//     return (
//       <div style={{ padding: "120px", color: "white" }}>
//         Committee not found
//       </div>
//     );
//   }

//   return (
//     <div className="committee-details">

//       {/* HERO SECTION */}
//       <section
//         className="committee-hero"
//         style={{ background: committee.gradient }}
//       >
//         <Link to="/committees" className="back-link">
//           ← Back to Committees
//         </Link>

//         <div className="committee-hero-content">
//           <div className="committee-icon">
//             {committee.name.charAt(0)}
//           </div>

//           <h1 className="committee-name">
//             {committee.name}
//           </h1>

//           <p className="committee-desc">
//             {committee.description}
//           </p>

//           <div className="committee-stats">
//             <span>👥 0 followers</span>
//             <span>📅 {pastCommitteeEvents.length} events</span>
//           </div>

//           <button className="follow-btn">Follow</button>
//         </div>
//       </section>

//       {/* EVENTS SECTION */}
//       <section className="committee-events">
//         <h2>Past Events</h2>

//         {loading ? (
//           <p style={{ color: "#94a3b8" }}>Loading events...</p>
//         ) : pastCommitteeEvents.length === 0 ? (
//           <p style={{ color: "#94a3b8" }}>
//             No completed events yet.
//           </p>
//         ) : (
//           <div className="events-grid">
//             {pastCommitteeEvents.map((event) => (
//               <EventCard key={event._id} event={event} />
//             ))}
//           </div>
//         )}
//       </section>

//     </div>
//   );
// }

// export default CommitteeDetail;
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./CommitteeDetail.css";
import committees from "../data/committees";
import EventCard from "../components/EventCard";

function CommitteeDetail() {
  const { id } = useParams();

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔍 NEW STATES
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all"); // all | upcoming | past

  const committee = committees.find((c) => c.id === id);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/events");
        const data = await res.json();
        setEvents(data);
      } catch (error) {
        console.error("Failed to fetch events", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (!committee) {
    return (
      <div style={{ padding: "120px", color: "white" }}>
        Committee not found
      </div>
    );
  }

  //FILTER LOGIC (CORE)
  const now = new Date();

  const committeeEvents = events.filter(
    (event) => event.committeeId === id
  );

// const filteredEvents = committeeEvents
//   .filter((event) => {
//     const eventEnded = new Date(event.endDate) < now;

//     if (statusFilter === "upcoming") return !eventEnded;
//     if (statusFilter === "past") return eventEnded;

//     return true; // all
//   })
//   .filter((event) =>
//     event.title.toLowerCase().includes(searchTerm.toLowerCase())
//   );
// 

const filteredEvents = committeeEvents
  .filter((event) => {
    const start = new Date(event.startDate);
    const end = event.endDate
      ? new Date(event.endDate)
      : start;

    if (statusFilter === "upcoming") {
      return now < start;
    }

    if (statusFilter === "happening now") {
      return now >= start && now <= end;
    }

    if (statusFilter === "past") {
      return now > end;
    }

    return true; // all
  })
  .filter((event) =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );



  return (
    <div className="committee-details">

      {/* HERO SECTION */}
      <section
        className="committee-hero"
        style={{ background: committee.gradient }}
      >
        <Link to="/committees" className="back-link">
          ← Back to Committees
        </Link>

        <div className="committee-hero-content">
          <div className="committee-icon">
            {committee.name.charAt(0)}
          </div>

          <h1 className="committee-name">{committee.name}</h1>

          <p className="committee-desc">{committee.description}</p>

          <div className="committee-stats">
            <span>👥 0 followers</span>
            <span>📅 {committeeEvents.length} events</span>
          </div>

          <button className="follow-btn">Follow</button>
        </div>
      </section>

      {/* EVENTS SECTION */}
      <section className="committee-events">
        <h2>Events</h2>

        {/* 🔍 SEARCH + FILTER BAR */}
        <div className="events-filters">
          <input
            type="text"
            placeholder="Search events or tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="events-search"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="events-filter"
          >
            <option value="all">All Events</option>
            <option value="upcoming">Upcoming</option>
            <option value="past">Past</option>
            <option value="happening now">Happening now</option>
          </select>
        </div>

        <p className="events-count">
          {filteredEvents.length} events found
        </p>

        {loading ? (
          <p style={{ color: "#94a3b8" }}>Loading events...</p>
        ) : filteredEvents.length === 0 ? (
          <p style={{ color: "#94a3b8" }}>
            No events match your search.
          </p>
        ) : (
          <div className="events-grid">
            {filteredEvents.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        )}
      </section>

    </div>
  );
}

export default CommitteeDetail;
