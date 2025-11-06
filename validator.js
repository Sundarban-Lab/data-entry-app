/**
 * Field Validation Module
 * Provides real-time validation for common field types
 */

class Validator {
  constructor() {
    this.rules = {
      email: {
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'Please enter a valid email address'
      },
      phone: {
        pattern: /^[\d\s\-\+\(\)]+$/,
        message: 'Please enter a valid phone number'
      },
      date: {
        pattern: /^\d{4}-\d{2}-\d{2}$/,
        message: 'Please enter date in YYYY-MM-DD format'
      },
      url: {
        pattern: /^https?:\/\/.+/,
        message: 'Please enter a valid URL'
      }
    };
  }

  /**
   * Validate a field based on its type
   * @param {string} value - The value to validate
   * @param {string} type - The validation type (email, phone, date, url)
   * @returns {object} - {valid: boolean, message: string}
   */
  validate(value, type) {
    // Empty values are allowed (not required by default)
    if (!value || value.trim() === '') {
      return { valid: true, message: '' };
    }

    const rule = this.rules[type];
    if (!rule) {
      return { valid: true, message: '' };
    }

    const valid = rule.pattern.test(value.trim());
    return {
      valid: valid,
      message: valid ? '' : rule.message
    };
  }

  /**
   * Validate date range
   * @param {string} startDate - Start date in YYYY-MM-DD
   * @param {string} endDate - End date in YYYY-MM-DD
   * @returns {object}
   */
  validateDateRange(startDate, endDate) {
    if (!startDate || !endDate) {
      return { valid: true, message: '' };
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start > end) {
      return { valid: false, message: 'Start date must be before end date' };
    }

    return { valid: true, message: '' };
  }

  /**
   * Attach real-time validation to an input element
   * @param {HTMLElement} input - The input element
   * @param {string} type - The validation type
   */
  attachToInput(input, type) {
    if (!input || !type) return;

    // Create error message element
    const errorSpan = document.createElement('span');
    errorSpan.className = 'validation-error';
    errorSpan.style.display = 'none';
    
    // Insert after input
    if (input.nextSibling) {
      input.parentNode.insertBefore(errorSpan, input.nextSibling);
    } else {
      input.parentNode.appendChild(errorSpan);
    }

    // Add validation on blur and input
    const validateInput = () => {
      const result = this.validate(input.value, type);
      
      if (result.valid) {
        input.classList.remove('invalid');
        input.classList.add('valid');
        errorSpan.style.display = 'none';
        errorSpan.textContent = '';
      } else {
        input.classList.remove('valid');
        input.classList.add('invalid');
        errorSpan.style.display = 'block';
        errorSpan.textContent = result.message;
      }
    };

    input.addEventListener('blur', validateInput);
    input.addEventListener('input', () => {
      // Clear error on input (re-validate on blur)
      if (input.classList.contains('invalid')) {
        input.classList.remove('invalid');
        errorSpan.style.display = 'none';
      }
    });
  }

  /**
   * Validate all fields in a form
   * @param {object} fields - Field configuration array
   * @returns {boolean} - True if all fields are valid
   */
  validateForm(fields) {
    let isValid = true;

    fields.forEach(field => {
      if (field.validation) {
        const input = document.getElementById(field.id);
        if (input) {
          const result = this.validate(input.value, field.validation);
          if (!result.valid) {
            isValid = false;
            input.classList.add('invalid');
            
            // Show error message
            const errorSpan = input.nextElementSibling;
            if (errorSpan && errorSpan.classList.contains('validation-error')) {
              errorSpan.textContent = result.message;
              errorSpan.style.display = 'block';
            }
          }
        }
      }
    });

    return isValid;
  }

  /**
   * Clear all validation states
   */
  clearValidation() {
    document.querySelectorAll('.invalid, .valid').forEach(el => {
      el.classList.remove('invalid', 'valid');
    });
    document.querySelectorAll('.validation-error').forEach(el => {
      el.style.display = 'none';
      el.textContent = '';
    });
  }
}

// Export for use in renderer
window.validator = new Validator();
