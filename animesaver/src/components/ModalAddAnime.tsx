import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, Button, IconButton, Rating, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Anime } from '../views/App';
interface ModalAddAnimeProps {
  open: boolean;
  onClose: () => void;
  anime: Anime | null;
  onAddAnime: (anime: Anime, comment: string, rating: number | null) => void;
}

const ModalAddAnime: React.FC<ModalAddAnimeProps> = ({ open, onClose, anime, onAddAnime }) => {
  const [value, setValue] = useState<number | null>(null);
  const [comment, setComment] = useState<string>('');
  const [hover, setHover] = useState(-1);

  const labels: { [index: string]: string } = {
    null: '(Optional)',
    0.5: 'Very Bad',
    1: 'Bad',
    1.5: 'Not Good',
    2: 'Not Bad',
    2.5: 'Normal',
    3: 'Ok',
    3.5: 'Good',
    4: 'Very Good',
    4.5: 'Masterclass',
    5: 'Masterpiece',
  };

  useEffect(() => {
    if (open) {
      setValue(null);
      setComment('');
    }
  }, [open]);

  const handleRatingChange = (event: React.ChangeEvent<unknown>, newValue: number | null) => {
    setValue(newValue);
  };

  const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value);
  };


  
  return (
    <Modal open={open} onClose={onClose} BackdropProps={{ onClick: null }}>
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
        <IconButton onClick={onClose} sx={{ position: 'absolute', top: '5px', right: '5px' }}>
          <CloseIcon />
        </IconButton>
        <Typography variant="h6" component="h2" gutterBottom>
          Add: {anime?.title}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <img src={anime?.image_url} alt={anime?.title} style={{ maxWidth: '50%' }} />
        </Typography>
        <Rating
          name="half-rating"
          value={value}
          precision={0.5}
          onChange={handleRatingChange}
          onChangeActive={(event, newHover) => {
            setHover(newHover);
          }}
          size="large"
        />
        <Box sx={{ ml: 2 }}>
          <Typography variant="body1" sx={{ fontStyle: 'italic' }}>
            {labels[hover !== -1 ? hover : value]}
          </Typography>
        </Box>
        <TextField
          label="Comment (Optional)"
          multiline
          rows={4}
          value={comment}
          onChange={handleCommentChange}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained" color="primary" onClick={() => anime && onAddAnime(anime, comment, value)}>
            Add to list
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalAddAnime;