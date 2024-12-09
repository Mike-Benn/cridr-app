
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"

function RetailerSavingsPanel() {
    const apiUrl = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Retailer Savings | Cridr";
    }, []);

    const handleAddSavingsTransaction = () => {
        navigate("new");
    }

    return (
        <button type='button' onClick={handleAddSavingsTransaction}>Add Savings Transaction!</button>
    )
}

export default RetailerSavingsPanel