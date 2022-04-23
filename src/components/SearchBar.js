import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { string } from 'prop-types';
import {
  fetchFoodsIngredient,
  fetchFoodsName,
  fetchFoodsFirstLetter,
} from '../services/FetchFoods';
import {
  fetchDrinksIngredient,
  fetchDrinksName,
  fetchDrinksFirstLetter,
} from '../services/FetchDrinks';
import ContextDrinks from '../Context/contextDrinks/ContextDrinks';
import ContextFoods from '../Context/contextFoods/ContextFoods';
import '../Page.css';

function SearchBar(props) {
  const history = useHistory();
  const { setDataDrinks } = useContext(ContextDrinks);
  const { setDataFoods } = useContext(ContextFoods);

  const { page, exploreSearch } = props;

  const [filterBy, setFilterBy] = useState('');
  const [serchValue, setSerchValue] = useState('');

  useEffect(() => {
    setSerchValue(exploreSearch);
  }, [exploreSearch]);

  function handleChange({ target: { id } }) {
    setFilterBy(id);
  }

  function dataSet(set, pages, id) {
    set((prev) => {
      if (prev.length === 1) {
        history.push(`/${pages}/${prev[0][id]}`);
      }
      return prev;
    });
  }

  async function handleClick() {
    if (page === 'foods') {
      if (filterBy === 'ingredient') {
        const { meals } = await fetchFoodsIngredient(serchValue);
        console.log(meals);
        setDataFoods(meals || []);
      } else if (filterBy === 'name') {
        const { meals } = await fetchFoodsName(serchValue);
        setDataFoods(meals);
      } else if (filterBy === 'firstletter') {
        const { meals } = await fetchFoodsFirstLetter(serchValue);
        setDataFoods(meals);
      }
    } else if (page === 'drinks') {
      if (filterBy === 'ingredient') {
        const { drinks } = await fetchDrinksIngredient(serchValue);
        setDataDrinks(drinks);
      } else if (filterBy === 'name') {
        const { drinks } = await fetchDrinksName(serchValue);
        setDataDrinks(drinks);
      } else if (filterBy === 'firstletter') {
        const { drinks } = await fetchDrinksFirstLetter(serchValue);
        setDataDrinks(drinks || []);
      }
    }
    dataSet(setDataFoods, page, 'idMeal');
    dataSet(setDataDrinks, page, 'idDrink');
  }

  function handleChangeSearch({ target: { value } }) {
    setSerchValue(value);
  }

  return (
    <div className="flex">
      <input
        className="margin"
        data-testid="search-input"
        type="text"
        value={ serchValue }
        onChange={ handleChangeSearch }
      />
      <div>
        <label htmlFor="ingredient">
          Ingredient
          <input
            className="margin"
            id="ingredient"
            name="filter"
            type="radio"
            data-testid="ingredient-search-radio"
            onChange={ handleChange }
          />
        </label>
        <label htmlFor="name">
          Name
          <input
            className="margin"
            id="name"
            name="filter"
            type="radio"
            data-testid="name-search-radio"
            onChange={ handleChange }
          />
        </label>
        <label htmlFor="firstletter">
          First Letter
          <input
            className="margin"
            name="filter"
            id="firstletter"
            type="radio"
            data-testid="first-letter-search-radio"
            onChange={ handleChange }
          />
        </label>
      </div>

      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleClick }
      >
        search
      </button>
    </div>
  );
}

SearchBar.defaultProps = {
  page: 'foods',
  exploreSearch: '',
};

SearchBar.propTypes = {
  page: string,
  exploreSearch: string,
};

export default SearchBar;
