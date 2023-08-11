function UserInfo() {
    const url = import.meta.env.VITE_URL;
    async function Info() {
      try {
        const response = await fetch(`${url}/auth/profile`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.ok) {
          return response.json();
        } else {
          return false;
        }
      } catch (error) {
        console.log(error);
        return false;
      }
    }



  return Info();
}

export default UserInfo;