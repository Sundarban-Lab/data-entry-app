// Field Manager - Handles dynamic field customization

// Default field configuration
const DEFAULT_FIELDS = [
  { id: 'church_name', label: 'Name of Church', type: 'text', required: true, placeholder: 'Church name' },
  { id: 'place', label: 'Place', type: 'text', required: true, placeholder: 'Location' },
  { id: 'husband_name', label: 'Husband Name', type: 'text', required: false, placeholder: 'Husband\'s full name' },
  { id: 'wife_name', label: 'Wife Name', type: 'text', required: false, placeholder: 'Wife\'s full name' },
  { id: 'father_name', label: 'Father Name', type: 'text', required: false, placeholder: 'Father\'s full name' },
  { id: 'mother_name', label: 'Mother Name', type: 'text', required: false, placeholder: 'Mother\'s full name' },
  { id: 'relation', label: 'Relation', type: 'text', required: false, placeholder: 'Relationship' },
  { id: 'name', label: 'Name', type: 'text', required: true, placeholder: 'Individual\'s name' },
  { id: 'birth', label: 'Birth', type: 'text', required: false, placeholder: 'Birth date' },
  { id: 'bapt', label: 'BAPT', type: 'text', required: false, placeholder: 'Baptism date' },
  { id: 'conf', label: 'CONF', type: 'text', required: false, placeholder: 'Confirmation date' },
  { id: 'first_com', label: '1 COM', type: 'text', required: false, placeholder: 'First Communion' },
  { id: 'marriage', label: 'Marriage', type: 'text', required: false, placeholder: 'Marriage date' },
  { id: 'death', label: 'Death', type: 'text', required: false, placeholder: 'Death date' },
  { id: 'note', label: 'Note', type: 'textarea', required: false, placeholder: 'Additional notes' }
];

class FieldManager {
  constructor() {
    this.fields = this.loadFields();
    this.appTitle = this.loadAppTitle();
    this.init();
  }

  loadFields() {
    const stored = localStorage.getItem('customFields');
    return stored ? JSON.parse(stored) : [...DEFAULT_FIELDS];
  }

  saveFields() {
    localStorage.setItem('customFields', JSON.stringify(this.fields));
  }

  loadAppTitle() {
    return localStorage.getItem('appTitle') || 'Church Records Data Entry';
  }

  saveAppTitle(title) {
    localStorage.setItem('appTitle', title);
    this.appTitle = title;
  }

  init() {
    this.setupTitleEditing();
    this.setupModal();
    this.renderForm();
    this.renderTableHeaders();
    
    // Set initial title
    const titleEl = document.getElementById('appTitle');
    if (titleEl) titleEl.textContent = this.appTitle;
  }

