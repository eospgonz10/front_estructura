import React, { useEffect, useRef } from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import search_icon from '../../assets/search_icon.svg'
import profile_icon from '../../assets/profile_icon.png'
import caret_icon from '../../assets/caret_icon.png'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

  const navRef = useRef(null);
  const navigate = useNavigate();

  const logout = () => {
    sessionStorage.removeItem('userId');
    window.location.href = '/login'; // Redirigir a Login después del cierre de sesión
  };

  const handleMyList = () => {
    navigate('/mylist'); // Redirigir a la página Mylist
  };

  const handleHome = () => {
    navigate('/'); // Redirigir a la página Mylist
  };

  const handleRecommendations = () => {
    navigate('/recommendations'); // Redirigir a la página Recommendations
  };

  useEffect(() => {
    const handleScroll = () => {
      if (navRef.current) {
        if (window.scrollY >= 80) {
          navRef.current.classList.add('nav-dark');
        } else {
          navRef.current.classList.remove('nav-dark');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup to remove event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  return (
    <div ref={navRef} className='navbar'>
      <div className="navbar-left">
        <img src={logo} alt="" />
        <ul>
          <li onClick={handleHome}>Home</li>
          <li onClick={handleRecommendations}>My recommendations</li>
          <li onClick={handleMyList}>My list</li>
        </ul>
      </div>
      <div className="navbar-right">
        <img src={search_icon} alt="" className='icons'/>
        <div className="navbar-profile">
          <img src={profile_icon} alt="" className='profile' />
          <img src={caret_icon} alt="" />
          <div className='dropdown'>
            <p onClick={logout}>Sign Out of FilmHub</p>    
          </div>

        </div>
      </div>
    </div>
  )
}

export default Navbar
