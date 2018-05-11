import React from 'react';
import ReactDOMServer from 'react-dom/server';
import hypernova, { serialize } from 'hypernova';

const renderReactServer = (name, component) => (props) => {
  const contents = ReactDOMServer.renderToString(React.createElement(component, props));
  return serialize(name, contents, props);
};

const renderReactStaticServer = (name, component) => props =>
  ReactDOMServer.renderToStaticMarkup(React.createElement(component, props));

const renderReact = (name, component) => hypernova({
  server() {
    return renderReactServer(name, component);
  },

  client() {},
});

const renderReactStatic = (name, component) => hypernova({
  server() {
    return renderReactStaticServer(name, component);
  },

  client() {},
});

export {
  renderReactServer,
  renderReactStaticServer,
  renderReact,
  renderReactStatic,
};
