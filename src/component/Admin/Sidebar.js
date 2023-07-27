import React from "react";
import "./sidebar.css";
// import logo from "../../image/logo.png";
import { Link } from "react-router-dom";
import PostAddIcon from "@material-ui/icons/PostAdd";
import ListAltIcon from "@material-ui/icons/ListAlt";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/">
        {/* <img src={logo} alt="Ecommerce" /> */}
      </Link>
      <Link to="/admindashbord">
        <p>
          <DashboardIcon /> Dashboard
        </p>
      </Link>
      <Link to="/admin/products">
        <p>
        <PostAddIcon />Products
        </p>
      </Link>
      
 

    <Link to="/admin/product">
      <p>
    <PostAddIcon />Create Product
    </p>
    </Link>
    
 
      <Link to="/admin/orders">
        <p>
          <ListAltIcon />
          Orders
        </p>
      </Link>
      <Link to="/admin/users">
        <p>
          <PeopleIcon /> Users
        </p>
      </Link>
      <Link to="/user/create">
      <p>
    <PostAddIcon />Create User
    </p>
    </Link>
      <Link to="/create/category">
      <p>
    <AccountTreeIcon />Create Category
    </p>
    </Link>
    </div>
  );
};

export default Sidebar;
