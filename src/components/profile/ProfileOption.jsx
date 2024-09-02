import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

function ProfileOption({ optionTitle , optionBio , linkAddress }) {



    return (
        <li>
            <Link to={linkAddress}>
                <h4>{optionTitle}</h4>
                <p>{optionBio}</p>
            </Link>
        </li>
    )
}

ProfileOption.propTypes = {
    optionTitle: PropTypes.string,
    optionBio: PropTypes.string,
    linkAddress: PropTypes.string,
}

export default ProfileOption