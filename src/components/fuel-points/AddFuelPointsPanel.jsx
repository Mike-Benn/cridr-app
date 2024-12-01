import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


function AddFuelPointsPanel() {
    const apiUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        document.title = "Add Fuel Points | Cridr";
    }, []);

    const navigate = useNavigate();



    return (
        <section>
            
        </section>
    )


}

export default AddFuelPointsPanel