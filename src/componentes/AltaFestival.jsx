import { Typography, TextField, Stack, Button, Alert } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React, { useState } from "react";
import { useNavigate } from "react-router";
// Importamos las variables de entorno
import { apiUrl } from '../config';

//Snackbar
import { Snackbar } from '@mui/material';

//MDBoostrap Modal
import { MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter,MDBBtn } from "mdb-react-ui-kit";


//FECHA
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs"
import "dayjs/locale/es";

dayjs.locale("es");



function AltaFestival() {


  const [open, setOpen] = React.useState(false);
  const [mensaje, setMensaje] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [datos, setDatos] = useState({
    nombre: "",
    ciudad: "",
    numEntradas: "",
    fechaInicio: null,
    fechaFin: null,
    precio: "",

  });
  const [validacion, setValidacion] = useState({
    nombre: false, // true si hay error
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

  //Modal
  const handleCloseModal = () => {
    setOpenModal(false);
    //navigate("/"); // Redirige a la página principal cuando se cierra el modal
  };


  //Boton
  const handleValidateAndModal =  () => {
    
    if(validarDatos()){
      setOpenModal(true);
    }else{
      setMensaje("Error en el formulario. Revise los campos");
      setOpen(true);

    }
  };

    // Enviamos los datos mediante fetch
    const handleConfirmarEnvio = async () => {
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
          setMensaje(respuesta.mensaje);
          
          if (respuesta.ok) {
            setOpenModal(false);
            navigate("/"); // Volver a la página principal
          }
        } else{
          setMensaje("Error en el formulario al crear el festival");
          setOpen(true);
        }
      } catch (error) {
        console.error("Error:", error);
        setMensaje("Error en la conexion al servidor");
        setOpen(true);
        //alert("Error:", error);
      }
    }
  };

  function validarDatos() {
    // En principio, damos por bueno el formulario
    let validado = true;
    // Estado de la validación auxiliar
    let validacionAux = {
      nombre: false, // true si hay error
      ciudad: false,
      numEntradas: false,
      precio: false,
      fechaInicio: false,
      fechaFin: false,
    };
    //VALIDAR NOMBRE
    if (datos.nombre.length <= 1) {
      // Error en el nombre
      validacionAux.nombre = true;
      // Formulario invalido
      validado = false;
    }
    //VALIDAR CIUDAD
    if (datos.ciudad.length < 4) {
      validacionAux.ciudad = true;
      validado = false;
    }
    //VALIDAR numEntradas
    if (datos.numEntradas < 50 || isNaN(datos.numEntradas)) {
      validacionAux.numEntradas = true;
      validado = false;
    }
    //VALIDAR FECHAS
    if (datos.fechaInicio && datos.fechaFin) {
      if (datos.fechaFin.isBefore(datos.fechaInicio)) {
        validacionAux.fechaFin = true;
        validado = false;
      }
    }

    if (datos.fechaInicio) {
      const hoy = dayjs().startOf('day');  // Normaliza la fecha actual a medianoche
      if (datos.fechaInicio.isBefore(hoy, 'day')) {
        validacionAux.fechaInicio = true;
        validado = false;
      }
    }
    //VALIDAR PRECIO
    let expPrecio = /^\d{1,5}(\.\d{1,2})?$/;
    if (expPrecio.test(datos.precio)) {
      if (parseFloat(datos.precio) < 50 || parseFloat(datos.precio) > 99999.99) {
        // No permite valores negativos
        validacionAux.precio = true;
        validado = false;
      }
    } else {
      validacionAux.precio = true;
      validado = false;
    }

    // Actualizo el estado de la validacion de los Textfields
    setValidacion(validacionAux);
    console.log("Formulario valido:", validado);
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
      <Grid
        container
        spacing={2}
        sx={{ mt: 2, justifyContent: "center", alignItems: "center" }}
      >
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Stack
            component="form"
            spacing={2}
            //onSubmit={handleSubmit}
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
              helperText={
                validacion.nombre && "Nombre incorrecto. Mínimo 2 caracteres"
              }
            />
            <TextField
              id="outlined-basic"
              label="Ciudad"
              variant="outlined"
              name="ciudad"
              value={datos.ciudad}
              error={validacion.ciudad}
              onChange={handleChange}
              helperText={
                validacion.ciudad &&
                "Ciudad requerida. Minimo 4 caracteres"
              }
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
              helperText={
                validacion.numEntradas && "Minimo 50 numEntradas"
              }
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
              helperText={
                validacion.precio && "Importe incorrecto. [50€ - 99.999,99€]"
              }
            />
            {/* Componente de Fecha de Inicio */}
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
              <DatePicker
                label="Comienza"
                value={datos.fechaInicio}
                onChange={(handleChangeFechaInicio)}
                inputFormat="DD/MM/YYYY"
                renderInput={(params) => <TextField {...params} />}
                error={validacion.fechaInicio}
                helperText={
                  validacion.fechaInicio && "Fecha de inicio no inferiro al dia actual"
                }
              />

              {/* Componente de Fecha de Fin */}
              <DatePicker
                label="Finaliza"
                value={datos.fechaFin}
                onChange={handleChangeFechaFin}
                inputFormat="DD/MM/YYYY"
                renderInput={(params) => <TextField {...params} />}
                error={validacion.fechaFin}
                helperText={
                  validacion.fechaFin && "Fecha de fin no puede ser inferior a la de inicio"
                }
              />
            </LocalizationProvider>
            <Button variant="contained" /*type="submit"*/ onClick={handleValidateAndModal}>
              Aceptar
            </Button>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>{mensaje}</Alert>
            </Snackbar>

            <MDBModal show={openModal} tabIndex="-1" setShow={setOpenModal}>
              <MDBModalHeader>¿Estas seguro?</MDBModalHeader>
              <MDBModalBody>
                <Typography>El festival ha sido registrado correctamente.</Typography>
              </MDBModalBody>
              <MDBModalFooter>
                <MDBBtn color="primary" onClick={handleConfirmarEnvio}>Aceptar</MDBBtn>
                <MDBBtn color="secondary" onClick={handleCloseModal}>Cancelar</MDBBtn>
              </MDBModalFooter>
            </MDBModal>   
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}
export default AltaFestival;