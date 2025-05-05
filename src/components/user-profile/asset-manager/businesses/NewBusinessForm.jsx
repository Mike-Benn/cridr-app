import GeneralButton from "../../../general/buttons/GeneralButton";
import { TextField, CheckboxField } from "../../../general/form-fields/InputFields";
import { useState } from "react";
import apiClient from "../../../../api/apiClient";
import PropTypes from "prop-types";

function NewBusinessForm({ setBusinesses, setParentUiState }) {
    const [newBusiness , setNewBusiness] = useState({
        businessName: "",
        businessTypes: {
            restaurant: false,
            hotel: false,
            retail: false,
            grocery: false,
            service: false,
            airline: false,
            misc: false,
            bank: false,
        },
        businessFeatures: {
            "Coupons": false,
            "Incentives": false,
            "Expenses": false,
        },
    })
    

    const handleNewBusinessChange = (e) => {
        const { name, value } = e.target; 
        setNewBusiness((prev) => ({...prev, [name]: value }));
    }

    const handleBusinessTypesChange = (e) => {
        const { name } = e.target;
        setNewBusiness((prev) => ({ ...prev, businessTypes: { ...prev.businessTypes, [name]: !prev.businessTypes[name] }})) 
    }

    const handleBusinessFeaturesChange = (e) => {
        const { name } = e.target;
        setNewBusiness((prev) => ({ ...prev, businessFeatures: { ...prev.businessFeatures, [name]: !prev.businessFeatures[name] }})) 
    }

    const resetForm = () => {
        setNewBusiness((prev) => ({ 
            ...prev,
            businessName: "",
            businessTypes: {
                restaurant: false,
                hotel: false,
                retail: false,
                grocery: false,
                service: false,
                airline: false,
                misc: false,
                bank: false,
            },
            businessFeatures: {
                "Coupons": false,
                "Incentives": false,
                "Expenses": false,
            },
        }))
    }


    
    const handleNewBusinessSubmit = async (e) => {
        e.preventDefault();
        const submitAction = e.nativeEvent.submitter.value;
        const params = new URLSearchParams();
        for (const [key, value] of Object.entries(newBusiness.businessTypes)) {
            if (value) {
                params.append("businessTypeNames", key);
            }
        }
        for (const [key, value] of Object.entries(newBusiness.businessFeatures)) {
            if (value) {
                params.append("featureNames", key);
            }
        }
        const business = {
            business_name: newBusiness.businessName,
        }
        try {
            if (submitAction === "submit") {
                const response = await apiClient.post("/businesses", business, { params: params });
                if (Array.isArray(response.data?.data)) {
                    setBusinesses((prev) => [...prev, response.data.data[0]])
                }
                setParentUiState((prev) => ({ ...prev, isAddingBusiness: false }))
            } else if (submitAction === "submitAnother") {
                const response = await apiClient.post("/businesses", business, { params: params });
                if (Array.isArray(response.data?.data)) {
                    setBusinesses((prev) => [...prev, response.data.data[0]])
                }
                resetForm();
            }
        } catch (error) {
            console.log(error.response?.data?.message);
        }
    }

    return (
        <form action="" onSubmit={handleNewBusinessSubmit}>
            <fieldset>
                <fieldset>
                    <legend>Add New Business</legend>
                    <TextField labelText="Business Name" onChange={handleNewBusinessChange} value={newBusiness.businessName} name="businessName" />
                </fieldset>
                <fieldset>
                    <legend>Select Business Type(s)</legend>
                    <CheckboxField labelText="Restaurant" checked={newBusiness.businessTypes.restaurant} onChange={handleBusinessTypesChange} name="restaurant" />
                    <CheckboxField labelText="Hotel" checked={newBusiness.businessTypes.hotel} onChange={handleBusinessTypesChange} name="hotel" />
                    <CheckboxField labelText="Retail" checked={newBusiness.businessTypes.retail} onChange={handleBusinessTypesChange} name="retail" />
                    <CheckboxField labelText="Grocery" checked={newBusiness.businessTypes.grocery} onChange={handleBusinessTypesChange} name="grocery" />
                    <CheckboxField labelText="Service" checked={newBusiness.businessTypes.service} onChange={handleBusinessTypesChange} name="service" />
                    <CheckboxField labelText="Airline" checked={newBusiness.businessTypes.airline} onChange={handleBusinessTypesChange} name="airline" />
                    <CheckboxField labelText="Misc" checked={newBusiness.businessTypes.misc} onChange={handleBusinessTypesChange} name="misc" />
                    <CheckboxField labelText="Bank" checked={newBusiness.businessTypes.bank} onChange={handleBusinessTypesChange} name="bank" />
                </fieldset>
                <fieldset>
                    <legend>Select Business Feature(s)</legend>
                    <CheckboxField labelText="Coupons" checked={newBusiness.businessFeatures["Coupons"]} onChange={handleBusinessFeaturesChange} name="Coupons" />
                    <CheckboxField labelText="Fuel Points" checked={newBusiness.businessFeatures["Fuel Points"]} onChange={handleBusinessFeaturesChange} name="Fuel Points" />
                    <CheckboxField labelText="Retail Savings" checked={newBusiness.businessFeatures["Retail Savings"]} onChange={handleBusinessFeaturesChange} name="Retail Savings" />
                    <CheckboxField labelText="Incentives" checked={newBusiness.businessFeatures["Incentives"]} onChange={handleBusinessFeaturesChange} name="Incentives" />
                    <CheckboxField labelText="Credit Card Offers" checked={newBusiness.businessFeatures["Credit Card"]} onChange={handleBusinessFeaturesChange} name="Credit Card" />
                    <CheckboxField labelText="Expenses" checked={newBusiness.businessFeatures["Expenses"]} onChange={handleBusinessFeaturesChange} name="Expenses" />
                    <CheckboxField labelText="Card Points" checked={newBusiness.businessFeatures["Card Points"]} onChange={handleBusinessFeaturesChange} name="Card Points" />
                </fieldset>
                <GeneralButton buttonType="submit" buttonText="Add Business" value="submit" />
                <GeneralButton buttonType="submit" buttonText="Add Another" value="submitAnother" />
            </fieldset>
        </form>
    )
}

NewBusinessForm.propTypes = {
    setBusinesses: PropTypes.func,
    setParentUiState: PropTypes.func,
}

export default NewBusinessForm