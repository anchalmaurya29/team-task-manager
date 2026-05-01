import { useEffect, useState } from "react";
import axios from "axios";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/tasks`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setTasks(res.data));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>All Tasks</h2>

      {tasks.map(task => (
        <div key={task._id}>
          {task.title} - {task.status}
        </div>
      ))}
    </div>
  );
}

export default Tasks;