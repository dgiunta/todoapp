//You may load required files here, or create test-runner-wide environment settings.

/**
 * toBe: compares the actual to the expected using ===
 * @param expected
 */
jasmine.Matchers.prototype.toBeAnInstanceOf = function(expected) {
  return this.actual instanceof expected;
};