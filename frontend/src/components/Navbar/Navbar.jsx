import "./navbar.css";
import whiteLogo from "../../images/tinder_logo_white.png";

const Navbar = ({ Token, setShowAuth, showAuth, setIsSignUp }) => {
  const handleClick = () => {
    setShowAuth(true);
    setIsSignUp(false);
  };

  return (
    <nav className="navbar--container">
      <div className="navbar--logo">
        <img className="logo" src={whiteLogo} alt="logo" />
      </div>
      {!Token && (
        <button
          className="navbar--button"
          onClick={handleClick}
          disabled={showAuth}
        >
          Anmelden
        </button>
      )}
    </nav>
  );
};
export default Navbar;
