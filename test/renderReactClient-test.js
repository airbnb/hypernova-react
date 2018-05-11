import jsdom from 'jsdom';
import { assert } from 'chai';
import sinon from 'sinon';
import ReactDOM from 'react-dom';
import ifReact from 'enzyme-adapter-react-helper/build/ifReact';

import ExampleReactComponent from './components/ExampleReactComponent';
import { renderReactServer } from '../lib/server';
import { renderReact, renderReactClient } from '../lib/client';

describe('client', () => {
  let result;
  beforeEach(() => {
    result = renderReactServer('ExampleReactComponent', ExampleReactComponent)({ name: 'Desmond' });

    assert.isString(result);
    assert.match(result, /Hello Desmond/);
  });

  it('renderReact exists', () => {
    assert.isFunction(renderReact);
    assert.equal(renderReact.length, 2);
  });

  it('renderReactClient exists', () => {
    assert.isFunction(renderReactClient);
    assert.equal(renderReactClient.length, 2);
  });

  ifReact('>= 16', it, it.skip)('calls hypernova.client (hydrate method)', (done) => {
    jsdom.env(result, (err, window) => {
      if (err) {
        done(err);
        return;
      }

      global.window = window;
      global.document = window.document;

      const hydrateMethod = sinon.spy(ReactDOM, 'hydrate');

      // Calling it again for the client.
      renderReact('ExampleReactComponent', ExampleReactComponent);

      assert(hydrateMethod.calledOnce);

      hydrateMethod.restore();

      delete global.window;
      delete global.document;

      done();
    });
  });

  it('calls hypernova.client (render method)', (done) => {
    jsdom.env(result, (err, window) => {
      if (err) {
        done(err);
        return;
      }

      const sandbox = sinon.createSandbox();
      if (ReactDOM.hydrate) {
        sandbox.stub(ReactDOM, 'hydrate').value(undefined);
      }

      const renderMethod = sinon.spy(ReactDOM, 'render');

      global.window = window;
      global.document = window.document;

      // Calling it again for the client.
      renderReact('ExampleReactComponent', ExampleReactComponent);

      assert(renderMethod.calledOnce);

      sandbox.restore();
      renderMethod.restore();

      delete global.window;
      delete global.document;

      done();
    });
  });
});
