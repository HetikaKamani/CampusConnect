// import Event from "../models/Event.js";
// import {sendEmail}from "../utils/sendEmail.js";

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
//       createdBy: req.admin.id,
//     });

//     res.status(201).json(event);
//   } catch (error) {
//     console.error("Create Event Error:", error);
//     res.status(500).json({ message: "Failed to create event" });
//   }
// };

// export const getMyCommitteeEvents = async (req, res) => {
//   try {
//     const events = await Event.find({
//       committeeId: req.admin.committeeId,
//     }).sort({ startDate: -1 });

//     res.json(events);
//   } catch (error) {
//     console.error("Fetch Committee Events Error:", error);
//     res.status(500).json({ message: "Failed to fetch events" });
//   }
// };

// export const getAllEvents = async (req, res) => {
//   try {
//     const events = await Event.find().sort({ startDate: -1 });
//     res.json(events);
//   } catch (error) {
//     console.error("Fetch All Events Error:", error);
//     res.status(500).json({ message: "Failed to fetch events" });
//   }
// };


// export const getEventById = async (req, res) => {
//   try {
//     const event = await Event.findById(req.params.id);

//     if (!event) {
//       return res.status(404).json({ message: "Event not found" });
//     }

//     res.json(event);
//   } catch (error) {
//     console.error("Fetch Event Error:", error);
//     res.status(500).json({ message: "Failed to fetch event" });
//   }
// };

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


// export const postAnnouncement = async (req, res) => {
//   try {
//     const { type, message } = req.body;

//     const event = await Event.findOne({
//       _id: req.params.id,
//       committeeId: req.admin.committeeId,
//     });

//     if (!event) {
//       return res.status(404).json({ message: "Event not found" });
//     }

//     event.updates.push({ type, message });
//     await event.save();

//     res.json(event);
//   } catch (error) {
//     console.error("Post Announcement Error:", error);
//     res.status(500).json({ message: "Failed to post announcement" });
//   }
// };


// //   try {
// //     const { name, email } = req.body;

// //     if (!name || !email) {
// //       return res.status(400).json({ message: "Name and email required" });
// //     }

// //     const event = await Event.findById(req.params.id);
// //     if (!event) {
// //       return res.status(404).json({ message: "Event not found" });
// //     }

// //     const alreadyRSVPed = event.rsvps.some(
// //       (r) => r.email === email.toLowerCase()
// //     );

// //     if (alreadyRSVPed) {
// //       return res
// //         .status(400)
// //         .json({ message: "You have already RSVPed" });
// //     }

// //     event.rsvps.push({
// //       name,
// //       email: email.toLowerCase(),
// //     });

// //     await event.save();

// //     res.status(200).json({
// //       message: "RSVP successful",
// //       totalRSVPs: event.rsvps.length,
// //     });
// //   } catch (error) {
// //     console.error("RSVP Error:", error);
// //     res.status(500).json({ message: "Failed to RSVP" });
// //   }
// // };
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
//       return res
//         .status(400)
//         .json({ message: "You have already RSVPed" });
//     }

   
//     event.rsvps.push({
//       name,
//       email: email.toLowerCase(),
//     });

//     await event.save();

  

//     // Student confirmation email
//     // await sendEmail({
//     //   to: email,
//     //   subject: `RSVP Confirmed: ${event.title}`,
//     //   html: `
//     //     <h2>You're In! 🎉</h2>
//     //     <p>Hi <b>${name}</b>,</p>
//     //     <p>Your RSVP for <b>${event.title}</b> is confirmed.</p>
//     //     <p><b>Date:</b> ${new Date(event.startDate).toDateString()}</p>
//     //     <p><b>Venue:</b> ${event.venue}</p>
//     //     <br />
//     //     <p>– CampusConnect</p>
//     //   `,
//     // });

