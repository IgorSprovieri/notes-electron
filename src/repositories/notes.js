const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./database.db");

const createTable = () => {
  const query = `
  CREATE TABLE IF NOT EXISTS notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    lines TEXT
  )
`;

  return new Promise((resolve, reject) => {
    db.run(query, (err) => {
      if (err) return reject(err.message);

      resolve();
    });
  });
};

const findAll = () => {
  const query = `SELECT * FROM notes`;

  return new Promise((resolve, reject) => {
    db.all(query, (err, rows) => {
      if (err) return reject(err.message);

      resolve(
        rows.map(({ id, lines }) => {
          return { id, lines: JSON.parse(lines) };
        })
      );
    });
  });
};

const create = ({ lines }) => {
  const query = `INSERT INTO notes (lines) VALUES ($lines)`;
  const params = [JSON.stringify(lines)];

  return new Promise((resolve, reject) => {
    db.run(query, params, function (err) {
      if (err) return reject(err.message);

      resolve({ id: this.lastID, lines });
    });
  });
};

const findById = ({ id }) => {
  const query = `SELECT * FROM notes WHERE id = $id`;
  const params = [id];

  return new Promise((resolve, reject) => {
    db.get(query, params, (err, { lines }) => {
      if (err) return reject(err.message);

      resolve({ id: id, lines: JSON.parse(lines) });
    });
  });
};

const update = ({ id, lines }) => {
  const query = `UPDATE notes SET lines = $lines WHERE id = $id`;
  const params = [JSON.stringify(lines), id];

  return new Promise((resolve, reject) => {
    db.run(query, params, (err) => {
      if (err) return reject(err.message);

      resolve({ id, lines });
    });
  });
};

module.exports = {
  notesRepository: { createTable, findAll, findById, create, update },
};
