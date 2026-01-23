// // import "./Events.css";
// // import events from "../data/events";
// // import EventCard from "../components/EventCard";
// // import { useState } from "react";

// // function Events() {
// //   const [search, setSearch] = useState("");
// //   const [committee, setCommittee] = useState("all");
// //   const [category, setCategory] = useState("all");
// //   const [showCompleted, setShowCompleted] = useState(false);

// //   return (
// //     <div className="events-page">
// //       <div className="events-container">

// //         {/* HEADER */}
// //         <div className="events-header">
// //           <h1>
// //             Discover <span>Events</span>
// //           </h1>
// //           <p>
// //             Browse upcoming and past events from all campus committees
// //           </p>
// //         </div>

// //         {/* FILTER BAR */}
// //         <div className="filters-bar">

// //           <input
// //             type="text"
// //             placeholder="Search events or tags..."
// //             value={search}
// //             onChange={(e) => setSearch(e.target.value)}
// //           />

// //           <select
// //             value={committee}
// //             onChange={(e) => setCommittee(e.target.value)}
// //           >
// //             <option value="all">All Committees</option>
// //             <option value="technical">Technical</option>
// //             <option value="cultural">Cultural</option>
// //             <option value="sports">Sports</option>
// //             <option value="literary">Literary</option>
// //           </select>

// //           <select
// //             value={category}
// //             onChange={(e) => setCategory(e.target.value)}
// //           >
// //             <option value="all">All Categories</option>
// //             <option value="workshop">Workshop</option>
// //             <option value="sports">Sports</option>
// //             <option value="cultural">Cultural</option>
// //           </select>

// //           <button
// //             className="completed-btn"
// //             onClick={() => setShowCompleted(!showCompleted)}
// //           >
// //             Show Completed
// //           </button>

// //         </div>

// //         {/* RESULTS COUNT */}
// //         <div className="results-count">
// //           {events.length} events found
// //         </div>

// //         {/* EVENTS GRID */}
// //         <div className="events-grid">
// //           {events.map((event) => (
// //             <EventCard key={event.id} event={event} />
// //           ))}
// //         </div>

// //       </div>
// //     </div>
// //   );
// // }

// // export default Events;

// import "./Events.css";
// // import events from "../data/events";
// import EventCard from "../components/EventCard";
// import { useState } from "react";



// function Events() {
// //   const [events, setEvents] = useState(() => {
// //   const storedEvents = localStorage.getItem("events");
// //   return storedEvents ? JSON.parse(storedEvents) : [];
// // });
//   const [search, setSearch] = useState("");
//   const [committee, setCommittee] = useState("all");
//   const [category, setCategory] = useState("all");
//   const [statusFilter, setStatusFilter] = useState("all"); 
//   // all | upcoming | past

//   const now = new Date();

//   /* ✅ CLEAR FILTERS (MUST BE HERE) */
//   const clearFilters = () => {
//     setSearch("");
//     setCommittee("all");
//     setCategory("all");
//     setStatusFilter("all");
//   };
  
//   /* ================= FILTER LOGIC ================= */

//   const filteredEvents = events.filter((event) => {
  
//     /* 1️⃣ Search (title + tags) */
//     const searchMatch =
//       event.title.toLowerCase().includes(search.toLowerCase()) ||
//       event.tags.some((tag) =>
//         tag.toLowerCase().includes(search.toLowerCase())
//       );

//     /* 2️⃣ Committee filter */
//     const committeeMatch =
//       committee === "all" || event.committeeId === committee;

//     /* 3️⃣ Category filter */
//     const categoryMatch =
//       category === "all" || event.category === category;

//     /* 4️⃣ Status filter (Upcoming / Past / All) */
//     const eventEnded = new Date(event.endDate) < now;

//     let statusMatch = true;
//     if (statusFilter === "upcoming") statusMatch = !eventEnded;
//     if (statusFilter === "past") statusMatch = eventEnded;

//     return (
//       searchMatch &&
//       committeeMatch &&
//       categoryMatch &&
//       statusMatch
//     );
//   });

//   /* =============================================== */

//   return (
//     <div className="events-page">
//       <div className="events-container">

//         {/* HEADER */}
//         <div className="events-header">
//           <h1>
//             Discover <span>Events</span>
//           </h1>
//           <p>
//             Browse upcoming and past events from all campus committees
//           </p>
//         </div>

//         {/* FILTER BAR */}
//         <div className="filters-bar">

//           <input
//             type="text"
//             placeholder="Search events or tags..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />

