import jsdom from 'jsdom';
import { assert } from 'chai';

import ExampleReactComponent from './components/ExampleReactComponent';
import { renderReact } from '..';

describe('renderReact', () => {
  let result;
  beforeEach(() => {
    result = renderReact('ExampleReactComponent', ExampleReactComponent)({ name: 'Desmond' });
  });

  it('exists', () => {
    assert.isFunction(renderReact);
    assert.equal(renderReact.length, 2);
  });

  it('has correct markup on server', () => {
    assert.isString(result);
    assert.match(result, /Hello Desmond/);
  });

  it('calls hypernova.client', (done) => {
    jsdom.env(result, (err, window) => {
      if (err) {
        done(err);
        return;
      }

      global.window = window;
      global.document = window.document;

      // Calling it again for the client.
      renderReact('ExampleReactComponent', ExampleReactComponent);

      delete global.window;
      delete global.document;

      done();
    });
  });
});
