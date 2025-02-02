import React, { useEffect, useRef, useState } from 'react';
import './Mycontent.css';

const MyContent = () => {
  const [apiData, setApiData] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);
  const cardsRef = useRef();

  const handleWheel = (event) => {
    event.preventDefault();
    if (cardsRef.current) {
      cardsRef.current.scrollLeft += event.deltaY;
    }
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/contenidos`)
      .then((response) => response.json())
      .then((data) => setApiData(data))
      .catch((err) => console.error(err));

    if (cardsRef.current) {
      cardsRef.current.addEventListener('wheel', handleWheel);
    }

    return () => {
      if (cardsRef.current) {
        cardsRef.current.removeEventListener('wheel', handleWheel);
      }
    };
  }, []);

  const replacePosterUrl = (url) => {
    return url.replace('http://example.com', 'https://image.tmdb.org/t/p/w500');
  };

  const handleAddContent = async (idContenido) => {
    const idUsuario = sessionStorage.getItem('userId');
    console.log('User ID:', idUsuario); // Depurar para verificar el userId

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
      setApiData(prevData => prevData.filter(card => card.id !== idContenido));
    } catch (error) {
      console.error('Error adding content:', error);
    }
  };

  const handleMouseOver = (card) => {
    setHoveredCard(card);
  };

  const handleMouseOut = () => {
    setHoveredCard(null);
  };

  return (
    <div className='mycontent-container'>
      <h2>Custom Content</h2>
      <div className="mycontent-card-list" ref={cardsRef}>
        {apiData.map((card) => (
          <div 
            className="mycontent-card" 
            key={card.id}
            onMouseOver={() => handleMouseOver(card)}
            onMouseOut={handleMouseOut}
          >
            <img src={replacePosterUrl(card.poster)} alt={card.titulo} />
            <p>{card.titulo}</p>
            <button 
              className="mycontent-add-button" 
              onClick={() => handleAddContent(card.id)}
              title="Add to My List"
            >+</button>
          </div>
        ))}
      </div>
      
      {hoveredCard && (
        <div className="content-modal">
          <h3>{hoveredCard.titulo}</h3>
          <p><strong>Release Year:</strong> {hoveredCard.anioLanzamiento}</p>
          <p><strong>Synopsis:</strong> {hoveredCard.sinopsis}</p>
          <p><strong>IMDb Rating:</strong> {hoveredCard.imdbRating}</p>
          <p><strong>Classification:</strong> {hoveredCard.clasificacion}</p>
        </div>
      )}
    </div>
  );
};

export default MyContent;