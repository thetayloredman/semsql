/**
 * semsql
 * Copyright (C) 2020  BadBoyHaloCat
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

const semsql = require('../dist/index').default;
const fs = require('fs');

afterAll(() => {
    try {
        fs.rmSync('./tests/tests-db.db');
    } catch (e) {}
});

const db = new semsql('./tests/tests-db.db');

describe('CREATE', () => {
    describe('TABLE', () => {
        it('can create with 1 column', () => {
            db.CREATE.TABLE('test2')(['foo', 'TEXT', 'NOT NULL']);
        });
        it('can create with 2 columns', () => {
            db.CREATE.TABLE('test3')(['foo', 'TEXT', 'NOT NULL'], ['bar', 'TEXT']);
        });
    });
});

describe('INSERT', () => {
    describe('INTO', () => {
        it('can insert 1 value', () => {
            db.INSERT.INTO('test2').VALUES(['hello']);
        });
        it('can insert 2 values', () => {
            db.INSERT.INTO('test3').VALUES(['hello', 'world']);
        });
    });
});

describe('SELECT', () => {
    describe('*', () => {
        it('works', () => {
            expect(db.SELECT('*').FROM('test3')).toEqual([{ foo: 'hello', bar: 'world' }]);
        });
    });
    describe('single column', () => {
        it('works', () => {
            expect(db.SELECT('foo').FROM('test3')).toEqual([{ foo: 'hello' }]);
        });
    });
    describe('many columns', () => {
        it('works', () => {
            expect(db.SELECT('foo', 'bar').FROM('test3')).toEqual([{ foo: 'hello', bar: 'world' }]);
        });
    });
});
