import { React } from 'react';
import { useRoutes, BrowserRouter } from 'react-router-dom';
import { FoodProvider } from '../../Context';
import PrincipalPage from '../PrincipalPage';
import LevelOne from '../LevelOne';
import Tabla from '../Tabla';
import 'bootstrap/dist/css/bootstrap.min.css';


const AppRouters = () => {
    let routers = useRoutes([
      { path: '/', element: <PrincipalPage />},
      { path: '/levelOne', element: <LevelOne />},
      { path: '/tablaClasificacion', element: <Tabla />},
    ]);
    return routers;
  }
  
  function App() {
    return(
      <FoodProvider>
          <BrowserRouter>
            <AppRouters>

            </AppRouters>
        </BrowserRouter>
      </FoodProvider>
    );  
  }
  
  export {App};