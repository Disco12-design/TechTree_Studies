import type { PbqInvestigation } from './pbqTypes';

// PBQ 09: A host is part of a DDoS attack. Find the compromised host, the executable and the remediation.
// `kind: 'investigation'` tells App.jsx to render this with <PbqInvestigationSim />.
//
// Answer key (from "The Suggested Answer" slide in CS0-004_PBQ_09.pdf):
//   Compromised host:        192.168.10.6 (Workstation 2)
//   Compromised executable:  mozilla.exe
//   Correct remediation:     Block all HTTP requests to the target IP address.

// ---- Network diagram ------------------------------------------------------------------------
const diagram = {
  domains: [
    { id: 'workstation', name: 'Workstation domain', network: '192.168.10.x/24', hostIds: ['ws1', 'ws2'] },
    { id: 'server', name: 'Server domain', network: '172.16.25.x/24', hostIds: ['dns', 'proxy', 'app', 'db'] },
  ],
  internet: { label: 'Internet' },
  target: { label: 'DDoS target', ip: '52.13.86.101' },
  // The proxy server is the host that connects to the internet in the diagram
  gatewayHostId: 'proxy',
};

// ---- Terminal output per host ---------------------------------------------------------------
const NETSTAT_COLUMNS = ['Proto', 'Local address', 'Foreign address', 'State', 'PID', 'Process'];

