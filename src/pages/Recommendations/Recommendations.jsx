import React, { useEffect, useState } from 'react';
import './Recommendations.css';
import Navbar from '../../components/Navbar/Navbar';
import { AiOutlineClose } from 'react-icons/ai';

const Recommendations = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    console.log('User ID:', userId);

    // Usar el userId para hacer la petición
    fetch(`https://special-bassoon-5ggqwpx44qp5cx4w-8080.app.github.dev/api/recomendaciones/usuario/${userId}`, {
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
    const idUsuario = localStorage.getItem('userId');
    if (!idUsuario) {
      console.error('User ID is not available in localStorage.');
      return;
    }

    try {
      const response = await fetch(`https://special-bassoon-5ggqwpx44qp5cx4w-8080.app.github.dev/api/UsuarioContenido/${idUsuario}/${idContenido}`, {
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