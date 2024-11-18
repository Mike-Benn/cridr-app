import { useState, useEffect } from "react"
import axios from "axios";
import SubmitFormButton from "../general/buttons/SubmitFormButton";
import TextField from "../general/form-fields/TextField";


function ProfilePersonalInfoPanel() {
    const [fullName , setFullName] = useState("");
    
    
    const apiUrl = import.meta.env.VITE_API_URL;
    useEffect(() => {
        const fetchName = async () => {
            try {
                const response = await axios.get(`${apiUrl}/profile/personal/get-name`);
                if (response.status === 200) {
                    setFullName(response.data.data);
                } else {
                    console.error("Failed to fetch full name");
                }
            } catch (error) {
                console.error("Failed to fetch full name", error);
            }
        };
        fetchName();
    }, [apiUrl]);

    const handleNameChange = (e) => {
        setFullName(e.target.value);
    };

    const handleSubmitForm = async (e) => {
        e.preventDefault();

        const nameUpdate = {
            fullName,
        };

        try {
            const response = await axios.post(`${apiUrl}/profile/personal/submit-info-change`, nameUpdate, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                console.log('Profile changes saved:', response.data);
            } else {
                console.error('Failed to save changes:', response.statusText);
            }
        } catch (error) {
            console.error('Error while saving changes:', error);
        }
    };

    return (
        <form action="" onSubmit={handleSubmitForm}>
            <fieldset>
                <legend>Account Information</legend>
                <TextField placeholder="Full Name" value={fullName} onChange={handleNameChange} />
                <SubmitFormButton buttonText="Save Changes" />
            </fieldset>
        </form>
    )
}

export default ProfilePersonalInfoPanel