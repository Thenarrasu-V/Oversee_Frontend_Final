import React, { useState, useEffect, useRef } from 'react';
import {
  Box, Typography, TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Paper
} from '@mui/material';
import axios from 'axios';
import './../../styles/Employee/EditPersonalDetails.css';

const EditPersonalDetails = () => {
  const [profile, setProfile] = useState({
    id: '', fullName: '', emailAddress: '', userName: '',
    newPassword: '', contactNumber: '', hrId: '', userRole: '', managerId: ''
  });

  const [errors, setErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitButtonRef = useRef(null); // Reference to the submit button

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      setProfile({
        id: userData.id || '',
        fullName: userData.name || '',
        emailAddress: userData.email || '',
        userName: userData.username || '',
        newPassword: userData.password || '',
        contactNumber: userData.phone || '',
        hrId: userData.hr ? userData.hr.id : '',
        userRole: userData.role || '',
        managerId: userData.manager ? userData.manager.id : '',
      });
    }
  }, []);

  useEffect(() => {
    // Scroll the submit button into view with an offset
    if (submitButtonRef.current) {
      submitButtonRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'nearest',
      });
      // Optional: Adjust scroll position with an offset
      window.scrollBy(0, -100); // Adjust this value as needed
    }
  }, [isSubmitting]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const validate = () => {
    let isValid = true;
    const newErrors = {};

    if (!profile.fullName.trim()) {
      newErrors.fullName = 'Full Name is required';
      isValid = false;
    }
    if (!profile.emailAddress.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)) {
      newErrors.emailAddress = 'Invalid email address';
      isValid = false;
    }
    if (!profile.userName.trim()) {
      newErrors.userName = 'Username is required';
      isValid = false;
    }
    if (profile.newPassword && profile.newPassword.length < 6) {
      newErrors.newPassword = 'Password must be at least 6 characters long';
      isValid = false;
    }
    if (!profile.contactNumber.match(/^\d{10}$/)) {
      newErrors.contactNumber = 'Phone number must be 10 digits long';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const postProfileSettings = async (updatedProfile) => {
    try {
      const response = await axios.post('http://localhost:8080/userDetails/add', {
        name: updatedProfile.fullName,
        email: updatedProfile.emailAddress,
        phone: updatedProfile.contactNumber,
        username: updatedProfile.userName,
        password: updatedProfile.newPassword,
        role: updatedProfile.userRole,
        hr: { id: updatedProfile.hrId },
        manager: { id: updatedProfile.managerId }
      }, {
        headers: { 'Content-Type': 'application/json' },
      });
      return response.data;
    } catch (error) {
      console.error('Error posting profile:', error.response?.data || error.message);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      try {
        await postProfileSettings(profile);
        setIsError(false);
        setIsModalOpen(true);
      } catch {
        setIsError(true);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div style={{ background: 'linear-gradient(to right, #cbd5e1, #475569)', height: '100vh', overflow: 'auto' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '90%', overflowY: 'auto', p: 3 }}>
        <Box sx={{
          flexGrow: 1, background: 'linear-gradient(to right, #cbd5e1, #475569)', borderRadius: 2, boxShadow: 3
        }}>
          <Paper elevation={3} sx={{
            padding: 3, bgcolor: 'white', display: 'flex', flexDirection: 'column',
            alignItems: 'center', borderRadius: 2, boxShadow: 3, mb: 10 // Added bottom margin
          }}>
            <Typography variant="h4" align="center" gutterBottom>
              Edit Profile Settings
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ width: '100%', maxWidth: '600px', mb: 10 }} // Increased margin-bottom
            >
              <Grid container spacing={2}>
                {['id', 'hrId', 'userRole', 'managerId'].map((field) => (
                  <Grid item xs={12} key={field}>
                    <TextField
                      fullWidth id={field} label={field.replace(/Id/g, ' ID')} variant="outlined"
                      value={profile[field]} InputProps={{ readOnly: true }} sx={{ bgcolor: 'white' }}
                    />
                  </Grid>
                ))}
                {[
                  { id: 'fullName', label: 'Full Name' },
                  { id: 'emailAddress', label: 'Email Address', type: 'email' },
                  { id: 'userName', label: 'Username' },
                  { id: 'newPassword', label: 'New Password', type: 'password' },
                  { id: 'contactNumber', label: 'Contact Number', type: 'tel' },
                ].map(({ id, label, type }) => (
                  <Grid item xs={12} key={id}>
                    <TextField
                      fullWidth id={id} name={id} label={label} variant="outlined" type={type || 'text'}
                      value={profile[id]} onChange={handleChange} error={Boolean(errors[id])}
                      helperText={errors[id]} sx={{ bgcolor: 'white' }}
                    />
                  </Grid>
                ))}
                <Grid item xs={12} sx={{ mt: 2 }}>
                  <Button
                    type="submit" variant="contained" color="primary" fullWidth disabled={isSubmitting}
                    ref={submitButtonRef} // Reference to the submit button
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Paper>

          <Dialog open={isModalOpen} onClose={closeModal}>
            <DialogTitle>Update Status</DialogTitle>
            <DialogContent>
              <Typography variant="body1" color={isError ? 'error' : 'inherit'}>
                {isError ? 'There was an error updating your profile settings.' : 'Your profile settings have been updated successfully.'}
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={closeModal} color="primary">Close</Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Box>
    </div>
  );
};

export default EditPersonalDetails;
