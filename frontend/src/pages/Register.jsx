import { useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    if (!name || !email || !password) {
      alert("Fill all fields");
      return;
    }

    try {
      const res = await axios.post(`${API}/auth/register`, {
        name,
        email,
        password
      });

      alert(res.data.message);
      window.location.href = "/";

    } catch (err) {
      alert(err.response?.data?.message || "Register failed");
    }
  };

  return (
    <div>
      <h2>Register</h2>

      <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default Register;