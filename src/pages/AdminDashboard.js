// import "./AdminDashboard.css";

// export default function AdminDashboard() {
//   return (
//     <div className="admin-dashboard">
//       <div className="dashboard-container">

//         {/* HEADER */}
//         <div className="dashboard-header">
//           <div>
//             <h1>Dashboard</h1>
//             <p>
//               Welcome back, <span>Technical Admin</span> · Technical
//             </p>
//           </div>

//           <button className="create-btn">+ Create Event</button>
//         </div>

//         {/* STATS */}
//         <div className="stats-grid">
//           <div className="stat-card">
//             <h2>1</h2>
//             <p>Total Events</p>
//           </div>

//           <div className="stat-card">
//             <h2>1</h2>
//             <p>Upcoming</p>
//           </div>

//           <div className="stat-card">
//             <h2>0</h2>
//             <p>Total RSVPs</p>
//           </div>

//           <div className="stat-card">
//             <h2>0</h2>
//             <p>Followers</p>
//           </div>
//         </div>

//         {/* EVENTS */}
//         <div className="events-section">
//           <h2>Your Events</h2>

//           <div className="event-row">
//             <div className="event-info">
//               <img
//                 src="https://images.unsplash.com/photo-1518770660439-4636190af475"
//                 alt="event"
//               />
//               <div>
//                 <h3>Tech Talk: AI & Future</h3>
//                 <p>JAN 2026 · Auditorium · 0 RSVPs</p>
//               </div>
//             </div>

//             <div className="event-actions">
//               <span>✓</span>
//               <span>🔔</span>
//               <span>✏️</span>
//               <span>🗑</span>
//             </div>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }
// import "./AdminDashboard.css";
// import { useState } from "react";
// import eventsData from "../data/events";
// import CreateEventModal from "../components/CreateEventModal";

// export default function AdminDashboard() {
//   // committee is fixed here (can change for other dashboards)
//   const committee = "Technical";
//   const committeeId = "technical";

//   // const [events, setEvents] = useState(
//   //   eventsData.filter((e) => e.committeeId === committeeId)
//   // );
//   const [events, setEvents] = useState(() => {
//   const storedEvents = localStorage.getItem("events");
//   const allEvents = storedEvents ? JSON.parse(storedEvents) : eventsData;
//   return allEvents.filter((e) => e.committeeId === committeeId);
// });

//   const [showModal, setShowModal] = useState(false);

//   // const handleCreateEvent = (newEvent) => {
//   //   setEvents((prev) => [newEvent, ...prev]);
//   // };
//   const handleCreateEvent = (newEvent) => {
//   const storedEvents = localStorage.getItem("events");
//   const allEvents = storedEvents ? JSON.parse(storedEvents) : eventsData;

//   const updatedEvents = [newEvent, ...allEvents];
//   localStorage.setItem("events", JSON.stringify(updatedEvents));

//   // update dashboard view (committee-specific)
//   setEvents(updatedEvents.filter(e => e.committeeId === committeeId));
// };


//   return (
//     <div className="admin-dashboard">
//       <div className="dashboard-container">

//         {/* HEADER */}
//         <div className="dashboard-header">
//           <div>
//             <h1>Dashboard</h1>
//             <p>
//               Welcome back, <span>{committee} Admin</span> · {committee}
//             </p>
//           </div>

//           <button
//             className="create-btn"
//             onClick={() => setShowModal(true)}
//           >
//             + Create Event
//           </button>
//         </div>

//         {/* STATS */}
//         <div className="stats-grid">
//           <div className="stat-card">
//             <h2>{events.length}</h2>
//             <p>Total Events</p>
//           </div>

//           <div className="stat-card">
//             <h2>
//               {
//                 events.filter(
//                   (e) => new Date(e.startDate) > new Date()
//                 ).length
//               }
//             </h2>
//             <p>Upcoming</p>
//           </div>

//           <div className="stat-card">
//             <h2>0</h2>
//             <p>Total RSVPs</p>
//           </div>

