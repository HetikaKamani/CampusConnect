// // // export default CommitteeDetail;
// // import { useParams, Link } from "react-router-dom";
// // import "./CommitteeDetail.css";
// // import committees from "../data/committees";
// // import EventCard from "../components/EventCard";
// // import events from "../data/events";
// // const committeeEvents = events
// //   .filter(event => event.committee === "Cultural")
// //   .slice(0, 2); // only 2 cards
// // // const now = new Date();

// // // const pastCommitteeEvents = events.filter((event) => {
// // //   const isPast = new Date(event.endDate) < now;
// // //   const sameCommittee = event.committeeId === id;
// // //   return isPast && sameCommittee;
// // // });

// // function CommitteeDetail() {
// //   const { id } = useParams();

// //   // Find committee based on URL param
// //   const committee = committees.find((c) => c.id === id);

// //   // Safety check (in case of wrong URL)
// //   if (!committee) {
// //     return (
// //       <div style={{ padding: "120px", color: "white" }}>
// //         Committee not found
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="committee-details">

// //       {/* HERO SECTION */}
// //       <section
// //         className="committee-hero"
// //         style={{ background: committee.gradient }}
// //       >
// //         <Link to="/committees" className="back-link">
// //           ← Back to Committees
// //         </Link>

// //         <div className="committee-hero-content">
// //           <div className="committee-icon">
// //             {committee.name.charAt(0)}
// //           </div>

// //           <h1 className="committee-name">
// //             {committee.name}
// //           </h1>

// //           <p className="committee-desc">
// //             {committee.description}
// //           </p>

// //           <div className="committee-stats">
// //             <span>👥 0 followers</span>
// //             <span>📅 2 events</span>
// //           </div>

// //           <button className="follow-btn">Follow</button>
// //         </div>
// //       </section>

// //       {/* EVENTS SECTION */}
// //       <section className="committee-events">
// //         <h2>Past Events</h2>

// //         <div className="events-grid">
// //             <EventCard event={events[0]} />
// //   <EventCard event={events[1]} />
// //           {/* {committeeEvents.map(event => (
// //       <EventCard key={event.id} event={event} />
// //     ))} */}
// //           {/* <div className="committee-event-card">Event 1</div>
// //           <div className="committee-event-card">Event 2</div>
// //           <div className="committee-event-card">Event 3</div> */}
// //         </div>
// //       </section>

// //     </div>
// //   );
// // }

// // export default CommitteeDetail;
// import { useParams, Link } from "react-router-dom";
// import { useEffect, useState } from "react";
// import "./CommitteeDetail.css";
// import committees from "../data/committees";
// import EventCard from "../components/EventCard";

// function CommitteeDetail() {
//   const { id } = useParams();

//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Find committee based on URL param
//   const committee = committees.find((c) => c.id === id);

//   // Safety check
//   if (!committee) {
//     return (
//       <div style={{ padding: "120px", color: "white" }}>
//         Committee not found
//       </div>
//     );
//   }

//   // 🔥 FETCH REAL EVENTS
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

//   // 🔥 FILTER: completed + same committee
//   const pastCommitteeEvents = events.filter(
//     (event) =>
//       event.committeeId === id &&
//       event.status === "Completed"
//   );

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

  // 🔥 FIND COMMITTEE
  const committee = committees.find((c) => c.id === id);

  // 🔥 FETCH EVENTS (HOOK MUST ALWAYS RUN)
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

  // 🔥 FILTER: completed + same committee
  const pastCommitteeEvents = events.filter(
    (event) =>
      event.committeeId === id &&
      event.status === "Completed"
  );

  // ✅ SAFETY CHECK (AFTER HOOKS)
  if (!committee) {
    return (
      <div style={{ padding: "120px", color: "white" }}>
        Committee not found
      </div>
    );
  }

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

          <h1 className="committee-name">
            {committee.name}
          </h1>

          <p className="committee-desc">
            {committee.description}
          </p>

          <div className="committee-stats">
            <span>👥 0 followers</span>
            <span>📅 {pastCommitteeEvents.length} events</span>
          </div>

          <button className="follow-btn">Follow</button>
        </div>
      </section>

      {/* EVENTS SECTION */}
      <section className="committee-events">
        <h2>Past Events</h2>

        {loading ? (
          <p style={{ color: "#94a3b8" }}>Loading events...</p>
        ) : pastCommitteeEvents.length === 0 ? (
          <p style={{ color: "#94a3b8" }}>
            No completed events yet.
          </p>
        ) : (
          <div className="events-grid">
            {pastCommitteeEvents.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        )}
      </section>

    </div>
  );
}

export default CommitteeDetail;
