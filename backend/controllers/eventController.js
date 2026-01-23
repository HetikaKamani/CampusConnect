// // import Event from "../models/Event.js";

// // /**
// //  * @desc    Create new event (ADMIN only)
// //  * @route   POST /api/events
// //  * @access  Private (Admin)
// //  */
// // export const createEvent = async (req, res) => {
// //   try {
// //     const {
// //       title,
// //       description,
// //       date,
// //       startDate,
// //       endDate,
// //       time,
// //       venue,
// //       committee,
// //       committeeId,
// //       category,
// //       tags,
// //       image,
// //     } = req.body;

// //     // 🔐 admin comes from auth middleware (JWT)
// //     const adminId = req.admin.id;

// //     const event = await Event.create({
// //       title,
// //       description,
// //       date,
// //       startDate,
// //       endDate,
// //       time,
// //       venue,
// //       committee,
// //       committeeId,
// //       category,
// //       tags,
// //       image,
// //       createdBy: adminId,
// //     });

// //     res.status(201).json(event);
// //   } catch (error) {
// //     console.error("Create Event Error:", error);
// //     res.status(500).json({ message: "Failed to create event" });
// //   }
// // };

// // /**
// //  * @desc    Get events of logged-in admin's committee
// //  * @route   GET /api/events/my
// //  * @access  Private (Admin)
// //  */
// // export const getMyCommitteeEvents = async (req, res) => {
// //   try {
// //     const committeeId = req.admin.committeeId;

// //     const events = await Event.find({ committeeId }).sort({
// //       startDate: -1,
// //     });

// //     res.json(events);
// //   } catch (error) {
// //     console.error("Fetch Committee Events Error:", error);
// //     res.status(500).json({ message: "Failed to fetch events" });
// //   }
// // };

// // /**
// //  * @desc    Get ALL events (Students / Public)
// //  * @route   GET /api/events
// //  * @access  Public
// //  */
// // export const getAllEvents = async (req, res) => {
// //   try {
// //     const events = await Event.find().sort({ startDate: -1 });
// //     res.json(events);
// //   } catch (error) {
// //     console.error("Fetch All Events Error:", error);
// //     res.status(500).json({ message: "Failed to fetch events" });
// //   }
// // };
// import Event from "../models/Event.js";

// /**
//  * ======================================================
//  * CREATE EVENT (ADMIN)
//  * POST /api/events
//  * ======================================================
//  */
// export const createEvent = async (req, res) => {
//   try {
//     const {
//       title,
//       description,
//       date,
//       startDate,
//       endDate,
//       time,
//       venue,
//       committee,
//       committeeId,
//       category,
//       tags,
//       image,
//     } = req.body;

//     const adminId = req.admin.id; // from JWT middleware

//     const event = await Event.create({
//       title,
//       description,
//       date,
//       startDate,
//       endDate,
//       time,
//       venue,
//       committee,
//       committeeId,
//       category,
//       tags,
//       image,
//       createdBy: adminId,
//     });

//     res.status(201).json(event);
//   } catch (error) {
//     console.error("Create Event Error:", error);
//     res.status(500).json({ message: "Failed to create event" });
//   }
// };

// /**
//  * ======================================================
//  * GET EVENTS OF LOGGED-IN COMMITTEE (ADMIN)
//  * GET /api/events/my
//  * ======================================================
//  */
// // export const getMyCommitteeEvents = async (req, res) => {
// //   try {
// //     const committeeId = req.admin.committeeId;

// //     const events = await Event.find({ committeeId }).sort({
// //       startDate: -1,
// //     });

// //     res.json(events);
// //   } catch (error) {
// //     console.error("Fetch Committee Events Error:", error);
// //     res.status(500).json({ message: "Failed to fetch events" });
// //   }
// // };
// export const getMyCommitteeEvents = async (req, res) => {
//   try {
//     console.log("➡️ getMyCommitteeEvents called");

//     console.log("req.admin:", req.admin);

//     if (!req.admin) {
//       return res.status(401).json({ message: "Admin not attached" });
//     }

//     console.log("committeeId:", req.admin.committeeId);

//     const events = await Event.find({
//       committeeId: req.admin.committeeId,
//     });

//     console.log("events found:", events.length);

//     res.json(events);
//   } catch (error) {
//     console.error("❌ getMyCommitteeEvents ERROR:", error);
//     res.status(500).json({ message: "Failed to fetch event" });
//   }
// };




// /**
//  * ======================================================
//  * GET ALL EVENTS (STUDENT / PUBLIC)
//  * GET /api/events
//  * ======================================================
//  */
// export const getAllEvents = async (req, res) => {
//   try {
//     const events = await Event.find().sort({ startDate: -1 });
//     res.json(events);
//   } catch (error) {
//     console.error("Fetch All Events Error:", error);
//     res.status(500).json({ message: "Failed to fetch events" });
//   }
// };

