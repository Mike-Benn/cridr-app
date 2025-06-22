import ProfileMenu from "./ProfileMenu"
import Typography from "@mui/material/Typography"
import styles from "./TopNav.module.css"
function TopNav() {
    
    return (
        <header className={styles.header}>
            <Typography variant="h4" component="h1">Cridr App</Typography>
            <ProfileMenu />
        </header>
    )
}

export default TopNav