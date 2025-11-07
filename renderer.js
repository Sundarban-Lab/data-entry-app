// Dynamic Church Records Renderer - Works with field-manager.js
const form = document.getElementById("dataForm");
const addBtn = document.getElementById("addBtn");
const updateBtn = document.getElementById("updateBtn");
const cancelBtn = document.getElementById("cancelBtn");
const tableBody = document.querySelector("#dataTable tbody");
const exportBtn = document.getElementById("exportBtn");
const importBtn = document.getElementById("importBtn");
const searchInput = document.getElementById("search");
let allRecords = [];

// Wait for field manager to initialize
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    if (window.fieldManager) {
      loadData();
      setupValidation();
    }
  }, 100);

  // Handle external links - open in default browser
  document.addEventListener('click', (e) => {
    if (e.target.tagName === 'A' && e.target.href && e.target.target === '_blank') {
      e.preventDefault();
      window.api.openExternal(e.target.href);
    }
  });
});

async function loadData() {
  allRecords = await window.api.getData();
  renderTable(allRecords);
}

// Make loadData globally accessible for field manager
window.loadData = loadData;

function renderTable(records) {
  tableBody.innerHTML = "";
  
  if (records.length === 0) {
    const colspan = window.fieldManager ? window.fieldManager.fields.slice(0, 5).length + 2 : 7;
    tableBody.innerHTML = `<tr><td colspan="${colspan}" style="text-align:center">No records found</td></tr>`;
    return;
  }
  
  records.forEach(row => {
    if (window.fieldManager) {
      tableBody.innerHTML += window.fieldManager.renderTableRow(row);
    }
  });
}

function getFormData() {
  if (window.fieldManager) {
    return {
      id: document.getElementById("recordId").value,
      ...window.fieldManager.getFormData()
    };
  }
  return {};
}

function populateForm(record) {
  document.getElementById("recordId").value = record.id;
  if (window.fieldManager) {
    window.fieldManager.populateForm(record);
  }
}

function clearForm() {
  document.getElementById("recordId").value = "";
  if (window.fieldManager) {
    window.fieldManager.clearForm();
  }
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  
  // Validate form before submission
  if (window.validator && window.fieldManager) {
    const isValid = window.validator.validateForm(window.fieldManager.fields);
    if (!isValid) {
      window.keyboardShortcuts?.showNotification('❌ Please fix validation errors');
      return;
    }
  }
  
  const rec = getFormData();
  delete rec.id;
  
  allRecords = await window.api.saveData(rec);
  renderTable(allRecords);
  clearForm();
  
  if (window.validator) {
    window.validator.clearValidation();
  }
});

window.editRecord = (id) => {
  const record = allRecords.find(r => r.id === id);
  if (!record) return;
  
  populateForm(record);
  addBtn.style.display = "none";
  updateBtn.style.display = "inline";
  cancelBtn.style.display = "inline";
  form.scrollIntoView({ behavior: "smooth" });
};

updateBtn.addEventListener("click", async () => {
  // Validate form before update
  if (window.validator && window.fieldManager) {
    const isValid = window.validator.validateForm(window.fieldManager.fields);
    if (!isValid) {
      window.keyboardShortcuts?.showNotification('❌ Please fix validation errors');
      return;
    }
  }
  
  const rec = getFormData();
  if (!rec.id) return;
  
  allRecords = await window.api.updateData(rec);
  renderTable(allRecords);
  clearForm();
  
  if (window.validator) {
    window.validator.clearValidation();
  }
  
  addBtn.style.display = "inline";
  updateBtn.style.display = "none";
  cancelBtn.style.display = "none";
});

cancelBtn.addEventListener("click", () => {
  clearForm();
  if (window.validator) {
    window.validator.clearValidation();
  }
  addBtn.style.display = "inline";
  updateBtn.style.display = "none";
  cancelBtn.style.display = "none";
});

window.deleteRecord = async (id) => {
  if (!confirm("Delete this record?")) return;
  
  allRecords = await window.api.deleteData(id);
  renderTable(allRecords);
};

searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  
  const filtered = allRecords.filter(record => {
    if (!window.fieldManager) return false;
    
    // Search across all fields
    return window.fieldManager.fields.some(field => {
      const value = record[field.id];
      return value && value.toString().toLowerCase().includes(query);
    });
  });
  
  renderTable(filtered);
});

exportBtn.addEventListener("click", async () => {
  await window.api.exportExcel();
  alert("Exported to records.xlsx");
});

importBtn.addEventListener("click", () => {
  if (window.dataImporter) {
    window.dataImporter.showImportDialog();
  }
});

// Setup validation for dynamic fields
function setupValidation() {
  if (!window.validator || !window.fieldManager) return;
  
  window.fieldManager.fields.forEach(field => {
    if (field.validation) {
      const input = document.getElementById(field.id);
      if (input) {
        window.validator.attachToInput(input, field.validation);
      }
    }
  });
}

// Make functions globally accessible
window.saveData = async () => {
  // Trigger form submit programmatically
  form.dispatchEvent(new Event('submit'));
};

window.clearForm = clearForm;
