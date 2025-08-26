import * as React from 'react';
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
import LogoImg from '../../assets/Real Logo.png'; 
import HomeIcon from '@mui/icons-material/Home';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ListIcon from '@mui/icons-material/List';
import AddIcon from '@mui/icons-material/Add';
import FeedbackIcon from '@mui/icons-material/Feedback';
import Button from '@mui/material/Button';
import { useContext } from 'react';
import { UserContext } from '../UserContext/UserContext'; 

const pages = [
  { name: 'Dashboard', icon: <HomeIcon />, link: '/hr/dashboard' },
  { name: 'Leave Approval', icon: <AssignmentIcon />, link: '/hr/leave-approval' },
  { name: 'Users List', icon: <ListIcon />, link: '/hr/employee-list' },
  { name: 'Create Employee', icon: <AddIcon />, link: '/hr/create-user' },
  { name: 'Feedback', icon: <FeedbackIcon />, link: '/hr/feedback' },
];

const settings = ['Logout'];

function HRTopNavBar() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate(); 
  const { setUser } = useContext(UserContext); 

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    setUser(null);
    navigate('/signin');
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        background: 'rgba(77, 77, 77, 0.4)',  
        backdropFilter: 'blur(12px)',         
        WebkitBackdropFilter: 'blur(12px)',   
        color: 'white',
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
      }}
    >
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <img src={LogoImg} alt="Indus Logo" style={{ height: 80 }} />
          </IconButton>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', ml: 2 }}>
            {pages.map((page) => (
              <NavLink 
                key={page.name} 
                to={page.link} 
                style={{ textDecoration: 'none', color: 'inherit' }} 
              >
                <Button
                  sx={{
                    color: 'white', 
                    display: 'flex', 
                    alignItems: 'center', 
                    mx: 1,
                    '&:hover': {
                      bgcolor: 'rgba(255, 255, 255, 0.15)',
                      borderRadius: '8px',
                    }
                  }}
                >
                  {page.icon}
                  <Typography variant="button" sx={{ ml: 1 }}>
                    {page.name}
                  </Typography>
                </Button>
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
                <MenuItem 
                  key={setting} 
                  onClick={setting === 'Logout' ? handleLogout : handleCloseUserMenu}
                >
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

export default HRTopNavBar;
