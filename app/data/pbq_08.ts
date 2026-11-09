import type { PbqLogAnalysis } from './pbqTypes';

const IP_OPTIONS = [
  '41.21.18.102',
  '192.168.11.102',
  '192.168.10.37',
  '52.110.26.27',
  '192.168.10.32',
  '32.111.16.37',
];

const INDICATOR_OPTIONS = [
  '404 server error',
  'Modified index.html file',
  'Unauthorized username',
  'Modified about_us file',
  'Repeated failed logins',
];

const ACTION_OPTIONS = [
  'Shut down the insecure file transfer server.',
  'Encrypt index.html.',
  'Change the password on the sjames account.',
  'Deny 192.168.*.* at firewall.',
  'Block external sftp access.',
  'Delete the sjames account.',
];

// ---- Tab 1: SFTP log ------------------------------------------------------------------------
const sftpLog = [
  '2022-04-01 16:04:12 - GUI MODE - PROTOCOL SERVER-TO-CLIENT - (logged in) [IP = 192.168.10.32] [username = sjames]',
  '2022-04-01 16:04:33 - GUI MODE - PROTOCOL SERVER-TO-CLIENT - [directory = /var/www]',
  '2022-04-01 16:05:30 - GUI MODE - PROTOCOL SERVER-TO-CLIENT - [./about_us.html written]',
  '2022-04-01 16:09:20 - GUI MODE - PROTOCOL SERVER-TO-CLIENT - (logged out) [IP = 192.168.10.32] [username = sjames]',
  '2022-04-01 17:10:42 - GUI MODE - PROTOCOL SERVER-TO-CLIENT - (logged in) [IP = 192.168.10.37] [username = sjames]',
  '2022-04-01 17:11:30 - GUI MODE - PROTOCOL SERVER-TO-CLIENT - [directory = /var/www]',
  '2022-04-01 17:14:30 - GUI MODE - PROTOCOL SERVER-TO-CLIENT - [./index written]',
  '2022-04-01 17:15:44 - GUI MODE - PROTOCOL SERVER-TO-CLIENT - (logged out) [IP = 192.168.10.37] [username = sjames]',
  '2022-04-01 19:45:48 - GUI MODE - PROTOCOL SERVER-TO-CLIENT - (logged in) [IP = 32.111.16.37] [username = sjames]',
  '2022-04-01 19:45:58 - GUI MODE - PROTOCOL SERVER-TO-CLIENT - (logged out) [IP = 32.111.16.37] [username = sjames]',
  '2022-04-01 23:01:50 - GUI MODE - PROTOCOL SERVER-TO-CLIENT - (logged in) [IP = 41.21.18.102] [username = sjames]',
  '2022-04-01 23:01:54 - GUI MODE - PROTOCOL SERVER-TO-CLIENT - [directory = /var/www]',
  '2022-04-01 23:02:25 - GUI MODE - PROTOCOL SERVER-TO-CLIENT - [./index.html written]',
  '2022-04-01 23:03:18 - GUI MODE - PROTOCOL SERVER-TO-CLIENT - (logged out) [IP = 41.21.18.102] [username = sjames]',
  '2022-04-01 23:35:28 - GUI MODE - PROTOCOL SERVER-TO-CLIENT - (failed login) [IP = 32.111.16.37] [username = sjames]',
  '2022-04-02 09:10:42 - GUI MODE - PROTOCOL SERVER-TO-CLIENT - (logged in) [IP = 192.168.11.102] [username = sjames]',
  '2022-04-02 09:15:44 - GUI MODE - PROTOCOL SERVER-TO-CLIENT - [directory = /var/www]',
  '2022-04-02 09:22:55 - GUI MODE - PROTOCOL SERVER-TO-CLIENT - [./index written]',
  '2022-04-02 09:23:12 - GUI MODE - PROTOCOL SERVER-TO-CLIENT - (logged out) [IP = 192.168.11.102] [username = sjames]',
];

// ---- Tab 2: Netstat -------------------------------------------------------------------------
const netstat = {
  command: 'netstat -ano',
  columns: ['Proto', 'Local address', 'Foreign address', 'State', 'PID'],
  rows: [
    ['TCP', '0.0.0.0:22', '0.0.0.0:0', 'LISTENING', '1600'],
    ['TCP', '127.0.0.1:1960', '127.0.0.1:49722', 'ESTABLISHED', '1000'],
    ['TCP', '127.0.0.1:1960', '127.0.0.1:49022', 'ESTABLISHED', '1000'],
    ['TCP', '127.0.0.1:49722', '127.0.0.1:1960', 'ESTABLISHED', '4912'],
    ['TCP', '127.0.0.1:49800', '127.0.0.1:1960', 'ESTABLISHED', '4228'],
    ['TCP', '127.0.0.1:49801', '127.0.0.1:1961', 'ESTABLISHED', '4228'],
    ['TCP', '127.0.0.1:38666', '41.21.18.102:22', 'ESTABLISHED', '4940'],
    ['TCP', '127.0.0.1:55356', '192.168.10.32:22', 'ESTABLISHED', '5112'],
    ['TCP', '127.0.0.1:37654', '192.168.10.37:22', 'ESTABLISHED', '5104'],
    ['TCP', '127.0.0.1:55357', '32.111.16.37:22', 'TIME_WAIT', '0'],
    ['TCP', '127.0.0.1:52744', '32.111.16.37:22', 'TIME_WAIT', '0'],
    ['TCP', '127.0.0.1:56751', '32.111.16.37:22', 'TIME_WAIT', '0'],
    ['TCP', '127.0.0.1:39882', '104.17.18.29:22', 'SYN_SENT', '4992'],
  ],
};

