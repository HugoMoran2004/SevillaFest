import Table from "@mui/material/Table";
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


function ListadoFestivales() {

    const [rows, setRows] = useState([]);
    const [actividades, setActividades] = useState([]); // Listado de actividades del festival seleccionado
    const [festivalSeleccionado, setFestivalSeleccionado] = useState(null); // ID del festival seleccionado
    const [expandido, setExpandido] = useState(false); // Control de expansión del festival
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
    }, []); // Se ejecuta solo en el primer renderizado

    const handleDelete = async (idFestival) => {
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
        }
    };

     // Mostrar actividades de un festival cuando se hace clic
     const handleFestivalClick = async (idFestival) => {
        // Si el festival ya está expandido, lo colapsamos
        if (festivalSeleccionado === idFestival) {
            setExpandido(!expandido);
            return;
        }

        // Si no, cargamos las actividades del festival
        setFestivalSeleccionado(idFestival);
        setExpandido(true);

        let response = await fetch(apiUrl + "/festival/" + idFestival + "/actividades");

        if (response.ok) {
            let data = await response.json();
            setActividades(data.datos); // Asumiendo que el JSON tiene un campo "datos" con las actividades
        }
    };

    return (
        <>
            <Typography variant="h4" align="center" sx={{ mt: 2 }}>
                Festivales 
            </Typography>

            <Box sx={{ mx: 4 }}>
                <TableContainer component={Paper} sx={{ mt: 2 }}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="right">ID</TableCell>
                                <TableCell>NOMBRE</TableCell>
                                <TableCell>CIUDAD</TableCell>
                                <TableCell>Entradas</TableCell>
                                <TableCell>PRECIO</TableCell>
                                <TableCell>FECHA INICIO</TableCell>
                                <TableCell>FECHA FIN</TableCell>
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
                                    <TableCell>{row.nombre}</TableCell>
                                    <TableCell>{row.ciudad}</TableCell>
                                    <TableCell>{row.numEntradas}</TableCell>
                                    <TableCell align="right">{row.precio + " €"}</TableCell>
                                    <TableCell>{row.fechaInicio}</TableCell>
                                    <TableCell>{row.fechaFin}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            onClick={() => handleDelete(row.idFestival)}
                                            color="error"
                                        >
                                            <DeleteForeverIcon fontSize="small" />
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            onClick={() => navigate("/modificarfestival/" + row.idFestival)}
                                        >
                                            <EditNoteIcon fontSize="small" />
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button onClick={() => handleFestivalClick(row.idFestival)}>
                                            Ver actividades
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
                <Box sx={{ mt: 2, mx: 4 }}>
                    <Typography variant="h6">Actividades de Festival:</Typography>
                    <TableContainer component={Paper} sx={{ mt: 2 }}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>NOMBRE</TableCell>
                                    <TableCell>DURACION</TableCell>
                                    <TableCell>DESCRIPCIÓN</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {actividades.length > 0 ? (
                                    actividades.map((actividad) => (
                                        <TableRow key={actividad.idActividad}>
                                            <TableCell>{actividad.nombre}</TableCell>
                                            <TableCell>{actividad.duracion}</TableCell>
                                            <TableCell>{actividad.descripcion}</TableCell>
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

        </>
    );

}

export default ListadoFestivales;