import { Outlet } from "react-router";
import Menu from "../componentes/menu" 

function Home(){
    return (
        <>
            <Menu/>
            <Outlet />
        </>
    );
}
export default Home;