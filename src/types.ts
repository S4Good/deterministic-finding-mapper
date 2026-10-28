export type RuleState = 'published' | 'draft' | 'retired';
export type MappingStatus = 'mapped' | 'no_rule' | 'stale_rule';

export interface Finding {
  tool: string;
  id: string;
  title: string;
  benchmark?: string;
  benchmarkVersion?: string;
}

export interface MappingRule {
  ruleKey: string;
  state: RuleState;
  sourceTool: string;
  sourceFindingId: string;
  expectedTitleHash: string;
  benchmark?: string;
  benchmarkVersion?: string;
  framework: string;
  controlId: string;
  controlTitle: string;
  rationale: string;
}

export interface MappingResult {
  status: MappingStatus;
  statusReason: string;
  finding: Finding;
  ruleKey?: string;
  framework?: string;
  controlId?: string;
  controlTitle?: string;
}
