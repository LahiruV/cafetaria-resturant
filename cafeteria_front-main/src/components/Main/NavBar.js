import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const handleLogout = () => {
    sessionStorage.setItem('cusmail', 'empty');
    window.location.href = '/';
  };
  return (
    <AppBar position="static" style={{ backgroundColor: '#212121' }}>
      <Toolbar>
        <Typography variant="h4" style={{ flexGrow: 1, paddingLeft:'25px',fontWeight: 'bold', }}>
          <Link to="/" style={{ color: '#FFA500', textDecoration: 'none' }}>Caravan Fresh</Link>
        </Typography>
        <Typography variant="subtitle1" style={{ marginRight: '1rem' }}>
          <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>Home</Link>
        </Typography>
        <Typography variant="subtitle1" style={{ marginRight: '1rem' }}>
          <Link to="/MenuPage" style={{ color: '#fff', textDecoration: 'none' }}>Menu</Link>
        </Typography>
        <Typography variant="subtitle1" style={{ marginRight: '1rem' }}>
          <Link to="/CartPage" style={{ color: '#fff', textDecoration: 'none' }}>Cart</Link>
        </Typography>
        <Typography variant="subtitle1" style={{ marginRight: '1rem' }}>
          <Link to="/AboutUs" style={{ color: '#fff', textDecoration: 'none' }}>About</Link>
        </Typography>
        <Typography variant="subtitle1" style={{ marginRight: '1rem' }}>
          <Link to="/Feeback" style={{ color: '#fff', textDecoration: 'none' }}>Feedback</Link>
        </Typography>
        <Typography variant="subtitle1" style={{ marginRight: '1rem' }}>
          <Link to="/Support" style={{ color: '#fff', textDecoration: 'none' }}>Support</Link>
        </Typography>
        <Typography variant="subtitle1" style={{ marginRight: '1rem' }}>
          <Link to="/Orders" style={{ color: '#fff', textDecoration: 'none' }}>Your Orders</Link>
        </Typography>
        <Typography variant="subtitle1" style={{ marginRight: '1rem' }}>
          <Link to="/Profile" style={{ color: '#fff', textDecoration: 'none' }}>Profile</Link>
        </Typography>
        <Typography variant="subtitle1" style={{ marginRight: '1rem' }}>
          <Link  onClick={handleLogout} style={{ color: '#fff', textDecoration: 'none' }}>Log Out</Link>
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
