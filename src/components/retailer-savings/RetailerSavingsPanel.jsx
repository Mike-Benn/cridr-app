
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"

function RetailerSavingsPanel() {
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