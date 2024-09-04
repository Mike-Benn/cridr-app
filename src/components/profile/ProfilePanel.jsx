
import ProfileBanner from "./ProfileBanner"
import ProfileOption from "./ProfileOption"


function ProfilePanel() {

    return (
        <>
            <ProfileBanner userFullName="Mike Bennett" />
            <ul>
              <ProfileOption optionTitle="Profile Information" linkAddress="personal" />
              <ProfileOption optionTitle="Manage Credit Cards" linkAddress="my-cards"/>
              <ProfileOption optionTitle="Savings Summary" linkAddress="summary"/>
            </ul>
        </>
    )
}

export default ProfilePanel