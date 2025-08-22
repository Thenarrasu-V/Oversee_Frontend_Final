import React, { useState, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import LogoImg from '../../assets/Real Logo.png'; // Import the logo image
import HomeIcon from '@mui/icons-material/Home';
import AssignmentIcon from '@mui/icons-material/Assignment';
import EventNoteIcon from '@mui/icons-material/EventNote';
import FeedbackIcon from '@mui/icons-material/Feedback';
import GroupIcon from '@mui/icons-material/Group';
import TaskIcon from '@mui/icons-material/Task';
import { UserContext } from '../UserContext/UserContext'; // Adjust the import path as necessary

const pages = [
  { name: 'Dashboard', icon: <HomeIcon />, link: '/Manager/dashboard' },
  { name: 'Leave Approval', icon: <AssignmentIcon />, link: '/Manager/leave-approval' },
  { name: 'Leave Request', icon: <EventNoteIcon />, link: '/Manager/leave-application' },
  { name: 'Team List', icon: <GroupIcon />, link: '/Manager/team-list' },
  { name: 'Feedback', icon: <FeedbackIcon />, link: '/Manager/feedback' },
  { name: 'Set Tasks', icon: <TaskIcon />, link: '/Manager/set-tasks' },
];

const settings = ['Logout'];

function TopNavBar() {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate(); // Use useNavigate for programmatic navigation
  const { setUser } = useContext(UserContext); // Get setUser function to update user context

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    // Clear user data from context or local storage
    setUser(null); // Clear the user context
    // Navigate to sign-in page
    navigate('/signin');
  };

  return (
    <AppBar
      position="static"
      sx={{
        bgcolor: '#4d4d4d', // Set background color to match design
        color: 'white',  // Set text and icon color to match design
      }}
    >
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <img src={LogoImg} alt="Indus Logo" style={{ height: 80 }} /> {/* Adjust logo size */}
          </IconButton>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', ml: 2 }}>
            {pages.map((page) => (
              <NavLink 
                key={page.name} 
                to={page.link} 
                style={{ textDecoration: 'none', color: 'inherit' }} 
              >
                <Typography
                  variant="button"
                  sx={{
                    color: 'white', 
                    display: 'flex', 
                    alignItems: 'center', 
                    mx: 1,
                    '&:hover': {
                      bgcolor: 'rgba(255, 255, 255, 0.1)', // Optional: Add hover effect
                    }
                  }}
                >
                  {page.icon}
                  <span style={{ marginLeft: '8px' }}>{page.name}</span>
                </Typography>
              </NavLink>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="User Avatar" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={setting === 'Logout' ? handleLogout : handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default TopNavBar;
