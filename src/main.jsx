import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'




import { createBrowserRouter, RouterProvider } from "react-router";
import Home from './pages/Home';

import ListadoActividades from "./componentes/ListadoActividad";
import AltaActividad from "./componentes/AltaActividad";
import ModificarActividad from "./componentes/ModificarActividad";

import ListadoFestivales from "./componentes/ListadoFestival";
import AltaFestival from "./componentes/AltaFestival";
import ModificarFestival from "./componentes/ModificarFestival"



let router = createBrowserRouter([
  {
    path: "/",
    element : <Home />,
    //errorElement : <PaginaError />,
    children: [   
      {
        path: "listadoactividades",
        element: <ListadoActividades />,
      },
      {
        path: "listadofestivales",
        element: <ListadoFestivales/>,
      },
      {
        path: "altafestival",
        element: <AltaFestival />,
      },
      {
        path: "altaactividad",
        element: <AltaActividad />,
      },
      {
        path: "modificaractividad/:idactividad",
        element: <ModificarActividad />,
      },
      {
        path: "modificarfestival/:nombrefestival",
        element: <ModificarFestival />,
      },
    ],
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
