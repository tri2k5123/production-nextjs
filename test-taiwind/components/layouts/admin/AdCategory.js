import ListCategories from "./ListCategory";
import SectionCategory from "./SectionCategory";

const getCategories = async () => {
    try {
        const resGetCategory = await fetch("http://localhost:3000/api/category", {
        method: "GET"
    })
    return resGetCategory.json();
    } catch (error) {
        
    }
}

export default async function AdCategory() {
    
    const { listCategories } =  await getCategories();
 
    return (
        <>
            <SectionCategory />
            <ListCategories categories={listCategories}/>
        </>
    )
}