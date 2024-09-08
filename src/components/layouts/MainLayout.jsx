import { Outlet } from "react-router-dom";
import TopNav from "../header/TopNav";
import BottomNav from "../footer/BottomNav";

function MainLayout() {

    return (
    <>
        <TopNav />
        <main><Outlet /></main>
        <BottomNav />
    </>
    )
}

export default MainLayout