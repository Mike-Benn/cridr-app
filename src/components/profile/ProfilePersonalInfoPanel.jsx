import { useState, useEffect } from "react"
import axios from "axios";

function ProfilePersonalInfoPanel() {
    const [fullName , setFullName] = useState("");

    useEffect(() => {
        const fetchName = async () => {
            try {
                const response = await axios.get('https://api.mike-benn.com/profile/personal/get-name');
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
    }, []);

    const handleNameChange = (e) => {
        setFullName(e.target.value);
    };


    return (
        <form action="" >
            <fieldset>
                <legend>Account Information</legend>
                <input type="text" placeholder="Full Name" value={fullName} onChange={handleNameChange}></input>
                <button type="submit"></button>
            </fieldset>
        </form>
    )
}

export default ProfilePersonalInfoPanel