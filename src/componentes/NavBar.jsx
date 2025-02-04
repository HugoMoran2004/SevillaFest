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

export default function DrawerMini() {
  const [drawerAbierto, setDrawerAbierto] = useState(false);

  // Alterna el estado del Drawer
  const manejarDrawer = () => {
    setDrawerAbierto(!drawerAbierto);
  };

  // Cierra el Drawer cuando cambia la ruta
  useEffect(() => {
    setDrawerAbierto(false); // Cerrar el Drawer al cambiar de ruta
  }, [window.location.pathname]); // Monitorear los cambios en la ruta

  return (
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
          <img src={logo} alt="Logo" style={{ width: 60, marginRight: 10 }} />
          <Typography variant="h6" noWrap component="div" style={{ flexGrow: 1, textAlign: 'center' }}>
            Panel de Gestión
          </Typography>
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
              <Link to="/listadoactividades" style={{ color: 'white' }}>
                <ItemDropdownPersonalizado link>Listado de actividades</ItemDropdownPersonalizado>
              </Link>
            </MenuDropdownPersonalizado>
          </MDBDropdown>
        </SeccionMenu>
      </Drawer>
        {/* Aquí agregamos las rutas */}
      </ContenedorPrincipal>
    );
  }