import { GeneralInputField, SelectField } from "../general/form-fields/InputFields"
import GeneralButton from "../general/buttons/GeneralButton";

function NewOfferForm({ newOfferFormData, uiState, handlers }) {
    const defaultCreditCardOption = [<option key="" value="" selected disabled>Select credit card</option>];
    const defaultBusinessOption = [<option key="" value="" selected disabled>Select business</option>];

    return (
        <form action="" onSubmit={handlers.handleFormSubmit}>
            <fieldset>
                <legend>Track new offer</legend>
                <SelectField fieldId="new-offer-select-credit-card" labelText="Select credit card" optionList={uiState.creditCardList} onChange={handlers.handleFormDataChange} value={newOfferFormData.selectedCreditCardId} optionIdAccessor="credit_card_id" optionTextAccessor="credit_card_name" name="selectedCreditCardId" defaultOptions={defaultCreditCardOption}/>
                <SelectField fieldId="new-offer-select-business" labelText="Select business" optionList={uiState.businessList} onChange={handlers.handleFormDataChange} value={newOfferFormData.selectedBusinessId} optionIdAccessor="business_id" optionTextAccessor="business_name" name="selectedBusinessId" defaultOptions={defaultBusinessOption} />
                <GeneralInputField inputType="text" fieldId="new-offer-description" labelText="Offer description" onChange={handlers.handleFormDataChange} value={newOfferFormData.offerDescription} name="offerDescription" />
                <GeneralInputField inputType="date" fieldId="new-offer-expiration-date" labelText="Expiration date" onChange={handlers.handleFormDataChange} value={newOfferFormData.expirationDate} name="expirationDate" />
            </fieldset>
            <GeneralButton buttonType="submit" buttonText="Submit" value="submit" />
            <GeneralButton buttonType="submit" buttonText="Submit and next" value="submitAnother" />
        </form>
    )
}

export default NewOfferForm

// credit card, business, description, expiration date