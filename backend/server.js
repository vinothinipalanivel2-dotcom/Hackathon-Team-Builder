const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// Temporary Data Storage
let teams = [
  {
    id: 1,
    teamName: "Code Warriors",
    hackathon: "Smart India Hackathon",
    skills: "React, Node.js, MongoDB",
    members: 2,
    maxMembers: 4,
  },
];

// Home Route
app.get("/", (req, res) => {
  res.send("🚀 Hackathon Team Builder Backend Running");
});

// GET All Teams
app.get("/teams", (req, res) => {
  res.json(teams);
});

// CREATE Team
app.post("/teams", (req, res) => {
  const newTeam = {
    id: teams.length + 1,
    teamName: req.body.teamName,
    hackathon: req.body.hackathon,
    skills: req.body.skills || "",
    members: 1,
    maxMembers: 4,
  };

  teams.push(newTeam);

  res.status(201).json({
    message: "Team Created Successfully",
    team: newTeam,
  });
});

// DELETE Team
app.delete("/teams/:id", (req, res) => {
  const id = parseInt(req.params.id);

  teams = teams.filter((team) => team.id !== id);

  res.json({
    message: "Team Deleted Successfully",
  });
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});