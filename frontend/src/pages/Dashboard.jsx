import { useEffect, useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    console.log("Dashboard mounted");

    axios.get(`${API}/tasks`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      console.log(res.data);
      setTasks(res.data);
    })
    .catch(err => {
      console.log("ERROR:", err);
    });

  }, []);

  return (
    <div style={{ color: "white" }}>
      <h1>DASHBOARD LOADED</h1>

      {tasks.length === 0 ? (
        <p>No tasks found</p>
      ) : (
        tasks.map(task => (
          <div key={task._id}>{task.title}</div>
        ))
      )}
    </div>
  );
}

export default Dashboard;