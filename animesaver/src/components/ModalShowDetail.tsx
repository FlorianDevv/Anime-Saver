import React, { useEffect, useState } from "react";
import { Modal, Box, Typography, Button, TextField, IconButton, Rating, FormControl, FormControlLabel, FormGroup, Radio, RadioGroup, FormLabel } from "@mui/material";
import { Anime } from "../views/App";
import CloseIcon from '@mui/icons-material/Close';
import { alpha } from '@mui/material/styles';
import { CheckBox } from "@mui/icons-material";

interface ModalShowDetailProps {
  open: boolean;
  onClose: () => void;
  anime: Anime | null;
  showDataEdit: boolean;
  rate: number | null;
  comment: string | "";
}

const ModalShowDetail: React.FC<ModalShowDetailProps> = ({
  open,
  onClose,
  anime,
  showDataEdit,
  rate,
  comment 
}) => {

  const url = import.meta.env.VITE_URL;
  const [editedComment, setEditedComment] = useState(comment);
  const [editedRating, setEditedRating] = useState(rate);

  const handleDelete = async (anime: Anime) => { 
    const response = await fetch(`${url}/animesaver/users/animes/${anime.mal_id}/delete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    })
    if (response.ok) {
      onClose();
      window.location.reload(); // Refresh the page beacause data don't be updated 
      
    } else {
      console.error('Error');
    }
  }; 

  useEffect(() => {
    setEditedComment(comment);
    setEditedRating(rate);
  }, [comment, rate]);

  const handleSubmit = async () => {
    const response = await fetch(`${url}/animesaver/users/animes/${anime?.mal_id}/edit`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        comment: editedComment,
        rating: editedRating,
      }),
    });
    if (response.ok) {
      onClose();
      window.location.reload(); // Refresh the page beacause data don't be updated 
    } else {
      console.error('Error');
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          bgcolor: (theme) => alpha(theme.palette.background.paper, 0.3),
          boxShadow: 24,
          p: 4,
          minWidth: '400px',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          overflowY: 'auto',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <IconButton size="large" onClick={onClose} sx={{ position: 'fixed', top: '3vh', right: '3vh' }}>
          <CloseIcon />
        </IconButton>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h3" component="h2" gutterBottom>
            {anime?.title}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
          <img src={anime?.image_url} alt={anime?.title} style={{height: '50vh'}} />
          <Box sx={{ display: 'flex', flexDirection: 'column', flex: '1 1 35vh' }}>
            <Typography variant="h6" gutterBottom sx={{marginLeft: "2vh"}}>
              Score: {anime?.score}/10
            </Typography>
            <Typography variant="h6" gutterBottom sx={{marginLeft: "2vh"}}>
              Year: {anime?.yearstart}
              {anime?.yearfinish ? " - " + anime.yearfinish : ""}
            </Typography>
            <Box id="data" sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography
                component="div"
                variant="body1"
                sx={{
                  overflowY: 'scroll',
                  maxHeight: '30vh',
                  margin: '2vh',
                  padding: '1vh',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                }}
              >
                <h3>Synopsis:</h3> {anime?.synopsis}
              </Typography>
            </Box>
            {showDataEdit && (
              <div id="data-edit">
                <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '1vh' }}>
                  <TextField label="Comment" multiline rows={4} variant="outlined" fullWidth margin="normal" value={editedComment} onChange={(e) => setEditedComment(e.target.value)} sx={{marginLeft: '2vh'}} />
                  Rating: <Rating name="read-only" value={editedRating} size="large" onChange={(e, value) => setEditedRating(value)} />
                  {/* <FormControl component="fieldset">
                    <FormLabel component="legend">Privacy:</FormLabel>
                    <RadioGroup aria-label="position" name="position" sx={{ flexDirection: 'column' }}>
                      <FormControlLabel
                        value="public"
                        control={<Radio />}
                        label="Public"
                        labelPlacement="end"
                      />
                      <FormControlLabel
                        value="friends"
                        control={<Radio />}
                        label="Friends"
                        labelPlacement="end"
                      />
                      <FormControlLabel
                        value="private"
                        control={<Radio />}
                        label="Private"
                        labelPlacement="end"
                      />
                    </RadioGroup>
                  </FormControl> */}
                  <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '1vh' }}>
                    <Button color="error" onClick={() => handleDelete(anime!)} variant="contained" >
                      Delete
                    </Button>
                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                      <Button onClick={onClose} variant="outlined" sx={{ marginLeft: '2vh'}}>
                        Close
                      </Button>
                      <Button onClick={handleSubmit} variant="contained" color="success"  sx={{ marginLeft: '2vh'}}>
                        Save
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </div>
            )}
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalShowDetail;