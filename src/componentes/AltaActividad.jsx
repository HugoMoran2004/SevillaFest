import { Typography, TextField, Stack, Button, FormControl, Select, InputLabel, MenuItem, Alert } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Snackbar } from '@mui/material';
import swal from 'sweetalert';
// Importamos las variables de entorno
import { apiUrl } from '../config';


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
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  // 🔹 Cargar la lista de festivales desde la API al montar el componente
  useEffect(() => {
    fetch(apiUrl + "/festival") // Reemplaza con tu URL de API
      .then((response) =>
        response.json())  // Convertimos la respuesta a JSON
      .then((data) => {
        setFestivales(data.datos);
      })
      .catch((error) => {
        console.error("Error al obtener festivales:", error);
      });
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
          }). then((respuesta) => {
            if (respuesta) {
              navigate("/"); // Volver a la página principal
              swal({
              text:"Actividad creada correctamente",
              icon: "success"
            });
            }
          }
          );
        }
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Error:", error);
        setMensaje("Error en la conexión al servidor");
        setOpen(true); // Abre el Snackbar
      }
    } else{
      setMensaje("Error en el formulario. Revise los campos");
      setOpen(true);
    }

  }
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
    <>
      <Typography variant="h4" align="center" sx={{ mt: 2 }}>
        Alta de Actividades
      </Typography>
      <Grid
        container
        spacing={2}
        sx={{ mt: 2, justifyContent: "center", alignItems: "center" }}
      >
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Stack
            component="form"
            spacing={2}
            onSubmit={handleSubmit}
            sx={{ mx: 2 }}
          >
            <TextField
              id="outlined-basic"
              label="Nombre"
              variant="outlined"
              name="nombre"
              value={datos.nombre}
              onChange={handleChange}
              error={validacion.nombre}
              helperText={validacion.nombre && "Nombre incorrecto. Mínimo 2 caracteres"}
            />
            <TextField
              id="outlined-basic"
              label="Duracion"
              variant="outlined"
              name="duracion"
              type="number"
              value={datos.duracion}
              //error={validacion.duracion}
              onChange={handleChange}
              //helperText={validacion.duracion && "Duracion requerida. Mínimo 40 minutos"}
            />
            <TextField
              id="outlined-basic"
              label="Descripcion"
              variant="outlined"
              name="descripcion"
              value={datos.descripcion}
              error={validacion.descripcion}
              onChange={handleChange}
              helperText={validacion.descripcion && "Descripcion requerida. Mínimo 4 caracteres"}
            />
            <TextField
              id="outlined-basic"
              label="Imagen Actividad"
              variant="outlined"
              name="imagenActividad"
              value={datos.imagenActividad}
              error={validacion.imagenActividad}
              onChange={handleChange}
              helperText={validacion.imagenActividad && "Imagen requerida"}
            />
            {/* Desplegable para seleccionar un festival */}
            <FormControl fullWidth>
              <InputLabel>Festival</InputLabel>
              <Select
                name="idFestival"
                value={datos.idFestival}
                onChange={handleChange}
                error={validacion.idFestival}
                label="Festival"
                //helperText={validacion.idFestival && "Festival requerido"}
              >
                {festivales.map((festival) => (
                  <MenuItem key={festival.idFestival} value={festival.idFestival}>
                    {festival.nombre} - {festival.ciudad}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button variant="contained" type="submit">
              Aceptar
            </Button>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                            {mensaje}
                          </Alert>
                        </Snackbar>
          </Stack>
        </Grid>
      </Grid>
    </>
  );

}

export default AltaActividad;