//     //  Admin notification email
//     // await sendEmail({
//     //   to: "hetikakamani@gmail.com",
//     //   subject: `New RSVP for ${event.title}`,
//     //   html: `
//     //     <h3>New RSVP Received</h3>
//     //     <p><b>Event:</b> ${event.title}</p>
//     //     <p><b>Name:</b> ${name}</p>
//     //     <p><b>Email:</b> ${email}</p>
//     //   `,
//     // });
//    try {
//   // Student email
//   await sendEmail({
//     to: email,
//     subject: `RSVP Confirmed: ${event.title}`,
//     html: `
//       <h2>You're In! 🎉</h2>
//       <p>Hi <b>${name}</b>,</p>
//       <p>Your RSVP for <b>${event.title}</b> is confirmed.</p>
//       <p><b>Date:</b> ${new Date(event.startDate).toDateString()}</p>
//       <p><b>Venue:</b> ${event.venue}</p>
//       <br />
//       <p>– CampusConnect</p>
//     `,
//   });

//   // Admin email
//   await sendEmail({
//     to: "hetikakamani@gmail.com",
//     subject: `New RSVP for ${event.title}`,
//     html: `
//       <h3>New RSVP Received</h3>
//       <p><b>Event:</b> ${event.title}</p>
//       <p><b>Name:</b> ${name}</p>
//       <p><b>Email:</b> ${email}</p>
//     `,
//   });

// } catch (emailError) {
//   console.error("Email failed but RSVP saved:", emailError);
// }

  

//     res.status(200).json({
//       message: "RSVP successful",
//       totalRSVPs: event.rsvps.length,
//     });
//   }catch (error) {
//   console.error("RSVP Error FULL:", error);
//   res.status(500).json({
//     message: "Failed to RSVP",
//     error: error.message,
//   });
// }

// };



// export const updateEvent = async (req, res) => {
//   try {
//     const updateData = { ...req.body };

//     if (updateData.startDate) {
//       const start = new Date(updateData.startDate);
//       const now = new Date();

//       if (start > now) {
//         updateData.status = "Upcoming";
//       }
//     }

//     const updatedEvent = await Event.findOneAndUpdate(
//       {
//         _id: req.params.id,
//         committeeId: req.admin.committeeId,
//       },
//       updateData,
//       { new: true }
//     );

//     if (!updatedEvent) {
//       return res.status(404).json({ message: "Event not found" });
//     }

//     res.json(updatedEvent);
//   } catch (error) {
//     console.error("Update Event Error:", error);
//     res.status(500).json({ message: "Failed to update event" });
//   }
// };

import Event from "../models/Event.js";
import { sendEmail } from "../utils/sendEmail.js";


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

export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ startDate: -1 });
    res.json(events);
  } catch (error) {
    console.error("Fetch All Events Error:", error);
    res.status(500).json({ message: "Failed to fetch events" });
  }
};


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
      return res.status(400).json({ message: "You have already RSVPed" });
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


    (async () => {
      try {
        await sendEmail({
          to: email,
          subject: `RSVP Confirmed: ${event.title}`,
          html: `
            <h2>You're In! 🎉</h2>
            <p>Hi <b>${name}</b>,</p>
            <p>Your RSVP for <b>${event.title}</b> is confirmed.</p>
            <p><b>Date:</b> ${new Date(event.startDate).toDateString()}</p>
            <p><b>Venue:</b> ${event.venue}</p>
            <br/>
            <p>– CampusConnect</p>
          `,
        });

        await sendEmail({
          to: "hetikakamani@gmail.com",
          subject: `New RSVP for ${event.title}`,
          html: `
            <h3>New RSVP Received</h3>
            <p><b>Event:</b> ${event.title}</p>
            <p><b>Name:</b> ${name}</p>
            <p><b>Email:</b> ${email}</p>
          `,
        });
      } catch (err) {
        console.error("Email failed:", err.message);
      }
    })();

  } catch (error) {
    console.error("RSVP Error:", error);
    res.status(500).json({ message: "Failed to RSVP" });
  }
};


export const updateEvent = async (req, res) => {
  try {
    const updateData = { ...req.body };

    if (updateData.startDate) {
      const start = new Date(updateData.startDate);
      const now = new Date();

      if (start > now) {
        updateData.status = "Upcoming";
      }
    }

    const updatedEvent = await Event.findOneAndUpdate(
      {
        _id: req.params.id,
        committeeId: req.admin.committeeId,
      },
      updateData,
      { new: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json(updatedEvent);
  } catch (error) {
    console.error("Update Event Error:", error);
    res.status(500).json({ message: "Failed to update event" });
  }
};
