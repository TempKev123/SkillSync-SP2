import express from "express";
import cors from "cors";
import { readFile, writeFile } from "fs/promises";
import path from "path";

const app = express();
const PORT = 8080;
const FILE = path.resolve("profiledata.json");

/* =========================
   Middleware
========================= */
app.use(cors());
app.use(express.json());

/* =========================
   JSON File Helpers
========================= */
async function readProfiles() {
  try {
    const data = await readFile(FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    await writeFile(FILE, JSON.stringify([], null, 2));
    return [];
  }
}

async function writeProfiles(data) {
  await writeFile(FILE, JSON.stringify(data, null, 2));
}

/* =========================
   Routes
========================= */
app.get("/", (req, res) => {
  res.send("API is running");
});

/* =========================
   CREATE profile
========================= */
app.post("/profile/:id", async (req, res) => {
  const { id } = req.params;
  const { major, email, phone, aboutme, github, linkedin, stars, tags } = req.body;

  if (!major && !email && !phone && !aboutme && !github && !linkedin && !stars && !tags) {
    return res.status(400).json({ error: "No valid fields provided" });
  }

  // Validate stars
  if (
    stars &&
    (!Array.isArray(stars) ||
      stars.some((s) => typeof s !== "number" || s < 1 || s > 5))
  ) {
    return res
      .status(400)
      .json({ error: "Stars must be an array of numbers from 1 to 5" });
  }
  if (tags && !Array.isArray(tags)) {
  return res.status(400).json({ error: "Tags must be an array of strings" });
}


  const profiles = await readProfiles();

  if (profiles.some((p) => p.id === id)) {
    return res.status(409).json({ error: "Profile already exists" });
  }

  const profile = {
    id,
    major,
    email,
    phone,
    aboutme,
    github,
    linkedin,
    stars: stars ?? [],
    tags: tags ?? [],
    createdAt: new Date().toISOString(),
  };

  profiles.unshift(profile);
  await writeProfiles(profiles);

  res.status(201).json(profile);
});

/* =========================
   READ profile
========================= */
app.get("/profile/:id", async (req, res) => {
  const profiles = await readProfiles();
  const profile = profiles.find((p) => p.id === req.params.id);

  if (!profile) {
    return res.status(404).json({ error: "Profile not found" });
  }

  res.json(profile);
});

/* =========================
   UPDATE profile
========================= */
app.put("/profile/:id", async (req, res) => {
  const { id } = req.params;
  const { major, email, phone, aboutme, github, linkedin, stars, tags } = req.body;

  // Validate stars
  if (
    stars &&
    (!Array.isArray(stars) ||
      stars.some((s) => typeof s !== "number" || s < 1 || s > 5))
  ) {
    return res
      .status(400)
      .json({ error: "Stars must be an array of numbers from 1 to 5" });
  }

  const profiles = await readProfiles();
  const index = profiles.findIndex((p) => p.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Profile not found to update" });
  }

  profiles[index] = {
    ...profiles[index],
    major: major ?? profiles[index].major,
    email: email ?? profiles[index].email,
    phone: phone ?? profiles[index].phone,
    aboutme: aboutme ?? profiles[index].aboutme,
    github: github ?? profiles[index].github,
    linkedin: linkedin ?? profiles[index].linkedin,
    stars: stars ?? profiles[index].stars,
    tags: tags ?? profiles[index].tags,
    updatedAt: new Date().toISOString(),
  };

  await writeProfiles(profiles);
  res.json(profiles[index]);
});

/* =========================
   DELETE profile
========================= */
app.delete("/profile/:id", async (req, res) => {
  const profiles = await readProfiles();
  const filtered = profiles.filter((p) => p.id !== req.params.id);

  if (filtered.length === profiles.length) {
    return res.status(404).json({ error: "Profile not found" });
  }

  await writeProfiles(filtered);
  res.json({ success: true });
});

/* =========================
   Server
========================= */
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
