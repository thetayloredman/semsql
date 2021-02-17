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

type DBColumnOptions = [string, ...string[]];

interface CREATEStatement {
    TABLE: (name: string) => CREATE_TABLECaller;
}
type CREATE_TABLECaller = (...columns: DBColumnOptions[]) => void;

interface INSERTStatement {
    INTO: (name: string) => { VALUES: INSERT_INTOCaller };
    // TODO: add INSERT OR REPLACE INTO
}
type INSERT_INTOCaller = (params: any[]) => void;

type SELECT_FROMStatement = {
    FROM: (table: string, whereCall?: { WHERE: [string, '=' | '!=' | '>' | '>=' | '<' | '<=', any][] }) => { [column: string]: any };
};

export default class Database {
    public constructor(dbFile = './data/semsql.db') {
        this.file = dbFile;
        this.db = new sqlite(dbFile);

        // init props of non-callables
        this.CREATE = {
            TABLE: (name: string) => {
                return (...columns: DBColumnOptions[]) => {
                    // parse columns
                    let initStr = `CREATE TABLE "${this._sanitize(name)}" (`;

                    for (let i = 0; i < columns.length; i++) {
                        const column = columns[i];
                        initStr += `"${this._sanitize(column[0])}" "${this._sanitize(column[1])}"`;
                        for (const option of column.slice(2)) {
                            initStr += ` "${this._sanitize(option)}"`;
                        }
                        if (i !== columns.length - 1) {
                            // avoid trailing commas
                            initStr += ',';
                        }
                    }

                    initStr += ');';
                    this.db.exec(initStr);
                };
            }
        };
        this.INSERT = {
            // TODO: INSERT OR REPLACE INTO
            INTO: (name: string) => {
                return {
                    // TODO: allow many values inserted at once
                    VALUES: (params: any[]) => {
                        let queryStr = `INSERT INTO "${this._sanitize(name)}" VALUES (`;
                        const queryParams = [];

                        for (let i = 0; i < params.length; i++) {
                            const param = params[i];

                            queryStr += '?';
                            queryParams.push(param);

                            if (i !== params.length - 1) {
                                queryStr += ',';
                            }
                        }

                        queryStr += ');';

                        this.db.prepare(queryStr).run(queryParams);
                    }
                };
            }
        };
    }

    public file: string;
    public db: sqlite.Database;

    // non-callables
    public CREATE: CREATEStatement;
    public INSERT: INSERTStatement;

    // callables
    public SELECT(...columns: string[]): SELECT_FROMStatement {
        columns = columns.map((c) => this._sanitize(c));

        return {
            // TODO: joins
            // TODO: where clauses which aren't just "AND", e.g. WHERE foo = 2 OR bar = 3
            FROM: (table: string, whereCall?: { WHERE: [string, '=' | '!=' | '>' | '>=' | '<' | '<=', any][] }) => {
                if (columns.length === 1 && columns[0] === '*') {
                    if (!whereCall?.WHERE || whereCall?.WHERE?.length === 0) {
                        return this.db.prepare(`SELECT * FROM "${this._sanitize(table)}"`).all();
                    } else {
                        for (const c of whereCall.WHERE) {
                            // ensure only authorized operators
                            if (!['=', '!=', '>', '>=', '<', '<='].includes(c[1])) {
                                throw new Error('Invalid SQL match operator.');
                            }
                        }

                        let whereTxt = `WHERE "${this._sanitize(whereCall.WHERE[0][0])}" ${whereCall.WHERE[0][1]} ?`;
                        const queryParams = [whereCall.WHERE[0][2]];
                        for (const call of whereCall.WHERE) {
                            whereTxt += ` AND "${this._sanitize(call[0])}" ${call[1]} ?`;
                            queryParams.push(call[2]);
                        }

                        return this.db.prepare(`SELECT * FROM "${this._sanitize(table)}" ${whereTxt}`).all(queryParams);
                    }
                } else if (columns.includes('*')) {
                    throw new Error('Special column "*" cannot be used in a union call. Use "*" on it\'s own.');
                } else {
                    if (!whereCall?.WHERE || whereCall?.WHERE?.length === 0) {
                        return this.db.prepare(`SELECT "${columns.join('","')}" FROM "${this._sanitize(table)}"`).all();
                    } else {
                        for (const c of whereCall.WHERE) {
                            // ensure only authorized operators
                            if (!['=', '!=', '>', '>=', '<', '<='].includes(c[1])) {
                                throw new Error('Invalid SQL match operator.');
                            }
                        }

                        let whereTxt = `WHERE "${whereCall.WHERE[0][0].replace(/"/g, '\\"')}" ${whereCall.WHERE[0][1]} ?`;
                        const queryParams = [whereCall.WHERE[0][2]];
                        for (const call of whereCall.WHERE) {
                            whereTxt += ` AND "${this._sanitize(call[0])}" ${call[1]} ?`;
                            queryParams.push(call[2]);
                        }

                        return this.db.prepare(`SELECT "${columns.join('","')}" FROM "${this._sanitize(table)}" ${whereTxt}`).all(queryParams);
                    }
                }
            }
        };
    }

    private _sanitize(sql: string): string {
        return sql.replace(/"/g, '\\"');
    }
}
