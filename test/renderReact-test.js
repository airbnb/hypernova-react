import jsdom from 'jsdom';
import { assert } from 'chai';
import sinon from 'sinon';
import ReactDOM from 'react-dom';
import ifReact from 'enzyme-adapter-react-helper/build/ifReact';

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

      delete global.window;
      delete global.document;

      hydrateMethod.restore();

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

      delete global.window;
      delete global.document;

      done();
    });
  });
});
