import { useState, useEffect } from 'react';
import { Modal, Box, Typography, Button, TextField, Avatar } from '@mui/material';
import UserInfo from '../utils/UserInfo';
import { useNavigate } from 'react-router-dom';

export default function ModalEditProfile() {
    const url = import.meta.env.VITE_URL;
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [profilePicture, setProfilePicture] = useState('');
    const [defaultName, setDefaultName] = useState('');
    const [defaultProfilePicture, setDefaultProfilePicture] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    useEffect(() => {
        UserInfo().then((info) => {
            if (info) {
                setDefaultName(info.username);
                setDefaultProfilePicture(info.profilepicture);
            }
        });
    }, []);

    useEffect(() => {
        setName(defaultName);
        setProfilePicture(defaultProfilePicture);
    }, [defaultName, defaultProfilePicture]);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setName(defaultName);
        setProfilePicture(defaultProfilePicture);
        setNewPassword('');
        setConfirmNewPassword('');
    };

    const handleSave = async () => {
        const response = await fetch(`${url}/users/edit`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({
                username: name,
                password: newPassword,
                profilepicture: profilePicture,
            }),
        });
        if (response.ok) {
            // const res = await fetch(`${url}/auth/refresh` , {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //         'Authorization': `Bearer ${localStorage.getItem('token')}`, // assuming you have a JWT token stored in localStorage
            //     }
                
            // })
            // const data = await res.json();
            // if (res.ok)
            // setDefaultName(name);
            // setDefaultProfilePicture(profilePicture);
            // localStorage.setItem('token', data.access_token);
            // handleClose();
            localStorage.removeItem('token');
    navigate('/login');
        } else {
            // handle error
        }
    };

    return (
        <>
            <Box onClick={handleOpen} sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <Avatar src={profilePicture || 'https://avatars.githubusercontent.com/u/44036562?v=4'} alt="Profile" sx={{ width: 30, height: 30, mr: 1 }} />
                <Typography variant="body1">
                    Edit Profile
                </Typography>
            </Box>
            <Modal open={open} onClose={handleClose}>
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4, maxWidth: 400, width: '100%' }}>
                    <Typography variant="h5" sx={{ mb: 2 }}>
                        Edit Profile
                    </Typography>
                    <TextField label="Name" fullWidth value={name} onChange={(e) => setName(e.target.value)} sx={{ mb: 2 }} />
                    <TextField label="Profile Picture" fullWidth value={profilePicture} onChange={(e) => setProfilePicture(e.target.value)} sx={{ mb: 2 }} />
                    <TextField label="New Password" fullWidth type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} sx={{ mb: 2 }} />
                    {/* <TextField label="Confirm New Password" fullWidth type="password" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} sx={{ mb: 2 }} /> */}
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button variant="outlined" sx={{ mr: 2 }} onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button variant="contained" onClick={handleSave}>
                            Save
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </>
    );
}
