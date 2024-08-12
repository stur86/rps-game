import { expect, test } from 'bun:test';
import { maxIndex } from './utils';

test('maxIndex', () => {
    expect(maxIndex([0.1, 0.2, 0.3, 0.2, 0.1])).toBe(2);
    expect(maxIndex([0.1, 0.2, 0.3, 0.3, 0.1])).toBeOneOf([2, 3]);
    expect(maxIndex([0.1, 0.2, 0.3, 0.3, 0.4])).toBe(4);
});