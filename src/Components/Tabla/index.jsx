import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./styles.css";
import TablaClasificacion from '../TablaClasificacion/index'
import { useInsignias } from "../../Context/insignias";
import { Configuracion } from "../Configuracion";
const Tabla = () => {
  const [jugadores, setJugadores] = useState([]);
  const [insignias, setInsignias] = useState();

  useEffect(() => {
    // Obtener jugadores del localStorage
    const jugadoresEnLocalStorage = JSON.parse(
      localStorage.getItem("jugadores") || "[]"
    );
    setJugadores(jugadoresEnLocalStorage);
    ObtenerInsignias();
  }, []); // Se ejecutará solo una vez al montar el componente

  const ObtenerInsignias = () => {
    const { insignias } = useInsignias();
    setInsignias(insignias);
  };

  return (
    <div className={`app-container-table-principal`}>
        <div className={`app-container-table`}>
            <div className={`app-container-table-inicio`}>
      <h1 className="animated-text-tabla">RANKING</h1>
      <Link to="/" className="container-button-table">
        <button className="start-button-regresar">Regresar</button>
      </Link>
      </div>

      <TablaClasificacion/>      
    </div>
    <Configuracion></Configuracion>            
    </div>
  );
};

export default Tabla;
