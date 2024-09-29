import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
//import cards_data from '../../assets/movies/movies.json'
import { Link } from 'react-router-dom';


const TitleCards = ({title, category}) => {

  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZGUwYTg1MDM0NjVlZGQwMjc1ZTg3NGI3NjgwY2RjZiIsIm5iZiI6MTcyNzA0MDEzNC4yMzY0MjcsInN1YiI6IjY2ZjA4OTg2NmMzYjdhOGQ2NDhkOWIxYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-lekJIeoRjpD3_rJlQg-XeExJl7TeIeB-yB1PKXsfvY'
    }
  };
  

  const handleWheel = (event)=>{
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  }

  useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/movie/${category?category:"top_rated"}?language=en-US&page=1`, options)
    .then(response => response.json())
    .then(response => setApiData(response.results))
    .catch(err => console.error(err));

    cardsRef.current.addEventListener('wheel', handleWheel);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const imageUrl = "https://image.tmdb.org/t/p/w500"
  return (
    <div className='title-cards'>      
      <h2>{title?title:"Top-rated on FilmHub!"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index)=>{
          return <Link to={`/player/${card.id}`} className="card" key={index}>
            <img src={imageUrl+card.backdrop_path} alt="" />
            <p>{card.original_title}</p>
          </Link>
        })}
      </div>
    </div>
  )
}

export default TitleCards
