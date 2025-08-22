import React from 'react';
import { Box, Typography, Grid, Paper, Card, CardContent } from '@mui/material';
import '../../styles/Employee/Employee.css';

const gradientBackground = {
  background: 'linear-gradient(to right, #e0e0e0, #6d6d6d)' // gradient from neutral-300 to stone-400
};

const whiteBackground = {
  backgroundColor: '#ffffff' // solid white background
};

const EmployeeDashboard = () => {
    // Retrieve user data from local storage
    const storedUser = JSON.parse(localStorage.getItem('user')) || {};

    const employee = {
        name: storedUser.name || 'Employee Name', // Fallback name
        role: storedUser.role || 'Employee Role',
    };

    return (
        <Box sx={{ display: 'flex', height: '100vh' }}>

            {/* Main Content */}
            <Box component="main" sx={{ flexGrow: 1, p: 3, ml: 6 }}> {/* Increased margin-left to 6 */}
                <Grid container spacing={3}>
                    {/* Employee Dashboard Container */}
                    <Grid item xs={12}>
                        <Paper elevation={3} sx={{ padding: 3, ...gradientBackground }}>
                            <Typography variant="h4" align="center" gutterBottom>
                                Employee Dashboard
                            </Typography>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Card elevation={3} sx={{ ...whiteBackground }}>
                            <CardContent>
                                <Typography variant="h5" gutterBottom>
                                    Welcome, {employee.name}
                                </Typography>
                                <Typography variant="subtitle1" color="textSecondary">
                                    Role: {employee.role}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Motivation Container */}
                    <Grid item xs={12} md={6}>
                        <Paper elevation={3} sx={{ padding: 3, ...whiteBackground }}>
                            <Typography variant="h5" gutterBottom>
                                Stay Motivated!
                            </Typography>
                            <Typography variant="body1" color="textSecondary">
                                Remember, your efforts contribute to the success of the team and the company. Keep up the great work, and always strive for excellence. Your hard work is noticed and appreciated!
                            </Typography>
                        </Paper>
                    </Grid>

                    {/* Leave Information Container */}
                    <Grid item xs={12} md={6}>
                        <Paper elevation={3} sx={{ padding: 3, ...whiteBackground }}>
                            <Typography variant="h5" gutterBottom>
                                Applying for Leave
                            </Typography>
                            <Typography variant="body1" color="textSecondary">
                                If you need to take some time off, please submit a leave request through the HR portal or contact your manager directly. Make sure to provide a valid reason and plan your leave in advance to ensure a smooth workflow.
                            </Typography>
                        </Paper>
                    </Grid>

                    {/* Feedback Information Container */}
                    <Grid item xs={12} md={6}>
                        <Paper elevation={3} sx={{ padding: 3, ...whiteBackground }}>
                            <Typography variant="h5" gutterBottom>
                                Send Us Your Feedback
                            </Typography>
                            <Typography variant="body1" color="textSecondary">
                                We value your feedback! If you have suggestions or comments about the workplace, your role, or any other aspect, please share them with us. Your input helps us improve and create a better work environment.
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default EmployeeDashboard;
