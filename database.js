const fs = require('fs');
const initSqlJs = require('sql.js');
const ExcelJS = require('exceljs');

const DB_FILE = 'data.db';

class Database {
  constructor() {
    this.ready = this._init();
  }

  async _init() {
    try {
      const SQL = await initSqlJs();
      if (fs.existsSync(DB_FILE)) {
        const fileBuffer = fs.readFileSync(DB_FILE);
        this.db = new SQL.Database(fileBuffer);
        console.log('Database loaded from file.');
      } else {
        this.db = new SQL.Database();
        this.db.run('CREATE TABLE records (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, age INTEGER)');
        this._persist();
        console.log('New database created.');
      }
    } catch (error) {
      console.error('Database initialization error:', error);
      throw error;
    }
  }

  _persist() {
    try {
      const data = this.db.export();
      const buffer = Buffer.from(data);
      fs.writeFileSync(DB_FILE, buffer);
    } catch (error) {
      console.error('Database persist error:', error);
      throw error;
    }
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
    try {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Data');
      
      // Add headers if there's data
      if (rows.length > 0) {
        worksheet.columns = Object.keys(rows[0]).map(key => ({
          header: key.charAt(0).toUpperCase() + key.slice(1),
          key: key,
          width: 15
        }));
        
        // Add rows
        rows.forEach(row => worksheet.addRow(row));
      }
      
      await workbook.xlsx.writeFile('records.xlsx');
      return 'records.xlsx';
    } catch (error) {
      console.error('Excel export error:', error);
      throw error;
    }
  }
}

module.exports = Database;
