import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";


import { createBrowserRouter, RouterProvider } from "react-router";
import Home from './pages/Home';
//FESTIVAL
import AltaFestival from "./componentes/AltaFestival";
import ListadoFestivales from "./componentes/ListadoFestival";
import ModificarFestival from "./componentes/ModificarFestival";
//ACTIVIDAD
/*
import ListadoActividades from "./componentes/ListadoActividad";
import AltaActividad from "./componentes/AltaActividad";
import ModificarActividad from "./componentes/ModificarActividad";

"*/



let router = createBrowserRouter([
  {
    path: "/",
    element : <Home />,
    //errorElement : <PaginaError />,
    children: [   
      {
        path: "altafestival",
        element: <AltaFestival />,
      },
      {
        path: "modificarfestival/:nombrefestival",
        element: <ModificarFestival />,
      },
      {
        path: "listadofestivales",
        element: <ListadoFestivales/>,
      },
      /*
      {
        path: "listadoactividades",
        element: <ListadoActividades />,
      },
      {
        path: "altaactividad",
        element: <AltaActividad />,
      },
      {
        path: "modificaractividad/:idactividad",
        element: <ModificarActividad />,
      },
      */
    ],
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
