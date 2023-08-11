import { useState, useMemo, useEffect, CSSProperties } from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import { Brightness4, Brightness7, Person, Search } from '@mui/icons-material'; // Import de l'icône Search
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import CheckUserLogin from '../utils/CheckUserLogin';
interface HeaderProps {
  onSearch: (search: string) => void;
  onToggleTheme: (mode: 'light' | 'dark') => void;
  showSearch: boolean; // Nouvelle prop pour afficher ou non la barre de recherche
}

function Header(props: HeaderProps) {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [profilepicture, setProfilepicture] = useState('');
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.onSearch(search);
  };

  const handleToggleTheme = () => {
    const themeMode = isDarkMode ? 'light' : 'dark';
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('themeMode', themeMode);
    props.onToggleTheme(themeMode);
  }

  const headerStyles: CSSProperties = useMemo(() => ({
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    zIndex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '5px',
    transition: 'transform 0.3s ease-in-out',
    transform: isHeaderVisible ? 'translateY(0)' : 'translateY(-100%)',
  }), [isHeaderVisible]);

  const formStyles = useMemo(() => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    maxWidth: '600px',
    margin: '0 auto',
  }), []);

  const inputStyles = useMemo(() => ({
    flex: 1,
    marginRight: '10px',
  }), []);

  const handlePersonClick = async () => {
    CheckUserLogin();
    if (await CheckUserLogin()) {
      navigate('/dashboard');
    }
    else {
      navigate('/login');
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setIsHeaderVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  return (
    <header style={headerStyles}>
      {props.showSearch && ( 
        <form onSubmit={handleSubmit} style={formStyles}>
          <TextField label="Search anime" value={search} onChange={(e) => setSearch(e.target.value)} style={inputStyles} variant="filled" type="search"/>
          <Button type="submit" variant="outlined" size="small" startIcon={<Search />}> 
          </Button>
        </form>
      )}
      <div>
        <IconButton onClick={handlePersonClick}>
          <Person />
        </IconButton>
        </div>
      <div>
        <IconButton onClick={handleToggleTheme}>
          {isDarkMode ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </div>
    </header>
  );
}

export default Header;