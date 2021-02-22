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
        describe('single column', () => {
            describe('no extra attributes', () => {
                it('TEXT', () => {
                    db.CREATE.TABLE('SINGLE_NOATTR_TEXT')(['text', 'TEXT']);
                });
                it('INT', () => {
                    db.CREATE.TABLE('SINGLE_NOATTR_INT')(['int', 'INT']);
                });
                it('CHAR', () => {
                    db.CREATE.TABLE('SINGLE_NOATTR_CHAR')(['char', 'CHAR']);
                });
            });
            describe('with PRIMARY KEY attribute', () => {
                it('TEXT(10)', () => {
                    db.CREATE.TABLE('SINGLE_PRIMARY_TEXT10')(['text', 'TEXT(10)', 'PRIMARY KEY']);
                });
                it('INT', () => {
                    db.CREATE.TABLE('SINGLE_PRIMARY_INT')(['int', 'INT', 'PRIMARY KEY']);
                });
                it('CHAR', () => {
                    db.CREATE.TABLE('SINGLE_PRIMARY_CHAR')(['char', 'CHAR', 'PRIMARY KEY']);
                });
            });
            describe('with NOT NULL attribute', () => {
                it('TEXT(10)', () => {
                    db.CREATE.TABLE('SINGLE_NOTNULL_TEXT')(['text', 'TEXT', 'NOT NULL']);
                });
                it('INT', () => {
                    db.CREATE.TABLE('SINGLE_NOTNULL_INT')(['int', 'INT', 'NOT NULL']);
                });
                it('CHAR', () => {
                    db.CREATE.TABLE('SINGLE_NOTNULL_CHAR')(['char', 'CHAR', 'NOT NULL']);
                });
            });
        });
        describe('two columns', () => {
            describe('no extra attributes', () => {
                it('TEXT', () => {
                    db.CREATE.TABLE('DOUBLE_NOATTR_TEXT')(['text1', 'TEXT'], ['text2', 'TEXT']);
                });
                it('INT', () => {
                    db.CREATE.TABLE('DOUBLE_NOATTR_INT')(['int1', 'INT'], ['int2', 'INT']);
                });
                it('CHAR', () => {
                    db.CREATE.TABLE('DOUBLE_NOATTR_CHAR')(['char1', 'CHAR'], ['char2', 'CHAR']);
                });
            });
            describe('with one PRIMARY KEY attribute', () => {
                it('TEXT(10)', () => {
                    db.CREATE.TABLE('DOUBLE_PRIMARY_TEXT10')(['text1', 'TEXT(10)', 'PRIMARY KEY'], ['text2', 'TEXT']);
                });
                it('INT', () => {
                    db.CREATE.TABLE('DOUBLE_PRIMARY_INT')(['int1', 'INT', 'PRIMARY KEY'], ['int2', 'INT']);
                });
                it('CHAR', () => {
                    db.CREATE.TABLE('DOUBLE_PRIMARY_CHAR')(['char1', 'CHAR', 'PRIMARY KEY'], ['char2', 'CHAR']);
                });
            });
            describe('with all NOT NULL attributes', () => {
                it('TEXT', () => {
                    db.CREATE.TABLE('DOUBLE_NOTNULL_TEXT')(['text1', 'TEXT', 'NOT NULL'], ['text2', 'TEXT', 'NOT NULL']);
                });
                it('INT', () => {
                    db.CREATE.TABLE('DOUBLE_NOTNULL_INT')(['int1', 'INT', 'NOT NULL'], ['int2', 'INT', 'NOT NULL']);
                });
                it('CHAR', () => {
                    db.CREATE.TABLE('DOUBLE_NOTNULL_CHAR')(['char1', 'CHAR', 'NOT NULL'], ['char2', 'CHAR', 'NOT NULL']);
                });
            });
        });
    });
});

