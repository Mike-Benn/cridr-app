import apiClient from "../../api/apiClient"
import { CategorySelect, TextField } from "../general/form-fields/InputFields"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import SubmitFormButton from "../general/buttons/SubmitFormButton"

function NewCollectibleSubcategory() {
    const navigate = useNavigate();
    const [selectedCategoryId , setSelectedCategoryId] = useState("")
    const [newSubcategory , setNewSubcategory] = useState({
        subcategoryName: "",
    })
    const [categoryList , setCategoryList] = useState([]);

    useEffect(() => {
        document.title = "New Collectible Subcategory | Cridr";
        const getCategoriesById = async () => {
            try {
                const response = await apiClient.get("/categories");
                if (response.data) {
                    let categories = [...response.data.data];
                    setCategoryList(categories);
                    setSelectedCategoryId(categories[0].collectibles_main_categories_id)
                }

            } catch (error) {
                console.error("Unable to get collectible categoriess for user.")
            }

        }
        getCategoriesById();
    }, [])

    const handleNewSubcategoryChange = (e) => {
        const { name , value } = e.target;
        setNewSubcategory((prev) => ({ ...prev, [name]: value }))
    }

    const handleSelectedCategoryChange = (e) => {
        setSelectedCategoryId(e.target.value);
    }

    const resetSubcategoryForm = () => {
        setNewSubcategory((prev) => ({ ...prev, 
            categoryName: "",
        }))
        setSelectedCategoryId("");
    }

    const handleNewSubcategorySubmit = async (e) => {
        e.preventDefault();
        const subcategory = {
            collectibles_subcategories_name: newSubcategory.subcategoryName,
            collectibles_main_categories_id: selectedCategoryId,
        }
        try {
            const response = await apiClient.post("/collectibles/new-subcategory", subcategory);
            if (response.status === 201) {
                resetSubcategoryForm();
                navigate("..");
            }
        } catch (error) {
            console.error(error, "Error adding new category.");
        }
        
    }

    return (
        <form action="" onSubmit={handleNewSubcategorySubmit}>
            <fieldset>
                <legend>New Collectible Subcategory</legend>
                <CategorySelect fieldId="collectibles-new-subcategory-select-category" labelText="Select Category" optionList={categoryList} onChange={handleSelectedCategoryChange} value={selectedCategoryId} optionTextAccessor="collectibles_main_categories_name" optionIdAccessor="collectibles_main_categories_id" />
                <TextField labelText="Subcategory Name" value={newSubcategory.subcategoryName} onChange={handleNewSubcategoryChange} name="subcategoryName" />
                <SubmitFormButton buttonText="Add New Subcategory" />
            </fieldset>
        </form>
    )
}

export default NewCollectibleSubcategory