//           <div className="stat-card">
//             <h2>0</h2>
//             <p>Followers</p>
//           </div>
//         </div>

//         {/* EVENTS */}
//         <div className="events-section">
//           <h2>Your Events</h2>

//           {events.map((event) => (
//             <div className="event-row" key={event.id}>
//               <div className="event-info">
//                 <img src={event.image} alt={event.title} />
//                 <div>
//                   <h3>{event.title}</h3>
//                   <p>
//                     {event.date?.monthYear || "JAN 2026"} ·{" "}
//                     {event.venue} · 0 RSVPs
//                   </p>
//                 </div>
//               </div>

//               <div className="event-actions">
//                 <span title="Mark as Completed">✓</span>
//                 <span title="Post Announcement">🔔</span>
//                 <span title="Edit Event">✏️</span>
//                 <span title="Delete Event">🗑</span>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* CREATE EVENT MODAL */}
//         <CreateEventModal
//           isOpen={showModal}
//           onClose={() => setShowModal(false)}
//           onCreate={handleCreateEvent}
//           committee={committee}
//           committeeId={committeeId}
//         />

//       </div>
//     </div>
//   );
// }
// import "./AdminDashboard.css";
// import { useState } from "react";
// import { useAuth } from "../context/AuthContext";
// // import eventsData from "../data/events";
// import CreateEventModal from "../components/CreateEventModal";

// export default function AdminDashboard() {
//   const { auth } = useAuth();

//   // ✅ REAL committee from login
//   const committeeId = auth?.committee;

//   const committeeMap = {
//     technical: "Technical",
//     cultural: "Cultural",
//     sports: "Sports",
//     literary: "Literary",
//     entrepreneurship: "Entrepreneurship",
//   };
//  const [events, setEvents] = useState([]);
//   const committee = committeeMap[committeeId] || "Admin";
// const handleCreateEvent = () => {
//   alert("Backend event creation coming next");
// };

//   // ✅ Load committee-specific events
//   // const [events, setEvents] = useState(() => {
//   //   const storedEvents = localStorage.getItem("events");
//   //   const allEvents = storedEvents ? JSON.parse(storedEvents) : eventsData;
//   //   return allEvents.filter((e) => e.committeeId === committeeId);
//   // });

//   const [showModal, setShowModal] = useState(false);

//   // ✅ Create event (committee-aware)
//   // const handleCreateEvent = (newEvent) => {
//   //   const storedEvents = localStorage.getItem("events");
//   //   const allEvents = storedEvents ? JSON.parse(storedEvents) : eventsData;

//   //   const updatedEvents = [newEvent, ...allEvents];
//   //   localStorage.setItem("events", JSON.stringify(updatedEvents));

//   //   setEvents(updatedEvents.filter((e) => e.committeeId === committeeId));
//   // };

//   return (
//     <div className="admin-dashboard">
//       <div className="dashboard-container">

//         {/* HEADER */}
//         <div className="dashboard-header">
//           <div>
//             <h1>Dashboard</h1>
//             <p>
//               Welcome back, <span>{committee} Admin</span> · {committee}
//             </p>
//           </div>

//           <button
//             className="create-btn"
//             onClick={() => setShowModal(true)}
//           >
//             + Create Event
//           </button>
//         </div>

//         {/* STATS */}
//         <div className="stats-grid">
//           <div className="stat-card">
//             <h2>{events.length}</h2>
//             <p>Total Events</p>
//           </div>

//           <div className="stat-card">
//             <h2>
//               {
//                 events.filter(
//                   (e) => new Date(e.startDate) > new Date()
//                 ).length
//               }
//             </h2>
//             <p>Upcoming</p>
//           </div>

//           <div className="stat-card">
//             <h2>0</h2>
//             <p>Total RSVPs</p>
//           </div>

//           <div className="stat-card">
//             <h2>0</h2>
//             <p>Followers</p>
//           </div>
//         </div>

//         {/* EVENTS */}
//         <div className="events-section">
//           <h2>Your Events</h2>

