import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";

import NavBar from "../components/Navbar";
import "../styles/Login.css";

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    
    setError("");
    setLoading(true);
    
    try {
      await login(username, password);

      navigate("/homepage");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="main">
        <NavBar />

        <h1 className="login-title"> Login</h1>

        <div className="btn-container">
          <form className="login-form" onSubmit={handleLogin}>
            <label htmlFor="username">Username</label>
            <input id="username" type="text" value={username} onChange={(event) => setUsername(event.target.value)} required />

            <label htmlFor="password">Password </label>
            <input id="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)}  required />

            <button type="submit" disabled={loading}>{loading ? "Logging in..." : "Log in"} </button>
          </form>
          <p className="no-account">
            Don't have an account? <Link to="/register">Click here.</Link>
          </p>
        </div>
        <div className="endOfPage">
          <footer>
            <p>Login page.</p>
          </footer>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