describe('INSERT', () => {
    describe('INTO', () => {
        describe('single column', () => {
            describe('no extra attributes', () => {
                it('TEXT', () => {
                    db.INSERT.INTO('SINGLE_NOATTR_TEXT').VALUES(['Hello, World!']);
                });
                it('INT', () => {
                    db.INSERT.INTO('SINGLE_NOATTR_INT').VALUES([13]);
                });
                it('CHAR', () => {
                    db.INSERT.INTO('SINGLE_NOATTR_CHAR').VALUES(['e']);
                });
            });
            describe('with PRIMARY KEY attribute', () => {
                it('TEXT(10)', () => {
                    db.INSERT.INTO('SINGLE_PRIMARY_TEXT10').VALUES(['helloworld']);
                });
                it('INT', () => {
                    db.INSERT.INTO('SINGLE_PRIMARY_INT').VALUES([13]);
                });
                it('CHAR', () => {
                    db.INSERT.INTO('SINGLE_PRIMARY_CHAR').VALUES(['e']);
                });
            });
            describe('with NOT NULL attribute', () => {
                it('TEXT(10)', () => {
                    db.INSERT.INTO('SINGLE_NOTNULL_TEXT').VALUES(['helloworld']);
                });
                it('INT', () => {
                    db.INSERT.INTO('SINGLE_NOTNULL_INT').VALUES([13]);
                });
                it('CHAR', () => {
                    db.INSERT.INTO('SINGLE_NOTNULL_CHAR').VALUES(['e']);
                });
            });
        });
        describe('two columns', () => {
            describe('no extra attributes', () => {
                it('TEXT', () => {
                    db.INSERT.INTO('DOUBLE_NOATTR_TEXT').VALUES(['Hello, World!', 'Hello, Second Column!']);
                });
                it('INT', () => {
                    db.INSERT.INTO('DOUBLE_NOATTR_INT').VALUES([13, 5]);
                });
                it('CHAR', () => {
                    db.INSERT.INTO('DOUBLE_NOATTR_CHAR').VALUES(['e', 'f']);
                });
            });
            describe('with PRIMARY KEY attribute', () => {
                it('TEXT(10)', () => {
                    db.INSERT.INTO('DOUBLE_PRIMARY_TEXT10').VALUES(['helloworld', 'bye_world!']);
                });
                it('INT', () => {
                    db.INSERT.INTO('DOUBLE_PRIMARY_INT').VALUES([13, 5]);
                });
                it('CHAR', () => {
                    db.INSERT.INTO('DOUBLE_PRIMARY_CHAR').VALUES(['e', 'f']);
                });
            });
            describe('with NOT NULL attribute', () => {
                it('TEXT(10)', () => {
                    db.INSERT.INTO('DOUBLE_NOTNULL_TEXT').VALUES(['Hello, World!', 'Hello, Second Column!']);
                });
                it('INT', () => {
                    db.INSERT.INTO('DOUBLE_NOTNULL_INT').VALUES([13, 5]);
                });
                it('CHAR', () => {
                    db.INSERT.INTO('DOUBLE_NOTNULL_CHAR').VALUES(['e', 'f']);
                });
            });
        });
    });
});

