//import { useState, useEffect } from 'react';
//import { styled } from '@mui/material/styles';
//import Box from '@mui/material/Box';
import festival from '../assets/images/festivalGente.jpg';
import nengo from '../assets/images/nengo.avif';
import sevilla from '../assets/images/Iconica_Sevilla.jpg';

// Initialization for ES Users
/*import { Carousel, initMDB } from "mdb-ui-kit";

initMDB({ Carousel });*/
//const ContenedorPrincipal = styled(Box)({ display: 'flex' });

/*
const CarruselWrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: '20px',
  marginBottom: '20px',
  width: '100%',
  maxWidth: '1200px',
  overflow: 'hidden',
});

*/



export default function DrawerMini() {


  // Alterna el estado del Drawer


  // Cierra el Drawer cuando cambia la ruta


  return (
    
 <div 
 style={{
  backgroundColor: '#f0f0f0',
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   minHeight: '100vh', // Centrado vertical
   width: '100%',
 }}
>
 <div 
   id="carouselMaterialStyle" 
   className="carousel slide carousel-fade" 
   data-mdb-ride="carousel" 
   style={{ width: '80%', maxWidth: '900px' }}
 >
   {/* Indicadores */}
   <div className="carousel-indicators">
     <button
       type="button"
       data-mdb-target="#carouselMaterialStyle"
       data-mdb-slide-to="0"
       className="active"
       aria-current="true"
       aria-label="Slide 1"
     ></button>
     <button
       type="button"
       data-mdb-target="#carouselMaterialStyle"
       data-mdb-slide-to="1"
       aria-label="Slide 2"
     ></button>
     <button
       type="button"
       data-mdb-target="#carouselMaterialStyle"
       data-mdb-slide-to="2"
       aria-label="Slide 3"
     ></button>
   </div>

   {/* Inner */}
   <div className="carousel-inner rounded-5 shadow-4-strong">
     <div className="carousel-item active">
       <img src={festival} className="d-block w-100" style={{ height: '500px', objectFit: 'cover' }} alt="Sunset Over the City" />
       <div className="carousel-caption d-none d-md-block">
         <h3>¿Quieres una experiencia inolvidable?</h3>
         <h5>Sumergete en Sevilla Fest para vivir algo único.</h5>
       </div>
     </div>

     <div className="carousel-item">
       <img src={nengo} className="d-block w-100" style={{ height: '500px', objectFit: 'cover' }} alt="Canyon at Night" />
       <div className="carousel-caption d-none d-md-block">
       <h3>¿Deseas escuchar a tu artista favorito?</h3>
       <h5>En Sevilla Fest podras cumplir tu sueño</h5>
       </div>
     </div>

     <div className="carousel-item">
       <img src={sevilla} className="d-block w-100" style={{ height: '500px', objectFit: 'cover' }}  alt="Cliff Above a Stormy Sea" />
       <div className="carousel-caption d-none d-md-block">
          <h3>¿Quieres conocer la ciudad de Sevilla?</h3>
          <h5>Sevilla Fest te ofrece la oportunidad de conocer la ciudad</h5>
       </div>
     </div>
   </div>

   {/* Controls */}
   <button
     className="carousel-control-prev"
     type="button"
     data-mdb-target="#carouselMaterialStyle"
     data-mdb-slide="prev"
   >
     <span className="carousel-control-prev-icon" aria-hidden="true"></span>
     <span className="visually-hidden">Previous</span>
   </button>
   <button
     className="carousel-control-next"
     type="button"
     data-mdb-target="#carouselMaterialStyle"
     data-mdb-slide="next"
   >
     <span className="carousel-control-next-icon" aria-hidden="true"></span>
     <span className="visually-hidden">Next</span>
   </button>
 </div>
</div> 
  );
}
