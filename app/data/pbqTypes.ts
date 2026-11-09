// Shared types for the PBQ data files.

// ---------------------------------------------------------------------------
// Common
// ---------------------------------------------------------------------------
export interface BasePbq {
  id: string;
  title: string;
  estimatedMinutes: number;
  modules: string[];
  difficulty?: string;
  objective?: string;
}

// Props shared by every simulation component.
export interface SimProps<T> {
  pbq: T;
  onScore?: (id: string, score: number, maxPoints: number) => void;
  onSubmit?: (result: Record<string, unknown>) => void;
}

export interface ScanFinding {
  title: string;
  description: string;
  asset: string;
  risk: string;
  reference: string;
}

export interface LogicBlock {
  heading: string;
  points: string[];
}

// ---------------------------------------------------------------------------
// PBQ 1 (pbq.tsx): vulnerability remediation priorities
// ---------------------------------------------------------------------------
export interface StandardsRow {
  level: string;
  days: number;
  applies: boolean[];
}

export interface StandardsTab {
  id: string;
  title: string;
  type: 'standards';
  scenario: string;
  instructions: string;
  rows: StandardsRow[];
  note: string[];
}

export interface TableTab {
  id: string;
  title: string;
  type: 'table';
  scenario: string;
  instructions: string;
  columns: string[];
  rows: string[][];
}

export interface FindingsTab {
  id: string;
  title: string;
  type: 'findings';
  scenario: string;
  instructions: string;
  items: ScanFinding[];
}

export type Pbq01Tab = StandardsTab | TableTab | FindingsTab;

