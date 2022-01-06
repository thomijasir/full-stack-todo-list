import React from 'react';
import renderer from 'react-test-renderer';
import Dashboard from './Dashboard.page';

test('Render Dashboard Page', () => {
  const element = renderer.create(<Dashboard />).toJSON();
  expect(element).toMatchSnapshot();
});
