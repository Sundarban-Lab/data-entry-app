# Data Entry App# Data Entry App



A customizable offline data entry application for managing church records and other data efficiently.An offline data entry and data collection application for managing data efficiently.



## Features## Features



### Core Features- Offline data entry

- **Offline Data Entry**: All data persists locally using SQL.js- Data collection

- **Full CRUD Operations**: Create, Read, Update, Delete records- Data management

- **Excel Export**: Export records to Excel with church record template compatibility

- **Search & Filter**: Real-time search across all fields## Installation



### Customization Features ✨```bash

- **Editable App Title**: Click the header to rename your applicationnpm install

- **Dynamic Field Management**: ```

  - Add custom fields with different types (text, textarea, number, date, email)

  - Delete fields you don't need## Author

  - Update field properties (label, placeholder, required status)

  - Reorder fields (drag handles)Anik Chowdhury

- **Persistent Configuration**: All customizations saved in browser localStorage

- **Reset to Default**: Restore the original 15 church record fields anytime## License



### Default Church Record FieldsISC

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

## Usage

### Run the Application
```bash
npm start
```

### Build Windows Installer
```bash
npm run build:win
```
The installer will be created in the `release3/` directory.

### Customize Your App

1. **Change the App Title**:
   - Click on the header text "Church Records Data Entry"
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

ISC
