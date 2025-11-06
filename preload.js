const { contextBridge, ipcRenderer } = require('electron');

console.log('Preload script running, exposing API...');

contextBridge.exposeInMainWorld('api', {
  getData: () => ipcRenderer.invoke('get-data'),
  saveData: (record) => ipcRenderer.invoke('save-data', record),
  updateData: (record) => ipcRenderer.invoke('update-data', record),
  deleteData: (id) => ipcRenderer.invoke('delete-data', id),
  exportExcel: () => ipcRenderer.invoke('export-excel'),
  openExternal: (url) => {
    console.log('openExternal called with url:', url);
    // Call main process to open external link
    return ipcRenderer.invoke('open-external', url);
  }
});

console.log('API exposed successfully');
