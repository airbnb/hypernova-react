import { assert } from 'chai';

import ExampleReactComponent from './components/ExampleReactComponent';
import { renderReactStatic } from '..';

describe('renderReactStatic', () => {
  let result;
  beforeEach(() => {
    result = renderReactStatic('ExampleReactComponent', ExampleReactComponent)({ name: 'Zack' });
  });

  it('exists', () => {
    assert.isFunction(renderReactStatic);
    assert.equal(renderReactStatic.length, 2);
  });

  it('has correct markup on server', () => {
    assert.isString(result);
    assert.match(result, /Hello Zack/);
  });
});
