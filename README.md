| :exclamation: Deprecation Notice |
|:-|
|We want to express our sincere gratitude for your support and contributions to the Hypernova open source project. As we are no longer using this technology internally, we have come to the decision to archive the Hypernova repositories. While we won't be providing further updates or support, the existing code and resources will remain accessible for your reference. We encourage anyone interested to fork the repository and continue the project's legacy independently. Thank you for being a part of this journey and for your patience and understanding.|
---

# hypernova-react

[React](https://github.com/facebook/react) bindings for [Hypernova](https://github.com/airbnb/hypernova).

On the server, wraps the component in a function to render it to a HTML string given its props.

On the client, calling this function with your component scans the DOM for any server-side rendered instances of it. It then resumes those components using the server-specified props.

## Install

```sh
npm install hypernova-react
```

## Usage

Here's how to use it in your module:

```js
import { renderReact } from 'hypernova-react';
import MyComponent from './src/MyComponent.jsx';

export default renderReact(
  'MyComponent.hypernova.js', // this file's name (or really any unique name)
  MyComponent,
);
```

If you want to [render a static page, 
as stripping away the extra attributes can save some bytes](https://reactjs.org/docs/react-dom-server.html#rendertostaticmarkup), `renderReactStatic` is what you want.
