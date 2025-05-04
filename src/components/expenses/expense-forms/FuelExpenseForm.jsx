import { GeneralInputField, SelectField, CheckboxField } from "../../general/form-fields/InputFields";
import PropTypes from "prop-types";
import GeneralButton from "../../general/buttons/GeneralButton";

function FuelExpenseForm({ expenseFormData, uiState, handlers }) {
    const defaultBusinessOption = [<option key="" value="" selected disabled >Select Business</option>];
    return (
        <form action="" onSubmit={handlers.handleExpenseSubmit}>
            <fieldset>
                <legend>Add Expense</legend>
                <SelectField fieldId="expense-select-business" labelText="Select Business" optionList={uiState.businessList} onChange={handlers.handleCommonFieldChange} value={expenseFormData.commonFields.selectedBusinessId} optionIdAccessor="business_id" optionTextAccessor="business_name" name="selectedBusinessId" defaultOptions={defaultBusinessOption}/>
                <CheckboxField labelText="Redeemed Fuel Points" checked={expenseFormData.commonFields.redeemingFuelPoints} onChange={handlers.toggleRedeemingFuelPoints} name="redeemingFuelPoints" /> 
                <GeneralInputField inputType="number" fieldId="expense-amount" labelText="Expense amount" onChange={handlers.handleCommonFieldChange} value={expenseFormData.commonFields.transactionAmount} name="transactionAmount" />
                {uiState.redeemingFuelPoints && <GeneralInputField inputType="number" fieldId="general-expense-gallons" labelText="Gallons of gas" onChange={handlers.handleFuelFieldChange} value={expenseFormData.fuelFields.gallonsFilled} name="gallonsFilled"/>}
                {uiState.redeemingFuelPoints && <GeneralInputField inputType="number" fieldId="general-expense-fuelpoints" labelText="Fuel points redeemed" onChange={handlers.handleFuelFieldChange} value={expenseFormData.fuelFields.fuelPointsRedeemed} name="fuelPointsRedeemed" />}
                <GeneralInputField inputType="text" fieldId="general-expense-notes" labelText="Notes (optional)" onChange={handlers.handleCommonFieldChange} value={expenseFormData.commonFields.transactionNotes} name="transactionNotes" />
                <GeneralInputField inputType="date" fieldId="general-expense-transaction-date" labelText="Date of expense" onChange={handlers.handleCommonFieldChange} value={expenseFormData.commonFields.transactionDate} name="transactionDate" />
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