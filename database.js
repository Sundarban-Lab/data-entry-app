const fs = require('fs');
const path = require('path');
const initSqlJs = require('sql.js');
const xlsx = require('xlsx');

const DB_FILE = 'data.db';

class Database {
  constructor() {
    this.ready = this._init();
  }

  async _init() {
    const SQL = await initSqlJs({
      locateFile: (file) => {
        // In dev, load from node_modules; in prod, from unpacked resources
        const devPath = path.join(__dirname, 'node_modules', 'sql.js', 'dist', file);
        const prodPath = path.join(process.resourcesPath || '', 'app.asar.unpacked', 'node_modules', 'sql.js', 'dist', file);
        if (fs.existsSync(prodPath)) return prodPath;
        return devPath;
      }
    });
    if (fs.existsSync(DB_FILE)) {
      const fileBuffer = fs.readFileSync(DB_FILE);
      this.db = new SQL.Database(fileBuffer);
    } else {
      this.db = new SQL.Database();
      this.db.run(`CREATE TABLE records (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        church_name TEXT,
        place TEXT,
        husband_name TEXT,
        wife_name TEXT,
        father_name TEXT,
        mother_name TEXT,
        relation TEXT,
        name TEXT,
        birth TEXT,
        bapt TEXT,
        conf TEXT,
        first_com TEXT,
        marriage TEXT,
        death TEXT,
        note TEXT
      )`);
      this._persist();
    }
  }

  _persist() {
    const data = this.db.export();
    const buffer = Buffer.from(data);
    fs.writeFileSync(DB_FILE, buffer);
  }

  async insertData(record) {
    await this.ready;
    const stmt = this.db.prepare(`INSERT INTO records (
      church_name, place, husband_name, wife_name, father_name, mother_name, 
      relation, name, birth, bapt, conf, first_com, marriage, death, note
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
    stmt.run([
      record.church_name, record.place, record.husband_name, record.wife_name,
      record.father_name, record.mother_name, record.relation, record.name,
      record.birth, record.bapt, record.conf, record.first_com,
      record.marriage, record.death, record.note
    ]);
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

  async updateData(record) {
    await this.ready;
    const stmt = this.db.prepare(`UPDATE records SET 
      church_name=?, place=?, husband_name=?, wife_name=?, father_name=?, mother_name=?,
      relation=?, name=?, birth=?, bapt=?, conf=?, first_com=?, marriage=?, death=?, note=?
      WHERE id=?`);
    stmt.run([
      record.church_name, record.place, record.husband_name, record.wife_name,
      record.father_name, record.mother_name, record.relation, record.name,
      record.birth, record.bapt, record.conf, record.first_com,
      record.marriage, record.death, record.note, parseInt(record.id, 10)
    ]);
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
    // Map to template column names
    const exportData = rows.map(r => ({
      'Name of Church': r.church_name,
      'Place': r.place,
      'Husband Name': r.husband_name,
      'Wife Name': r.wife_name,
      'Father Name': r.father_name,
      'Mother Name': r.mother_name,
      'Relation': r.relation,
      'Name': r.name,
      'Birth': r.birth,
      'BAPT': r.bapt,
      'CONF': r.conf,
      '1 COM': r.first_com,
      'Marriage': r.marriage,
      'Death': r.death,
      'Note': r.note
    }));
    const worksheet = xlsx.utils.json_to_sheet(exportData);
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, 'Church Records');
    xlsx.writeFile(workbook, 'records.xlsx');
    return 'records.xlsx';
  }
}

module.exports = Database;
