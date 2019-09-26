/*
 * Необходимо покрыть все возможные
 * и невозможные кейсы. Например,
 * convertBytesToHuman(-1) === false,
 * convertBytesToHuman(-1) !== 1,
 * convertBytesToHuman('string') === false
 * convertBytesToHuman(5) === 5
 */
import convertBytesToHuman from './convertBytesToHuman.js';
test('Возвращает false для неправильного типа данных', () => {
  expect(convertBytesToHuman("string")).toBe(false)
  expect(convertBytesToHuman([1, 2, 3])).toBe(false)
  expect(convertBytesToHuman({})).toBe(false)
});

test('Возвращает корректное значение для чисел', () => {
  expect(convertBytesToHuman(0)).toBe('0B')
  expect(convertBytesToHuman(123)).toBe('123B')
  expect(convertBytesToHuman(1024)).toBe('1KB')
  expect(convertBytesToHuman(1024 * 1024)).toBe('1MB');
  expect(convertBytesToHuman(1024 * 1024 + 300)).toBe('1.29MB')
  expect(convertBytesToHuman(1024 * 1024 * 1024 * 50)).toBe('50GB')
  expect(convertBytesToHuman(1024 * 1024 * 1024 * 1024 + 500)).toBe('1.49TB')
});

// другая группа проверок

test('Возвращает false для отрицательных значений', () => {
  expect(convertBytesToHuman(-1)).toBe(false)
  expect(convertBytesToHuman(-99999.1234)).toBe(false)
});