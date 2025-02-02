import React, { useEffect, useRef, useState } from 'react';
import './Mycontent.css';

const MyContent = () => {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();

  const handleWheel = (event) => {
    event.preventDefault();
    if (cardsRef.current) {
      cardsRef.current.scrollLeft += event.deltaY;
    }
  };

  useEffect(() => {
    fetch('https://special-bassoon-5ggqwpx44qp5cx4w-8080.app.github.dev/api/contenidos')
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
      setApiData(prevData => prevData.filter(card => card.id !== idContenido));
    } catch (error) {
      console.error('Error adding content:', error);
    }
  };

  return (
    <div className='mycontent-container'>
      <h2>Custom Content</h2>
      <div className="mycontent-card-list" ref={cardsRef}>
        {apiData.map((card) => (
          <div className="mycontent-card" key={card.id}>
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
    </div>
  );
};

export default MyContent;