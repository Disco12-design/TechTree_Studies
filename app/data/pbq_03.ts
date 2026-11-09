import type { PbqListings } from './pbqTypes';

// PBQ 03: Identify scan type, spot false positives, and match each result set to a server.
// `kind: 'listings'` tells your parent to render this with <PbqDragSim />.

export const pbq03: PbqListings = {
  id: 'pbq-03',
  kind: 'listings',
  title: '3.) Scan Types, False Positives and Server Identification',
  difficulty: 'Advanced',
  estimatedMinutes: 15,
  modules: ['domain-2-1', 'domain-2-3'],

  scenario: [
    'A security analyst performs several types of vulnerability scans.',
    'Review the scan results to determine which type of scan produced each listing, and whether any false positives occurred on each device.',
  ],
  instructions: [
    'Use the Results Generated drop-down to choose whether each listing came from a credentialed scan, a non-credentialed scan or a compliance scan.',
    'For credentialed and non-credentialed scans ONLY, check the findings that are false positives. To uncheck a finding, click it a second time.',
    'Finally, identify the type of server behind each listing by dragging a server onto the results. You can also click a server, then click the box beside a listing.',
    'The Linux Web Server, File/Print Server and Directory Server are draggable. Use Reset All Answers to return to the starting state, and Submit when you are done.',
  ],

  tabs: [
    { id: 'diagram', title: 'Network Diagram', type: 'diagram' },
    { id: 'results', title: 'Scan Results', type: 'listings' },
  ],

  servers: [
    { id: 'linux-web', label: 'Linux Web Server' },
    { id: 'file-print', label: 'File/Print Server' },
    { id: 'directory', label: 'Directory Server' },
  ],

  scanOptions: ['Credentialed', 'Non-Credentialed', 'Compliance'],

  // Each listing is worth scan + falsePositive + server points
  points: { scan: 4, falsePositive: 3, server: 3 },

  listings: [
    {
      id: 'l1',
      title: 'Findings Listing 1',
      findings: [
        { id: 'l1-f1', text: 'Critical (10.0) 12209 Security Update for Microsoft Windows (835732)' },
        { id: 'l1-f2', text: 'Critical (10.0) 13852 Microsoft Windows Task Scheduler Remote Overflow (841873)' },
        { id: 'l1-f3', text: 'Critical (10.0) 18502 Vulnerability in SMB Could Allow Remote Code Execution (896422)' },
        { id: 'l1-f4', text: 'Critical (10.0) 58662 Samba 3.x < 3.6.4 / 3.5.14 / 3.4.16 RPC Multiple Buffer Overflows (20161146)' },
        { id: 'l1-f5', text: 'Critical (10.0) 19407 Vulnerability in Printer Spooler Service Could Allow Remote Code Execution (896423)' },
      ],
      correct: { scan: 'Non-Credentialed', falsePositives: ['l1-f4'], server: 'file-print' },
    },
    {
      id: 'l2',
      title: 'Findings Listing 2',
      findings: [
        { id: 'l2-f1', text: 'Critical (10.0) 19407 Vulnerability in Printer Spooler Service Could Allow Remote Code Execution (896423)' },
        { id: 'l2-f2', text: 'Critical (10.0) 11890 Ubuntu 5.04 / 5.10 / 6.06 LTS : Buffer Overrun in Messenger Service (CVE-2016-8035)' },
        { id: 'l2-f3', text: 'Critical (10.0) 27942 Ubuntu 5.04 / 5.10 / 6.06 LTS : php5 vulnerabilities (CVE-2016-362-1)' },
        { id: 'l2-f4', text: 'Critical (10.0) 27978 Ubuntu 5.10 / 6.06 LTS / 6.10 : gnupg vulnerability (CVE-2016-3931)' },
        { id: 'l2-f5', text: 'Critical (10.0) 28017 Ubuntu 5.10 / 6.06 LTS / 6.10 : php5 regression (CVE-2016-4242)' },
      ],
      correct: { scan: 'Non-Credentialed', falsePositives: ['l2-f1'], server: 'linux-web' },
    },
    {
      id: 'l3',
      title: 'Findings Listing 3',
      findings: [
        { id: 'l3-f1', text: 'WARNING (1.0.1) System cryptography: Force strong key protection for user keys stored on the computer. Prompt the user each time a key is first used' },
        { id: 'l3-f2', text: 'INFORM (1.2.4) Network access: Do not allow anonymous enumeration of SAM accounts: Enabled' },
        { id: 'l3-f3', text: 'INFORM (1.3.4) Network access: Do not allow anonymous enumeration of SAM accounts and shares: Enabled' },
        { id: 'l3-f4', text: 'INFORM (1.5.0) Network access: Let Everyone permissions apply to anonymous users: Disabled' },
        { id: 'l3-f5', text: 'INFORM (1.6.5) Network access: Sharing and security model for local accounts: Classic - local users authenticate as themselves' },
      ],
      correct: { scan: 'Compliance', falsePositives: ['l3-f1'], server: 'directory' },
    },
  ],

  review: {
    listings: [
      {
        title: 'Findings Listing 1',
        answer: 'Non-Credentialed scan; false positive: Samba RPC buffer overflow (58662); server: File/Print Server',
        why: [
          'Nearly every finding is a Windows issue: a Windows security update, Task Scheduler, SMB and the Print Spooler.',
          'Samba is a Linux/Unix file-sharing service and does not belong on a Windows host, so that finding does not fit and is the false positive.',
          'A non-credentialed scan only sees what is visible over the network. It cannot check software versions locally, which is why it produces false positives like this one.',
          'Windows file sharing plus a print spooler points to the File/Print Server.',
        ],
      },
      {
        title: 'Findings Listing 2',
        answer: 'Non-Credentialed scan; false positive: Printer Spooler vulnerability (19407); server: Linux Web Server',
        why: [
          'The findings are Ubuntu packages, php5 and gnupg, all of which point to a Linux system running web software.',
          'The Print Spooler issue is a Windows component and would not normally appear on an Ubuntu web server, so it is the false positive.',
          'The listing is a set of vulnerabilities seen from outside, not a local patch audit, which fits a non-credentialed scan.',
        ],
      },
      {
        title: 'Findings Listing 3',
        answer: 'Compliance scan; no false positives; server: Directory Server',
        why: [
          'These are not exploitable vulnerabilities. They are configuration and policy settings being checked against a baseline, which is what a compliance scan does.',
          'False positives are only evaluated for credentialed and non-credentialed scans, so none are selected here.',
          'References to SAM accounts, network access policy and authentication settings are typical of a directory (Active Directory) environment.',
        ],
      },
    ],
    logic: [
      {
        heading: 'Look for operating system clues',
        points: [
          'Windows: Printer Spooler, Task Scheduler, Microsoft security updates, SAM accounts.',
          'Linux: Ubuntu, Samba, PHP, GnuPG.',
        ],
      },
      {
        heading: 'Look for compliance indicators',
        points: ['Password policies, GPO settings, authentication settings and security baselines point to a compliance scan rather than a vulnerability scan.'],
      },
      {
        heading: 'Look for false positives',
        points: ['Ask: does this vulnerability belong on this operating system? If not, it is likely the false positive.'],
      },
    ],
  },
};