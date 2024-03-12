import React from 'react';
import ReactDOM from 'react-dom';
import hypernova, { load } from 'hypernova';

const renderReactClient = (name, component) => {
  const payloads = load(name);

  if (payloads) {
    payloads.forEach((payload) => {
      const { node, data } = payload;
      const element = React.createElement(component, data);

      if (ReactDOM.hydrate) {
        ReactDOM.hydrate(element, node);
      } else {
        ReactDOM.render(element, node);
      }
    });
  }

  return component;
};

const renderReact = (name, component) => hypernova({
  server() {},

  client() {
    return renderReactClient(name, component);
  },
});

/* istanbul ignore next */
const renderReactStatic = () => hypernova({
  server() {},

  client() {},
});

export {
  renderReactClient,
  renderReact,
  renderReactStatic,
};
