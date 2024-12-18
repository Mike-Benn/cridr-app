import axios from "axios";
import { useEffect , useState } from "react";
import { v4 as uuidv4 } from "../../../node_modules/uuid"
import CardListItem from "./CardListItem";
import AddItemButton from '../general/buttons/AddItemButton'


function ManageCardsPanel() {
    const [cardList , setCardList] = useState([]);
    const cardListItems = cardList.map(item => 
        <CardListItem key={uuidv4()} data={item} />
    )

    const apiUrl = import.meta.env.VITE_API_URL;
    useEffect(() => {
        const fetchCards = async () => {
            try {
                const response = await axios.get(`${apiUrl}/profile/my-cards/get-cards`)
                if (response.status === 200) {
                    setCardList(response.data.data.split(", "));
                } else {
                    console.error('Failed to fetch cards:', response.statusText);
                }
            } catch (error) {
                console.error('Error while fetching cards:', error);
            }
        };

        fetchCards();
    }, [apiUrl]);



    return (
        <section>
            <ul>{cardListItems}</ul>
            <AddItemButton buttonText="Add Card"/>
        </section>
    )
}

export default ManageCardsPanel