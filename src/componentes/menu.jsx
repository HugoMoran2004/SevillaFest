import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarToggler,
    MDBIcon,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBDropdown,
    MDBDropdownToggle,
    MDBDropdownMenu,
    MDBDropdownItem,
    MDBCollapse,
  } from "mdb-react-ui-kit";
  import { useState } from "react";
  import logo from "../assets/images/logo.png.webp";
  import { Link } from "react-router";
  
  function Menu() {
    const [openBasic, setOpenBasic] = useState(false);
  
    return (
      <MDBNavbar expand="lg" light bgColor="light">
        <MDBContainer fluid>
          <MDBNavbarBrand href="#">
            <img src={logo} height="30" alt="" loading="lazy" />
            Eventos DAM
          </MDBNavbarBrand>
  
          <MDBNavbarToggler
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => setOpenBasic(!openBasic)}
          >
            <MDBIcon icon="bars" fas />
          </MDBNavbarToggler>
  
          <MDBCollapse navbar open={openBasic}>
            <MDBNavbarNav className="mr-auto mb-2 mb-lg-0">
              <MDBNavbarItem>
                <MDBDropdown>
                  <MDBDropdownToggle tag="a" className="nav-link" role="button">
                    Festivales
                  </MDBDropdownToggle>
                  <MDBDropdownMenu>
                    <Link to="/altafestival" style={{ color: "#4f4f4f" }}>
                      <MDBDropdownItem link>Alta de festivales</MDBDropdownItem>
                    </Link>
                    <Link to="/listadofestivales" style={{ color: "#4f4f4f" }}>
                      <MDBDropdownItem link>Listado de festivales</MDBDropdownItem>
                    </Link>
                    <Link to="/buscarfestival" style={{ color: "#4f4f4f" }}>
                      <MDBDropdownItem link>Buscar festival</MDBDropdownItem>
                    </Link>
                  </MDBDropdownMenu>
                </MDBDropdown>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBDropdown>
                  <MDBDropdownToggle tag="a" className="nav-link" role="button">
                    Actividades
                  </MDBDropdownToggle>
                  <MDBDropdownMenu>
                    <Link to="/altaactividad" style={{ color: "#4f4f4f" }}>
                      <MDBDropdownItem link>Alta de actividades</MDBDropdownItem>
                    </Link>
                    <Link to="/listadoactividades" style={{ color: "#4f4f4f" }}>
                      <MDBDropdownItem link>Listado de pedidos</MDBDropdownItem>
                    </Link>
                    <Link to="/buscaractividad" style={{ color: "#4f4f4f" }}>
                      <MDBDropdownItem link>Buscar actividad</MDBDropdownItem>
                    </Link>
                  </MDBDropdownMenu>
                </MDBDropdown>
              </MDBNavbarItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    );
  }
  
  export default Menu;
  