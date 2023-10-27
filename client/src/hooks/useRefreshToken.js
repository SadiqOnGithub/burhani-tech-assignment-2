import axios from '../api/axios';
import { useAuth } from '../context/AuthProvider';

const REFRESH_URL = 'auth/refresh';

const useRefreshToken = () => {
  const { setAuth } = useAuth();
  const refresh = async () => {
    const response = await axios.get(
      REFRESH_URL,
      {
        withCredentials: true,
      }
    );
    setAuth(prev => ({...prev, accessToken: response.data.accessToken}))
  };

  return refresh;
};

export default useRefreshToken;