// /**
//  * ======================================================
//  * UPDATE EVENT (ADMIN – OWN COMMITTEE ONLY)
//  * PUT /api/events/:id
//  * ======================================================
//  */
// export const updateEvent = async (req, res) => {
//   try {
//     const event = await Event.findOneAndUpdate(
//       {
//         _id: req.params.id,
//         committeeId: req.admin.committeeId,
//       },
//       req.body,
//       { new: true }
//     );

//     if (!event) {
//       return res.status(404).json({ message: "Event not found" });
//     }

//     res.json(event);
//   } catch (error) {
//     console.error("Update Event Error:", error);
//     res.status(500).json({ message: "Failed to update event" });
//   }
// };

// /**
//  * ======================================================
//  * DELETE EVENT (ADMIN – OWN COMMITTEE ONLY)
//  * DELETE /api/events/:id
//  * ======================================================
//  */
// export const deleteEvent = async (req, res) => {
//   try {
//     const event = await Event.findOneAndDelete({
//       _id: req.params.id,
//       committeeId: req.admin.committeeId,
//     });

//     if (!event) {
//       return res.status(404).json({ message: "Event not found" });
//     }

//     res.json({ message: "Event deleted successfully" });
//   } catch (error) {
//     console.error("Delete Event Error:", error);
//     res.status(500).json({ message: "Failed to delete event" });
//   }
// };

// /**
//  * ======================================================
//  * MARK EVENT AS COMPLETED
//  * PATCH /api/events/:id/complete
//  * ======================================================
//  */
// export const markEventCompleted = async (req, res) => {
//   try {
//     const event = await Event.findOneAndUpdate(
//       {
//         _id: req.params.id,
//         committeeId: req.admin.committeeId,
//       },
//       { status: "Completed" },
//       { new: true }
//     );

//     if (!event) {
//       return res.status(404).json({ message: "Event not found" });
//     }

//     res.json(event);
//   } catch (error) {
//     console.error("Mark Completed Error:", error);
//     res.status(500).json({ message: "Failed to update event status" });
//   }
// };

// /**
//  * ======================================================
//  * ADD EVENT UPDATE (ANNOUNCEMENT / RESULT / POSTPONEMENT)
//  * POST /api/events/:id/update
//  * ======================================================
//  */
// export const addEventUpdate = async (req, res) => {
//   try {
//     const event = await Event.findOne({
//       _id: req.params.id,
//       committeeId: req.admin.committeeId,
//     });

//     if (!event) {
//       return res.status(404).json({ message: "Event not found" });
//     }

//     event.updates.push({
//       message: req.body.message,
//     });

//     await event.save();
//     res.json(event);
//   } catch (error) {
//     console.error("Add Event Update Error:", error);
//     res.status(500).json({ message: "Failed to add event update" });
//   }
// };

// /**
//  * ======================================================
//  * RSVP FOR EVENT (STUDENT / PUBLIC)
//  * POST /api/events/:id/rsvp
//  * ======================================================
//  */
// export const rsvpEvent = async (req, res) => {
//   try {
//     const { name, email } = req.body;

//     if (!name || !email) {
//       return res.status(400).json({ message: "Name and email required" });
//     }

//     const event = await Event.findById(req.params.id);
//     if (!event) {
//       return res.status(404).json({ message: "Event not found" });
//     }

//     const alreadyRSVPed = event.rsvps.some(
//       (r) => r.email === email.toLowerCase()
//     );

//     if (alreadyRSVPed) {
//       return res.status(400).json({ message: "Already RSVP’d" });
//     }

//     event.rsvps.push({ name, email });
//     await event.save();

//     res.status(200).json({ message: "RSVP successful" });
//   } catch (err) {
//     res.status(500).json({ message: "RSVP failed" });
//   }
// };

// export const postAnnouncement = async (req, res) => {
//   try {
//     const { type, message } = req.body;

//     const event = await Event.findById(req.params.id);
//     if (!event) {
//       return res.status(404).json({ message: "Event not found" });
//     }

//     event.updates.push({ type, message });
//     await event.save();

//     res.json(event);
//   } catch (error) {
//     res.status(500).json({ message: "Failed to post announcement" });
//   }
// };
// // @desc Get single event by ID (Public)
// // @route GET /api/events/:id
// export const getEventById = async (req, res) => {
//   try {
//     const event = await Event.findById(req.params.id);

//     if (!event) {
//       return res.status(404).json({ message: "Event not found" });
//     }

//     res.json(event);
//   } catch (error) {
//     res.status(500).json({ message: "Failed to fetch event" });
//   }
// };
// import Event from "../models/Event.js";

// export const rsvpEvent = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { name, email } = req.body;

//     if (!name || !email) {
//       return res.status(400).json({ message: "Name and email required" });
//     }

