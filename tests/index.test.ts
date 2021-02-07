import { expect } from 'chai';
import { Vector2 } from 'three';

describe('example tests', function () {
    it('example test', function () {
        const vec1 = new Vector2(5, 10);
        const vec2 = new Vector2(5, 10);
        const res = vec1.add(vec2);
        expect(res.x).equal(10);
        expect(res.y).equal(20);
    });
});