const hosts = [
  {
    id: 'ws1',
    label: 'Workstation 1',
    ip: '192.168.10.5',
    icon: 'laptop',
    outputs: [
      {
        id: 'netstat',
        label: 'Netstat',
        title: 'Workstation 1',
        type: 'netstat',
        columns: NETSTAT_COLUMNS,
        rows: [
          ['TCP', '0.0.0.0:22', '0.0.0.0:0', 'LISTENING', '1000', ''],
          ['TCP', '0.0.0.0:23', '0.0.0.0:0', 'LISTENING', '1033', ''],
          ['TCP', '0.0.0.0:443', '0.0.0.0:0', 'LISTENING', '1400', ''],
          ['TCP', '0.0.0.0:80', '0.0.0.0:0', 'LISTENING', '1989', ''],
          ['TCP', '127.0.0.1:1960', '172.16.25.50:22', 'ESTABLISHED', '2230', 'sftp.exe'],
          ['TCP', '127.0.0.1:8447', '172.16.50.10:https', 'ESTABLISHED', '2480', 'mozilla.exe'],
          ['UDP', '127.0.0.1:9211', '172.16.25.50:53', 'ESTABLISHED', '3100', ''],
          ['TCP', '127.0.0.1:55357', '32.111.16.37:22', 'TIME_WAIT', '4800', 'sftp.exe'],
        ],
      },
    ],
  },
  {
    id: 'ws2',
    label: 'Workstation 2',
    ip: '192.168.10.6',
    icon: 'laptop',
    outputs: [
      {
        id: 'netstat',
        label: 'Netstat',
        title: 'Workstation 2',
        type: 'netstat',
        columns: NETSTAT_COLUMNS,
        rows: [
          ['TCP', '0.0.0.0:22', '0.0.0.0:0', 'LISTENING', '1000', ''],
          ['TCP', '0.0.0.0:23', '0.0.0.0:0', 'LISTENING', '1235', ''],
          ['TCP', '0.0.0.0:443', '0.0.0.0:0', 'LISTENING', '1456', ''],
          ['TCP', '0.0.0.0:80', '0.0.0.0:0', 'LISTENING', '1568', ''],
          ['TCP', '127.0.0.1:1960', '172.16.25.20:3306', 'ESTABLISHED', '2001', 'mysql.exe'],
          ['TCP', '127.0.0.1:8447', '52.13.86.101:https', 'ESTABLISHED', '2277', 'mozilla.exe'],
          ['UDP', '127.0.0.1:9211', '172.16.25.50:53', 'ESTABLISHED', '3245', ''],
        ],
      },
    ],
  },
  {
    id: 'dns',
    label: 'DNS server',
    ip: '172.16.25.50',
    icon: 'dns',
    outputs: [
      {
        id: 'netstat',
        label: 'Netstat',
        title: 'DNS SERVER',
        type: 'netstat',
        columns: NETSTAT_COLUMNS,
        rows: [
          ['TCP', '0.0.0.0:22', '0.0.0.0:0', 'Listening', '1000', ''],
          ['TCP', '0.0.0.0:23', '0.0.0.0:0', 'Listening', '1200', ''],
          ['TCP', '0.0.0.0:443', '0.0.0.0:0', 'Listening', '1480', ''],
          ['TCP', '0.0.0.0:80', '0.0.0.0:0', 'Listening', '2122', ''],
          ['TCP', '127.0.0.1', '172.16.25.20:3306', 'Established', '2480', 'mysql.exe'],
          ['TCP', '127.0.0.1:53', '192.168.10.5', 'Established', '2722', 'dns.exe'],
        ],
      },
    ],
  },
  {
    id: 'proxy',
    label: 'Proxy server',
    ip: '172.16.50.10',
    icon: 'proxy',
    outputs: [
      {
        id: 'netstat',
        label: 'Netstat output',
        title: 'Proxy Server - Netstat Output',
        type: 'netstat',
        columns: NETSTAT_COLUMNS.slice(0, 5),
        rows: [
          ['TCP', '0.0.0.0:22', '0.0.0.0:0', 'Listening', '1000'],
          ['TCP', '0.0.0.0:23', '0.0.0.0:0', 'Listening', '1200'],
          ['TCP', '0.0.0.0:443', '0.0.0.0:0', 'Listening', '1480'],
          ['TCP', '0.0.0.0:80', '0.0.0.0:0', 'Listening', '2122'],
          ['TCP', '127.0.0.1:8100', '43.104.133.18:https', 'Established', '2699'],
          ['TCP', '127.0.0.1:8100', '16.14.111.8:https', 'Established', '2722'],
          ['TCP', '127.0.0.1:8100', '203.4.3.7:https', 'Established', '2782'],
          ['TCP', '127.0.0.1:8100', '43.104.133.19:https', 'Established', '2900'],
          ['UDP', '127.0.0.1:9211', '172.16.25.50:53', 'Established', '9145'],
        ],
      },
      {
        id: 'logs',
        label: 'Proxy logs',
        title: 'Proxy Server - Proxy Logs',
        type: 'proxyLog',
        columns: ['Host', 'Destination', 'Protocol', 'Request'],
        rows: [
          ['192.167.10.5', '8.8.8.8', 'https', '"GET https://google.com"'],
          ['192.167.10.5', '8.8.8.8', 'https', '"GET https://google.com/search?q=current+stoc+price"'],
          ['192.167.10.5', '8.8.8.8', 'https', '"GET https://google.com/search?q=current+stock+price"'],
          ['172.16.25.20', '43.104.133.18', 'https', `"GET https://sourceforge/search?'default sql login'"`],
          ['192.168.10.5', '8.8.8.8', 'https', '"GET https://google.com/search?q=last+stock+price"'],
          ['172.16.25.20', '16.14.111.8', 'https', '"POST https://oracle.com/patch=%version%"'],
          ['192.168.10.5', '52.13.86.101', 'https', '"GET https://bank.com/mylogin"'],
          ['192.167.10.5', '203.4.3.7', 'https', '"GET https://newssource.com/latest.html"'],
          ['172.16.25.20', '43.104.133.19', 'https', `"GET https://sourceforge/search?'default sql login command syntax'"`],
          ['192.167.10.5', '8.8.8.8', 'https', '"GET https://bank.com/mylogin"'],
        ],
      },
    ],
  },
  { id: 'app', label: 'Application server', ip: '172.16.25.60', icon: 'app', outputs: [] },
  { id: 'db', label: 'Database server', ip: '172.16.25.20', icon: 'db', outputs: [] },
];

// ---- Answer area ----------------------------------------------------------------------------
// The slides only show the selected host and the remediation list. The host and executable lists
// below are assumed from the diagram and the netstat output, so adjust them if the real list differs.
const HOST_OPTIONS = ['192.168.10.5', '192.168.10.6', '172.16.25.50', '172.16.50.10', '172.16.25.60', '172.16.25.20'];

