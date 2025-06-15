import GeneralButton from "../general/buttons/GeneralButton";
import { useState } from "react";
import CompleteCouponForm from "./CompleteCouponForm"
import DeleteListItemButton from "../general/buttons/DeleteListItemButton"

function OfferActions({ offer, handlers }) {

    const [uiState, setUiState] = useState({
        isCompleting: false,
    })

    const [couponFormData, setCouponFormData] = useState({
        amountSaved: "",
        redemptionDate: "",
    })

    const couponFormDataTemplate = {
        amountSaved: "",
        redemptionDate: "",
    }

    const handleCouponFormDataChange = (e) => {
        const { name, value } = e.target;
        setCouponFormData((prev) => ({
            ...prev,
            [name]: value,
        })) 
    }  


    const toggleIsCompleting = () => {
        setCouponFormData(couponFormDataTemplate)
        setUiState((prev) => ({ ...prev, isCompleting: !prev.isCompleting }));
    }

    const couponFormHandlers = {
        handleCouponFormDataChange,
        handleRedeemOffer: handlers.handleRedeemOffer,
        toggleIsCompleting,
    }

    return (
        <>
            <DeleteListItemButton id={offer.offers_id} onClick={handlers.handleDeleteOffer}  />
            {!uiState.isCompleting && <GeneralButton buttonType="button" buttonText="Complete" onClick={toggleIsCompleting} />}
            {uiState.isCompleting && <CompleteCouponForm couponFormData={couponFormData} handlers={couponFormHandlers} offer={offer} />}
        </>
    )
}

export default OfferActions