import "./CreateEventModal.css";
import { useState } from "react";

const CreateEventModal = ({
  isOpen,
  onClose,
  onCreate,
  committee,
  committeeId,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    venue: "",
    startDate: "",
    endDate: "",
    tags: "",
    image: "",
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 
  const formatDateForUI = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString();
    const monthYear = date
      .toLocaleString("en-US", { month: "short", year: "numeric" })
      .toUpperCase();
    return { day, monthYear };
  };

  const handleSubmit = () => {
    if (!formData.title || !formData.startDate) return;

    const uiDate = formatDateForUI(formData.startDate);

    const newEvent = {
      title: formData.title,
      description: formData.description,

      date: uiDate,
      startDate: formData.startDate,
      endDate: formData.endDate,

      venue: formData.venue,
      committee,
      committeeId,
      category: formData.category,

      tags: formData.tags
        ? formData.tags.split(",").map((t) => t.trim())
        : [],

      image:
        formData.image ||
        "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
    };

    onCreate(newEvent);
    onClose();

    setFormData({
      title: "",
      description: "",
      category: "",
      venue: "",
      startDate: "",
      endDate: "",
      tags: "",
      image: "",
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>Create New Event</h2>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="modal-body">
          <label>Title</label>
          <input name="title" onChange={handleChange} />

          <label>Description</label>
          <textarea name="description" onChange={handleChange} />

          <div className="row">
            <div>
              <label>Category</label>
              <select name="category" onChange={handleChange}>
                <option value="">Select category</option>
                <option value="cultural">Cultural</option>
                <option value="technical">Technical</option>
                <option value="sports">Sports</option>
                <option value="seminar">Seminar</option>
              </select>
            </div>

            <div>
              <label>Venue</label>
              <input name="venue" onChange={handleChange} />
            </div>
          </div>

          <div className="row">
            <div>
              <label>Start Date & Time</label>
              <input
                type="datetime-local"
                name="startDate"
                onChange={handleChange}
              />
            </div>

            <div>
              <label>End Date & Time</label>
              <input
                type="datetime-local"
                name="endDate"
                onChange={handleChange}
              />
            </div>
          </div>

          <label>Tags (comma separated)</label>
          <input
            name="tags"
            placeholder="coding, hackathon"
            onChange={handleChange}
          />

          <label>Poster URL (optional)</label>
          <input
            name="image"
            placeholder="https://example.com/poster.jpg"
            onChange={handleChange}
          />
        </div>

        <div className="modal-footer">
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button className="create-btn" onClick={handleSubmit}>
            Create Event
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateEventModal;
