import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import ContextFoods from './ContextFoods';

function ProviderFoods({ children }) {
  const [dataFoods, setDataFoods] = useState([]);
  const [foodDetails, setFoodDetails] = useState([]);
  const [recommended, setRecommended] = useState([]);

  async function setFoodsDefault() {
    const resp = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const { meals } = await resp.json();
    setDataFoods(meals);
  }

  useEffect(() => {
    setFoodsDefault();
  }, []);

  return (
    <ContextFoods.Provider
      value={ {
        dataFoods,
        setDataFoods,
        setFoodsDefault,
        foodDetails,
        setFoodDetails,
        recommended,
        setRecommended,
      } }
    >
      {children}
    </ContextFoods.Provider>
  );
}

ProviderFoods.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProviderFoods;
