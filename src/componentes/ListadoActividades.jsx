
import { useLocation } from 'react-router';
import { Card, CardContent, Typography, Box } from '@mui/material';
import Grid from "@mui/material/Grid2";

function ListadoActividades() {
    const { state } = useLocation(); // Obtiene las actividades pasadas desde la búsqueda
    const actividades = state ? state.actividades : [];

    return (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Actividades Encontradas
            </Typography>

            <Grid container spacing={4} justifyContent="center">
                {actividades.map((actividad, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">{actividad.nombre}</Typography>
                                <Typography variant="body1"><strong>Festival:</strong> {actividad.festival}</Typography>
                                <Typography variant="body2">{actividad.descripcion}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default ListadoActividades;
