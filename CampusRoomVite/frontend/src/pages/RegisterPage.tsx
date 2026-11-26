import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import NavBar from "../components/Navbar";
import "../styles/RegisterPage.css";
import type { IUserModel } from "../LocalStorage";


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
          <form className="login-form">
            <label htmlFor="username">Username</label>
            <input id="username" type="text"  value={data.name} onChange={handleInputChange}/>

            <label htmlFor="password">Password </label>
            <input id="password" type="password" value={data.password} onChange={handleInputChange} />

            <label htmlFor="role"> What is your Role?</label>
            <select className="select-role">
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
            <p>Login page.</p>
          </footer>
        </div>
      </div>
    </>
  );
}

export default RegisterPage;
