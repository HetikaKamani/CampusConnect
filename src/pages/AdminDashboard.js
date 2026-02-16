import "./AdminDashboard.css";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import CreateEventModal from "../components/CreateEventModal";
import { API_BASE } from "../api";


export default function AdminDashboard() {
  const { auth } = useAuth();

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

const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);
const [selectedEventId, setSelectedEventId] = useState(null);
const [announcementType, setAnnouncementType] = useState("Update");
const [announcementText, setAnnouncementText] = useState("");
const [editingEvent, setEditingEvent] = useState(null);
const [isEditMode, setIsEditMode] = useState(false);

const fetchEvents = async () => {
  try {
    const res = await fetch(`${API_BASE}/api/events/my`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

  
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

  const handleCreateEvent = async (newEvent) => {
    try {
      const res = await fetch(`${API_BASE}/api/events`, {
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


  const markCompleted = async (id) => {
    await fetch(`${API_BASE}/api/events/${id}/complete`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    fetchEvents();
  };

  const deleteEvent = async (id) => {
    if (!window.confirm("Delete this event?")) return;

    await fetch(`${API_BASE}/api/events/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchEvents();
  };
  const handleUpdateEvent = async (id, updatedData) => {
  await fetch(`${API_BASE}/api/events/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updatedData),
  });

  fetchEvents();
};


const totalRSVPs = Array.isArray(events)
  ? events.reduce(
      (sum, e) => sum + (e.rsvps?.length || 0),
      0
    )
  : 0;


async function handlePostAnnouncement() {
  if (!announcementText.trim()) {
    alert("Announcement message cannot be empty");
    return;
  }

  try {
    await fetch(
      `${API_BASE}/api/events/${selectedEventId}/update`,
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
                  {/* <span title="Edit Event">✏️</span> */}
                  {/* <span
  title="Edit Event"
  onClick={() => {
    setEditingEvent(event);
    setIsEditMode(true);
    setShowModal(true);
  }}
>
  ✏️
</span> */}
<span
  title={
    event.status === "Completed"
      ? "Completed events cannot be edited"
      : "Edit Event"
  }
  style={{
    cursor: event.status === "Completed" ? "not-allowed" : "pointer",
    opacity: event.status === "Completed" ? 0.5 : 1,
  }}
  onClick={() => {
    if (event.status === "Completed") return;

    setEditingEvent(event);
    setIsEditMode(true);
    setShowModal(true);
  }}
>
  ✏️
</span>


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

        {/* <CreateEventModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onCreate={handleCreateEvent}
          committee={committee}
          committeeId={committeeId}
        /> */}
        <CreateEventModal
  isOpen={showModal}
  onClose={() => {
    setShowModal(false);
    setEditingEvent(null);
    setIsEditMode(false);
  }}
  onCreate={handleCreateEvent}
  onUpdate={handleUpdateEvent}
  committee={committee}
  committeeId={committeeId}
  isEditMode={isEditMode}
  editingEvent={editingEvent}
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