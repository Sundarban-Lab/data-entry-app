# Creating GitHub Release v1.2.0

This guide will help you create the GitHub Release v1.2.0 for the Data Entry App.

## Prerequisites

- The git tag `v1.2.0` already exists ✅
- Release notes are prepared in `RELEASE_NOTES_v1.2.0.md` ✅
- Version in `package.json` is set to `1.2.0` ✅

## Option 1: Create Release via GitHub Web Interface (Recommended)

1. Go to https://github.com/Sundarban-Lab/data-entry-app/releases/new

2. **Choose a tag**: Select `v1.2.0` from the dropdown (or type it if not visible)

3. **Release title**: `Data Entry App v1.2.0 - Professional Features Update`

4. **Release description**: Copy and paste the content from `RELEASE_NOTES_v1.2.0.md` file

5. **Options**:
   - [ ] Set as a pre-release (leave unchecked for stable release)
   - [ ] Set as the latest release (check this box)
   - [ ] Create a discussion for this release (optional)

6. Click **"Publish release"**

## Option 2: Create Release via GitHub CLI

If you have GitHub CLI installed and authenticated:

```bash
gh release create v1.2.0 \
  --title "Data Entry App v1.2.0 - Professional Features Update" \
  --notes-file RELEASE_NOTES_v1.2.0.md \
  --repo Sundarban-Lab/data-entry-app
```

## Option 3: Create Release via GitHub API

Using curl with a GitHub Personal Access Token:

```bash
# Set your GitHub token
export GITHUB_TOKEN="your_github_token_here"

# Create the release
curl -X POST \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer $GITHUB_TOKEN" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  https://api.github.com/repos/Sundarban-Lab/data-entry-app/releases \
  -d "{
    \"tag_name\": \"v1.2.0\",
    \"name\": \"Data Entry App v1.2.0 - Professional Features Update\",
    \"body\": \"$(cat RELEASE_NOTES_v1.2.0.md | jq -Rs .)\",
    \"draft\": false,
    \"prerelease\": false
  }"
```

## After Creating the Release

Once the release is created, you can:

1. **Add Release Assets** (if you have built binaries):
   - Upload `Data-Entry-App-Setup-1.2.0.exe` or other installer files
   - These can be downloaded from GitHub Actions artifacts if available

2. **Verify the Release**:
   - Visit https://github.com/Sundarban-Lab/data-entry-app/releases
   - Confirm v1.2.0 appears as the latest release

3. **Share the Release**:
   - Get the release URL: https://github.com/Sundarban-Lab/data-entry-app/releases/tag/v1.2.0
   - Use this URL in your promotional posts

## Next Steps (from your TODO list)

- [x] Create GitHub Release v1.2.0
- [ ] Take 3-5 screenshots of the application features
- [ ] Post on LinkedIn about the release
- [ ] Ask 5 friends to star the repository

## Screenshots Suggestions

For promotional purposes, consider taking screenshots of:

1. **Main Interface**: Show the clean data entry form with all fields
2. **Field Validation**: Demonstrate the validation feature with green/red borders
3. **Import Dialog**: Show the CSV/Excel import interface with field mapping
4. **Keyboard Shortcuts**: Display the toast notification showing a keyboard shortcut action
5. **Data Table**: Show the populated records table with search functionality

## LinkedIn Post Template

```
🚀 Just released Data Entry App v1.2.0! 

This professional data entry and management tool now includes:
✅ Real-time field validation
📥 Bulk CSV/Excel import
⌨️ Productivity keyboard shortcuts
🎨 Enhanced UI/UX

Perfect for churches, organizations, or anyone managing structured data offline!

🔗 GitHub: https://github.com/Sundarban-Lab/data-entry-app
📦 Download: https://github.com/Sundarban-Lab/data-entry-app/releases/tag/v1.2.0

#OpenSource #DataManagement #ElectronJS #ProductLaunch
```

---

**Need help?** Check the repository README or open an issue on GitHub.
