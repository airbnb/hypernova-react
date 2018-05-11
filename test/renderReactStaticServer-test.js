import { assert } from 'chai';

import ExampleReactComponent from './components/ExampleReactComponent';
import { renderReactStatic } from '../lib/server';

describe('server renderReactStatic', () => {
  it('exists', () => {
    assert.isFunction(renderReactStatic);
    assert.equal(renderReactStatic.length, 2);
  });

  it('has correct markup', () => {
    const result = renderReactStatic('ExampleReactComponent', ExampleReactComponent)({ name: 'Zack' });

    assert.isString(result);
    assert.match(result, /Hello Zack/);
  });
});
