
import "./EventDetail.css";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import RSVPModal from "../components/RSVPModal";
import committees from "../data/committees";
import { API_BASE } from "../api";

function EventDetail() {
  const { id } = useParams();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showRSVP, setShowRSVP] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/events/${id}`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Event not found");
        }

        setEvent(data);
      } catch (err) {
        console.error(err);
        setEvent(null);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading) {
    return (
      <div className="ed-page">
        <p style={{ padding: "120px", color: "white" }}>
          Loading event...
        </p>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="ed-page">
        <p style={{ padding: "120px", color: "white" }}>
          Event not found
        </p>
      </div>
    );
  }
  const now = new Date();

const isEventOver =
  new Date(event.endDate) < now || event.status === "Completed";


  const committee = committees.find(
    (c) => c.id === event.committeeId
  );

  return (
    <div className="ed-page">
      {/* HERO */}
      <section
        className="ed-hero"
        style={{
          backgroundImage: `
            linear-gradient(
              to bottom,
              rgba(0,0,0,0.3),
              rgba(0,0,0,0.9)
            ),
            url(${event.image})
          `,
        }}
      >
        <div className="ed-hero-content">
          <Link to="/events" className="ed-back-link">
            ← Back to Events
          </Link>

          <div className="ed-tags">
            <span className="ed-tag ed-status">
              {event.status}
            </span>

            <span
              className="ed-tag"
              style={{ background: committee?.gradient }}
            >
              {event.committee}
            </span>
          </div>

          <h1 className="ed-title">{event.title}</h1>

          <div className="ed-meta">
            <span>
              📅 {event.date?.day} {event.date?.monthYear}
            </span>
            <span>⏰ {event.time || "—"}</span>
            <span>📍 {event.venue}</span>
          </div>

          <div className="ed-actions">
         <button
  className="ed-primary-btn"
  disabled={isEventOver}
  onClick={() => {
    if (!isEventOver) setShowRSVP(true);
  }}
>
  {isEventOver ? "RSVP Closed" : "RSVP Now"}
</button>

            {/* {
              showRSVP && (
                <RSVPModal event ={event} onClose={() => setShowRSVP(false)}/>
              )
            } */}

            <button className="ed-secondary-btn">
              Share
            </button>
          </div>
        </div>
      </section>

      {/* BODY */}
      <div className="ed-container">
        <div className="ed-left">
          <div className="ed-card">
            <h2>About This Event</h2>
            <p>{event.description}</p>
          </div>

          <div className="ed-card">
            <h2>Updates</h2>

            {event.updates && event.updates.length > 0 ? (
              event.updates.map((u, idx) => (
                <div key={idx} className="ed-update">
                  <span className="ed-update-type">
                    {u.type}
                  </span>
                  <p>{u.message}</p>
                  <small>
                    {new Date(u.createdAt).toLocaleString()}
                  </small>
                </div>
              ))
            ) : (
              <p className="ed-muted">
                No updates yet. Stay tuned.
              </p>
            )}
          </div>
        </div>

        <div className="ed-right">
          <div className="ed-side-card">
            <h3>Organized By</h3>
            <p>{event.committee} Committee</p>

            <Link
              to={`/committees/${event.committeeId}`}
              className="ed-committee-link"
            >
              View Committee →
            </Link>
          </div>

          <div className="ed-side-card">
            <h3>RSVPs</h3>
            <p>{event.rsvps?.length || 0} people attending</p>
          </div>
        </div>
      </div>

      {/* RSVP MODAL */}
      {showRSVP && (
        <RSVPModal
          event={event}
          onClose={() => setShowRSVP(false)}
        />
      )}
    </div>
  );
}

export default EventDetail;
