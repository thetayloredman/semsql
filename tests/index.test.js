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

try {
    fs.rmSync('./tests/tests-db.db');
} catch (e) {}

const db = new semsql('./tests/tests-db.db');

describe('CREATE', () => {
    describe('TABLE', () => {
        it('complains about running without a trust intent', () => {
            expect(() => db.CREATE.TABLE('test')(['foo', 'TEXT', 'NOT NULL'])).toThrow(
                new Error(
                    'Attempt to call CREATE TABLE without a trust intent. In order to use CREATE TABLE, you need to wrap the function call in <db>.trustQuery(). This is to prevent SQL injections. Code passed into CREATE TABLE cannot be parameterized and can be injected.'
                )
            );
        });
        it('can create with 1 column', () => {
            db.trustQuery(() => {
                db.CREATE.TABLE('test2')(['foo', 'TEXT', 'NOT NULL']);
            });
        });
        it('can create with 2 columns', () => {
            db.trustQuery(() => {
                db.CREATE.TABLE('test3')(['foo', 'TEXT', 'NOT NULL'], ['bar', 'TEXT']);
            });
        });
    });
});
