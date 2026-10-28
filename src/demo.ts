import { demoFindings, demoRules } from './demo-data.js';
import { mapFinding } from './mapper.js';

for (const finding of demoFindings) {
  const result = mapFinding(finding, demoRules);
  console.log(JSON.stringify(result, null, 2));
}
