import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

function IncentivesPanel() {

    useEffect(() => {
        document.title = "Incentives | Cridr";
    }, []);

    const navigate = useNavigate();

    const handleAddIncentive = () => {
        navigate("new")
    }

    return (
        <button type="button" onClick={handleAddIncentive}>Add New Incentive!</button>
    )
}

export default IncentivesPanel