describe('SELECT', () => {
    describe('*', () => {
        it('all values are returned', () => {
            expect(db.SELECT('*').FROM('DOUBLE_NOATTR_TEXT')).toEqual([{ text1: 'Hello, World!', text2: 'Hello, Second Column!' }]);
        });
        describe('WHERE clause', () => {
            describe('one WHERE clause', () => {
                it('prep', () => {
                    db.CREATE.TABLE('SELECT_ALL_WHERE')(['id', 'INT', 'PRIMARY KEY'], ['data', 'TEXT', 'NOT NULL']);
                    db.INSERT.INTO('SELECT_ALL_WHERE').VALUES([1, 'hello world 1']);
                    db.INSERT.INTO('SELECT_ALL_WHERE').VALUES([2, 'hello world 2']);
                    db.INSERT.INTO('SELECT_ALL_WHERE').VALUES([3, 'hello world 3']);
                    db.INSERT.INTO('SELECT_ALL_WHERE').VALUES([4, 'hello world 4']);
                    db.INSERT.INTO('SELECT_ALL_WHERE').VALUES([5, 'hello world 5']);
                    db.INSERT.INTO('SELECT_ALL_WHERE').VALUES([6, 'hello world 6']);
                    db.INSERT.INTO('SELECT_ALL_WHERE').VALUES([7, 'hello world 7']);
                    db.INSERT.INTO('SELECT_ALL_WHERE').VALUES([8, 'hello world 8']);
                    db.INSERT.INTO('SELECT_ALL_WHERE').VALUES([9, 'hello world 9']);
                    db.INSERT.INTO('SELECT_ALL_WHERE').VALUES([10, 'hello world 10']);
                });
                it('=', () => {
                    expect(db.SELECT('*').FROM('SELECT_ALL_WHERE', { WHERE: [['id', '=', 1]] })).toEqual([{ id: 1, data: 'hello world 1' }]);
                });
                it('!=', () => {
                    expect(db.SELECT('*').FROM('SELECT_ALL_WHERE', { WHERE: [['id', '!=', 1]] })).toEqual([
                        { id: 2, data: 'hello world 2' },
                        { id: 3, data: 'hello world 3' },
                        { id: 4, data: 'hello world 4' },
                        { id: 5, data: 'hello world 5' },
                        { id: 6, data: 'hello world 6' },
                        { id: 7, data: 'hello world 7' },
                        { id: 8, data: 'hello world 8' },
                        { id: 9, data: 'hello world 9' },
                        { id: 10, data: 'hello world 10' }
                    ]);
                });
                it('>', () => {
                    expect(db.SELECT('*').FROM('SELECT_ALL_WHERE', { WHERE: [['id', '>', 5]] })).toEqual([
                        { id: 6, data: 'hello world 6' },
                        { id: 7, data: 'hello world 7' },
                        { id: 8, data: 'hello world 8' },
                        { id: 9, data: 'hello world 9' },
                        { id: 10, data: 'hello world 10' }
                    ]);
                });
                it('>=', () => {
                    expect(db.SELECT('*').FROM('SELECT_ALL_WHERE', { WHERE: [['id', '>=', 5]] })).toEqual([
                        { id: 5, data: 'hello world 5' },
                        { id: 6, data: 'hello world 6' },
                        { id: 7, data: 'hello world 7' },
                        { id: 8, data: 'hello world 8' },
                        { id: 9, data: 'hello world 9' },
                        { id: 10, data: 'hello world 10' }
                    ]);
                });
                it('<', () => {
                    expect(db.SELECT('*').FROM('SELECT_ALL_WHERE', { WHERE: [['id', '<', 5]] })).toEqual([
                        { id: 1, data: 'hello world 1' },
                        { id: 2, data: 'hello world 2' },
                        { id: 3, data: 'hello world 3' },
                        { id: 4, data: 'hello world 4' }
                    ]);
                });
                it('<=', () => {
                    expect(db.SELECT('*').FROM('SELECT_ALL_WHERE', { WHERE: [['id', '<=', 5]] })).toEqual([
                        { id: 1, data: 'hello world 1' },
                        { id: 2, data: 'hello world 2' },
                        { id: 3, data: 'hello world 3' },
                        { id: 4, data: 'hello world 4' },
                        { id: 5, data: 'hello world 5' }
                    ]);
                });
            });
            describe('with AND clause', () => {
                it('prep', () => {
                    db.CREATE.TABLE('SELECT_ALL_WHERE_AND')(['id', 'INT', 'PRIMARY KEY'], ['id2', 'INT', 'NOT NULL'], ['data', 'TEXT', 'NOT NULL']);
                    db.INSERT.INTO('SELECT_ALL_WHERE_AND').VALUES([1, 1, 'hello world 1']);
                    db.INSERT.INTO('SELECT_ALL_WHERE_AND').VALUES([2, 2, 'hello world 2']);
                    db.INSERT.INTO('SELECT_ALL_WHERE_AND').VALUES([3, 3, 'hello world 3']);
                    db.INSERT.INTO('SELECT_ALL_WHERE_AND').VALUES([4, 4, 'hello world 4']);
                    db.INSERT.INTO('SELECT_ALL_WHERE_AND').VALUES([5, 5, 'hello world 5']);
                    db.INSERT.INTO('SELECT_ALL_WHERE_AND').VALUES([6, 6, 'hello world 6']);
                    db.INSERT.INTO('SELECT_ALL_WHERE_AND').VALUES([7, 7, 'hello world 7']);
                    db.INSERT.INTO('SELECT_ALL_WHERE_AND').VALUES([8, 8, 'hello world 8']);
                    db.INSERT.INTO('SELECT_ALL_WHERE_AND').VALUES([9, 9, 'hello world 9']);
                    db.INSERT.INTO('SELECT_ALL_WHERE_AND').VALUES([10, 10, 'hello world 10']);
                });
                it('=', () => {
                    expect(
                        db.SELECT('*').FROM('SELECT_ALL_WHERE_AND', {
                            WHERE: [
                                ['id', '=', 1],
                                ['id2', '=', 1]
                            ]
                        })
                    ).toEqual([{ id: 1, id2: 1, data: 'hello world 1' }]);
                });
                it('!=', () => {
                    expect(
                        db.SELECT('*').FROM('SELECT_ALL_WHERE_AND', {
                            WHERE: [
                                ['id', '!=', 1],
                                ['id2', '!=', 1]
                            ]
                        })
                    ).toEqual([
                        { id: 2, id2: 2, data: 'hello world 2' },
                        { id: 3, id2: 3, data: 'hello world 3' },
                        { id: 4, id2: 4, data: 'hello world 4' },
                        { id: 5, id2: 5, data: 'hello world 5' },
                        { id: 6, id2: 6, data: 'hello world 6' },
                        { id: 7, id2: 7, data: 'hello world 7' },
                        { id: 8, id2: 8, data: 'hello world 8' },
                        { id: 9, id2: 9, data: 'hello world 9' },
                        { id: 10, id2: 10, data: 'hello world 10' }
                    ]);
                });
                it('>', () => {
                    expect(
                        db.SELECT('*').FROM('SELECT_ALL_WHERE_AND', {
                            WHERE: [
                                ['id', '>', 5],
                                ['id2', '>', 5]
                            ]
                        })
                    ).toEqual([
                        { id: 6, id2: 6, data: 'hello world 6' },
                        { id: 7, id2: 7, data: 'hello world 7' },
                        { id: 8, id2: 8, data: 'hello world 8' },
                        { id: 9, id2: 9, data: 'hello world 9' },
                        { id: 10, id2: 10, data: 'hello world 10' }
                    ]);
                });
                it('>=', () => {
                    expect(
                        db.SELECT('*').FROM('SELECT_ALL_WHERE_AND', {
                            WHERE: [
                                ['id', '>=', 5],
                                ['id2', '>=', 5]
                            ]
                        })
                    ).toEqual([
                        { id: 5, id2: 5, data: 'hello world 5' },
                        { id: 6, id2: 6, data: 'hello world 6' },
                        { id: 7, id2: 7, data: 'hello world 7' },
                        { id: 8, id2: 8, data: 'hello world 8' },
                        { id: 9, id2: 9, data: 'hello world 9' },
                        { id: 10, id2: 10, data: 'hello world 10' }
                    ]);
                });
                it('<', () => {
                    expect(
                        db.SELECT('*').FROM('SELECT_ALL_WHERE_AND', {
                            WHERE: [
                                ['id', '<', 5],
                                ['id2', '<', 5]
                            ]
                        })
                    ).toEqual([
                        { id: 1, id2: 1, data: 'hello world 1' },
                        { id: 2, id2: 2, data: 'hello world 2' },
                        { id: 3, id2: 3, data: 'hello world 3' },
                        { id: 4, id2: 4, data: 'hello world 4' }
                    ]);
                });
                it('<=', () => {
                    expect(
                        db.SELECT('*').FROM('SELECT_ALL_WHERE_AND', {
                            WHERE: [
                                ['id', '<=', 5],
                                ['id2', '<=', 5]
                            ]
                        })
                    ).toEqual([
                        { id: 1, id2: 1, data: 'hello world 1' },
                        { id: 2, id2: 2, data: 'hello world 2' },
                        { id: 3, id2: 3, data: 'hello world 3' },
                        { id: 4, id2: 4, data: 'hello world 4' },
                        { id: 5, id2: 5, data: 'hello world 5' }
                    ]);
                });
            });
        });
    });
});

