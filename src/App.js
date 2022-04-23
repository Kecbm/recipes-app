import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import Profile from './pages/Profile';
import RecipeInProgress from './pages/RecipeInProgress';
import RecipeInProgressDrinks from './pages/RecipeinProgressDrinks';
import Foods from './pages/Foods';
import Explore from './pages/Explore';
import ExploreFoods from './pages/ExploreFoods';
import ExploreDrinks from './pages/ExploreDrinks';
import ExploreFoodsIngredients from './pages/ExploreFoodsIngredients';
import ExploreFoodsNationalities from './pages/ExploreFoodsNationalities';
import FavoriteRecipes from './pages/FavoriteRecipes';
import DetailDrink from './pages/DetailDrink';
import DetailFood from './pages/DetailFood';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/foods/:id/in-progress" component={ RecipeInProgress } />
      <Route path="/drinks/:id/in-progress" component={ RecipeInProgressDrinks } />
      <Route exact path="/profile" component={ Profile } />
      <Route
        exact
        path="/foods"
        render={ (props) => (
          <Foods page="foods" { ...props } />
        ) }
      />
      <Route
        exact
        path="/drinks"
        render={ (props) => (
          <Foods page="drinks" { ...props } />
        ) }
      />
      <Route
        exact
        path="/foods/:id"
        render={ (props) => (
          <DetailFood { ...props } />
        ) }
      />
      <Route
        exact
        path="/drinks/:id"
        render={ (props) => (
          <DetailDrink { ...props } />
        ) }
      />
      <Route exact path="/explore" component={ Explore } />
      <Route exact path="/explore/foods" component={ ExploreFoods } />
      <Route exact path="/explore/drinks" component={ ExploreDrinks } />
      <Route
        exact
        path="/explore/foods/ingredients"
        component={ ExploreFoodsIngredients }
      />
      <Route
        exact
        path="/explore/drinks/ingredients"
        render={ (props) => (<ExploreFoodsIngredients { ...props } page="drinks" />) }
      />
      <Route
        exact
        path="/explore/foods/nationalities"
        component={ ExploreFoodsNationalities }
      />

      <Route
        exact
        path="/explore/drinks/nationalities"
        component={ NotFound }
      />
      <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
    </Switch>
  );
}

export default App;
