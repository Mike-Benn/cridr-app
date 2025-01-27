import { Link } from "react-router-dom"
import GeneralButton from "../general/buttons/GeneralButton"
import { useEffect, useState } from "react"
import { CategorySelect } from "../general/form-fields/InputFields"
import apiClient from "../../api/apiClient"


function CollectiblesDashboard() {

    const [selectedCategoryId, setSelectedCategoryId] = useState("all");
    const defaultCategoryOption = [<option key="all" value="all">All Collectibles</option>]
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
    
    const handleSelectedCategoryChange = (e) => {
        setSelectedCategoryId(e.target.value);
    }

    return (
        <>
            <Link to="new-category"><GeneralButton buttonType="button" buttonText="Add Collectible Category" /></Link>
            <Link to="new-subcategory"><GeneralButton buttonType="button" buttonText="Add Collectible Subcategory" /></Link>
            <CategorySelect fieldId="collectibles-select-category" labelText="Select Category" optionList={categoryList} onChange={handleSelectedCategoryChange} value={selectedCategoryId} optionTextAccessor="collectibles_main_categories_name" optionIdAccessor="collectibles_main_categories_id" defaultOptions={defaultCategoryOption} />
        </>
    )
}

export default CollectiblesDashboard