# Data Entry App

A professional, customizable offline data entry application for managing church records and other data efficiently. Built with Electron and SQL.js for maximum portability and security.

## 🌟 Features

### Core Features
- **Offline Data Entry**: All data persists locally using SQL.js (no server required)
- **Full CRUD Operations**: Create, Read, Update, Delete records with ease
- **Excel Export**: Export records to Excel with church record template compatibility
- **Search & Filter**: Real-time search across all fields
- **Responsive Design**: Works on desktop and adapts to different screen sizes

### 🆕 Professional Features (v1.2.0)
- **✅ Field Validation**: Real-time validation for dates, emails, phone numbers with visual feedback
- **📥 Data Import**: Bulk import from CSV/Excel files with intelligent field mapping
- **🎯 Application Menu Bar**: Professional menu with File, Edit, View, Records, Window, Help
- **📊 Statistics Dashboard**: View total records, date ranges, and database insights
- **⌨️ Keyboard Shortcuts**:
  - `Ctrl+S` - Save current record
  - `Ctrl+N` - New record
  - `Ctrl+F` - Focus search
  - `Ctrl+E` - Export to Excel
  - `Ctrl+I` - Import data
  - `Esc` - Cancel/Clear form

### Customization Features ✨
- **Editable App Title**: Click the header to rename your application
- **Dynamic Field Management**: 
  - Add custom fields with different types (text, textarea, number, date, email)
  - Delete fields you don't need
  - Update field properties (label, placeholder, required status)
- **Persistent Configuration**: All customizations saved in browser localStorage
- **Reset to Default**: Restore the original 15 church record fields anytime

### Default Church Record Fields
1. Name of Church
2. Place
3. Husband Name
4. Wife Name
5. Father Name
6. Mother Name
7. Relation
8. Name
9. Birth
10. BAPT (Baptism)
11. CONF (Confirmation)
12. 1 COM (First Communion)
13. Marriage
14. Death
15. Note

## Installation

```bash
npm install
```

## 📖 Documentation

- **[Complete User Guide](USER_GUIDE.md)** - Detailed feature documentation
- **[Testing Guide](TESTING.md)** - QA testing procedures
- **[Release Notes v1.2.0](RELEASE_NOTES_v1.2.0.md)** - What's new

## Usage

### Run the Application
```bash
npm start
```

### Build Windows package (ZIP)
```bash
npm run dist
```
The packaged app will be created in the `dist/` directory (ZIP archive). You can extract it and run `Data Entry Manager.exe`.

### Customize Your App

1. **Change the App Title**:
  - Click on the app title in the header ("Data Entry Manager")
   - Type your custom name
   - Press Enter to save

2. **Manage Fields**:
   - Click the "⚙️ Customize Fields" button
   - **Add Field**: Click "+ Add New Field"
   - **Edit Field**: Modify label, ID, type, placeholder, or required status
   - **Delete Field**: Click the red "Delete" button
   - Click "Save Changes" to apply

3. **Reset to Default**:
   - Open field settings
   - Click "Reset to Default"
   - Confirm to restore original 15 church fields

## Technology Stack

- **Electron** v25.3.0 - Desktop application framework
- **sql.js** v1.9.0 - SQLite database (WASM, no native dependencies)
- **xlsx** v0.18.5 - Excel file generation
- **electron-builder** v24.13.3 - Installer packaging

## Data Storage

- **Database**: `data.db` (SQLite via sql.js)
- **Excel Exports**: `records.xlsx`
- **Customizations**: Browser localStorage
  - `customFields` - Field configuration
  - `appTitle` - Application title

## Development

### Project Structure
```
data-entry-app/
├── main.js              # Electron main process
├── preload.js           # Secure IPC bridge
├── database.js          # Database operations
├── index.html           # Main UI structure
├── renderer.js          # UI logic
├── field-manager.js     # Dynamic field management
├── style.css            # Dark theme styling
├── package.json         # Dependencies and build config
└── .github/
    └── workflows/
        └── build-windows.yml  # CI/CD workflow
```

### Security
- Context isolation enabled
- Sandbox mode enabled
- No node integration in renderer
- Secure IPC via contextBridge

## CI/CD

GitHub Actions workflow automatically builds Windows installer on push to:
- `main` branch
- `clean-build` branch
- Any `copilot/*` branches

Download built installer from GitHub Actions artifacts.

## Author

Anik Chowdhury

## License

MIT
