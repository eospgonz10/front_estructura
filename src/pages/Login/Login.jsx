import React, { useEffect, useState } from 'react'
import GoogleLogin from 'react-google-login'
import { gapi } from 'gapi-script'
import './Login.css'
import logo from '../../assets/logo.png'
import { useNavigate } from 'react-router-dom'
const Login = () => {

  const clientID = "241763796900-nne9ot7arobltendogv6lagjhpcc0g5b.apps.googleusercontent.com";
  const [user, setUser] = useState({});
  const [genres, setGenres] = useState([]);
  const navigate = useNavigate();
  const [signState, setSignState] = useState("Sign In")
  localStorage.setItem('userId', 1);
  console.log(localStorage.getItem('userId'));

  useEffect(() => {
    const start = () =>{
      gapi.auth2.init({
        clientId: clientID,
      })
    }
    gapi.load("client:auth2", start)


    // Fetch genres
    fetch('https://congenial-space-enigma-6x7r4w6gvr93j5x-8080.app.github.dev/api/generos')
      .then(response => response.json())
      .then(data => setGenres(data))
      .catch(error => console.error('Error fetching genres:', error));
  }, [])

  const onSuccess = async (response) => {
    console.log(response);
    setUser(response.profileObj);

    const userData = {
      nombre: response.profileObj.name,
      email: response.profileObj.email,
      avatar: response.profileObj.imageUrl
    };

    // Guardar el ID del usuario en localStorage
  localStorage.setItem('userId', response.profileObj.googleId);

    try {
      const res = await fetch('https://cautious-dollop-4jvg4g7wqpj2q775-8080.app.github.dev/api/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData),
        //mode: 'no-cors'
      });

      if (!res.ok) {
        throw new Error('Failed to post user data');
      }

      const result = await res.json();
      console.log('User data posted successfully:', result);
    } catch (error) {
      console.error('Error posting user data:', error);
    }
  }

  const onFailure = (response) => {
    console.log("Something went wrong!")
  }

  return (
    <div className='login'>
      <img src={logo} className='login-logo' alt="" />
      <div className="login-form">
        <h1>{signState}</h1>
        <form>
          <GoogleLogin
          clientId={clientID}
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={"single_host_policy"}
          />
          {/* {signState==="Sign Up"?<input type="text" placeholder='Your name' />:<></>}          
          <input type="email" placeholder='Email' />
          <input type="password" placeholder='Password' />
          <button>{signState}</button>
          <div className="form-help">
            <div className="remember">
              <input type="checkbox" />
              <label htmlFor="">Remember me</label>
            </div>
            <p>Need help?</p>
          </div>
          */}
          <div className={user? "profile":"hidden"}>
            <img src={user.imageUrl} alt="" />
            <h1>{user.name}</h1>
          </div>
          <button onClick={()=>{navigate('/')}} >{signState}</button>
          <div className="form-help">
            <div className="remember">
              <input type="checkbox" />
              <label htmlFor="">Remember me</label>
            </div>
            <p>Need help?</p>
          </div>
        </form>
        <div className="form-switch">
          {signState==="Sign In"?<p>New to FilmHub!? <span onClick={()=>{setSignState("Sign Up")}}>Sign Up Now</span></p>:<p>Already have account? <span onClick={()=>{setSignState("Sign In")}}>Sign In Now</span></p>}
        </div>
        <div className="genre-select">
          <label htmlFor="genres">Seleciona tu genero favorito:</label>
          <select id="genres">
            {genres.map(genre => (
              <option key={genre.id} value={genre.id}>{genre.nombre}</option>
            ))}
          </select>
        </div> 
      </div>
    </div>
  )
}

export default Login
