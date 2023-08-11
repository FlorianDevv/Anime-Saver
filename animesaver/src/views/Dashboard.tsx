import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import CheckUserLogin from '../utils/CheckUserLogin';
import UserInfo from '../utils/UserInfo';
import ScrollingCardUI from '../components/ScrollingCardUI';
import ModalEditProfile from '../components/ModalEditProfile';
import '../css/Dashboard.css';

export interface AnimeDB {
  animeId: number;
  anime: [animeId: number, image: string, title: string ]
  image: string;
  title: string;
  rating: number;
  comment: string;
}

export interface AnimeDetails {
  mal_id: number;
  title: string;
  image_url: string;
  score: number;
  yearstart: number;
  yearfinish: number;
  synopsis: string;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const url = import.meta.env.VITE_URL;
  const [username, setUsername] = useState<string>('');
  const [animes, setAnimesCheck] = useState<AnimeDB[]>([]);
  const [selectedAnime, setSelectedAnime] = useState<AnimeDetails | null>(null);
  const [profilePicture, setProfilePicture] = useState<string>('https://w7.pngwing.com/pngs/205/731/png-transparent-default-avatar-thumbnail.png');
  const handleCheckLogin = async () => {
    const isLoggedIn = await CheckUserLogin();
    return isLoggedIn;
  }
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    handleCheckLogin().then((result) => setIsLoggedIn(result));
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      setIsLoading(true);
      fetch(`${url}/animesaver/users/animes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setAnimesCheck(data);
          setIsLoading(false);
        })
        .catch((error) => console.error(error));

      UserInfo().then((result: any) => {
        if (result)
          setUsername(result.username);
        if (result.profilepicture !== "" && result.profilepicture !== null) {
          setProfilePicture(result.profilepicture);
        }
      });
    }
  }, [isLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          {isLoggedIn ? (
            <>
              <Button variant="outlined" onClick={() => navigate('/')} >
                Home
              </Button>

              <Button variant="outlined" onClick={handleLogout}>
                Logout
              </Button>
              <h1>Welcome! {username}</h1>
              <ModalEditProfile  />
              <img id="profilepicture" src={profilePicture} alt="Profile Picture" style={{ width: "100px" }}/>
              <p>These are the anime titles you have watched:</p>
              <div className="anime-list-scroll" style={{ paddingTop: '64px', paddingLeft: '30px', paddingRight: '30px' }}>
                <h1>Animes ({animes.length}) :</h1>
                <ScrollingCardUI animes={animes}/>
              </div>
            </>
          ) : (
            <>
              <p>You are not connected.</p>
              <Button variant="outlined" onClick={() => navigate('/')} >
                Home
              </Button>
              <Button variant="outlined" onClick={() => navigate('/login')} >
                Login
              </Button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;