import { Typography, TextField, Stack, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useState } from "react";
import { useNavigate } from "react-router";
// Importamos las variables de entorno
import { apiUrl } from '../config';

//FECHA
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function AltaFestival (){

    const [datos, setDatos] = useState({
        nombre: "",
        ciudad: "",
        numEntradas: "",
        fechaInicio: null,
        fechaFin: null,
        precio: "",

      });
      const navigate = useNavigate();
    
      const handleSubmit = async (e) => {
        // No hacemos submit
        e.preventDefault();
    
        // Enviamos los datos mediante fetch
        try{
            const response = await fetch(apiUrl + "/festival", {
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
              label="Ciudad"
              variant="outlined"
              name="ciudad"
              value={datos.ciudad}
              onChange={handleChange}
            />
            <TextField
              id="outlined-basic"
              label="NumEntradas"
              variant="outlined"
              name="numEntradas"
              value={datos.numEntradas}
              onChange={handleChange}
            />
            <TextField
              id="outlined-basic"
              label="Precio"
              variant="outlined"
              name="precio"
              value={datos.precio}
              onChange={handleChange}
            />
            {/* Componente de Fecha de Inicio */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Fecha de Inicio"
                value={datos.fechaInicio}
                onChange={(handleChangeFechaInicio)}
                renderInput={(params) => <TextField {...params} />}
              />

              {/* Componente de Fecha de Fin */}
              <DatePicker
                label="Fecha de Fin"
                value={datos.fechaFin}
                onChange={handleChangeFechaFin}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>

            <Button variant="contained" type="submit">
              Aceptar
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </>
  );

}


export default AltaFestival;