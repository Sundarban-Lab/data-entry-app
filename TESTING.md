# Testing Guide - v1.2.0 Features

## Quick Start
```bash
npm start
```

## Feature Testing Checklist

### ✅ Field Validation
1. **Date Field Validation**
   - Enter valid date: `1990-05-15` → Should show green border
   - Enter invalid date: `05/15/1990` → Should show red border + error
   - Leave empty → Should remain neutral (optional field)
   - Try date fields: Birth, BAPT, CONF, 1 COM, Marriage, Death

2. **Form Submit Validation**
   - Enter invalid date in any field
   - Try to save (Ctrl+S or click Add Record)
   - Should show notification: "Please fix validation errors"
   - Form won't submit until errors fixed

### 📥 Import Testing
1. **Using Sample File**
   - Press `Ctrl+I` or click "📥 Import Data"
   - Select `sample-import.csv` from project root
   - Review preview (3 sample records)
   - Check field mappings (should auto-map correctly)
   - Click "Import Data"
   - Verify 3 new records appear in table

2. **Create Custom CSV**
   Create file with headers matching field names:
   ```
   Name of Church,Place,Name,Birth,Note
   Test Church,Test City,John Doe,1995-01-01,Test note
   ```

3. **Import Excel File**
   - Create .xlsx file in Excel with same structure
   - Import should work identically

### ⌨️ Keyboard Shortcuts
1. **Ctrl+N (New Record)**
   - Fill in a record
   - Press Ctrl+N
   - Form should clear
   - First field should be focused
   - Notification: "📝 New record"

2. **Ctrl+S (Save)**
   - Fill in form fields
   - Press Ctrl+S from any field
   - Record should save
   - Notification: "💾 Record saved"

3. **Ctrl+F (Search)**
   - Press Ctrl+F
   - Search box should be focused
   - Notification: "🔍 Search"

4. **Ctrl+E (Export)**
   - Press Ctrl+E
   - Should export to Excel
   - Notification: "📊 Exporting..."

5. **Ctrl+I (Import)**
   - Press Ctrl+I
   - Import modal should open
   - Notification: "📥 Import"

6. **Esc (Cancel)**
   - While editing a record, press Esc
   - Form should clear
   - Notification: "✖ Cleared"
   - In modal, press Esc
   - Modal should close
   - Notification: "✖ Cancelled"

## Common Issues

### Import Not Working
- Check file format (CSV must be comma-separated)
- Verify headers in first row
- Ensure file is not open in Excel
- Check console for errors (F12)

### Validation Too Strict
- Date format must be exactly `YYYY-MM-DD`
- Other formats planned for future versions
- Can customize validation rules in `validator.js`

### Shortcuts Not Working
- May conflict with browser/system shortcuts
- Works best in packaged app (not dev mode)
- Check if modal is open (shortcuts disabled except Esc)

## Performance Notes
- Import tested with 10,000 records successfully
- Validation runs on blur (not every keystroke) for performance
- Keyboard shortcuts have 300ms fade animation

## Next Steps
After testing, GitHub Actions will build Windows installer:
1. Push triggers CI workflow
2. Wait ~5 minutes for build
3. Download installer from Actions artifacts
4. Test installer on clean Windows machine
