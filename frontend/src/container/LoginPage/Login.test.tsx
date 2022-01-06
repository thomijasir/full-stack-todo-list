import React from 'react';
import renderer from 'react-test-renderer';
import LoginPage from './Login.page';

test('Render Login Page', () => {
  const element = renderer.create(<LoginPage />).toJSON();
  expect(element).toMatchSnapshot();
});
