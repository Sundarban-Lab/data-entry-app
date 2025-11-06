/**
 * Menu Action Handler
 * Handles actions triggered from the application menu bar
 */

class MenuHandler {
  constructor() {
    this.init();
  }

  init() {
    // Listen for menu actions from main process
    if (window.api && window.api.onMenuAction) {
      window.api.onMenuAction((action) => {
        console.log('Menu action received:', action);
        this.handleAction(action);
      });
    }
  }

  handleAction(action) {
    switch (action) {
      case 'new-record':
        this.newRecord();
        break;
      case 'save-record':
        this.saveRecord();
        break;
      case 'import-data':
        this.importData();
        break;
      case 'export-data':
        this.exportData();
        break;
      case 'find':
        this.find();
        break;
      case 'customize-fields':
        this.customizeFields();
        break;
      case 'refresh-records':
        this.refreshRecords();
        break;
      case 'clear-form':
        this.clearForm();
        break;
      case 'show-stats':
        this.showStats();
        break;
      case 'show-shortcuts':
        this.showShortcuts();
        break;
      case 'show-about':
        this.showAbout();
        break;
      case 'google-sheets-setup':
        this.googleSheetsSetup();
        break;
      case 'sync-to-google-sheets':
        this.syncToGoogleSheets();
        break;
      case 'import-from-google-sheets':
        this.importFromGoogleSheets();
        break;
      default:
        console.warn('Unknown menu action:', action);
    }
  }

  newRecord() {
    if (window.keyboardShortcuts) {
      window.keyboardShortcuts.newRecord();
    }
  }

  saveRecord() {
    if (window.keyboardShortcuts) {
      window.keyboardShortcuts.saveRecord();
    }
  }

  importData() {
    if (window.dataImporter) {
      window.dataImporter.showImportDialog();
    }
  }

  exportData() {
    if (window.keyboardShortcuts) {
      window.keyboardShortcuts.exportData();
    }
  }

  find() {
    if (window.keyboardShortcuts) {
      window.keyboardShortcuts.focusSearch();
    }
  }

  customizeFields() {
    const modal = document.getElementById('settingsModal');
    if (modal) {
      modal.style.display = 'flex';
    }
  }

  refreshRecords() {
    if (window.loadData) {
      window.loadData();
      if (window.keyboardShortcuts) {
        window.keyboardShortcuts.showNotification('🔄 Records refreshed');
      }
    }
  }

  clearForm() {
    if (window.clearForm) {
      window.clearForm();
      if (window.keyboardShortcuts) {
        window.keyboardShortcuts.showNotification('✖ Form cleared');
      }
    }
  }

  showStats() {
    this.displayStatistics();
  }

  showShortcuts() {
    const shortcuts = `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    KEYBOARD SHORTCUTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

FILE OPERATIONS
  Ctrl+N    New Record
  Ctrl+S    Save Record
  Ctrl+I    Import Data
  Ctrl+E    Export to Excel

NAVIGATION
  Ctrl+F    Find/Search Records
  Escape    Clear Form/Close Modal
  F5        Refresh Records List

VIEW
  F11       Toggle Fullscreen
  Ctrl+0    Reset Zoom
  Ctrl++    Zoom In
  Ctrl+-    Zoom Out

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    `.trim();
    
    alert(shortcuts);
  }

  showAbout() {
    const about = `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    DATA ENTRY MANAGER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Version: 1.2.0
Developer: Anik Chowdhury
LinkedIn: linkedin.com/in/anikchowdhurybd

FEATURES
✓ Offline Data Storage
✓ Customizable Fields
✓ Data Import/Export
✓ Field Validation
✓ Keyboard Shortcuts
✓ Google Sheets Sync

Built with Electron + SQL.js
Licensed under MIT

GitHub: github.com/Sundarban-Lab/data-entry-app
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    `.trim();
    
    alert(about);
  }

  googleSheetsSetup() {
    if (window.googleSheetsSync) {
      window.googleSheetsSync.showConfigDialog();
    }
  }

  syncToGoogleSheets() {
    if (window.googleSheetsSync) {
      window.googleSheetsSync.syncToGoogleSheets();
    }
  }

  importFromGoogleSheets() {
    if (window.googleSheetsSync) {
      window.googleSheetsSync.importFromGoogleSheets();
    }
  }

  async displayStatistics() {
    try {
      const records = await window.api.getData();
      const totalRecords = records.length;
      
      // Calculate date range if birth dates exist
      const birthDates = records
        .map(r => r.birth)
        .filter(d => d && d.match(/^\d{4}-\d{2}-\d{2}$/))
        .sort();
      
      const dateRange = birthDates.length > 0 
        ? `${birthDates[0]} to ${birthDates[birthDates.length - 1]}`
        : 'N/A';
      
      // Count non-empty notes
      const withNotes = records.filter(r => r.note && r.note.trim()).length;
      
      // Count records with all dates filled
      const completeDateRecords = records.filter(r => 
        r.birth && r.bapt && r.conf && r.first_com && r.marriage && r.death
      ).length;
      
      const stats = `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    DATABASE STATISTICS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Total Records: ${totalRecords}
Records with Notes: ${withNotes}
Complete Date Records: ${completeDateRecords}
Birth Date Range: ${dateRange}

Last Updated: ${new Date().toLocaleString()}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      `.trim();
      
      alert(stats);
    } catch (error) {
      alert('Error loading statistics: ' + error.message);
    }
  }
}

// Initialize menu handler when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.menuHandler = new MenuHandler();
  });
} else {
  window.menuHandler = new MenuHandler();
}
