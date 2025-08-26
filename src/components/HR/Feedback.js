import React, { useEffect, useState, useRef } from 'react';
import { Box, Paper, Typography, Grid, Button, Alert, Snackbar } from '@mui/material';
import axios from 'axios';
import * as THREE from 'three';
import WAVES from 'vanta/dist/vanta.waves.min';
import '../../styles/HR/HRFeedback.css';

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState('success');

  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);

  // Vanta background
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
            zoom: 1.0,
          })
        );
      }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get('http://localhost:8080/fb/get-all');
        setFeedbacks(response.data);
      } catch (error) {
        console.error('Failed to fetch feedbacks', error);
      }
    };
    fetchFeedbacks();
  }, []);

  const deleteFeedback = async (id) => {
    try {
      await axios.delete('http://localhost:8080/fb/delete', { params: { feedbackId: id } });
      setFeedbacks(feedbacks.filter(fb => fb.id !== id));
      setAlertMessage('Feedback deleted successfully');
      setAlertSeverity('success');
    } catch (error) {
      console.error('Failed to delete feedback', error);
      setAlertMessage('Failed to delete feedback');
      setAlertSeverity('error');
    }
    setShowAlert(true);
  };

  const handleCloseAlert = () => setShowAlert(false);

  return (
    <Box sx={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      {/* Vanta background */}
      <div ref={vantaRef} style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 0 }} />
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      {/* Main content */}
      <Box sx={{ position: 'relative', zIndex: 1, p: { xs:2, sm:3, md:5 }, height: '100%', overflowY: 'auto' }}>
        <Typography variant="h4" align="center"
          sx={{ color:'white', fontWeight:'bold', mb:4, textShadow:'0 2px 8px rgba(0,0,0,0.7)' }}>
          Employee Feedback
        </Typography>

        {feedbacks.length === 0 ? (
          <Typography variant="body1" align="center" sx={{ color:'#ccc' }}>
            No feedback available
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {feedbacks.map(fb => (
              <Grid item xs={12} sm={6} key={fb.id}>
                <Paper elevation={6}
                  sx={{
                    p:3,
                    borderRadius:'16px',
                    background:'rgba(0,0,0,0.5)',
                    color:'white',
                    transition:'transform 0.3s, box-shadow 0.3s',
                    '&:hover': {
                      transform: 'translateY(-6px)',
                      boxShadow: '0 0 20px #00bcd4'
                    }
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight:'bold', mb:1 }}>
                    {fb.fromName}
                  </Typography>
                  <Typography variant="body1" sx={{ mb:2, color:'#ccc' }}>
                    {fb.message}
                  </Typography>
                  <Button variant="contained"
                    sx={{
                      backgroundColor:'#00bcd4',
                      '&:hover': { backgroundColor:'#00acc1' },
                      fontWeight:'bold'
                    }}
                    onClick={() => deleteFeedback(fb.id)}
                  >
                    Mark as read
                  </Button>
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}

        <Snackbar open={showAlert} autoHideDuration={4000} onClose={handleCloseAlert} anchorOrigin={{ vertical:'top', horizontal:'center' }}>
          <Alert onClose={handleCloseAlert} severity={alertSeverity} sx={{ width:'100%', fontWeight:'bold' }}>
            {alertMessage}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
};

export default Feedback;
