import { Outlet } from "react-router-dom";
import TopNav from "../header/TopNav";

function MainLayout() {

    return (
    <>
        <TopNav />
        <main><Outlet /></main>
        <footer></footer>
    </>
    )
}

export default MainLayout