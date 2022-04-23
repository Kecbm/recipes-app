import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import ContextFoods from '../Context/contextFoods/ContextFoods';
import Card from '../components/Card';
// import FilterCategory from '../components/FilterCategory';
import Footer from '../components/Footer';
import { fetchFilterbyArea } from '../services/FetchFoods';

const objSelect = {
  width: '300px',
  backgroundColor: '#ffc107',
  textAlign: 'center',
  margin: '30px',
  borderRadius: '5px',
  padding: '10px',
  color: '#212529',
  borderColor: '#ffc107',
  border: '1px solid transparent',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
};

const selectStyle = objSelect;

function ExploreFoodsNationalities() {
  const { dataFoods, setDataFoods, setFoodsDefault } = useContext(ContextFoods);
  // req 78
  const [dataNacionalidades, setDataNacionalidades] = useState([]);
  const [fildSelect, setFildSelect] = useState('');

  useEffect(() => {
    (async () => {
      const resp = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
      const { meals } = await resp.json();
      setDataNacionalidades([...meals, { strArea: 'All' }]);
      setFildSelect(meals[0].strArea);
    })();
  }, []);

  async function handleSelect({ target: { value } }) {
    setFildSelect(value);
    if (value === 'All') {
      setFoodsDefault();
    } else {
      const { meals } = await fetchFilterbyArea(value);
      console.log('data', meals);
      setDataFoods(meals);
    }
  }

  function dropDown() {
    return (
      <select
        value={ fildSelect }
        onChange={ handleSelect }
        data-testid="explore-by-nationality-dropdown"
        style={ selectStyle }
      >
        {dataNacionalidades.map(({ strArea }, i) => (
          <option
            key={ i }
            name={ strArea }
            data-testid={ `${strArea}-option` }
            value={ strArea }
          >
            {strArea}
          </option>
        ))}
      </select>
    );
  }
  const MAX = 12;

  return (
    <div>
      <Header
        title="Explore Nationalities"
        searchButtonEnabled
        exploreSearch={ fildSelect }
        page="foods"
      />
      {dropDown()}
      {/* <FilterCategory /> */}
      {dataFoods.map(
        ({ strMealThumb, strMeal, idMeal }, i) => (
          <Link
            to={ `/foods/${idMeal}` }
            key={ i }
          >
            <Card
              index={ i }
              strMealThumb={ strMealThumb }
              strMeal={ strMeal }
              data-testid={ `${i}-recipe-card` }
            />
          </Link>
        ),
      ).slice(0, MAX)}
      <Footer />
    </div>
  );
}

export default ExploreFoodsNationalities;
