import SelectField from "../general/form-fields/SelectField"
import TextField from "../general/form-fields/TextField";
import NumberField from "../general/form-fields/NumberField";
import SubmitFormButton from "../general/buttons/SubmitFormButton";
import { v4 as uuidv4 } from "../../../node_modules/uuid";
import { RETAILER_OPTIONS } from "../../utils/retailer-savings/storeOptions"
import { MEASUREMENT_OPTIONS } from "../../utils/retailer-savings/measurementOptions";
import { calculateRetailItemSavings } from "../../utils/general/utils";
import { useEffect, useState } from "react";
import RetailerSavingsListItem from "./RetailerSavingsListItem";
import { filterOutAndReturnById } from "../../utils/general/utils";


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
            id: uuidv4(),
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

    const handleDeleteItem = (id) => {
        let updatedItemList = itemList.filter((item) => item.id !== id);
        setItemList(updatedItemList)

    }

    const handleEditItem = (id) => {
        let itemAndUpdatedList = filterOutAndReturnById(id , itemList);
        setItemList(itemAndUpdatedList.newArray);

        setItemName(itemAndUpdatedList.filteredItem.itemName);
        setQuantity(itemAndUpdatedList.filteredItem.quantity);
        setMeasurementType(itemAndUpdatedList.filteredItem.measurementType);
        setRetailerName(itemAndUpdatedList.filteredItem.retailerName);
        setRetailerPricePer(itemAndUpdatedList.filteredItem.retailerPricePer);
        setCompetitorName(itemAndUpdatedList.filteredItem.competitorName);
        setCompetitorPricePer(itemAndUpdatedList.filteredItem.competitorPricePer);
        
    }

    const retailListItems = itemList.map(item =>
        <RetailerSavingsListItem key={item.id} data={item} deleteItem={handleDeleteItem} editItem={handleEditItem} />
    )

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
            <fieldset>
                <legend>Items In Transaction</legend>
                <ul>{retailListItems}</ul>
                
            </fieldset>
            <SubmitFormButton buttonText="Submit Transaction" />
        </form>
    )

}

export default AddRetailerSavingsPanel