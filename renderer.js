// Use APIs exposed by preload (contextBridge)

const form = document.getElementById('dataForm');
const addBtn = document.getElementById('addBtn');
const updateBtn = document.getElementById('updateBtn');
const tableBody = document.querySelector('#dataTable tbody');
const exportBtn = document.getElementById('exportBtn');
const searchInput = document.getElementById('search');

let allRecords = [];

// Load data
async function loadData() {
  allRecords = await window.api.getData();
  renderTable(allRecords);
}

// Render table
function renderTable(records) {
  tableBody.innerHTML = '';
  records.forEach((row) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${row.id}</td>
      <td>${row.name}</td>
      <td>${row.email}</td>
      <td>${row.age}</td>
      <td class="actions">
        <button onclick="editRecord(${row.id})">✏️ Edit</button>
        <button onclick="deleteRecord(${row.id})">🗑️ Delete</button>
      </td>`;
    tableBody.appendChild(tr);
  });
}

// Add record
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const record = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    age: document.getElementById('age').value
  };
  allRecords = await window.api.saveData(record);
  renderTable(allRecords);
  form.reset();
});

// Edit record
window.editRecord = (id) => {
  const record = allRecords.find((r) => r.id === id);
  document.getElementById('recordId').value = record.id;
  document.getElementById('name').value = record.name;
  document.getElementById('email').value = record.email;
  document.getElementById('age').value = record.age;
  addBtn.style.display = 'none';
  updateBtn.style.display = 'inline';
};

// Update record
updateBtn.addEventListener('click', async () => {
  const record = {
    id: document.getElementById('recordId').value,
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    age: document.getElementById('age').value
  };
  allRecords = await window.api.updateData(record);
  renderTable(allRecords);
  form.reset();
  addBtn.style.display = 'inline';
  updateBtn.style.display = 'none';
});

// Delete record
window.deleteRecord = async (id) => {
  if (confirm('Are you sure you want to delete this record?')) {
  allRecords = await window.api.deleteData(id);
    renderTable(allRecords);
  }
};

// Search filter
searchInput.addEventListener('input', () => {
  const q = searchInput.value.toLowerCase();
  const filtered = allRecords.filter(
    (r) => r.name.toLowerCase().includes(q) || r.email.toLowerCase().includes(q)
  );
  renderTable(filtered);
});

// Export manually
exportBtn.addEventListener('click', async () => {
  await window.api.exportExcel();
  alert('Excel file automatically updated: records.xlsx');
});

loadData();
