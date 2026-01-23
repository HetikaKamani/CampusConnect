// // // import express from "express";
// // // import {
// // //   createEvent,
// // //   getMyCommitteeEvents,
// // //   getAllEvents,
// // // } from "../controllers/eventController.js";
// // // import { protectAdmin } from "../middleware/authMiddleware.js";

// // // const router = express.Router();

// // // // 🌍 Public – students see all events
// // // router.get("/", getAllEvents);

// // // // 🔐 Admin – only their committee events
// // // router.get("/my", protectAdmin, getMyCommitteeEvents);

// // // // 🔐 Admin – create event
// // // router.post("/", protectAdmin, createEvent);

// // // export default router;
// // import express from "express";
// // import {
// //   createEvent,
// //   getMyCommitteeEvents,
// //   getAllEvents,
// //   updateEvent,
// //   deleteEvent,
// //   markEventCompleted,
// //   addEventUpdate,
// //   rsvpEvent,
// //   postAnnouncement,
// // } from "../controllers/eventController.js";

// // import adminAuth from "../middleware/authMiddleware.js";
// // import protectAdmin from "../middleware/authMiddleware.js";

// // const router = express.Router();

// // /**
// //  * ======================================================
// //  * STUDENT / PUBLIC ROUTES
// //  * ======================================================
// //  */

// // // Get all events
// // router.get("/", getAllEvents);

// // // RSVP for an event
// // router.post("/:id/rsvp", rsvpEvent);

// // /**
// //  * ======================================================
// //  * ADMIN ROUTES (JWT PROTECTED)
// //  * ======================================================
// //  */

// // // Create new event
// // router.post("/", adminAuth, createEvent);

// // // Get events of logged-in committee
// // router.get("/my", adminAuth, getMyCommitteeEvents);

// // // Update event
// // router.put("/:id", adminAuth, updateEvent);

// // // Delete event
// // router.delete("/:id", adminAuth, deleteEvent);

// // // Mark event as completed
// // router.patch("/:id/complete", adminAuth, markEventCompleted);

// // // Add event update (announcement / result / postponement)
// // router.post("/:id/update", adminAuth, addEventUpdate);
// // router.post("/:id/update",protectAdmin,postAnnouncement);
// // export default router;
// import express from "express";
// import {
//   createEvent,
//   getAllEvents,
//   getMyCommitteeEvents,
//   getEventById,
//   postAnnouncement,
//   markEventCompleted,
//   deleteEvent,
// } from "../controllers/eventController.js";
// import { protectAdmin } from "../middleware/authMiddleware.js";

// const router = express.Router();

// // Public
// router.get("/", getAllEvents);
// router.get("/:id", getEventById);

// // Admin
// router.post("/", protectAdmin, createEvent);
// router.get("/my", protectAdmin, getMyCommitteeEvents);
// router.patch("/:id/complete", protectAdmin, markEventCompleted);
// router.delete("/:id", protectAdmin, deleteEvent);
// router.post("/:id/update", protectAdmin, postAnnouncement);

// export default router;
import express from "express";
import {
  createEvent,
  getAllEvents,
  getMyCommitteeEvents,
  getEventById,
  postAnnouncement,
  markEventCompleted,
  deleteEvent,
  rsvpEvent,
} from "../controllers/eventController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public
router.get("/", getAllEvents);

// ✅ ADMIN ROUTES FIRST
router.get("/my", protectAdmin, getMyCommitteeEvents);
router.post("/", protectAdmin, createEvent);
router.patch("/:id/complete", protectAdmin, markEventCompleted);
router.post("/:id/update", protectAdmin, postAnnouncement);
router.delete("/:id", protectAdmin, deleteEvent);
router.post("/:id/rsvp", rsvpEvent);

// ⬇️ KEEP THIS LAST
router.get("/:id", getEventById);

export default router;
