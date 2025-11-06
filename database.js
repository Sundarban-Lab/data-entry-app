const fs = require('fs');
const initSqlJs = require('sql.js');
const xlsx = require('xlsx');

const DB_FILE = 'data.db';

class Database {
  constructor() {
    this.ready = this._init();
  }

  async _init() {
    const SQL = await initSqlJs();
    if (fs.existsSync(DB_FILE)) {
      const fileBuffer = fs.readFileSync(DB_FILE);
      this.db = new SQL.Database(fileBuffer);
    } else {
      this.db = new SQL.Database();
      this.db.run('CREATE TABLE records (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, age INTEGER)');
      this._persist();
    }
  }

  _persist() {
    const data = this.db.export();
    const buffer = Buffer.from(data);
    fs.writeFileSync(DB_FILE, buffer);
  }

  async insertData({ name, email, age }) {
    await this.ready;
    const stmt = this.db.prepare('INSERT INTO records (name, email, age) VALUES (?, ?, ?)');
    stmt.run([name, email, parseInt(age, 10) || null]);
    stmt.free();
    this._persist();
    return true;
  }

  async getAllData() {
    await this.ready;
    const stmt = this.db.prepare('SELECT * FROM records ORDER BY id DESC');
    const rows = [];
    while (stmt.step()) rows.push(stmt.getAsObject());
    stmt.free();
    return rows;
  }

  async updateData({ id, name, email, age }) {
    await this.ready;
    const stmt = this.db.prepare('UPDATE records SET name=?, email=?, age=? WHERE id=?');
    stmt.run([name, email, parseInt(age, 10) || null, parseInt(id, 10)]);
    stmt.free();
    this._persist();
    return true;
  }

  async deleteData(id) {
    await this.ready;
    const stmt = this.db.prepare('DELETE FROM records WHERE id=?');
    stmt.run([parseInt(id, 10)]);
    stmt.free();
    this._persist();
    return true;
  }

  async exportToExcel() {
    const rows = await this.getAllData();
    const worksheet = xlsx.utils.json_to_sheet(rows);
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, 'Data');
    xlsx.writeFile(workbook, 'records.xlsx');
    return 'records.xlsx';
  }
}

module.exports = Database;
