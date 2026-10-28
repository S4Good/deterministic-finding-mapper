import { titleHash } from './mapper.js';
import type { Finding, MappingRule } from './types.js';

export const demoFindings: Finding[] = [
  {
    tool: 'demo-scanner',
    id: 'AUTH-001',
    title: 'Ensure account lockout is enabled after repeated failed sign-ins',
    benchmark: 'Demo Baseline',
    benchmarkVersion: '1.0'
  },
  {
    tool: 'demo-scanner',
    id: 'LOG-001',
    title: 'Ensure successful sign-in events are recorded',
    benchmark: 'Demo Baseline',
    benchmarkVersion: '1.0'
  },
  {
    tool: 'new-scanner',
    id: 'UNKNOWN-001',
    title: 'An entirely new technical check',
  }
];

export const demoRules: MappingRule[] = [
  {
    ruleKey: 'RULE-DEMO-AUTH-001',
    state: 'published',
    sourceTool: 'demo-scanner',
    sourceFindingId: 'AUTH-001',
    expectedTitleHash: titleHash(demoFindings[0].title),
    benchmark: 'Demo Baseline',
    benchmarkVersion: '1.0',
    framework: 'DemoSec 2026',
    controlId: 'AC-01',
    controlTitle: 'Protected authentication',
    rationale: 'Repeated failed sign-ins must trigger a protective control.'
  },
  {
    ruleKey: 'RULE-DEMO-LOG-001',
    state: 'published',
    sourceTool: 'demo-scanner',
    sourceFindingId: 'LOG-001',
    expectedTitleHash: titleHash(demoFindings[1].title),
    benchmark: 'Demo Baseline',
    benchmarkVersion: '1.0',
    framework: 'DemoSec 2026',
    controlId: 'LG-02',
    controlTitle: 'Security event logging',
    rationale: 'Successful authentication events need to be recorded.'
  }
];
