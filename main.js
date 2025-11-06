const { app, BrowserWindow, ipcMain, shell, Menu } = require('electron');
const path = require('path');
const Database = require('./database');

// Production-oriented secure settings: no nodeIntegration, use preload
// (Hot reload removed for packaging)

let db;
let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true
    }
  });

  mainWindow.loadFile('index.html');
  
  // Create application menu
  createMenu();
  
  // DevTools removed for production builds
  // Uncomment for debugging: mainWindow.webContents.openDevTools();
}

function createMenu() {
  const isMac = process.platform === 'darwin';
  
  const template = [
    // App Menu (Mac only)
    ...(isMac ? [{
      label: app.name,
      submenu: [
        { role: 'about' },
        { type: 'separator' },
        { role: 'services' },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideOthers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' }
      ]
    }] : []),
    
    // File Menu
    {
      label: 'File',
      submenu: [
        {
          label: 'New Record',
          accelerator: 'CmdOrCtrl+N',
          click: () => mainWindow.webContents.send('menu-action', 'new-record')
        },
        {
          label: 'Save Record',
          accelerator: 'CmdOrCtrl+S',
          click: () => mainWindow.webContents.send('menu-action', 'save-record')
        },
        { type: 'separator' },
        {
          label: 'Import Data',
          accelerator: 'CmdOrCtrl+I',
          click: () => mainWindow.webContents.send('menu-action', 'import-data')
        },
        {
          label: 'Export to Excel',
          accelerator: 'CmdOrCtrl+E',
          click: () => mainWindow.webContents.send('menu-action', 'export-data')
        },
        { type: 'separator' },
        {
          label: 'Google Sheets Setup',
          click: () => mainWindow.webContents.send('menu-action', 'google-sheets-setup')
        },
        {
          label: 'Sync to Google Sheets',
          click: () => mainWindow.webContents.send('menu-action', 'sync-to-google-sheets')
        },
        {
          label: 'Import from Google Sheets',
          click: () => mainWindow.webContents.send('menu-action', 'import-from-google-sheets')
        },
        { type: 'separator' },
        isMac ? { role: 'close' } : { role: 'quit' }
      ]
    },
    
    // Edit Menu
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        ...(isMac ? [
          { role: 'pasteAndMatchStyle' },
          { role: 'delete' },
          { role: 'selectAll' },
          { type: 'separator' },
          {
            label: 'Speech',
            submenu: [
              { role: 'startSpeaking' },
              { role: 'stopSpeaking' }
            ]
          }
        ] : [
          { role: 'delete' },
          { type: 'separator' },
          { role: 'selectAll' }
        ]),
        { type: 'separator' },
        {
          label: 'Find',
          accelerator: 'CmdOrCtrl+F',
          click: () => mainWindow.webContents.send('menu-action', 'find')
        }
      ]
    },
    
    // View Menu
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forceReload' },
        { role: 'toggleDevTools' },
        { type: 'separator' },
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'togglefullscreen' },
        { type: 'separator' },
        {
          label: 'Customize Fields',
          click: () => mainWindow.webContents.send('menu-action', 'customize-fields')
        }
      ]
    },
    
    // Records Menu
    {
      label: 'Records',
      submenu: [
        {
          label: 'Refresh List',
          accelerator: 'F5',
          click: () => mainWindow.webContents.send('menu-action', 'refresh-records')
        },
        {
          label: 'Clear Form',
          accelerator: 'Escape',
          click: () => mainWindow.webContents.send('menu-action', 'clear-form')
        },
        { type: 'separator' },
        {
          label: 'View Statistics',
          click: () => mainWindow.webContents.send('menu-action', 'show-stats')
        }
      ]
    },
    
    // Window Menu
    {
      label: 'Window',
      submenu: [
        { role: 'minimize' },
        { role: 'zoom' },
        ...(isMac ? [
          { type: 'separator' },
          { role: 'front' },
          { type: 'separator' },
          { role: 'window' }
        ] : [
          { role: 'close' }
        ])
      ]
    },
    
    // Help Menu
    {
      role: 'help',
      submenu: [
        {
          label: 'Keyboard Shortcuts',
          click: () => mainWindow.webContents.send('menu-action', 'show-shortcuts')
        },
        { type: 'separator' },
        {
          label: 'Documentation',
          click: async () => {
            await shell.openExternal('https://github.com/Sundarban-Lab/data-entry-app')
          }
        },
        {
          label: 'Report Issue',
          click: async () => {
            await shell.openExternal('https://github.com/Sundarban-Lab/data-entry-app/issues')
          }
        },
        { type: 'separator' },
        {
          label: 'About',
          click: () => mainWindow.webContents.send('menu-action', 'show-about')
        }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
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
