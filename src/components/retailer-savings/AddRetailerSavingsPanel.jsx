import SelectField from "../general/form-fields/SelectField"
import TextField from "../general/form-fields/TextField";
import NumberField from "../general/form-fields/NumberField";
import SubmitFormButton from "../general/buttons/SubmitFormButton";
import { v4 as uuidv4 } from "../../../node_modules/uuid";
import { RETAILER_OPTIONS } from "../../utils/retailer-savings/storeOptions"
import { MEASUREMENT_OPTIONS } from "../../utils/retailer-savings/measurementOptions";
import { calculateRetailItemSavings } from "../../utils/general/utils";
import { useEffect, useState } from "react";

function AddRetailerSavingsPanel() {

    const [itemName , setItemName] = useState("");
    const [quantity , setQuantity] = useState("");
    const [measurementType, setMeasurementType] = useState("default");
    const [retailerName , setRetailerName] = useState("default");
    const [retailerPricePer, setRetailerPricePer] = useState("");
    const [competitorName , setCompetitorName] = useState("default");
    const [competitorPricePer , setCompetitorPricePer] = useState("");
    const [itemList , setItemList] = useState([]);
    const [amountSaved , setAmountSaved] = useState(0);

    useEffect(() => {
        document.title = " Add Retailer Savings | Cridr";

    }, []);
    
    const handleItemNameChange = (e) => {
        setItemName(e.target.value);
    }

    const handleQuantityChange = (e) => {
        setQuantity(e.target.value);
    }

    const handleRetailerNameChange = (e) => {
        setRetailerName(e.target.value);
    }

    const handleRetailerPricePerChange = (e) => {
        setRetailerPricePer(e.target.value);
    }

    const handleCompetitorNameChange = (e) => {
        setCompetitorName(e.target.value);
    }

    const handleCompetitorPricePerChange = (e) => {
        setCompetitorPricePer(e.target.value);
    }

    const handleMeasurementTypeChange = (e) => {
        setMeasurementType(e.target.value);
    }

    const clearRetailSavingsForm = () => {
        setItemName("");
        setQuantity("");
        setMeasurementType("default");
        setRetailerName("default");
        setRetailerPricePer("");
        setCompetitorName("default");
        setCompetitorPricePer("");
    }

    const handleAddItem = () => {
        setAmountSaved(prevSaved => prevSaved + calculateRetailItemSavings(quantity , retailerPricePer , competitorPricePer))
        const newItem = {
            itemName,
            quantity,
            measurementType,
            retailerName,
            retailerPricePer,
            competitorName,
            competitorPricePer
        }
        setItemList(prevItemList => [...prevItemList , newItem]);
        clearRetailSavingsForm();
    }

    return (
        <form action="">
            <fieldset>
                <legend>Add Retailer Savings Transaction</legend>
                <TextField fieldName="Item Name" onChange={handleItemNameChange} value={itemName}/>
                <SelectField options={MEASUREMENT_OPTIONS} onChange={handleMeasurementTypeChange} value={measurementType}/>
                <NumberField fieldName="Quantity" onChange={handleQuantityChange} value={quantity} />
                <SelectField options={RETAILER_OPTIONS} onChange={handleRetailerNameChange} value={retailerName} />
                <NumberField fieldName="Retailer Price Per" onChange={handleRetailerPricePerChange} value={retailerPricePer} />
                <SelectField options={RETAILER_OPTIONS} onChange={handleCompetitorNameChange} value={competitorName} />
                <NumberField fieldName="Competitor Price Per" onChange={handleCompetitorPricePerChange} value={competitorPricePer} />
                <button type="button" onClick={handleAddItem}>Add Item</button>
            </fieldset>
            <SubmitFormButton buttonText="Submit Transaction" />
        </form>
    )

}

export default AddRetailerSavingsPanel