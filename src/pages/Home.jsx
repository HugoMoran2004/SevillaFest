import { Outlet, useLocation } from "react-router";
import Menu from "../componentes/menu" 
import NavBar from "../componentes/NavBar";
import Footer from "../componentes/Footer";

function Home(){
    const location = useLocation();
    return (
        <>
            <NavBar />
            {location.pathname === "/" && <Menu />}
            <Outlet />
            <Footer />
        </>
    );
}
export default Home;