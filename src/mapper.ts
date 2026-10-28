import { createHash } from 'node:crypto';
import type { Finding, MappingResult, MappingRule } from './types.js';

export const titleHash = (title: string): string =>
  createHash('sha256').update(title.trim(), 'utf8').digest('hex');

const same = (left?: string, right?: string): boolean =>
  (left ?? '').trim().toLocaleLowerCase() === (right ?? '').trim().toLocaleLowerCase();

export function mapFinding(finding: Finding, rules: MappingRule[]): MappingResult {
  const candidates = rules.filter(rule =>
    rule.state === 'published' &&
    same(rule.sourceTool, finding.tool) &&
    same(rule.sourceFindingId, finding.id)
  );

  if (candidates.length === 0) {
    return { finding, status: 'no_rule', statusReason: 'Keine veröffentlichte Regel für Tool und Finding-ID vorhanden.' };
  }

  const rule = candidates[0];
  if (!same(rule.expectedTitleHash, titleHash(finding.title))) {
    return { finding, ruleKey: rule.ruleKey, status: 'stale_rule', statusReason: 'Finding-Titel weicht von der Regelversion ab.' };
  }

  if (rule.benchmark && !same(rule.benchmark, finding.benchmark)) {
    return { finding, ruleKey: rule.ruleKey, status: 'stale_rule', statusReason: 'Benchmark fehlt oder weicht von der Regelversion ab.' };
  }

  if (rule.benchmarkVersion && !same(rule.benchmarkVersion, finding.benchmarkVersion)) {
    return { finding, ruleKey: rule.ruleKey, status: 'stale_rule', statusReason: 'Benchmark-Version fehlt oder weicht von der Regelversion ab.' };
  }

  return {
    finding,
    ruleKey: rule.ruleKey,
    framework: rule.framework,
    controlId: rule.controlId,
    controlTitle: rule.controlTitle,
    status: 'mapped',
    statusReason: 'Exakte veröffentlichte Regel gefunden.'
  };
}
