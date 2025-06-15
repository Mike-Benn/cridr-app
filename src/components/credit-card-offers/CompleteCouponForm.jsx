import GeneralButton from "../general/buttons/GeneralButton"
import { GeneralInputField } from "../general/form-fields/InputFields"

function CompleteCouponForm({ couponFormData, handlers, offer }) {

    

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const updatedOffer = {
            ...offer,
            amount_saved: couponFormData.amountSaved
        };
        handlers.handleRedeemOffer(updatedOffer)
    }

    return (
        <form onSubmit={handleFormSubmit}>
            <GeneralInputField inputType="number" fieldId="offer-amount-saved" labelText="Amount Saved" onChange={handlers.handleCouponFormDataChange} value={couponFormData.amountSaved} name="amountSaved" />
            <GeneralButton buttonType="submit" buttonText="Submit" />
            <GeneralButton buttonType="button" buttonText="Cancel" onClick={handlers.toggleIsCompleting}/>
        </form>
    )
}

export default CompleteCouponForm