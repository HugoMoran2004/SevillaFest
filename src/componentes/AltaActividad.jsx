import { Typography, TextField, Stack, Button,FormControl,Select,InputLabel, MenuItem } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
// Importamos las variables de entorno
import { apiUrl } from '../config';


function AltaActividad(){

    const [festivales, setFestivales] = useState([]); // Lista de festivales
    const [datos, setDatos] = useState({
      nombre: "",
      duracion: "",
      descripcion: "",
      imagenActividad: "",
      idFestival: "",
    });
    const navigate = useNavigate();

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
    
        // Enviamos los datos mediante fetch
        try{
            const response = await fetch(apiUrl + "/actividad", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(datos),
              });
    
            if (response.ok) {
                const respuesta = await response.json();
                alert(respuesta.mensaje);
                if(respuesta.ok){
                    navigate("/"); // Volver a la página principal
                }  
            } 
        } catch (error) {
            console.error("Error:", error);
            alert("Error:", error);
        }
      };
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
              />
              <TextField
                id="outlined-basic"
                label="Duracion"
                variant="outlined"
                name="duracion"
                value={datos.duracion}
                onChange={handleChange}
              />
              <TextField
                id="outlined-basic"
                label="Descripcion"
                variant="outlined"
                name="descripcion"
                value={datos.descripcion}
                onChange={handleChange}
              />
              <TextField
                id="outlined-basic"
                label="Imagen Actividad"
                variant="outlined"
                name="imagenActividad"
                value={datos.imagenActividad}
                onChange={handleChange}
              />
              {/* Desplegable para seleccionar un festival */}
            <FormControl fullWidth>
              <InputLabel>Festival</InputLabel>
              <Select
                name="idFestival"
                value={festivales}
                onChange={handleChange}
                label="Festival"
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
            </Stack>
          </Grid>
        </Grid>
      </>
    );

}

export default AltaActividad;