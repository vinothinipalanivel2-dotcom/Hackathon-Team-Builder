import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [teams, setTeams] = useState([]);
  const [teamName, setTeamName] = useState("");
  const [hackathon, setHackathon] = useState("");
  const [skills, setSkills] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const res = await axios.get("http://localhost:5000/teams");
      setTeams(Array.isArray(res.data) ? res.data : [res.data]);
    } catch (error) {
      console.log(error);
    }
  };

  const addTeam = async () => {
    if (!teamName || !hackathon || !skills) {
      alert("Please fill all fields");
      return;
    }

    try {
      await axios.post("http://localhost:5000/teams", {
        teamName,
        hackathon,
        skills,
      });

      setTeamName("");
      setHackathon("");
      setSkills("");

      fetchTeams();
    } catch (error) {
      console.log(error);
    }
  };

  const joinTeam = (team) => {
    if (team.members >= team.maxMembers) {
      alert("Team is full!");
      return;
    }

    alert(`Successfully joined ${team.teamName}`);
  };

  const deleteTeam = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/teams/${id}`);
      fetchTeams();
    } catch (error) {
      console.log(error);
    }
  };

  const filteredTeams = teams.filter(
    (team) =>
      team.teamName
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      team.hackathon
        ?.toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <h1 className="title">🚀 Hackathon Team Builder</h1>

      <input
        type="text"
        placeholder="Enter Team Name"
        value={teamName}
        onChange={(e) => setTeamName(e.target.value)}
      />

      <input
        type="text"
        placeholder="Enter Hackathon Name"
        value={hackathon}
        onChange={(e) => setHackathon(e.target.value)}
      />

      <input
        type="text"
        placeholder="Enter Skills (React, Python, AI)"
        value={skills}
        onChange={(e) => setSkills(e.target.value)}
      />

      <button className="create-btn" onClick={addTeam}>
        Create Team
      </button>

      <hr />

      <h2>🔍 Search Teams</h2>

      <input
        type="text"
        placeholder="Search by Team Name or Hackathon"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <h2>Available Teams</h2>

      {teams.length === 0 ? (
        <p style={{ textAlign: "center", color: "gray" }}>
          No teams found. Create your first team 🚀
        </p>
      ) : (
        filteredTeams.map((team) => (
          <div className="card" key={team.id}>
            <h3>{team.teamName}</h3>

            <p>{team.hackathon}</p>

            <p>
              <strong>Skills:</strong> {team.skills}
            </p>

            <p>
              <strong>Members:</strong>{" "}
              {team.members ?? 1} / {team.maxMembers ?? 4}
            </p>

            <div style={{ marginTop: "10px" }}>
              <button
                className="join-btn"
                style={{ marginRight: "10px" }}
                onClick={() => joinTeam(team)}
              >
                Join Team
              </button>

              <button
                className="delete-btn"
                onClick={() => deleteTeam(team.id)}
              >
                Delete Team
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default App;