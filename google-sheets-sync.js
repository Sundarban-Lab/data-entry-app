/**
 * Google Sheets Integration
 * Allows syncing local data to Google Sheets
 */

class GoogleSheetsSync {
  constructor() {
    this.isConfigured = false;
    this.apiKey = null;
    this.spreadsheetId = null;
    this.sheetName = 'Records';
    this.loadConfig();
  }

  /**
   * Load saved configuration
   */
  loadConfig() {
    const config = localStorage.getItem('googleSheetsConfig');
    if (config) {
      const parsed = JSON.parse(config);
      this.apiKey = parsed.apiKey;
      this.spreadsheetId = parsed.spreadsheetId;
      this.sheetName = parsed.sheetName || 'Records';
      this.isConfigured = !!(this.apiKey && this.spreadsheetId);
    }
  }

  /**
   * Save configuration
   */
  saveConfig() {
    const config = {
      apiKey: this.apiKey,
      spreadsheetId: this.spreadsheetId,
      sheetName: this.sheetName
    };
    localStorage.setItem('googleSheetsConfig', JSON.stringify(config));
    this.isConfigured = !!(this.apiKey && this.spreadsheetId);
  }

  /**
   * Show configuration dialog
   */
  showConfigDialog() {
    const modal = document.getElementById('googleSheetsModal');
    if (!modal) {
      this.createConfigModal();
    }
    
    // Populate current values
    document.getElementById('gsApiKey').value = this.apiKey || '';
    document.getElementById('gsSpreadsheetId').value = this.spreadsheetId || '';
    document.getElementById('gsSheetName').value = this.sheetName || 'Records';
    
    document.getElementById('googleSheetsModal').style.display = 'block';
  }

