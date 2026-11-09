import type { PbqRiskPlan, RiskCategory, RawRiskFinding, RiskFinding } from './pbqTypes';

// PBQ 11: Healthcare risk categorization, prioritization and controls.
// `kind: 'riskPlan'` tells your parent to render this with <PbqRiskSim />.
//
// The answer key (priority + category) comes from the reference screenshot (EXPECTED below).
// Likelihood and severity are set so that likelihood x severity reproduces that answer key:
//   Low (0-4), Medium (5-9), High (10-25)
//   Priority 1 = lowest rating score ... 8 = highest rating score.

const CATEGORIES: RiskCategory[] = ["Low (0-4)", "Medium (5-9)", "High (10-25)"];
const categoryFor = (score: number): RiskCategory =>
  score <= 4 ? CATEGORIES[0] : score <= 9 ? CATEGORIES[1] : CATEGORIES[2];

const CONTROLS = [
  "Require two-factor authentication",
  "Acceptance",
  "Implement web content filter",
  "Require data deidentification",
  "Implement DLP",
  "Filter echo request replies",
  "Implement email encryption",
  "Implement FDE on DB and file servers",
  "Implement mail filters",
  "Implement IAM program",
  "Implement IDS/IPS",
  "Implement file integrity monitoring",
  "Implement approved software listing",
  "Implement MDM solution",
  "Implement PIN to print",
  "Relocate devices to secured locations",
  "Implement SPF",
];

const EXPECTED: Record<string, { priority: number; category: RiskCategory }> = {
  f8: { priority: 1, category: "Low (0-4)" },
  f7: { priority: 2, category: "Low (0-4)" },
  f3: { priority: 3, category: "Medium (5-9)" },
  f2: { priority: 4, category: "Medium (5-9)" },
  f1: { priority: 5, category: "Medium (5-9)" },
  f6: { priority: 6, category: "High (10-25)" },
  f5: { priority: 7, category: "High (10-25)" },
  f4: { priority: 8, category: "High (10-25)" },
};

// Listed in the order shown on the tabs
const RAW: RawRiskFinding[] = [
  {
    id: "f1",
    finding:
      "Improperly configured third-party websites pose security risks to internal assets.",
    description:
      "During sampling, ten successful connections to websites with expired or invalid security certificates were found. Sites found during the assessment include www.cnn.com, www.localbank.com and www.shopping.com.",
    likelihood: 2,
    severity: 4,
    required: ["Implement web content filter"],
    optional: [],
    why: "Internal users are reaching external sites with bad certificates. A web content filter can block or warn on those connections.",
  },
  {
    id: "f2",
    finding:
      "A large volume of ICMP traffic is detected from an external source to Server2.",
    description:
      "Review of logs shows a large volume of ICMP traffic has been consistently directed at Server2 for an extended period.",
    likelihood: 2,
    severity: 3, // 6 -> Medium
    required: ["Filter echo request replies"],
    optional: ["Implement IDS/IPS"],
    why: "Filtering or rate-limiting echo requests and replies stops ping floods and outside mapping of the server. IDS/IPS can also help detect it.",
  },
  {
    id: "f3",
    finding:
      "A large number of potentially malicious emails is reaching end-user and shared mailboxes.",
    description:
      "A heavy volume of phishing and spam messages is reaching end-user and shared mailboxes, increasing the risk of malicious attachments being opened or links being clicked.",
    likelihood: 5,
    severity: 1, // 5 -> Medium
    required: ["Implement mail filters"],
    optional: ["Implement SPF"],
    why: "Mail filters screen out phishing and spam before delivery. SPF lets receivers reject spoofed senders, which reduces the same flood.",
  },
  {
    id: "f4",
    finding:
      "A list of patient prescription information was emailed to the incorrect recipient.",
    description:
      "A list containing the PHI of 15 patients, including prescription information, was emailed to the incorrect recipient outside the organization. A BPA was in place, and notification to the patients was deemed unnecessary.",
    likelihood: 4,
    severity: 5, // 20 -> High
    required: ["Implement DLP"],
    optional: ["Implement email encryption"],
    why: "DLP detects and blocks PHI leaving in outbound mail. Email encryption would also keep a wrong recipient from reading the content.",
  },
  {
    id: "f5",
    finding:
      "The internet-facing web server allows access to data without requiring credentials.",
    description:
      "Data on the server was found to be accessible from the internet without requiring login credentials. The marketing material stored on this server is required to be publicly available.",
    likelihood: 5,
    severity: 3, // 15 -> High
    required: ["Acceptance"],
    optional: [],
    why: "The content is meant to be public, so the impact is minimal. Accepting the risk is appropriate, and adding authentication would defeat the purpose.",
  },
  {
    id: "f6",
    finding: "PHI data was found within the development and test environments.",
    description:
      "Controls are not in place to prevent sensitive production data from being used in the test/dev environment, leading to the potential for unauthorized access to and exfiltration of sensitive data.",
    likelihood: 4,
    severity: 3, // 12 -> High
    required: ["Require data deidentification"],
    optional: [],
    why: "PHI should be masked, tokenized or anonymized before it is copied into non-production environments.",
  },
  {
    id: "f7",
    finding:
      "Sensitive materials were found on a fax machine in a common area.",
    description:
      "Documents containing patient information were found unattended on a printer/fax machine in a common area and were potentially accessible to patients and other non-staff.",
    likelihood: 3,
    severity: 1, // 3 -> Low
    required: ["Implement PIN to print"],
    optional: ["Relocate devices to secured locations"],
    why: "A PIN or badge requirement releases documents only when the owner is at the device. Moving the device to a secured location also helps.",
  },
  {
    id: "f8",
    finding: "Unauthorized software was discovered on technician workstations.",
    description:
      "Unauthorized software was found on a station used by technicians in patient-facing roles. Software found: Weather Toolbar, Shopping Helper and Newsfeed Live.",
    likelihood: 2,
    severity: 1, // 2 -> Low
    required: ["Implement approved software listing"],
    optional: ["Implement file integrity monitoring"],
    why: "An approved software list prevents unapproved programs from being installed or run. File integrity monitoring can also flag unexpected installs.",
  },
];

