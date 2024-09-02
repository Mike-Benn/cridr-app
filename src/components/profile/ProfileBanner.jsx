import PropTypes from 'prop-types'

function ProfileBanner({ userFullName }) {

    return (
        <header>
            <h1>{userFullName}</h1>
        </header>
    )
}

ProfileBanner.propTypes = {
    userFullName: PropTypes.string,
}

export default ProfileBanner