# Data Entry App

An offline data entry and data collection application built with Electron for managing data efficiently.

## Features

- ✅ Offline data entry and storage using SQL.js (embedded SQLite)
- ✅ Data collection with form validation
- ✅ Real-time data management (Add, Edit, Delete)
- ✅ Search functionality
- ✅ Auto-export to Excel (xlsx format)
- ✅ Cross-platform support (Windows, macOS, Linux)
- ✅ No native dependencies required (pure JavaScript SQLite)

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Sundarban-Lab/data-entry-app.git
cd data-entry-app
```

2. Install dependencies:
```bash
npm install
```

## Usage

Start the application:
```bash
npm start
```

The application will open in a desktop window where you can:
- Add new records with name, email, and age
- Edit existing records
- Delete records
- Search records by name or email
- Export data to Excel (records.xlsx)

## Data Storage

- Data is stored locally in `data.db` SQLite database
- Excel exports are automatically saved as `records.xlsx`
- Both files are created in the application directory

## Building for Production

To package the application for distribution:
```bash
npm run package
```

## Technologies Used

- **Electron**: Desktop application framework (v39.1.0)
- **SQL.js**: Pure JavaScript SQLite implementation (no native dependencies)
- **ExcelJS**: Excel file generation
- **HTML/CSS/JavaScript**: User interface

## Security

- All dependencies are up-to-date with no known vulnerabilities
- Uses ExcelJS instead of vulnerable xlsx library
- Proper error handling for database operations

## Author

Anik Chowdhury

## License

ISC

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
