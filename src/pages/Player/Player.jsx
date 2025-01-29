import React, { useEffect, useState } from 'react'
//import Home from '../Home/Home'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'

const Player = () => {

  const {id} = useParams();
  const navigate = useNavigate();

  const [apiData, setApiData] = useState({
      name: "",
      key: "",
      published_at: "",
      typeof: ""
  })

  const options = {

    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZGUwYTg1MDM0NjVlZGQwMjc1ZTg3NGI3NjgwY2RjZiIsIm5iZiI6MTcyNzA0MDEzNC4yMzY0MjcsInN1YiI6IjY2ZjA4OTg2NmMzYjdhOGQ2NDhkOWIxYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-lekJIeoRjpD3_rJlQg-XeExJl7TeIeB-yB1PKXsfvY'
    }
  };

  useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
    .then(response => response.json())
    .then(response => setApiData(response.results[1]))
    .catch(err => console.error(err));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  
  
  return (
    <div className='player'>
      <img src={back_arrow_icon} alt="" onClick={()=>{navigate('/')}}/>
      <iframe width='90%' height='90%' src={`https://youtube.com/embed/${apiData.key}`} title='trailer' frameBorder='0' allowFullScreen></iframe>
      <div className="player-info">
        <p>{apiData.published_at.slice(0,10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  )
}

export default Player
