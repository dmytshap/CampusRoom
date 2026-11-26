import { useState } from "react";

import NavBar from "../components/Navbar";
import "../styles/RegisterPage.css";


function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");

  function handleRegister(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    console.log("Username:", username);
    console.log("Password:", password);

    console.log("Registration complete");
  }


  return (
    <>
      <div className="main">
        <NavBar />

        <h1 className="login-title"> Login</h1>

        <div className="btn-container">
          <form className="login-form" onSubmit={handleRegister}>
            <label htmlFor="username">Username</label>
            <input id="username" type="text"  value={username} onChange={(event) => setUsername(event.target.value)}
            required/>

            <label htmlFor="password">Password </label>
            <input id="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)}
            required />

            <label htmlFor="confirmPassword"> Confirm   password </label>
            <input id="password" type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)}
            required />



            <label htmlFor="role"> What is your Role?</label>
            
            <select id="role" className="select-role" required>
              <option value="student"> Student </option>
              <option value="lecturer"> Lecturer </option>
              <option value="researher"> Researcher </option>
              <option value="professor"> Professor </option>
            </select>
            <button type="submit">Create an Account</button>
          </form>
        </div>
        <div className="endOfPage">
          <footer>
            <p>Registration page.</p>
          </footer>
        </div>
      </div>
    </>
  );
}

export default RegisterPage;
