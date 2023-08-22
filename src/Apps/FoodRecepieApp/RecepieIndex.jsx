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
    const [error, setError] = useState("");
    const [healthlabel,setHealthlabel] = useState("");

    const getRecepeies = async () =>  {
        debugger
        setError("");
        try {
            if(query && healthlabel!== "") {
                setLoading(true);
                debugger
                const url = `https://www.edamam.com/api/recipes/v2?type=any&q=${query}&app_id=${app_id}&app_key=${app_key}&health=${healthlabel}`
                Axios.get(url).then((response) => {
                    debugger
                    if(response.data.hits.length == 0) {
                        setError("We couldn't find any data please try again");
                    }
                    else {
                        setRecipe(response.data.hits)
                        console.log(response.data.hits)
                    }
                }).finally(()=> setLoading(false))
            }
            else {
                setError("We couldn't find any data please try again");
            }
        }
        catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const recepieName  = (e) => {
        setQuery(e.target.value);
    }

    const healthName  = (e) => {
        setHealthlabel(e.target.value);
        getRecepeies();
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
            <h1 className="text-center mb-4">Food Recepie App</h1>
            <form className="app_searchName mb-5" onSubmit={onSubmit}>
                <div className="d-flex justify-content-center">
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
                    <select className="app_healthlabel ms-2" onChange={healthName}>
                        <option>vegan</option>
                        <option > alcohol-cocktail</option>
                        <option>alcohol-free</option>
                        <option>crustacean-free</option>
                        <option>egg-free</option>
                        <option>fish-free</option>
                    </select>
                </div>
            </form>
            {loading ? ( 
                <div className="position">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div> 
            ): (
                error !== "" ? <p className='mt-5 text-danger text-center'>{error}</p>: <RecipeTile recipes={recipes} />
            )}
        </div>
    )
}
export default FoodRecepieApp