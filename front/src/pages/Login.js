import React, { useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import "./pageStyles/auth.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("user");
  const [localError, setLocalError] = useState(""); // Lokalno stanje za grešku
  const { login, employeeLogin, error: globalError } = useContext(UserContext); // Dodaj globalError iz UserContext-a
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Provera da li su uneti email i lozinka
    if (!email || !password) {
      setLocalError("Please fill in both email and password.");
      return;
    }

    try {
      let loginSuccess = false;

      if (userType === "user") {
        loginSuccess = await login({ email, password });
      } else {
        loginSuccess = await employeeLogin({ email, password });
      }

      if (loginSuccess) {
        if (userType === "user") {
          navigate("/gallery"); // Preusmeri korisnika na /gallery ako je prijava uspešna
        } else {
          navigate("/employeeDash"); // Preusmeri zaposlenog na /employeeDash ako je prijava uspešna
        }
      } else {
        setLocalError("Invalid email or password.");
      }
    } catch (err) {
      setLocalError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleLogin}>
        <h2>Welcome Back!</h2>
        <div className="authForm-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="authForm-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="authForm-group">
          <label htmlFor="userType">Login as:</label>
          <select
            id="userType"
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
          >
            <option value="user">User</option>
            <option value="employee">Employee</option>
          </select>
        </div>

        {/* Prikaži poruku o grešci - prvo proveri lokalnu, a zatim globalnu grešku */}
        {(localError || globalError) && (
          <p className="error-message">{localError || globalError}</p>
        )}

        <div className="btn">
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
