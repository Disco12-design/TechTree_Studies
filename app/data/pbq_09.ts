import type { PbqRemediation } from './pbqTypes';

// PBQ 07: Vulnerability scan review. Pick the server to patch within 14 days and the right technique.
// `kind: 'remediation'` tells App.jsx to render this with <PbqRemediationSim />.
//
// Answer key (from PBQ_07.pdf):
//   Server patched within 14 calendar days: 192.168.60.90
//   Technique and mitigation:               Reconfigure; restrict to use only modern cipher suites

// ---- Tab 1: Vulnerability remediation timeframes -------------------------------------------
const sla = {
  columns: ['CVSS risk level', 'Standard'],
  environments: ['OPS', 'TEST', 'STAGE'],
  rows: [
    { level: 'CVSS > 9.0', days: 7, applies: { OPS: true, TEST: true, STAGE: false } },
    { level: 'CVSS > 7.9 < 9.0', days: 14, applies: { OPS: true, TEST: false, STAGE: false } },
    { level: 'CVSS > 5.0 < 7.9', days: 30, applies: { OPS: true, TEST: false, STAGE: false } },
    { level: 'CVSS > 0 < 5.0', days: 60, applies: { OPS: true, TEST: false, STAGE: false } },
  ],
  standard: (days: number) => `Must be patched or remediated and verified by a subsequent vulnerability scan within ${days} calendar days`,
  headline: 'Any of these timeframes may be accelerated at the discretion of the Chief Information Security Officer (CISO).',
  notes: [
    'If patching cannot be completed or a vendor has not made a patch available within the timeframe in the table outlined above, compensating controls must be put in place within the timeframes listed above and the exception process must be followed.',
    'If a patch requires a reboot for installation, the reboot must occur within the timeframes outlined above.',
    'All mitigations must be tested in the lower environments before being promoted to operations.',
    'Appropriate risk management processes should be considered when an applicable timeframe is not required for an environment.',
  ],
};

// ---- Tab 2: Environment ---------------------------------------------------------------------
const environment = {
  columns: ['Environment name', 'Environment location', 'Subnets', 'Domain', 'Publicly accessible', 'NGFW', 'Load balancer', 'MFA required'],
  rows: [
    ['ops.comptia.org', 'External', ['203.17.18.20', '203.17.18.30', '192.168.60.0/24', '192.168.61.0/24'], 'comptia.org', 'Yes', 'Yes', 'Yes', 'No'],
    ['stage.comptia.org', 'Internal', ['192.168.76.0/24', '192.168.75.0/24'], 'comptia.org', 'No', 'No', 'Yes', 'Yes'],
    ['test.comptia.org', 'External', ['192.168.50.0/24', '192.168.51.0/24'], 'comptia.org', 'No', 'Yes', 'Yes', 'Yes'],
  ],
};

// ---- Tab 3: Output (scan results) -----------------------------------------------------------
const findings = [
  {
    title: 'Microsoft IIS: Unsupported software version detected',
    description: 'The software version detected is no longer supported.',
    asset: '192.168.76.50',
    risk: 'Unpatched software',
    reference: 'CVE-2022-0155, CVSS 9.2',
  },
  {
    title: 'Sensitive cookie in HTTPS session without "secure" attribute',
    description:
      'The secure attribute for sensitive cookies in HTTPS sessions is not set, which could cause the user agent to send those cookies in plaintext over HTTP session.',
    asset: '192.168.76.60',
    risk: 'Session sidejacking',
    reference: 'CVE-2021-0462, CVSS 7.4',
  },
  {
    title: 'Untrusted SSL/TLS Server X.509 certificate',
    description: "The server's TLS/SSL certificate is signed by a certificate authority that is untrusted or unknown.",
    asset: '192.168.51.32',
    risk: 'May allow on-path attackers to insert a spoofed certificate for any distinguished name (DN).',
    reference: 'CVE-2021-1234, CVSS 8.1',
  },
  {
    title: 'Sensitive cookie in HTTPS session without "secure" attribute',
    description:
      'The secure attribute for sensitive cookies in HTTPS sessions is not set, which could cause the user agent to send those cookies in plaintext over HTTP session.',
    asset: '192.168.60.45',
    risk: 'Session sidejacking',
    reference: 'CVE-2021-0462, CVSS 7.4',
  },
  {
    title: 'Web server is susceptible to TLS downgrade attacks',
    description: 'The server permits the web client to select and use its own preferences.',
    asset: '192.168.60.90',
    risk: 'May allow data to be vulnerable.',
    reference: 'CVE-2021-1234, CVSS 8.1',
  },
  {
    title: 'Basic authentication',
    description: 'Website is configured to permit use of .htaccess files on directories.',
    asset: '192.168.51.90',
    risk: 'May allow privileged access to sensitive data.',
    reference: 'CVE-2021-38361, CVSS 5.1',
  },
];

