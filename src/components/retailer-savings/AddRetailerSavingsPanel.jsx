import SelectField from "../general/form-fields/SelectField"
import { RETAILER_OPTIONS } from "../../utils/retailer-savings/storeOptions"
import { useState } from "react";

function AddRetailerSavingsPanel() {

    const [retailerName , setRetailerName] = useState("");
    const [competitorName , setCompetitorName] = useState("");

    const handleRetailerNameChange = (e) => {
        setRetailerName(e.target.value);
    }

    const handleCompetitorNameChange = (e) => {
        setCompetitorName(e.target.value);
    }

    return (
        <form action="">
            <fieldset>
                <legend>Add Retailer Savings Transaction</legend>
                <SelectField options={RETAILER_OPTIONS} onChange={handleRetailerNameChange} value={retailerName} />
                <SelectField options={RETAILER_OPTIONS} onChange={handleCompetitorNameChange} value={competitorName} />
            </fieldset>
        </form>
    )

}

export default AddRetailerSavingsPanel