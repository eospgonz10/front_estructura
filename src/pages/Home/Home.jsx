import React from 'react'
import './Home.css'
import Navbar from '../../components/Navbar/Navbar'
import hero_banner from '../../assets/interstellar_banner.jpg'
import hero_title from '../../assets/interstellar_title.png'
import info_icon from '../../assets/info_icon.png'
import TitleCards from '../../components/TitleCards/TitleCards'
import Footer from '../../components/Footer/Footer'
import MyContent from '../Mycontent/Mycontent'

const Home = () => {
  return (
    <div className='home'>
      <Navbar/>
      <div className="hero">
        <img src={hero_banner} alt="" className='banner-img'/>
        <div className='hero-caption'>
          <img src={hero_title} alt="" className='caption-img'/>
          <p>When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team of researchers, to find a new planet for humans</p>
          <div className="hero-btns">
            <button className='btn dark-btn'><img src={info_icon} alt="" />More info</button>
          </div>
          <TitleCards/>
        </div>
      </div>
      <div className="more-cards">
      <TitleCards title={"Now playing"} category={"now_playing"}/>
      <TitleCards title={"Popular"} category={"popular"}/>
      <MyContent/>
      </div>
      <Footer/>
    </div>
  )
}

export default Home
