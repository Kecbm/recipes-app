import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

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

function Explore() {
  return (
    <div>
      <Header title="Explore" />
      <div style={ divStyle }>
        <Link to="/explore/foods">
          <button
            data-testid="explore-foods"
            type="button"
            style={ buttonStyle }
          >
            Explore Foods
          </button>
        </Link>
        <Link to="/explore/drinks">
          <button
            data-testid="explore-drinks"
            type="button"
            style={ buttonStyle }
          >
            Explore Drinks
          </button>
        </Link>
      </div>
      <Footer />
    </div>
  );
}

export default Explore;
