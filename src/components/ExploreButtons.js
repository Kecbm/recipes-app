import React, { useEffect, useState } from 'react';
import { string } from 'prop-types';
import { Link } from 'react-router-dom';

const objDiv = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  margin: '50px',
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

function ExploreButtons(props) {
  const { page } = props;

  const [idRandom, setIdRandom] = useState('');

  async function getRandomId() {
    if (page === 'foods') {
      const resp = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
      const data = await resp.json();
      const { meals: [{ idMeal }] } = data;
      setIdRandom(idMeal);
    }
    if (page === 'drinks') {
      const resp = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
      const data = await resp.json();
      const { drinks: [{ idDrink }] } = data;
      setIdRandom(idDrink);
    }
  }

  useEffect(() => {
    getRandomId();
  }, []);

  if (page === 'drinks' || page === 'foods') {
    return (
      <div
        style={ divStyle }
      >
        <Link to={ `/explore/${page}/ingredients` }>
          <button
            data-testid="explore-by-ingredient"
            type="button"
            style={ buttonStyle }
          >
            By Ingredient
          </button>
        </Link>
        {(page !== 'drinks') && (
          <Link to={ `/explore/${page}/nationalities` }>
            <button
              data-testid="explore-by-nationality"
              type="button"
              style={ buttonStyle }
            >
              By Nationality
            </button>
          </Link>
        )}
        <Link to={ `/${page}/${idRandom}` }>
          <button
            data-testid="explore-surprise"
            type="button"
            style={ buttonStyle }
          >
            Surprise me!
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Link to="/explore/foods">
        <button data-testid="explore-foods" type="button">Explore Foods</button>
      </Link>
      <Link to="/explore/drinks">
        <button data-testid="explore-drinks" type="button">Explore Drinks</button>
      </Link>
    </div>
  );
}

ExploreButtons.defaultProps = {
  page: 'explore',
};

ExploreButtons.propTypes = {
  page: string,
};

export default ExploreButtons;
