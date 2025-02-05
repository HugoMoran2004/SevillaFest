import {
  Typography,
  TextField,
  Button,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Alert,
  Card,
  CardContent,
  Container,
  Box,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Snackbar } from "@mui/material";
import swal from "sweetalert";
// Importamos las variables de entorno
import { apiUrl } from "../config";
import Send from "@mui/icons-material/Send";

function AltaActividad() {
  const [open, setOpen] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [festivales, setFestivales] = useState([]); // Lista de festivales
  const [datos, setDatos] = useState({
    nombre: "",
    duracion: "",
    descripcion: "",
    imagenActividad: "",
    idFestival: "",
  });
  const [validacion, setValidacion] = useState({
    nombre: false,
    duracion: false,
    descripcion: false,
    imagenActividad: false,
    idFestival: false,
  });
  const navigate = useNavigate();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  // 🔹 Cargar la lista de festivales desde la API al montar el componente
  useEffect(() => {
    fetch(apiUrl + "/festival") // Reemplaza con tu URL de API
      .then((response) => response.json()) // Convertimos la respuesta a JSON
      .then((data) => {
        setFestivales(data.datos);
      })
      .catch((error) => {
        console.error("Error al obtener festivales:", error);
      });
      document.body.style.backgroundColor = "#f0f0f0";
      return () => {
        document.body.style.backgroundColor = "";
      }
  }, []);

  // 🔹 Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

  // 🔹 Enviar el formulario
  const handleSubmit = async (e) => {
    // No hacemos submit
    e.preventDefault();

    if (validarDatos()) {
      try {
        const response = await fetch(apiUrl + "/actividad", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(datos),
        });
        if (response.ok) {
          const respuesta = await response.json();
          if (respuesta.ok) {
            swal({
              title: "Crear Actividad",
              text: "¿Deseas crear esta actividad?",
              icon: "info",
              buttons: ["Cancelar", "Aceptar"],
            }).then((respuesta) => {
              if (respuesta) {
                navigate("/"); // Volver a la página principal
                swal({
                  text: "Actividad creada correctamente",
                  icon: "success",
                });
              }
            });
          }
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Error:", error);
        setMensaje("Error en la conexión al servidor");
        setOpen(true); // Abre el Snackbar
      }
    } else {
      setMensaje("Error en el formulario. Revise los campos");
      setOpen(true);
    }
  };
  // Enviamos los datos mediante fetch

  function validarDatos() {
    let validado = true;
    let validacionAux = {
      nombre: false,
      duracion: false,
      descripcion: false,
      imagenActividad: false,
      idFestival: false,
    };

    // VALIDAR NOMBRE
    if (datos.nombre.length <= 2 || !isNaN(datos.nombre)) {
      validacionAux.nombre = true;
      validado = false;
    }
    // VALIDAR duracion
  /*const duracion = Number(datos.duracion);
    if (duracion < 40 || !isNaN(duracion)) {
      validacionAux.duracion = true;
      validado = false;
    }*/

    // VALIDAR Descrpcion
    if (datos.descripcion.length < 4 || !isNaN(datos.descripcion)) {
      validacionAux.descripcion = true;
      validado = false;
    }

    // VALIDAR PRECIO
    if (!isNaN(datos.imagenActividad)) {
      validacionAux.imagenActividad = true;
      validado = false;
    }

    /*if (!isNaN(datos.idFestival)) {
      validacionAux.idFestival = true;
      validado = false;
    }*/

    setValidacion(validacionAux);
    return validado;
  }

  return (
    
    <Container
      maxWidth="sm"
      
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        
      }}
    >
      <Card elevation={6} sx={{ width: "100%", borderRadius: 3, p: 2 }}>
        <CardContent>
          <Typography variant="h4" align="center" gutterBottom>
            Alta de Actividades
          </Typography>

          <Grid container spacing={3} component="form" onSubmit={handleSubmit}>
            <Grid item xs={12}>
              <TextField
                label="Nombre"
                variant="outlined"
                name="nombre"
                value={datos.nombre}
                onChange={handleChange}
                error={validacion.nombre}
                helperText={validacion.nombre && "Mínimo 2 caracteres"}
                fullWidth
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Duración (minutos)"
                variant="outlined"
                name="duracion"
                type="number"
                value={datos.duracion}
                onChange={handleChange}
                /*error={validacion.duracion}
                helperText={validacion.duracion && "Mínimo 40 minutos"}*/
                fullWidth
                sx={{ mr: 5 }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Descripción"
                variant="outlined"
                name="descripcion"
                value={datos.descripcion}
                onChange={handleChange}
                error={validacion.descripcion}
                helperText={validacion.descripcion && "Mínimo 4 caracteres"}
                fullWidth
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Imagen Actividad (URL)"
                variant="outlined"
                name="imagenActividad"
                value={datos.imagenActividad}
                onChange={handleChange}
                error={validacion.imagenActividad}
                helperText={validacion.imagenActividad && "Campo Requerido"}
                fullWidth
                sx={{ mr: 5 }}
              />
            </Grid>

            <FormControl fullWidth>
              <InputLabel>Festival</InputLabel>
              <Select
                label="Festival"
                name="idFestival"
                value={datos.idFestival}
                onChange={handleChange}
                fullWidth
                sx={{
                  "& .MuiSelect-select": {
                    height: "56px", // Asegura que el select se vea grande
                  },
                }}
              >
                {festivales.map((festival) => (
                  <MenuItem
                    key={festival.idFestival}
                    value={festival.idFestival}
                  >
                    {festival.nombre} - {festival.ciudad}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Botón debajo del Select */}

            <Box sx={{mx : "auto"}}>
              <Button
                variant="contained"
                type="submit"
                size="small"
                startIcon={<Send />}
                fullWidth
                sx={{
                  py: 1,
                  px: 2,
                  borderRadius: 4,
                  fontSize: 16,
                  backgroundColor: "#004d40", // Color del fondo normal
                  "&:hover": {
                    backgroundColor: "#a5d6a7", // Color del fondo al hacer hover
                  },
                }}
              >
                Enviar
              </Button>
            </Box>
          </Grid>

          <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity="error"
              sx={{ width: "100%" }}
            >
              {mensaje}
            </Alert>
          </Snackbar>
        </CardContent>
      </Card>
    </Container>
    
  );
}

export default AltaActividad;