// ---- Tab 3: HTTP access ---------------------------------------------------------------------
const httpAccess = [
  '192.168.10.32 - "" - [2022-04-01 16:05:45 "GET https://mycompany.com/about_us.html" HTTP/1.1 200]',
  '192.168.10.37 - "" - [2022-04-01 17:15:20 "GET https://mycompany.com" HTTP/1.1 200]',
  '107.31.28.112 - "" - [2022-04-01 22:11:56 "GET https://mycompany.com" HTTP/1.1 200]',
  '63.11.108.122 - "" - [2022-04-01 22:22:58 "GET https://mycompany.com" HTTP/1.1 200]',
  '41.21.18.102 - "" - [2022-04-01 23:02:56 "GET https://mycompany.com" HTTP/1.1 200]',
  '32.111.16.37 - "" - [2022-04-01 23:34:01 "GET https://mycompany.com" HTTP/1.1 200]',
  '52.110.26.27 - "" - [2022-04-01 23:35:08 "GET https://mycompany.com/aboutUs.html" HTTP/1.1 404]',
  '52.110.26.27 - "" - [2022-04-01 23:35:18 "GET https://mycompany.com/aboutUs.html" HTTP/1.1 404]',
  '52.110.26.27 - "" - [2022-04-01 23:35:22 "GET https://mycompany.com/aboutUs.html" HTTP/1.1 404]',
  '192.168.11.102 - "" - [2022-04-02 09:23:02 "GET http://mycompany.com" HTTP/1.1 200]',
  '63.11.108.122 - "" - [2022-04-02 10:12:18 "GET https://mycompany.com" HTTP/1.1 200]',
  '63.11.108.122 - "" - [2022-04-02 10:12:28 "GET https://mycompany.com/about_us" HTTP/1.1 200]',
];

export const pbq02: PbqLogAnalysis = {
  id: 'pbq-02-website-defacement',
  kind: 'logAnalysis',
  title: 'Website Defacement: Log Analysis and Response',
  difficulty: 'Intermediate',
  objective: '3.2',
  estimatedMinutes: 10,
  modules: [], 

  scenario: ["An organization's website was maliciously altered."],
  instructions: [
    'Review the information in each tab (SFTP log, Netstat and HTTP access).',
    'Select the source IP address the analyst should be most concerned about.',
    'Identify the indicator of compromise.',
    'Select the two appropriate corrective actions.',
    'Use Reset All Answers to return to the starting state.',
  ],

  // Assumed scoring: adjust to match your other PBQs
  points: { ip: 2, indicator: 2, actions: 4 },

  tabs: [
    { id: 'sftp', label: 'SFTP log', type: 'log', lines: sftpLog },
    { id: 'netstat', label: 'Netstat', type: 'netstat', netstat },
    { id: 'http', label: 'HTTP access', type: 'log', lines: httpAccess },
  ],

  questions: {
    ip: {
      prompt: 'Which source IP address should the analyst be most concerned about:',
      options: IP_OPTIONS,
      correct: '41.21.18.102',
      why: 'This external address logged in as sjames at 23:01, wrote index.html at 23:02 and logged out. The HTTP log shows a request from the same address seconds later and netstat shows an established session to it on port 22.',
    },
    indicator: {
      prompt: 'Identify the indicator of compromise:',
      options: INDICATOR_OPTIONS,
      correct: 'Modified index.html file',
      why: 'The site was altered by overwriting index.html, the home page, using valid credentials from an external address outside normal working hours.',
    },
    actions: {
      prompt: 'Select the corrective actions:',
      options: ACTION_OPTIONS,
      required: 2,
      correct: ['Change the password on the sjames account.', 'Block external sftp access.'],
      why: 'The attacker used the sjames credentials from an external address. Changing the password cuts off the stolen or shared credentials, and blocking external SFTP stops outside hosts from reaching the file server at all.',
    },
  },

  // Why the other choices are wrong, shown on the review screen
  distractors: {
    ip: {
      '192.168.11.102': 'Internal address. It wrote ./index during business hours the next morning, which fits routine maintenance.',
      '192.168.10.37': 'Internal address. It wrote ./index during the afternoon and its session is a normal internal one.',
      '52.110.26.27': 'Only generated 404s for aboutUs.html. That is probing at most, and no file was changed.',
      '192.168.10.32': 'Internal address that updated about_us.html during the working day.',
      '32.111.16.37': 'Brief login, a failed login and TIME_WAIT sessions, but it never wrote any file.',
    },
    indicator: {
      '404 server error': 'The 404s come from a different address and did not change anything.',
      'Unauthorized username': 'The username (sjames) is a valid account. The problem is where and when it was used.',
      'Modified about_us file': 'about_us.html was updated by an internal address at 16:05, which is the normal edit.',
      'Repeated failed logins': 'There is only one failed login, from an address that never changed a file.',
    },
    actions: {
      'Shut down the insecure file transfer server.': 'Too disruptive. The website still needs to be updated, and blocking external access addresses the exposure.',
      'Encrypt index.html.': 'Encrypting a public web page would break the site and does not stop it being overwritten.',
      'Deny 192.168.*.* at firewall.': 'That blocks the internal network, which is where the legitimate administrators are.',
      'Delete the sjames account.': 'Removes a legitimate user. Resetting the password is enough and keeps the account usable.',
    },
  },

  review: {
    tips: [
      'Follow one address across all three tabs. The SFTP log shows who wrote a file, the HTTP log shows the page being served afterwards, and netstat shows the live connection.',
      'Internal addresses (192.168.x.x) writing files during working hours is normal. An external address writing index.html at 23:02 is not.',
      'Pick the least disruptive response that closes the hole: reset the credential that was used and stop outside hosts from reaching SFTP.',
    ],
  },
};