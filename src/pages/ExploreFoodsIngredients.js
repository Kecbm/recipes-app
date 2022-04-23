import React, { useEffect, useState, useContext } from 'react';
import { func, shape, string } from 'prop-types';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import CardIngredients from '../components/CardIngredients';
import ContextFoods from '../Context/contextFoods/ContextFoods';
import ContextDrinks from '../Context/contextDrinks/ContextDrinks';

function ExploreFoodsIngredients(props) {
  const { page, history } = props;
  console.log(page);
  const { setDataFoods } = useContext(ContextFoods);
  const { setDataDrinks } = useContext(ContextDrinks);
  const [dataFoods, setDataFoodsLocal] = useState([]);
  const [dataDrinks, setDataDrinksLocal] = useState([]);
  const MAX_CARDS = 12;
  useEffect(() => {
    (async () => {
      if (page === 'foods') {
        const resp = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
        const { meals } = await resp.json();
        setDataFoodsLocal(meals);
      } else if (page === 'drinks') {
        const resp = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
        const { drinks } = await resp.json();
        setDataDrinksLocal(drinks);
      }
    })();
  }, []);

  async function hendleSetFoodsIngredient(ingredient) {
    console.log(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
    history.push('/foods');
    const resp = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
    const { meals } = await resp.json();
    setDataFoods(meals); // Provider
  }

  async function hendleSetDrinksIngredient(ingredient) {
    history.push('/drinks');
    console.log(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
    const resp = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
    const { drinks } = await resp.json();
    setDataDrinks(drinks); // Provider
  }

  function renderCards() {
    if (page === 'foods') {
      console.log('Dados: ', dataFoods.length);
      return dataFoods.map(({ strIngredient }, i) => (
        <Link
          to="/foods"
          key={ i }
          onClick={ () => hendleSetFoodsIngredient(strIngredient) }
        >
          <CardIngredients
            index={ i }
            strMeal={ strIngredient }
            strMealThumb={ `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png` }
          />
        </Link>
      )).slice(0, MAX_CARDS);
    }
    if (page === 'drinks') {
      return dataDrinks.map(({ strIngredient1 }, i) => (
        <Link
          to="/drinks"
          key={ i }
          onClick={ () => hendleSetDrinksIngredient(strIngredient1) }
        >
          <CardIngredients
            index={ i }
            strDrink={ strIngredient1 }
            strDrinkThumb={ `https://www.thecocktaildb.com/images/ingredients/${strIngredient1}-Small.png` }
          />
        </Link>
      )).slice(0, MAX_CARDS);
    }
  }

  return (
    <div>
      <Header title="Explore Ingredients" />
      { renderCards() }
      <Footer />
    </div>
  );
}

ExploreFoodsIngredients.defaultProps = {
  page: 'foods',
};

ExploreFoodsIngredients.propTypes = {
  page: string,
  history: shape({
    push: func.isRequired,
  }).isRequired,
};

export default ExploreFoodsIngredients;
