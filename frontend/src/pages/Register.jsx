const API = import.meta.env.VITE_API_URL;

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
      error.response?.data?.message ||   // ✅ proper backend message
      error.response?.data ||            // fallback
      error.message ||                   // network error
      "Register failed";

    alert(msg);
  } finally {
    setLoading(false);
  }
};
export default Register;