//     const event = await Event.findById(id);
//     if (!event) {
//       return res.status(404).json({ message: "Event not found" });
//     }

//     // prevent duplicate RSVP
//     const alreadyRSVPed = event.rsvps.some(
//       (r) => r.email === email
//     );

//     if (alreadyRSVPed) {
//       return res
//         .status(400)
//         .json({ message: "You have already RSVPed" });
//     }

//     event.rsvps.push({ name, email });
//     await event.save();

//     res.status(200).json({
//       message: "RSVP successful",
//       rsvps: event.rsvps.length,
//     });
//   } catch (error) {
//     console.error("RSVP error:", error);
//     res.status(500).json({ message: "Failed to RSVP" });
//   }
// };
import Event from "../models/Event.js";

/**
 * ======================================================
 * CREATE EVENT (ADMIN)
 * POST /api/events
 * ======================================================
 */
export const createEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      date,
      startDate,
      endDate,
      time,
      venue,
      committee,
      committeeId,
      category,
      tags,
      image,
    } = req.body;

    const event = await Event.create({
      title,
      description,
      date,
      startDate,
      endDate,
      time,
      venue,
      committee,
      committeeId,
      category,
      tags,
      image,
      createdBy: req.admin.id,
    });

    res.status(201).json(event);
  } catch (error) {
    console.error("Create Event Error:", error);
    res.status(500).json({ message: "Failed to create event" });
  }
};

/**
 * ======================================================
 * GET EVENTS OF LOGGED-IN COMMITTEE (ADMIN)
 * GET /api/events/my
 * ======================================================
 */
export const getMyCommitteeEvents = async (req, res) => {
  try {
    const events = await Event.find({
      committeeId: req.admin.committeeId,
    }).sort({ startDate: -1 });

    res.json(events);
  } catch (error) {
    console.error("Fetch Committee Events Error:", error);
    res.status(500).json({ message: "Failed to fetch events" });
  }
};

/**
 * ======================================================
 * GET ALL EVENTS (PUBLIC)
 * GET /api/events
 * ======================================================
 */
export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ startDate: -1 });
    res.json(events);
  } catch (error) {
    console.error("Fetch All Events Error:", error);
    res.status(500).json({ message: "Failed to fetch events" });
  }
};

/**
 * ======================================================
 * GET SINGLE EVENT BY ID (PUBLIC)
 * GET /api/events/:id
 * ======================================================
 */
export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json(event);
  } catch (error) {
    console.error("Fetch Event Error:", error);
    res.status(500).json({ message: "Failed to fetch event" });
  }
};

/**
 * ======================================================
 * DELETE EVENT (ADMIN – OWN COMMITTEE)
 * DELETE /api/events/:id
 * ======================================================
 */
export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findOneAndDelete({
      _id: req.params.id,
      committeeId: req.admin.committeeId,
    });

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("Delete Event Error:", error);
    res.status(500).json({ message: "Failed to delete event" });
  }
};

/**
 * ======================================================
 * MARK EVENT AS COMPLETED (ADMIN)
 * PATCH /api/events/:id/complete
 * ======================================================
 */
export const markEventCompleted = async (req, res) => {
  try {
    const event = await Event.findOneAndUpdate(
      {
        _id: req.params.id,
        committeeId: req.admin.committeeId,
      },
      { status: "Completed" },
      { new: true }
    );

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json(event);
  } catch (error) {
    console.error("Mark Completed Error:", error);
    res.status(500).json({ message: "Failed to update event status" });
  }
};

/**
 * ======================================================
 * POST ANNOUNCEMENT / UPDATE (ADMIN)
 * POST /api/events/:id/update
 * ======================================================
 */
export const postAnnouncement = async (req, res) => {
  try {
    const { type, message } = req.body;

    const event = await Event.findOne({
      _id: req.params.id,
      committeeId: req.admin.committeeId,
    });

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    event.updates.push({ type, message });
    await event.save();

    res.json(event);
  } catch (error) {
    console.error("Post Announcement Error:", error);
    res.status(500).json({ message: "Failed to post announcement" });
  }
};

/**
 * ======================================================
 * RSVP FOR EVENT (PUBLIC)
 * POST /api/events/:id/rsvp
 * ======================================================
 */
export const rsvpEvent = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "Name and email required" });
    }

    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    const alreadyRSVPed = event.rsvps.some(
      (r) => r.email === email.toLowerCase()
    );

    if (alreadyRSVPed) {
      return res
        .status(400)
        .json({ message: "You have already RSVPed" });
    }

    event.rsvps.push({
      name,
      email: email.toLowerCase(),
    });

    await event.save();

    res.status(200).json({
      message: "RSVP successful",
      totalRSVPs: event.rsvps.length,
    });
  } catch (error) {
    console.error("RSVP Error:", error);
    res.status(500).json({ message: "Failed to RSVP" });
  }
};

