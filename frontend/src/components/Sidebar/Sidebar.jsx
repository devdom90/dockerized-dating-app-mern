import "./sidebar.css";
import ChatHeader from "../ChatHeader/ChatHeader";
import Matches from "../Matches/Matches";
import Chats from "../Chats/Chats";
import { useState } from "react";

const Sidebar = ({ user }) => {
  const [clickedUser, setClickedUser] = useState(null);

  return (
    <div className="Sidebar--container">
      <ChatHeader user={user} />

      <div>
        <button
          className="sidebar--option"
          onClick={() => setClickedUser(null)}
        >
          Matches
        </button>
        <button className="sidebar--option" disabled={!clickedUser}>
          Chat
        </button>
      </div>

      {!clickedUser && (
        <Matches matches={user.matches} setClickedUser={setClickedUser} />
      )}

      {clickedUser && <Chats user={user} clickedUser={clickedUser} />}
    </div>
  );
};

export default Sidebar;