// ---- Answer area ----------------------------------------------------------------------------
const SERVER_OPTIONS = ['192.168.51.32', '192.168.76.50', '192.168.76.60', '192.168.60.45', '192.168.60.90', '192.168.51.90'];

const TECHNIQUE_OPTIONS = [
  'Compensating control; implement secure session tokens',
  'Compensating control; create new ACL on firewall to block port 443',
  'Compensating control; implement MFA on the application',
  'Reconfigure; transition to a new identity and access manager',
  'Request exception; organization needs time to procure a PKI',
  'Reconfigure; restrict to use only modern cipher suites',
  'Reconfigure; upgrade IIS to current release',
  'Request exception; legacy protocol could have operational impact',
];

export const pbq07: PbqRemediation = {
  id: 'pbq-07-vuln-remediation',
  kind: 'remediation',
  title: 'Vulnerability Remediation Timeframes',
  difficulty: 'Intermediate',
  objective: '2.3', // TODO: confirm the exam objective number for this PBQ
  estimatedMinutes: 10,
  modules: [], // TODO: set to the module id(s) this PBQ belongs to

  scenario: ['A systems administrator is reviewing the output of a vulnerability scan.'],
  instructions: [
    "Review the information in each tab. Based on the organization's environment architecture and remediation standards, select the server to be patched within 14 days and select the appropriate technique and mitigation.",
    'At any time you can click Reset All Answers to bring back the initial state of the simulation.',
  ],

  // Assumed scoring: adjust to match your other PBQs
  points: { server: 2, technique: 2 },

  tabs: [
    { id: 'sla', label: 'Vulnerability remediation timeframes', type: 'sla', sla },
    { id: 'environment', label: 'Environment', type: 'environment', environment },
    { id: 'output', label: 'Output', type: 'findings', findings },
  ],

  questions: {
    server: {
      prompt: 'Select the server to be patched within 14 calendar days:',
      options: SERVER_OPTIONS,
      required: 1,
      correct: '192.168.60.90',
      why: '192.168.60.90 is in OPS (192.168.60.0/24) and has a CVSS of 8.1, which falls in the CVSS > 7.9 < 9.0 band. That band requires remediation within 14 calendar days, and it applies to OPS.',
    },
    technique: {
      prompt: 'Select the appropriate technique and mitigation:',
      options: TECHNIQUE_OPTIONS,
      correct: 'Reconfigure; restrict to use only modern cipher suites',
      why: 'The TLS downgrade finding exists because the server lets clients choose weaker protocols. Restricting the server to modern cipher suites removes the weak options, so a client cannot be forced down to them.',
    },
  },

  // Why the other choices are wrong, shown after checking answers
  distractors: {
    server: {
      '192.168.51.32': 'TEST (192.168.51.0/24). TEST only has an SLA for CVSS > 9.0, and this finding is 8.1, so the 14-day SLA does not apply.',
      '192.168.76.50': 'STAGE (192.168.76.0/24). STAGE has no remediation SLAs at all.',
      '192.168.76.60': 'STAGE (192.168.76.0/24). STAGE has no remediation SLAs at all.',
      '192.168.60.45': 'OPS, but its CVSS is 7.4, which is in the CVSS > 5.0 < 7.9 band with a 30-day deadline.',
      '192.168.51.90': 'TEST (192.168.51.0/24) with a CVSS of 5.1. TEST only has an SLA for CVSS > 9.0.',
    },
    technique: {
      'Compensating control; implement secure session tokens': 'This fixes the missing secure cookie attribute, which is a different finding.',
      'Compensating control; create new ACL on firewall to block port 443': 'Blocking port 443 would take the HTTPS site offline instead of fixing the downgrade.',
      'Compensating control; implement MFA on the application': 'MFA protects logins and does nothing to stop a protocol downgrade.',
      'Reconfigure; transition to a new identity and access manager': 'An identity and access manager is unrelated to cipher negotiation.',
      'Request exception; organization needs time to procure a PKI': 'This would suit an untrusted certificate, not a downgrade issue.',
      'Reconfigure; upgrade IIS to current release': 'This would suit the unsupported IIS finding, not a downgrade issue.',
      'Request exception; legacy protocol could have operational impact': 'An exception is not needed because the server can simply be reconfigured.',
    },
  },

  review: {
    tips: [
      'Read the SLA matrix first. An environment with an X in every row (STAGE here) has no remediation SLAs, so you can cross off every IP in its subnets straight away.',
      'Map each IP to its environment using the Environment tab: 192.168.60.x is OPS, 192.168.76.x is STAGE and 192.168.51.x is TEST.',
      'Then filter by the CVSS band you are asked about (more than 7.9 and below 9.0 for 14 days) and check that the environment enforces it. TEST only enforces CVSS above 9.0.',
      'Match the root cause to the fix: TLS downgrade or weak ciphers means restrict to modern cipher suites, unsupported software means upgrade, an untrusted certificate means a signed certificate from a trusted provider, and a missing secure cookie flag means secure session tokens.',
    ],
  },
};