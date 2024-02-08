import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./styles.css";
import { Table } from "react-bootstrap";
import { useInsignias } from "../../Context/insignias";


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
<>
      <Table striped bordered hover  className="tablaClasificacion">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Nivel</th>
            <th>Insignias</th>
          </tr>
        </thead>
        <tbody>
          {jugadores.length > 0 ? (
            jugadores.map((jugador, index) => (
              <tr key={index}>
                <td>{jugador.nombre}</td>
                <td>{jugador.nivel}</td>
                <td style={{overflow: 'auto', maxWidth: '300px'}}>
                {insignias &&
          insignias
            .slice(0, jugador.nivel) 
            .map((e, index) => (
              <img
                width={100}
                height={100}
                key={index}
                src={e.img[`insignia${index + 1}`]}
                alt={`Insignia ${index + 1}`}
              />
            ))}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td>
                <p>No existen jugadores</p>
              </td>
              <td></td>
              <td></td>
            </tr>
          )}
        </tbody>
      </Table>

      

</>
  );
};

export default Tabla;
