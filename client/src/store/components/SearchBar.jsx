import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getRecipesByName } from "../actions";
import './searchBar.css';

export default function SearchBar(){
    const dispatch = useDispatch();
    const [input,setInput] = useState('');

    function handleChange(e){
        e.preventDefault();
        setInput(e.target.value);
    }
    function handleSubmit(e){
        try {
            dispatch(getRecipesByName(input))
        } catch (error) {
            return error;
        }
        setInput('');
    }

    return (
        <div className="search">
            <input type="text" className="searchInput" placeholder="Search Recipe By Name" value={input} onChange={e => handleChange(e)}/>
            <button className="searchButton" type="submmit" onClick={ e => handleSubmit(e)}>Search</button>
        </div>
    )
}