describe('DROP', () => {
    describe('TABLE', () => {
        it('prep', () => {
            db.CREATE.TABLE('DROP_TABLE')(['id', 'INT', 'PRIMARY KEY'], ['data', 'TEXT', 'NOT NULL']);
        });
        it('works', () => {
            db.DROP.TABLE('DROP_TABLE');
        });
    });
});

describe('BEGIN and BEGIN TRANSACTION', () => {
    describe('they exist', () => {
        it('BEGIN', () => {
            expect('BEGIN' in db).toBe(true);
        });
        it('BEGIN TRANSACTION', () => {
            expect('TRANSACTION' in db.BEGIN).toBe(true);
        });
    });
    it('works', () => {
        db.BEGIN.TRANSACTION();
    });
    it('errors when there are more than 1 transaction', () => {
        expect(() => {
            db.BEGIN.TRANSACTION();
        }).toThrow();
    });
    it('wrap up', () => {
        db.ROLLBACK();
    });
});

describe('COMMIT', () => {
    it('prep', () => {
        db.CREATE.TABLE('COMMIT')(['id', 'INT', 'PRIMARY KEY'], ['data', 'TEXT', 'NOT NULL']);
        db.BEGIN.TRANSACTION();
        db.INSERT.INTO('COMMIT').VALUES([1, 'foo']);
    });
    it('works', () => {
        db.COMMIT();
        expect(db.SELECT('*').FROM('COMMIT')).toEqual([{ id: 1, data: 'foo' }]);
    });
});

describe('ROLLBACK', () => {
    it('prep', () => {
        db.CREATE.TABLE('ROLLBACK')(['id', 'INT', 'PRIMARY KEY'], ['data', 'TEXT', 'NOT NULL']);
        db.BEGIN.TRANSACTION();
        db.INSERT.INTO('ROLLBACK').VALUES([1, 'foo']);
    });
    it('works', () => {
        db.ROLLBACK();
        expect(db.SELECT('*').FROM('ROLLBACK')).toEqual([]);
    });
});
