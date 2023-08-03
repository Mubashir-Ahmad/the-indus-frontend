import React, { useState } from 'react';
import './navbar.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import pic2 from '../../image/117.png';
import { useSelector, useDispatch } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Cartt from '../cart/Cartt';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

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
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });




  const [keywords, setkeywords] = useState('');
  
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
             
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
             
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
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
             {['left', 'right', 'top', 'bottom'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
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
