import { useEffect, useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

function Projects() {
  const [projects, setProjects] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get(`${API}/projects`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setProjects(res.data))
    .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h2>Projects</h2>

      {projects.length === 0 ? (
        <p>No projects found</p>
      ) : (
        projects.map(project => (
          <div key={project._id}>
            {project.name}
          </div>
        ))
      )}
    </div>
  );
}

export default Projects;