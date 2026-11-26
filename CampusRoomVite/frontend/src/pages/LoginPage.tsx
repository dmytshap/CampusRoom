import { Link, useNavigate } from "react-router-dom";

import NavBar from "../components/Navbar";
import "../styles/Login.css";

function LoginPage() {
  const navigate = useNavigate();

  function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event?.preventDefault();

    navigate("/homepage");
  }

  return (
    <>
      <div className="main">
        <NavBar />

        <h1 className="login-title"> Login</h1>

        <div className="btn-container">
          <form className="login-form" onSubmit={handleLogin}>
            <label htmlFor="username">Username</label>
            <input id="username" type="text" />

            <label htmlFor="password">Password </label>
            <input id="password" type="password" />

            <button type="submit">Log in</button>
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
