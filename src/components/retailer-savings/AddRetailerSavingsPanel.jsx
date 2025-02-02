import SubmitFormButton from "../general/buttons/SubmitFormButton";
import { v4 as uuidv4 } from "../../../node_modules/uuid";
import { MEASUREMENT_OPTIONS } from "../../utils/retailer-savings/measurementOptions";
import { calculateRetailItemSavings } from "../../utils/general/utils";
import { useEffect, useState } from "react";
import RetailerSavingsListItem from "./RetailerSavingsListItem";
import { filterOutAndReturnById } from "../../utils/general/utils";
import { addDefaultOptionToSelect } from "../../utils/general/utils";
import { useNavigate } from "react-router-dom";
import { SelectField , DateField , NumberField , TextField } from "../general/form-fields/InputFields"
import apiClient from "../../api/apiClient";

function AddRetailerSavingsPanel() {
    const navigate = useNavigate();
    const [retailSavingsTransaction , setRetailSavingsTransaction] = useState({
        primaryRetailerId: "-1",
        competitorRetailerId: "-1",
        primaryRetailerOptions: [],
        competitorRetailerOptions: [],
        primaryPricePerQuantity: "",
        competitorPricePerQuantity: "",
        measurementTypeId: "-1",
        itemName: "",
        itemQuantity: "",
        itemList: [],
        retailSavingsTransactionDate: "",
        totalMoneySaved: 0,
    })
    const handleSavingsTransactionChange = (e) => {
        const { name , value } = e.target;
        setRetailSavingsTransaction((prev) => ({ ...prev , [name]: value }))
    }
    const fullResetSavingsTransactionForm = () => {
        setRetailSavingsTransaction({
            primaryRetailerId: "-1",
            competitorRetailerId: "-1",
            primaryRetailerOptions: [],
            competitorRetailerOptions: [],
            primaryPricePerQuantity: "",
            competitorPricePerQuantity: "",
            measurementTypeId: "-1",
            itemName: "",
            itemQuantity: "",
            itemList: [],
            retailSavingsTransactionDate: "",
            totalMoneySaved: 0,
        })
    }

    // Used after adding item to transaction
    const partialResetRetailSavingsTransactionForm = () => {
        setRetailSavingsTransaction((prev) => ({
            ...prev,
            primaryPricePerQuantity: "",
            competitorRetailerId: "-1",
            competitorPricePerQuantity: "",
            measurementTypeId: "-1",
            itemName: "",
            itemQuantity: "",

        }))
    }
    useEffect(() => {
        document.title = "Add Retailer Savings | Cridr";
        const getRetailers = async () => {
            try {
                const response = await apiClient.get("/businesses/feature?feature_id=4");
                if (response.data) {
                    let retailerOptionList = [...response.data.data];
                    let competitorOptionList = [...response.data.data];
                    addDefaultOptionToSelect(retailerOptionList, "business_name" , "business_id" , "Select Retailer");
                    addDefaultOptionToSelect(competitorOptionList, "business_name" , "business_id" , "Select Competitor");
                    setRetailSavingsTransaction((prev) => ({ ...prev ,
                        primaryRetailerOptions: retailerOptionList,
                        competitorRetailerOptions: competitorOptionList,
                    }))
                }
            } catch (error) {
                console.error(error, "Failed to fetch retailers.");
            }
        }
        getRetailers();
    }, []);    

    const handleRetailerIdChange = (e) => {
        if (retailSavingsTransaction.itemList.length < 1) {
            setRetailSavingsTransaction((prev) => ({ ...prev , primaryRetailerId: e.target.value }));
        } else {
            const isConfirmed = window.confirm("Current transaction data will be lost if primary retailer is changed without submitting, are you sure you want to change primary retailers?");
            if (isConfirmed) {
                setRetailSavingsTransaction((prev) => ({ ...prev, 
                    primaryRetailerId: e.target.value,
                    primaryPricePerQuantity: "",
                    competitorRetailerId: "-1",
                    competitorPricePerQuantity: "",
                    measurementTypeId: "-1",
                    itemName: "",
                    itemQuantity: "",
                    itemList: [],
                    retailSavingsTransactionDate: "",
                    totalMoneySaved: 0,
                }))
            }
        }
    }

    const handleTransactionDateChange = (e) => {
        if (retailSavingsTransaction.itemList.length < 1) {
            setRetailSavingsTransaction((prev) => ({ ...prev , retailSavingsTransactionDate: e.target.value }));
        } else {
            const isConfirmed = window.confirm("Current transaction data will be lost if date is changed without submitting, are you sure you want to change the date?");
            if (isConfirmed) {
                setRetailSavingsTransaction((prev) => ({ ...prev,
                    primaryRetailerId: "-1",
                    primaryPricePerQuantity: "",
                    competitorRetailerId: "-1",
                    competitorPricePerQuantity: "",
                    measurementTypeId: "-1",
                    itemName: "",
                    itemQuantity: "",
                    itemList: [],
                    retailSavingsTransactionDate: e.target.value,
                    totalMoneySaved: 0,
                }))
            }
        }
    }

    const handleAddItemToList = () => {
        const itemSavings = calculateRetailItemSavings(retailSavingsTransaction.itemQuantity , retailSavingsTransaction.primaryPricePerQuantity , retailSavingsTransaction.competitorPricePerQuantity);
        const cumulativeSavings = retailSavingsTransaction.totalMoneySaved + itemSavings;
        const newItem = {
            id: uuidv4(),
            primaryRetailerId: retailSavingsTransaction.primaryRetailerId,
            primaryPricePerQuantity: retailSavingsTransaction.primaryPricePerQuantity,
            competitorRetailerId: retailSavingsTransaction.competitorRetailerId,
            competitorPricePerQuantity: retailSavingsTransaction.competitorPricePerQuantity,
            itemName: retailSavingsTransaction.itemName,
            itemQuantity: retailSavingsTransaction.itemQuantity,
            measurementTypeId: retailSavingsTransaction.measurementTypeId,
            itemSavings,
        }
        setRetailSavingsTransaction((prev) => ({
            ...prev, 
            totalMoneySaved: cumulativeSavings,
            itemList: [...prev.itemList, newItem],
            
        }));
        partialResetRetailSavingsTransactionForm();
    }

    const handleDeleteItemFromList = (id) => {
        let itemAndUpdatedList = filterOutAndReturnById(id , retailSavingsTransaction.itemList);
        setRetailSavingsTransaction((prev) => ({
            ...prev,
            totalMoneySaved: prev.totalMoneySaved - itemAndUpdatedList.filteredItem.itemSavings,
            itemList: itemAndUpdatedList.newArray,
        }))
    }

    const handleEditItemFromList = (id) => {
        const itemAndUpdatedList = filterOutAndReturnById(id , retailSavingsTransaction.itemList);
        setRetailSavingsTransaction((prev) => ({
            ...prev,
            primaryRetailerId: itemAndUpdatedList.filteredItem.primaryRetailerId,
            primaryPricePerQuantity: itemAndUpdatedList.filteredItem.primaryPricePerQuantity,
            competitorRetailerId: itemAndUpdatedList.filteredItem.competitorRetailerId,
            competitorPricePerQuantity: itemAndUpdatedList.filteredItem.competitorPricePerQuantity,
            measurementTypeId: itemAndUpdatedList.filteredItem.measurementTypeId,
            itemName: itemAndUpdatedList.filteredItem.itemName,
            itemQuantity: itemAndUpdatedList.filteredItem.itemQuantity,
            itemList: itemAndUpdatedList.newArray,
            totalMoneySaved: prev.totalMoneySaved - itemAndUpdatedList.filteredItem.itemSavings,

        }))
    }

    const handleRetailerSavingsSubmit = async (e) => {
        e.preventDefault();
        const newSavingsTransaction = {
            business_id: retailSavingsTransaction.primaryRetailerId,
            retailer_savings_amount: retailSavingsTransaction.totalMoneySaved,
            retailer_savings_transaction_date: retailSavingsTransaction.retailSavingsTransactionDate,
        }
        try {
            const response = await apiClient.post("/retail-savings-transaction" , newSavingsTransaction);
            if (response.status === 201) {
                fullResetSavingsTransactionForm();
                navigate("/retailer-savings")
            }
        } catch (error) {
            console.error(error , "Failed to add new savings transaction");
        }
    }
    const retailListItems = retailSavingsTransaction.itemList.map(item =>
        <RetailerSavingsListItem key={item.id} data={item} deleteItem={handleDeleteItemFromList} editItem={handleEditItemFromList} />
    )

    return (
        <form action="" onSubmit={handleRetailerSavingsSubmit}>
            <fieldset>
                <legend>Add Retailer Savings Transaction</legend>
                <DateField labelText="Transaction Date" onChange={handleTransactionDateChange} value={retailSavingsTransaction.retailSavingsTransactionDate} name="retailSavingsTransactionDate" />
                <SelectField fieldId="retail-save-select-retailer" labelText="Select Retailer" optionList={retailSavingsTransaction.primaryRetailerOptions} onChange={handleRetailerIdChange} value={retailSavingsTransaction.primaryRetailerId} optionIdAccessor="business_id" optionTextAccessor="business_name" name="primaryRetailerId" />
                <TextField labelText="Item Name" onChange={handleSavingsTransactionChange} value={retailSavingsTransaction.itemName} name="itemName" />
                <SelectField fieldId="retail-save-select-measurement" labelText="Select Measurement" optionList={MEASUREMENT_OPTIONS} onChange={handleSavingsTransactionChange} value={retailSavingsTransaction.measurementTypeId} optionIdAccessor="value" optionTextAccessor="text" name="measurementTypeId" />
                <NumberField labelText="Quantity" onChange={handleSavingsTransactionChange} value={retailSavingsTransaction.itemQuantity} name="itemQuantity" />
                <NumberField labelText="Retailer Price Per" onChange={handleSavingsTransactionChange} value={retailSavingsTransaction.primaryPricePerQuantity} name="primaryPricePerQuantity" />
                <SelectField fieldId="retail-save-select-competitor" labelText="Select Competitor" optionList={retailSavingsTransaction.competitorRetailerOptions} onChange={handleSavingsTransactionChange} value={retailSavingsTransaction.competitorRetailerId} optionIdAccessor="business_id" optionTextAccessor="business_name" name="competitorRetailerId" />
                <NumberField labelText="Competitor Price per" onChange={handleSavingsTransactionChange} value={retailSavingsTransaction.competitorPricePerQuantity} name="competitorPricePerQuantity" />
                <button type="button" onClick={handleAddItemToList}>Add Item</button>
            </fieldset>
            <fieldset>
                <legend>Items In Transaction</legend>
                <ul>{retailListItems}</ul>
                
            </fieldset>
            <SubmitFormButton buttonText="Submit Transaction" />
            <p>{retailSavingsTransaction.totalMoneySaved}</p>
        </form>
    )

}

export default AddRetailerSavingsPanel