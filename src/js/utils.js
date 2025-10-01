/**
 * Utility functions for DOM manipulation and common operations
 */

export const DOM = {
  /**
   * Create an HTML element with attributes and children
   */
  createElement(tag, attrs = {}, children = []) {
    const element = document.createElement(tag)
    Object.entries(attrs).forEach(([key, value]) => {
      if (key === 'className') {
        element.className = value
      } else if (key === 'dataset') {
        Object.entries(value).forEach(([dataKey, dataValue]) => {
          element.dataset[dataKey] = dataValue
        })
      } else {
        element.setAttribute(key, value)
      }
    })
    children.forEach(child => {
      if (typeof child === 'string') {
        element.appendChild(document.createTextNode(child))
      } else {
        element.appendChild(child)
      }
    })
    return element
  },

  /**
   * Load content into an element asynchronously
   */
  async loadContent(element, content) {
    if (typeof content === 'function') {
      content = await content()
    }
    if (typeof content === 'string') {
      element.innerHTML = content
    } else {
      element.innerHTML = ''
      element.appendChild(content)
    }
  },

  /**
   * Add event listener with automatic cleanup
   */
  addEventListenerWithCleanup(element, type, listener, options) {
    element.addEventListener(type, listener, options)
    return () => element.removeEventListener(type, listener, options)
  }
}

/**
 * Animation and transition utilities
 */
export const Animation = {
  /**
   * Fade in an element
   */
  fadeIn(element, duration = 300) {
    element.style.opacity = 0
    element.style.display = ''
    element.style.transition = `opacity ${duration}ms ease`
    setTimeout(() => element.style.opacity = 1, 10)
    return new Promise(resolve => setTimeout(resolve, duration))
  },

  /**
   * Fade out an element
   */
  fadeOut(element, duration = 300) {
    element.style.opacity = 1
    element.style.transition = `opacity ${duration}ms ease`
    element.style.opacity = 0
    return new Promise(resolve => {
      setTimeout(() => {
        element.style.display = 'none'
        resolve()
      }, duration)
    })
  },

  /**
   * Slide down animation
   */
  slideDown(element, duration = 300) {
    element.style.height = '0'
    element.style.overflow = 'hidden'
    element.style.transition = `height ${duration}ms ease`
    element.style.display = ''
    const height = element.scrollHeight
    element.style.height = height + 'px'
    return new Promise(resolve => {
      setTimeout(() => {
        element.style.height = ''
        element.style.overflow = ''
        element.style.transition = ''
        resolve()
      }, duration)
    })
  }
}

/**
 * Form handling utilities
 */
export const Form = {
  /**
   * Serialize form data to object
   */
  serializeForm(form) {
    const formData = new FormData(form)
    const data = {}
    for (const [key, value] of formData.entries()) {
      data[key] = value
    }
    return data
  },

  /**
   * Validate form fields
   */
  validateForm(form, rules) {
    const errors = {}
    Object.entries(rules).forEach(([field, validations]) => {
      const element = form.elements[field]
      const value = element.value
      validations.forEach(({rule, message}) => {
        if (!rule(value)) {
          errors[field] = message
        }
      })
    })
    return Object.keys(errors).length ? errors : null
  }
}

/**
 * Storage utilities
 */
export const Storage = {
  /**
   * Set item with expiry
   */
  setWithExpiry(key, value, ttl) {
    const item = {
      value,
      expiry: Date.now() + ttl
    }
    localStorage.setItem(key, JSON.stringify(item))
  },

  /**
   * Get item and check expiry
   */
  getWithExpiry(key) {
    const itemStr = localStorage.getItem(key)
    if (!itemStr) return null

    const item = JSON.parse(itemStr)
    if (Date.now() > item.expiry) {
      localStorage.removeItem(key)
      return null
    }
    return item.value
  }
}

/**
 * Debounce & Throttle utilities
 */
export const Performance = {
  debounce(func, wait) {
    let timeout
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout)
        func(...args)
      }
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  },

  throttle(func, limit) {
    let inThrottle
    return function executedFunction(...args) {
      if (!inThrottle) {
        func(...args)
        inThrottle = true
        setTimeout(() => inThrottle = false, limit)
      }
    }
  }
}

/**
 * Common string utilities
 */
export const StringUtils = {
  slugify(str) {
    return str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '')
  },

  truncate(str, length, suffix = '...') {
    if (str.length <= length) return str
    return str.substring(0, length).trim() + suffix
  }
}