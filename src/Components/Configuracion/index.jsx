import React, { useState, useRef } from 'react';
import './styles.css';
import imagen from './icono.png';
import salirIcono from './salir.png';
import fondomusica from './fondomusica.mp3';
import sonidoIcono from './sonido.png';
import sonidoIconoSilencio from './silencio.png';

const Configuracion = () => {
  const [mostrarAjustes, setMostrarAjustes] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(true);
  const audioRef = useRef(new Audio(fondomusica));

  const toggleAjustes = () => {
    setMostrarAjustes(!mostrarAjustes);
  };

  const redireccionarInicio = () => {
    window.location.href = '/';
  };

  const toggleMusica = () => {
    if (isMusicPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsMusicPlaying(!isMusicPlaying);
  };

  return (
    <div className='contenedor-configuracion'>
      <audio ref={audioRef} src={fondomusica} autoPlay loop />
      <img
        className={`imagen-configuracion ${mostrarAjustes ? 'ajustes-abierto' : ''}`}
        src={imagen}
        alt='hola'
        onClick={toggleAjustes}
      />
      {mostrarAjustes && (
        <div className='ajustes'>
          <img
            className='imagen-configuracion'
            src={salirIcono}
            alt='hola'
            onClick={redireccionarInicio}
          />

{ isMusicPlaying ?
          <img
            className='imagen-configuracion'
            src={sonidoIcono}
            alt='hola'
            onClick={toggleMusica}
          />
          :
          <img
            className='imagen-configuracion'
            src={sonidoIconoSilencio}
            alt='hola'
            onClick={toggleMusica}
          />
          
}
        </div>
      )}
    </div>
  );
};

export { Configuracion };
