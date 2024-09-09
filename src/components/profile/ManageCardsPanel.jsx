import axios from "axios";
import { useEffect , useState } from "react";
import { v4 as uuidv4 } from "../../../node_modules/uuid"
import CardListItem from "./CardListItem";


function ManageCardsPanel() {
    const [cardList , setCardList] = useState([]);
    const cardListItems = cardList.map(item => 
        <CardListItem key={uuidv4()} data={item} />
    )

    useEffect(() => {
        const fetchCards = async () => {
            try {
                const response = await axios.get('https://api.mike-benn.com/profile/my-cards/get-cards')
                if (response.status === 200) {
                    setCardList(response.data.split(", "));
                } else {
                    console.error('Failed to fetch cards:', response.statusText);
                }
            } catch (error) {
                console.error('Error while fetching cards:', error);
            }
        };

        fetchCards();
    }, []);

    return (
        <ul>{cardListItems}</ul>
    )
}

export default ManageCardsPanel