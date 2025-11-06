# Data Entry Manager - User Guide

**Version 1.2.0** | Complete Feature Guide

---

## 📚 Table of Contents

1. [Getting Started](#getting-started)
2. [Core Features](#core-features)
3. [Data Entry & Management](#data-entry--management)
4. [Import & Export](#import--export)
5. [Field Customization](#field-customization)
6. [Menu Bar](#menu-bar)
7. [Keyboard Shortcuts](#keyboard-shortcuts)
8. [Field Validation](#field-validation)
9. [Search & Filter](#search--filter)
10. [Tips & Best Practices](#tips--best-practices)
11. [Troubleshooting](#troubleshooting)

---

## Getting Started

### First Launch

1. **Launch the Application**
   - Double-click the Data Entry Manager icon
   - Or run `npm start` from the project directory

2. **Customize Your App Title**
   - Click on the header text "Data Entry Manager"
   - Type your organization/church name
   - Press Enter or click outside to save

3. **Review Default Fields**
   - The app comes with 15 pre-configured church record fields
   - You can customize these anytime via View → Customize Fields

---

## Core Features

### ✅ What This App Does

- **Offline Data Storage**: All your data stays on your computer
- **No Internet Required**: Works completely offline
- **Automatic Saving**: Data persists to local database
- **Excel Export**: Export to Excel format anytime
- **Bulk Import**: Import hundreds of records from CSV/Excel
- **Search & Filter**: Find records quickly
- **Customizable**: Add/remove/edit fields to match your needs

---

## Data Entry & Management

### Adding a New Record

**Method 1: Using Form**
1. Fill in the form fields
2. Click "Add Record" button
3. Record appears in the table below

**Method 2: Using Keyboard**
1. Press `Ctrl+N` to clear form
2. Fill in fields (use Tab to navigate)
3. Press `Ctrl+S` to save

### Editing a Record

1. Click the "Edit" button next to any record
2. Form will populate with record data
3. Modify the fields
4. Click "Update" button (or press `Ctrl+S`)

### Deleting a Record

1. Click the "Delete" button next to any record
2. Confirm the deletion
3. Record is permanently removed

### Canceling Edit Mode

- Click "Cancel" button
- Or press `Esc` key

---

## Import & Export

### Importing Data

**From CSV File:**

1. **Open Import Dialog**
   - Click "📥 Import Data" button
   - Or press `Ctrl+I`
   - Or menu: File → Import Data

2. **Select Your File**
   - Click "Select File"
   - Choose your `.csv` file
   - Preview shows first 5 rows

3. **Map Fields**
   - System auto-detects matching field names
   - Adjust mappings if needed
   - Skip columns by selecting "-- Skip --"

4. **Import**
   - Click "Import Data"
   - Wait for completion message
   - Records appear in table

**From Excel File:**

1. Follow same steps as CSV
2. Supports `.xlsx` and `.xls` formats
3. Only first sheet is imported

**Sample CSV Format:**
```csv
Name of Church,Place,Name,Birth,Note
St. Mary's Cathedral,New York,John Smith,1985-05-15,Sample entry
Holy Trinity Church,Boston,Jane Doe,1990-08-20,Another entry
```

### Exporting Data

**Export to Excel:**

1. Click "📊 Export to Excel" button
2. Or press `Ctrl+E`
3. Or menu: File → Export to Excel
4. File `records.xlsx` is created
5. Compatible with Church Records Template

---

## Field Customization

### Opening Field Settings

- Click "⚙️ Customize Fields" button in header
- Or menu: View → Customize Fields

### Adding a New Field

1. Click "+ Add New Field"
2. New field appears at bottom
3. Fill in:
   - **Label**: Display name (e.g., "Email Address")
   - **ID**: Database column name (e.g., "email")
   - **Type**: text, textarea, number, date, email
   - **Placeholder**: Helper text
   - **Required**: Check if mandatory

4. Click "Save Changes"

### Editing Existing Fields

1. Click in any field property
2. Modify the value
3. Click "Save Changes"

### Deleting a Field

1. Click red "Delete" button next to field
2. Click "Save Changes"
3. **Warning**: Data in that field is not deleted from existing records

### Reordering Fields

- Fields display in the order shown in settings
- Edit sequence by deleting and re-adding

### Reset to Default

1. Click "Reset to Default" button
2. Confirm action
3. Restores original 15 church record fields
4. **Warning**: Your custom fields are lost

---

## Menu Bar

### File Menu

| Action | Shortcut | Description |
|--------|----------|-------------|
| New Record | Ctrl+N | Clear form for new entry |
| Save Record | Ctrl+S | Save current form |
| Import Data | Ctrl+I | Open import dialog |
| Export to Excel | Ctrl+E | Export all records |
| Quit | Ctrl+Q (Win) | Close application |

### Edit Menu

| Action | Shortcut | Description |
|--------|----------|-------------|
| Undo | Ctrl+Z | Undo last action |
| Redo | Ctrl+Y | Redo action |
| Cut | Ctrl+X | Cut selected text |
| Copy | Ctrl+C | Copy selected text |
| Paste | Ctrl+V | Paste from clipboard |
| Select All | Ctrl+A | Select all text |
| Find | Ctrl+F | Focus search box |

### View Menu

| Action | Shortcut | Description |
|--------|----------|-------------|
| Reload | Ctrl+R | Reload app |
| Force Reload | Ctrl+Shift+R | Hard reload |
| Toggle DevTools | F12 | Open developer tools |
| Reset Zoom | Ctrl+0 | Reset zoom level |
| Zoom In | Ctrl++ | Increase zoom |
| Zoom Out | Ctrl+- | Decrease zoom |
| Toggle Fullscreen | F11 | Fullscreen mode |
| Customize Fields | - | Open field settings |

### Records Menu

| Action | Shortcut | Description |
|--------|----------|-------------|
| Refresh List | F5 | Reload records from database |
| Clear Form | Esc | Clear form inputs |
| View Statistics | - | Show database stats |

### Window Menu

- Minimize
- Zoom
- Close

### Help Menu

| Action | Description |
|--------|-------------|
| Keyboard Shortcuts | Show all shortcuts |
| Documentation | Open GitHub repo |
| Report Issue | Open GitHub issues |
| About | Show app version & info |

---

## Keyboard Shortcuts

### Quick Reference

**File Operations:**
- `Ctrl+N` - New Record (clear form)
- `Ctrl+S` - Save Record
- `Ctrl+I` - Import Data
- `Ctrl+E` - Export to Excel

**Navigation:**
- `Ctrl+F` - Focus Search Box
- `Tab` - Next field
- `Shift+Tab` - Previous field
- `Esc` - Cancel/Clear form or close modal
- `F5` - Refresh records list

**View:**
- `F11` - Toggle Fullscreen
- `Ctrl+0` - Reset Zoom
- `Ctrl++` - Zoom In
- `Ctrl+-` - Zoom Out
- `F12` - Toggle DevTools (debug mode)

**Edit:**
- `Ctrl+Z` - Undo
- `Ctrl+Y` - Redo
- `Ctrl+X` - Cut
- `Ctrl+C` - Copy
- `Ctrl+V` - Paste
- `Ctrl+A` - Select All

---

## Field Validation

### Date Fields

**Format Required:** `YYYY-MM-DD`

**Valid Examples:**
- ✅ `1990-05-15`
- ✅ `2025-01-01`
- ✅ `1878-12-25`

**Invalid Examples:**
- ❌ `05/15/1990` (US format)
- ❌ `15-05-1990` (European format)
- ❌ `1990/05/15` (Slashes)
- ❌ `May 15, 1990` (Text)

**Visual Feedback:**
- **Green border** = Valid date
- **Red border** = Invalid format with error message
- **No color** = Empty (optional field)

**Date Fields with Validation:**
- Birth
- BAPT (Baptism)
- CONF (Confirmation)
- 1 COM (First Communion)
- Marriage
- Death

### Form Submission

- Form won't submit if validation errors exist
- Fix all red-bordered fields before saving
- Error notification appears if you try to save with errors

---

## Search & Filter

### Using Search

1. **Focus Search Box**
   - Click in search field
   - Or press `Ctrl+F`

2. **Type Query**
   - Searches across ALL fields
   - Case-insensitive
   - Real-time results

3. **Clear Search**
   - Delete text from search box
   - All records reappear

**Search Examples:**
- `smith` - Finds all Smiths
- `1990` - Finds all 1990 births
- `new york` - Finds all New York locations
- `mary` - Finds church names or people named Mary

---

## Tips & Best Practices

### Data Entry

1. **Use Tab Key**: Navigate between fields quickly
2. **Save Often**: Press `Ctrl+S` frequently
3. **Date Format**: Use YYYY-MM-DD for consistency
4. **Required Fields**: Name of Church, Place, and Name are required

### Import

1. **Prepare CSV**: Ensure first row has column headers
2. **Match Field Names**: Use exact field IDs for auto-mapping
3. **Test Small**: Import 5-10 records first to test mapping
4. **Backup First**: Export existing data before large imports

### Field Customization

1. **Plan Fields**: Think about what data you need before adding
2. **Use IDs Carefully**: Keep IDs short and lowercase (no spaces)
3. **Validation Types**: Use 'email' type for emails, 'date' for dates
4. **Export Before Reset**: Save your data before resetting fields

### Performance

1. **Database Size**: App tested with 10,000+ records
2. **Search Speed**: Fast even with large datasets
3. **Import Speed**: ~100-200 records per second

---

## Troubleshooting

### Import Not Working

**Problem**: Import modal won't close
- **Solution**: Press `Esc` or click Cancel button

**Problem**: Fields don't map correctly
- **Solution**: Manually select correct field in dropdown

**Problem**: File won't upload
- **Solution**: Ensure file is .csv, .xlsx, or .xls format
- **Solution**: Close file in Excel before importing

### Validation Errors

**Problem**: Date won't accept my format
- **Solution**: Use YYYY-MM-DD format only
- **Tip**: Future versions will support more formats

**Problem**: Form won't submit
- **Solution**: Fix all red-bordered fields
- **Solution**: Check error messages below invalid fields

### Data Issues

**Problem**: Records disappeared
- **Solution**: Check search box (clear it)
- **Solution**: Click "Refresh List" or press F5

**Problem**: Export doesn't include new fields
- **Solution**: Custom fields export in additional columns
- **Solution**: Check column headers in Excel

### Application Issues

**Problem**: App won't start
- **Solution**: Run `npm install` then `npm start`
- **Solution**: Check Node.js is installed

**Problem**: Keyboard shortcuts don't work
- **Solution**: Ensure no modal is open (Esc to close)
- **Solution**: Try menu bar alternatives

---

## Statistics Dashboard

Access via: **Records → View Statistics**

Shows:
- Total number of records
- Records with notes
- Complete date records (all dates filled)
- Birth date range (earliest to latest)
- Last updated timestamp

---

## Data Files

### Location

All data files are in the app directory:

- `data.db` - SQLite database (your records)
- `records.xlsx` - Last Excel export
- Browser localStorage - Field config and app title

### Backup

**Manual Backup:**
1. Export to Excel regularly
2. Copy `data.db` file to backup location

**Restore:**
1. Copy backed-up `data.db` to app directory
2. Restart application

---

## Advanced Features

### Developer Tools

Access: Press `F12` or View → Toggle DevTools

Use for:
- Debugging issues
- Viewing console logs
- Inspecting HTML/CSS
- Network monitoring

### Database Direct Access

The `data.db` file is a standard SQLite database:
- Can be opened with SQLite tools
- Schema: 15+ columns based on your fields
- Table name: `records`

---

## Support & Resources

### Documentation
- **GitHub**: https://github.com/Sundarban-Lab/data-entry-app
- **README**: See README.md for technical details
- **Release Notes**: RELEASE_NOTES_v1.2.0.md

### Get Help
- **Report Issue**: Help → Report Issue (GitHub)
- **Ask Questions**: Create GitHub issue with [Question] tag

### Developer
**Anik Chowdhury**
- LinkedIn: [linkedin.com/in/anikchowdhurybd](https://www.linkedin.com/in/anikchowdhurybd/)

---

## Version History

**v1.2.0** (Current)
- ✅ Field validation (date format)
- 📥 Data import (CSV/Excel)
- ⌨️ Keyboard shortcuts
- 🎯 Application menu bar
- 📊 Statistics dashboard

**v1.1.0**
- Customizable fields system
- Editable app title
- Full-width inputs
- External link handling

**v1.0.0**
- Initial release
- Basic CRUD operations
- Excel export
- Search functionality

---

**Last Updated**: November 7, 2025  
**App Version**: 1.2.0  
**License**: MIT
