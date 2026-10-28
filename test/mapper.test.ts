import assert from 'node:assert/strict';
import test from 'node:test';
import { demoFindings, demoRules } from '../src/demo-data.js';
import { mapFinding } from '../src/mapper.js';

test('maps a known finding deterministically', () => {
  const result = mapFinding(demoFindings[0], demoRules);
  assert.equal(result.status, 'mapped');
  assert.equal(result.framework, 'DemoSec 2026');
  assert.equal(result.controlId, 'AC-01');
});

test('does not guess an unknown finding', () => {
  const result = mapFinding(demoFindings[2], demoRules);
  assert.equal(result.status, 'no_rule');
});

test('stops when a known finding title changes', () => {
  const changed = { ...demoFindings[0], title: 'A changed technical check' };
  const result = mapFinding(changed, demoRules);
  assert.equal(result.status, 'stale_rule');
});