//           <select
//             value={committee}
//             onChange={(e) => setCommittee(e.target.value)}
//           >
//             <option value="all">All Committees</option>
//             <option value="technical">Technical</option>
//             <option value="cultural">Cultural</option>
//             <option value="literary">Literary</option>
//             <option value="sports">Sports</option>
//             <option value="entrepreneurship">Entrepreneurship</option>
            
//             <option value="">Sports</option>
//           </select>

//           <select
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//           >
//             <option value="all">All Categories</option>
//             <option value="sports">Sports</option>
//             <option value="cultural">Cultural</option>
//             <option value="seminar">Seminar</option>
//             <option value="workshop">Workshop</option>
//             <option value="competition">Competition</option>
//             <option value="fest">Fest</option>
//           </select>

//           <select
//             value={statusFilter}
//             onChange={(e) => setStatusFilter(e.target.value)}
//           >
//             <option value="all">All Events</option>
//             <option value="upcoming">Upcoming</option>
//             <option value="past">Past</option>
//           </select>

//           {/* ✅ CLEAR FILTERS BUTTON */}
//           <button
//             className="completed-btn"
//             onClick={clearFilters}
//           >
//             Clear Filters
//           </button>

//         </div>
     

//         {/* RESULTS COUNT */}
//         <div className="results-count">
//           {filteredEvents.length} events found
//         </div>

//         {/* EVENTS GRID */}
//         <div className="events-grid">
//           {filteredEvents.length === 0 ? (
//             <p style={{ color: "#94a3b8" }}>
//               No events match the selected filters.
//             </p>
//           ) : (
//             filteredEvents.map((event) => (
//               <EventCard key={event.id} event={event} />
//             ))
//           )}
//         </div>

//       </div>
//     </div>
//   );
// }

// export default Events;

import "./Events.css";
import EventCard from "../components/EventCard";
import { useState, useEffect } from "react";

function Events() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [committee, setCommittee] = useState("all");
  const [category, setCategory] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all"); // all | upcoming | past

  const now = new Date();

  // 📥 FETCH EVENTS FROM BACKEND
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/events");
        const data = await res.json();
        setEvents(data);
      } catch (err) {
        console.error("Failed to fetch events", err);
      }
    };

    fetchEvents();
  }, []);

  /* ✅ CLEAR FILTERS */
  const clearFilters = () => {
    setSearch("");
    setCommittee("all");
    setCategory("all");
    setStatusFilter("all");
  };

  /* ================= FILTER LOGIC ================= */
  const filteredEvents = events.filter((event) => {
    const searchMatch =
      event.title.toLowerCase().includes(search.toLowerCase()) ||
      event.tags?.some((tag) =>
        tag.toLowerCase().includes(search.toLowerCase())
      );

    const committeeMatch =
      committee === "all" || event.committeeId === committee;

    const categoryMatch =
      category === "all" || event.category === category;

    const eventEnded = new Date(event.endDate) < now;

    let statusMatch = true;
    if (statusFilter === "upcoming") statusMatch = !eventEnded;
    if (statusFilter === "past") statusMatch = eventEnded;

    return (
      searchMatch &&
      committeeMatch &&
      categoryMatch &&
      statusMatch
    );
  });
  /* =============================================== */

  return (
    <div className="events-page">
      <div className="events-container">
        {/* HEADER */}
        <div className="events-header">
          <h1>
            Discover <span>Events</span>
          </h1>
          <p>
            Browse upcoming and past events from all campus committees
          </p>
        </div>

        {/* FILTER BAR */}
        <div className="filters-bar">
          <input
            type="text"
            placeholder="Search events or tags..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={committee}
            onChange={(e) => setCommittee(e.target.value)}
          >
            <option value="all">All Committees</option>
            <option value="technical">Technical</option>
            <option value="cultural">Cultural</option>
            <option value="literary">Literary</option>
            <option value="sports">Sports</option>
            <option value="entrepreneurship">Entrepreneurship</option>
          </select>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="sports">Sports</option>
            <option value="cultural">Cultural</option>
            <option value="seminar">Seminar</option>
            <option value="workshop">Workshop</option>
            <option value="competition">Competition</option>
            <option value="fest">Fest</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Events</option>
            <option value="upcoming">Upcoming</option>
            <option value="past">Past</option>
          </select>

          <button className="completed-btn" onClick={clearFilters}>
            Clear Filters
          </button>
        </div>

        {/* RESULTS COUNT */}
        <div className="results-count">
          {filteredEvents.length} events found
        </div>

        {/* EVENTS GRID */}
        <div className="events-grid">
          {filteredEvents.length === 0 ? (
            <p style={{ color: "#94a3b8" }}>
              No events match the selected filters.
            </p>
          ) : (
            filteredEvents.map((event) => (
              <EventCard key={event._id} event={event} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Events;
