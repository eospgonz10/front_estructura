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
    fetch('https://cautious-dollop-4jvg4g7wqpj2q775-8080.app.github.dev/api/contenidos')
      .then((response) => response.json())
      .then((data) => setApiData(data))
      .catch((err) => console.error(err));

    // Verificamos si el ref existe antes de agregar el evento
    if (cardsRef.current) {
      cardsRef.current.addEventListener('wheel', handleWheel);
    }

    // Limpiamos el event listener al desmontar el componente
    return () => {
      if (cardsRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        cardsRef.current.removeEventListener('wheel', handleWheel);
      }
    };
  }, []);

  const replacePosterUrl = (url) => {
    return url.replace('http://example.com', 'https://image.tmdb.org/t/p/w500');
  };

  return (
    <div className='mycontent-container'>
      <h2>My Custom Content</h2>
      <div className="mycontent-card-list" ref={cardsRef}>
        {apiData.map((card) => (
          <div className="mycontent-card" key={card.id}>
            <img src={replacePosterUrl(card.poster)} alt={card.titulo} />
            <p>{card.titulo}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyContent;
