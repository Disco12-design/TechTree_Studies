import type { PbqActionPlan } from './pbqTypes';

// PBQ 10: Healthcare action plan. Match one control to each risk finding.
// `kind: 'actionPlan'` tells your parent to render this with <PbqActionPlanSim />.
// Each control may be used only once, and not every control is used.

export const pbq10: PbqActionPlan = {
  id: 'pbq-10',
  kind: 'actionPlan',
  title: '6.) Healthcare Risk Assessment Action Plan',
  estimatedMinutes: 10,
  modules: ['domain-4-2'],

  scenario: [
    'A healthcare organization must develop an action plan based on the findings of a risk assessment.',
    'The action plan must consist of a recommended list of security controls.',
  ],
  instructions: [
    'Select the appropriate control to implement for each risk finding.',
    'Each control may be used only once, and not all controls will be used.',
    'The options may appear in a different order each time. Use Reset All Answers to return to the starting state.',
  ],

  actionPlan: {
    title: 'Action Plan',
    points: 5,
    controls: [
      'Implement IDS/IPS',
      'Implement email encryption',
      'Implement file integrity monitoring',
      'Implement SPF',
      'Require data deidentification',
      'Implement web content filter',
      'Implement PIN to print',
      'Require user authentication',
      'Filter echo request replies',
      'Implement MDM solution',
    ],
    rows: [
      {
        id: 'r1',
        finding: 'A large volume of ICMP traffic is detected from an external source to Server2.',
        correct: 'Filter echo request replies',
        why: 'Filtering or rate-limiting ICMP echo requests and replies at the firewall blunts ping floods and stops outsiders from using ping to map the network.',
      },
      {
        id: 'r2',
        finding: 'A large number of potentially malicious emails is reaching end-user and shared mailboxes.',
        correct: 'Implement SPF',
        why: 'SPF publishes which mail servers may send mail for the domain, so receiving servers can reject spoofed senders and fewer phishing emails reach mailboxes.',
      },
      {
        id: 'r3',
        finding: 'PHI data was found within the development and test environments.',
        correct: 'Require data deidentification',
        why: 'Protected health information must be masked, tokenized or anonymized before it is copied into non-production environments, which supports HIPAA requirements.',
      },
      {
        id: 'r4',
        finding: 'Sensitive materials were found on a fax machine in a common area.',
        correct: 'Implement PIN to print',
        why: 'Requiring a PIN or badge at the device means documents are released only when the authorized person is standing there to collect them.',
      },
      {
        id: 'r5',
        finding: 'The internet-facing web server allows access to internal data without requiring credentials.',
        correct: 'Require user authentication',
        why: 'Authentication puts an identity check in front of the internal data, so the public cannot read it just by reaching the server.',
      },
      {
        id: 'r6',
        finding: 'Unauthorized software was discovered on technician servers.',
        correct: 'Implement file integrity monitoring',
        why: 'File integrity monitoring detects unexpected file changes and software installs on critical servers so drift is flagged right away.',
      },
    ],
    unused: [
      { control: 'Implement IDS/IPS', note: 'Detects or blocks attacks in general, but the specific fix for the ICMP flood is filtering echo traffic.' },
      { control: 'Implement email encryption', note: 'Protects message confidentiality in transit. It does not reduce malicious mail arriving.' },
      { control: 'Implement web content filter', note: 'Controls what users browse outbound. It does not fix an exposed web server.' },
      { control: 'Implement MDM solution', note: 'Manages mobile devices. None of the findings involve mobile devices.' },
    ],
  },

  review: {
    tips: [
      'Match the control to the exact problem: a flood of ICMP points to filtering echo traffic, spoofed or phishing mail points to SPF, and exposed data with no login points to authentication.',
      'PHI in test and development environments is a deidentification problem. Real patient data should not be copied into non-production systems.',
      'Physical exposure of printed or faxed material points to PIN to print.',
      'Use elimination: each control is used once, so settle the obvious matches first and leave the distractors for last.',
    ],
  },
};