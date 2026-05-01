import { useEffect, useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get(`${API}/tasks`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setTasks(res.data));
  }, []);

  return (
    <div>
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