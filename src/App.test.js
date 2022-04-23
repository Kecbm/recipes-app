import React from 'react';
//  import { render } from '@testing-library/react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from './App';
import Explore from './pages/Explore';
import userEvent from '@testing-library/user-event';
import DetailFood from './pages/DetailFood';

/* test('Farewell, front-end', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/TRYBE/i);
  expect(linkElement).toBeInTheDocument();
}) */

describe('Testando o componente Footer', () => {
  it('19 - Testa os elementos do menu inferior de acordo com os atributos', () => {
    renderWithRouter(<Explore />);

    const div = screen.getByTestId('footer');
    const drinksButton = screen.getByTestId('drinks-bottom-btn');
    const explorerButton = screen.getByTestId('explore-bottom-btn');
    const foodButton = screen.getByTestId('food-bottom-btn');

    expect(div && drinksButton && explorerButton && foodButton).toBeInTheDocument();
  });

  it('20 - Testa se o menu inferior está fixo e apresente 3 ícones: um para comidas, um para bebidas e outro para exploração', () => {
    const { getByAltText } = renderWithRouter(<Explore />);

    const drinkSvg = getByAltText('drinkIcon');
    expect(drinkSvg.src).toContain('http://localhost/drinkIcon.svg');

    const exploreSvg = getByAltText('exploreIcon');
    expect(exploreSvg.src).toContain('http://localhost/exploreIcon.svg');

    const mealSvg = getByAltText('mealIcon');
    expect(mealSvg.src).toContain('http://localhost/mealIcon.svg');
  });

  it('22 - Testa se a pessoa usuária é redirecionada para uma lista de cocktails ao clicar no ícone de bebidas', () => {
    const { history, getByAltText } = renderWithRouter(<Explore />);
    const drinkSvg = getByAltText('drinkIcon');
    expect(drinkSvg).toBeInTheDocument();
    userEvent.click(drinkSvg);

    const { pathname } = history.location;
    expect(pathname).toBe('/drinks');
  });

  it('23 - Testa se a pessoa usuária é redirecionada para uma tela de explorar ao clicar no ícone de exploração', () => {
    const { history, getByAltText } = renderWithRouter(<Explore />);
    const exploreSvg = getByAltText('exploreIcon');
    expect(exploreSvg).toBeInTheDocument();
    userEvent.click(exploreSvg);

    const { pathname } = history.location;
    expect(pathname).toBe('/explore');
  });

  it('24 - Testa se a pessoa usuária é redirecioada para uma lista de comidas ao clicar no ícone de comidas', () => {
    const { history, getByAltText } = renderWithRouter(<Explore />);
    const mealSvg = getByAltText('mealIcon');
    expect(mealSvg).toBeInTheDocument();
    userEvent.click(mealSvg);

    const { pathname } = history.location;
    expect(pathname).toBe('/foods');
  });
});
