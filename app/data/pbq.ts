const SCENARIO = "A systems administrator is reviewing the output of a vulnerability scan.";
const INSTRUCTIONS =
  "Review the information in each tab. Based on the organization's environment architecture and remediation standards, select the server to be patched within 14 calendar days and select the appropriate technique and mitigation.";

export const pbqs = [
  {
    id: "pbq-01",
    title: "1.) Vulnerability Remediation Priorities",
    estimatedMinutes: 12,
    modules: ["domain-2-3", "domain-2-4"],
    scenario: SCENARIO,
    instructions: INSTRUCTIONS,
    tabs: [
      {
        id: "standards",
        title: "Vulnerability remediation timeframes",
        type: "standards",
        scenario: SCENARIO,
        instructions: INSTRUCTIONS,
        rows: [
          { level: "CVSS > 9.0   ", days: 7, applies: [true, true, false] },
          { level: "CVSS > 7.9 < 9.0", days: 14, applies: [true, false, false] },
          { level: "CVSS > 5.0 < 7.0", days: 30, applies: [true, false, false] },
          { level: "CVSS > 0 < 5.0", days: 60, applies: [true, false, false] },
        ],
        note: [
          "Any of these timeframes may be accelerated at the discretion of the Chief Information Security Officer (CISO).",
          "If patching cannot be completed or the vendor has not released a patch within the timeframe in the table, compensating controls must be put in place within the same timeframe and the exception process must be followed.",
        ],
      },
      {
        id: "env",
        title: "Environment",
        type: "table",
        scenario: "A systems administrator is reviewing the output of a vulnerability scan.",
        instructions:
          "Review the information in each tab. Based on the organization's environment architecture and remediation standards, select the server to be patched within 14 days and select the appropriate technique and mitigation.",
        columns: [
          "Environment name",
          "Environment location",
          "Subnets",
          "Domain",
          "Publicly accessible",
          "NGFW",
          "Load balancer",
          "MFA required",
        ],
        rows: [
          ["prod.northwind.example", "External", "10.20.0.0/24\n10.20.1.0/24", "northwind.example", "Yes", "Yes", "Yes", "No"],
          ["uat.northwind.example", "Internal", "10.30.0.0/24\n10.30.1.0/24", "northwind.example", "No", "Yes", "Yes", "Yes"],
          ["dev.northwind.example", "Internal", "10.40.0.0/24", "northwind.example", "No", "No", "No", "Yes"],
        ],
      },
      {
        id: "output",
        title: "Output",
        type: "findings",
        scenario: "A systems administrator is reviewing the output of a vulnerability scan.",
        instructions:
          "Review the information in each tab. Based on the organization's environment architecture and remediation standards, select the server to be patched within 14 days and select the appropriate technique and mitigation.",
        items: [
          {
            title: "Web server software version is no longer supported",
            description: "The web server version detected is end of life and no longer receives security updates.",
            asset: "192.168.76.6",
            risk: "Unpatched software",
            reference: "VULN-4101, CVSS 9.4",
          },
          {
            title: "Sensitive cookie in HTTPS session without Secure attribute",
            description: "The Secure attribute is not set on the session cookie, so the browser may send it in plaintext over an HTTP connection.",
            asset: "192.168.50.6",
            risk: "Session sidejacking",
            reference: "VULN-4102, CVSS 7.4",
          },
          {
            title: "Untrusted TLS server certificate",
            description: "The server certificate is signed by a certificate authority that is untrusted or unknown.",
            asset: "192.168.50.6",
            risk: "Man-in-the-middle",
            reference: "VULN-4103, CVSS 5.9",
          },
          {
            title: "SSH server supports weak key exchange algorithms",
            description: "The SSH service offers key exchange algorithms that are considered weak.",
            asset: "192.168.60.6",
            risk: "Weakened encryption",
            reference: "VULN-4104, CVSS 7.1",
          },
          {
            title: "Database accepts default administrator credentials",
            description: "The database service accepts the vendor default administrator account and password.",
            asset: "192.168.76.5",
            risk: "Unauthorized access",
            reference: "VULN-4105, CVSS 8.8",
          },
          {
            title: "Outdated JavaScript library on admin page",
            description: "The admin page loads a JavaScript library with a known low-impact flaw.",
            asset: "192.168.60.5",
            risk: "Client-side flaw",
            reference: "VULN-4106, CVSS 4.3",
          },
          {
            title: "Missing HTTP security headers",
            description: "The response lacks several recommended security headers.",
            asset: "192.168.76.6",
            risk: "Reduced browser protection",
            reference: "VULN-4107, CVSS 3.1",
          },
        ],
      },
    ],
    questions: [
      {
        id: "servers",
        type: "select",
        points: 10,
        label: "Select the server to be patched within 14 calendar days:",
        options: ["192.168.50.6", "192.168.76.6", "192.168.50.5", "192.168.60.5", "192.168.76.5", "192.168.60.6"],
        correctAnswer: "192.168.76.5",
        explanation:
          "The expected server for this simulation is 192.168.76.5.",
      },
      {
        id: "technique",
        type: "select",
        points: 10,
        label: "Select the appropriate technique and mitigation:",
        options: [
          "Request exception; legacy protocol could have operational impact",
          "Patch; upload signed certificate from trusted third-party provider",
          "Patch; issue a CRL for the server to the CA",
          "Patch; upgrade IIS to the current release",
          "Request exception; organization needs more time to procure a PKI",
          "Compensating control; create new firewall ACL to block port 443",
          "Compensating control; implement secure session token",
          "Compensating control; implement MFA on the application",
          "Patch; set the Secure and HttpOnly attributes on the session cookie",
        ],
        correctAnswer: "Patch; upgrade IIS to the current release",
        explanation:
          "Upgrade IIS to a current supported release to remediate the finding on the selected server.",
      },
    ],
  },
];
