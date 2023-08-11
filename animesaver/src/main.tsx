import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import App from './views/App.tsx';
import Login from './views/Login.tsx';
import Dashboard from './views/Dashboard.tsx';
import '././css/index.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material'; 
import Register from './views/Register.tsx';

function Main() {
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>(() => {
    const storedThemeMode = localStorage.getItem('themeMode');
    return (storedThemeMode === 'light' || storedThemeMode === 'dark') ? storedThemeMode : 'dark';
  });

  const theme = createTheme({
    palette: {
      mode: themeMode,
    },
  });

  const toggleTheme = () => {
    const newThemeMode = themeMode === 'light' ? 'dark' : 'light';
    setThemeMode(newThemeMode);
    localStorage.setItem('themeMode', newThemeMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<App onToggleTheme={toggleTheme} />} />
          <Route path="/register" element={<Register/>} />
          <Route path="/login" element={<Login /> } />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>,
);