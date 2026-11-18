import type { Pbq02Steps } from '../data/pbqTypes';

// PBQ 02: Validate and remediate vulnerability scan findings (two-step simulation).
// `kind: 'steps'` tells the parent to render this with <PbqStepSim /> instead of <PbqSim />.

const VALIDATE_OPTIONS = ['False Positive', 'False Negative', 'True Positive', 'True Negative'];

const REMEDIATION_OPTIONS = [
  'Encrypt Entire Session',
  'Encrypt All Session Cookies',
  'Implement Input Validation',
  'Submit as Non-Issue',
  'Employ Unique Token in Hidden Field',
  'Avoid Using Redirects and Forwards',
  'Disable HTTP',
  'Request Certificate from a Public CA',
  'Renew the Current Certificate',
];

export const pbq04: Pbq02Steps = {
  id: 'pbq-02',
  kind: 'steps',
  title: '2.) Validate and Remediate Scan Findings',
  estimatedMinutes: 12,
  modules: ['domain-2-3', 'domain-2-4'],

  // Paragraph arrays: each entry renders as its own paragraph in the left sidebar
  scenario: [
    'The developers recently deployed new code to three web servers.',
    'An automated external scan reports server vulnerabilities that count as failure items under PCI DSS.',
    'If a finding is not valid, the analyst must take the proper steps to get the scan clean. If it is valid, the analyst must remediate it.',
    'After reviewing the scan report, open the STEP 2 tab and choose the correct Validation Result and Remediation Action for each server from the drop-down lists.',
  ],
  instructions: [
    'The simulation includes 2 steps.',
    'STEP 1: Review the vulnerability scan report, then move to the STEP 2 tab.',
    'STEP 2: Given the scenario, determine which remediation action is required to address each vulnerability.',
  ],

  tabs: [
    {
      id: 'step1',
      title: 'STEP 1',
      type: 'scanReport',
      heading: 'Vulnerability Scan Report',
      sections: [
        {
          severity: 'HIGH SEVERITY',
          color: '#3d9a5b',
          items: [
            {
              title: 'Cleartext Transmission of Sensitive Information',
              description:
                'The software transmits sensitive or securely critical data in cleartext in a communication channel that can sniffed by authorized users',
              asset: '172.30.0.15',
              risk: 'Anyone can read the information by gaining access to the channel being used for communication.',
              reference: 'CVE-2002-1949',
            },
          ],
        },
        {
          severity: 'MEDIUM SEVERITY',
          color: '#d9a21b',
          items: [
            {
              title: "Sensitive Cookie in HTTPS Session without 'Secure' Attribute",
              description:
                'The secure attributes for sensitive cookies in HTTPS sessions is not set, which could cause the use agent to send those cookies in plaintext over HTTP session. ',
              asset: '172.30.0.152',
              risk: 'Session sidejacking',
              reference: 'CVE-2004-0462',
            },
          ],
        },
        {
          severity: 'LOW SEVERITY',
          color: '#2f6fd6',
          items: [
            {
              title: 'Untrusted SSL/TLS Server X.509 Certificate',
              description:
                "The server's TLS/SSL certificate is signed by a Certification Authority that is untrusted or unknown.",
              asset: '172.30.0.153',
              risk: 'May allow man-in-the-middle attackers to insert a spoofed certificate for any Distinguished Name (DN).',
              reference: 'CVE-2005-1234',
            },
          ],
        },
      ],
    },
    {
      id: 'step2',
      title: 'STEP 2',
      type: 'matrix',
      heading: 'INSTRUCTIONS',
      text: 'STEP 2: Given the scenario, determine which remediation action is required to address the vulnerability.',
    },
  ],

  // Step 2 answer grid. Points: each dropdown is scored on its own.
  matrix: {
    points: { validate: 5, remediation: 5 },
    validateOptions: VALIDATE_OPTIONS,
    remediationOptions: REMEDIATION_OPTIONS,
    rows: [
      {
        id: 'ws01',
        system: 'WEB_SERVER01',
        correct: { validate: 'True Positive', remediation: 'Encrypt Entire Session' },
      },
      {
        id: 'ws02',
        system: 'WEB_SERVER02',
        correct: { validate: 'True Positive', remediation: 'Encrypt All Session Cookies' },
      },
      {
        id: 'ws03',
        system: 'WEB_SERVER03',
        correct: { validate: 'True Positive', remediation: 'Request Certificate from a Public CA' },
      },
    ],
  },

  review: {
    intro:
      'A scan result can be a True Positive (the flaw exists), a False Positive (it does not), a False Negative (it exists but was missed) or a True Negative (it does not exist and was correctly ignored). All three findings here match real conditions on the servers, so all three are True Positives and each needs remediation.',
    servers: [
      {
        system: 'WEB_SERVER01 (172.30.0.151)',
        finding: 'Cleartext transmission of sensitive information',
        meaning:
          'Data crosses the network unencrypted, so anyone who can intercept the traffic could read credentials, session data, customer data or payment details. That fails PCI DSS, which requires protection of data in transit.',
        answer: 'True Positive; Encrypt Entire Session',
        why: 'The problem is the whole channel, not one field or parameter. Encrypting the entire session with HTTPS/TLS protects everything sent over it.',
      },
      {
        system: 'WEB_SERVER02 (172.30.0.152)',
        finding: "Sensitive cookie in HTTPS session without 'Secure' attribute",
        meaning:
          'Without the Secure flag, a browser may send the session cookie over plain HTTP, where an attacker can capture it and hijack the session.',
        answer: 'True Positive; Encrypt All Session Cookies',
        why: 'The flaw is specific to cookies. Setting the Secure attribute makes the browser send them only over encrypted HTTPS connections.',
      },
      {
        system: 'WEB_SERVER03 (172.30.0.153)',
        finding: 'Untrusted SSL/TLS server X.509 certificate',
        meaning:
          'The certificate was issued by an unknown or untrusted CA, so browsers show warnings, users cannot verify the server identity, and man-in-the-middle attacks become easier.',
        answer: 'True Positive; Request Certificate from a Public CA',
        why: 'A certificate from a trusted public CA is accepted automatically by browsers and scanners. The certificate is not expired, so renewing it would not fix the problem.',
      },
    ],
    tips: [
      'Cleartext data in transit: think TLS/HTTPS, so Encrypt Entire Session.',
      'Cookie security issue: think the Secure flag, so Encrypt All Session Cookies.',
      'Untrusted certificate: think trusted public CA.',
      'Expired certificate: think Renew the Current Certificate. Telling expired and untrusted apart is a common CySA+ exam trap.',
    ],
  },
};
