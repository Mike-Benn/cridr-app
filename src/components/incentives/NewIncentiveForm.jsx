import PropTypes from "prop-types"
import { GeneralInputField, SelectField } from "../general/form-fields/InputFields"
import GeneralButton from "../general/buttons/GeneralButton";

function NewIncentiveForm({ incentiveFormData, uiState, handlers }) {
    const defaultBusinessIdOption = [<option key="default" value="" disabled selected>Select incentive provider</option>];
    return (
        <form action="" onSubmit={handlers.handleIncentiveFormSubmit}>
            <fieldset>
                <legend>Add Incentive Transaction</legend>
                <SelectField fieldId="incentive-select-business" labelText="Select incentive provider" optionList={uiState.businessList} onChange={handlers.handleIncentiveFormChange} value={incentiveFormData.selectedBusinessId} optionIdAccessor="business_id" optionTextAccessor="business_name" name="selectedBusinessId" defaultOptions={defaultBusinessIdOption} />
                <GeneralInputField inputType="text" fieldId="incentive-description" labelText="Description" onChange={handlers.handleIncentiveFormChange} value={incentiveFormData.description} name="incentiveDescription" />
                <GeneralInputField inputType="number" fieldId="incentive-amount" labelText="Amount" onChange={handlers.handleIncentiveFormChange} value={incentiveFormData.incentiveAmount} name="incentiveAmount" />
                <GeneralInputField inputType="date" fieldId="incentive-transaction-date" labelText="Transaction Date" onChange={handlers.handleIncentiveFormChange} value={incentiveFormData.transactionDate} name="transactionDate" />
            </fieldset>
            <GeneralButton buttonType="submit" buttonText="Submit" value="submit" />
            <GeneralButton buttonType="submit" buttonText="Submit and next" value="submitAnother" />
        </form>
    )
}

export default NewIncentiveForm

NewIncentiveForm.propTypes = {
    incentiveFormData: PropTypes.object,
    handlers: PropTypes.object,
    uiState: PropTypes.object,
}