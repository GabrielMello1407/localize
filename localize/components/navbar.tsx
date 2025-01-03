'use client';
import { useEffect, useState } from 'react';
import MainNav from './main-nav';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser && storedUser !== 'undefined') {
        const user = JSON.parse(storedUser);
        setIsLoggedIn(true);
        setUserName(user.name);
      } else {
        setIsLoggedIn(false);
        setUserName(null);
      }
    }
  }, []);

  return (
    <div>
      <MainNav isLoggedIn={isLoggedIn} userName={userName} />
    </div>
  );
};

export default Navbar;
