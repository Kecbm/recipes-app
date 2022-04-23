import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const obj = {
  margin: '60px',
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
};

const emailStyle = obj;

const objDiv = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const divStyle = objDiv;

const objButton = {
  width: '300px',
  backgroundColor: '#ffc107',
  textAlign: 'center',
  margin: '10px',
  borderRadius: '5px',
  padding: '10px',
  border: '1px solid transparent',
  color: '#212529',
  borderColor: '#ffc107',
};

const buttonStyle = objButton;

function Profile() {
  const { email } = JSON.parse(localStorage.getItem('user')) || { email: '' };

  return (
    <div>
      <Header title="Profile" />
      <h2 data-testid="profile-email" style={ emailStyle }>{email}</h2>
      <div style={ divStyle }>
        <Link to="/favorite-recipes">
          <button
            data-testid="profile-favorite-btn"
            type="button"
            style={ buttonStyle }
          >
            Favorite Recipes
          </button>
        </Link>
        <Link to="/">
          <button
            data-testid="profile-logout-btn"
            type="button"
            onClick={ () => localStorage.clear() }
            style={ buttonStyle }
          >
            Logout
          </button>
        </Link>
      </div>
      <Footer />
    </div>);
}

export default Profile;
