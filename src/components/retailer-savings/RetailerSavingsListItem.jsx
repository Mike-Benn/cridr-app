import PropTypes from "prop-types"
import EditListItemButton from "../general/buttons/EditListItemButton"
import DeleteListItemButton from "../general/buttons/DeleteListItemButton"


function RetailerSavingsListItem({ data , deleteItem , editItem }) {
    return (
        <li>{data.itemName} <DeleteListItemButton id={data.id} onClick={deleteItem}/> <EditListItemButton id={data.id} onEdit={editItem} /></li>
    )


}

RetailerSavingsListItem.propTypes = {
    data: PropTypes.object,
    deleteItem: PropTypes.func,
    editItem: PropTypes.func,

}

export default RetailerSavingsListItem