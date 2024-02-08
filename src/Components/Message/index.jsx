import React, { useContext, useEffect, useRef, useState } from 'react';
import { FoodContext } from '../../Context';
import './styles.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Tabla from '../TablaClasificacion';
import sonido from './correcto.mp3'; 
import sonidoError from './error.mp3';
import pasoNivel from './pasoNivel.mp3';

const Message = ({ nivel, puntosMaximos, puntos, name, description, img, calories, value, onClose, onAvanzar }) => {
  const context = useContext(FoodContext);
  const imageUrl = Object.values(img)[0];
  const [isNotificationOpen, setIsNotificationOpen] = useState(true);



  const text = () => {
    if (value) {
      playSound();
      return "Correcto";
    } else if (value === false) {
      playSoundError();
      return "Incorrecto";
    } else {
      playSoundPaso()
      return "¡Felicidades!";
    }
  };

  useEffect(() => {
    
    notify();
    // if (value === "¡Felicidades!") {
    //     setIsNotificationOpen(false);
    // }

  }, [value]); 

  const notify = () => {
    toast(
      <div className='contenedorPrincipalNotificacion'>
        <div className='contenedorIzquierda'>
          <h1 className='h1Notificacion'>{text()}</h1> <br />
          <h5>Nivel: {nivel}</h5>
          <h5>Puntos para pasar al siguiente nivel</h5>
          <h3>{puntos}/{puntosMaximos}</h3>
        </div>
        <em className='contenedorDerecha'>
          <div className="information">
            <figure>
              <img src={imageUrl} alt="" />
            </figure>
            <div className="food">
              <p className="name">{name}</p>
              <p>{description}</p>
              {value !== undefined &&
                value !== null &&
                value !== "" &&
                value !== "¡Felicidades!" && (
                  <p>y contiene {calories} calorías</p>
                )}
            </div>
          </div>
        </em>
      </div>,
      {
        position: "top-left", 
        autoClose: 7000,
        style: {
          fontSize: "20px",
          width:'96vw',
          padding: '2rem'
        },
        onClose: () => {
          setIsNotificationOpen(false);
        }
      }
    );
  };

  const audioRef = useRef(null);
  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const audioRefError = useRef(null);
  const playSoundError = () => {
    if (audioRefError.current) {
      audioRefError.current.play();
    }
  };


  const audioRefPaso = useRef(null);
  const playSoundPaso = () => {
    if (audioRefPaso.current) {
      audioRefPaso.current.play();
    }
  };
  useEffect(() => {
    if (!isNotificationOpen) {
      if (value !== undefined) {
        onAvanzar();
      }
      onClose();
    }
  }, [isNotificationOpen, value, onAvanzar, onClose]);


  return (
    <div className='container-message'>
      <audio ref={audioRef} src={sonido} type="audio/mp3" />
      <audio ref={audioRefError} src={sonidoError} type="audio/mp3" />
      <audio ref={audioRefPaso} src={pasoNivel} type="audio/mp3" />
      <ToastContainer 
      />
      <div className='contenedorTablaClasificacion'>
        <h2>RANKIN</h2>
        <Tabla />
      </div>
    </div>
  );
};

export { Message };

