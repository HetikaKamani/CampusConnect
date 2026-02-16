import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Updates.css";
import { API_BASE } from "../api";

export default function Updates() {
  const [updates, setUpdates] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/events`);
        const events = await res.json();

        const allUpdates = events.flatMap((event) =>
          event.updates.map((u) => ({
            ...u,
            eventTitle: event.title,
            eventId: event._id,
            committee: event.committee,
          }))
        );

        setUpdates(allUpdates.reverse());
      } catch (err) {
        console.error(err);
      }
    };

    fetchUpdates();
  }, []);

  const filtered =
    filter === "All"
      ? updates
      : updates.filter((u) => u.type === filter);

  return (
    <div className="updates-page">
      {/* HEADER */}
      <div className="updates-header">
        <h1>
          Updates & <span>Announcements</span>
        </h1>
        <p>Stay updated with the latest news from all campus committees</p>
      </div>

      {/* FILTER */}
      <div className="updates-filter">
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All Types</option>
          <option value="General">General</option>
          <option value="Update">Update</option>
          <option value="Result">Result</option>
          <option value="Postponement">Postponement</option>
         
        </select>
      </div>

      {/* LIST */}
      <div className="updates-list">
        {filtered.length === 0 ? (
          <p className="no-updates">No updates found.</p>
        ) : (
          filtered.map((u, i) => (
            <div className="update-card" key={i}>
              <div className="update-meta">
                <span className="committee">{u.committee}</span>
                <span className={`type ${u.type.toLowerCase()}`}>
                  {u.type}
                </span>
                <span className="time">
                  {new Date(u.createdAt).toLocaleString()}
                </span>
              </div>

              <h3>{u.message}</h3>

              <Link to={`/events/${u.eventId}`} className="view-link">
                View Event → {u.eventTitle}
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
