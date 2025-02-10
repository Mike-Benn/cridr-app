import apiClient from "../../api/apiClient"
import { TextField } from "../general/form-fields/InputFields"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import SubmitFormButton from "../general/buttons/SubmitFormButton"

function NewCollectibleCategory() {
    const navigate = useNavigate();
    const [newCategory , setNewCategory] = useState({
        categoryName: "",
    })

    const handleNewCategoryChange = (e) => {
        const { name , value } = e.target;
        setNewCategory((prev) => ({ ...prev, [name]: value }))
    }

    useEffect(() => {
        document.title = "New Collectible Category | Cridr";
    })

    const handleNewCategorySubmit = async (e) => {
        e.preventDefault();
        const category = {
            collectibles_main_categories_name: newCategory.categoryName,
        }
        try {
            const response = await apiClient.post("/collectibles/new-category", category);
            if (response.status === 201) {
                navigate("..");
            }
        } catch (error) {
            console.error(error, "Error adding new category.");
        }
        
    }

    return (
        <form action="" onSubmit={handleNewCategorySubmit}>
            <fieldset>
                <legend>New Collectible Category</legend>
                <TextField labelText="Category Name" value={newCategory.categoryName} onChange={handleNewCategoryChange} name="categoryName" />
                <SubmitFormButton buttonText="Add New Category" />
            </fieldset>
        </form>
    )
}

export default NewCollectibleCategory