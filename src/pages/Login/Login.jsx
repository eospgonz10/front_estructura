import React, { useEffect, useState, useContext } from 'react';
import GoogleLogin from 'react-google-login';
import { gapi } from 'gapi-script';
import './Login.css';
import logo from '../../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../AuthContext';

const Login = () => {
  const clientID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const [signState, setSignState] = useState("Sign In");
  const { login } = useContext(AuthContext);

  useEffect(() => {
    const start = () => {
      gapi.auth2.init({
        clientId: clientID,
      });
    }
    gapi.load("client:auth2", start);

    // Fetch genres
    fetch(`${process.env.REACT_APP_API_URL}/generos`)
      .then(response => response.json())
      .then(data => setGenres(data))
      .catch(error => console.error('Error fetching genres:', error));
  }, [clientID]);

  const onSuccess = async (response) => {
    console.log(response);

    const userData = {
      nombre: response.profileObj.name,
      email: response.profileObj.email,
      avatar: response.profileObj.imageUrl
    };

    if (signState === "Sign Up") {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/usuarios/correo/${userData.email}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (res.ok) {
          // Usuario ya registrado
          alert('You are already registered');
          return;
        } else if (res.status === 500) {
          // Usuario no encontrado, proceder con registro
          const registerRes = await fetch(`${process.env.REACT_APP_API_URL}/usuarios`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData),
          });

          if (!registerRes.ok) {
            throw new Error('Failed to register user');
          }

          const result = await registerRes.json();
          console.log('User registered successfully:', result);

          // Guardar el ID del usuario y el token en sessionStorage
          sessionStorage.setItem('userId', result.id);
          sessionStorage.setItem('token', response.tokenId);

          // Iniciar sesión en el contexto
          login(response.tokenId);

          setIsModalOpen(true); // Abrir la ventana modal después de registrarse
        }
      } catch (error) {
        console.error('Error during registration:', error);
      }
    } else if (signState === "Sign In") {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/usuarios/correo/${userData.email}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!res.ok) {
          throw new Error('User not found');
        }

        const result = await res.json();
        console.log('User data fetched successfully:', result);

        // Guardar el ID del usuario y el token en sessionStorage
        sessionStorage.setItem('userId', result.id);
        sessionStorage.setItem('token', response.tokenId);

        // Iniciar sesión en el contexto
        login(response.tokenId);

        navigate('/'); // Redirigir a la página de inicio
      } catch (error) {
        console.error('Error during sign-in:', error);
        alert('User not found. Please sign up first.');
      }
    }
  };

  const onFailure = (response) => {
    console.log("Something went wrong!");
  };

  const handleSaveGenres = async () => {
    const userId = sessionStorage.getItem('userId');
    if (!userId) {
      console.error('User ID not found in sessionStorage');
      return;
    }

    try {
      for (const genreId of selectedGenres) {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/GeneroUsuario/${genreId}/${userId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!res.ok) {
          throw new Error('Failed to save genre');
        }
      }
      console.log('Genres saved successfully');
      navigate('/'); // Redirigir a la página de inicio
    } catch (error) {
      console.error('Error saving genres:', error);
    }
  };

  const handleGenreChange = (e) => {
    const options = e.target.options;
    const selected = [];
    for (const option of options) {
      if (option.selected) {
        selected.push(option.value);
      }
    }
    setSelectedGenres(selected);
  };

  const openModal = (e) => {
    e.preventDefault(); // Prevenir el comportamiento predeterminado del botón
    setIsModalOpen(true);
  };

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
          <div className="form-help">
            <div className="remember">
              <input type="checkbox" />
              <label htmlFor="">Remember me</label>
            </div>
            <p>Need help?</p>
            <button onClick={openModal}>Click Me</button>
          </div>
        </form>
        <div className="form-switch">
          {signState === "Sign In" ? (
            <p>New to FilmHub!? <span onClick={() => setSignState("Sign Up")}>Sign Up Now</span></p>
          ) : (
            <p>Already have an account? <span onClick={() => setSignState("Sign In")}>Sign In Now</span></p>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Select your favorite genres:</h2>
            <select id="genres" multiple onChange={handleGenreChange}>
              {genres.map(genre => (
                <option key={genre.id} value={genre.id}>{genre.nombre}</option>
              ))}
            </select>
            <button onClick={handleSaveGenres}>Save</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;