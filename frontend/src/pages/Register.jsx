import { useState } from "react";
import axios from "axios";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    // ✅ Validation
    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, {
        name,
        email,
        password
      });

      alert("Registered successfully");
      window.location.href = "/";

    } catch (error) {
      alert(error.response?.data || "Register failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      padding: "20px",
      maxWidth: "400px",
      margin: "auto",
      textAlign: "center"
    }}>
      <h2>Register</h2>

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ width: "100%", padding: "10px" }}
      />
      <br /><br />

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: "100%", padding: "10px" }}
      />
      <br /><br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: "100%", padding: "10px" }}
      />
      <br /><br />

      <button
        onClick={handleRegister}
        disabled={loading}
        style={{
          width: "100%",
          padding: "10px",
          background: "#4CAF50",
          color: "white",
          border: "none"
        }}
      >
        {loading ? "Registering..." : "Register"}
      </button>

      <br /><br />

      <button
        onClick={() => (window.location.href = "/")}
        style={{
          width: "100%",
          padding: "10px",
          background: "#2196F3",
          color: "white",
          border: "none"
        }}
      >
        Back to Login
      </button>
    </div>
  );
}

export default Register;