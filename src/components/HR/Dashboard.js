// HRDashboard.js

import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
} from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import * as THREE from 'three';
import WAVES from 'vanta/dist/vanta.waves.min';
import '../../styles/HR/HRDashboard.css';

const HRDashboard = () => {
  const [formData, setFormData] = useState({ name: '', department: '', role: '' });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

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
          zoom: 1.0,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  const data = [
    { name: 'Jan', Sales: 4000 },
    { name: 'Feb', Sales: 3000 },
    { name: 'Mar', Sales: 2000 },
    { name: 'Apr', Sales: 2780 },
    { name: 'May', Sales: 1890 },
    { name: 'Jun', Sales: 2390 },
    { name: 'Jul', Sales: 3490 },
  ];

  return (
    
    <Box sx={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden', zIndex: 0 }}>
      {/* Vanta background */}
      <div ref={vantaRef} style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 0 }} />

      {/* Main content */}
      <Box sx={{
        position: 'relative',
        zIndex: 1,
        p: { xs: 1, sm: 2, md: 4 },
        width: '100%',
        height: '100%',
        overflowY: 'auto',
        boxSizing: 'border-box'
      }}>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <Typography
          variant="h3"
          align="center"
          sx={{
            fontWeight: 'bold',
            letterSpacing: 2,
            mb: 4,
            color: 'white',
            textShadow: '0 2px 8px #1a1a2a'
          }}
        >
          HR Dashboard
        </Typography>

        {/* Two per row */}
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={6} md={6}>
            <Card className="dashboard-card" elevation={8}>
              <CardContent>
                <Typography variant="h5" gutterBottom sx={{ color: 'white', fontWeight: 'bold' }}>
                  Employee Overview
                </Typography>
                <Typography variant="body1" sx={{ color: 'white', opacity: 0.96 }}>
                  Get a comprehensive view of all employees, their roles, and departments.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <Card className="dashboard-card" elevation={8}>
              <CardContent>
                <Typography variant="h5" gutterBottom sx={{ color: 'white', fontWeight: 'bold' }}>
                  Leave Requests
                </Typography>
                <Typography variant="body1" sx={{ color: 'white', opacity: 0.96 }}>
                  Approve or reject leave requests to balance the workforce schedule.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <Card className="dashboard-card" elevation={8}>
              <CardContent>
                <Typography variant="h5" gutterBottom sx={{ color: 'white', fontWeight: 'bold' }}>
                  Create New Employee
                </Typography>
                <Typography variant="body1" sx={{ color: 'white', opacity: 0.96 }}>
                  Quickly add new members to the team with required details.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <Card className="dashboard-card" elevation={8}>
              <CardContent>
                <Typography variant="h5" gutterBottom sx={{ color: 'white', fontWeight: 'bold' }}>
                  Employee Feedback
                </Typography>
                <Typography variant="body1" sx={{ color: 'white', opacity: 0.96 }}>
                  Review and manage employee feedback to improve workplace satisfaction.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Chart full width row */}
          <Grid item xs={12}>
            <Paper className="dashboard-card" elevation={8} sx={{ p: 4 }}>
              <Typography variant="h5" gutterBottom sx={{ color: 'white', fontWeight: 'bold' }}>
                Employee Performance Overview
              </Typography>
              <Box sx={{ width: '100%', height: 400, maxWidth: 700, mx: 'auto' }}>
                <BarChart width={700} height={300} data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#bbb" />
                  <XAxis dataKey="name" stroke="white" />
                  <YAxis stroke="white" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Sales" fill="#00bcd4" />
                </BarChart>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default HRDashboard;
