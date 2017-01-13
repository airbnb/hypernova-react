const React = require('react');

function ExampleReactComponent(props) {
  const name = ['Hello', props.name];
  return React.createElement('div', { id: 'example' }, name.join(' '));
}

ExampleReactComponent.propTypes = {
  name: React.PropTypes.string,
};
ExampleReactComponent.defaultProps = {
  name: '',
};

module.exports = ExampleReactComponent;
