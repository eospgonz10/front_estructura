import React, { useEffect, useState } from 'react';
import './Mylist.css';
import Navbar from '../../components/Navbar/Navbar';
import { AiOutlineClose } from 'react-icons/ai';

const Mylist = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const userId = sessionStorage.getItem('userId');
    console.log('User ID:', userId);
    
    fetch(`${process.env.REACT_APP_API_URL}/contenidos/usuario/${userId}`, {
      method: 'GET',
      headers: {
        accept: 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const formattedMovies = data.map((movie) => ({
          ...movie,
          poster: movie.poster.replace('http://example.com', 'https://image.tmdb.org/t/p/w500'),
        }));
        setMovies(formattedMovies);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleRemoveContent = async (userId, contentId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/UsuarioContenido/${userId}/${contentId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to remove content');
      }
      
      // Actualizar el estado de la lista de películas
      setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== contentId));
      console.log('Content removed successfully');
    } catch (error) {
      console.error('Error removing content:', error);
    }
  };

  return (
    <div className="mylist-container">
      <Navbar />
      <h2 className="mylist-title">My List</h2>
      <div className="movie-list">
        {movies.map((movie, index) => (
          <div className="movie-item" key={index}>
            <img
              src={movie.poster}
              alt={movie.titulo}
              className="movie-image"
            />
            <p className="movie-title">{movie.titulo}</p>
            <p>
              <AiOutlineClose 
                size={30} 
                className='close-button' 
                title="Remove from my list"
                onClick={() => handleRemoveContent(sessionStorage.getItem('userId'), movie.id)}
              />
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Mylist;