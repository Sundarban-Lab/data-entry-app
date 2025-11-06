const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  getData: () => ipcRenderer.invoke('get-data'),
  saveData: (record) => ipcRenderer.invoke('save-data', record),
  updateData: (record) => ipcRenderer.invoke('update-data', record),
  deleteData: (id) => ipcRenderer.invoke('delete-data', id),
  exportExcel: () => ipcRenderer.invoke('export-excel')
});
