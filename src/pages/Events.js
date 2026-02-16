import "./Events.css";
import EventCard from "../components/EventCard";
import { useState, useEffect } from "react";
import { API_BASE } from "../api";
function Events() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [committee, setCommittee] = useState("all");
  const [category, setCategory] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all"); 

  const now = new Date();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/events`);
        const data = await res.json();
        setEvents(data);
      } catch (err) {
        console.error("Failed to fetch events", err);
      }
    };

    fetchEvents();
  }, []);


  const clearFilters = () => {
    setSearch("");
    setCommittee("all");
    setCategory("all");
    setStatusFilter("all");
  };


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

    // const eventEnded = new Date(event.endDate) < now;

    // let statusMatch = true;
    // if (statusFilter === "upcoming") statusMatch = !eventEnded;
    // if (statusFilter === "past") statusMatch = eventEnded;
      const startDate = new Date(event.startDate);
  const endDate = event.endDate
    ? new Date(event.endDate)
    : new Date(event.startDate);
    let statusMatch = true;

if (statusFilter === "upcoming") {
  statusMatch = now< startDate;
}

if (statusFilter === "past") {
  statusMatch = now > endDate;
}

if (statusFilter === "happening now") {
    statusMatch = now >= startDate && now <= endDate;
  }

    return (
      searchMatch &&
      committeeMatch &&
      categoryMatch &&
      statusMatch
    );
  });

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
            <option value="happening now">Happening Now</option>
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
