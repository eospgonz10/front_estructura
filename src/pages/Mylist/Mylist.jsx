import React, { useEffect, useState } from 'react';
import './Mylist.css';
import Navbar from '../../components/Navbar/Navbar';
import { AiOutlineClose } from 'react-icons/ai';

const Mylist = () => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
      const userId = localStorage.getItem('userId');
      console.log('User ID:', userId);
      // Puedes usar el userId para hacer peticiones o cualquier otra lógica
    }, []);

//   useEffect(() => {
//     fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=2', {
//       method: 'GET',
//       headers: {
//         accept: 'application/json',
//         Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZGUwYTg1MDM0NjVlZGQwMjc1ZTg3NGI3NjgwY2RjZiIsIm5iZiI6MTcyNzA0MDEzNC4yMzY0MjcsInN1YiI6IjY2ZjA4OTg2NmMzYjdhOGQ2NDhkOWIxYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-lekJIeoRjpD3_rJlQg-XeExJl7TeIeB-yB1PKXsfvY`,
//       },
//     })
//       .then((response) => response.json())
//       .then((data) => setMovies(data.results))
//       .catch((error) => console.error(error));
//   }, []);
useEffect(() => {
    fetch('https://cautious-dollop-4jvg4g7wqpj2q775-8080.app.github.dev/api/contenidos/usuario/1', {
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
          poster: movie.poster.replace('http://example.com', 'https://image.tmdb.org/t/p/w500'),//Ajustar ya que la ruta de example no es necesaria
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
