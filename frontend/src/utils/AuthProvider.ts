import { ReactNode, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider( children: AuthProviderProps  ) {
  const navigate= useNavigate();
  const location = useLocation();
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    console.log('AuthProvider: useEffect');
    const email = localStorage.getItem('email');

    if (email) {
      setAuthenticated(true);
    } else {
      navigate('/login');
    }
  }, []);

  return authenticated || location.pathname === '/login' ? {children} : null;
}
