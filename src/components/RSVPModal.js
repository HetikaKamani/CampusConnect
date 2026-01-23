
import { useState } from "react";
import "./RSVPModal.css";

export default function RSVPModal({ event, onClose }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleRSVP = async () => {
    if (!name || !email) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        `http://localhost:5000/api/events/${event._id}/rsvp`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "RSVP failed");
        setLoading(false);
        return;
      }

      setSuccess(true);
    } catch (err) {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rsvp-overlay" onClick={onClose}>
      <div
        className="rsvp-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* CLOSE ICON */}
        <button className="rsvp-close" onClick={onClose}>
          ✕
        </button>

        {!success ? (
          <>
            <h2>RSVP for Event</h2>
            <p className="rsvp-event-title">{event.title}</p>

            <div className="rsvp-field">
              <label>Your Name</label>
              <input
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="rsvp-field">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="john@college.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button
              className="rsvp-btn"
              onClick={handleRSVP}
              disabled={loading}
            >
              {loading ? "Submitting..." : "Confirm RSVP"}
            </button>
          </>
        ) : (
          <>
            <div className="rsvp-success-icon">✓</div>
            <h2>You’re In!</h2>
            <p className="rsvp-success-text">
              We've sent a confirmation email to
              <br />
              <strong>{email}</strong>
            </p>

            <button className="rsvp-btn" onClick={onClose}>
              Close
            </button>
          </>
        )}
      </div>
    </div>
  );
}
