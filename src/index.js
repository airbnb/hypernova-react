import hypernova from 'hypernova';
import { renderReactClient } from './client';
import { renderReactServer, renderReactStaticServer } from './server';

export const renderReact = (name, component) => hypernova({
  server() {
    return renderReactServer(name, component);
  },

  client() {
    return renderReactClient(name, component);
  },
});

export const renderReactStatic = (name, component) => hypernova({
  server() {
    return renderReactStaticServer(name, component);
  },

  client() {},
});
