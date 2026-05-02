import { useEffect, useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const token = localStorage.getItem("token");

  // 🔹 Fetch Tasks
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${API}/tasks`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(res.data || []);
    } catch (err) {
      console.log("Error fetching tasks:", err);
    }
  };

  // 🔹 Add Task
  const handleAddTask = async () => {
    if (!title.trim()) return alert("Enter task");

    try {
      const res = await axios.post(
        `${API}/tasks`,
        { title },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setTasks([...tasks, res.data]);
      setTitle("");

    } catch (err) {
      console.log("Error adding task:", err);
      alert("Failed to add task");
    }
  };

  // 🔹 Update Status
  const updateStatus = async (id, status) => {
    try {
      const res = await axios.put(
        `${API}/tasks/${id}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setTasks(tasks.map(t => (t._id === id ? res.data : t)));

    } catch (err) {
      console.log("Error updating task:", err);
    }
  };

  // 🔹 Delete Task (optional but useful)
  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API}/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setTasks(tasks.filter(t => t._id !== id));

    } catch (err) {
      console.log("Error deleting task:", err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>All Tasks</h2>

      {/* ➕ Add Task */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task"
          style={{ padding: "8px", marginRight: "10px" }}
        />

        <button onClick={handleAddTask}>
          Add Task
        </button>
      </div>

      {/* 📋 Task List */}
      {tasks.length === 0 ? (
        <p>No tasks available</p>
      ) : (
        tasks.map(task => (
          <div
            key={task._id}
            style={{
              marginBottom: "10px",
              padding: "10px",
              background: "#f1f5f9",
              borderRadius: "5px"
            }}
          >
            <strong>{task.title}</strong> — {task.status}

            <div style={{ marginTop: "5px" }}>
              <button
                onClick={() => updateStatus(task._id, "completed")}
                style={{ marginRight: "10px" }}
              >
                Complete
              </button>

              <button
                onClick={() => updateStatus(task._id, "in-progress")}
                style={{ marginRight: "10px" }}
              >
                In Progress
              </button>

              <button
                onClick={() => deleteTask(task._id)}
                style={{ color: "red" }}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Tasks;