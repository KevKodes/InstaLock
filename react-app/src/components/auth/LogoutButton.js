import React from "react";
import { logout } from "../../store/auth";

const LogoutButton = ({ setAuthenticated }) => {
  const onLogout = async (e) => {
    await logout();
    setAuthenticated(false);
  };

  return <button id="ez6" onClick={onLogout}></button>;
};

export default LogoutButton;
