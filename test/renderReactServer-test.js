import { assert } from 'chai';

import ExampleReactComponent from './components/ExampleReactComponent';
import { renderReact, renderReactServer } from '../lib/server';

describe('server renderReact', () => {
  let result;
  beforeEach(() => {
    result = renderReact('ExampleReactComponent', ExampleReactComponent)({ name: 'Desmond' });
  });

  it('exists', () => {
    assert.isFunction(renderReact);
    assert.equal(renderReact.length, 2);
  });

  it('exists', () => {
    assert.isFunction(renderReactServer);
    assert.equal(renderReactServer.length, 2);
  });

  it('has correct markup', () => {
    assert.isString(result);
    assert.match(result, /Hello Desmond/);
  });
});
