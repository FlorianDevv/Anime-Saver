import { useState } from 'react';
import { AnimeDB } from '../views/Dashboard';
import '../css/ScrollingCard.css';
import { Rating } from '@mui/material';
import ModalShowDetail from '../components/ModalShowDetail';
import { Anime } from '../views/App'

interface Props {
  animes: AnimeDB[];
}

const ScrollingCardUI: React.FC<Props> = ({ animes }) => {
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedAnime, setSelectedAnime] = useState<Anime | null>(null);
  const [rate, setRate] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const element = event.currentTarget;
    const scrollPosition = element.scrollLeft;
    setScrollPosition(scrollPosition);
  };

  const handleAnimeClick = async (anime: AnimeDB) => {
    const animeId = anime.animeId;
    const response = await fetch(`https://api.jikan.moe/v4/anime/${animeId}`);
    const data = await response.json();
    if (data) {
      const animeData = data.data;
      const animeList = {
        mal_id: animeData.mal_id,
        title: animeData.title_english,
        image_url: animeData.images.jpg.image_url,
        score: animeData.score,
        yearstart: animeData.aired.prop.from.year,
        yearfinish: animeData.aired.prop.to.year,
        synopsis: animeData.synopsis,
        popularity: animeData.popularity,
        rank: animeData.rank,
        themes: animeData.themes.name,
        demographics: animeData.demographics.name,
      };
      setSelectedAnime(animeList);
      setComment(anime.comment);
      setRate(anime.rating)
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="scrolling-card-container" onScroll={handleScroll}>
      {animes.map((anime, index) => (
  <a className="scrolling-card" key={index} onClick={() => handleAnimeClick(anime)}>
    <img src={anime.anime.image} alt={anime.anime.title}  />
    <div className="overlay">
      <h2>{anime.anime.title}</h2>
      {anime.rating === null ? '' : <Rating name="read-only" value={parseFloat(anime.rating)} readOnly />}
      <p>{anime.comment}</p>
    </div>
  </a>
))}
      
      <div className="scrolling-card-indicator" style={{ left: `${scrollPosition}px` }} />
      <ModalShowDetail open={isModalOpen} onClose={handleCloseModal} anime={selectedAnime} rate={rate} comment={comment} showDataEdit={true} />
    </div>
  );
};

export default ScrollingCardUI;
