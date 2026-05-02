import { useEffect, useState } from "react";
import axios from "axios";
import "./dashboard.css";

const API = import.meta.env.VITE_API_URL;

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get(`${API}/tasks`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setTasks(res.data))
    .catch(err => console.log(err));
  }, []);

  const total = tasks.length;
  const completed = tasks.filter(t => t.status === "completed").length;
  const pending = tasks.filter(t => t.status === "pending").length;

  return (
    <div className="dashboard-container">

      {/* Sidebar */}
      <div className="sidebar">
        <h2>Task Manager</h2>
        <p>Dashboard</p>
        <p>Tasks</p>
        <p>Projects</p>
      </div>

      {/* Main */}
      <div className="main">

        <h2>Dashboard</h2>

        {/* Cards */}
        <div className="cards">
          <div className="card green">
            <h3>{total}</h3>
            <p>Total Tasks</p>
          </div>

          <div className="card blue">
            <h3>{completed}</h3>
            <p>Completed</p>
          </div>

          <div className="card orange">
            <h3>{pending}</h3>
            <p>Pending</p>
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