import React, { useState } from 'react';
import './navbar.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import pic2 from '../../image/117.png';
import { useSelector, useDispatch } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Cartt from '../cart/Cartt';

function Navbar() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { cartitems } = useSelector((state) => state.cart);
  const [isActive, setIsActive] = useState(false);
  const history = useNavigate();

  const togglePopupp = () => {
    setIsActive(!isActive);
  };

  const submithandler = (e) => {
    e.preventDefault();
    if (keywords.trim()) {
      history(`/products/${keywords}`);
    } else {
      history('/products');
    }
  };
  const popupStyle = {
    position: "fixed",
    width: "45vw",
    margin: "auto",
    marginTop: "auto",
    height: "100%",
    maxHeight: "100%",
    marginTop: "calc(86vh - 85vh - 20px)",
    background: "#fff",
    borderRadius: "4px",
    padding: "20px",
    border: "1px solid #999",
    overflow: "auto",
    transform: `translateX(${isActive ? "0%" : "100%"})`, // Apply the transform style based on isActive
    right: 0,
    transition: "transform 0.6s ease", // Add transition property for smooth transformation
  };
  const [keywords, setkeywords] = useState('');

  return (
    <>
      <div className='main-container' style={{ backgroundColor: '#ce1710' }}>
        <div className='navbar'>
          <Link to='/'>
            <div className='logo'>
              <img src={pic2} alt='' />
            </div>
          </Link>
          <div className='searchbar'>
            <div className='inputt'>
              <input
                type='text'
                placeholder='Search in the Indus'
                onChange={(e) => setkeywords(e.target.value)}
              />
            </div>
            <Link onClick={submithandler} className='linkk'>
              <i className='fa-solid fa-magnifying-glass' style={{ color: 'white' }}></i>
            </Link>
          </div>
          <div className='buttonn'>
            <Link className='linnk' onClick={togglePopupp}>
            <i class="fa-solid fa-cart-shopping" style={{ color: cartitems.length > 0 ? 'tomato' : 'unset' }}></i>
              {/* <ShoppingCartIcon style={{ color: cartitems.length > 0 ? 'tomato' : 'unset' }} /> */}
              <span>{`(${cartitems.length})`}</span>
            </Link>
            {isActive && (
              <div className='pppp' onClick={togglePopupp} >
                <div className='boxxx ' style={popupStyle}>
                  <i className='fa-solid fa-xmark close-icon' onClick={togglePopupp}></i>
                  <b className='pop-heading'>THE INDUS</b>
                  <Cartt />
                </div>
              </div>
            )}
            {isAuthenticated ? null : (
              <Link to='/login' className='linnk'>
                Sign in
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className='banner'>
        <div className='icon'>
          <div className='icon-1'>
            <i className='fa-solid fa-ellipsis'></i>
          </div>
          <div className='icon-2'>
            <i className='fa-regular fa-heart'></i>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
