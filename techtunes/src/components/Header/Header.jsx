import React, { useEffect } from 'react';
import useLogout from '../../hooks/logout.js';
import AuthStatus from '../../hooks/state.jsx';
import './header.css'

const Header = () => {
    const { user } = AuthStatus();
    const logout = useLogout();

    useEffect(() => {
    const menu = document.querySelector("#mobile_menu");
    const menulinks = document.querySelector(".nav_links");

    const handleMenuClick = () => {
      menu.classList.toggle("is-active");
      menulinks.classList.toggle("active");
    };

    menu.addEventListener("click", handleMenuClick);
    return () => menu.removeEventListener("click", handleMenuClick);
  }, []);

  return (
    <header className="main-header">
            <div className="logo">
              <a href="/"><i className="bx bxs-music"></i>Techtunes</a>
            </div>
            <div className="navbar_toggle" id="mobile_menu">
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </div>
            <nav className="nav_links">
              <ul>
              <li><a href="/">Home</a></li>
                {/* Conditionally render protected links based on user state */}
                {user ? (
                <>
                    <li><a href="/browse">Browse</a></li>
                    <li><a href="/playlist">Playlist</a></li>
                    <li><a onClick={logout} className="btn">Logout</a></li>
                </>
                ) : (
               <li><a href="/login" className="btn">Login</a></li>
             )}
              </ul>
            </nav>
    </header>
  );
};

export default Header;
