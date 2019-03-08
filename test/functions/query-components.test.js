const test = QUnit.test;

QUnit.module('querying');

import { writeSearchToQuery } from '../../src/query-components.js';

test('write search to empty query', assert => {
    // arrange
    const existingQuery = '';
    const searchOptions = {
        state: 'colorado',
        city: 'denver',
        type: 'brewpub'
    };
    // act
    const results = writeSearchToQuery(existingQuery, searchOptions);
    // assert
    assert.equal(results, 'by_state=colorado&by_city=denver&by_type=brewpub');
});

test('replace existing query', assert => {
    // arrange
    const existingQuery = 'by_state=&by_city=portland&by_type=micro';
    const searchOptions = {
        state: '',
        city: 'seattle',
        type: 'regional'
    };
    // act
    const results = writeSearchToQuery(existingQuery, searchOptions);
    // assert
    assert.equal(results, 'by_state=&by_city=seattle&by_type=regional');
});

import { writePageToQuery } from '../../src/query-components.js';

test('write page to query', assert => {
    // arrange
    const page = 3;
    const existingQuery = 'by_state=&by_city=&by_type=';
    // act
    const results = writePageToQuery(existingQuery, page);
    // assert
    assert.equal(results, 'by_state=&by_city=&by_type=&page=3');
});

import { readFromQuery } from '../../src/query-components.js';

test('reading query all', assert => {
    // arrange
    const existingSearchQuery = 'by_state=washington&by_city=seattle&by_type=regional';
    const expected = {
        state: 'washington',
        city: 'seattle',
        type: 'regional'
    };
    // act
    const results = readFromQuery(existingSearchQuery);
    // assert
    assert.deepEqual(results, expected);
});

test('reading query missing', assert => {
    // arrange
    const existingSearchQuery = 'by_state=washington&by_city=&by_type=regional';
    const expected = {
        state: 'washington',
        city: '',
        type: 'regional'
    };
    // act
    const results = readFromQuery(existingSearchQuery);
    // assert
    assert.deepEqual(results, expected);
});