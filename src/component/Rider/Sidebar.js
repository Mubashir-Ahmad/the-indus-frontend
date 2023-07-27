import React from "react";
import "./sidebar.css";
import { Link } from "react-router-dom";
import ListAltIcon from "@material-ui/icons/ListAlt";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/">
      </Link>
      <Link to="/riderdash">
        <p>
          <DashboardIcon /> Dashboard
        </p>
      </Link>
      <Link to="/rider/orders">
        <p>
          <ListAltIcon />
          Orders
        </p>
      </Link>
      
    </div>
  );
};

export default Sidebar;
