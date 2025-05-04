import { GeneralInputField, SelectField } from "../../general/form-fields/InputFields";
import PropTypes from "prop-types";
import GeneralButton from "../../general/buttons/GeneralButton";

function GeneralExpenseForm({ expenseFormData, uiState, handlers }) {
    const defaultBusinessOption = [<option key="default" value="default">Select Business</option>];

    return (
        <form action="" onSubmit={handlers.handleExpenseSubmit}>
            <fieldset>
                <legend>Add Expense</legend>
                <SelectField fieldId="general-expense-select-business" labelText="Select Business" optionList={uiState.businessList} onChange={handlers.handleCommonFieldChange} value={expenseFormData.commonFields.selectedBusinessId} optionIdAccessor="business_id" optionTextAccessor="business_name" name="selectedBusinessId" defaultOptions={defaultBusinessOption}/>
                <GeneralInputField inputType="number" fieldId="general-expense-amount" labelText="Expense amount" onChange={handlers.handleCommonFieldChange} value={expenseFormData.commonFields.transactionAmount} name="transactionAmount" />
                <GeneralInputField inputType="text" fieldId="general-expense-notes" labelText="Notes (optional)" onChange={handlers.handleCommonFieldChange} value={expenseFormData.commonFields.transactionNotes} name="transactionNotes" />
                <GeneralInputField inputType="date" fieldId="general-expense-transaction-date" labelText="Date of expense" onChange={handlers.handleCommonFieldChange} value={expenseFormData.commonFields.transactionDate} name="transactionDate" />
            </fieldset>
            <GeneralButton buttonType="submit" buttonText="Submit expense" value="submit" />
            <GeneralButton buttonType="submit" buttonText="Add another" value="submitAnother" />
        </form>
    )
}

export default GeneralExpenseForm

GeneralExpenseForm.propTypes = {
    uiState: PropTypes.object,
    handlers: PropTypes.object,
    expenseFormData: PropTypes.object,
}