# Demo express API

This is a simple project to test the creation of a REST API with express.

## Technologies used

- [ExpressJS](https://expressjs.com/), a minimalist js web framework
- [Deno](https://expressjs.com/), an alternative to Node.js, with built-in security and Typescript support out of the box
- [JavaScript](https://developer.mozilla.org/fr/docs/Web/JavaScript), you know it!
- [PostgreSQL](https://www.postgresql.org/), a powerful, open source object-relational database

## Dependancies

### With nix flakes (and direnv)

If you have nix with flakes installed on your system, you can just type `nix develop`.

If you have direnv installed on your system, just `cd` to the project directory, then on the first time type `direnv allow`, then when you `cd` in the directory, the development environment will automatically load.

Once the development environment is loaded, you can initialize the DB, then start it:
```sh
initdb
startdb
```

To stop the DB:
```sh
stopdb
```

The DB is contained into `.pg/`:
- `.pg/data` -> all the data
- `.pg/run` -> the socket
- `.pg/log` -> the logs

You can always restart with a fresh DB:

```sh
stopdb # stop it if it is running
rm -fr ./pg
initdb
startdb
```

### Without nix

Install deno at version 2.6+

Be sure to have PostgreSQL 17+ installed and running.
If needed, create a database user, and the database that will contain all the application data.

Copy the `.env.example` file to `.env`, then change the values in the file to
match your database informations.

The `DEV` variable in `.env` is used to clear and recreate the database at server startup. Set it to `true` when starting the development.

## Launch the project

Once you have all the dependancies, go to the terminal an launch the project:
```sh
deno run dev
```
The project will first download and install needed dependancies,
and will launch once all is ready.
It will watch for changes in the files and restart the server if needed.

The server will be availaible at <http://localhost:3000> (or whatever port you put as `APP_PORT` in `.env`).
