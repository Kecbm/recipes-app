import React, { useState, useEffect, useContext } from 'react';
import { string } from 'prop-types';
import { fetchFilterByFoodsCategory } from '../services/FetchFoods';
import { fetchFilterByDrinksCategory } from '../services/FetchDrinks';
import ContextDrinks from '../Context/contextDrinks/ContextDrinks';
import ContextFoods from '../Context/contextFoods/ContextFoods';
import '../Page.css';

function createButtons(category, handleClick) {
  const QTD_BUTTONS = 5;
  const buttons = [];
  if (category.length > 0) {
    for (let i = 0; i < QTD_BUTTONS; i += 1) {
      buttons.push(
        <button
          className="btn btn-warning"
          key={ i }
          id={ i }
          type="button"
          onClick={ handleClick }
          name={ category[i].strCategory }
          data-testid={ `${category[i].strCategory}-category-filter` }
        >
          { category[i].strCategory }
        </button>,
      );
    }
    return buttons;
  }
}

function FilterCategory(props) {
  const { page } = props;
  console.log('page: ', page);

  const { setDataFoods, setFoodsDefault } = useContext(ContextFoods);
  const { setDataDrinks, setDrinksDefault } = useContext(ContextDrinks);

  const [categoryFoods, setCategoryFoods] = useState([]);
  const [categoryDrinks, setCategoryDrinks] = useState([]);
  const [buttonsCliked, setButtonsCliked] = useState([false, false, false, false, false]);

  useEffect(() => {
    (async () => {
      if (page === 'drinks') {
        const respDrinks = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
        const { drinks } = await respDrinks.json();
        setCategoryDrinks(drinks);
      } else {
        const respFoods = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
        const { meals } = await respFoods.json();
        setCategoryFoods(meals);
      }
    })();
  }, [page]);

  async function handleFoodClick({ target: { name, id } }) {
    console.log('foods clicked');
    const aux = [false, false, false, false, false];
    if (buttonsCliked[id] === false) {
      const { meals } = await fetchFilterByFoodsCategory(name);
      setDataFoods(meals);
      aux[id] = true;
      setButtonsCliked(aux);
    } else {
      setFoodsDefault();
      setButtonsCliked(aux);
    }
  }

  async function handleDrinksClick({ target: { name, id } }) {
    const aux = [false, false, false, false, false];
    if (buttonsCliked[id] === false) {
      const { drinks } = await fetchFilterByDrinksCategory(name);
      setDataDrinks(drinks);
      aux[id] = true;
      setButtonsCliked(aux);
    } else {
      setDrinksDefault();
      setButtonsCliked(aux);
    }
  }

  async function handleClickAll() {
    if (page === 'foods') {
      setFoodsDefault();
    }
    if (page === 'drinks') {
      setDrinksDefault();
    }
  }

  if (page === 'drinks') {
    return (
      <div className="buttons-categories">
        <button
          type="button"
          onClick={ handleClickAll }
          data-testid="All-category-filter"
          className="btn btn-warning"
        >
          ALL
        </button>
        { createButtons(categoryDrinks, handleDrinksClick) }
      </div>
    );
  }

  return (
    <div className="buttons-categories">
      <button
        type="button"
        onClick={ handleClickAll }
        data-testid="All-category-filter"
        className="btn btn-warning"
      >
        ALL
      </button>
      { createButtons(categoryFoods, handleFoodClick) }
    </div>
  );
}

FilterCategory.defaultProps = {
  page: 'foods',
};

FilterCategory.propTypes = {
  page: string,
};

export default FilterCategory;