//           {events.map((event) => (
//             <div className="event-row" key={event.id}>
//               <div className="event-info">
//                 <img src={event.image} alt={event.title} />
//                 <div>
//                   <h3>{event.title}</h3>
//                   <p>
//                     {event.date?.monthYear || "JAN 2026"} ·{" "}
//                     {event.venue} · 0 RSVPs
//                   </p>
//                 </div>
//               </div>

//               <div className="event-actions">
//                 <span title="Mark as Completed">✓</span>
//                 <span title="Post Announcement">🔔</span>
//                 <span title="Edit Event">✏️</span>
//                 <span title="Delete Event">🗑</span>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* CREATE EVENT MODAL */}
//         <CreateEventModal
//           isOpen={showModal}
//           onClose={() => setShowModal(false)}
//           onCreate={handleCreateEvent}
//           committee={committee}
//           committeeId={committeeId}
//         />

//       </div>
//     </div>
//   );
// }
// import "./AdminDashboard.css";
// import { useState, useEffect } from "react";
// import { useAuth } from "../context/AuthContext";
// import CreateEventModal from "../components/CreateEventModal";

// export default function AdminDashboard() {
//   const { auth } = useAuth();

//   // 🔐 Auth data
//   const committeeId = auth?.committee;
//   const token = auth?.token;

//   const committeeMap = {
//     technical: "Technical Committee",
//     cultural: "Cultural Committee",
//     sports: "Sports Committee",
//     literary: "Literary Committee",
//     entrepreneurship: "Entrepreneurship Committee",
//   };

//   const committee= committeeMap[auth?.committeeId] || "Admin";

//   // 📦 Events from backend
//   const [events, setEvents] = useState([]);
//   const [showModal, setShowModal] = useState(false);

//   // 📥 FETCH EVENTS FOR LOGGED-IN ADMIN
//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         const res = await fetch("http://localhost:5000/api/events/my", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (!res.ok) {
//           throw new Error("Failed to fetch events");
//         }

//         const data = await res.json();
//         setEvents(data);
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     if (token) fetchEvents();
//   }, [token]);

//   // ➕ CREATE EVENT (BACKEND)
//   const handleCreateEvent = async (newEvent) => {
//     try {
//       const res = await fetch("http://localhost:5000/api/events", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(newEvent),
//       });

//       if (!res.ok) {
//         throw new Error("Failed to create event");
//       }

//       const createdEvent = await res.json();
//       setEvents((prev) => [createdEvent, ...prev]);
//     } catch (err) {
//       console.error(err);
//       alert("Event creation failed");
//     }
//   };

//   return (
//     <div className="admin-dashboard">
//       <div className="dashboard-container">

//         {/* HEADER */}
//         <div className="dashboard-header">
//           <div>
//             <h1>Dashboard</h1>
//             <p>
//               Welcome back, <span>{committee} Admin</span> · {committee}
//             </p>
//           </div>

//           <button
//             className="create-btn"
//             onClick={() => setShowModal(true)}
//           >
//             + Create Event
//           </button>
//         </div>

//         {/* STATS */}
//         <div className="stats-grid">
//           <div className="stat-card">
//             <h2>{events.length}</h2>
//             <p>Total Events</p>
//           </div>

//           <div className="stat-card">
//             <h2>
//               {events.filter(
//                 (e) => new Date(e.startDate) > new Date()
//               ).length}
//             </h2>
//             <p>Upcoming</p>
//           </div>

//           <div className="stat-card">
//             <h2>0</h2>
//             <p>Total RSVPs</p>
//           </div>

//           <div className="stat-card">
//             <h2>0</h2>
//             <p>Followers</p>
//           </div>
//         </div>

//         {/* EVENTS */}
//         <div className="events-section">
//           <h2>Your Events</h2>

