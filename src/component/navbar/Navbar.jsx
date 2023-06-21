import React, { useState } from 'react';
import './navbar.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import pic1 from '../../image/115.jpg';
import pic2 from '../../image/117.png';
import { useSelector, useDispatch } from 'react-redux';
import Popup from './Popup';
import { addItem_tocart, removeitemfromcart } from '../../actions/CartAction';
import Cart from '../cart/Cart';
import { NavLink } from 'react-router-dom';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
function Navbar() {
  const [showInfo, setShowInfo] = useState(false);
  const { cartitems } = useSelector((state) => state.cart);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const incresequality = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    }
    dispatch(addItem_tocart(id, newQty));
  };

  const decresequality = (id, quantity, stock) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    dispatch(addItem_tocart(id, newQty));
  };

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const handleClick = () => {
    setShowInfo(!showInfo); // Toggle the state value
  };

  const selectItem = (event) => {
    const selectedValue = event.target.textContent.trim();
    const dropdownButton = document.querySelector('.btn.dropdown-toggle');
    dropdownButton.textContent = selectedValue;
  };

  return (
    <>
      <div
        className='container-fluid '
        style={{ backgroundColor: '#ce1710' }}
      >
        <div className="navbar">
          <div className="logo">
            <img src={pic2} alt="" />
          </div>
          <div className="searchbar">
            <input type="text" placeholder="Search in the Indus" />
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
          <div className="buttonn">
            {/* <ShoppingCartIcon style={{color:cartitems.length>0 ?'tomato' : 'unset'}}/>,name :`Cart(${cartitems.length})`,function:cart */}
            <button onClick={togglePopup}>
              <ShoppingCartIcon style={{ color: cartitems.length > 0 ? 'tomato' : 'unset' }} />
              <span>{`Cart (${cartitems.length})`}</span>
            </button>
            {isOpen && (
              <Popup
                content={
                  <>
                    <b>The Indus</b>
                    <Cart />
                  </>
                }
                handleClose={togglePopup}
              />
            )}
            <NavLink to='/login'
              type="button"
              className="btn buttoon"
              style={{ width: '100px' }}
            >
              Sign in
            </NavLink>
          </div>
        </div>
      </div>
      <div className='banner'>
        <div className="icon">
          <div className="icon-1">
            <i className="fa-solid fa-ellipsis"></i>
          </div>
          <div className="icon-2">
            <i className="fa-regular fa-heart"></i>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
