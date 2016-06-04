import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import hypernova, { serialize, load } from 'hypernova';

export const renderReact = (name, component) => hypernova({
  server() {
    return (props) => {
      const contents = ReactDOMServer.renderToString(React.createElement(component, props));
      return serialize(name, contents, props);
    };
  },

  client() {
    const { node, data } = load(name);

    if (node) {
      const element = React.createElement(component, data);
      ReactDOM.render(element, node);
    }

    return component;
  },
});

export const renderReactStatic = (name, component) => hypernova({
  server() {
    return props => ReactDOMServer.renderToStaticMarkup(React.createElement(component, props));
  },

  client() {},
});
