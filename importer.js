/**
 * Data Import Module
 * Handles CSV and Excel file import with field mapping
 */

class DataImporter {
  constructor() {
    this.supportedTypes = ['.csv', '.xlsx', '.xls'];
  }

  /**
   * Show import dialog
   */
  async showImportDialog() {
    const modal = document.getElementById('importModal');
    if (!modal) {
      this.createImportModal();
    }
    
    document.getElementById('importModal').style.display = 'block';
    document.getElementById('importFile').value = '';
    document.getElementById('importPreview').innerHTML = '';
    document.getElementById('importMappingContainer').style.display = 'none';
  }

  /**
   * Create import modal UI
   */
  createImportModal() {
    const modalHTML = `
      <div id="importModal" class="modal" style="display: none;">
        <div class="modal-content import-modal">
          <span class="close" onclick="document.getElementById('importModal').style.display='none'">&times;</span>
          <h2>Import Data</h2>
          
          <div class="import-section">
            <label for="importFile">Select File (CSV or Excel):</label>
            <input type="file" id="importFile" accept=".csv,.xlsx,.xls" />
          </div>

          <div id="importPreview" class="import-preview"></div>
          
          <div id="importMappingContainer" style="display: none;">
            <h3>Map Fields</h3>
            <p>Match your file columns to database fields:</p>
            <div id="importMapping"></div>
            <div class="modal-actions">
              <button id="importConfirm" class="btn btn-primary">Import Data</button>
              <button onclick="document.getElementById('importModal').style.display='none'" class="btn">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Attach event listeners
    document.getElementById('importFile').addEventListener('change', (e) => this.handleFileSelect(e));
    document.getElementById('importConfirm').addEventListener('click', () => this.confirmImport());
  }

  /**
   * Handle file selection
   */
  async handleFileSelect(event) {
    const file = event.target.files[0];
    if (!file) return;

    const extension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
    
    try {
      if (extension === '.csv') {
        await this.parseCSV(file);
      } else if (extension === '.xlsx' || extension === '.xls') {
        await this.parseExcel(file);
      }
    } catch (error) {
      alert('Error reading file: ' + error.message);
    }
  }

  /**
   * Parse CSV file
   */
  async parseCSV(file) {
    const text = await file.text();
    const lines = text.split('\n').filter(line => line.trim());
    
    if (lines.length === 0) {
      alert('File is empty');
      return;
    }

    // Parse CSV (simple implementation, handles quoted values)
    const parseCSVLine = (line) => {
      const result = [];
      let current = '';
      let inQuotes = false;
      
      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
          result.push(current.trim());
          current = '';
        } else {
          current += char;
        }
      }
      result.push(current.trim());
      return result;
    };

    const headers = parseCSVLine(lines[0]);
    const rows = lines.slice(1).map(line => parseCSVLine(line));

    this.data = { headers, rows };
    this.showPreview(headers, rows.slice(0, 5));
  }

  /**
   * Parse Excel file
   */
  async parseExcel(file) {
    const arrayBuffer = await file.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: 'array' });
    
    const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });

    if (data.length === 0) {
      alert('Spreadsheet is empty');
      return;
    }

    const headers = data[0];
    const rows = data.slice(1);

    this.data = { headers, rows };
    this.showPreview(headers, rows.slice(0, 5));
  }

  /**
   * Show preview and mapping UI
   */
  showPreview(headers, sampleRows) {
    const previewHTML = `
      <h3>Preview (first 5 rows)</h3>
      <div class="table-container" style="max-height: 200px; overflow: auto;">
        <table>
          <thead>
            <tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr>
          </thead>
          <tbody>
            ${sampleRows.map(row => `<tr>${row.map(cell => `<td>${cell || ''}</td>`).join('')}</tr>`).join('')}
          </tbody>
        </table>
      </div>
    `;

    document.getElementById('importPreview').innerHTML = previewHTML;
    this.showFieldMapping(headers);
  }

  /**
   * Show field mapping interface
   */
  showFieldMapping(fileHeaders) {
    const fields = window.fieldManager ? window.fieldManager.fields : [];
    
    let mappingHTML = '<div class="field-mapping">';
    
    fileHeaders.forEach((header, index) => {
      mappingHTML += `
        <div class="mapping-row">
          <label>${header} →</label>
          <select id="map_${index}" class="field-map-select">
            <option value="">-- Skip --</option>
            ${fields.map(f => {
              const selected = f.label.toLowerCase() === header.toLowerCase() ? 'selected' : '';
              return `<option value="${f.id}" ${selected}>${f.label}</option>`;
            }).join('')}
          </select>
        </div>
      `;
    });
    
    mappingHTML += '</div>';
    
    document.getElementById('importMapping').innerHTML = mappingHTML;
    document.getElementById('importMappingContainer').style.display = 'block';
  }

  /**
   * Confirm and execute import
   */
  async confirmImport() {
    if (!this.data) return;

    // Build mapping
    const mapping = [];
    const fileHeaders = this.data.headers;
    
    fileHeaders.forEach((header, index) => {
      const select = document.getElementById(`map_${index}`);
      if (select && select.value) {
        mapping.push({ fileIndex: index, fieldId: select.value });
      }
    });

    if (mapping.length === 0) {
      alert('Please map at least one field');
      return;
    }

    // Import data
    let successCount = 0;
    let errorCount = 0;

    for (const row of this.data.rows) {
      // Skip empty rows
      if (row.every(cell => !cell || cell.trim() === '')) continue;

      // Build record object
      const record = {};
      mapping.forEach(map => {
        const value = row[map.fileIndex];
        if (value !== undefined && value !== null) {
          record[map.fieldId] = value.toString().trim();
        }
      });

      // Save to database
      try {
        await window.api.saveData(record);
        successCount++;
      } catch (error) {
        console.error('Error importing row:', error);
        errorCount++;
      }
    }

    // Close modal and show results
    document.getElementById('importModal').style.display = 'none';
    alert(`Import complete!\nSuccess: ${successCount}\nErrors: ${errorCount}`);

    // Refresh table
    if (window.loadData) {
      window.loadData();
    }
  }
}

// Export for use in renderer
window.dataImporter = new DataImporter();
