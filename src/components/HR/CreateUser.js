import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import {
  Box, Typography, Paper, Grid, TextField, Button,
  Dialog, DialogActions, DialogContent, DialogTitle, Alert,
  MenuItem, Select
} from '@mui/material';
import * as THREE from 'three';
import WAVES from 'vanta/dist/vanta.waves.min';
import './../../styles/HR/CreateUser.css';

const initialFormData = {
  name: '',
  email: '',
  phone: '',
  username: '',
  password: '',
  role: '',
  hr_id: '',
  manager_id: ''
};

const CreateUser = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        WAVES({
          el: vantaRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          minHeight: 600.0,
          minWidth: 800.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0x211f31,
          shininess: 60,
          waveSpeed: 1.2,
          zoom: 1.0
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.phone) newErrors.phone = 'Phone is required';
    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (!formData.role) newErrors.role = 'Role is required';
    if (formData.role === 'Manager' && !formData.hr_id) newErrors.hr_id = 'HR ID is required';
    if (formData.role === 'Employee') {
      if (!formData.hr_id) newErrors.hr_id = 'HR ID is required';
      if (!formData.manager_id) newErrors.manager_id = 'Manager ID is required';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const url = formData.role === "Manager"
        ? 'http://localhost:8080/manager/add'
        : 'http://localhost:8080/user/add';

      const payload = {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        username: formData.username,
        role: formData.role,
        password: formData.password,
        hr: { id: formData.hr_id || null },
        manager: { id: formData.role === 'Employee' ? formData.manager_id || null : null }
      };

      await axios.post(url, payload);

      const successMessage = formData.role === 'Manager' ? 'A new Manager is created' : 'A new Employee is added';
      setAlertMessage(successMessage);
      setShowAlert(true);
      setDialogOpen(true);

      setFormData(initialFormData);
      setErrors({});
    } catch (error) {
      console.error('Error creating user:', error);
      setAlertMessage('Error creating user: ' + (error.response ? error.response.data : error.message));
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    }
  };

  return (
    <Box sx={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      {/* Vanta background */}
      <div ref={vantaRef} style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 0 }} />
      <br></br>
      <br></br>
      <br></br>
      {/* Main content */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          p: { xs:2, sm:3, md:5 },
          height: '100%',
          overflowY: 'auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start'
        }}
      >
        <Paper
          elevation={8}
          sx={{
            p: 4,
            maxWidth: 600,
            width: '100%',
            background: 'rgba(0,0,0,0.4)',
            borderRadius: '16px',
            mb: 5 // Extra space for buttons at bottom
          }}
        >
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ color:'white', fontWeight:'bold', textShadow:'0 2px 8px #000' }}
          >
            Create User
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField fullWidth label="Name" name="name" value={formData.name} onChange={handleChange}
                  error={Boolean(errors.name)} helperText={errors.name}
                  sx={{ input:{ color:'white' }, label:{ color:'white' } }} />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Email" name="email" value={formData.email} onChange={handleChange}
                  error={Boolean(errors.email)} helperText={errors.email} type="email"
                  sx={{ input:{ color:'white' }, label:{ color:'white' } }} />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Phone" name="phone" value={formData.phone} onChange={handleChange}
                  error={Boolean(errors.phone)} helperText={errors.phone}
                  sx={{ input:{ color:'white' }, label:{ color:'white' } }} />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Username" name="username" value={formData.username} onChange={handleChange}
                  error={Boolean(errors.username)} helperText={errors.username}
                  sx={{ input:{ color:'white' }, label:{ color:'white' } }} />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Password" name="password" value={formData.password} onChange={handleChange}
                  error={Boolean(errors.password)} helperText={errors.password} type="password"
                  sx={{ input:{ color:'white' }, label:{ color:'white' } }} />
              </Grid>
              <Grid item xs={12}>
                <Select fullWidth name="role" value={formData.role} onChange={handleChange}
                  sx={{ color:'white', '.MuiSelect-icon': { color: 'white' } }}>
                  <MenuItem value="">Select Role</MenuItem>
                  <MenuItem value="Manager">Manager</MenuItem>
                  <MenuItem value="Employee">Employee</MenuItem>
                </Select>
                {errors.role && <Typography color="error">{errors.role}</Typography>}
              </Grid>
              {formData.role === 'Manager' && (
                <Grid item xs={12}>
                  <TextField fullWidth label="HR ID" name="hr_id" value={formData.hr_id} onChange={handleChange}
                    error={Boolean(errors.hr_id)} helperText={errors.hr_id}
                    sx={{ input:{ color:'white' }, label:{ color:'white' } }} />
                </Grid>
              )}
              {formData.role === 'Employee' && (
                <>
                  <Grid item xs={12}>
                    <TextField fullWidth label="HR ID" name="hr_id" value={formData.hr_id} onChange={handleChange}
                      error={Boolean(errors.hr_id)} helperText={errors.hr_id}
                      sx={{ input:{ color:'white' }, label:{ color:'white' } }} />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField fullWidth label="Manager ID" name="manager_id" value={formData.manager_id} onChange={handleChange}
                      error={Boolean(errors.manager_id)} helperText={errors.manager_id}
                      sx={{ input:{ color:'white' }, label:{ color:'white' } }} />
                  </Grid>
                </>
              )}
              <Grid item xs={12}>
                <Button type="submit" variant="contained"
                  sx={{ fontWeight:'bold', backgroundColor:'#00bcd4', '&:hover':{backgroundColor:'#00acc1'}, width:'100%' }}>
                  Create User
                </Button>
              </Grid>
            </Grid>
          </form>

          {showAlert && (
            <Alert severity={alertMessage.startsWith('Error') ? 'error' : 'success'} sx={{ mt:2 }}>
              {alertMessage}
            </Alert>
          )}
        </Paper>

        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
          <DialogTitle>Success</DialogTitle>
          <DialogContent>
            <Typography>{alertMessage}</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialogOpen(false)} sx={{ fontWeight:'bold', color:'#00bcd4' }}>Close</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default CreateUser;
