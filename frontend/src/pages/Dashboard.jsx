import { useEffect, useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const token = localStorage.getItem("token");

  const fetchTasks = async () => {
    const res = await axios.get(`${API}/tasks`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>

      {tasks.map(task => (
        <div key={task._id}>
          {task.title} - {task.status}
        </div>
      ))}
    </div>
  );
}

export default Dashboard;