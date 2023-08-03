import React, { useState } from 'react';
import './navbar.css';
import pic2 from '../../image/117.png';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Cartt from '../cart/Cartt';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

function Navbar(history) {
  const { isAuthenticated } = useSelector((state) => state.user);
  const [isActive, setIsActive] = useState(false);
  const [state, setState] = React.useState({
    right: false,
  });
  const [keywords, setkeywords] = useState('');

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
            <IconButton onClick={toggleDrawer('right', true)}>
              <i className='fa-solid fa-cart-shopping'></i>
            </IconButton>
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
      <Drawer
        anchor="right"
        open={state.right}
        onClose={toggleDrawer('right', false)}
      >
        {list('right')}
      </Drawer>
    </>
  );
}

export default Navbar;
