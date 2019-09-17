var assert = require('assert');

function process(array){
    array = array.sort((a,b) => a - b);
    return [ ...new Set( array ) ];
}

function diff(array1, array2) {
    if (!Array.isArray(array1) || !Array.isArray(array2)) {
        throw Error('diff的两个参数必须是数组')
    }

    let cache = new Map(),
        diff = [];

    for (let i = 0, length = array1.length; i < length; i++) {
        let element = array1[i];
        if (Array.isArray(element)) {
            element = process(element);
        }
        cache.set(JSON.stringify(element), 1);
    }

    for (let i = 0, length = array2.length; i < length; i++) {

        let element = array2[i];
        if (Array.isArray(element)) {
            element = process(element);
        }
        element = JSON.stringify(element);

        if (cache.has(element)) {
            let value = cache.get(element);
            cache.set(element, ++value);
        } else {
            cache.set(element, 1);
        }
    }

    let entries = cache.entries();
    for (let [key, value] of entries) {
        if (value === 1) {
            diff.push(key.includes('[') ? JSON.parse(key) : parseInt(key));
        }
    }

    return diff;

}

describe('diff([1,2],[2,1])的结果为', () => it('[]', () => assert.equal(diff([1,2],[2,1]).length, 0)));

describe('diff([1, 2, 1], [2, 1, 1, 2])的结果为', () => it('[]', () => assert.equal(diff([1, 2, 1], [2, 1, 1, 2]).length, 0)));

describe('diff([1, [2, 3], 4], [[1, 2], [2, 3], 3, 4])的结果为', () => it('[1, [1, 2], 3]', () => assert.equal(diff(diff([1, [2, 3], 4], [[1, 2], [2, 3], 3, 4]), [1,[1,2],3]).length, 0)));

describe('diff([[1,2,3],[3,2,1],1,2,3], [2,3,1])的结果为', () => it('[[1,2,3],[3,2,1]]', () => assert.equal(diff(diff([[1,2,3],[3,2,1],1,2,3], [2,3,1]), [[1,2,3],[3,2,1]]).length, 0)));

