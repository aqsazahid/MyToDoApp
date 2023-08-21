import Axios from "axios";
import React, {useState} from 'react';
import './RecepieIndex.css';
import RecipeTile  from './RecipeTile'
import { Search } from 'react-bootstrap-icons'; 
import Spinner from 'react-bootstrap/Spinner';
export const FoodRecepieApp = () => {
    const app_id = "96066e3e";
    const app_key = "bf7cc7798b5be944068d344c5f6b582c"
    const [query, setQuery] = useState('');
    const [recipes,setRecipe] = useState([]);
    const [loading, setLoading] = useState(false);

    const getRecepeies = async () =>  {
        try {
            if(query !== "") {
                setLoading(true);
                const url = `https://www.edamam.com/api/recipes/v2?type=any&q=${query}&app_id=${app_id}&app_key=${app_key}`
                Axios.get(url).then((response) => {
                    setRecipe(response.data.hits)
                    console.log(response.data.hits)
                    // setLoading(false);
                }).finally(()=>setLoading(false))
            }
        }
        catch (error) {
            setLoading(false);
            console.error('Error fetching data:', error);
        }
    }

    const recepieName  = (e) => {
        setQuery(e.target.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        getRecepeies();
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            getRecepeies();
        }
      }

    return (
        <div className="py-5 container recipe">
            <h1 className="text-center">Food Recepie App</h1>
            <form className="app_searchName mb-5" onSubmit={onSubmit}>
                <div className="holder">
                    <div className="field">
                        <input 
                            onChange = {recepieName} 
                            type="text" 
                            className="search-input" 
                            placeholder='Find the best recipies..' 
                            spellCheck="false"
                            value = {query}
                            onKeyPress={handleKeyDown} 
                        />
                    </div>
                   <div className="search-btn">
                        <button type="submit" className="btn btn-transparent"><Search /></button>
                   </div>
                </div>
            </form>
            {loading ? ( 
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner> 
            ): (
                <RecipeTile recipes={recipes} />
            )} 
        </div>
    )
}
export default FoodRecepieApp