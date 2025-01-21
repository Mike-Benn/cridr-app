import { Link } from "react-router-dom"
import GeneralButton from "../general/buttons/GeneralButton"
import { useEffect, useState } from "react"
import { CategorySelect } from "../general/form-fields/InputFields"
import apiClient from "../../api/apiClient"


function CollectiblesDashboard() {

    const [selectedCategory, setSelectedCategory] = useState([]);
    const defaultCategoryOption = <option key="all" value="all">All</option>
    const [categoryList, setCategoryList] = useState([]);

    useEffect(() => {
        document.title = "My Collectibles | Cridr";
        const getCategoriesById = async () => {
            try {
                const response = await apiClient.get("/categories");
                if (response.data) {
                    let categories = [...response.data.data];
                    setCategoryList(categories);
                }

            } catch (error) {
                console.error("Unable to get collectible categoriess for user.")
            }

        }
        getCategoriesById();
    }, [])

    return (
        <>
            <Link to="new-category"><GeneralButton buttonType="button" buttonText="Add Collectible Category" /></Link>

        </>
    )
}

export default CollectiblesDashboard