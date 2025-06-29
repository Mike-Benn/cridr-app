import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import AccountIcon from "@mui/icons-material/AccountCircle"
import { IconButton } from "@mui/material";
import { useState, useContext } from "react";
import AuthContext from "../../auth/AuthContext";
import { Link } from "react-router-dom";

function ProfileMenu() {


    const { logout } = useContext(AuthContext);
    const [anchorEl, setAnchorEl] = useState(null);

    const toggleMenu = (event) => {
        anchorEl ? setAnchorEl(null) : setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    const handleUserLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error(error , "There was an issue communicating with the server.");
        }
    }

    const isOpen = Boolean(anchorEl);
    return (
        <>
            <IconButton color="inherit" onClick={toggleMenu}>
                <AccountIcon color="inherit" fontSize="large" />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={isOpen}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left"
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "left"
                }}
            >
                <MenuItem component={Link} to="/profile">Your profile</MenuItem>
                <MenuItem onClick={handleUserLogout}>Sign out</MenuItem>
            </Menu>
        </>
    )
}

export default ProfileMenu

