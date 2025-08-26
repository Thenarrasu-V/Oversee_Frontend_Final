import React, { useState, useEffect, useRef } from 'react';
import {
  Box, Typography, Paper, Grid, Card, CardContent, Button,
  TextField, Alert, Radio, RadioGroup, FormControlLabel, FormControl
} from '@mui/material';
import * as THREE from 'three';
import WAVES from 'vanta/dist/vanta.waves.min';
import axios from 'axios';
import './../../styles/HR/Employee.css';

const EmployeeManagerList = () => {
  const [employees, setEmployees] = useState([]);
  const [managers, setManagers] = useState([]);
  const [isEditing, setIsEditing] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    username: '',
    password: '',
  });
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [error, setError] = useState('');
  const [selectedOption, setSelectedOption] = useState('employee');

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

  useEffect(() => {
    fetchData();
  }, [selectedOption]);

  const fetchData = () => {
    const url = selectedOption === 'employee'
      ? 'http://localhost:8080/user/all'
      : 'http://localhost:8080/manager/all';

    axios.get(url)
      .then(response => {
        if (selectedOption === 'employee') {
          setEmployees(response.data);
        } else {
          setManagers(response.data);
        }
      })
      .catch(err => {
        console.error('Failed to fetch data:', err);
        setError('Failed to fetch data');
      });
  };

  const handleDelete = async (id) => {
    try {
      const url = selectedOption === 'employee'
        ? `http://localhost:8080/user/delete/${id}`
        : `http://localhost:8080/manager/delete/${id}`;

      await axios.delete(url);

      if (selectedOption === 'employee') {
        setEmployees(employees.filter(employee => employee.id !== id));
      } else {
        setManagers(managers.filter(manager => manager.id !== id));
      }

      setFeedbackMessage(`${selectedOption.charAt(0).toUpperCase() + selectedOption.slice(1)} deleted successfully!`);
      setError('');
    } catch (err) {
      console.error('Error deleting:', err);
      setError(`Failed to delete ${selectedOption}. ${err.message}`);
    }
  };

  const handleEdit = (id) => {
    const item = selectedOption === 'employee'
      ? employees.find(emp => emp.id === id)
      : managers.find(mgr => mgr.id === id);

    setIsEditing(id);
    setEditFormData({
      name: item.name,
      email: item.email,
      phone: item.phone,
      role: item.role,
      username: item.username,
      password: item.password
    });
  };

  const handleSave = () => {
    if (!editFormData.name || !editFormData.email || !editFormData.phone || !editFormData.role || !editFormData.username || !editFormData.password) {
      setError('All fields are required');
      return;
    }

    const url = selectedOption === 'employee'
      ? `http://localhost:8080/user/edit/${isEditing}`
      : `http://localhost:8080/manager/edit/${isEditing}`;

    axios.put(url, editFormData)
      .then(() => {
        const updatedList = selectedOption === 'employee'
          ? employees.map(emp => emp.id === isEditing ? { ...emp, ...editFormData } : emp)
          : managers.map(mgr => mgr.id === isEditing ? { ...mgr, ...editFormData } : mgr);

        if (selectedOption === 'employee') setEmployees(updatedList);
        else setManagers(updatedList);

        setIsEditing(null);
        setFeedbackMessage(`${selectedOption.charAt(0).toUpperCase() + selectedOption.slice(1)} details updated successfully!`);
        setError('');
      })
      .catch(err => {
        console.error('Error updating:', err);
        setError(`Failed to update ${selectedOption}. ${err.message}`);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const handleCancel = () => {
    setIsEditing(null);
    setError('');
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setFeedbackMessage('');
    setError('');
  };

  const displayList = selectedOption === 'employee' ? employees : managers;

  return (
    <Box sx={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden', zIndex: 0 }}>
      {/* Vanta background */}
      <div ref={vantaRef} style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 0 }} />
      <br></br>
      {/* Main content */}
      <Box sx={{ position: 'relative', zIndex: 1, p: { xs:2, sm:3, md:5 }, width: '100%', height: '100%', overflowY: 'auto' }}>
        <Typography
          variant="h3"
          align="center"
          sx={{ fontWeight: 'bold', letterSpacing: 2, mb:4, color:'white', textShadow:'0 2px 8px #1a1a2a' }}
        >
          <br></br>
          {selectedOption.charAt(0).toUpperCase() + selectedOption.slice(1)} List
        </Typography>

        <FormControl component="fieldset" sx={{ mt:2 }}>
          <RadioGroup row aria-label="employee-manager" name="employee-manager" value={selectedOption} onChange={handleOptionChange}>
            <FormControlLabel value="employee" control={<Radio sx={{ color: 'white' }} />} label="Employee" />
            <FormControlLabel value="manager" control={<Radio sx={{ color: 'white' }} />} label="Manager" />
          </RadioGroup>
        </FormControl>

        {feedbackMessage && <Alert severity="success" sx={{ mt:2 }}>{feedbackMessage}</Alert>}
        {error && <Alert severity="error" sx={{ mt:2 }}>{error}</Alert>}

        <Box sx={{ mt:3 }}>
          <Grid container spacing={3}>
            {displayList.map(item => (
              <Grid item xs={12} sm={6} md={4} key={item.id}>
                <Card className="dashboard-card" elevation={8}>
                  <CardContent>
                    {isEditing === item.id ? (
                      <>
                        <TextField fullWidth label="Name" name="name" value={editFormData.name} onChange={handleChange} margin="normal" sx={{ input:{ color:'white' }, label:{ color:'white' } }} />
                        <TextField fullWidth label="Email" name="email" value={editFormData.email} onChange={handleChange} margin="normal" type="email" sx={{ input:{ color:'white' }, label:{ color:'white' } }} />
                        <TextField fullWidth label="Phone" name="phone" value={editFormData.phone} onChange={handleChange} margin="normal" sx={{ input:{ color:'white' }, label:{ color:'white' } }} />
                        <TextField fullWidth label="Role" name="role" value={editFormData.role} onChange={handleChange} margin="normal" sx={{ input:{ color:'white' }, label:{ color:'white' } }} />
                        <TextField fullWidth label="Username" name="username" value={editFormData.username} onChange={handleChange} margin="normal" sx={{ input:{ color:'white' }, label:{ color:'white' } }} />
                        <TextField fullWidth label="Password" name="password" value={editFormData.password} onChange={handleChange} margin="normal" type="password" sx={{ input:{ color:'white' }, label:{ color:'white' } }} />
                        <Box sx={{ mt:2, display:'flex', gap:2 }}>
                          <Button variant="contained" sx={{ fontWeight:'bold', backgroundColor:'#00bcd4', '&:hover':{backgroundColor:'#00acc1'} }} onClick={handleSave}>Save</Button>
                          <Button variant="contained" color="error" sx={{ fontWeight:'bold' }} onClick={handleCancel}>Cancel</Button>
                        </Box>
                      </>
                    ) : (
                      <>
                        <Typography variant="h6" sx={{ color:'white', fontWeight:'bold' }}>{item.name}</Typography>
                        <Typography variant="body2" sx={{ color:'white', opacity:0.9 }}><strong>Email:</strong> {item.email}</Typography>
                        <Typography variant="body2" sx={{ color:'white', opacity:0.9 }}><strong>Phone:</strong> {item.phone}</Typography>
                        <Typography variant="body2" sx={{ color:'white', opacity:0.9 }}><strong>Role:</strong> {item.role}</Typography>
                        <Typography variant="body2" sx={{ color:'white', opacity:0.9 }}><strong>Username:</strong> {item.username}</Typography>
                        <Box sx={{ mt:2, display:'flex', gap:2 }}>
                          <Button variant="contained" sx={{ fontWeight:'bold', backgroundColor:'#00bcd4', '&:hover':{backgroundColor:'#00acc1'} }} onClick={() => handleEdit(item.id)}>Edit</Button>
                          <Button variant="contained" color="error" sx={{ fontWeight:'bold' }} onClick={() => handleDelete(item.id)}>Delete</Button>
                        </Box>
                      </>
                    )}
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

export default EmployeeManagerList;
