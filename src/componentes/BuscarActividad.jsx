
import { useState } from "react";
import {  Button, TextField, Typography, Snackbar, Alert, Stack } from "@mui/material";
import { useNavigate } from "react-router";
import { apiUrl } from "../config";
import Grid from "@mui/material/Grid";



function BuscarActividad (){

    const [nombre, setNombre] = useState("");
    const [openSnackbar, setOpenSnackbar] = useState(false); 
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const navigate = useNavigate();

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpenSnackbar(false);
    };

    const handleBuscar = async () => {
        if (!nombre.trim()) {
            setSnackbarMessage("Por favor, ingrese el nombre de la actividad.");
            setOpenSnackbar(true);
            return;
        }

        try {
            // Realiza la solicitud al backend
            const response = await fetch(apiUrl + "/actividad/" + nombre);
            if (response.ok) {
                
                const data = await response.json();
                
                console.log(data.datos);
                if (data.datos.length === 0) {
                    setSnackbarMessage("No se encontraron actividades con ese nombre.");
                    setOpenSnackbar(true);
                    return;
                }
                // Redirige al componente que muestra las actividades
                navigate("/listadoactividades", { state: { actividades: data.datos } });
            } else {
                const fallo = await response.text();
                console.log(fallo);
                setSnackbarMessage("Error al buscar actividades.");
                setOpenSnackbar(true);
            }
        } catch (error) {
            console.error("Error en la búsqueda:", error);
            setSnackbarMessage("Error al conectar con el servidor.");
            setOpenSnackbar(true);
        }
    };

    return (
        <>
            <Typography variant="h4" align="center" sx={{ mt: 2 }}>
                Buscar Actividades
            </Typography>
            <Grid container spacing={2} sx={{ mt: 2, justifyContent: "center", alignItems: "center" }}>
                <Grid item xs={12} sm={6} md={4}>
                    <Stack component="form" spacing={2} sx={{ mx: 2 }} onSubmit={(e) => e.preventDefault()}>
                        <TextField
                            label="Nombre de la Actividad"
                            variant="outlined"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            fullWidth
                        />
                        <Button variant="contained" onClick={handleBuscar}>Buscar</Button>
                    </Stack>
                </Grid>
            </Grid>

            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="info" sx={{ width: "100%" }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </>
    );

}

export default BuscarActividad;