import { Typography, TextField, Stack, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { apiUrl } from "../config";

//FECHA
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

function ModificarFestival() {
    const params = useParams();
    const [datos, setDatos] = useState({
        idFestival: params.idFestival || "",
        nombre: "",
        ciudad: "",
        numEntradas: "",
        precio: "",
        fechaInicio: dayjs(),
        fechaFin: dayjs(),
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

    useEffect(() => {
        if(!params.idFestival){
            alert("Falta el id del festival");
        }
        console.log(params);
        async function getFestivalById() {
            console.log("Vamos a buscar el festival con id:", datos.idFestival);

            let response = await fetch(apiUrl + "/festival/" + datos.idFestival);
            if (response.ok) {
                let data = await response.json();
                console.log("Datos de la API:", data.datos);
                setDatos({
                    ...data.datos,
                    fechaInicio: dayjs(data.datos.fechaInicio),
                    fechaFin: dayjs(data.datos.fechaFin)
                });
            } else if (response.status === 404) {
                let data = await response.json();
                alert(data.mensaje);
                navigate("/"); // Volver a la página principal por ruta erronea
            }
        }

        getFestivalById();
    }, []); // Se ejecuta solo en el primer renderizado

    const handleSubmit = async (e) => {
        // No hacemos submit
        e.preventDefault();
        console.log("Vamos a validar");
        if (validarDatos()) {
            // Enviamos los datos mediante fetch
            try {
                console.log("Vamos a hacer fetch");
                const response = await fetch(apiUrl + "/festival/" + datos.idFestival, {
                    method: "PUT", // "PATCH"
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(datos), // JSON.stringify({blocked: true})
                });

                if (response.ok) {
                    // 204 No content
                    alert("Actualización correcta");
                    navigate(-1); // Volver a la ruta anterior
                } else {
                    // 404 Not Found plato no modificado o no encontrado
                    const data = await response.json();
                    alert(data.mensaje);
                }
            } catch (error) {
                console.error("Error:", error);
                alert("Error:", error);
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
        if (datos.numEntradas < 50) {
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
            if (datos.fechaInicio.isBefore(hoy)) {
                validacionAux.fechaInicio = true;
                validado = false;
            }
        }


        /*
        if (datos.fechaInicio && datos.fechaFin) {
            if (new Date(datos.fechaFin) < new Date(datos.fechaInicio)) {
                validacionAux.fechaFin = true;
                validado = false;
            }
        }

        if (datos.fechaInicio) {
            const hoy = new Date();
            // Normalizamos la fecha actual para ignorar horas, minutos y segundos
            hoy.setHours(0, 0, 0, 0);

            if (new Date(datos.fechaInicio) < hoy) {
                validacionAux.fechaInicio = true;
                validado = false;
            }
        }*/

        /*
        let expPrecio = /^\d{1,2,3}(\.\d{1,2})?$/;
        if (expPrecio.test(datos.precio)) {
            // Los datos al menos tienen el formato correcto
            if (parseFloat(datos.precio) < 0.5 || parseFloat(datos.precio) > 50) {
                validacionAux.precio = true;
                validado = false;
            }
        } else {
            validacionAux.precio = true;
            validado = false;
        }*/
       
        //VALIDAR PRECIO
        let expPrecio = /^([0-9]{1,5})(\.\d{1,2})?$/;
        if (expPrecio.test(datos.precio)) {
            if (parseFloat(datos.precio) < 0) {
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
                Modificar Festival
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
                            onChange={handleChange}
                            error={validacion.ciudad}
                            helperText={
                                validacion.ciudad &&
                                "Ciudad requerida. Minimo 4 caracteres"
                            }
                        />
                        <TextField
                            id="outlined-basic"
                            label="Precio"
                            variant="outlined"
                            name="precio"
                            value={datos.precio}
                            onChange={handleChange}
                            error={validacion.precio}
                            helperText={
                                validacion.precio && "Importe incorrecto. [50€ - 99.999,99€]"
                            }
                        />

                        <TextField
                            id="outlined-basic"
                            label="numEntradas"
                            variant="outlined"
                            name="numEntradas"
                            value={datos.numEntradas}
                            onChange={handleChange}
                            error={validacion.numEntradas}
                            helperText={
                                validacion.numEntradas && "Minimo 50 numEntradas"
                            }
                        />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Fecha de Inicio"
                                value={datos.fechaInicio}
                                onChange={(handleChangeFechaInicio)}
                                renderInput={(params) => <TextField {...params} />}
                                error={validacion.fechaInicio}
                                helperText={
                                    validacion.fechaInicio && "Fecha de inicio no inferiro al dia actual"
                                }
                            />

                            {/* Componente de Fecha de Fin */}
                            <DatePicker
                                label="Fecha de Fin"
                                value={datos.fechaFin}
                                onChange={handleChangeFechaFin}
                                renderInput={(params) => <TextField {...params} />}
                                error={validacion.fechaFin}
                                helperText={
                                    validacion.fechaFin && "Fecha de fin no puede ser inferior a la de inicio"
                                }
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
export default ModificarFestival;