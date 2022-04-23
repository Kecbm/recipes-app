import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import favoriteIcon from '../images/blackHeartIcon.svg';

const objDiv = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  margin: '10px',
};

const divStyle = objDiv;

const objButton = {
  width: '300px',
  backgroundColor: '#ffc107',
  textAlign: 'center',
  margin: '10px',
  borderRadius: '5px',
  padding: '10px',
  color: '#212529',
  borderColor: '#ffc107',
  border: '1px solid transparent',
};

const buttonStyle = objButton;

const cardStyle = {
  borderRadius: '10px',
  boxShadow: '0 0 1em #cc4b1d',
  color: '#260101',
  display: 'flex',
  justifyContent: 'center',
  margin: '1vh',
  padding: '1vh 3vh',
};

const button = {
  backgroundColor: '#ffc107',
  border: '1px solid transparent',
  borderColor: '#ffc107',
  borderRadius: '5px',
  color: '#212529',
  float: 'right',
  margin: '2px',
  textAlign: 'center',
};

function FavoriteRecipes() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const [filterType, setFilterType] = useState('all');
  console.log(filterType);

  useEffect(() => {
    const favoriteRecipesLocalStorage = JSON.parse(localStorage
      .getItem('favoriteRecipes')) || [];
    setFavoriteRecipes(favoriteRecipesLocalStorage);
  }, []);

  const share = (id) => {
    navigator.clipboard.writeText(`http://localhost:3000/foods/${id}`);
    window.alert('Link copied!');
    setIsLinkCopied(true);
  };

  const removeFavoriteRecipe = (id) => {
    const getFavoriteRecipe = JSON.parse(localStorage.getItem('favoriteRecipes'));

    const deleteFavorite = getFavoriteRecipe
      .filter((element) => element.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(deleteFavorite));
    setFavoriteRecipes(deleteFavorite);
  };

  const toFilter = (recipes) => {
    if (filterType === 'all') {
      return recipes;
    }
    return recipes.filter((recipe) => recipe.type === filterType);
  };

  return (
    <div>
      <Header title="Favorite Recipes" searchButtonEnabled={ false } />
      <div
        style={ divStyle }
      >
        <button
          data-testid="filter-by-all-btn"
          type="button"
          onClick={ () => setFilterType('all') }
          style={ buttonStyle }
        >
          All
        </button>
        <button
          data-testid="filter-by-food-btn"
          type="button"
          onClick={ () => setFilterType('food') }
          style={ buttonStyle }
        >
          Food
        </button>
        <button
          data-testid="filter-by-drink-btn"
          type="button"
          onClick={ () => setFilterType('drink') }
          style={ buttonStyle }
        >
          Drinks
        </button>
      </div>
      {favoriteRecipes.length === 0 ? <p>Não há receitas favoritas.</p> : (
        <div>
          {toFilter(favoriteRecipes).map((recipe, index) => (
            <div
              key={ index }
              data-testid={ `${index}-${recipe.name}-horizontal-tag` }
              style={ cardStyle }
            >
              <Link to={ `/${recipe.type}s/${recipe.id}` }>
                <img
                  data-testid={ `${index}-horizontal-image` }
                  src={ recipe.image }
                  alt={ recipe.name }
                  width="100px"
                />
              </Link>
              {recipe.type === 'food' && (
                <p
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  {`${recipe.nationality} - ${recipe.category}`}
                </p>
              )}
              {recipe.type === 'drink' && (
                <p
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  {`${recipe.alcoholicOrNot}`}
                </p>
              )}
              <Link to={ `/${recipe.type}s/${recipe.id}` }>
                <h2
                  data-testid={ `${index}-horizontal-name` }
                  style={ text }
                >
                  {recipe.name}
                </h2>
              </Link>
              <button
                data-testid={ `${index}-horizontal-share-btn` }
                src={ shareIcon }
                type="button"
                onClick={ () => share(recipe.id) }
                style={ button }
              >
                {isLinkCopied ? 'Link copied!' : (
                  <img src={ shareIcon } alt="share-icon" />
                )}
              </button>
              <button
                data-testid={ `${index}-horizontal-favorite-btn` }
                src={ favoriteIcon }
                type="button"
                onClick={ () => removeFavoriteRecipe(recipe.id) }
                style={ button }
              >
                <img name={ recipe.name } src={ favoriteIcon } alt="favorite-icon" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

//

export default FavoriteRecipes;
