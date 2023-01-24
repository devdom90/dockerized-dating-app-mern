import "./chatheader.css";
import { useCookies } from "react-cookie";

const ChatHeader = ({ user }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  const logout = () => {
    removeCookie("UserId", cookies.UserId);
    removeCookie("Token", cookies.Token);
    window.location.reload();
  };

  return (
    <div className="chatheader--container">
      <div className="chatheader--profile">
        <div className="chatheader--image">
          <img src={user.url} alt={"photo of " + user.first_name} />
        </div>
        <h3>{user.first_name}</h3>
      </div>
      <i className="chatheader--logout" onClick={logout}>
        ⇦
      </i>
    </div>
  );
};

export default ChatHeader;
