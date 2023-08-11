import { useEffect } from 'react';

function CheckUserLogin() {
  const url = import.meta.env.VITE_URL;
    async function checkTokenValidity() {
      try {
        const response = await fetch(`${url}/auth/check`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.ok) {
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.log(error);
        return false;
      }
    }



  return checkTokenValidity();
}

export default CheckUserLogin;