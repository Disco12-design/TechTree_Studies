import type { PbqHardening } from './pbqTypes';

// PBQ 06: System hardening. Pick each device's role and its non-compliant service.
// `kind: 'hardening'` tells your parent to render this with <PbqHardenSim />.

export const pbq06: PbqHardening = {
  id: 'pbq-06',
  kind: 'hardening',
  title: '4.) System Hardening: Non-Compliant Services',
  estimatedMinutes: 10,
  modules: ['domain-2-1'],

  scenario: [
    'You are a penetration tester who is reviewing the system hardening guidelines for a company. The hardening guidelines indicate the following:',
    '• There must be one primary server or service per device. Only the default port should be used.',
    '• Non-secure protocols should be disabled.',
    '• The corporate internet presence should be placed in a protected subnet.',
  ],

  tabs: [
    {
      id: 'step1',
      title: 'Step 1: Review',
      type: 'diagram',
      instructions: [
        'The simulation includes 2 steps.',
        'STEP 1: Review the information provided in the network diagram, then move to the STEP 2 tab.',
      ],
    },
    {
      id: 'step2',
      title: 'Step 2: Configure',
      type: 'form',
      instructions: [
        'STEP 2: Given the scenario, determine which remediation action is required to address the vulnerability.',
        'For each device, choose its Role and the one Non-Compliant Service that breaks the hardening guidelines.',
        'The IP Address box is for reference only and is not scored.',
        'Use Reset All Answers to start again, and Submit when you are done.',
      ],
    },
  ],

  // Devices appear in this order on the Step 2 form.
  devices: [
    {
      id: 'carl',
      name: 'CandyManCarl.Local',
      zone: 'Internal',
      correct: { role: 'File Server', ip: '192.168.1.20', service: 'FTP 21' },
    },
    {
      id: 'laura',
      name: 'FarmerLaura.Local',
      zone: 'Internal',
      correct: { role: 'Mail Server', ip: '192.168.1.30', service: 'IMAP 143' },
    },
    {
      id: 'sara',
      name: 'SandwichSara.Local',
      zone: 'Internal',
      correct: { role: 'Database', ip: '192.168.1.40', service: 'DNS 53' },
    },
    {
      id: 'ted',
      name: 'FarmerTed.Local',
      zone: 'Internal',
      correct: { role: 'Switch', ip: '192.168.1.10', service: 'Telnet 23' },
    },
    {
      id: 'mike',
      name: 'LunchTimeMike.Local',
      zone: 'DMZ',
      correct: { role: 'Web Server', ip: '192.168.1.25', service: 'SSH 22' },
    },
  ],

  roleOptions: ['Web Server', 'Mail Server', 'Database', 'File Server', 'Switch'],

  serviceOptions: [
    'SMB/CIFS 445',
    'SMTP 25',
    'MYSQL 3306',
    'RPC 135',
    'NetBIOS 139',
    'IMAP/S 993',
    'Telnet 23',
    'HTTPS 443',
    'DNS 53',
    'HTTP 80',
    'IMAP 143',
    'FTP 21',
    'SSH 22',
  ],

  // Each device is worth role + service points
  points: { role: 3, service: 3 },

  review: {
    devices: [
      {
        id: 'carl',
        answer: 'File Server, FTP 21',
        why: [
          'FTP sends usernames, passwords and files in cleartext, so anyone capturing traffic can read them.',
          'The hardening standard says non-secure protocols must be disabled. Use SFTP or FTPS instead.',
        ],
      },
      {
        id: 'laura',
        answer: 'Mail Server, IMAP 143',
        why: [
          'IMAP on port 143 is the unencrypted version, so credentials and mail can cross the network in cleartext.',
          'The secure version is IMAPS on port 993, which is already in the list and is fine.',
        ],
      },
      {
        id: 'sara',
        answer: 'Database, DNS 53',
        why: [
          'DNS is not insecure, but a database server should not also run DNS.',
          'This breaks the rule of one primary server or service per device.',
        ],
      },
      {
        id: 'ted',
        answer: 'Switch, Telnet 23',
        why: [
          'Telnet sends usernames, passwords and admin commands in cleartext.',
          'A hardened switch should be managed with SSH instead.',
        ],
      },
      {
        id: 'mike',
        answer: 'Web Server (DMZ), SSH 22',
        why: [
          'This is the internet-facing server, so it sits in the DMZ (the protected subnet).',
          'A web server exists to serve web content. SSH is a secondary administrative service, which breaks the one primary service rule.',
          'SSH itself is secure. It is flagged because it does not belong on this device under the policy.',
        ],
      },
    ],
    logic: [
      {
        heading: 'Flag these insecure protocols straight away',
        points: [
          'FTP (21) → replace with SFTP/FTPS.',
          'Telnet (23) → replace with SSH.',
          'IMAP (143) → replace with IMAPS (993).',
          'POP3 (110) → replace with POP3S (995).',
          'HTTP (80) → replace with HTTPS (443).',
        ],
      },
      {
        heading: 'Secure but out of place still counts',
        points: [
          'If a service is secure but does not belong on that device (DNS on a database server, SSH on a web server), it still breaks the one primary service rule. Select it.',
        ],
      },
    ],
  },
};