# Release Notes - v1.1.0

**Release Date:** November 7, 2025  
**Tag:** `v1.1.0`  
**Branch:** `clean-build` → `main`

---

## 🎉 What's New

### Customizable Fields System
- **Editable App Title**: Click the header to rename your application. Changes persist in localStorage.
- **Dynamic Field Manager**:
  - Add, delete, or update form fields on the fly
  - Customize field properties: label, type (text/textarea/number/date/email), placeholder, required status
  - Fields configuration saved to localStorage (no database migration needed)
- **Settings Modal**: Access field customization via ⚙️ Customize Fields button
- **Reset to Default**: Restore original 15 church record fields anytime

### UI/UX Improvements
- **Full-Width Inputs**: All form fields now span 100% of container width for better usability
- **Centered Layout**: Header and footer text centered for cleaner appearance
- **Responsive Design**: Labels stack above inputs; mobile-friendly

### External Link Handling
- **Secure Link Opening**: External links (like LinkedIn profile in footer) open in default browser via secure IPC communication (preload → main process)
- **Footer Attribution**: "Developed by [Anik Chowdhury](LinkedIn)" with working external link

### Security & Stability
- **Content Security Policy**: Added CSP meta tag to prevent XSS and inline script attacks
- **Context Isolation**: Maintained strict sandbox and contextIsolation settings
- **Minimal API Surface**: Preload exposes only necessary functions via contextBridge
- **DevTools Disabled**: Removed auto-opening DevTools in production builds

### Developer Experience
- **Debug Logging**: Comprehensive console logs for field manager initialization (can be removed for production)
- **GitHub Actions CI**: Automated Windows installer builds on push to `clean-build` branch
- **Version Bump**: `1.0.0` → `1.1.0` with git tag

---

## 📦 Installation

### Download the Installer
1. Go to [GitHub Actions](https://github.com/Sundarban-Lab/data-entry-app/actions)
2. Click the latest successful workflow run
3. Scroll to **Artifacts** section
4. Download `release3` (contains Windows `.exe` installer)
5. Run the installer (one-click, per-user install)

### From Source
```bash
git clone https://github.com/Sundarban-Lab/data-entry-app.git
cd data-entry-app
git checkout v1.1.0
npm install
npm start
```

---

## 🛠️ Technical Changes

### Modified Files
- **index.html**
  - Added Content-Security-Policy meta tag
  - Updated inline styles for centered header/footer
  - Simplified link click handler with async/await
- **main.js**
  - Added `open-external` IPC handler for secure external link opening
  - Removed DevTools auto-open for production
  - Removed misplaced CSP tag from top of file
- **preload.js**
  - Added `openExternal` function to exposed API
  - Routes external link requests to main process via IPC
- **style.css**
  - Replaced 12-column grid layout with flexbox for form
  - Made all inputs/textareas 100% width
  - Added responsive mobile styles
- **field-manager.js**
  - Added initialization timing safeguards
  - Added debug console logs (optional removal)
  - Improved error handling

### Dependencies
- No new dependencies added
- Maintained compatibility with:
  - Electron v25.3.0
  - sql.js v1.9.0
  - xlsx v0.18.5
  - electron-builder v24.13.3

---

## 🔄 Migration Notes

### Upgrading from v1.0.0
- **No breaking changes**
- Existing database (`data.db`) fully compatible
- Church records schema (15 columns) unchanged
- Field customizations stored separately in localStorage

### Custom Field Configuration
- New installs start with default 15 church record fields
- Users can customize fields without affecting existing data
- Deleting a field from UI does NOT delete data from database
- Reset to default restores original field list

---

## 🐛 Known Issues
- **File Locking**: Local Windows packaging may fail with EPERM errors. Use GitHub Actions for clean builds.
- **Electron Cache Warnings**: "Unable to create cache" warnings are cosmetic and do not affect functionality.
- **CSP Console Warning**: During development, you may see "unsafe-eval" warnings. These disappear in packaged builds.

---

## 📝 Future Enhancements
- [ ] Field templates for common data entry scenarios
- [ ] Conditional field visibility (show/hide based on other fields)
- [ ] Import/export field configuration
- [ ] Multi-page forms for complex schemas
- [ ] Field validation rules (regex, min/max, custom validators)
- [ ] Drag-and-drop field reordering in settings modal

---

## 🙏 Credits
**Developer:** Anik Chowdhury  
**LinkedIn:** [linkedin.com/in/anikchowdhurybd](https://www.linkedin.com/in/anikchowdhurybd/)  
**Repository:** [github.com/Sundarban-Lab/data-entry-app](https://github.com/Sundarban-Lab/data-entry-app)

---

## 📄 License
MIT License - See LICENSE file for details

---

**Full Changelog:** [v1.0.0...v1.1.0](https://github.com/Sundarban-Lab/data-entry-app/compare/v1.0.0...v1.1.0)
