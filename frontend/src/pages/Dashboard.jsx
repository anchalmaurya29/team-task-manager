// Updated from your file :contentReference[oaicite:0]{index=0}

import { useEffect, useState } from "react";
import axios from "axios";
import "./dashboard.css";
import { Link } from "react-router-dom";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null);

  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState("");
  const [users, setUsers] = useState([]);
  const [assignedTo, setAssignedTo] = useState("");

  const token = localStorage.getItem("token");

  // FETCH FUNCTIONS
  const fetchTasks = async () => {
    const res = await axios.get("https://team-task-manager-production-9f0a.up.railway.app/tasks", {
      headers: { Authorization: `Bearer ${token}` }
    });
    setTasks(res.data || []);
  };

  const fetchUser = async () => {
    const res = await axios.get("https://team-task-manager-production-9f0a.up.railway.app/auth/me", {
      headers: { Authorization: `Bearer ${token}` }
    });
    setUser(res.data);
  };

  const fetchProjects = async () => {
    const res = await axios.get("https://team-task-manager-production-9f0a.up.railway.app/projects", {
      headers: { Authorization: `Bearer ${token}` }
    });
    setProjects(res.data || []);
  };

  const fetchUsers = async () => {
    const res = await axios.get("https://team-task-manager-production-9f0a.up.railway.app/users", {
      headers: { Authorization: `Bearer ${token}` }
    });
    setUsers(res.data || []);
  };

  // ADD TASK (FIXED)
  const addTask = async () => {
    if (!title) return alert("Enter task");

    try {
      await axios.post(
        "https://team-task-manager-production-9f0a.up.railway.app/tasks",
        {
          title,
          dueDate,
          project: project || undefined,   // ✅ FIX
          assignedTo: assignedTo || user?._id
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setTitle("");
      setDueDate("");
      setProject("");
      setAssignedTo("");

      fetchTasks();
      alert("Task added");

    } catch (err) {
      console.log(err.response?.data);
      alert("Error adding task");
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchUser();
    fetchProjects();
    fetchUsers();
  }, []);

  // STATS
  const total = tasks.length;
  const completed = tasks.filter(t => t.status === "completed").length;
  const inProgress = tasks.filter(t => t.status === "in-progress").length;
  const newTasks = tasks.filter(t => t.status === "pending").length;

  const overdue = tasks.filter(
    t => t.dueDate && new Date(t.dueDate) < new Date() && t.status !== "completed"
  );

  return (
    <div className="dashboard-container">

      {/* Sidebar */}
      <div className="sidebar">
        <div className="profile">
          <div className="avatar">👤</div>
          <h3>{user?.name}</h3>
          <p>{user?.email}</p>
        </div>

        <div className="menu">
          <Link to="/dashboard" className="active">Dashboard</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/tasks">Tasks</Link>
        </div>
      </div>

      {/* Main */}
      <div className="main">

        <div className="header">
          <h2>Employee Task Management System</h2>
          <button onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/";
          }}>
            Logout
          </button>
        </div>

        {/* ✅ ROLE BASED ADD TASK */}
        {user?.role === "admin" && (
          <div className="add-task-section">

            <input
              placeholder="Task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <div className="right-controls">

              <select value={project} onChange={(e) => setProject(e.target.value)}>
                <option value="">Project</option>
                {projects.map(p => (
                  <option key={p._id} value={p._id}>{p.name}</option>
                ))}
              </select>

              <select value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)}>
                <option value="">Assign</option>
                {users.map(u => (
                  <option key={u._id} value={u._id}>{u.name}</option>
                ))}
              </select>

              <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />

              <button onClick={addTask}>Add Task</button>

            </div>
          </div>
        )}

        {/* Cards */}
        <div className="cards-grid">
          <div className="card pink"><h3>{newTasks}</h3><p>New</p></div>
          <div className="card orange"><h3>{inProgress}</h3><p>In Progress</p></div>
          <div className="card green"><h3>{completed}</h3><p>Completed</p></div>
          <div className="card blue"><h3>{total}</h3><p>All</p></div>
        </div>

        {/* Overdue */}
        {overdue.length > 0 && (
          <div className="overdue-section">
            <h3>Overdue Tasks</h3>
            {overdue.map(t => (
              <div key={t._id} className="overdue-item">{t.title}</div>
            ))}
          </div>
        )}

        {/* Task List */}
        <div className="task-section">
          <h3>Your Tasks</h3>

          {tasks.length === 0 ? (
            <p className="no-task">No tasks available</p>
          ) : (
            tasks.map(task => (
              <div className="task-item" key={task._id}>
                <span>{task.title}</span>

                <select
                  value={task.status}
                  onChange={async (e) => {
                    await axios.put(
                      `https://team-task-manager-production-9f0a.up.railway.app/tasks/${task._id}`,
                      { status: e.target.value },
                      {
                        headers: { Authorization: `Bearer ${token}` }
                      }
                    );
                    fetchTasks();
                  }}
                >
                  <option value="pending">New</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}

export default Dashboard;