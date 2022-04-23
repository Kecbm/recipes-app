import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

//  https://productoversee.com/colocar-rodape-fixo-no-bottom/

const obj = {
  position: 'fixed',
  bottom: 0,
  width: '100%',
  textAlign: 'center',
  display: 'flex',
  justifyContent: 'space-between',
  backgroundColor: '#CC4B1D',
};

const objButton = {
  backgroundColor: '#CC4B1D',
  border: '1px solid transparent',
};

const footerStyle = obj;

function Footer() {
  return (
    <footer data-testid="footer" style={ footerStyle }>
      <button
        type="button"
        data-testid="drinks-bottom-btn"
        src={ drinkIcon }
        style={ objButton }
      >
        <Link to="/drinks"><img src={ drinkIcon } alt="drinkIcon" /></Link>
      </button>

      <button
        type="button"
        data-testid="explore-bottom-btn"
        src={ exploreIcon }
        style={ objButton }
      >
        <Link to="/explore"><img src={ exploreIcon } alt="exploreIcon" /></Link>
      </button>

      <button
        type="button"
        data-testid="food-bottom-btn"
        src={ mealIcon }
        style={ objButton }
      >
        <Link to="/foods"><img src={ mealIcon } alt="mealIcon" /></Link>
      </button>
    </footer>
  );
}

export default Footer;