  setupTitleEditing() {
    const titleEl = document.getElementById('appTitle');
    if (!titleEl) return;

    let originalTitle = this.appTitle;

    titleEl.addEventListener('click', () => {
      if (titleEl.getAttribute('contenteditable') === 'true') return;
      
      originalTitle = titleEl.textContent;
      titleEl.setAttribute('contenteditable', 'true');
      titleEl.classList.add('editing');
      titleEl.focus();
      
      // Select all text
      const range = document.createRange();
      range.selectNodeContents(titleEl);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    });

    titleEl.addEventListener('blur', () => {
      titleEl.setAttribute('contenteditable', 'false');
      titleEl.classList.remove('editing');
      
      const newTitle = titleEl.textContent.trim();
      if (newTitle && newTitle !== originalTitle) {
        this.saveAppTitle(newTitle);
      } else if (!newTitle) {
        titleEl.textContent = originalTitle;
      }
    });

    titleEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        titleEl.blur();
      } else if (e.key === 'Escape') {
        titleEl.textContent = originalTitle;
        titleEl.blur();
      }
    });
  }

  setupModal() {
    const modal = document.getElementById('settingsModal');
    const settingsBtn = document.getElementById('settingsBtn');
    const closeBtn = document.getElementById('closeModal');
    const saveBtn = document.getElementById('saveFieldsBtn');
    const resetBtn = document.getElementById('resetFieldsBtn');
    const addFieldBtn = document.getElementById('addFieldBtn');

    settingsBtn?.addEventListener('click', () => {
      this.renderFieldList();
      modal?.classList.add('active');
    });

    closeBtn?.addEventListener('click', () => {
      modal?.classList.remove('active');
    });

    modal?.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });

    saveBtn?.addEventListener('click', () => {
      this.saveFieldsFromModal();
      modal?.classList.remove('active');
      this.renderForm();
      this.renderTableHeaders();
      
      // Re-render table with existing data
      if (window.loadData) {
        window.loadData();
      }
    });

    resetBtn?.addEventListener('click', () => {
      if (confirm('Reset all fields to default? This will not delete your data.')) {
        this.fields = [...DEFAULT_FIELDS];
        this.saveFields();
        this.renderFieldList();
        this.renderForm();
        this.renderTableHeaders();
        
        if (window.loadData) {
          window.loadData();
        }
      }
    });

    addFieldBtn?.addEventListener('click', () => {
      this.addNewField();
    });
  }

  renderFieldList() {
    const fieldList = document.getElementById('fieldList');
    if (!fieldList) return;

    fieldList.innerHTML = this.fields.map((field, index) => `
      <div class="field-item" data-index="${index}">
        <span class="drag-handle">⋮⋮</span>
        <div style="flex: 1; display: flex; flex-direction: column; gap: 8px;">
          <div style="display: flex; gap: 10px;">
            <input type="text" value="${field.label}" data-prop="label" placeholder="Label">
            <input type="text" value="${field.id}" data-prop="id" placeholder="Field ID" style="max-width: 150px;">
          </div>
          <div style="display: flex; gap: 10px; align-items: center;">
            <select data-prop="type" style="width: 120px;">
              <option value="text" ${field.type === 'text' ? 'selected' : ''}>Text</option>
              <option value="textarea" ${field.type === 'textarea' ? 'selected' : ''}>Textarea</option>
              <option value="number" ${field.type === 'number' ? 'selected' : ''}>Number</option>
              <option value="date" ${field.type === 'date' ? 'selected' : ''}>Date</option>
              <option value="email" ${field.type === 'email' ? 'selected' : ''}>Email</option>
            </select>
            <input type="text" value="${field.placeholder || ''}" data-prop="placeholder" placeholder="Placeholder" style="flex: 1;">
            <label style="display: flex; align-items: center; gap: 4px; white-space: nowrap;">
              <input type="checkbox" data-prop="required" ${field.required ? 'checked' : ''}>
              Required
            </label>
          </div>
        </div>
        <button class="btn-small btn-danger" onclick="fieldManager.removeField(${index})">Delete</button>
      </div>
    `).join('');
  }

  saveFieldsFromModal() {
    const fieldItems = document.querySelectorAll('.field-item');
    const newFields = [];

    fieldItems.forEach(item => {
      const inputs = item.querySelectorAll('[data-prop]');
      const field = {};
      
      inputs.forEach(input => {
        const prop = input.dataset.prop;
        if (input.type === 'checkbox') {
          field[prop] = input.checked;
        } else {
          field[prop] = input.value;
        }
      });

      if (field.id && field.label) {
        newFields.push(field);
      }
    });

    this.fields = newFields;
    this.saveFields();
  }

  addNewField() {
    const newField = {
      id: 'field_' + Date.now(),
      label: 'New Field',
      type: 'text',
      required: false,
      placeholder: ''
    };
    
    this.fields.push(newField);
    this.renderFieldList();
  }

  removeField(index) {
    if (confirm('Delete this field? Data in this field will not be deleted from existing records.')) {
      this.fields.splice(index, 1);
      this.renderFieldList();
    }
  }

  renderForm() {
    const container = document.getElementById('formFieldsContainer');
    if (!container) return;

    container.innerHTML = this.fields.map(field => {
      const isFullWidth = field.type === 'textarea';
      const inputHtml = field.type === 'textarea'
        ? `<textarea id="${field.id}" rows="3" placeholder="${field.placeholder || ''}" ${field.required ? 'required' : ''}></textarea>`
        : `<input id="${field.id}" type="${field.type}" placeholder="${field.placeholder || ''}" ${field.required ? 'required' : ''}>`;

      return `
        <div class="form-row${isFullWidth ? ' full-width' : ''}">
          <label for="${field.id}">${field.label}${field.required ? ' *' : ''}</label>
          ${inputHtml}
        </div>
      `;
    }).join('');
  }

  renderTableHeaders() {
    const headerRow = document.getElementById('tableHeaderRow');
    if (!headerRow) return;

    // Show first 5 fields + actions
    const visibleFields = this.fields.slice(0, 5);
    
    headerRow.innerHTML = `
      <th style="width:60px">ID</th>
      ${visibleFields.map(field => `<th>${field.label}</th>`).join('')}
      <th style="width:120px">Actions</th>
    `;
  }

  getFieldValue(record, fieldId) {
    return record[fieldId] || '';
  }

  getFormData() {
    const data = {};
    this.fields.forEach(field => {
      const el = document.getElementById(field.id);
      if (el) {
        data[field.id] = el.value;
      }
    });
    return data;
  }

  populateForm(record) {
    this.fields.forEach(field => {
      const el = document.getElementById(field.id);
      if (el) {
        el.value = record[field.id] || '';
      }
    });
  }

  clearForm() {
    this.fields.forEach(field => {
      const el = document.getElementById(field.id);
      if (el) {
        el.value = '';
      }
    });
  }

  renderTableRow(record) {
    const visibleFields = this.fields.slice(0, 5);
    
    return `
      <tr>
        <td>${record.id}</td>
        ${visibleFields.map(field => `<td>${this.getFieldValue(record, field.id)}</td>`).join('')}
        <td class="actions">
          <button class="btn-small" onclick="editRecord(${record.id})">Edit</button>
          <button class="btn-small" onclick="deleteRecord(${record.id})">Delete</button>
        </td>
      </tr>
    `;
  }
}

// Initialize field manager
const fieldManager = new FieldManager();

// Make it globally accessible
window.fieldManager = fieldManager;
