const { app, BrowserWindow, ipcMain, shell } = require('electron');
const path = require('path');
const Database = require('./database');

// Production-oriented secure settings: no nodeIntegration, use preload
// (Hot reload removed for packaging)

let db;

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true
    }
  });

  win.loadFile('index.html');
  
  // DevTools removed for production builds
  // Uncomment for debugging: win.webContents.openDevTools();
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

// Secure external link opener (renderer -> preload -> main)
ipcMain.handle('open-external', async (event, url) => {
  if (typeof url === 'string' && /^https?:\/\//i.test(url)) {
    try {
      await shell.openExternal(url);
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.message };
    }
  }
  return { ok: false, error: 'Invalid URL' };
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
