
import { useLocation } from 'react-router';
import { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Box, Pagination } from '@mui/material';
import Grid from "@mui/material/Grid2";

function ListadoActividades() {
    const { state } = useLocation(); // Obtiene las actividades pasadas desde la búsqueda
    const actividades = state ? state.actividades : [];

    //paginacion
    const [page, setPage] = useState(1);
    const itemsPerPage = 5;

    const totalPages = Math.ceil(actividades.length / itemsPerPage);
    const actividadesPaginadas = actividades.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    };
    return (
        <Box sx={{ mt: 18, mb: 14 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Actividades Encontradas
            </Typography>

            <Grid container spacing={4} justifyContent="center">
                {actividadesPaginadas.map((actividad, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card>
                            <CardContent>
                            <CardMedia
                                component="img"
                                height="200"
                                image={actividad.imagenActividad}
                                alt="Imagen de la actividad"
                            />
                                <Typography variant="h6">{actividad.nombre}</Typography>
                                <Typography variant="body2">{actividad.descripcion}</Typography>
                                <Typography variant="body1"><strong>Festival:</strong> {actividad.idFestival_festival.nombre} - {actividad.idFestival_festival.ciudad}</Typography>
                                <Typography variant="body1"><strong>Fecha: </strong>{actividad.idFestival_festival.fechaInicio} - {actividad.idFestival_festival.fechaFin}</Typography>

                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {totalPages > 1 && (
                <Box display= "flex" justifyContent={"center"} mt={4}>
                        <Pagination
                        count={totalPages}
                        page={page}
                        onChange={handlePageChange}
                        color="success">
                        </Pagination>
                </Box>
            )}
        </Box>
    );
}

export default ListadoActividades;
