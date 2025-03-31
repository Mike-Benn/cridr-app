import GeneralButton from "../general/buttons/GeneralButton";
import { Link } from "react-router-dom";
import { useEffect } from "react";

function UserProfileDashboard() {

    useEffect(() => {
        document.title = "My Profile | Cridr"
    })

    return (
        <Link to="manager"><GeneralButton buttonType="button" buttonText="Asset Manager" /></Link>
    )
}

export default UserProfileDashboard