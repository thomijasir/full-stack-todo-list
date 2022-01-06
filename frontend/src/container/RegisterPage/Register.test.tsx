import React from 'react';
import renderer from 'react-test-renderer';
import RegisterPage from './Register.page';

test('Render Register Page', () => {
  const element = renderer.create(<RegisterPage />).toJSON();
  expect(element).toMatchSnapshot();
});
