import "./CreateEventModal.css";
import { useState,useEffect} from "react";

const CreateEventModal = ({
  isOpen,
  onClose,
  onCreate,
  onUpdate,      
  committee,
  committeeId,
  isEditMode,   
  editingEvent,  
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
    useEffect(() => {
  if (isEditMode && editingEvent) {
    setFormData({
      title: editingEvent.title || "",
      description: editingEvent.description || "",
      category: editingEvent.category || "",
      venue: editingEvent.venue || "",
      startDate: editingEvent.startDate?.slice(0, 16),
      endDate: editingEvent.endDate?.slice(0, 16),
      tags: editingEvent.tags?.join(", ") || "",
      image: editingEvent.image || "",
    });
  }
}, [isEditMode, editingEvent]);

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

   if (isEditMode) {
  onUpdate(editingEvent._id, newEvent);
} else {
  onCreate(newEvent);
}

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
          <h2>{isEditMode ? "Edit Event" : "Create New Event"}</h2>

          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="modal-body">
          <label>Title</label>
          <input name="title" value={formData.title} onChange={handleChange} />

          <label>Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} />

          <div className="row">
            <div>
              <label>Category</label>
              <select name="category" value={formData.category} onChange={handleChange}>
                <option value="">Select category</option>
                <option value="cultural">Cultural</option>
                <option value="technical">Technical</option>
                <option value="sports">Sports</option>
                <option value="seminar">Seminar</option>
              </select>
            </div>

            <div>
              <label>Venue</label>
              <input name="venue" value={formData.venue} onChange={handleChange} />
            </div>
          </div>

          <div className="row">
            <div>
              <label>Start Date & Time</label>
              <input
                type="datetime-local"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>End Date & Time</label>
              <input
                type="datetime-local"
                name="endDate"
                 value={formData.endDate}
                onChange={handleChange}
              />
            </div>
          </div>

          <label>Tags (comma separated)</label>
          <input
            name="tags"
              value={formData.tags}
            placeholder="coding, hackathon"
            onChange={handleChange}
          />

          <label>Poster URL (optional)</label>
          <input
            name="image"
              value={formData.image}
            placeholder="https://example.com/poster.jpg"
            onChange={handleChange}
          />
        </div>

        <div className="modal-footer">
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
          {/* <button className="create-btn" onClick={handleSubmit}>
            Create Event
          </button> */}
          <button className="create-btn" onClick={handleSubmit}>
  {isEditMode ? "Update Event" : "Create Event"}
</button>

        </div>
      </div>
    </div>
  );
};

export default CreateEventModal;
