#!/bin/bash

# Script to create GitHub Release v1.2.0
# Requires: GitHub CLI (gh) to be installed and authenticated

set -e

REPO="Sundarban-Lab/data-entry-app"
TAG="v1.2.0"
TITLE="Data Entry App v1.2.0 - Professional Features Update"
NOTES_FILE="RELEASE_NOTES_v1.2.0.md"

echo "🚀 Creating GitHub Release for $TAG..."
echo ""

# Check if gh is installed
if ! command -v gh &> /dev/null; then
    echo "❌ Error: GitHub CLI (gh) is not installed."
    echo "📥 Install it from: https://cli.github.com/"
    exit 1
fi

# Check if authenticated
if ! gh auth status &> /dev/null; then
    echo "❌ Error: Not authenticated with GitHub CLI."
    echo "🔐 Run: gh auth login"
    exit 1
fi

# Check if release notes file exists
if [ ! -f "$NOTES_FILE" ]; then
    echo "❌ Error: Release notes file not found: $NOTES_FILE"
    exit 1
fi

# Create the release
echo "📝 Creating release with notes from $NOTES_FILE..."
gh release create "$TAG" \
    --repo "$REPO" \
    --title "$TITLE" \
    --notes-file "$NOTES_FILE" \
    --latest

echo ""
echo "✅ Release created successfully!"
echo "🔗 View it at: https://github.com/$REPO/releases/tag/$TAG"
echo ""
echo "📋 Next steps:"
echo "  1. Take 3-5 screenshots of the app"
echo "  2. Post about the release on LinkedIn"
echo "  3. Ask friends to star the repository"
echo ""
