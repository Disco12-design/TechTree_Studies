import type { PbqArtifacts } from './pbqTypes';

// PBQ 08: Phishing incident. Review artifacts, identify the malware details (Part 1),
// then map one control to each kill chain stage (Part 2).
// `kind: 'artifacts'` tells your parent to render this with <PbqKillChainSim />.

const CONTROLS = [
  'Firewall file type filter',
  'Honeypot',
  'MFA',
  'MAC filtering',
  'Restricted local user permissions',
  'Email filtering',
  'Disk-level encryption',
  'Updated antivirus',
  'Network segmentation',
  'Plain text email format',
  'VPN',
  'IP blocklist',
  'Backups',
];

export const pbq08: PbqArtifacts = {
  id: 'pbq-08',
  kind: 'artifacts',
  title: '5.) Phishing Incident: Artifacts and Kill Chain Controls',
  difficulty: 'Advanced',
  estimatedMinutes: 15,
  modules: ['domain-3-2', 'domain-3-3'],

  scenario: [
    'A company recently experienced a security incident. The security team determined that a user clicked a link in a phishing email sent to the entire company.',
    'The link led to a malware download, which was then installed and run.',
  ],
  instructions: [
    'Part 1: Review the artifacts from the incident. Identify the name of the malware, the malicious IP address, and the date and time the malware executable entered the organization.',
    'Part 2: Review the kill chain items and select an appropriate control for each one that would have helped prevent this incident and improves the organization’s security posture.',
    'Each control may be used only once, and not all controls will be used.',
  ],

  // Click an icon to open the artifact beneath the banner
  artifacts: [
    {
      id: 'firewall',
      icon: 'firewall',
      label: 'Firewall log',
      type: 'log',
      sections: [
        {
          heading: 'Traffic denied:',
          lines: [
            'Dec 1 14:10:46 fire00 fire00: NetScreen device_id=fire00 [Root]system-notification-00257(traffic): policy_id=119 service=udp/port:7001 proto=17 src zone=Trust dst zone=Untrust action=Deny sent=0 rcvd=0 src=192.168.2.1 dst=1.2.3.4 src_port=3036 dst_port=7001',
            'Dec 1 14:12:31 fire00 aka1: NetScreen device_id=aka1 [Root]system-notification-00257(traffic): policy_id=120 service=udp/port:20721 proto=17 src zone=Trust dst zone=DMZ action=Deny sent=0 rcvd=0 src=192.168.2.2 dst=1.2.3.4 src_port=53 dst_port=20721',
            'Dec 1 14:14:31 fire00 aka1: NetScreen device_id=aka1 [Root]system-notification-00257(traffic): policy_id=120 service=udp/port:17210 proto=17 src zone=Trust dst zone=DMZ action=Deny sent=0 rcvd=0 src=192.168.2.2 dst=1.2.3.4 src_port=53 dst_port=17210',
          ],
        },
        {
          heading: 'Alert messages:',
          lines: [
            'Dec 1 14:03:19 [xx] ns5gt: NetScreen device_id=ns5gt [Root]system-alert-00016: invoice.exe From 81.161.63.253, proto TCP (zone Untrust, int untrust). Occurred 1 times.',
          ],
        },
        {
          heading: 'Critical messages:',
          lines: [
            'Dec 1 11:24:16 fire00 sav00: NetScreen device_id=sav00 [Root]system-critical-00436: Large ICMP packet! From 1.2.3.4 to 2.3.4.5, proto 1 (zone Untrust, int ethernet1/2). Occurred 1 times.',
            '[00001] 2005-05-16 12:55:10 [Root]system-critical-00042: Replay packet detected on IPSec tunnel on ethernet3 with tunnel ID 0x1c! From z.y.x.w to a.b.c.d/336, ESP, SPI 0xf63af637, SEQ 0xe337.',
            '[00001] 2006-05-25 13:34:33 [Root]system-alert-00008: IP spoofing! From 10.1.1.238:80 to a.b.c.d:49807, proto TCP (zone Untrust, int ethernet3). Occurred 1 times.',
          ],
        },
      ],
    },
    {
      id: 'fim',
      icon: 'fim',
      label: 'File integrity monitoring report',
      type: 'fim',
      intro: 'Shows files, folders, shares, and permissions that were created, deleted, or modified.',
      columns: ['Action', 'Object type', 'What', 'Who', 'When'],
      rows: [
        ['Added\nWhere: Host1\nWorkstation: 172.30.0.152', 'File', '\\\\host1\\users\\user1\\Downloads\\payroll.xlsx', 'Domainusers\\user1', '11/30/19 12:05:34'],
        ['Removed\nWhere: Host1\nWorkstation: 172.30.0.152', 'File', '\\\\host1\\users\\user1\\Downloads\\payroll.xlsx\nDate created: 11/30/19 12:05:34', 'Domainusers\\user1', '11/30/19 12:25:13'],
        ['Added\nWhere: Host1\nWorkstation: 172.30.0.152', 'File', '\\\\host1\\users\\user1\\Downloads\\resume1.docx', 'Domainusers\\user1', '12/1/19 13:59:25'],
        ['Added\nWhere: Host1\nWorkstation: 172.30.0.152', 'File', '\\\\host1\\users\\user1\\Downloads\\invoice.exe', 'Domainusers\\user1', '12/1/19 14:03:55'],
        ['Renamed\nWhere: Host1\nWorkstation: 172.30.0.152', 'File', 'resume1.docx to resume2.docx', 'Domainusers\\user1', '12/1/19 14:25:30'],
      ],
    },
    {
      id: 'domains',
      icon: 'domains',
      label: 'Malware domain list',
      type: 'domains',
      header: ['Malware domain list: IP host list', 'Last updated: 3 Dec 2019, 21:00:00'],
      ips: [
        '171.25.193.20', '171.25.193.25', '185.220.101.194', '81.161.63.103', '81.161.63.253', '77.247.181.162',
        '141.98.81.194', '46.101.220.225', '139.59.95.60', '51.254.37.192', '81.161.63.104', '139.59.116.115',
      ],
    },
    {
      id: 'vuln',
      icon: 'vuln',
      label: 'Vulnerability scan report',
      type: 'vuln',
      sections: [
        {
          severity: 'HIGH SEVERITY',
          color: '#d11a1a',
          title: 'Cleartext transmission of sensitive information',
          description: 'The software transmits sensitive or security-critical data in cleartext in a communication channel that can be sniffed.',
          asset: '172.30.0.150',
          risk: 'Anyone can read the information by gaining access to the channel being used for communication.',
          reference: 'CVE-2002-1949',
        },
        {
          severity: 'HIGH SEVERITY',
          color: '#d11a1a',
          title: 'Elevated privileges not required for software installations',
          description: 'All account types can install software. Requirements for privileged accounts to install software are not configured.',
          asset: '172.30.0.152',
          risk: 'Enhanced risk for unauthorized or malicious software installation.',
          reference: 'n/a',
        },
        {
          severity: 'MEDIUM SEVERITY',
          color: '#e08a2c',
          title: 'Sensitive cookie in HTTPS session without "secure" attribute',
          description: 'The secure attribute is not set on sensitive cookies in HTTPS sessions, which could cause the user agent to send them in plaintext over an HTTP session.',
          asset: '172.30.0.157',
          risk: 'Session sidejacking',
          reference: 'CVE-2004-0462',
        },
        {
          severity: 'LOW SEVERITY',
          color: '#1f6fbf',
          title: 'Untrusted SSL/TLS server X.509 certificate',
          description: "The server's TLS/SSL certificate is signed by a certificate authority that is untrusted or unknown.",
          asset: '172.30.0.153',
          risk: 'May allow on-path attackers to insert a spoofed certificate for any distinguished name (DN).',
          reference: 'CVE-2005-1234',
        },
      ],
    },
    {
      id: 'email',
      icon: 'email',
      label: 'Phishing email',
      type: 'email',
      headers: [
        ['From', 'IT HelpDesk <it-helpdesk@company.com>'],
        ['Sent', 'Sun 12/01/2019 2:00:00'],
        ['To', 'Global Users <globalusers@company.com>'],
        ['Subject', 'Moving our mail servers'],
      ],
      body: [
        'Hi,',
        'In the upcoming days, we will be moving our mail servers. Check out the new Company Webmail to know if it has started working for you.',
        { text: 'Visit the new Company Webmail to see all the new features. Use your current username and password at ', link: 'Company Webmail', after: '.' },
        { text: 'Download the latest mail client located ', link: 'here', after: '.' },
        'Thank you.',
        'IT HelpDesk',
      ],
    },
  ],

  // Part 2 answer grid
  killChain: {
    title: 'Kill chain item',
    points: 5,
    controls: CONTROLS,
    rows: [
      {
        id: 'k-phish',
        label: 'Phishing email',
        correct: 'Email filtering',
        why: 'Filtering scans incoming mail for sender reputation, headers and known malicious patterns, so the phishing email is blocked before it reaches user inboxes.',
      },
      {
        id: 'k-links',
        label: 'Active links',
        correct: 'Restricted local user permissions',
        why: 'The email sends users to a fake webmail page and asks them to enter their current username and password. If the link tricks someone into giving up credentials, MFA stops the attacker from using them on their own, which protects the account against credential harvesting.',
      },
      {
        id: 'k-site',
        label: 'Malicious website access',
        correct: 'MFA',
        why: 'A maintained blocklist of known malicious IP addresses stops workstations from connecting to attacker infrastructure such as 81.161.63.253, which appears on the malware domain list.',
      },
      {
        id: 'k-download',
        label: 'Malware download',
        correct: 'Updated antivirus',
        why: 'Blocking high-risk executable types (.exe, .scr, .bat) at the perimeter firewall prevents users from retrieving executable payloads such as invoice.exe.',
      },
      {
        id: 'k-install',
        label: 'Malware install',
        correct: 'IP blocklist',
        why: 'The vulnerability scan shows all account types can install software on 172.30.0.152. Least privilege keeps standard users from installing software without administrative rights.',
      },
      {
        id: 'k-exec',
        label: 'Malware execution',
        correct: 'Backups',
        why: 'Endpoint protection with current signatures scans files when they run and blocks known malicious binaries from executing.',
      },
      {
        id: 'k-encrypt',
        label: 'File encryption',
        correct: 'Firewall file type filter',
        why: 'If ransomware locks local files, clean, isolated backups are the main way to restore data without paying a ransom.',
      },
    ],
  },

  // Part 1 answer grid
  identify: {
    title: 'Identify the following:',
    points: 5,
    rows: [
      {
        id: 'i-exe',
        label: 'Malicious executable',
        options: ['invoice.exe', 'resume1.docx', 'resume2.docx', 'payroll.xlsx'],
        correct: 'invoice.exe',
        why: 'The firewall alert names invoice.exe, and the file integrity report shows it being added to the user’s Downloads folder.',
      },
      {
        id: 'i-ip',
        label: 'Malicious IP address',
        options: ['81.161.63.103', '81.161.63.253', '171.25.193.20', '185.220.101.194', '192.168.2.1', '171.25.193.25', '10.1.1.238'],
        correct: '81.161.63.253',
        why: 'The firewall alert ties invoice.exe to 81.161.63.253, and that address is also on the malware domain list. 81.161.63.103 is a near miss that is on the list but not in the alert.',
      },
      {
        id: 'i-time',
        label: 'Date/time malware entered organization',
        options: [
          '1 Dec 2019 11:24:16',
          '1 Dec 2019 14:03:19',
          '1 Dec 2019 14:03:55',
          '30 Nov 2019 12:05:34',
          '1 Dec 2019 14:25:30',
          '1 Dec 2019 13:59:25',
          '30 Nov 2019 12:25:13',
        ],
        correct: '1 Dec 2019 14:03:19',
        why: 'The firewall alert logged the download from the malicious IP at 14:03:19. The file integrity report shows the file written to disk at 14:03:55, which is when it was saved, not when it entered the network.',
      },
    ],
  },

  review: {
    tips: [
      'Match timestamps across logs: the firewall alert ties invoice.exe to 81.161.63.253 at 14:03:19. Do not pick unrelated entries such as payroll.xlsx just because they appear in a report.',
      'The vulnerability scan often holds the hint for a stage. "All account types can install software" points to Restricted local user permissions for Malware install.',
      'If a link leads to credential theft on a fake webmail page, think MFA. If it leads straight to a payload download, think plain text email format or URL/IP filtering.',
      'Each control can be used only once, so map the unambiguous pairs first (File encryption to Backups, Malware install to Restricted local user permissions) to narrow the rest.',
    ],
  },
};