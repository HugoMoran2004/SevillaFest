import { Typography, TextField, Stack, Button, Alert } from "@mui/material";
import Grid from "@mui/material/Grid2";
import  { useState } from "react";
import { useNavigate } from "react-router";
import { apiUrl } from '../config'; // Importamos las variables de entorno
import { Snackbar } from '@mui/material'; //Snackbar
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import swal from 'sweetalert';
import dayjs from "dayjs"
import "dayjs/locale/es";

dayjs.locale("es");

function AltaFestival() {
  const [open, setOpen] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [datos, setDatos] = useState({
    nombre: "",
    ciudad: "",
    numEntradas: "",
    fechaInicio: null,
    fechaFin: null,
    precio: "",
  });
  const [validacion, setValidacion] = useState({
    nombre: false,
    ciudad: false,
    numEntradas: false,
    precio: false,
    fechaInicio: false,
    fechaFin: false,
  });

  const navigate = useNavigate();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  // Enviamos los datos mediante fetch
  const handleSubmit = async (e) => {
    e.preventDefault(); // Corregir el error tipográfico

    if (validarDatos()) {
      try {
        const response = await fetch(apiUrl + "/festival", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(datos),
        });

        if (response.ok) {
          const respuesta = await response.json();
          if (respuesta.ok){
            swal({
              title: "Crear Festival",
              text: "¿Deseas crear este festival?",
              icon: "info",
              buttons: ["Cancelar", "Aceptar"],
            }). then((respuesta) => {
              if (respuesta) {
                navigate("/"); // Volver a la página principal
                swal({
                text:"Festival creado correctamente",
                icon: "success"
              });
              }
            }
            );

          }
          
          /*if (respuesta.ok) {
            navigate("/"); // Volver a la página principal
          }*/ // Comentado para probar el sweetalert
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Error en la conexion al servidor");
        setMensaje("Error en la conexión al servidor");
        setOpen(true); // Abre el Snackbar
      }
    } else {
      setMensaje("Error en el formulario. Revise los campos");
      setOpen(true); // Abre el Snackbar si hay errores
    }
  };

  function validarDatos() {
    let validado = true;
    let validacionAux = {
      nombre: false,
      ciudad: false,
      numEntradas: false,
      precio: false,
      fechaInicio: false,
      fechaFin: false,
    };

    // VALIDAR NOMBRE
    if (datos.nombre.length <= 1) {
      validacionAux.nombre = true;
      validado = false;
    }

    // VALIDAR CIUDAD
    if (datos.ciudad.length < 4) {
      validacionAux.ciudad = true;
      validado = false;
    }

    // VALIDAR numEntradas
    if (datos.numEntradas < 50 || isNaN(datos.numEntradas)) {
      validacionAux.numEntradas = true;
      validado = false;
    }

    // VALIDAR FECHAS
    if (datos.fechaInicio && datos.fechaFin) {
      if (datos.fechaFin.isBefore(datos.fechaInicio)) {
        validacionAux.fechaFin = true;
        validado = false;
      }
    }

    if (datos.fechaInicio) {
      const hoy = dayjs().startOf('day');
      if (datos.fechaInicio.isBefore(hoy, 'day')) {
        validacionAux.fechaInicio = true;
        validado = false;
      }
    }

    // VALIDAR PRECIO
    let expPrecio = /^\d{1,5}(\.\d{1,2})?$/;
    if (expPrecio.test(datos.precio)) {
      if (parseFloat(datos.precio) < 50 || parseFloat(datos.precio) > 99999.99) {
        validacionAux.precio = true;
        validado = false;
      }
    } else {
      validacionAux.precio = true;
      validado = false;
    }

    setValidacion(validacionAux);
    return validado;
  }

  const handleChange = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeFechaInicio = (date) => {
    setDatos({
      ...datos,
      fechaInicio: date,
    });
  };

  const handleChangeFechaFin = (date) => {
    setDatos({
      ...datos,
      fechaFin: date,
    });
  };

  return (
    <>
      <Typography variant="h4" align="center" sx={{ mt: 2 }}>
        Alta de Festivales
      </Typography>
      <Grid container spacing={2} sx={{ mt: 2, justifyContent: "center", alignItems: "center" }}>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Stack component="form" spacing={2} onSubmit={handleSubmit} sx={{ mx: 2 }}>
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
              label="Ciudad"
              variant="outlined"
              name="ciudad"
              value={datos.ciudad}
              error={validacion.ciudad}
              onChange={handleChange}
              helperText={validacion.ciudad && "Ciudad requerida. Mínimo 4 caracteres"}
            />
            <TextField
              id="outlined-basic"
              label="Entradas"
              variant="outlined"
              name="numEntradas"
              type="number"
              value={datos.numEntradas}
              onChange={handleChange}
              error={validacion.numEntradas}
              helperText={validacion.numEntradas && "Mínimo 50 entradas"}
            />
            <TextField
              id="outlined-basic"
              label="Precio"
              variant="outlined"
              name="precio"
              type="number"
              value={datos.precio}
              onChange={handleChange}
              error={validacion.precio}
              helperText={validacion.precio && "Importe incorrecto. [50€ - 99.999,99€]"}
            />
            {/* Componente de Fecha de Inicio */}
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
              <DatePicker
                label="Comienza"
                value={datos.fechaInicio}
                onChange={handleChangeFechaInicio}
                inputFormat="DD/MM/YYYY"
                renderInput={(params) => <TextField {...params} />}
                error={validacion.fechaInicio}
                helperText={validacion.fechaInicio && "Fecha de inicio no puede ser inferior al día actual"}
              />
              {/* Componente de Fecha de Fin */}
              <DatePicker
                label="Finaliza"
                value={datos.fechaFin}
                onChange={handleChangeFechaFin}
                inputFormat="DD/MM/YYYY"
                renderInput={(params) => <TextField {...params} />}
                error={validacion.fechaFin}
                helperText={validacion.fechaFin && "Fecha de fin no puede ser inferior a la de inicio"}
              />
            </LocalizationProvider>
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

export default AltaFestival;
