import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getRecipes,
  dietTypeFilter,
  alphabeticalSort,
  scoreSort,
} from "../actions";
import Paged from "./Paged";
import {Recipe} from "./Recipe";
import SearchBar from "./SearchBar";
import './home.css'

let prevId = 1;

export default function Home() {
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.recipes);

  const [order, setOrder] = useState("");
  const [page, setPage] = useState(1);
  const [recipesPage, setRecipePage] = useState(9);

  const quantityRecipesPage = page * recipesPage;
  const firstRecipePage = quantityRecipesPage - recipesPage;
  const showRecipesPage = allRecipes.slice(
    firstRecipePage,
    quantityRecipesPage
  );

  const paged = function (pageNumber) {
    setPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getRecipes());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getRecipes());
    setPage(1);
  }

  function handleDietTypeFilter(e) {
    e.preventDefault();
    dispatch(dietTypeFilter(e.target.value));
    setPage(1);
  }

  function handleAlphabeticalSort(e) {
    e.preventDefault();
    dispatch(alphabeticalSort(e.target.value));
    setPage(1);
    setOrder(`Order ${e.target.value}`);
  }

  function handleScoreSort(e) {
    e.preventDefault();
    dispatch(scoreSort(e.target.value));
    setPage(1);
    setOrder(`Order ${e.target.value}`);
  }

  return (
    <div className="home">
      <h1 className="initialMsg"> Let's do it!</h1>

      <div>
        <button className="refreshButton" onClick={handleClick}>
          Refresh recipes
        </button>
        <Link to="/recipe">
          <button className="addButton">Add new recipe</button>
        </Link>
      </div>

      <div className="select">
        <label className="filter">Sort:</label>
        <select
          className="select"
          name="alphabetical"
          onChange={(e) => handleAlphabeticalSort(e)}
        >
          <option disabled >
            alphabetical
          </option>
          <option value="atoz"> A to Z</option>
          <option value="ztoa"> Z to A</option>
        </select>

        <label className="filter">Score:</label>
        <select
          className="select"
          name="numerical"
          onChange={e => handleScoreSort(e)} >
          <option disabled>Score:</option>
          <option value="asc"> MIN to MAX</option>
          <option value="desc"> MAX to MIN</option>
        </select>

        <label className="filter">Diet types:</label>
        <select
          className="select"
          name="diets"
          onChange={(e) => handleDietTypeFilter(e)}
        >
          <option disabled>
            Select...
          </option>
          <option value="gluten free">Gluten free</option>
          <option value="ketogenic">Ketogenic</option>
          <option value="vegetarian">Vegetarian</option>
          <option value="lacto vegetarian">Lacto-Vegetarian</option>
          <option value="ovo vegetarian">Ovo-Vegetarian</option>
          <option value="lacto ovo vegetarian">Lacto-Ovo-Vegetarian</option>
          <option value="vegan"> Vegan</option>
          <option value="pescetarian">Pescetarian</option>
          <option value="paleolithic">Paleolithic</option>
          <option value="primal">Primal</option>
          <option value="low fodmap">Low fodmap</option>
          <option value="whole 30">Whole 30</option>
          <option value="diary free">Diary free</option>
        </select>
      </div>

      <Paged
        recipesPage={recipesPage}
        allRecipes={allRecipes.length}
        paged={paged}
      />

      <SearchBar />

      <div className='allRecipes'>
        {
            showRecipesPage?.map(e => {
                return(
                    <div className='eachRecipe' key={prevId++}>
                        <Link className='linkRecetas' to={`home/${e.id}`}>
                            <Recipe
                            image={e.image ? 
                                e.image :
                                'https://images .unsplash.com/photo-1635321593217-40050ad13c74?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1748&q=80'}
                                    name={e.name}
                                    dietTypes= {e.dietTypes}
                            />
                        </Link>
                        
                    </div>
                )
            })
        }

      </div>

        <Paged recipes={recipesPage} allRecipes={allRecipes.length} paged={paged}/>

    </div>
  );
}