export interface SelectQuestion {
  id: string;
  type: 'select';
  points: number;
  label: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface Pbq01 extends BasePbq {
  scenario: string;
  instructions: string;
  tabs: Pbq01Tab[];
  questions: SelectQuestion[];
  review: {
    columns: string[];
    rows: string[][];
    servers: string;
    technique: string;
  };
}

// ---------------------------------------------------------------------------
// PBQ 2 (pbq_02.tsx): validate and remediate scan findings
// ---------------------------------------------------------------------------
export interface ScanReportSection {
  severity: string;
  color: string;
  items: ScanFinding[];
}

export interface ScanReportTab {
  id: string;
  title: string;
  type: 'scanReport';
  heading: string;
  sections: ScanReportSection[];
}

export interface MatrixTab {
  id: string;
  title: string;
  type: 'matrix';
  heading: string;
  text: string;
}

export interface MatrixRow {
  id: string;
  system: string;
  correct: { validate: string; remediation: string };
}

export interface Pbq02Steps extends BasePbq {
  kind: 'steps';
  scenario: string[];
  instructions: string[];
  tabs: (ScanReportTab | MatrixTab)[];
  matrix: {
    points: { validate: number; remediation: number };
    validateOptions: string[];
    remediationOptions: string[];
    rows: MatrixRow[];
  };
  review: {
    intro: string;
    servers: {
      system: string;
      finding: string;
      meaning: string;
      answer: string;
      why: string;
    }[];
    tips: string[];
  };
}

// ---------------------------------------------------------------------------
// PBQ 3 (pbq_03.tsx): scan types, false positives, server identification
// ---------------------------------------------------------------------------
export type ScanType = 'Credentialed' | 'Non-Credentialed' | 'Compliance';

export interface ListingFinding {
  id: string;
  text: string;
}

export interface Listing {
  id: string;
  title: string;
  findings: ListingFinding[];
  correct: { scan: ScanType; falsePositives: string[]; server: string };
}

export interface PbqListings extends BasePbq {
  kind: 'listings';
  scenario: string[];
  instructions: string[];
  tabs: { id: string; title: string; type: string; scenario?: string[]; instructions?: string[] }[];
  servers: { id: string; label: string }[];
  scanOptions: ScanType[];
  points: { scan: number; falsePositive: number; server: number };
  listings: Listing[];
  review: {
    listings: { title: string; answer: string; why: string[] }[];
    logic: LogicBlock[];
  };
}

// ---------------------------------------------------------------------------
// PBQ 4 (pbq_04.tsx): system hardening
// ---------------------------------------------------------------------------
export interface HardeningDevice {
  id: string;
  name: string;
  zone: string;
  correct: { role: string; ip: string; service: string };
}

export interface PbqHardening extends BasePbq {
  kind: 'hardening';
  scenario: string[];
  instructions?: string[];
  tabs: { id: string; title: string; type: string; scenario?: string[]; instructions?: string[] }[];
  devices: HardeningDevice[];
  roleOptions: string[];
  serviceOptions: string[];
  points: { role: number; service: number };
  review: {
    devices: { id: string; answer: string; why: string[] }[];
    logic: LogicBlock[];
  };
}

// ---------------------------------------------------------------------------
// PBQ 5 (pbq_05.tsx): phishing incident / kill chain
// ---------------------------------------------------------------------------
export interface LogArtifact {
  id: string;
  icon: string;
  label: string;
  type: 'log';
  sections: { heading: string; lines: string[] }[];
}

export interface FimArtifact {
  id: string;
  icon: string;
  label: string;
  type: 'fim';
  intro: string;
  columns: string[];
  rows: string[][];
}

export interface DomainsArtifact {
  id: string;
  icon: string;
  label: string;
  type: 'domains';
  header: string[];
  ips: string[];
}

export interface VulnArtifactSection {
  severity: string;
  color: string;
  title: string;
  description: string;
  asset: string;
  risk: string;
  reference: string;
}

export interface VulnArtifact {
  id: string;
  icon: string;
  label: string;
  type: 'vuln';
  sections: VulnArtifactSection[];
}

export interface EmailLinkParagraph {
  text: string;
  link: string;
  after: string;
}

export interface EmailArtifact {
  id: string;
  icon: string;
  label: string;
  type: 'email';
  headers: [string, string][];
  body: (string | EmailLinkParagraph)[];
}

export type Artifact =
  | LogArtifact
  | FimArtifact
  | DomainsArtifact
  | VulnArtifact
  | EmailArtifact;

export interface PbqArtifacts extends BasePbq {
  kind: 'artifacts';
  scenario: string[];
  instructions: string[];
  artifacts: Artifact[];
  killChain: {
    title: string;
    points: number;
    controls: string[];
    rows: { id: string; label: string; correct: string; alsoAccept?: string[]; why: string }[];
  };
  identify: {
    title: string;
    points: number;
    rows: {
      id: string;
      label: string;
      options: string[];
      correct: string;
      why: string;
    }[];
  };
  review: { tips: string[] };
}

// ---------------------------------------------------------------------------
// PBQ 6 (pbq_06.tsx): healthcare action plan
// ---------------------------------------------------------------------------
export interface PbqActionPlan extends BasePbq {
  kind: 'actionPlan';
  scenario: string[];
  instructions: string[];
  actionPlan: {
    title: string;
    points: number;
    controls: string[];
    rows: { id: string; finding: string; correct: string; why: string }[];
    unused: { control: string; note: string }[];
  };
  review: { tips: string[] };
}

// ---------------------------------------------------------------------------
// PBQ 7 (pbq_07.tsx): healthcare risk categorization
// ---------------------------------------------------------------------------
export type RiskCategory = 'Low (0-4)' | 'Medium (5-9)' | 'High (10-25)';

export interface RawRiskFinding {
  id: string;
  finding: string;
  description: string;
  likelihood: number;
  severity: number;
  required: string[];
  optional: string[];
  why: string;
}

export interface RiskFinding extends RawRiskFinding {
  score: number;
  correctCategory: RiskCategory;
  correctPriority: number;
}

export interface PbqRiskPlan extends BasePbq {
  kind: 'riskPlan';
  scenario: string[];
  instructions: string[];
  points: { priority: number; category: number; controls: number };
  priorities: number[];
  categories: RiskCategory[];
  controls: string[];
  findings: RiskFinding[];
  documents: { id: string; label: string; type: string }[];
  sla: { category: RiskCategory; timeframe: string; expectation: string }[];
  review: { tips: string[] };
}

// ---------------------------------------------------------------------------
// PBQ 8 (pbq_08.tsx): website defacement log analysis
// ---------------------------------------------------------------------------
export interface LogTab {
  id: string;
  label: string;
  type: 'log';
  lines: string[];
}

export interface NetstatData {
  command: string;
  columns: string[];
  rows: string[][];
}

export interface NetstatTab {
  id: string;
  label: string;
  type: 'netstat';
  netstat: NetstatData;
}

export interface SingleChoiceQuestion {
  prompt: string;
  options: string[];
  correct: string;
  why: string;
  required?: number;
}

export interface MultiChoiceQuestion {
  prompt: string;
  options: string[];
  required: number;
  correct: string[];
  why: string;
}

export interface PbqLogAnalysis extends BasePbq {
  kind: 'logAnalysis';
  scenario: string[];
  instructions: string[];
  points: { ip: number; indicator: number; actions: number };
  tabs: (LogTab | NetstatTab)[];
  questions: {
    ip: SingleChoiceQuestion;
    indicator: SingleChoiceQuestion;
    actions: MultiChoiceQuestion;
  };
  distractors: {
    ip: Record<string, string>;
    indicator: Record<string, string>;
    actions: Record<string, string>;
  };
  review: { tips: string[] };
}

// ---------------------------------------------------------------------------
// PBQ 9 (pbq_09.tsx): vulnerability remediation timeframes
// ---------------------------------------------------------------------------
export interface SlaRow {
  level: string;
  days: number;
  applies: Record<string, boolean>;
}

export interface Sla {
  columns: string[];
  environments: string[];
  rows: SlaRow[];
  standard: (days: number) => string;
  headline: string;
  notes: string[];
}

export interface Environment {
  columns: string[];
  rows: (string | string[])[][];
}

export interface SlaTab {
  id: string;
  label: string;
  type: 'sla';
  sla: Sla;
}

export interface EnvironmentTab {
  id: string;
  label: string;
  type: 'environment';
  environment: Environment;
}

export interface FindingsListTab {
  id: string;
  label: string;
  type: 'findings';
  findings: ScanFinding[];
}

export interface PbqRemediation extends BasePbq {
  kind: 'remediation';
  scenario: string[];
  instructions: string[];
  points: { server: number; technique: number };
  tabs: (SlaTab | EnvironmentTab | FindingsListTab)[];
  questions: {
    server: SingleChoiceQuestion & { required: number };
    technique: SingleChoiceQuestion;
  };
  distractors: {
    server: Record<string, string>;
    technique: Record<string, string>;
  };
  review: { tips: string[] };
}

// ---------------------------------------------------------------------------
// PBQ 10 (pbq_10.tsx): DDoS host investigation
// ---------------------------------------------------------------------------
export interface DiagramDomain {
  id: string;
  name: string;
  network: string;
  hostIds: string[];
}

export interface Diagram {
  domains: DiagramDomain[];
  internet: { label: string };
  target: { label: string; ip: string };
  gatewayHostId: string;
}

export interface HostOutput {
  id: string;
  label: string;
  title: string;
  type: string; // 'netstat' | 'proxyLog'
  columns: string[];
  rows: string[][];
}

export interface Host {
  id: string;
  label: string;
  ip: string;
  icon: string;
  outputs: HostOutput[];
}

export interface PbqInvestigation extends BasePbq {
  kind: 'investigation';
  scenario: string[];
  instructions: string[];
  points: { host: number; executable: number; remediation: number };
  diagram: Diagram;
  hosts: Host[];
  questions: {
    host: SingleChoiceQuestion;
    executable: SingleChoiceQuestion;
    remediation: SingleChoiceQuestion;
  };
  distractors: {
    host: Record<string, string>;
    executable: Record<string, string>;
    remediation: Record<string, string>;
  };
  review: { tips: string[] };
}
