import { Link, useNavigate } from "react-router-dom";

import NavBar from "../components/Navbar";
import "../styles/CreateAccount.css";

function CreateAccountPage() {
  const navigate = useNavigate();

  function handleCreateAccount(event: React.FormEvent<HTMLFormElement>) {
    event?.preventDefault();

    navigate("/homepage");
  }

  return (
    <>
      <div className="main">
        <NavBar />

        <h1 className="login-title"> Login</h1>

        <div className="btn-container">
          <form className="login-form" onSubmit={handleCreateAccount}>
            <label htmlFor="username">Username</label>
            <input id="username" type="text" />

            <label htmlFor="password">Password </label>
            <input id="password" type="password" />

            <label htmlFor="role"> What is your Role?</label>

            <button type="submit">Create an Account</button>
          </form>
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

export default CreateAccountPage;
