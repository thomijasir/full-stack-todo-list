import React from 'react';
import renderer from 'react-test-renderer';
import App from './App';

test('Render Login Page', () => {
  const element = renderer.create(<App />).toJSON();
  expect(element).toMatchSnapshot();
});
