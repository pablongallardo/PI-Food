import './App.css';
import {Route, Switch} from 'react-router-dom'


import Home from './store/components/Home';
import LandingPage from './store/components/LandingPage';
import RecipeDetails from './store/components/RecipeDetails';
import AddRecipe from './store/components/AddRecipe';
import SearchBar from './store/components/SearchBar';
import {Recipe} from './store/components/Recipe';

function App() {
  return (
    <div className="App">
      <Switch>
      <Route exact path='/'><LandingPage/></Route>
      <Route exact path="/home"><Home/></Route>
      <Route exact path="/home/:id" component={RecipeDetails}/>
      <Route exact path="/recipe"><AddRecipe/></Route>
      {/* <Route exact path="/search"><SearchBar/></Route> */}
      

      {/* <Route exact path='/recipes'/><Recipe/> </Route> */}
      <h1>hoka</h1>
      </Switch>
    </div>
  );
}

export default App;
