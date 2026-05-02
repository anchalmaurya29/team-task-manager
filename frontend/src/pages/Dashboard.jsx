import { useEffect, useState } from "react";
import axios from "axios";
import "./dashboard.css";
import { NavLink } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [user, setUser] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get(`${API}/tasks`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setTasks(res.data))
    .catch(err => console.log(err));

    axios.get(`${API}/projects`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setProjects(res.data))
    .catch(err => console.log(err));

    axios.get(`${API}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setUser(res.data))
    .catch(err => console.log(err));
  }, []);

  // ✅ FIXED VARIABLES
  const total = tasks.length;
  const completed = tasks.filter(t => t.status === "completed").length;
  const pending = tasks.filter(t => t.status === "pending").length;

  return (
    <div className="dashboard-container">

      {/* Sidebar */}
      <div className="sidebar">

        <div className="profile">
          <h3>{user?.name || "User"}</h3>
        </div>

        <div className="menu">
          <NavLink to="/dashboard" className="menu-link">Dashboard</NavLink>
          <NavLink to="/tasks" className="menu-link">Tasks</NavLink>
          <NavLink to="/projects" className="menu-link">Projects</NavLink>
          <NavLink to="/profile" className="menu-link">Profile</NavLink>

          <p
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/";
            }}
            className="menu-link logout"
          >
            Logout
          </p>
        </div>
      </div>

      {/* Main */}
      <div className="main">
        <h2>Dashboard</h2>

        <div className="cards-grid">

          <div className="card green">
            <h2>{total}</h2>
            <p>Total Tasks</p>
          </div>

          <div className="card blue">
            <h2>{completed}</h2>
            <p>Completed</p>
          </div>

          <div className="card orange">
            <h2>{pending}</h2>
            <p>Pending</p>
          </div>

          <div className="card pink">
            <h2>{projects.length}</h2>
            <p>Projects</p>
          </div>

        </div>

        {/* Task List */}
        <div className="task-list">
          <h3>Your Tasks</h3>

          {tasks.length === 0 ? (
            <p>No tasks available</p>
          ) : (
            tasks.map(task => (
              <div key={task._id} className="task-item">
                {task.title} - {task.status}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;