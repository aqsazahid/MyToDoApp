import Axios from "axios";
import React, { useEffect, useState } from 'react';
import './RecepieIndex.css';
export const FoodRecepieApp = () => {
    const app_id = "c3d55bb0";
    const app_key = "34f5eff642fd0af6437852389205652a"
    const [recipe, setRecepie] = useState('')

    const getRecepeies = async () =>  {
        const url = `https://www.edamam.com/api/recipes/v2?type=any&q=${recipe}&app_id=${app_id}&app_key=${app_key}`
        var result = await Axios.get(url)
        console.log(result.data)
    }

    const recepieName  = (e) => {
        setRecepie(e.target.value);
    }

    // getRecepeies();
    return (
        <div className="py-5 container recipe">
            <h1 className="text-center">Food Recepie Plaza</h1>
            <button onClick={getRecepeies}>Get Recepies</button>
            <form className="app_searchName">
                <input 
                    onChange = {recepieName} 
                    // onKeyPress={handleKeyDown} 
                    type="text" 
                    className="search-input" 
                    placeholder='Enter Recipe' 
                    spellCheck="false"
                    value = {recipe}
                />
                <input 
                    type="submit" value="Search" className="search-btn"
                />
            </form>
        </div>
    )
}
export default FoodRecepieApp