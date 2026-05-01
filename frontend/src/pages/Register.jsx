import { useState } from "react";
import axios from "axios";

function Register() {
  const API = import.meta.env.VITE_API_URL;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(`${API}/auth/register`, {
        name,
        email,
        password
      });

      console.log("Register success:", res.data);

      alert(res.data.message || "Registered successfully");
      window.location.href = "/";

    } catch (error) {
      console.log("Register error:", error);

      const msg =
        error.response?.data?.message ||
        error.response?.data ||
        error.message ||
        "Register failed";

      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Register</h2>

      <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

      <button onClick={handleRegister}>
        {loading ? "Registering..." : "Register"}
      </button>
    </div>
  );
}

export default Register;