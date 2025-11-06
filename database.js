const sqlite3 = require('sqlite3').verbose();
const xlsx = require('xlsx');

class Database {
  constructor() {
    this.db = new sqlite3.Database('./data.db');
    this.db.run(
      'CREATE TABLE IF NOT EXISTS records (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, age INTEGER)'
    );
  }

  insertData({ name, email, age }) {
    return new Promise((resolve, reject) => {
      this.db.run(
        'INSERT INTO records (name, email, age) VALUES (?, ?, ?)',
        [name, email, age],
        (err) => (err ? reject(err) : resolve(true))
      );
    });
  }

  getAllData() {
    return new Promise((resolve, reject) => {
      this.db.all('SELECT * FROM records ORDER BY id DESC', (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }

  updateData({ id, name, email, age }) {
    return new Promise((resolve, reject) => {
      this.db.run(
        'UPDATE records SET name=?, email=?, age=? WHERE id=?',
        [name, email, age, id],
        (err) => (err ? reject(err) : resolve(true))
      );
    });
  }

  deleteData(id) {
    return new Promise((resolve, reject) => {
      this.db.run('DELETE FROM records WHERE id=?', [id], (err) =>
        err ? reject(err) : resolve(true)
      );
    });
  }

  exportToExcel() {
    return new Promise((resolve, reject) => {
      this.db.all('SELECT * FROM records', (err, rows) => {
        if (err) return reject(err);
        const worksheet = xlsx.utils.json_to_sheet(rows);
        const workbook = xlsx.utils.book_new();
        xlsx.utils.book_append_sheet(workbook, worksheet, 'Data');
        xlsx.writeFile(workbook, 'records.xlsx');
        resolve('records.xlsx');
      });
    });
  }
}

module.exports = Database;
