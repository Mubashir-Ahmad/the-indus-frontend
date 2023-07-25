import React from "react";
import "./sidebar.css";
// import logo from "../../image/logo.png";
import { Link } from "react-router-dom";
import { TreeView, TreeItem } from "@material-ui/lab";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PostAddIcon from "@material-ui/icons/PostAdd";
import AddIcon from "@material-ui/icons/Add";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import ListAltIcon from "@material-ui/icons/ListAlt";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import RateReviewIcon from "@material-ui/icons/RateReview";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/">{/* <img src={logo} alt="Ecommerce" /> */}</Link>
      <Link to="/mangerdashbord">
        <p>
          <DashboardIcon /> Dashboard
        </p>
      </Link>
      <Link to="/manager/product">
        <p>
          <PostAddIcon />
          Products
        </p>
      </Link>
      <Link to="/manger/create/product">
        <p>
          <PostAddIcon />
          Create Product
        </p>
      </Link>
      <Link to="/manger/order">
        <p>
          <ListAltIcon />
          Orders
        </p>
      </Link>
      <Link to="/manager/user">
        <p>
          <PeopleIcon /> Users
        </p>
      </Link>
      <Link to="/manager/user/create">
        <p>
          <PostAddIcon />
          Create User
        </p>
      </Link>
      <Link to="/manager/create/category">
        <p>
          <AccountTreeIcon />
          Create Category
        </p>
      </Link>
    </div>
  );
};

export default Sidebar;
