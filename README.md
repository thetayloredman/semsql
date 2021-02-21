# semsql

## What is semSQL?

semSQL is a semantic-like SQLite library.

All your queries look like this:

```js
db.CREATE.TABLE('foo')(['COL1', 'TEXT', 'NOT NULL']);
```

## All Supported Queries

<!-- we used to use : as the separator, but GH doesn't like it. -->

-   [`CREATE`](#query>CREATE)
    -   [`TABLE`](#query>CREATE>TABLE) (implemented in v0.1.0)
-   [`INSERT`](#query>INSERT)
    -   [`INTO`](#query>INSERT>INTO) (implemented in v0.1.0)
-   [`SELECT ... FROM`](#query>SELECT_FROM) (implemented in v0.1.0)
-   [`DROP`](#query>DROP)
    -   [`TABLE`](#query>DROP>TABLE) (implemented in v0.1.0)

## Queries

<a name="query>CREATE">

### CREATE

Used to _create_ something.

Accessed by `db.CREATE`.

<a name="query>CREATE>TABLE">

#### TABLE

Used to create a table.

Called by `db.CREATE.TABLE(name: string)`. When called, a Function is returned, which is used to add columns.

```ts
db.CREATE.TABLE(name: string) => (...columns: [string, ...string[]][]) => void
```

Example:

```ts
db.CREATE.TABLE('Users')(
    ['id', 'INT', 'PRIMARY KEY'],
    ['firstName', 'TEXT', 'NOT NULL'],
    ['lastName', 'TEXT'],
    ['username', 'TEXT', 'UNIQUE', 'NOT NULL'],
    ['age', 'INT'],
    ['bio', 'TEXT']
);
```

<a name="query>INSERT">

### INSERT

Used to add data to the database.

Accessed by `db.INSERT`.

<a name="query>INSERT>INTO">

#### INTO

Used to insert data into a table.

Called by `db.INSERT.INTO(name: string)`. When called, an Object with one property (`VALUES`) is returned, which is used to add data.

```ts
db.INSERT.INTO(name: string) => { VALUES: (params: any[]) => void }
```

Example:

```ts
db.INSERT.INTO('Users').VALUES(1, 'John', 'Doe', 'JohnDoe', 50, "i'm john and i do things");
```

<a name="query>SELECT_FROM">

### SELECT ... FROM

Used to get data.

Called by `db.SELECT(...columns: string[])`. When called, an Object with one property (`FROM`) is returned, which is used to select the table.

`columns` can be `"*"` for all.

`whereCall` can be used as a `WHERE` statement. `whereCall` is an object with an array of arrays. The inner array is `['column', 'operator', 'value']`, and each array is separated with `AND`. Ex.: `whereCall: { WHERE: [['foo', '=', 'bar'], ['baz', '>', 'qux']] }` is the same as `WHERE foo = "bar" AND baz = "qux"`.

```ts
db.SELECT(...columns: string[]) => { FROM: (name: string, whereCall?: { WHERE: [string, '=' | '!=' | '>' | '>=' | '<' | '<=', any][] } }
```

Example:

```ts
db.SELECT('*').FROM('Users'); // => [ { id: 1, firstName: 'John', lastName: 'doe', username: 'JohnDoe', age: 50, bio: "i'm john and i do things" } ]
db.SELECT('id').FROM('Users'); // => [ { id: 1 } ]
db.SELECT('id').FROM('Users', { WHERE: [['id', '<=', 1]] }); // => [ { id: 1 } ]
```

<a name="query>DROP">

### DROP

Used to delete a table, etc.

Accessed by `db.DROP`.

<a name="query>DROP>TABLE">

#### TABLE

**Warning:** Data loss can be caused!

Delete a table and all of it's data.

Called by `db.DROP.TABLE(name: string)`.

Example:

```ts
db.DROP.TABLE('Users'); // delete table 'Users'
```
