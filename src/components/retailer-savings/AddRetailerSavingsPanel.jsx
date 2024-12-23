import SelectField from "../general/form-fields/SelectField"
import TextField from "../general/form-fields/TextField";
import NumberField from "../general/form-fields/NumberField";
import DateField from "../general/form-fields/DateField";
import SubmitFormButton from "../general/buttons/SubmitFormButton";
import { v4 as uuidv4 } from "../../../node_modules/uuid";
import { MEASUREMENT_OPTIONS } from "../../utils/retailer-savings/measurementOptions";
import { calculateRetailItemSavings } from "../../utils/general/utils";
import { useEffect, useState } from "react";
import RetailerSavingsListItem from "./RetailerSavingsListItem";
import { filterOutAndReturnById } from "../../utils/general/utils";
import axios from "axios"
import { addDefaultOptionToSelect } from "../../utils/general/utils";
import VariableSelectField from "../general/form-fields/VariableSelectField";
import { useNavigate } from "react-router-dom";


function AddRetailerSavingsPanel() {
    const apiUrl = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();
    const [itemName , setItemName] = useState("");
    const [userId , setUserId] = useState("1")
    const [itemQuantity , setItemQuantity] = useState("");
    const [measurementType, setMeasurementType] = useState("default");
    const [retailerId , setRetailerId] = useState("-1")
    const [competitorId , setCompetitorId] = useState("-1")
    const [retailerPricePer, setRetailerPricePer] = useState("");
    const [competitorPricePer , setCompetitorPricePer] = useState("");
    const [itemList , setItemList] = useState([]);
    const [amountSaved , setAmountSaved] = useState(0);
    const [retailerOptions , setRetailerOptions] = useState([]);
    const [competitorOptions , setCompetitorOptions] = useState([]);
    const [transactionDate , setTransactionDate] = useState("");

    useEffect(() => {
        document.title = " Add Retailer Savings | Cridr";
        const fetchRetailers = async () => {
            try {
                const response = await axios.get(`${apiUrl}/utils/get-businesses/Retail%20Savings`);
                if (response.data) {
                    let retailerOptionList = [...response.data.data];
                    let competitorOptionList = [...response.data.data];
                    addDefaultOptionToSelect(retailerOptionList, "business_name" , "business_id" , "Select Retailer");
                    addDefaultOptionToSelect(competitorOptionList, "business_name" , "business_id" , "Select Competitor");
                    setRetailerOptions(retailerOptionList);
                    setCompetitorOptions(competitorOptionList);
                }
            } catch (error) {
                console.error(error, "Failed to fetch retailers.");
            }
        }
        fetchRetailers();

    }, [apiUrl]);    
    

    const handleItemNameChange = (e) => {
        setItemName(e.target.value);
    }

    const handleItemQuantityChange = (e) => {
        setItemQuantity(e.target.value);
    }

    const handleRetailerIdChange = (e) => {
        if (itemList.length < 1) {
            setRetailerId(e.target.value);
        } else {
            const isConfirmed = window.confirm("Current transaction data will be lost if primary retailer is changed without submitting, are you sure you want to change primary retailers?");
            if (isConfirmed) {
                setItemName("");
                setItemQuantity("");
                setMeasurementType("default");
                setRetailerId(e.target.value);
                setRetailerPricePer("");
                setCompetitorId("-1");
                setCompetitorPricePer("");
                setItemList([]);
                setAmountSaved(0)
                setTransactionDate("");
            }

        }
        
    }

    const handleCompetitorIdChange = (e) => {
        setCompetitorId(e.target.value);
    }

    

    const handleRetailerPricePerChange = (e) => {
        setRetailerPricePer(e.target.value);
    }

    const handleTransactionDateChange = (e) => {
        if (itemList.length < 1) {
            setTransactionDate(e.target.value);
        } else {
            const isConfirmed = window.confirm("Current transaction data will be lost if date is changed without submitting, are you sure you want to change the date?");
            if (isConfirmed) {
                setItemName("");
                setItemQuantity("");
                setMeasurementType("default");
                setRetailerId("-1");
                setRetailerPricePer("");
                setCompetitorId("-1");
                setCompetitorPricePer("");
                setItemList([]);
                setAmountSaved(0);
                setTransactionDate(e.target.value);
            }
        }
    }

    const handleCompetitorPricePerChange = (e) => {
        setCompetitorPricePer(e.target.value);
    }

    const handleMeasurementTypeChange = (e) => {
        setMeasurementType(e.target.value);
    }

    const partialResetRetailSavingsForm = () => {
        setItemName("");
        setItemQuantity("");
        setMeasurementType("default");
        setRetailerId("-1");
        setRetailerPricePer("");
        setCompetitorId("-1");
        setCompetitorPricePer("");
    }

    const fullResetRetailSavingsForm = () => {
        setItemName("");
        setItemQuantity("");
        setMeasurementType("default");
        setRetailerId("-1");
        setRetailerPricePer("");
        setCompetitorId("-1");
        setCompetitorPricePer("");
        setItemList([]);
        setAmountSaved(0);
        setTransactionDate("");
    }

    const handleAddItem = () => {
        let savings = calculateRetailItemSavings(itemQuantity , retailerPricePer , competitorPricePer);
        setAmountSaved(prevSaved => prevSaved + savings);
        const newItem = {
            id: uuidv4(),
            itemName,
            itemQuantity,
            measurementType,
            retailerId,
            retailerPricePer,
            competitorId,
            competitorPricePer,
            savings,
        }
        setItemList(prevItemList => [...prevItemList , newItem]);
        partialResetRetailSavingsForm();
    }

    const handleDeleteItem = (id) => {
        let itemAndUpdatedList = filterOutAndReturnById(id , itemList);
        setAmountSaved(prevSaved => prevSaved - itemAndUpdatedList.filteredItem.savings);
        setItemList(itemAndUpdatedList.newArray);

    }

    const handleEditItem = (id) => {
        let itemAndUpdatedList = filterOutAndReturnById(id , itemList);
        setItemList(itemAndUpdatedList.newArray);
        setItemName(itemAndUpdatedList.filteredItem.itemName);
        setItemQuantity(itemAndUpdatedList.filteredItem.itemQuantity);
        setMeasurementType(itemAndUpdatedList.filteredItem.measurementType);
        setRetailerId(itemAndUpdatedList.filteredItem.retailerId);
        setRetailerPricePer(itemAndUpdatedList.filteredItem.retailerPricePer);
        setCompetitorId(itemAndUpdatedList.filteredItem.competitorId);
        setCompetitorPricePer(itemAndUpdatedList.filteredItem.competitorPricePer);
        setAmountSaved(prevSaved => prevSaved - itemAndUpdatedList.filteredItem.savings)
        
    }

    const handleRetailerSavingsFormSubmit = async (e) => {
        e.preventDefault();

        const newSavingsTransaction = {
            user_id: userId,
            business_id: retailerId,
            retailer_savings_amount: amountSaved,
            retailer_savings_transaction_date: transactionDate,
        }
        
        try {
            const response = await axios.post(`${apiUrl}/retailer-savings/submit-retailer-savings` , newSavingsTransaction);
            if (response.status === 200) {
                fullResetRetailSavingsForm();
                navigate("/retailer-savings")
            }

        } catch (error) {
            console.error(error , "Failed to add new savings transaction");
        }
    }

    const retailListItems = itemList.map(item =>
        <RetailerSavingsListItem key={item.id} data={item} deleteItem={handleDeleteItem} editItem={handleEditItem} />
    )

    return (
        <form action="" onSubmit={handleRetailerSavingsFormSubmit}>
            <fieldset>
                <legend>Add Retailer Savings Transaction</legend>
                <DateField fieldName="Transaction Date" onChange={handleTransactionDateChange} value={transactionDate}/>
                <TextField fieldName="Item Name" onChange={handleItemNameChange} value={itemName}/>
                <SelectField options={MEASUREMENT_OPTIONS} onChange={handleMeasurementTypeChange} value={measurementType}/>
                <NumberField fieldName="Quantity" onChange={handleItemQuantityChange} value={itemQuantity} />
                <VariableSelectField fieldId="retail-save-select-retailer" labelText="Select Retailer" optionList={retailerOptions} onChange={handleRetailerIdChange} value={retailerId} optionIdAccessor="business_id" optionTextAccessor="business_name" />
                <NumberField fieldName="Retailer Price Per" onChange={handleRetailerPricePerChange} value={retailerPricePer} />
                <VariableSelectField fieldId="retail-save-select-competitor" labelText="Select Competitor" optionList={competitorOptions} onChange={handleCompetitorIdChange} value={competitorId} optionIdAccessor="business_id" optionTextAccessor="business_name" />
                <NumberField fieldName="Competitor Price Per" onChange={handleCompetitorPricePerChange} value={competitorPricePer} />
                <button type="button" onClick={handleAddItem}>Add Item</button>
            </fieldset>
            <fieldset>
                <legend>Items In Transaction</legend>
                <ul>{retailListItems}</ul>
                
            </fieldset>
            <SubmitFormButton buttonText="Submit Transaction" />
            <p>{amountSaved}</p>
        </form>
    )

}

export default AddRetailerSavingsPanel