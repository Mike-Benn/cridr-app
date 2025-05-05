import { GeneralInputField, SelectField, CheckboxField } from "../../general/form-fields/InputFields";
import PropTypes from "prop-types";
import GeneralButton from "../../general/buttons/GeneralButton";

function FuelExpenseForm({ expenseFormData, uiState, handlers }) {
    const defaultBusinessOption = [<option key="" value="" selected disabled >Select Business</option>];
    const defaultCreditCardOption = [<option key="" value="" selected disabled>Select credit card</option>]
    return (
        <form action="" onSubmit={handlers.handleExpenseSubmit}>
            <fieldset>
                <legend>Add Expense</legend>
                <GeneralInputField inputType="date" fieldId="general-expense-transaction-date" labelText="Date of expense" onChange={handlers.handleCommonFieldChange} value={expenseFormData.commonFields.transactionDate} name="transactionDate" />
                <CheckboxField labelText="Earned Credit Card Points" checked={expenseFormData.commonFields.earnedCardPoints} onChange={handlers.toggleEarnedCardPoints} /> 
                <CheckboxField labelText="Redeemed Fuel Points" checked={expenseFormData.commonFields.redeemingFuelPoints} onChange={handlers.toggleRedeemingFuelPoints} /> 
                <SelectField fieldId="expense-select-business" labelText="Select Business" optionList={uiState.businessList} onChange={handlers.handleCommonFieldChange} value={expenseFormData.commonFields.selectedBusinessId} optionIdAccessor="business_id" optionTextAccessor="business_name" name="selectedBusinessId" defaultOptions={defaultBusinessOption}/>
                {uiState.redeemingFuelPoints && <GeneralInputField inputType="number" fieldId="general-expense-gallons" labelText="Gallons dispensed" onChange={handlers.handleFuelFieldChange} value={expenseFormData.fuelFields.gallonsFilled} name="gallonsFilled"/>}
                {uiState.redeemingFuelPoints && <GeneralInputField inputType="number" fieldId="general-expense-fuelpoints" labelText="Fuel points redeemed" onChange={handlers.handleFuelFieldChange} value={expenseFormData.fuelFields.fuelPointsRedeemed} name="fuelPointsRedeemed" />}
                <GeneralInputField inputType="number" fieldId="expense-amount" labelText="Expense amount" onChange={handlers.handleCommonFieldChange} value={expenseFormData.commonFields.transactionAmount} name="transactionAmount" />
                {uiState.earnedCardPoints && <SelectField fieldId="expense-select-credit-card" labelText="Select credit card" optionList={uiState.creditCardList} onChange={handlers.handleCommonFieldChange} value={expenseFormData.commonFields.selectedCreditCardId} optionIdAccessor="credit_card_id" optionTextAccessor="credit_card_name" name="selectedCreditCardId" defaultOptions={defaultCreditCardOption} />}
                {uiState.earnedCardPoints && <GeneralInputField inputType="number" fieldId="expense-earned-cardpoints" labelText="Card points earned" onChange={handlers.handleCommonFieldChange} value={expenseFormData.commonFields.cardPointsEarned} name="cardPointsEarned" />}
                <GeneralInputField inputType="text" fieldId="general-expense-notes" labelText="Notes (optional)" onChange={handlers.handleCommonFieldChange} value={expenseFormData.commonFields.transactionNotes} name="transactionNotes" />
            </fieldset>
            <GeneralButton buttonType="submit" buttonText="Submit expense" value="submit" />
            <GeneralButton buttonType="submit" buttonText="Add another" value="submitAnother" />
        </form>
    )
}

export default FuelExpenseForm

FuelExpenseForm.propTypes = {
    uiState: PropTypes.object,
    handlers: PropTypes.object,
    expenseFormData: PropTypes.object,
}