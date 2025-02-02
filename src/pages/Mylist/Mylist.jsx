import React, { useEffect, useState } from 'react';
import './Mylist.css';
import Navbar from '../../components/Navbar/Navbar';
import { AiOutlineClose } from 'react-icons/ai';

const Mylist = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    console.log('User ID:', userId);
    
    // Usar el userId para hacer la petición
    fetch(`${process.env.REACT_APP_API_URL}/contenidos/usuario/${userId}`, {
      method: 'GET',
      headers: {
        accept: 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Modificar la URL del poster
        const formattedMovies = data.map((movie) => ({
          ...movie,
          poster: movie.poster.replace('http://example.com', 'https://image.tmdb.org/t/p/w500'), // Ajustar ya que la ruta de example no es necesaria
        }));
        setMovies(formattedMovies);
      })
      .catch((error) => console.error(error));
  }, []);

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
              <AiOutlineClose size={30} className='close-button'/>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Mylist;