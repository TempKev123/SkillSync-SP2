import express from "express";
import cors from "cors";
import { readFile, writeFile } from "fs/promises";
import fs from "fs";

const app = express();
const PORT = 8080;
const FILE = "./profiledata.json";

app.use(cors());
app.use(express.json());

//JSON file helpers
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

app.get("/", (req, res) => {
  res.send("API is running");
});

app.post("/profile/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, aboutme, github, linkin } = req.body;

  if (!name && !email && !phone && !aboutme && !github && !linkin) {
    return res.status(400).json({ error: "No valid fields provided" });
  }

  const profiles = await readProfiles();

  const profile = {
    id,
    major,
    email,
    phone,
    aboutme,
    github,
    linkin,
    createdAt: new Date().toISOString()
  };

  profiles.unshift(profile);

  const limited = profiles.slice(0, 5);
  await writeProfiles(limited);

  res.status(201).json(limited);
});

app.get("/profile/:id", async (req, res) => {
  const profiles = await readProfiles();
  const profile = profiles.find(p => p.id === req.params.id);

  if (!profile) {
    return res.status(404).json({ error: "Profile not found" });
  }

  res.json(profile);
});
app.put("/profile/:id", async (req, res) => {
  const { id } = req.params;
  const { major, email, phone, aboutme, github, linkin } = req.body;

  try {
    let profiles = await readProfiles();
    const index = profiles.findIndex((p) => p.id === id);

    if (index === -1) {
      return res.status(404).json({ error: "Profile not found to update" });
    }

    // Update the profile while keeping the original createdAt timestamp
    profiles[index] = {
      ...profiles[index],
      major: major ?? profiles[index].name,
      email: email ?? profiles[index].email,
      phone: phone ?? profiles[index].phone,
      aboutme: aboutme ?? profiles[index].aboutme,
      github: github ?? profiles[index].github,
      linkin: linkin ?? profiles[index].linkin,
      updatedAt: new Date().toISOString(), // Track when it was modified
    };

    await writeProfiles(profiles);
    res.json(profiles[index]);
  } catch (error) {
    res.status(500).json({ error: "Failed to update profile" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