//           {events.length === 0 ? (
//             <p style={{ color: "#94a3b8" }}>No events created yet.</p>
//           ) : (
//             events.map((event) => (
//               <div className="event-row" key={event._id}>
//                 <div className="event-info">
//                   <img src={event.image} alt={event.title} />
//                   <div>
//                     <h3>{event.title}</h3>
//                     <p>
//                       {new Date(event.startDate).toDateString()} ·{" "}
//                       {event.venue} · 0 RSVPs
//                     </p>
//                   </div>
//                 </div>

//                 <div className="event-actions">
//                   <span title="Mark as Completed">✓</span>
//                   <span title="Post Announcement">🔔</span>
//                   <span title="Edit Event">✏️</span>
//                   <span title="Delete Event">🗑</span>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>

//         {/* CREATE EVENT MODAL */}
//         <CreateEventModal
//           isOpen={showModal}
//           onClose={() => setShowModal(false)}
//           onCreate={handleCreateEvent}
//           committee={committee}
//           committeeId={committeeId}
//         />
//       </div>
//     </div>
//   );
// }
import "./AdminDashboard.css";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import CreateEventModal from "../components/CreateEventModal";


export default function AdminDashboard() {
  const { auth } = useAuth();

  // 🔐 Auth data
  const committeeId = auth?.committeeId;
  const token = auth?.token;

  const committeeMap = {
    technical: "Technical Committee",
    cultural: "Cultural Committee",
    sports: "Sports Committee",
    literary: "Literary Committee",
    entrepreneurship: "Entrepreneurship Committee",
  };

  const committee = committeeMap[committeeId] || "Admin";

  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  // 🔔 Announcement modal states
const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);
const [selectedEventId, setSelectedEventId] = useState(null);
const [announcementType, setAnnouncementType] = useState("Update");
const [announcementText, setAnnouncementText] = useState("");

  // 📥 FETCH EVENTS
  // const fetchEvents = async () => {
  //   try {
  //     const res = await fetch("http://localhost:5000/api/events/my", {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     const data = await res.json();
  //     setEvents(data);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };
  const fetchEvents = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/events/my", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    // 🛡️ SAFETY CHECK
    if (Array.isArray(data)) {
      setEvents(data);
    } else {
      console.error("Events is not array:", data);
      setEvents([]);
    }
  } catch (err) {
    console.error(err);
    setEvents([]);
  }
};


  useEffect(() => {
    if (token) fetchEvents();
  }, [token]);

  // ➕ CREATE EVENT
  const handleCreateEvent = async (newEvent) => {
    try {
      const res = await fetch("http://localhost:5000/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newEvent),
      });

      const createdEvent = await res.json();
      setEvents((prev) => [createdEvent, ...prev]);
    } catch (err) {
      alert("Event creation failed");
    }
  };

  // ✅ MARK COMPLETED
  const markCompleted = async (id) => {
    await fetch(`http://localhost:5000/api/events/${id}/complete`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    fetchEvents();
  };

  // 🗑 DELETE EVENT
  const deleteEvent = async (id) => {
    if (!window.confirm("Delete this event?")) return;

    await fetch(`http://localhost:5000/api/events/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchEvents();
  };

const totalRSVPs = Array.isArray(events)
  ? events.reduce(
      (sum, e) => sum + (e.rsvps?.length || 0),
      0
    )
  : 0;

  // 🔔 POST ANNOUNCEMENT
// const handlePostAnnouncement = async () => {
//   if (!announcementText.trim()) {
//     alert("Announcement message cannot be empty");
//     return;
//   }

//   try {
//     await fetch(
//       `http://localhost:5000/api/events/${selectedEventId}/update`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           type: announcementType,
//           message: announcementText,
//         }),
//       }
    // );

    // reset + close
//     setAnnouncementText("");
//     setAnnouncementType("Update");
//     setShowAnnouncementModal(false);

//     fetchEvents();
//   } catch (error) {
//     alert("Failed to post announcement");
//     console.error(error);
//   }
// };
async function handlePostAnnouncement() {
  if (!announcementText.trim()) {
    alert("Announcement message cannot be empty");
    return;
  }

  try {
    await fetch(
      `http://localhost:5000/api/events/${selectedEventId}/update`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          type: announcementType,
          message: announcementText,
        }),
      }
    );

    setAnnouncementText("");
    setAnnouncementType("Update");
    setShowAnnouncementModal(false);
    fetchEvents();
  } catch (error) {
    console.error(error);
    alert("Failed to post announcement");
  }
}

  return (
    <div className="admin-dashboard">
      <div className="dashboard-container">
        {/* HEADER */}
        <div className="dashboard-header">
          <div>
            <h1>Dashboard</h1>
            <p>
              Welcome back, <span>{committee} Admin</span>
            </p>
          </div>

          <button className="create-btn" onClick={() => setShowModal(true)}>
            + Create Event
          </button>
        </div>

        {/* STATS */}
        <div className="stats-grid">
          <div className="stat-card">
  <h2>{events.length}</h2>
  <p>Total Events</p>
</div>

<div className="stat-card">
  <h2>
    {
      events.filter((e) => {
        const isFuture =
          new Date(e.startDate) > new Date();

        const notCompleted =
          e.status?.toLowerCase().trim() !== "completed";

        return isFuture && notCompleted;
      }).length
    }
  </h2>
  <p>Upcoming</p>
</div>


          <div className="stat-card">
            <h2>{totalRSVPs}</h2>
            <p>Total RSVPs</p>
          </div>

          <div className="stat-card">
            <h2>—</h2>
            <p>Followers</p>
          </div>
        </div>

        {/* EVENTS */}
        <div className="events-section">
          <h2>Your Events</h2>

          {events.length === 0 ? (
            <p style={{ color: "#94a3b8" }}>No events created yet.</p>
          ) : (
            events.map((event) => (
              <div className="event-row" key={event._id}>
                <div className="event-info">
                  <img src={event.image} alt={event.title} />
                  <div>
                    <h3>{event.title}</h3>
                    <p>
                      {new Date(event.startDate).toDateString()} ·{" "}
                      {event.venue} · {event.rsvps?.length || 0} RSVPs
                    </p>
                  </div>
                </div>

                <div className="event-actions">
                  <span
  title={
    event.status === "Completed"
      ? "Event already completed"
      : "Mark as Completed"
  }
  style={{
    cursor: event.status === "Completed" ? "not-allowed" : "pointer",
    opacity: event.status === "Completed" ? 0.5 : 1,
  }}
  onClick={() =>
    event.status !== "Completed" && markCompleted(event._id)
  }
>
  ✓
</span>
                  <span title="Post Announcement" onClick={() =>{
                    setSelectedEventId(event._id);
                    setShowAnnouncementModal(true);
                  }}>🔔</span>
                  <span title="Edit Event">✏️</span>
                  <span
                    title="Delete Event"
                    onClick={() => deleteEvent(event._id)}
                  >
                    🗑
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        <CreateEventModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onCreate={handleCreateEvent}
          committee={committee}
          committeeId={committeeId}
        />
      </div>
      {showAnnouncementModal && (
  <div className="modal-overlay">
    <div className="announcement-modal">
      <h2>Post Announcement</h2>

      <div className="form-group">
        <label>Type</label>
        <select
          value={announcementType}
          onChange={(e) => setAnnouncementType(e.target.value)}
        >
          <option value="General">General</option>
          <option value="Update">Update</option>
          <option value="Result">Result</option>
          <option value="Postponement">Postponement</option>
        </select>
      </div>

      <div className="form-group">
        <label>Message</label>
        <textarea
          placeholder="Enter announcement..."
          value={announcementText}
          onChange={(e) => setAnnouncementText(e.target.value)}
        />
      </div>

      <div className="modal-actions">
        <button
          className="cancel-btn"
          onClick={() => setShowAnnouncementModal(false)}
        >
          Cancel
        </button>

        <button
          className="post-btn"
          onClick={handlePostAnnouncement}
        >
          Post
        </button>
      </div>
    </div>
  </div>
)}


    </div>
  );
}