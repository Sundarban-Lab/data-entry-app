const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const Database = require('./database');

let db;

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, 'renderer.js'),
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  win.loadFile('index.html');
}

app.whenReady().then(() => {
  db = new Database();
  createWindow();
});

ipcMain.handle('save-data', async (event, record) => {
  await db.insertData(record);
  const updated = await db.getAllData();
  await db.exportToExcel(); // Auto-export
  return updated;
});

ipcMain.handle('get-data', async () => {
  return await db.getAllData();
});

ipcMain.handle('update-data', async (event, record) => {
  await db.updateData(record);
  const updated = await db.getAllData();
  await db.exportToExcel();
  return updated;
});

ipcMain.handle('delete-data', async (event, id) => {
  await db.deleteData(id);
  const updated = await db.getAllData();
  await db.exportToExcel();
  return updated;
});

ipcMain.handle('export-excel', async () => {
  return await db.exportToExcel();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
