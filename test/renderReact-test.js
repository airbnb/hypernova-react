import jsdom from 'jsdom';
import { assert } from 'chai';
import sinon from 'sinon';

import ExampleReactComponent from './components/ExampleReactComponent';
import { renderReact } from '..';
import * as renderReactClientModule from '../lib/client';
import * as renderReactServerModule from '../lib/server';

describe('renderReact', () => {
  it('exists', () => {
    assert.isFunction(renderReact);
    assert.equal(renderReact.length, 2);
  });

  it('calls renderReactServer', () => {
    const renderReactServerSpy = sinon.spy(renderReactServerModule, 'renderReactServer');

    renderReact('ExampleReactComponent', ExampleReactComponent)({ name: 'Desmond' });

    assert(renderReactServerSpy.calledOnce, `renderReactServer was not called once but ${renderReactServerSpy.callCount} times`);

    renderReactServerSpy.restore();
  });

  it('calls renderReactClient', (done) => {
    const result = renderReact('ExampleReactComponent', ExampleReactComponent)({ name: 'Desmond' });

    jsdom.env(result, (err, window) => {
      if (err) {
        done(err);
        return;
      }

      const renderReactClientSpy = sinon.spy(renderReactClientModule, 'renderReactClient');

      global.window = window;
      global.document = window.document;

      // Calling it again for the client.
      renderReact('ExampleReactComponent', ExampleReactComponent);

      assert(renderReactClientSpy.calledOnce, `renderReactClient was not called once but ${renderReactClientSpy.callCount} times`);

      renderReactClientSpy.restore();

      delete global.window;
      delete global.document;

      done();
    });
  });
});
