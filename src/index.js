import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { renderToString } from "react-dom/server";
import hypernova, { load, serialize } from "hypernova";

export const renderReact = (name, component) =>
  hypernova({
    server() {
      return (props) => {
        const contents = renderToString(React.createElement(component, props));
        return serialize(name, contents, props);
      };
    },

    client() {
      const payloads = load(name);

      if (payloads) {
        payloads.forEach((payload) => {
          const { node, data } = payload;
          const element = React.createElement(component, data);

          if (hydrateRoot) {
            hydrateRoot(node, element);
          } else {
            createRoot(node).render(element);
          }
        });
      }

      return component;
    },
  });