const EXECUTABLE_OPTIONS = ['sftp.exe', 'mozilla.exe', 'mysql.exe', 'dns.exe'];

const REMEDIATION_OPTIONS = [
  'Bypass the proxy server for all HTTP requests.',
  'Reimage the host workstation 2.',
  'Disable web browsing from the server domain.',
  'Block all HTTP requests to the target IP address.',
];

export const pbq09: PbqInvestigation = {
  id: 'pbq-09-ddos-investigation',
  kind: 'investigation',
  title: 'DDoS Host Investigation',
  difficulty: 'Intermediate',
  objective: '1.2', // TODO: confirm the exam objective number for this PBQ
  estimatedMinutes: 10,
  modules: [], // TODO: set to the module id(s) this PBQ belongs to

  scenario: [
    'An organization receives an indication that one of its hosts is part of a DDoS attack against a victim. The proxy server is supposed to handle all web page requests from all internal hosts.',
  ],
  instructions: [
    'Click on each workstation and server to review outputs and log files.',
    'Identify the compromised host and executable, and determine an appropriate remediation for the issue.',
    'At any time you can click Reset All Answers to bring back the initial state of the simulation.',
  ],

  // Assumed scoring: adjust to match your other PBQs
  points: { host: 2, executable: 2, remediation: 2 },

  diagram,
  hosts,

  questions: {
    host: {
      prompt: 'Select the compromised host:',
      options: HOST_OPTIONS,
      correct: '192.168.10.6',
      why: 'Workstation 2 has an established HTTPS connection straight to the DDoS target (52.13.86.101). Every other host sends its web traffic to the proxy, so this one is going around it.',
    },
    executable: {
      prompt: 'Select the compromised executable:',
      options: EXECUTABLE_OPTIONS,
      correct: 'mozilla.exe',
      why: 'The connection to the target belongs to PID 2277, and the process column shows that PID is mozilla.exe, the process generating the malicious web traffic.',
    },
    remediation: {
      prompt: 'Select the correct remediation:',
      options: REMEDIATION_OPTIONS,
      correct: 'Block all HTTP requests to the target IP address.',
      why: 'The host is attacking an external IP right now, so the immediate, targeted fix is to cut off that traffic at the perimeter firewall.',
    },
  },

  // Why the other choices are wrong, shown after checking answers
  distractors: {
    host: {
      '192.168.10.5': 'Workstation 1 sends its web traffic through the proxy (172.16.50.10) and has no connection to the target.',
      '172.16.25.50': 'The DNS server only shows DNS and database connections.',
      '172.16.50.10': 'The proxy server only connects to ordinary external sites on behalf of internal hosts.',
      '172.16.25.60': 'No suspicious output points to the application server.',
      '172.16.25.20': 'The database server is only seen talking to the DNS server and a workstation over port 3306.',
    },
    executable: {
      'sftp.exe': 'sftp.exe is making file-transfer connections on port 22 and is not connected to the target.',
      'mysql.exe': 'mysql.exe is talking to the database on port 3306, which is expected.',
      'dns.exe': 'dns.exe is the DNS service and is not involved in the connection to the target.',
    },
    remediation: {
      'Bypass the proxy server for all HTTP requests.': 'The problem is traffic that already bypasses the proxy, so this would make it worse.',
      'Reimage the host workstation 2.': 'This is heavier than needed as the first step. The key asks for the immediate, targeted containment: stop the traffic at the firewall.',
      'Disable web browsing from the server domain.': 'The attack comes from a workstation, not the server domain, so this does not stop it.',
    },
  },

  review: {
    tips: [
      'Start from the rule in the scenario: the proxy handles all web page requests from all internal hosts. Any host talking to the internet directly is the one to look at.',
      'Compare each foreign address with the DDoS target (52.13.86.101). Only Workstation 2 has a connection to it.',
      'Use the PID column to find the process behind that connection. PID 2277 is mozilla.exe.',
      'Pick the containment that matches the situation: an active attack on an external IP is stopped at the perimeter firewall by blocking that IP.',
    ],
  },
};