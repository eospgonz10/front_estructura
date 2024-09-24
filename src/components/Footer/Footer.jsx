import React from 'react'
import './Footer.css'
import youtube_icon from '../../assets/socialmedia/youtube_icon.png'
import instagram_icon from '../../assets/socialmedia/instagram_icon.png'
import facebook_icon from '../../assets/socialmedia/facebook_icon.png'
import x_icon from '../../assets/socialmedia/x_icon.png'
import tiktok_icon from '../../assets/socialmedia/tiktok_icon.png'

const Footer = () => {
  return (
    <div className='footer'>
      <div className="footer-icons">
        <img src={youtube_icon} alt="" />
        <img src={instagram_icon} alt="" />
        <img src={facebook_icon} alt="" />
        <img src={x_icon} alt="" />
        <img src={tiktok_icon} alt="" />
      </div>
      <ul>
        <li>Help Center</li>
        <li>Gift Cards</li>
        <li>Media Centre</li>
        <li>Jobs</li>
        <li>Terms of Use</li>
        <li>Privacy</li>
        <li>Legal Notices</li>
        <li>Cookies Preferences</li>
        <li>Corporate Information</li>
        <li>Contact Us</li>
      </ul>
      <p className='copyright-text'>© 2024 FilmHub!, Inc.</p>
    </div>
  )
}

export default Footer
