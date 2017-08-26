const React = require('react');
const PropTypes = require('prop-types');

function ExampleReactComponent(props) {
  const name = ['Hello', props.name];
  return React.createElement('div', { id: 'example' }, name.join(' '));
}

ExampleReactComponent.propTypes = {
  name: PropTypes.string,
};
ExampleReactComponent.defaultProps = {
  name: '',
};

module.exports = ExampleReactComponent;
