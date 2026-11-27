import { useState, useEffect } from "react";

import NavBar from "../components/Navbar";
import "../styles/RegisterPage.css";


interface Role {
    role_id: number;
    role_name: string;
  }

function RegisterPage() {
  // Registration form states
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  // Registration form response states
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");


  // Registration form role states
  const [roles, setRoles] = useState<Role[]>([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [rolesLoading, setRolesLoading] = useState(true);
  const [rolesError, setRolesError] = useState("");

  async function handleRegister(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
          role_id: Number(selectedRole),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Registration failed.");
      }

      setSuccess("Account created succesfully!");

      setUsername("");
      setPassword("");
      setConfirmPassword("");
      setSelectedRole("");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Something went wrong.");
      }
    }
  }

useEffect(() => {
  async function fetchRoles() {
    try {
      const response = await fetch("/api/roles");

      if (!response.ok) {
        throw new Error("Failed to fetch roles.");
      }

      const data: Role[] = await response.json();

      setRoles(data);
    } catch (error) {
      console.error(error);
      setRolesError("Could not load roles.");
    } finally {
      setRolesLoading(false);
    }
  }
  fetchRoles();
}, []);

  return (
    <>
      <div className="main">
        <NavBar />

        <h1 className="login-title"> Login</h1>

        <div className="btn-container">
          {error && <p className="register-error">{error}</p>}
          {success && <p className="register-success">{success}</p>}  
          <form className="login-form" onSubmit={handleRegister}>
            <label htmlFor="username">Username</label>
            <input id="username" type="text"  value={username} onChange={(event) => setUsername(event.target.value)} minLength={3}
            required/>

            <label htmlFor="password">Password </label>
            <input id="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)}
            required />

            <label htmlFor="confirmPassword"> Confirm   password </label>
            <input id="confirmPassword" type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)}
            required />



            <label htmlFor="role"> What is your Role?</label>
            
            <select id="role" className="select-role" value={selectedRole} onChange={(event) => setSelectedRole(event.target.value)} required disabled={rolesLoading || rolesError !== ""}>
            <option value="">
              {rolesLoading ? "Loading roles..." : "Choose a role"}
            </option>
            {roles.map((role) => (
              <option key={role.role_id} value={role.role_id}>
                {role.role_name}
              </option>
            ))}
            </select>
            {rolesError && <p className="register-error">{rolesError}</p>}
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
