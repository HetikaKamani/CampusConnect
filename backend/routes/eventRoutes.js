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
  updateEvent,
} from "../controllers/eventController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();


router.get("/", getAllEvents);


router.get("/my", protectAdmin, getMyCommitteeEvents);
router.post("/", protectAdmin, createEvent);
router.patch("/:id/complete", protectAdmin, markEventCompleted);
router.post("/:id/update", protectAdmin, postAnnouncement);
router.delete("/:id", protectAdmin, deleteEvent);
router.post("/:id/rsvp", rsvpEvent);
router.put("/:id",protectAdmin,updateEvent);

router.get("/:id", getEventById);

export default router;
