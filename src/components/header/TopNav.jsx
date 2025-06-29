import ProfileMenu from "./ProfileMenu"
import Typography from "@mui/material/Typography"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import { Link } from "react-router-dom"
function TopNav() {
    return (
        <>
            <AppBar position="fixed">
                <Toolbar sx={{
                    justifyContent: "space-between",
                }}>
                    <Typography variant="h4" component="h1">
                        <Link to="/">Cridr App</Link>
                    </Typography>
                    <ProfileMenu />
                </Toolbar>
            </AppBar>
            <Toolbar/>
        </>
    )
}

export default TopNav