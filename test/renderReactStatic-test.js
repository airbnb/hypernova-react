import { assert } from 'chai';
import sinon from 'sinon';

import ExampleReactComponent from './components/ExampleReactComponent';
import { renderReactStatic } from '..';
import * as renderReactServerModule from '../lib/server';

describe('renderReactStatic', () => {
  it('exists', () => {
    assert.isFunction(renderReactStatic);
    assert.equal(renderReactStatic.length, 2);
  });

  it('calls renderReactStaticServer', () => {
    const renderReactStaticServerSpy = sinon.spy(renderReactServerModule, 'renderReactStaticServer');

    renderReactStatic('ExampleReactComponent', ExampleReactComponent)({ name: 'Desmond' });

    assert(renderReactStaticServerSpy.calledOnce, `renderReactServer was not called once but ${renderReactStaticServerSpy.callCount} times`);

    renderReactStaticServerSpy.restore();
  });
});
