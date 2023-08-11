import React, { useState } from 'react';
import { TextField, Button, Typography, IconButton, InputAdornment, Box } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link } from 'react-router-dom';


const Login: React.FC = () => {
  const url = import.meta.env.VITE_URL;
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError("Username and password are required");
      return;
    }
    console.log(username, password);
    const response = await fetch(`${url}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: username, password: password })
    });
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem('token', data.access_token);
      navigate('/');
    } else {
      setError("Invalid username or password");
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
          <Box display="flex" justifyContent="center" width="100%">
            <Button onClick={() => navigate('/register')} variant="contained" color="secondary" style={{ marginRight: '10px' }}>
              Sign up
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Login
            </Button>
          </Box>
          {error && (
            <Typography variant="body1" color="error" style={{ marginTop: '10px' }}>
              {error}
            </Typography>
          )}
        </Box>
      </form>
    </Box>
  );
};

export default Login;