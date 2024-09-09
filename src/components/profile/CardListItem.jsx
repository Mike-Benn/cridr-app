import PropTypes from 'prop-types'

function CardListItem({ data }) {
    return (
        <li>{data}</li>
    )
}

CardListItem.propTypes = {
    data: PropTypes.string,
}

export default CardListItem