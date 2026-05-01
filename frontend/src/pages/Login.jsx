import { useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

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

      const res = await axios.post(`${API}/auth/login`, {
        email,
        password
      });

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        alert("Login successful");
        window.location.href = "/dashboard";
      } else {
        alert("Token not received");
      }

    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };
  <h1>TEST</h1>
  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <h2>Login</h2>

      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <br /><br />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <br /><br />

      <button onClick={handleLogin}>
        {loading ? "Logging in..." : "Login"}
      </button>
    </div>
  );
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
      />
      <br /><br />
  
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br /><br />
  
      {/* 🔐 LOGIN BUTTON */}
      <button onClick={handleLogin}>
        {loading ? "Logging in..." : "Login"}
      </button>
  
      {/* 👇 YAHAN ADD KARNA HAI */}
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