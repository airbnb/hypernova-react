const React = require('react');
const PropTypes = require('prop-types');

function ExampleReactComponent({ name }) {
  const hi = ['Hello', name];
  return React.createElement('div', { id: 'example' }, hi.join(' '));
}

ExampleReactComponent.propTypes = {
  name: PropTypes.string,
};
ExampleReactComponent.defaultProps = {
  name: '',
};

module.exports = ExampleReactComponent;
