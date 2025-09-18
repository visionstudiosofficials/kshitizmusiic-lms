import express from "express";
import User from "../models/User.js";

const router = express.Router();

// Example lessons (replace videoUrl with your Google Drive / Terabox embed links)
const lessons = [
  { id: 1, title: "Lesson 1", videoUrl: "YOUR_GOOGLE_DRIVE_EMBED_LINK_1" },
  { id: 2, title: "Lesson 2", videoUrl: "YOUR_GOOGLE_DRIVE_EMBED_LINK_2" },
  { id: 3, title: "Lesson 3", videoUrl: "YOUR_GOOGLE_DRIVE_EMBED_LINK_3" }
];

// Fetch lessons
router.get("/:userId", async (req, res) => {
  const user = await User.findById(req.params.userId);
  if (!user) return res.status(404).json({ error: "User not found" });

  const userLessons = lessons.map(l => ({
    ...l,
    // locked: true unless previous lesson is completed; lesson 1 is always unlocked
    locked: l.id !== 1 && !user.completedLessons.includes(l.id - 1)
  }));

  res.json(userLessons);
});

// Mark lesson complete
router.post("/:userId/complete/:lessonId", async (req, res) => {
  const user = await User.findById(req.params.userId);
  if (!user) return res.status(404).json({ error: "User not found" });

  const lessonNum = Number(req.params.lessonId);
  if (!user.completedLessons.includes(lessonNum)) {
    user.completedLessons.push(lessonNum);
    await user.save();
  }

  // If last lesson completed -> you can trigger certificate generation here (later)
  res.json({ message: "Lesson marked as complete" });
});

export default router;