  /**
   * Create configuration modal
   */
  createConfigModal() {
    const modalHTML = `
      <div id="googleSheetsModal" class="modal" style="display: none;">
        <div class="modal-content google-sheets-modal">
          <div class="modal-header">
            <h2>Google Sheets Sync Setup</h2>
            <button class="close-btn" id="gsModalClose">&times;</button>
          </div>
          
          <div class="gs-info">
            <p><strong>📊 Sync your data to Google Sheets</strong></p>
            <p>This allows you to:</p>
            <ul>
              <li>Access data from anywhere</li>
              <li>Share with team members</li>
              <li>Backup data online</li>
              <li>Use Google Sheets formulas</li>
            </ul>
          </div>

          <div class="gs-setup-steps">
            <h3>Setup Steps:</h3>
            <ol>
              <li><strong>Create Google Sheets API Key</strong>
                <ul>
                  <li>Go to <a href="#" id="gsConsoleLink">Google Cloud Console</a></li>
                  <li>Create/select a project</li>
                  <li>Enable "Google Sheets API"</li>
                  <li>Create credentials (API Key)</li>
                  <li>Restrict key to Google Sheets API</li>
                </ul>
              </li>
              <li><strong>Create a Google Sheet</strong>
                <ul>
                  <li>Go to <a href="#" id="gsSheetsLink">Google Sheets</a></li>
                  <li>Create new spreadsheet</li>
                  <li>Copy the ID from URL (between /d/ and /edit)</li>
                  <li>Make it publicly editable (Share → Anyone with link → Editor)</li>
                </ul>
              </li>
            </ol>
          </div>

          <div class="gs-form">
            <div class="form-row">
              <label for="gsApiKey">API Key *</label>
              <input type="text" id="gsApiKey" placeholder="AIza..." />
            </div>

            <div class="form-row">
              <label for="gsSpreadsheetId">Spreadsheet ID *</label>
              <input type="text" id="gsSpreadsheetId" placeholder="1BxiMVs0XRA5nFMdKvB..." />
              <small>From URL: docs.google.com/spreadsheets/d/<strong>SPREADSHEET_ID</strong>/edit</small>
            </div>

            <div class="form-row">
              <label for="gsSheetName">Sheet Name</label>
              <input type="text" id="gsSheetName" placeholder="Records" value="Records" />
              <small>The tab name in your spreadsheet (default: "Records")</small>
            </div>
          </div>

          <div class="modal-actions">
            <button id="gsTestConnection" class="btn">Test Connection</button>
            <button id="gsSaveConfig" class="btn btn-primary">Save Configuration</button>
            <button id="gsCancel" class="btn">Cancel</button>
          </div>

          <div id="gsStatus" class="gs-status"></div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Attach event listeners
    document.getElementById('gsModalClose').addEventListener('click', () => this.closeModal());
    document.getElementById('gsCancel').addEventListener('click', () => this.closeModal());
    document.getElementById('gsSaveConfig').addEventListener('click', () => this.saveConfiguration());
    document.getElementById('gsTestConnection').addEventListener('click', () => this.testConnection());
    
    // External links
    document.getElementById('gsConsoleLink').addEventListener('click', (e) => {
      e.preventDefault();
      if (window.api?.openExternal) {
        window.api.openExternal('https://console.cloud.google.com/apis/credentials');
      }
    });
    
    document.getElementById('gsSheetsLink').addEventListener('click', (e) => {
      e.preventDefault();
      if (window.api?.openExternal) {
        window.api.openExternal('https://sheets.google.com');
      }
    });
  }

  /**
   * Close modal
   */
  closeModal() {
    document.getElementById('googleSheetsModal').style.display = 'none';
  }

  /**
   * Save configuration from form
   */
  saveConfiguration() {
    this.apiKey = document.getElementById('gsApiKey').value.trim();
    this.spreadsheetId = document.getElementById('gsSpreadsheetId').value.trim();
    this.sheetName = document.getElementById('gsSheetName').value.trim() || 'Records';

    if (!this.apiKey || !this.spreadsheetId) {
      this.showStatus('❌ API Key and Spreadsheet ID are required', 'error');
      return;
    }

    this.saveConfig();
    this.showStatus('✅ Configuration saved! You can now sync data.', 'success');
    
    setTimeout(() => this.closeModal(), 2000);
  }

  /**
   * Test connection to Google Sheets
   */
  async testConnection() {
    const apiKey = document.getElementById('gsApiKey').value.trim();
    const spreadsheetId = document.getElementById('gsSpreadsheetId').value.trim();
    const sheetName = document.getElementById('gsSheetName').value.trim() || 'Records';

    if (!apiKey || !spreadsheetId) {
      this.showStatus('❌ Please fill in API Key and Spreadsheet ID', 'error');
      return;
    }

    this.showStatus('🔄 Testing connection...', 'info');

    try {
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}?key=${apiKey}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      const sheets = data.sheets.map(s => s.properties.title);
      
      if (sheets.includes(sheetName)) {
        this.showStatus(`✅ Connection successful! Found sheet "${sheetName}"`, 'success');
      } else {
        this.showStatus(`⚠️ Connected, but sheet "${sheetName}" not found. Available: ${sheets.join(', ')}`, 'warning');
      }
    } catch (error) {
      this.showStatus(`❌ Connection failed: ${error.message}`, 'error');
    }
  }

  /**
   * Sync data to Google Sheets
   */
  async syncToGoogleSheets() {
    if (!this.isConfigured) {
      alert('Please configure Google Sheets sync first.\nGo to File → Google Sheets Setup');
      return;
    }

    try {
      // Get all records from database
      const records = await window.api.getData();
      
      if (records.length === 0) {
        alert('No records to sync');
        return;
      }

      // Show progress
      if (window.keyboardShortcuts) {
        window.keyboardShortcuts.showNotification('🔄 Syncing to Google Sheets...');
      }

      // Get field headers
      const fields = window.fieldManager ? window.fieldManager.fields : [];
      const headers = ['ID', ...fields.map(f => f.label)];

      // Convert records to rows
      const rows = records.map(record => {
        return [record.id, ...fields.map(f => record[f.id] || '')];
      });

      // Add headers
      const allData = [headers, ...rows];

      // Clear existing data and write new data
      await this.clearSheet();
      await this.writeData(allData);

      alert(`✅ Synced ${records.length} records to Google Sheets!`);
      
      if (window.keyboardShortcuts) {
        window.keyboardShortcuts.showNotification('✅ Sync complete!');
      }
    } catch (error) {
      console.error('Sync error:', error);
      alert('❌ Sync failed: ' + error.message);
    }
  }

  /**
   * Clear sheet data
   */
  async clearSheet() {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${this.spreadsheetId}/values/${this.sheetName}:clear?key=${this.apiKey}`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });

    if (!response.ok) {
      throw new Error(`Failed to clear sheet: ${response.statusText}`);
    }
  }

  /**
   * Write data to sheet
   */
  async writeData(data) {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${this.spreadsheetId}/values/${this.sheetName}?valueInputOption=RAW&key=${this.apiKey}`;
    
    const response = await fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        range: this.sheetName,
        values: data
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || response.statusText);
    }
  }

  /**
   * Import data from Google Sheets
   */
  async importFromGoogleSheets() {
    if (!this.isConfigured) {
      alert('Please configure Google Sheets sync first.\nGo to File → Google Sheets Setup');
      return;
    }

    try {
      if (window.keyboardShortcuts) {
        window.keyboardShortcuts.showNotification('📥 Importing from Google Sheets...');
      }

      const url = `https://sheets.googleapis.com/v4/spreadsheets/${this.spreadsheetId}/values/${this.sheetName}?key=${this.apiKey}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      const rows = data.values;

      if (!rows || rows.length < 2) {
        alert('No data found in Google Sheet');
        return;
      }

      // First row is headers, skip it
      const dataRows = rows.slice(1);
      const headers = rows[0];

      // Get field mapping
      const fields = window.fieldManager ? window.fieldManager.fields : [];
      const fieldMap = {};
      
      headers.forEach((header, index) => {
        const field = fields.find(f => f.label === header || f.id === header.toLowerCase().replace(/\s+/g, '_'));
        if (field) {
          fieldMap[index] = field.id;
        }
      });

      // Import records (skip ID column at index 0)
      let imported = 0;
      for (const row of dataRows) {
        const record = {};
        Object.keys(fieldMap).forEach(index => {
          if (index > 0 && row[index]) { // Skip ID column
            record[fieldMap[index]] = row[index];
          }
        });

        if (Object.keys(record).length > 0) {
          await window.api.saveData(record);
          imported++;
        }
      }

      alert(`✅ Imported ${imported} records from Google Sheets!`);
      
      if (window.loadData) {
        window.loadData();
      }
      
      if (window.keyboardShortcuts) {
        window.keyboardShortcuts.showNotification('✅ Import complete!');
      }
    } catch (error) {
      console.error('Import error:', error);
      alert('❌ Import failed: ' + error.message);
    }
  }

  /**
   * Show status message
   */
  showStatus(message, type) {
    const statusEl = document.getElementById('gsStatus');
    if (statusEl) {
      statusEl.textContent = message;
      statusEl.className = `gs-status gs-status-${type}`;
    }
  }
}

// Initialize
window.googleSheetsSync = new GoogleSheetsSync();
