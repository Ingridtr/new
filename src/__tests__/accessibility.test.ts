import { describe, it, expect, beforeEach, vi } from 'vitest'
import { announceError, announceSuccess, validateRequired, generateId } from '../utils/accessibility'

// Mock DOM for testing
const createMockDocument = () => {
  const mockElement = {
    id: '',
    textContent: '',
    setAttribute: vi.fn(),
    style: { cssText: '' },
    className: ''
  }
  
  return {
    getElementById: vi.fn().mockReturnValue(null),
    createElement: vi.fn().mockReturnValue(mockElement),
    body: {
      appendChild: vi.fn()
    }
  }
}

describe('Accessibility Utilities', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('announceError', () => {
    it('should create live region for error announcements', () => {
      const mockDoc = createMockDocument()
      vi.stubGlobal('document', mockDoc)
      
      announceError('Test error message')
      
      expect(mockDoc.createElement).toHaveBeenCalledWith('div')
      expect(mockDoc.body.appendChild).toHaveBeenCalled()
    })
  })

  describe('announceSuccess', () => {
    it('should create live region for success announcements', () => {
      const mockDoc = createMockDocument()
      vi.stubGlobal('document', mockDoc)
      
      announceSuccess('Test success message')
      
      expect(mockDoc.createElement).toHaveBeenCalledWith('div')
      expect(mockDoc.body.appendChild).toHaveBeenCalled()
    })
  })

  describe('validateRequired', () => {
    it('should return error for empty string', () => {
      const result = validateRequired('', 'Username')
      expect(result.hasError).toBe(true)
      expect(result.message).toBe('Username er påkrevd')
    })

    it('should return error for null value', () => {
      const result = validateRequired(null, 'Email')
      expect(result.hasError).toBe(true)
      expect(result.message).toBe('Email er påkrevd')
    })

    it('should return error for undefined value', () => {
      const result = validateRequired(undefined, 'Password')
      expect(result.hasError).toBe(true)
      expect(result.message).toBe('Password er påkrevd')
    })

    it('should return error for whitespace only', () => {
      const result = validateRequired('   ', 'Name')
      expect(result.hasError).toBe(true)
      expect(result.message).toBe('Name er påkrevd')
    })

    it('should return no error for valid value', () => {
      const result = validateRequired('valid input', 'Field')
      expect(result.hasError).toBe(false)
      expect(result.message).toBe('')
    })
  })

  describe('generateId', () => {
    it('should generate unique IDs with prefix', () => {
      const id1 = generateId('test')
      const id2 = generateId('test')
      
      expect(id1).toMatch(/^test-/)
      expect(id2).toMatch(/^test-/)
      expect(id1).not.toBe(id2)
    })

    it('should handle different prefixes', () => {
      const id1 = generateId('button')
      const id2 = generateId('input')
      
      expect(id1).toMatch(/^button-/)
      expect(id2).toMatch(/^input-/)
    })
  })
})
