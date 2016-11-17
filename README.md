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
