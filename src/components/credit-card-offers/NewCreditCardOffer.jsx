import SubmitFormButton from "../general/buttons/SubmitFormButton"
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { NumberField, DateField, SelectField, TextField } from "../general/form-fields/InputFields"
import apiClient from "../../api/apiClient"
import { cashbackTypeOptions } from "../../utils/offers/staticData"

function NewCreditCardOffer() {
    const navigate = useNavigate();
    const defaultCreditCardOption = [<option key="default" value="default">Select Credit Card</option>]
    const [newCardOffer, setNewCardOffer] = useState({
        creditCardId: "default",
        cashbackTypeId: "default",
        creditCardOptions: [],
        cashbackTypeOptions: [],
        participatingBusiness: "",
        cashbackRate: "",
        cashbackLimit: "",
        offerExpirationDate: "",
    })

    useEffect(() => {
        document.title = "Add Offer | Cridr";
        const getCreditCreditCardsById = async () => {
            try {
                const response = await apiClient.get("/credit-cards");
                if (response.status === 200 && Array.isArray(response.data.data)) {
                    setNewCardOffer((prev) => ({ ...prev, creditCardOptions: response.data.data }));
                }
            } catch (error) {
                console.error("Failed to fetch data", error);
            }
        };
        getCreditCreditCardsById();
    }, []);
    
    const handleNewCardOfferChange = (e) => {
        const { name , value } = e.target;
        setNewCardOffer((prev) => ({ ...prev , [name]: value }));
    }

    const handleCardOfferSubmit = async (e) => {
        e.preventDefault();
        const newOffer = {
            credit_card_id: newCardOffer.creditCardId,
            available_offer_participating_business: newCardOffer.participatingBusiness,
            cashback_type: newCardOffer.cashbackTypeId,
            cashback_rate: newCardOffer.cashbackRate,
            cashback_limit: newCardOffer.cashbackLimit,
            available_offer_expiration_date: newCardOffer.offerExpirationDate,
        };

        try {
            const response = await apiClient.post("/credit-card-offers/available" , newOffer);
            if (response.status === 201) {
                navigate("/credit-card-offers");
            }

        } catch (error) {
            console.error(error , "Failed to post offer.")
        }
    }

    return (
        <form action='' onSubmit={handleCardOfferSubmit}>
            <fieldset>
                <legend>Offer Info</legend>
                <SelectField fieldId="card-coupons-card-select" labelText="Select Credit Card" optionList={newCardOffer.creditCardOptions} onChange={handleNewCardOfferChange} value={newCardOffer.creditCardId} optionIdAccessor="credit_card_id" optionTextAccessor="credit_card_name" name="creditCardId" defaultOptions={defaultCreditCardOption}/>
                <SelectField fieldId="card-coupons-cashback-select" labelText="Select Cashback Type" optionList={cashbackTypeOptions} onChange={handleNewCardOfferChange} value={newCardOffer.cashbackTypeId} optionIdAccessor="cashback_type_id" optionTextAccessor="cashback_type_text" name="cashbackTypeId" />
                <TextField labelText="Participating Business" onChange={handleNewCardOfferChange} value={newCardOffer.participatingBusiness} name="participatingBusiness" />
                <NumberField labelText="Cashback Rate" onChange={handleNewCardOfferChange} value={newCardOffer.cashbackRate} name="cashbackRate" />
                <NumberField labelText="Cashback Limit" onChange={handleNewCardOfferChange} value={newCardOffer.cashbackLimit} name="cashbackLimit" />
                <DateField labelText="Expiration Date" onChange={handleNewCardOfferChange} value={newCardOffer.offerExpirationDate} name="offerExpirationDate" />
                <SubmitFormButton buttonText='Submit Offer'/>
            </fieldset>
        </form>
    )
}

export default NewCreditCardOffer