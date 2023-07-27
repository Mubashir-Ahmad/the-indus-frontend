import React from "react";
import "./sidebar.css";
// import logo from "../../image/logo.png";
import { Link } from "react-router-dom";
const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/">
        {/* <img src={logo} alt="Ecommerce" /> */}
      </Link>
      <Link to="/admindashbord">
        <p>
       Dashboard
        </p>
      </Link>
      <Link to="/admin/products">
        <p>
       Products
        </p>
      </Link>
      
 

    <Link to="/admin/product">
      <p>
    
    Create Product
    </p>
    </Link>
    
 
      <Link to="/admin/orders">
        <p>
    
          Orders
        </p>
      </Link>
      <Link to="/admin/users">
        <p>
          
           Users
        </p>
      </Link>
      <Link to="/user/create">
      <p>
    
    Create User
    </p>
    </Link>
      <Link to="/create/category">
      <p>
    
    Create Category
    </p>
    </Link>
    </div>
  );
};

export default Sidebar;
