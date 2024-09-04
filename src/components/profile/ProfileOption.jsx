import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

function ProfileOption({ optionTitle , linkAddress }) {



    return (
        <li>
            <Link to={linkAddress}>
                <h4>{optionTitle}</h4>
            </Link>
        </li>
    )
}

ProfileOption.propTypes = {
    optionTitle: PropTypes.string,
    linkAddress: PropTypes.string,
}

export default ProfileOption