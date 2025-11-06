/**
 * Keyboard Shortcuts Module
 * Implements productivity keyboard shortcuts
 */

class KeyboardShortcuts {
  constructor() {
    this.shortcuts = {
      'ctrl+s': { action: 'save', description: 'Save current record' },
      'ctrl+n': { action: 'new', description: 'New record' },
      'ctrl+f': { action: 'search', description: 'Focus search box' },
      'escape': { action: 'cancel', description: 'Cancel/Clear form' },
      'ctrl+e': { action: 'export', description: 'Export to Excel' },
      'ctrl+i': { action: 'import', description: 'Import data' }
    };

    this.enabled = true;
  }

  /**
   * Initialize keyboard shortcuts
   */
  init() {
    document.addEventListener('keydown', (e) => this.handleKeyPress(e));
    console.log('Keyboard shortcuts initialized');
  }

  /**
   * Handle key press events
   */
  handleKeyPress(event) {
    if (!this.enabled) return;

    // Don't trigger if user is in a modal input (except Escape)
    const isInModal = event.target.closest('.modal[style*="display: block"]');
    if (isInModal && event.key !== 'Escape') return;

    // Build shortcut key string
    let shortcut = '';
    if (event.ctrlKey || event.metaKey) shortcut += 'ctrl+';
    if (event.altKey) shortcut += 'alt+';
    if (event.shiftKey) shortcut += 'shift+';
    shortcut += event.key.toLowerCase();

    // Execute action
    const shortcutConfig = this.shortcuts[shortcut];
    if (shortcutConfig) {
      event.preventDefault();
      this.executeAction(shortcutConfig.action);
    }
  }

  /**
   * Execute shortcut action
   */
  executeAction(action) {
    switch (action) {
      case 'save':
        this.saveRecord();
        break;
      case 'new':
        this.newRecord();
        break;
      case 'search':
        this.focusSearch();
        break;
      case 'cancel':
        this.cancel();
        break;
      case 'export':
        this.exportData();
        break;
      case 'import':
        this.importData();
        break;
    }
  }

  /**
   * Save current record (Ctrl+S)
   */
  saveRecord() {
    const saveBtn = document.getElementById('saveBtn');
    if (saveBtn && window.saveData) {
      window.saveData();
      this.showNotification('💾 Record saved');
    }
  }

  /**
   * Clear form for new record (Ctrl+N)
   */
  newRecord() {
    if (window.clearForm) {
      window.clearForm();
      this.showNotification('📝 New record');
      
      // Focus first input
      const firstInput = document.querySelector('.form input, .form textarea');
      if (firstInput) {
        firstInput.focus();
      }
    }
  }

  /**
   * Focus search box (Ctrl+F)
   */
  focusSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
      searchInput.focus();
      searchInput.select();
      this.showNotification('🔍 Search');
    }
  }

  /**
   * Cancel/Clear form (Escape)
   */
  cancel() {
    // Close any open modals
    const openModal = document.querySelector('.modal[style*="display: block"]');
    if (openModal) {
      openModal.style.display = 'none';
      this.showNotification('✖ Cancelled');
      return;
    }

    // Clear form if in edit mode
    if (window.clearForm) {
      window.clearForm();
      this.showNotification('✖ Cleared');
    }
  }

  /**
   * Export data (Ctrl+E)
   */
  exportData() {
    const exportBtn = document.getElementById('exportBtn');
    if (exportBtn && window.exportData) {
      window.exportData();
      this.showNotification('📊 Exporting...');
    }
  }

  /**
   * Import data (Ctrl+I)
   */
  importData() {
    if (window.dataImporter) {
      window.dataImporter.showImportDialog();
      this.showNotification('📥 Import');
    }
  }

  /**
   * Show notification toast
   */
  showNotification(message) {
    // Remove existing notification
    const existing = document.querySelector('.keyboard-notification');
    if (existing) {
      existing.remove();
    }

    // Create notification
    const notification = document.createElement('div');
    notification.className = 'keyboard-notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    // Fade in
    setTimeout(() => notification.classList.add('show'), 10);

    // Remove after 2 seconds
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 300);
    }, 2000);
  }

  /**
   * Show shortcuts help
   */
  showHelp() {
    let helpHTML = '<div class="shortcuts-help">';
    helpHTML += '<h3>⌨️ Keyboard Shortcuts</h3><ul>';
    
    for (const [key, config] of Object.entries(this.shortcuts)) {
      const keyDisplay = key.split('+').map(k => 
        k.charAt(0).toUpperCase() + k.slice(1)
      ).join(' + ');
      helpHTML += `<li><kbd>${keyDisplay}</kbd> - ${config.description}</li>`;
    }
    
    helpHTML += '</ul></div>';
    
    // Show in modal or alert
    alert(helpHTML.replace(/<[^>]*>/g, ''));
  }

  /**
   * Enable/disable shortcuts
   */
  toggle(enabled) {
    this.enabled = enabled;
  }
}

// Initialize on load
window.keyboardShortcuts = new KeyboardShortcuts();

// Auto-init when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.keyboardShortcuts.init();
  });
} else {
  window.keyboardShortcuts.init();
}
