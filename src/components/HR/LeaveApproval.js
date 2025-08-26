import React, { useEffect, useState, useRef } from 'react';
import { Box, Typography, Paper, Grid, Card, CardContent, Button, Alert } from '@mui/material';
import * as THREE from 'three';
import WAVES from 'vanta/dist/vanta.waves.min';
import '../../styles/Manager/LeaveApproval.css';
import axios from 'axios';

const LeaveApproval = () => {
    const [list, setList] = useState([]);
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [error, setError] = useState('');

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

    const handleAcceptLeave = async (id) => {
        try {
            await axios.patch(`http://localhost:8080/leave/hr/approve/${id}`);
            setList(list.filter(request => request.id !== id));
            setFeedbackMessage('Leave request accepted successfully!');
            setError('');
        } catch (error) {
            setError('Error accepting leave request');
        }
    };

    const handleDenyLeave = async (id) => {
        try {
            await axios.patch(`http://localhost:8080/leave/hr/deny/${id}`);
            setList(list.filter(request => request.id !== id));
            setFeedbackMessage('Leave request denied!');
            setError('');
        } catch (error) {
            setError('Error denying leave request');
        }
    };

    const fetchLeaveRequests = async () => {
        try {
            const res = await axios.get("http://localhost:8080/leave/apply/hr/getAll");
            setList(res.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchLeaveRequests();
    }, []);

    return (
        
        <Box sx={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden', zIndex: 0 }}>
            {/* Vanta background */}
            <div ref={vantaRef} style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 0 }} />

            {/* Main content */}
            <Box sx={{
                position: 'relative',
                zIndex: 1,
                p: { xs: 2, sm: 3, md: 5 },
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
                    Leave Approval
                </Typography>

                {feedbackMessage && (
                    <Alert severity="success" sx={{ mt: 2 }}>
                        {feedbackMessage}
                    </Alert>
                )}

                {error && (
                    <Alert severity="error" sx={{ mt: 2 }}>
                        {error}
                    </Alert>
                )}

                <Box sx={{ overflowY: 'auto', paddingRight: '16px' }}>
                    <Grid container spacing={3}>
                        {list.map(request => (
                            <Grid item xs={12} sm={6} md={4} key={request.id}>
                                <Card className="dashboard-card" elevation={8}>
                                    <CardContent>
                                        <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
                                            Employee Name: {request.user ? request.user.name : 'N/A'}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: 'white', opacity: 0.9 }}>
                                            Position: {request.user ? request.user.role : 'N/A'}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: 'white', opacity: 0.9 }}>
                                            Start Date: {request.startDate || 'N/A'}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: 'white', opacity: 0.9 }}>
                                            End Date: {request.endDate || 'N/A'}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: 'white', opacity: 0.9 }}>
                                            Reason: {request.reason || 'N/A'}
                                        </Typography>
                                        <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                                            <Button 
                                                variant="contained" 
                                                sx={{ fontWeight: 'bold', backgroundColor: '#00bcd4', '&:hover': { backgroundColor: '#00acc1' } }}
                                                onClick={() => handleAcceptLeave(request.id)}>
                                                Accept
                                            </Button>
                                            <Button 
                                                variant="contained" 
                                                color="error" 
                                                sx={{ fontWeight: 'bold' }}
                                                onClick={() => handleDenyLeave(request.id)}>
                                                Deny
                                            </Button>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Box>
        </Box>
    );
};

export default LeaveApproval;
