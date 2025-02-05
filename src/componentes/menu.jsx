//import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
const ContenedorPrincipal = styled(Box)({ display: 'flex' });
/*import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from 'mdb-react-ui-kit';
import { Link } from 'react-router';
import Typography from '@mui/material/Typography';
import logo from '../assets/images/logo.png.webp';
const anchoDrawer = 240;

const ContenedorPrincipal = styled(Box)({ display: 'flex' });

const BarraPersonalizada = styled(AppBar)({
  zIndex: 1201,
  backgroundColor: '#004d40',
});

const EncabezadoDrawer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
}));

const SeccionMenu = styled(Box)({
  padding: '1rem',
  backgroundColor: '#004d40',
  borderRadius: '8px',
  marginBottom: '1rem',
});

const ItemDropdownPersonalizado = styled(MDBDropdownItem)({
  '&:hover': {
    color: 'white',
  },
  '&:active': {
    backgroundColor: '#004d40',
    color: 'white',
  },
  fontWeight: 'bold',
  color: 'white',
  backgroundColor: '#a5d6a7',
  borderRadius: '8px',
  padding: '0.5rem 1rem',
  textDecoration: 'none',
});

const MenuDropdownPersonalizado = styled(MDBDropdownMenu)({
  position: 'static',
  color: 'white',
  fontWeight: 'bold',
  backgroundColor: '#a5d6a7',
  borderRadius: '8px',
});

const BotonDropdownPersonalizado = styled(MDBDropdownToggle)({
  fontWeight: 'bold',
  backgroundColor: '#004d40',
  color: 'white',
  '&:hover': {
    color: '#a5d6a7',
  },
  '&:focus': {
    outline: 'none !important',
    backgroundColor: 'transparent',
    boxShadow: 'none !important',
  },
  '&:active': {
    backgroundColor: '#004d40',
  },
});*/

// Carrusel
const CarruselWrapper = styled('div')({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  marginTop: '20px',
  marginBottom: '20px',
});

export default function DrawerMini() {
  

  // Alterna el estado del Drawer
 

  // Cierra el Drawer cuando cambia la ruta
 

  return (
    <ContenedorPrincipal>
      

      {/* Aquí agregamos el Carrusel */}
      <CarruselWrapper>
        <div id="carouselBasicExample" className="carousel slide carousel-fade" data-mdb-ride="carousel">
          {/* Indicadores */}
          <div className="carousel-indicators">
            <button
              type="button"
              data-mdb-target="#carouselBasicExample"
              data-mdb-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-mdb-target="#carouselBasicExample"
              data-mdb-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-mdb-target="#carouselBasicExample"
              data-mdb-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>

          {/* Inner */}
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(15).webp" className="d-block w-100" alt="Sunset Over the City" />
              <div className="carousel-caption d-none d-md-block">
                <h5>First slide label</h5>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
              </div>
            </div>
            <div className="carousel-item">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(22).webp" className="d-block w-100" alt="Canyon at Night" />
              <div className="carousel-caption d-none d-md-block">
                <h5>Second slide label</h5>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
            </div>
            <div className="carousel-item">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(23).webp" className="d-block w-100" alt="Cliff Above a Stormy Sea" />
              <div className="carousel-caption d-none d-md-block">
                <h5>Third slide label</h5>
                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
              </div>
            </div>
          </div>
          
          {/* Controls */}
          <button className="carousel-control-prev" type="button" data-mdb-target="#carouselBasicExample" data-mdb-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-mdb-target="#carouselBasicExample" data-mdb-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </CarruselWrapper>
    </ContenedorPrincipal>
  );
}
