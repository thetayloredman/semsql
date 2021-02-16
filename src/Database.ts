/* eslint-disable no-use-before-define */
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

import sqlite from 'better-sqlite3';
import chalk from 'chalk';

type DBColumnOptions = [string, ...string[]];

interface CREATEStatement {
    TABLE: (name: string) => CREATE_TABLECaller;
}
type CREATE_TABLECaller = (...columns: DBColumnOptions[]) => void;

export default class Database {
    public constructor(dbFile = './data/semsql.db') {
        this.file = dbFile;
        this.db = new sqlite(dbFile);

        // init props of non-callables
        this.CREATE = {
            TABLE: (name: string) => {
                // TODO: only need trustQuery on unsafe queries (those that contain characters that can escape the SQL query)
                // yes, this is a sql injection possibility, hence we look at globalThis.__semsql__safeQuery.
                return (...columns: DBColumnOptions[]) => {
                    // @ts-ignore
                    if (global.__semsql__safeQuery) {
                        // parse columns
                        let initStr = `CREATE TABLE '${name}' (`;

                        for (let i = 0; i < columns.length; i++) {
                            const column = columns[i];
                            initStr += `${column[0]} ${column[1]}`;
                            for (const option of columns.slice(2)) {
                                initStr += ` ${option}`;
                            }
                            if (i !== columns.length - 1) {
                                // avoid trailing commas
                                initStr += ',';
                            }
                        }

                        initStr += ');';
                        this.db.exec(initStr);
                    } else {
                        throw new Error(
                            'Attempt to call CREATE TABLE without a trust intent. In order to use CREATE TABLE, you need to wrap the function call in <db>.trustQuery(). This is to prevent SQL injections. Code passed into CREATE TABLE cannot be parameterized and can be injected.'
                        );
                    }
                };
            }
        };
    }

    public file: string;
    public db: sqlite.Database;

    public trustQuery(fn: (...params: any[]) => any): any {
        // @ts-ignore
        global.__semsql__safeQuery = true;
        fn();
        // @ts-ignore
        global.__semsql__safeQuery = false;
    }

    // non-callables
    public CREATE: CREATEStatement;
}
