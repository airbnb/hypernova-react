import React from 'react';
import ReactDOM from 'react-dom';
import hypernova, { load } from 'hypernova';

export const renderReact = (name, component) => hypernova({
  server() {},

  client() {
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
  },
});

export const renderReactStatic = () => hypernova({
  server() {},

  client() {},
});
