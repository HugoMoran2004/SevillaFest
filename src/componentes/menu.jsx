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
import { Link } from "react-router";
import { TextField, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import logo from "../assets/images/logo.png.webp";

function Menu() {
  const [openBasic, setOpenBasic] = useState(false);

  return (
    <MDBNavbar expand="lg" style={{ backgroundColor: "#00796b" }}>
      <MDBContainer fluid>
        {/* Logo y Título */}
        <MDBNavbarBrand href="#" className="text-white">
          <img src={logo} height="30" alt="Festival Logo" loading="lazy" />
          <span className="ms-2" style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
            Festival Azul y Verde
          </span>
        </MDBNavbarBrand>

        {/* Toggler */}
        <MDBNavbarToggler
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setOpenBasic(!openBasic)}
        >
          <MDBIcon icon="bars" fas className="text-white" />
        </MDBNavbarToggler>

        <MDBCollapse navbar open={openBasic} className="text-white">
          <MDBNavbarNav className="mx-auto mb-2 mb-lg-0">
            {/* Menú Festivales */}
            <MDBNavbarItem>
              <MDBDropdown>
                <MDBDropdownToggle tag="a" className="nav-link text-white" role="button">
                  Festivales
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <Link to="/altafestival" style={{ color: "#004d40" }}>
                    <MDBDropdownItem link>Alta de festivales</MDBDropdownItem>
                  </Link>
                  <Link to="/listadofestivales" style={{ color: "#004d40" }}>
                    <MDBDropdownItem link>Listado de festivales</MDBDropdownItem>
                  </Link>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavbarItem>

            {/* Menú Actividades */}
            <MDBNavbarItem>
              <MDBDropdown>
                <MDBDropdownToggle tag="a" className="nav-link text-white" role="button">
                  Actividades
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <Link to="/altaactividad" style={{ color: "#004d40" }}>
                    <MDBDropdownItem link>Alta de actividades</MDBDropdownItem>
                  </Link>
                  <Link to="/listadoactividades" style={{ color: "#004d40" }}>
                    <MDBDropdownItem link>Listado de actividades</MDBDropdownItem>
                  </Link>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavbarItem>
          </MDBNavbarNav>

          {/* Botón de Búsqueda */}
          <div className="d-flex  ms-auto">
            <TextField
              variant="outlined"
              size="small"
              placeholder="Buscar..."
              sx={{ bgcolor: "white", borderRadius: "4px", marginRight: "8px" }}
            />
            <IconButton color="primary" sx={{ bgcolor: "#00796b" }}>
              <SearchIcon sx={{ color: "white" }} />
            </IconButton>
          </div>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}

export default Menu;
