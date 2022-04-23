import { string } from 'prop-types';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Card from '../components/Card';
import ContextDrinks from '../Context/contextDrinks/ContextDrinks';
import ContextFoods from '../Context/contextFoods/ContextFoods';
import FilterCategory from '../components/FilterCategory';
import Header from '../components/Header';
import '../Page.css';

function Foods(props) {
  const MAX_CARD = 12;
  const { dataDrinks } = useContext(ContextDrinks);
  const { dataFoods } = useContext(ContextFoods);
  const { page } = props;

  function renderCardFoods(max = MAX_CARD) {
    if (dataFoods.length > 0) {
      return (
        dataFoods.map(
          ({ strMealThumb, strMeal, idMeal }, i) => (
            <Link
              key={ i }
              to={ `/${page}/${idMeal}` }
            >
              <Card
                index={ i }
                strMealThumb={ strMealThumb }
                strMeal={ strMeal }
                data-testid={ `${i}-recipe-card` }
              />
            </Link>
          ),
        ).slice(0, max)
      );
    }
  }

  function renderCardDrinks(max = MAX_CARD) {
    if (dataDrinks.length > 0) {
      return (
        dataDrinks.map(
          ({ strDrinkThumb, strDrink, idDrink }, i) => (
            <Link
              key={ i }
              to={ `/${page}/${idDrink}` }
            >
              <Card
                index={ i }
                strDrinkThumb={ strDrinkThumb }
                strDrink={ strDrink }
              />
            </Link>
          ),
        ).slice(0, max)
      );
    }
  }

  if (page === 'foods') {
    return (
      <div className="page-total">
        <Header title="Foods" page={ page } searchButtonEnabled />
        <br />
        <FilterCategory page={ page } />
        <section className="recipes">
          {
            renderCardFoods()
          }
        </section>
        <Footer />
      </div>
    );
  }

  if (page === 'drinks') {
    return (
      <div>
        <Header title="Drinks" page={ page } searchButtonEnabled />
        <br />
        <FilterCategory page={ page } />
        <section className="recipes">
          {
            renderCardDrinks()
          }
        </section>
        <Footer />
      </div>
    );
  }
}

Foods.defaultProps = {
  page: 'foods',
};

Foods.propTypes = {
  page: string,
};

export default Foods;
