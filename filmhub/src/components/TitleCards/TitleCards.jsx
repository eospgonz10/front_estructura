import React, { useEffect, useRef } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/movies/movies.json'


const TitleCards = ({title, category}) => {

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
    fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));
    cardsRef.current.addEventListener('wheel', handleWheel);
  },[])

  const imageUrl = "https://image.tmdb.org/t/p/w300"
  return (
    <div className='title-cards'>      
      <h2>{title?title:"Popular on FilmHub!"}</h2>
      <div className="card-list" ref={cardsRef}>
        {cards_data.map((card, index)=>{
          return <div className="card" key={index}>
            <img src={imageUrl+card.backdrop_path} alt="" />
            <p>{card.original_title}</p>
          </div>
        })}
      </div>
    </div>
  )
}

export default TitleCards
