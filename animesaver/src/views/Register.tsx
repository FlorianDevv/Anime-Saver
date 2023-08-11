import React, { useState } from 'react';
import { TextField, Button, Typography, IconButton, InputAdornment, Box } from '@mui/material';
import { Link, useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Register: React.FC = () => {
  const url = import.meta.env.VITE_URL;
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [profilepicture, setProfilePicture] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleProfilePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProfilePicture(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await fetch(`${url}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password, profilepicture })
    });
    if (response.ok) {
      const loginResponse = await fetch(`${url}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
      const loginData = await loginResponse.json();
      if (loginResponse.ok) {
        localStorage.setItem('token', loginData.token);
        localStorage.setItem('username', loginData.user.username);
        localStorage.setItem('userId', loginData.user.id);
        navigate('/');
      } else {
        setErrorMessage('Login failed. Please try again.');
      }
    } else {
      setErrorMessage('Registration failed. Please try again.');
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Box display="flex" justifyContent="center" width="100%">
        <Button component={Link} to="/" variant="outlined" color="primary" style={{ marginRight: '10px' }}>
          Home
        </Button>
      </Box>
      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="column" alignItems="center" width="300px">
          
          <TextField
            label="Username"
            variant="outlined"
            value={username}
            onChange={handleUsernameChange}
            margin="normal"
            fullWidth
          />
          <TextField
            label="Password"
            variant="outlined"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={handlePasswordChange}
            margin="normal"
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <TextField
            label="Profile Picture (optional)"
            variant="outlined"
            value={profilepicture}
            onChange={handleProfilePictureChange}
            margin="normal"
            fullWidth
          />
          <Box display="flex" justifyContent="center" width="100%">
            <Button type="submit" variant="contained" color="primary">
              Register
            </Button>
            
          </Box>
          <Typography variant="h6" align="center" margin="normal">
            {`Already have an account? `}
            <Button color="primary" onClick={() => navigate('/login')}>
              Login
            </Button>
          </Typography>
          {errorMessage && (
            <Typography
              variant="h6"
              color="error"
              align="center"
              margin="normal"
            >
              {errorMessage}
            </Typography>
          )}
        </Box>
      </form>
    </Box>
  );
};

export default Register;
