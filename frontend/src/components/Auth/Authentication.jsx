import "./auth.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const Authentication = ({ setShowAuth, IsRegistered }) => {
  const [Email, setEmail] = useState(null);
  const [Password, setPassword] = useState(null);
  const [ConfirmPassword, setConfirmPassword] = useState(null);
  const [Error, setError] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(null);

  let navigate = useNavigate();

  console.log(Email, Password, ConfirmPassword);

  const handleClick = () => {
    setShowAuth(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (IsRegistered && Password !== ConfirmPassword) {
        setError("Passwords need to match!");
        return;
      }
      const response = await axios.post(
        `http://localhost:8000/${IsRegistered ? "signup" : "login"}`,
        { Email, Password }
      );
      setCookie("Token", response.data.token);
      setCookie("UserId", response.data.userId);
      const valid = response.status === 201;
      if (valid && IsRegistered) navigate("/form");
      if (valid && !IsRegistered) navigate("/main");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="auth--container">
      <div className="auth--close" onClick={handleClick}>
        ⓧ
      </div>

      <h2>{IsRegistered ? "Registrieren" : "Anmelden"}</h2>
      <form onSubmit={handleSubmit} className="auth--form">
        <input
          type="email"
          id="email"
          name="email"
          placeholder="email"
          required={true}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="password"
          required={true}
          onChange={(e) => setPassword(e.target.value)}
        />
        {IsRegistered && (
          <input
            type="password"
            id="password-check"
            name="password-check"
            placeholder="confirm password"
            required={true}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        )}
        <input className="secondary-button" type="submit" />
        <p>{Error}</p>
      </form>
    </div>
  );
};
export default Authentication;
