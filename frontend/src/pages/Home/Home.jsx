import Navbar from "../../components/Navbar/Navbar";
import Authentication from "../../components/Auth/Authentication";
import "./home.css";
import { useState } from "react";
import { useCookies } from "react-cookie";

const Home = () => {
  const [showAuth, setShowAuth] = useState(false);
  const [IsRegistered, setIsRegistered] = useState(true);
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const Token = cookies.Token;

  const handleClick = () => {
    if (Token) {
      removeCookie("UserId", cookies.UserId);
      removeCookie("Token", cookies.Token);
      window.location.reload();
      return;
    }
    setShowAuth(true);
    setIsRegistered(true);
  };

  return (
    <div className="home--container">
      <Navbar
        authToken={Token}
        minimal={false}
        setShowModal={setShowAuth}
        showModal={showAuth}
        setIsSignUp={setIsRegistered}
      />
      <div className="home--wrapper">
        <h1 className="home--title">Swipey®</h1>
        <button className="home--login-btn" onClick={handleClick}>
          {Token ? "Abmelden" : "Registrieren"}
        </button>

        {showAuth && (
          <Authentication
            setShowAuth={setShowAuth}
            isSignUp={setIsRegistered}
          />
        )}
      </div>
    </div>
  );
};
export default Home;
