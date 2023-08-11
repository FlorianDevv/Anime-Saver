import { useState } from 'react';
import Header from '../components/Header';
import '../css/App.css';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar'; 
import Alert from '@mui/material/Alert';
import { CircularProgress, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ModalShowDetail from '../components/ModalShowDetail';
import ModalAddAnime from '../components/ModalAddAnime';


export interface Anime {
  mal_id: number;
  title: string;
  image_url: string;
  score: number;
  yearstart: number;
  yearfinish: number;
  synopsis: string;
  popularity: number;
  rank: number;
  themes: string[];
  demographics: string[];

}

interface AppProps {
  onToggleTheme: (themeMode: string) => void;
}

function App(props: AppProps) {
  const url = import.meta.env.VITE_URL;
  const [animes, setAnimes] = useState<Anime[]>([]);
  const [selectedAnime, setSelectedAnime] = useState<Anime | null>(null);
  const [isLoggedIn] = useState(localStorage.getItem('token') !== null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isErrorVisible, setIsErrorVisible] = useState<boolean>(false);
  const [isSuccessVisible, setIsSuccessVisible] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddAnimeModalOpen, setIsAddAnimeModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Ajout de l'état de chargement

  const handleSearch = async (search: string) => {
    setIsLoading(true); // Définition de l'état de chargement sur true
    const response = await fetch(`https://api.jikan.moe/v4/anime?q=${search}&sfw`);
    const data = await response.json();
    if (data.data && data.data.length > 0) {
      const animeList = data.data.map((anime: any) => ({
        mal_id: anime.mal_id,
        title: anime.title,
        image_url: anime.images.jpg.image_url,
        score: anime.score,
        yearstart: anime.aired.prop.from.year,
        yearfinish: anime.aired.prop.to.year,
        synopsis: anime.synopsis,
      }));
      setAnimes(animeList);
    } else {
      setAnimes([]);
    }
    setIsLoading(false); // Définition de l'état de chargement sur false
  };
  
  const handleAddAnime = async (anime: Anime, comment: string, rating: number) => {
    if (!isLoggedIn) {
      return;
    }
    const response = await fetch(`${url}/animesaver`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ id: anime.mal_id, title: anime.title, image: anime.image_url })
    });
    if (response.ok) {
      const savedAnimes = JSON.parse(localStorage.getItem('animes') || '[]');
      const animeToAdd = {
        mal_id: anime.mal_id,
        title: anime.title,
        image_url: anime.image_url,
      };
      savedAnimes.push(animeToAdd);
      handleSaveAnime(anime, comment, rating);
    } else {
      setErrorMessage('Already Add !');
      setIsErrorVisible(true);
    }
  };
  
  const handleSaveAnime = async (anime: Anime, comment: string, rating: number) => {
    if (!isLoggedIn) {
      return;
    }
    const response = await fetch(`${url}/animesaver/users/animes/${anime.mal_id}/save`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ comment: comment, rating: rating })
    });

    if (response.ok) {
      setSuccessMessage('Anime added successfully!');
      setIsSuccessVisible(true);
      setIsAddAnimeModalOpen(false);
    } else {
      setErrorMessage('Error');
      setIsErrorVisible(true);
    }
  };

  const toggleTheme = () => {
    const themeMode = localStorage.getItem('theme') === 'dark' ? 'light' : 'dark';
     props.onToggleTheme(themeMode);
  };

  const handleOpenAddAnimeModal = async (anime: Anime) => {

      const response = await fetch(`${url}/animesaver/users/animes/${anime.mal_id}/check`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.ok) {
        const isAnimeSaved = await response.json();
        if (isAnimeSaved === false) {
          setSelectedAnime(anime);
          setIsAddAnimeModalOpen(true);
        } else {
          setErrorMessage('Error');
          setIsErrorVisible(true);
        }
      } else {
        setErrorMessage('Error');
        setIsErrorVisible(true);
      }
    };

  const handleAnimeClick = (anime: Anime) => {
    setSelectedAnime(anime);
    setIsModalOpen(true);
  };

  const handleCloseAddAnimeModal = () => {
    setIsAddAnimeModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCloseError = () => {
    setIsErrorVisible(false);
  };

  return (
    <div className="App">
      <Header onSearch={handleSearch} onToggleTheme={toggleTheme} showSearch={true} />
      <main>
        {isLoading ? ( // Affichage de l'indicateur de chargement
          <div className="loading-message" style={{marginTop: "100px"}}>
            <CircularProgress />
          </div>
        ) : animes.length === 0 ? (
          <div className="welcome-message" style={{marginTop: "100px"}}>
            <h2>Welcome to Anime Saver!</h2>
            <p>Use the search bar above to find your favorite anime.</p>
          </div>
        ) : (
          <div className="anime-list" style={{ paddingTop: '64px' }}>
            {animes.map((anime) => (
              <div key={anime.mal_id} className="anime-card">
                <div className="anime-card-content">
                  <img src={anime.image_url} alt={anime.title} onClick={() => handleAnimeClick(anime)} />
                  <div className="anime-card-details">
                    <h3>{anime.title}</h3>
                    {isLoggedIn && (
                      <>
                        <Button variant="outlined" onClick={() => handleOpenAddAnimeModal(anime)}>Add to list</Button>
                        <Snackbar
                          open={isErrorVisible}
                          autoHideDuration={4000}
                          onClose={handleCloseError}
                          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                        >
                          <Alert severity="error">
                            Anime already added to your list 
                            <IconButton onClick={handleCloseError}>
                              <CloseIcon fontSize="inherit" />
                            </IconButton>
                          </Alert>
                        </Snackbar>
                        <Snackbar
                          open={isSuccessVisible}
                          autoHideDuration={4000}
                          onClose={() => setIsSuccessVisible(false)}
                          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                        >
                          <Alert severity="success">
                            {successMessage}
                            <IconButton onClick={() => setIsSuccessVisible(false)}>
                              <CloseIcon fontSize="inherit" />
                            </IconButton>
                          </Alert>
                        </Snackbar>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <ModalShowDetail open={isModalOpen } onClose={handleCloseModal} anime={selectedAnime} showDataEdit={false}/>
            <ModalAddAnime open={isAddAnimeModalOpen} onClose={handleCloseAddAnimeModal} anime={selectedAnime} onAddAnime={(anime, comment, rating) => handleAddAnime(anime, comment, rating!)} />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;