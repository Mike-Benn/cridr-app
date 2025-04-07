import SubmitFormButton from "../../../general/buttons/SubmitFormButton";
import { TextField, CheckboxField } from "../../../general/form-fields/InputFields";
import { useState } from "react";
import apiClient from "../../../../api/apiClient";

function NewBusinessForm() {
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
            Coupons: false,
            Fuel: false,
            Retail: false,
            Incentives: false,
            Card: false,
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

    const handleNewBusinessSubmit = async () => {
        const params = new URLSearchParams();
        for (const [key, value] of Object.entries(newBusiness.businessTypes)) {
            if (value) {
                params.append("business_type_name", key);
            }
        }
        for (const [key, value] of Object.entries(newBusiness.businessFeatures)) {
            if (value) {
                params.append("feature_name", key);
            }
        }
        const business = {
            business_name: newBusiness.businessName,
        }
        try {
            const response = apiClient.post("/businesses", business, { params: params });
            console.log(response.data?.messsage);
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
                    <CheckboxField labelText="Coupons" checked={newBusiness.businessFeatures.Coupons} onChange={handleBusinessFeaturesChange} name="Coupons" />
                    <CheckboxField labelText="Fuel Points" checked={newBusiness.businessFeatures.Fuel} onChange={handleBusinessFeaturesChange} name="Fuel" />
                    <CheckboxField labelText="Retail Savings" checked={newBusiness.businessFeatures.Retail} onChange={handleBusinessFeaturesChange} name="Retail" />
                    <CheckboxField labelText="Incentives" checked={newBusiness.businessFeatures.Incentives} onChange={handleBusinessFeaturesChange} name="Incentives" />
                    <CheckboxField labelText="Credit Card Offers" checked={newBusiness.businessFeatures.Card} onChange={handleBusinessFeaturesChange} name="Card" />
                </fieldset>
                <SubmitFormButton buttonText="Add Business" />
            </fieldset>
        </form>
    )
}

export default NewBusinessForm