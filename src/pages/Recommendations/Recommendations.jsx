import React, { useEffect, useState } from 'react';
import './Recommendations.css';
import Navbar from '../../components/Navbar/Navbar';
import { AiOutlineClose } from 'react-icons/ai';

const Recommendations = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const userId = sessionStorage.getItem('userId');
    console.log('User ID:', userId);

    // Usar el userId para hacer la petición
    fetch(`${process.env.REACT_APP_API_URL}/recomendaciones/usuario/${userId}`, {
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

  const handleAddToMyList = async (idContenido) => {
    const idUsuario = sessionStorage.getItem('userId');
    if (!idUsuario) {
      console.error('User ID is not available in sessionStorage.');
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/UsuarioContenido/${idUsuario}/${idContenido}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to add content to user');
      }

      await response.json();
      console.log('Content added successfully');

      // Filtrar el contenido agregado de la lista visible
      setMovies(prevMovies => prevMovies.filter(movie => movie.id !== idContenido));
    } catch (error) {
      console.error('Error adding content:', error);
    }
  };

  return (
    <div className="myrecommendations-container">
      <Navbar />
      <h2 className="myrecommendations-title">My Recommendations</h2>
      <div className="movie-recommendations">
        {movies.map((movie, index) => (
          <div className="movie-item" key={index}>
            <img
              src={movie.poster}
              alt={movie.titulo}
              className="movie-image"
            />
            <p className="movie-title">{movie.titulo}</p>
            <button 
              className="recommendations-add-button" 
              onClick={() => handleAddToMyList(movie.id)}
              title="Add to My List"
            >+</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommendations;