# Contributing to Data Entry Manager

Thank you for your interest in contributing! 🎉

This document provides guidelines for contributing to the Data Entry Manager project.

---

## 🚀 Quick Start

1. **Fork** the repository
2. **Clone** your fork: `git clone https://github.com/YOUR_USERNAME/data-entry-app.git`
3. **Install** dependencies: `npm install`
4. **Run** the app: `npm start`
5. **Make** your changes
6. **Test** thoroughly
7. **Submit** a pull request

---

## 📋 Before You Start

1. **Check existing issues** - Someone might already be working on it
2. **Create an issue** - Discuss your idea before coding
3. **Get assigned** - Wait for maintainer approval
4. **One feature per PR** - Keep pull requests focused

---

## 🎯 What to Contribute

### Good First Issues (Beginners)
- Bug fixes
- Documentation improvements
- UI tweaks
- Adding comments to code
- Writing tests

### Feature Development
See [ROADMAP.md](ROADMAP.md) for planned features

### Priority Areas
1. **Data Backup & Restore** - Critical feature
2. **Duplicate Detection** - High demand
3. **Bulk Operations** - Productivity boost
4. **Advanced Search** - User request
5. **PDF Export** - Professional output

---

## 🛠️ Development Setup

### Prerequisites
- Node.js 18+ and npm
- Git
- Code editor (VS Code recommended)

### Installation
```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/data-entry-app.git
cd data-entry-app

# Install dependencies
npm install

# Run in development mode
npm start
```

### Build
```bash
# Build Windows installer
npm run build:win

# Output in release3/ directory
```

---

## 📁 Project Structure

```
data-entry-app/
├── main.js                    # Electron main process
├── preload.js                 # IPC bridge (security)
├── database.js                # SQLite operations
├── index.html                 # Main UI
├── renderer.js                # UI logic
├── field-manager.js           # Dynamic fields
├── validator.js               # Field validation
├── importer.js                # CSV/Excel import
├── keyboard-shortcuts.js      # Shortcuts handler
├── menu-handler.js            # Menu actions
├── google-sheets-sync.js      # Cloud sync
├── style.css                  # Styling
└── .github/
    └── workflows/
        └── build-windows.yml  # CI/CD
```

---

## 🎨 Code Style

### JavaScript
- Use ES6+ features
- Semicolons optional but consistent
- 2-space indentation
- Descriptive variable names
- Add JSDoc comments for functions

### Example:
```javascript
/**
 * Save record to database
 * @param {Object} record - Record data
 * @returns {Promise<Array>} Updated records
 */
async function saveRecord(record) {
  const result = await window.api.saveData(record);
  return result;
}
```

### CSS
- Use existing CSS variables
- Mobile-first responsive design
- Dark theme by default
- Follow BEM naming convention

---

## ✅ Testing

### Manual Testing
1. Test your feature thoroughly
2. Test edge cases
3. Test on Windows (primary platform)
4. Test with empty database
5. Test with large dataset (1000+ records)

### Areas to Test
- [ ] Feature works as expected
- [ ] No console errors
- [ ] UI is responsive
- [ ] Keyboard shortcuts work
- [ ] Data persists after reload
- [ ] Export/import works
- [ ] No data loss

### Future: Automated Tests
We plan to add:
- Unit tests (Jest)
- Integration tests
- E2E tests (Playwright)

---

## 📝 Commit Messages

Follow conventional commits:

```
feat: add bulk delete functionality
fix: resolve date validation bug
docs: update README with new features
style: format code with prettier
refactor: simplify database queries
test: add validation tests
chore: update dependencies
```

### Examples:
- `feat: add PDF export feature`
- `fix: import modal close button not working`
- `docs: add contributing guidelines`
- `style: improve button hover states`
- `refactor: extract validation logic`

---

## 🔀 Pull Request Process

### 1. Create a Branch
```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/bug-description
```

### 2. Make Changes
- Write clean, documented code
- Follow existing code style
- Add comments where needed

### 3. Test Thoroughly
- Manual testing required
- No console errors
- Feature works end-to-end

### 4. Commit Changes
```bash
git add .
git commit -m "feat: add your feature"
git push origin feature/your-feature-name
```

### 5. Create Pull Request
- Clear title and description
- Link related issue: "Closes #123"
- Add screenshots/GIFs for UI changes
- List testing steps

### PR Template:
```markdown
## Description
Brief description of changes

## Related Issue
Closes #123

## Changes Made
- Added X feature
- Fixed Y bug
- Updated Z documentation

## Testing
- [ ] Tested on Windows
- [ ] No console errors
- [ ] Data persists correctly
- [ ] Feature works as expected

## Screenshots
(if applicable)
```

### 6. Code Review
- Respond to feedback promptly
- Make requested changes
- Push updates to same branch

### 7. Merge
- Maintainer will merge approved PRs
- Your contribution goes live!

---

## 🐛 Reporting Bugs

### Before Reporting
1. Search existing issues
2. Test on latest version
3. Reproduce the bug

### Bug Report Template
```markdown
**Describe the bug**
Clear description of the issue

**To Reproduce**
Steps to reproduce:
1. Go to '...'
2. Click on '...'
3. See error

**Expected behavior**
What should happen

**Screenshots**
If applicable

**Environment:**
- OS: Windows 11
- App Version: 1.2.0
- Node Version: 18.x

**Additional context**
Any other information
```

---

## 💡 Suggesting Features

### Feature Request Template
```markdown
**Is your feature request related to a problem?**
Description of problem

**Describe the solution**
How you'd like it to work

**Describe alternatives**
Other solutions considered

**Additional context**
Mockups, examples, etc.
```

---

## 🏆 Recognition

Contributors are recognized in:
- **CONTRIBUTORS.md** - Hall of fame
- **Release notes** - Feature attribution
- **GitHub contributors** - Automatic badge
- **About dialog** - In-app credits

---

## 📜 Code of Conduct

### Our Standards
- Be respectful and inclusive
- Welcome newcomers
- Accept constructive criticism
- Focus on what's best for the project
- Show empathy

### Unacceptable Behavior
- Harassment or discrimination
- Trolling or insulting comments
- Personal or political attacks
- Publishing others' private information

### Enforcement
Violations may result in:
1. Warning
2. Temporary ban
3. Permanent ban

Report to: [anikchowdhurybd@linkedin.com](mailto:anikchowdhurybd@linkedin.com)

---

## 📚 Resources

### Documentation
- [README.md](README.md) - Project overview
- [USER_GUIDE.md](USER_GUIDE.md) - Feature documentation
- [ROADMAP.md](ROADMAP.md) - Future plans
- [TESTING.md](TESTING.md) - QA guide

### Learning Resources
- [Electron Docs](https://www.electronjs.org/docs)
- [SQL.js Guide](https://sql.js.org/)
- [Google Sheets API](https://developers.google.com/sheets/api)

### Tools We Use
- **Electron** - Desktop framework
- **SQL.js** - Database
- **electron-builder** - Packaging
- **GitHub Actions** - CI/CD

---

## 🎓 Mentorship

New to open source? We're here to help!

- Tag issues with `good-first-issue`
- Provide mentorship for beginners
- Review PRs within 48 hours
- Answer questions in discussions

---

## 💬 Communication

### Where to Ask Questions
- **GitHub Issues** - Bug reports, features
- **GitHub Discussions** - General questions
- **Pull Requests** - Code-specific questions
- **LinkedIn** - Direct contact with Anik

### Response Time
- Issues: Within 2 days
- PRs: Within 2 days
- Discussions: Within 3 days

---

## 🔒 Security

Found a security vulnerability?

**DO NOT** open a public issue.

Contact: [anikchowdhurybd@linkedin.com](mailto:anikchowdhurybd@linkedin.com)

We'll respond within 24 hours.

---

## 📄 License

By contributing, you agree that your contributions will be licensed under the [MIT License](LICENSE).

---

## 🙏 Thank You!

Your contributions make this project better for everyone.

**Happy Coding!** 🚀

---

**Questions?** Open a [GitHub Discussion](https://github.com/Sundarban-Lab/data-entry-app/discussions)

**Last Updated**: November 7, 2025
