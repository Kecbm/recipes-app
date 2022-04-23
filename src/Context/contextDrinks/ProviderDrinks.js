import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import ContextDrinks from './ContextDrinks';

function ProviderDrinks({ children }) {
  const [dataDrinks, setDataDrinks] = useState([]);
  const [drinkDetails, setDrinkDetails] = useState([]);
  const [recommended, setRecommended] = useState({});
  async function setDrinksDefault() {
    const resp = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const { drinks } = await resp.json();
    setDataDrinks(drinks);
  }
  useEffect(() => {
    setDrinksDefault();
  }, []);

  return (
    <ContextDrinks.Provider
      value={ {
        dataDrinks,
        setDataDrinks,
        setDrinksDefault,
        drinkDetails,
        setDrinkDetails,
        recommended,
        setRecommended,
      } }
    >
      {children}
    </ContextDrinks.Provider>
  );
}

ProviderDrinks.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProviderDrinks;
