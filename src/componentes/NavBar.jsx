import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from 'mdb-react-ui-kit';
import { Link } from 'react-router';
import Typography from '@mui/material/Typography';
import logo from '../assets/images/sevillafest.png';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Brightness4, Brightness7 } from '@mui/icons-material'; 

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
  '& .nav-link': {
    color: 'white', // Texto blanco por defecto
    fontWeight: 'bold',
    '&:hover': {
      color: '#a5d6a7', // Mismo color que los items del dropdown al hacer hover
    },
  },
});

const ItemDropdownPersonalizado = styled(MDBDropdownItem)({
  '&:hover': {
    //backgroundColor: '#2e7d32', // Tono más oscuro en hover
    color: 'white',
  },
  '&:active': {
    backgroundColor: '#004d40',
    color: 'white',
  },
  '&:focus': {
    outline: 'none !important',  // Elimina el borde de enfoque
    boxShadow: 'none !important', // Elimina cualquier sombra al hacer focus
  },
  fontWeight: 'bold', // Letra en negrita
  color: 'white', // Letra blanca
  backgroundColor: '#a5d6a7', // Fondo claro por defecto
  borderRadius: '8px', // Bordes redondeados
  padding: '0.5rem 1rem', // Espaciado para que los items sean más grandes
  textDecoration: 'none',
});

const MenuDropdownPersonalizado = styled(MDBDropdownMenu)({
  position: 'static',
  color: 'white',
  fontWeight: 'bold',
  backgroundColor: '#a5d6a7', // Tono más claro para el menú dropdown
  borderRadius: '8px', // Bordes redondeados
  '&:hover': {
    backgroundColor: '#a5d6a7', // Mantener el color claro cuando se hace hover
  },
});

const BotonDropdownPersonalizado = styled(MDBDropdownToggle)({
  fontWeight: 'bold',
  backgroundColor: '#004d40',
  color: 'white',
  '&:hover': {
    color: '#a5d6a7',
  },
  '&:focus': {
    outline: 'none !important',  // Elimina el borde de enfoque (focus)
    backgroundColor: 'transparent', // Elimina el fondo de enfoque
    boxShadow: 'none !important',
  },
  '&:active': {
    backgroundColor: '#004d40', // Color al hacer clic
  },
});



const temaClaro = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#004d40',
    },
    secondary: {
      main: '#a5d6a7',
    },
    background: {
      default: '#fafafa', // Fondo claro para el modo claro
    },
    text: {
      primary: '#000',
    },
  },
});

// Tema oscuro
const temaOscuro = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#004d40',
    },
    secondary: {
      main: '#a5d6a7',
    },
    background: {
      default: '#121212',
    },
    text: {
      primary: '#fff',
    },
  },
});


export default function DrawerMini() {
  const [drawerAbierto, setDrawerAbierto] = useState(false);
  const [modoOscuro, setModoOscuro] = useState(false);

  // Alterna el estado del Drawer
  const manejarDrawer = () => {
    setDrawerAbierto(!drawerAbierto);
  };

  // Cierra el Drawer cuando cambia la ruta
  useEffect(() => {
    setDrawerAbierto(false); // Cerrar el Drawer al cambiar de ruta
  }, [window.location.pathname]); // Monitorear los cambios en la ruta

  const manejarCambioModo = () => {
    setModoOscuro(!modoOscuro);
  };

  useEffect(() => {
    if (modoOscuro) {
      document.body.style.backgroundColor = '#3b4946'; // Fondo oscuro
    } else {
      document.body.style.backgroundColor = '#fafafa'; // Fondo claro
    }
  }, [modoOscuro]);

  return (
    <ThemeProvider theme={modoOscuro ? temaOscuro : temaClaro}>
    <ContenedorPrincipal>
      <BarraPersonalizada position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="abrir drawer"
            edge="start"
            onClick={manejarDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Link to="/" style={{ textDecoration: 'none'}}>
          <img src={logo} alt="Logo" style={{ width: 80, marginLeft: 5 }} />
          </Link>
          <Typography variant="h6" noWrap component="div" style={{ flexGrow: 1, textAlign: 'center' }}>
            Sevilla Fest
          </Typography>

          <IconButton color="inherit" onClick={manejarCambioModo}>
              {modoOscuro ? <Brightness7 /> : <Brightness4 />}
            </IconButton>

        </Toolbar>
      </BarraPersonalizada>
      <Drawer
        variant="temporary"
        anchor="left"
        open={drawerAbierto}
        onClose={manejarDrawer} // Cerrar el drawer al hacer clic fuera
        sx={{
          '& .MuiDrawer-paper': { width: anchoDrawer, boxSizing: 'border-box', backgroundColor: '#004d40' },
        }}
      >
        <EncabezadoDrawer>
          <IconButton onClick={manejarDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </EncabezadoDrawer>

        <SeccionMenu style={{ marginTop: '2rem' }}>
          <MDBDropdown>
            <BotonDropdownPersonalizado tag="a" className="nav-link" role="button">
              Festivales
            </BotonDropdownPersonalizado>
            <MenuDropdownPersonalizado>
              <Link to="/altafestival" style={{ color: 'white'}}>
                <ItemDropdownPersonalizado link>Alta de festivales</ItemDropdownPersonalizado>
              </Link>
              <Link to="/listadofestivales" style={{ color: 'white' }}>
                <ItemDropdownPersonalizado link>Listado de festivales</ItemDropdownPersonalizado>
              </Link>
            </MenuDropdownPersonalizado>
          </MDBDropdown>
        </SeccionMenu>

        <SeccionMenu>
          <MDBDropdown>
            <BotonDropdownPersonalizado tag="a" className="nav-link" role="button">
              Actividades
            </BotonDropdownPersonalizado>
            <MenuDropdownPersonalizado>
              <Link to="/altaactividad" style={{ color: 'white' }}>
                <ItemDropdownPersonalizado link>Alta de actividades</ItemDropdownPersonalizado>
              </Link>
              <Link to="/buscaractividad" style={{ color: 'white' }}>
                <ItemDropdownPersonalizado link>Buscar Actividad</ItemDropdownPersonalizado>
              </Link>
            </MenuDropdownPersonalizado>
          </MDBDropdown>
        </SeccionMenu>
      </Drawer>
      
      </ContenedorPrincipal>
      </ThemeProvider>
    );
  }