// Row order exactly as shown in the screenshot, top to bottom.
// Resulting priorities down the rows: 5, 4, 3, 8, 7, 6, 2, 1
const ROW_ORDER = ["f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8"];

// Answer key comes from EXPECTED; score is computed for display and sanity checking
const findings: RiskFinding[] = [...RAW]
  .sort((a, b) => ROW_ORDER.indexOf(a.id) - ROW_ORDER.indexOf(b.id))
  .map((f) => {
    const score = f.likelihood * f.severity;
    const expected = EXPECTED[f.id];

    // Dev-time check: the displayed scores must agree with the answer key
    if (
      categoryFor(score) !== expected.category &&
      typeof console !== "undefined"
    ) {
      console.warn(
        `[pbq11] ${f.id}: score ${score} maps to ${categoryFor(score)}, expected ${expected.category}`,
      );
    }

    return {
      ...f,
      score,
      correctCategory: expected.category,
      correctPriority: expected.priority,
    };
  });

export const pbq11: PbqRiskPlan = {
  id: "pbq-11",
  kind: "riskPlan",
  title: "7.) Healthcare Risk Categorization and Controls",
  difficulty: "Advanced",
  estimatedMinutes: 35,
  modules: ["domain-4-2"],

  scenario: [
    "A healthcare organization must develop an action plan based on the findings from a risk assessment.",
    "The action plan must consist of risk categorization, risk prioritization and implementation of controls.",
  ],
  instructions: [
    "Open the audit report, risk matrix and SLA expectations documents to review their contents.",
    "On the Risk categorization tab, rank the findings by risk rating score (1 is the lowest score, 8 is the highest) and assign a categorization to each risk.",
    "On the Controls tab, select the appropriate control(s) for each finding. A finding may have more than one control, some controls may be used more than once, and some may not be used at all.",
    "Use Reset All Answers to return to the starting state.",
  ],

  points: { priority: 2, category: 2, controls: 4 },
  priorities: [1, 2, 3, 4, 5, 6, 7, 8],
  categories: CATEGORIES,
  controls: CONTROLS,
  findings,

  documents: [
    { id: "audit", label: "Audit report", type: "audit" },
    { id: "matrix", label: "Risk matrix", type: "matrix" },
    { id: "sla", label: "SLA expectations", type: "sla" },
  ],

  sla: [
    {
      category: "High (10-25)",
      timeframe: "Within 7 days",
      expectation:
        "Remediate with controls, or escalate to leadership immediately if not possible.",
    },
    {
      category: "Medium (5-9)",
      timeframe: "Within 30 days",
      expectation:
        "Remediate on the normal change schedule and track to completion.",
    },
    {
      category: "Low (0-4)",
      timeframe: "Within 90 days",
      expectation:
        "Remediate when practical, or formally accept the risk with documented approval.",
    },
  ],

  review: {
    tips: [
      "Risk rating score = likelihood x severity. Work it out for every finding first, then rank and categorize from the numbers rather than from how scary the finding sounds.",
      "Read the description for context. The web server finding sounds serious, but the marketing material is required to be public, so severity is low and acceptance fits.",
      "Match each control to the specific weakness: ICMP flood to echo filtering, phishing to mail filters and SPF, PHI leaving by email to DLP, PHI in test to deidentification, unattended fax to PIN to print, unapproved software to an approved software list.",
    ],
  },
};
