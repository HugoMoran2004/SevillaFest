import { Outlet, useLocation } from "react-router";
import Menu from "../componentes/menu" 
import NavBar from "../componentes/NavBar";

function Home(){
    const location = useLocation();
    return (
        <>
            <NavBar />
            {location.pathname === "/" && <Menu />}
            <Outlet />
        </>
    );
}
export default Home;