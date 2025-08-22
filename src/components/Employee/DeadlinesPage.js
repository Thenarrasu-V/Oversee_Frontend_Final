import React, { useState } from 'react';
import { Box, Typography, Paper, Button, List, ListItem, ListItemText, ListItemSecondaryAction, Grid } from '@mui/material';
import Sidebar from './EmployeeSidebar';
import './../../styles/Employee/Deadlines.css';

const DeadlinesPage = () => {
    const [deadlines, setDeadlines] = useState([
        { id: 1, task: 'Finish project report', dueDate: '2024-07-30', isComplete: false },
        { id: 2, task: 'Submit expense reports', dueDate: '2024-08-05', isComplete: false },
        { id: 3, task: 'Complete code review', dueDate: '2024-08-10', isComplete: false },
    ]);

    const markAsComplete = (id) => {
        setDeadlines(deadlines.map(deadline =>
            deadline.id === id ? { ...deadline, isComplete: true } : deadline
        ));
    };

    return (
        <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>

            <Box sx={{ flexGrow: 1, p: 3, bgcolor: 'linear-gradient(to right, #000000, #e0e0e0)', height: '100%', overflowY: 'auto' }}>
                <Paper elevation={3} sx={{ padding: 3, bgcolor: 'white', mb: 3 }}>
                    <Typography variant="h4" align="center" gutterBottom sx={{ color: 'black' }}>
                        Deadlines
                    </Typography>
                </Paper>
                <Grid container spacing={3}>
                    <Grid item xs={15} md={14}> {/* Increased width */}
                        <Box sx={{ bgcolor: 'white', borderRadius: 2, padding: 3 }}>
                            <Typography variant="h5" sx={{ color: 'black', mb: 2 }}>
                                Your Deadlines
                            </Typography>
                            <List>
                                {deadlines.map(deadline => (
                                    <ListItem
                                        key={deadline.id}
                                        sx={{
                                            bgcolor: deadline.isComplete ? '#f0f0f0' : '#fafafa',
                                            color: deadline.isComplete ? '#a0a0a0' : '#333',
                                            borderRadius: 2,
                                            mb: 2,
                                            padding: 2,
                                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                        }}
                                    >
                                        <ListItemText
                                            primary={<Typography variant="body1" sx={{ fontSize: '1.2em' }}>{deadline.task}</Typography>}
                                            secondary={<Typography variant="body2" sx={{ color: '#c70000' }}>Due: {deadline.dueDate}</Typography>}
                                        />
                                        <ListItemSecondaryAction>
                                            {!deadline.isComplete ? (
                                                <Button
                                                    variant="contained"
                                                    color="success"
                                                    onClick={() => markAsComplete(deadline.id)}
                                                    sx={{ height: '40px', borderRadius: 2, fontSize: '0.875em' }}
                                                >
                                                    Mark as Complete
                                                </Button>
                                            ) : (
                                                <Typography variant="body2" sx={{ color: '#4caf50' }}>
                                                    Completed
                                                </Typography>
                                            )}
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={1}> {/* Reduced width */}
                        {/* Add any additional content or grids here */}
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default DeadlinesPage;
