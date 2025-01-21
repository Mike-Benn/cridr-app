import SubmitFormButton from "../general/buttons/SubmitFormButton"
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addDefaultOptionToSelect } from '../../utils/general/utils'
import { NumberField , SelectField , DateField } from "../general/form-fields/InputFields"
import apiClient from "../../api/apiClient"

function AddCreditCardOfferPanel() {
    const navigate = useNavigate();
    const [newCardOffer , setNewCardOffer] = useState({
        creditCardId: "-1",
        cashbackTypeId: "-1",
        creditCardOptions: [],
        cashbackTypeOptions: [],
        cashbackRate: "",
        cashbackLimit: "",
        offerExpirationDate: "",
    })
    const handleNewCardOfferChange = (e) => {
        const { name , value } = e.target;
        setNewCardOffer((prev) => ({ ...prev , [name]: value }));
    }

    useEffect(() => {
        document.title = "Add Offer | Cridr";
        const getData = async () => {
            try {
                const [creditCardsResponse, cashbackTypesResponse] = await Promise.all([
                    apiClient.get("/credit-cards"),
                    apiClient.get("/cashback-types")
                ]);
    
                if (creditCardsResponse.data) {
                    let optionList = [...creditCardsResponse.data.data];
                    addDefaultOptionToSelect(optionList, "credit_card_name", "credit_card_id", "Select Credit Card");
                    setNewCardOffer((prev) => ({ ...prev, creditCardOptions: optionList }));
                }
    
                if (cashbackTypesResponse.data) {
                    let optionList = [...cashbackTypesResponse.data.data];
                    addDefaultOptionToSelect(optionList, "cashback_type_desc", "cashback_type_id", "Select Cashback Type");
                    setNewCardOffer((prev) => ({ ...prev, cashbackTypeOptions: optionList }));
                }
            } catch (error) {
                console.error("Failed to fetch data", error);
            }
        };
    
        getData();
    }, []);

    const resetCardOfferForm = () => {
        setNewCardOffer({
            creditCardId: "-1",
            cashbackTypeId: "-1",
            creditCardOptions: [],
            cashbackTypeOptions: [],
            cashbackRate: "",
            cashbackLimit: "",
            offerExpirationDate: "",
        })
    }
    const handleCardOfferSubmit = async (e) => {
        e.preventDefault();
        const newOffer = {
            credit_card_id: newCardOffer.creditCardId,
            cashback_type_id: newCardOffer.cashbackTypeId,
            cashback_rate: newCardOffer.cashbackRate,
            cashback_limit: newCardOffer.cashbackLimit,
            offer_expiration_date: newCardOffer.offerExpirationDate,
        };

        try {
            const response = await apiClient.post("/credit-card-offers" , newOffer);
            if (response.status === 201) {
                resetCardOfferForm();
                navigate("/credit-card-offers");
            }

        } catch (error) {
            console.error(error , "Failed to post offer.")
        }
    }
    console.log(newCardOffer.creditCardOptions)
    return (
        <form action='' onSubmit={handleCardOfferSubmit}>
            <fieldset>
                <legend>Offer Info</legend>
                <SelectField fieldId="card-coupons-card-select" labelText="Select Credit Card" optionList={newCardOffer.creditCardOptions} onChange={handleNewCardOfferChange} value={newCardOffer.creditCardId} optionIdAccessor="credit_card_id" optionTextAccessor="credit_card_name" name="creditCardId" />
                <SelectField fieldId="card-coupons-cashback-select" labelText="Select Cashback Type"  optionList={newCardOffer.cashbackTypeOptions} onChange={handleNewCardOfferChange} value={newCardOffer.cashbackTypeId} optionIdAccessor="cashback_type_id" optionTextAccessor="cashback_type_desc" name="cashbackTypeId" />
                <NumberField labelText="Cashback Rate" onChange={handleNewCardOfferChange} value={newCardOffer.cashbackRate} name="cashbackRate" />
                <NumberField labelText="Cashback Limit" onChange={handleNewCardOfferChange} value={newCardOffer.cashbackLimit} name="cashbackLimit" />
                <DateField labelText="Expiration Date" onChange={handleNewCardOfferChange} value={newCardOffer.offerExpirationDate} name="offerExpirationDate" />
                <SubmitFormButton buttonText='Submit Coupon'/>
            </fieldset>
        </form>
    )
}

export default AddCreditCardOfferPanel