import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';
import musica from './fondomusica.mp3'


const PrincipalPage = () => {
  const [animationClass, setAnimationClass] = useState('');
  const [nombre,setNombre] = useState('')

  const iniciarJuego = () => {
    setAnimationClass('fadeOut');
    localStorage.setItem('Nombre', nombre)
  };
  
  return (
    <div className={`app-container1 ${animationClass}`}>
      <span className='image-1'></span>
      <span className='image-2'></span>
      <span className='image-3'></span>
      <div className='container-items'>
        <audio src={musica} autoPlay></audio>
        <h1 className="animated1-text">Bienvenido a NutriReto !!!</h1>
        <input type="text" placeholder='Ingresa tu nombre' className='input1-name' onChange={(e)=>setNombre(e.target.value)}/>
        <div className='container2-btns'>
          <Link to="/levelOne"  className='container1-button'>
            <button className="start-button1" onClick={iniciarJuego}>
              Iniciar Juego
            </button>
          </Link>
          <Link to="/tablaClasificacion"  className='container1-button'>
            <button className="start-button1">
              Tabla de clasificación
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PrincipalPage;
