import React from "react";
import { logout } from "../../store/auth";
import { useDispatch } from "react-redux";

const LogoutButton = ({ setAuthenticated }) => {
  const dispatch = useDispatch();
  const onLogout = async (e) => {
    dispatch(logout());
    setAuthenticated(false);
  };
  return <button className="navIcon" id="ez6" onClick={onLogout}></button>;
};

export default LogoutButton;
