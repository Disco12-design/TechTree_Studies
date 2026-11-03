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
          ["prod.comptia.org", "External", "104.17.18.29\n104.17.18.30\n192.168.60.0/24\n192.168.61.0/24", "comptia.org", "Yes", "Yes", "Yes", "No"],
          ["uat.comptia.org", "Internal", "192.168.76.0/24\n192.168.75.0/24", "comptia.org", "No", "No", "Yes", "Yes"],
          ["dev.comptia.org", "Internal", "192.168.50.0/24\n192.168.51.0/24", "comptia.org", "No", "Yes", "Yes", "Yes"],
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
            title: "Microsoft IIS: Unsupported version detected",
            description: "The software version version detected is  no longer supported.",
            asset: "192.168.76.5",
            risk: "Unpatched software",
            reference: "CVE-2022-0155, CVSS 9.2",
          },
          {
            title: "Sensitive cookie in HTTPS session without Secure attribute",
            description: "The Secure attribute for sensitive cookies in HTTPS sessions is not set, which could cause the user agent to send those cookies in plaintext over an HTTP connection.",
            asset: "192.168.76.6",
            risk: "Session sidejacking",
            reference: "CVE-2021-0462, CVSS 7.4",
          },
          {
            title: "Microsoft IIS: Unsupported software version detected",
            description: "The software version detected is no longer supported.",
            asset: "192.168.76.5",
            risk: "Unpatched software",
            reference: "CVE-2022-0155, CVSS 9.2",
          },
          {
            title: "Sensitive cookie in HTTPS session without Secure attribute",
            description: "The Secure attribute for sensitive cookies in HTTPS sessions is not set, which could cause the user agent to send those cookies in plaintext over an HTTP connection.",
            asset: "192.168.76.6",
            risk: "Session sidejacking",
            reference: "CVE-2021-0462, CVSS 7.4",
          },
          // {
          //   title: "Database accepts default administrator credentials",
          //   description: "The database service accepts the vendor default administrator account and password.",
          //   asset: "192.168.76.5",
          //   risk: "Unauthorized access",
          //   reference: "VULN-4105, CVSS 8.8",
          // },
          // {
          //   title: "Outdated JavaScript library on admin page",
          //   description: "The admin page loads a JavaScript library with a known low-impact flaw.",
          //   asset: "192.168.60.5",
          //   risk: "Client-side flaw",
          //   reference: "VULN-4106, CVSS 4.3",
          // },
          // {
          //   title: "Missing HTTP security headers",
          //   description: "The response lacks several recommended security headers.",
          //   asset: "192.168.76.6",
          //   risk: "Reduced browser protection",
          //   reference: "VULN-4107, CVSS 3.1",
          // },
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
