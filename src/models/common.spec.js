import { trimmedOrDefault } from './common';

describe('trimmedOrDefault', () => {
  it('should trim leading whitespace', () => {
    const s = '  string';
    expect(trimmedOrDefault(s)).toBe('string');
  });
  it('should trim trailing whitespace', () => {
    const s = 'string   ';
    expect(trimmedOrDefault(s)).toBe('string');
  });
  it('should return null for an empty string', () => {
    const s = '';
    expect(trimmedOrDefault(s)).toBeNull()
  });
  it('should return null for a string with only whitespace', () => {
    const s = '    ';
    expect(trimmedOrDefault(s)).toBeNull();
  });
  it('should return null for undefined', () => {
    const s = undefined;
    expect(trimmedOrDefault(s)).toBeNull();
  });
  it('should return null for null', () => {
    const s = null;
    expect(trimmedOrDefault(s)).toBeNull();
  });
});