import { useState } from "react";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "https://team-task-manager-production-9f0a.up.railway.app/auth/login",
        {
          email,
          password
        }
      );

      console.log("Login response:", res.data); // ✅ debug

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        alert("Login successful");
        window.location.href = "/dashboard";
      } else {
        alert("Token not received");
      }

    } catch (error) {
      console.log("Login error:", error.response?.data); // ✅ debug
      alert(error.response?.data || "Login failed");
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
      <h2>Login</h2>

      <input
        type="email"
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
        onClick={handleLogin}
        disabled={loading}
        style={{
          width: "100%",
          padding: "10px",
          background: "#4CAF50",
          color: "white",
          border: "none",
          cursor: "pointer"
        }}
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      <br /><br />

      <button
        onClick={() => window.location.href = "/register"}
        style={{
          width: "100%",
          padding: "10px",
          background: "#2196F3",
          color: "white",
          border: "none",
          cursor: "pointer"
        }}
      >
        Create Account
      </button>
    </div>
  );
}

export default Login;