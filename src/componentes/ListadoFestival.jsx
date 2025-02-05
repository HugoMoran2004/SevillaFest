/*import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Button from "@mui/material/Button";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { useNavigate } from "react-router";
import { apiUrl } from "../config";
import Snackbar from "@mui/material";
import Alert from "@mui/material";*/
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box, Button, Snackbar, Alert } from "@mui/material";
import { DeleteForever as DeleteForeverIcon, EditNote as EditNoteIcon } from "@mui/icons-material";
import { useEffect, useState } from "react";
import swal from 'sweetalert';
import { useNavigate } from "react-router";
import { apiUrl } from "../config";
import PageviewIcon from '@mui/icons-material/Pageview';


function ListadoFestivales() {

    const [rows, setRows] = useState([]);
    const [actividades, setActividades] = useState([]); // Listado de actividades del festival seleccionado
    const [festivalSeleccionado, setFestivalSeleccionado] = useState(null); // ID del festival seleccionado
    const [expandido, setExpandido] = useState(false); // Control de expansión del festival
    const [festivalNombre, setFestivalNombre] = useState("");
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [mensaje, setMensaje] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        async function getFestivales() {
            let response = await fetch(apiUrl + "/festival");

            if (response.ok) {
                let data = await response.json();
                console.log("Datos de la API:", data.datos);
                setRows(data.datos);
            }
        }
        

        getFestivales();
        document.body.style.backgroundColor = "#f0f0f0";
      return () => {
        document.body.style.backgroundColor = "";
      }
    }, []); // Se ejecuta solo en el primer renderizado

    const handleDelete = async (idFestival) => {
        swal({
            title: "¿Estás seguro?",
            text: "Una vez eliminado, no podrás recuperar el festival",
            icon: "warning",
            buttons: ["Cancelar", "Aceptar"],
            dangerMode: true,
        }).then(async (willDelete) => {
            if (willDelete) {
                try{
                    let response = await fetch(apiUrl + "/festival/" + idFestival, {
                        method: "DELETE",
                    });
        
                    if (response.ok) {
                        // Utilizando filter creo un array sin el plato borrado
                        const festivalTrasBorrado = rows.filter(
                            (festival) => festival.idFestival != idFestival
                        );
                        // Establece los datos de nuevo para provocar un renderizado
                        setRows(festivalTrasBorrado);
                        swal("El festival ha sido eliminado", {
                            icon: "success",
                        });
                    } else {
                        swal("Error al eliminar el festival", {
                            icon: "error",
                        });
                    }
                } catch (error) {
                    console.error("Error:", error);
                    openSnackbar(true);
                }
            }
        });
    };

     // Mostrar actividades de un festival cuando se hace clic
     const handleFestivalClick = async (idFestival, nombreFestival) => {
        // Si el festival ya está expandido, lo colapsamos
        if (festivalSeleccionado === idFestival) {
            setExpandido(!expandido);
            return;
        }

        // Si no, cargamos las actividades del festival
        setFestivalSeleccionado(idFestival);
        setFestivalNombre(nombreFestival);
        setExpandido(true);
        setActividades([]);
        
        try{
            let response = await fetch(apiUrl + "/festival/" + idFestival + "/actividades");

        if (response.ok) {
            let data = await response.json();
            //setActividades(data.datos); // Asumiendo que el JSON tiene un campo "datos" con las actividades
            if(data.datos.length === 0){
                setMensaje("No hay actividades para este festival");
                setOpenSnackbar(true);
            }else{
                setActividades(data.datos);
            }
        }else{
            setMensaje("Error al cargar las actividades del festival");
            setOpenSnackbar(true);
        } 

        }catch(error){
            console.error("Error:", error);
            setMensaje("Error en la conexion al servidor");
            setOpenSnackbar(true);
        }
        
    };

    return (
        <>
            <Typography variant="h4" align="center" sx={{ mt: 2 }}>
                Festivales 
            </Typography>

            <Box sx={{ mx: 4, mt: 8, mb: 4 }}>
                <TableContainer component={Paper} sx={{ mt: 2 }}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="right">ID</TableCell>
                                <TableCell align="center">NOMBRE</TableCell>
                                <TableCell align="center">CIUDAD</TableCell>
                                <TableCell align="center">Entradas</TableCell>
                                <TableCell align="center">PRECIO</TableCell>
                                <TableCell align="center">FECHA INICIO</TableCell>
                                <TableCell align="center">FECHA FIN</TableCell>
                                <TableCell align="center">ELIMINAR</TableCell>
                                <TableCell align="center">EDITAR</TableCell>
                                <TableCell align="center">VER ACTIVIDADES</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow
                                    key={row.idFestival}
                                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                >
                                    <TableCell align="right">{row.idFestival}</TableCell>
                                    <TableCell align="center">{row.nombre}</TableCell>
                                    <TableCell align="center">{row.ciudad}</TableCell>
                                    <TableCell align="center">{row.numEntradas}</TableCell>
                                    <TableCell  align="center">{row.precio + " €"}</TableCell>
                                    <TableCell align="center">{row.fechaInicio}</TableCell>
                                    <TableCell align="center">{row.fechaFin}</TableCell>
                                    <TableCell align="center">
                                        <Button
                                            variant="contained"
                                            
                                            onClick={() => handleDelete(row.idFestival)}
                                            color="error"
                                        >
                                            <DeleteForeverIcon fontSize="medium" />
                                        </Button>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Button
                                            variant="contained"
                                            
                                            onClick={() => navigate("/modificarfestival/" + row.idFestival)}
                                        >
                                            <EditNoteIcon fontSize="medium" />
                                        </Button>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Button 
                                        variant="contained" 
                                        color= "success"
                                        onClick={() => handleFestivalClick(row.idFestival, row.nombre)}>
                                            <PageviewIcon fontSize="medium" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            {/* Mostrar actividades si el festival está seleccionado y expandido */}
            {expandido && festivalSeleccionado && (
                <Box sx={{ mt: 2, mx: 4, mb: 4 }}>
                    <Typography variant="h6">{festivalNombre} :</Typography>
                    <TableContainer component={Paper} sx={{ mt: 2 }}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">NOMBRE</TableCell>
                                    <TableCell align="center">DURACION</TableCell>
                                    <TableCell align="center">DESCRIPCIÓN</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {actividades.length > 0 ? (
                                    actividades.map((actividad) => (
                                        <TableRow key={actividad.idActividad}>
                                            <TableCell align="center">{actividad.nombre}</TableCell>
                                            <TableCell align="center">{actividad.duracion}</TableCell>
                                            <TableCell align="center">{actividad.descripcion}</TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={4} align="center">
                                            No hay actividades disponibles.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            )}

            <Snackbar
            open={openSnackbar}
            autoHideDuration={6000}
            onClose={() => setOpenSnackbar(false)}
        >
            <Alert onClose={() => setOpenSnackbar(false)} severity="info" sx={{ width: '100%' }}>
                {mensaje}
            </Alert>
        </Snackbar>

        </>
    );

}

export default ListadoFestivales;