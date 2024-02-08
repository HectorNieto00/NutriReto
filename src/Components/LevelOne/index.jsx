import { React, useContext, useEffect, useState } from 'react';
import { FoodContext } from '../../Context';
import { Message } from '../Message';
import { Configuracion } from '../Configuracion';
import { useInsignias } from '../../Context/insignias';
import './styles.css';
import canasta from './canasta.png';
import corazon from './corazon.png';
import corazon2 from './corazon2.png';
import corazon3 from './corazon3.png';
import { useNavigate } from 'react-router-dom';


const LossModal = ({ onRestart }) => (
  <div className='modal-container'>
    <div className='modal-content-perdida'>
      <p>¡Has perdido todas las vidas!</p>
      <button onClick={onRestart}>Reiniciar Juego</button>
    </div>
  </div>
);



const Ganar = () => (
  <div className='modal-container-ganar'>
    <div className='modal-content-perdida'>
    <p>¡Felicidades! Completaste todos los niveles</p>
    <div className='botonesGanar'>
      <button onClick={()=> {window.location.href= '/'}}>Salir</button>
      <button onClick={()=> {window.location.href= '/tablaClasificacion'}}>RANKIN</button>
      </div>
    </div>
  </div>
);



const LevelOne = () => {
  const context = useContext(FoodContext);
  const [level, setLevel] = useState(1);
  const [foodAleatorio, setFoodAleatorio] = useState({});
  const [showMessage, setShowMessage] = useState(false);
  const [messageData, setMessageData] = useState({});
  const [lives, setLives] = useState(3);
  const [showAvanzarButton, setShowAvanzarButton] = useState(false);
  const { insignias } = useInsignias();
  const navigate = useNavigate();
  const [showLossModal, setShowLossModal] = useState(false);
  const [ganar, setGanar] = useState(false);
  const [puntos, setPuntos] = useState(0); //
  const [showCongratsModal, setShowCongratsModal] = useState(false);
  ////
  const puntosMaximos = 20;

  const obtenerComidaAleatoria = () => {
    const indiceAleatorio = Math.floor(Math.random() * context.food.length);
    setFoodAleatorio(context.food[indiceAleatorio]);
  };


  const actualizarLocalStorage = (nivel) => {

    const nombreGuardado = localStorage.getItem('Nombre'); // Obtener el nombre aquí
    const jugadoresEnLocalStorage = JSON.parse(localStorage.getItem('jugadores') || '[]');
    const jugadorActual = jugadoresEnLocalStorage.find((jugador) => jugador.nombre === nombreGuardado);
    
    if (jugadorActual) {
      jugadorActual.nivel = nivel;
    } else {
      jugadoresEnLocalStorage.push({ nombre: nombreGuardado, nivel });
    }
  
    localStorage.setItem('jugadores', JSON.stringify(jugadoresEnLocalStorage));
  };

  

  useEffect(() => {
    obtenerComidaAleatoria();
  }, [puntos, level]);

  useEffect(() => {
    const insigniaIndex = level - 1;
    const puntosNecesarios = level * puntosMaximos//20; // Puntos necesarios para el nivel actual
  
    if (puntos >= puntosNecesarios && puntosNecesarios <= 220){ //220) {
      setMessageData(insignias[insigniaIndex]);
      setShowMessage(true);
      if (level < 10) {
        const nombreGuardado = localStorage.getItem('Nombre'); // Obtener el nombre aquí
        actualizarLocalStorage(level,nombreGuardado)
        setLevel(level + 1);
        
      } else {
        // Aquí puedes mostrar un mensaje o realizar alguna acción cuando el juego está completo
        console.log('¡Felicidades! Has completado el juego.');
        setGanar(true)
        //window.location.href='/tablaClasificacion';
      }
    }
  }, [puntos, level, insignias, navigate]);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, tipoContenedor) => {
    e.preventDefault();
    if (lives === 0) {
      return;
    }

    const droppedFoodTipo = e.dataTransfer.getData('text/plain');
    if (foodAleatorio.value && tipoContenedor === 'Saludable') {
      console.log('Correcto: Alimento saludable en el contenedor correcto');
      setMessageData({
        name: foodAleatorio.name,
        description: foodAleatorio.description,
        img: foodAleatorio.img,
        calories: foodAleatorio.calories,
        value: true,
      });
      setShowMessage(true);
      setShowAvanzarButton(true);
      setPuntos((prevPuntos) => (prevPuntos + 2 <= 220 ? prevPuntos + 2 : 220)); // Limitar puntos a 220
    } else if (!foodAleatorio.value && tipoContenedor === 'NoSaludable') {
      console.log('Correcto: Alimento no saludable en el contenedor correcto');
      setMessageData({
        name: foodAleatorio.name,
        description: foodAleatorio.description,
        img: foodAleatorio.img,
        calories: foodAleatorio.calories,
        value: true,
      });
      setShowMessage(true);
      setShowAvanzarButton(true);
      setPuntos((prevPuntos) => (prevPuntos + 2 <= 220 ? prevPuntos + 2 : 220)); // Limitar puntos a 220
    } else {
      console.log('Incorrecto: Alimento en el contenedor incorrecto');
      setMessageData({
        name: foodAleatorio.name,
        description: foodAleatorio.description,
        img: foodAleatorio.img,
        calories: foodAleatorio.calories,
        value: false,
      });
      setShowMessage(true);
      setShowAvanzarButton(true);
      if (lives === 1) {
        console.log('Fin del juego');
        setShowLossModal(true);
      }
      setLives((prevLives) => prevLives - 1);
    }
  };

  const handleAvanzar = () => {
    
    const puntosParaSiguienteNivel = level * puntosMaximos//20; // Cantidad de puntos necesarios para avanzar al siguiente nivel
    
    if (puntos >= puntosParaSiguienteNivel) {
      const nuevosPuntos = puntos - puntosParaSiguienteNivel; // Calcula los puntos que quedan después de avanzar de nivel
  
      if (level < 9) {
        setLevel((prevLevel) => prevLevel + 1);
        
        setShowAvanzarButton(false);
        obtenerComidaAleatoria();
        setShowMessage(false);
        setLives(3);
        setPuntos(nuevosPuntos);
      } else {
        // Aquí puedes mostrar un mensaje o realizar alguna acción cuando el juego está completo
        console.log('¡Felicidades! Has completado el juego.');
        navigate('/');
      }
    } else {
      console.log('No tienes suficientes puntos para avanzar al siguiente nivel.');
    }
  };

  const handleCloseMessage = () => {
    setShowMessage(false);
  };

  const handleRestartGame = () => {
    navigate('/levelOne');
    setShowLossModal(false);
    setLevel(1);
    setLives(3);
    setShowAvanzarButton(false);
    obtenerComidaAleatoria();
    setShowMessage(false);
    setPuntos(0);
  };

  return (
    <>
    
    <Configuracion/>

      <div className='container-level'>
        <div className='container-game'>
          <h2>Nivel {level}</h2>
          <div className='container-top'>
            {lives > 0 ? (
              <div className='level-puntos-container'>
                <p>Puntos: {puntos}</p>
              </div>
            ) : (
              <h2>¡Has perdido! Vuelve a intentarlo</h2>
            )}
            <div className='CorazonContainer'>
              {[...Array(lives)].map((_, index) => (
                <img
                  key={index}
                  className={`Corazon Corazon${index + 1}`}
                  src={index === 0 ? corazon : index === 1 ? corazon2 : corazon3}
                  alt={`Corazón ${index + 1}`}
                />
              ))}
            </div>
          </div>
          <div className='container-food'>
            {foodAleatorio && foodAleatorio.img && foodAleatorio.name && (
              <img src={foodAleatorio.img[foodAleatorio.name]} alt='' draggable='true' />
            )}
          </div>
          <div className='container-bottom'>
            <div className='left' onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, 'Saludable')}>
              <div className='img-left'>
                <img src={canasta} alt='' />
                <div className='texto'>
                  <p>Saludable</p>
                </div>
              </div>
            </div>
            <div className='right' onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, 'NoSaludable')}>
              <div className='img-right'>
                <img src={canasta} alt='' />
                <div className='texto'>
                  <p>No Saludable</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showMessage && (
        <Message
        puntosMaximos={puntosMaximos * level}
        puntos={puntos}
        nivel={level}
          name={messageData.name}
          description={messageData.description}
          img={messageData.img}
          calories={messageData.calories}
          value={messageData.value}
          onClose={handleCloseMessage}
          onAvanzar={handleAvanzar}
          showAvanzarButton={showAvanzarButton}
        />
      )}

      {showLossModal && <LossModal onRestart={handleRestartGame} />}
      {ganar && <Ganar/>}
      
    </>
  );
};

export default LevelOne;
