import React from "react";
import { Modal, Box, Typography, Button, TextField, IconButton } from "@mui/material";
import { Anime } from "../views/App";
import CloseIcon from '@mui/icons-material/Close';

interface ModalShowDetailProps {
  open: boolean;
  onClose: () => void;
  anime: Anime | null;
}

const ModalShowDetail: React.FC<ModalShowDetailProps> = ({
  open,
  onClose,
  anime,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          minWidth: '400px',
        }}
      >
        <IconButton onClick={onClose} sx={{ position: 'absolute', top: '5px', right: '5px' }}>
          <CloseIcon />
        </IconButton>
        <Typography variant="h5" component="h2" gutterBottom>
          {anime?.title}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Score: {anime?.score}/10
        </Typography>
        <Typography variant="body1" gutterBottom>
          Year: {anime?.yearstart}
          {anime?.yearfinish ? " - " + anime.yearfinish : ""}
        </Typography>
        <TextField
          label="Synopsis"
          multiline
          rows={4}
          value={anime?.synopsis}
          variant="outlined"
          fullWidth
          margin="normal"
          InputProps={{
            readOnly: true,
          }}
        />
        <img src={anime?.image_url} alt={anime?.title} style={{ maxWidth: '40%' }} />
      </Box>
    </Modal>
  );
};

export default ModalShowDetail;