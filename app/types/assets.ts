import { Home, BookOpen, BarChart3, FileText, CreditCard, User, TrendingUp, ArrowUp, CheckCircle, Trophy, Lock, Zap, Terminal, Shield, Network, Key, AlertTriangle, Settings, Users, Brain, Database, Search, Wrench, Crosshair, Workflow, Bot } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface NavLink {
  href: string;
  label: string;
  icon: LucideIcon;
}

export const navLinks: NavLink[] = [
  { href: '/dashboard', label: 'Dashboard', icon: Home },
  { href: '/practice-exam', label: 'Practice Exam', icon: BookOpen },
  { href: '/study-notes', label: 'Study Notes', icon: BarChart3 },
  { href: '/attempts', label: 'Attempts', icon: FileText },
  { href: '/pricing-billing', label: 'Pricing & Billing', icon: CreditCard },
];

export const images = { 
  logo: '/logo.png',
};

export const profile = {
  name: 'Sarah Jenkins',
  candidateId: '#1',
  icon: User,
};

export const metrics = {
  examsTaken: {
    value: 14,
    label: 'Exams Taken',
    icon: TrendingUp,
    change: '+3',
    changeLabel: 'completed this week',
  },
  averageScore: {
    value: 782,
    maxValue: 900,
    label: 'Average Score',
    icon: BarChart3,
    change: '+42 pts',
    changeLabel: 'vs initial diagnostic baseline',
  },
  bestScore: {
    value: 840,
    maxValue: 900,
    label: 'Best Score',
    icon: Trophy,
  },
  passRate: {
    value: '85.7%',
    label: 'Pass Rate',
    icon: CheckCircle,
    detail: '12 of 14 passed',
    cutScore: '750 cut score',
  },
  certification: {
    name: 'CompTIA Security+',
    accuracy: '93.3%',
    accuracyLabel: 'accuracy',
  },
};

export const examAttempts = [
  {
    id: 1,
    examName: 'CompTIA Security+',
    examNumber: 'SY0-701',
    date: 'May 19, 2025',
    time: '12:45 PM',
    score: 782,
    maxScore: 900,
    result: 'PASS',
    duration: '1 hr 15 min',
    status: 'pass',
  },
  {
    id: 2,
    examName: 'CompTIA Security+',
    examNumber: 'SY0-601',
    date: 'May 19, 2025',
    time: '9:30 AM',
    score: 791,
    maxScore: 900,
    result: 'FAIL',
    duration: '1 hr 45 min',
    status: 'fail',
  },
];

export interface PracticeExam {
  id: string;
  code: string;
  level: 'Foundational' | 'Associate' | 'Professional';
  title: string;
  description: string;
  access: 'Free' | 'Pro';
  items: number;
  timeCap: number;
  targetPass: number;
  maxScore: number;
  domains: string[];
  icon: LucideIcon;
  features: string[];
}

export const practiceExams: PracticeExam[] = [
  {
  id: 'sy0-701-core',
  code: 'SY0-701',
  level: 'Associate',
  title: 'CompTIA Security+ SY0-701 Practice Exam',
  description: 'Validate network hardening, host monitoring, zero-trust cryptographic implementations, and standard incident remediation.',
  access: 'Free',
  items: 50,
  timeCap: 90,
  targetPass: 750,
  maxScore: 900,
  domains: ['Threats & Attacks', 'Cryptography', 'Identity & Access', 'Risk Management'],
  icon: CheckCircle,
  features: ['verified', 'Simulated Pearson CBT'],
},
{
  id: 'sy0-701-threats',
  code: 'SY0-701',
  level: 'Associate',
  title: 'Security+ Threat Detection Assessment',
  description: 'Focus on malware analysis, social engineering attacks, cloud threats, and security monitoring practices.',
  access: 'Pro',
  items: 80,
  timeCap: 100,
  targetPass: 750,
  maxScore: 900,
  domains: ['Threat Intelligence', 'Attack Vectors', 'Monitoring', 'Incident Response'],
  icon: CheckCircle,
  features: ['adaptive questions', 'performance analytics'],
},
{
  id: 'sy0-701-crypto',
  code: 'SY0-701',
  level: 'Associate',
  title: 'Security+ Cryptography Challenge',
  description: 'Test encryption standards, PKI concepts, certificate management, and secure communications.',
  access: 'Pro',
  items: 65,
  timeCap: 85,
  targetPass: 750,
  maxScore: 900,
  domains: ['Cryptography', 'PKI', 'Certificates', 'Secure Protocols'],
  icon: CheckCircle,
  features: ['exam-ready', 'detailed explanations'],
},
{
  id: 'sy0-701-iam',
  code: 'SY0-701',
  level: 'Associate',
  title: 'Security+ Identity & Access Control Exam',
  description: 'Measure knowledge of authentication methods, authorization models, MFA, and privilege management.',
  access: 'Pro',
  items: 75,
  timeCap: 95,
  targetPass: 750,
  maxScore: 900,
  domains: ['Identity Management', 'Access Control', 'Federation', 'Authentication'],
  icon: CheckCircle,
  features: ['PBQs included', 'exam simulation'],
},

];

export interface PricingTier {
  id: string;
  tier: string;
  name: string;
  description: string;
  price: string;
  billing: string;
  currency?: string;
  badge?: string;
  passRate?: string;
  isPopular?: boolean;
  isCurrentPlan?: boolean;
  features: string[];
  buttonLabel: string;
  buttonAction: string;
}

export const pricingTiers: PricingTier[] = [
  {
    id: 'free',
    tier: 'Tier 01',
    name: 'Free Starter',
    description: 'Essential practice for candidates exploring IT certifications and basic syllabus coverage.',
    price: 'R0',
    billing: '/ forever',
    isCurrentPlan: true,
    features: [
      '1 Full-Length Practice Exam per track (Security+)',
      'Basic Pearson VUE Exam Simulator mode',
      'Overall score calculation (100–900 Pearson standard)',
      'Standard question answer explanations',
      'Community candidate forum & discussion access',
    ],
    buttonLabel: 'Current Plan',
    buttonAction: 'current',
  },
  {
    id: 'pro',
    tier: 'Tier 02',
    name: 'Pro Candidate',
    description: 'Complete CBT simulation suite with unlimited attempts, real timer, and targeted weak-domain training.',
    price: 'R299',
    billing: '/ month (billed annually)',
    badge: 'MOST POPULAR',
    passRate: '88.4% PASS RATE',
    isPopular: true,
    features: [
      'Unlimited access to all 12+ full-length practice exams',
      'Authentic Pearson VUE countdown clock & proctor mode',
      'Custom retake modes (Target incorrect & flagged stems only)',
      'Domain diagnostic scoring mapped to blueprint (750 pass line)',
      'Downloadable cheat sheets & PDF study guides',
      '100% First-Time Pass Guarantee with optional 6-mo extension',
    ],
    buttonLabel: 'Upgrade to Pro',
    buttonAction: 'upgrade',
  },
];

export interface NoteSection {
  heading: string;
  explain?: string;
  points: string[];
  remember?: string;
  examTip?: string;
}

export interface GlossaryItem {
  term: string;
  meaning: string;
}

export interface StudyNote {
  id: string;
  title: string;
  domain: string;
  domainName: string;
  module: string;
  moduleName: string;
  description: string;
  lastUpdated: string;
  access: 'Free' | 'Premium';
  icon: LucideIcon;
  estimatedTime: string;
  sections?: NoteSection[];
  quickReview?: string[];
  glossary?: GlossaryItem[];
}

export const studyNotes: StudyNote[] = [
  {
        id: 'domain-1-1',
    title: 'System & Network Architecture',
    domain: 'Domain 1.0',
    domainName: 'System & Network Architecture',
    module: '1.1',
    moduleName: 'System and Network Architecture',
    description: 'Logging, operating systems, Infrastructure Architecture, device management, zero trust, identity and access management, encryption, data protection and critical infrastructure.',
    lastUpdated: 'Oct 9, 2026',
    access: 'Free',
    icon: Network,
    estimatedTime: '3 hours',
    sections: [
      {
        heading: 'Logging Concepts',
        points: ['Ingestion: The process of collecting logs from devices, applications, and systems and sending them to a central location for monitoring and analysis.', 'Configuration: Setting up logging options such as what events to record, log levels, and where logs should be stored.', 'Integrity and Security: Ensuring logs cannot be altered, deleted, or accessed by unauthorized users.', 'Time Synchronization: Keeping all systems on the same accurate time source so log timestamps can be correlated correctly.', 'Retention: Defining how long logs are kept before they are archived or deleted to meet business and compliance requirements.'],
        remember: 'Think of logs like a security camera system: collect the footage (ingestion), choose what to record (configuration), lock the tapes away (integrity), stamp the right time (time sync), and keep the tapes long enough (retention).',
        examTip: 'Match the problem to the keyword. Events out of order or timelines will not line up = time synchronization (NTP). Logs deleted or changed by an attacker = integrity (send logs off-host). Needed for an audit or old investigation = retention.'
      },
      {
        heading: 'Operating System Concepts',
        points: ['System Hardening: Reducing security risks by disabling unnecessary services, applying patches, and securing configurations.', 'File Structure: The way files and directories are organized within an operating system.', 'Critical Files: Important system files required for the operating system or applications to function properly.', 'System Processes: Running programs and background services that perform tasks within the operating system.'],
        remember: 'Think of an OS as a house. Hardening = locking the doors and windows. File structure = the floor plan. Critical files = the safe. Processes = the people inside. You need to know who normally lives there to spot the intruder.',
        examTip: 'Spot the fake using three checks: wrong name (svch0st.exe), wrong location (a system process running from the Temp folder), or wrong parent (Word launching PowerShell). Any one of these = suspicious.'
      },
      {
        heading: 'Infrastructure/System Architecture Concepts',
        points: ['Cloud Native: Applications designed specifically to run efficiently in cloud environments using cloud services.', 'Virtualization: Technology that allows multiple virtual machines to run on a single physical computer.', 'Containerization: Packaging applications and their dependencies into lightweight containers for consistent deployment.', 'Application Programming Interfaces (APIs): Mechanisms that allow different software applications to communicate and exchange data.'],
        remember: 'VM = a separate house with its own foundation (own OS). Container = an apartment in a shared building (shared kernel). Cloud native = built for the cloud from day one. API = the waiter carrying requests between you and the kitchen.',
        examTip: 'Question asks about stronger isolation? Pick VMs. Lighter and faster but shares the kernel? Pick containers. Leaked API key or an API with no authentication? That is an API security problem, so look for answers with strong auth, rate limiting, and an API gateway.'
      },
      {
        heading: 'Device Management Concepts',
        points: ['Mobile: Managing and securing smartphones, tablets, and other portable devices used by an organization.', 'Endpoint: Any device connected to a network, such as laptops, desktops, servers, or mobile devices, that requires protection.'],
        remember: 'Phones = MDM (manage them: lock, encrypt, wipe). Computers = EDR (watch them: detect, isolate). Mobile gets MDM, endpoints get EDR.',
        examTip: 'Lost or stolen phone = remote wipe through MDM. Suspicious behavior on a laptop or server = use EDR to investigate and isolate the host.'
      },
      {
        heading: 'Network Architecture Concepts',
        points: ['Zero Trust Network Architecture (ZTNA): A security model that assumes no user or device is trusted by default and requires continuous verification.', 'Secure Access Service Edge (SASE): A cloud-based architecture that combines networking and security services into a single platform.', 'Hybrid Cloud: An environment that combines on-premises infrastructure with public and/or private cloud services.'],
        remember: 'Zero Trust = a guard checks your ID at every door, not just the front gate. SASE = networking and security delivered from the cloud as one package. Hybrid = part of your setup in your own building, part in the cloud.',
        examTip: 'Watch for keywords. "Never trust, always verify" or "microsegmentation" = Zero Trust. Remote workers or branch offices needing the same security everywhere = SASE. Mix of data center and cloud = Hybrid Cloud.'
      },
      {
        heading: 'Identity and Access Management (IAM)',
        points: ['Privileged Access Management (PAM): Controls and monitors accounts with elevated permissions to reduce the risk of misuse.', 'Authentication and Authorization Methods: Authentication verifies a user\'s identity, while authorization determines what resources they can access.', 'Secrets Management: Securely storing and controlling sensitive information such as passwords, API keys, and encryption keys.'],
        remember: 'AuthN = "Who are you?" (prove it). AuthZ = "What can you do?" (your permissions). PAM = a bodyguard for admin accounts. Secrets = kept in a vault, never written in code.',
        examTip: 'Password or API key found in a GitHub repo or script = secrets management (use a vault and rotate the key). Admin account being misused = PAM (just-in-time access, session recording). Logging in is authentication; what you can open afterward is authorization.'
      },
      {
        heading: 'Encryption Techniques',
        points: ['Encryption Techniques: Methods used to convert readable data into unreadable ciphertext to protect it from unauthorized access.', 'Symmetric encryption uses one shared key for speed (AES).', 'Asymmetric encryption uses public and private key pairs (RSA, ECC).', 'Hashing creates a one-way fingerprint for integrity (SHA-256).'],
        remember: 'Symmetric = one key, like a house key you copy for a friend. Asymmetric = a public padlock anyone can snap shut, but only your private key opens it. Hash = a fingerprint, it can never be turned back into the original.',
        examTip: 'Match the need to the type. Encrypt lots of data quickly = symmetric (AES). Exchange keys or sign something = asymmetric (RSA). Prove a file was not changed = hash (SHA-256). If an answer says "decrypt a hash," it is wrong.'
      },
      {
        heading: 'Data Protection Concepts',
        points: ['Data Protection Concepts: Strategies and controls used to ensure data confidentiality, integrity, availability, and privacy.', 'Classification helps prioritize protection: public, internal, confidential, restricted.', 'DLP tools detect and prevent unauthorized data movement.', 'Masking and tokenization hide sensitive values from users who should not see them.'],
        remember: 'Label it, lock it, watch it. You cannot protect data you have not classified. Masking = blur the real value. Tokenization = swap it for a harmless stand-in.',
        examTip: 'Sensitive data leaving through email, USB, or cloud uploads = DLP. Deciding how strongly to protect something = classification. Developers need realistic test data without exposing real customer values = masking or tokenization.'
      },
      {
        heading: 'Critical Infrastructure Concepts',
        points: ['Operational Technology (OT): Hardware and software used to monitor and control physical industrial equipment and processes.', 'Industrial Control System (ICS): Systems used to automate and manage industrial operations such as manufacturing and power generation.', 'Supervisory Control and Data Acquisition (SCADA): A type of ICS that collects data from remote devices and provides centralized monitoring and control.'],
        remember: 'OT is the big umbrella, ICS sits under it, and SCADA is an ICS that watches over remote sites. In OT, safety and uptime beat everything, because a patch that crashes a power plant is worse than a delay.',
        examTip: 'Water, power, or factory scenario? Think availability first. Safe answers: segment OT from IT and monitor passively. Be wary of answers that suggest active scanning, rebooting, or rushing patches on live OT systems.'
      }
    ]
  },
  {
    id: 'domain-1-2',
    title: 'Analyzing Indicators of Malicious Activity',
    domain: 'Domain 1.0',
    domainName: 'Security Operations',
    module: '1.2',
    moduleName: 'Indicators of Malicious Activity',
    description: 'Network, host, application, cloud, identity and email indicators, plus social engineering tricks like typosquatting and business email compromise.',
    lastUpdated: 'Oct 9, 2026',
    access: 'Free',
    icon: Search,
    estimatedTime: '3 hours',
    sections: [
      {
        heading: 'Network-related indicators',
        points: ['Rogue devices: Unauthorized devices connected to the network that could be used to steal data, spread malware, or gain unauthorized access.', 'Enumeration: An attacker gathers information about systems, users, ports, or services to identify potential targets and vulnerabilities.', 'Anomalous activity: Unusual network behavior, such as unexpected traffic spikes or connections, that may indicate an attack.', 'Activity on unexpected ports: Network communication occurring on ports not normally used by the organization, which could indicate malware or unauthorized services.'],
        remember: 'Analyze network traffic patterns to identify deviations from normal behavior.'
      },
      {
        heading: 'Host-related indicators',
        points: ['Resource consumption: Excessive CPU, memory, disk, or network usage that may indicate malware, cryptomining, or unauthorized processes.', 'Unauthorized software: Programs installed without approval that may introduce security risks or malware.', 'Anomalous activity: Unusual system behavior such as unexpected crashes, slow performance, or strange user actions that may indicate compromise.', 'Suspicious or rogue processes: Unknown or unauthorized processes running on a system that could be malicious or performing unauthorized actions.', 'Living Off the Land Binaries (LOLBins) and Scripts: Attackers abuse legitimate system tools such as PowerShell, cmd, or Windows utilities to avoid detection.', 'File system changes: Unexpected creation, deletion, modification, or encryption of files that may indicate malware activity.', 'Data exfiltration: Unauthorized transfer of sensitive data from a system to an external location controlled by an attacker.', 'Unauthorized configuration: Security settings, permissions, or system configurations changed without approval, potentially weakening security controls.'],
        remember: 'Monitor system resources, processes, and file changes to detect compromise.'
      },
      {
        heading: 'Application-related indicators',
        points: ['Service disruption: An application becomes unavailable or performs poorly due to attacks such as DoS, malware, or unauthorized changes.', 'Anomalous activity: Unexpected application behavior, errors, or transactions that may indicate compromise or abuse.'],
        remember: 'Watch for service disruptions and unusual application behavior.'
      },
      {
        heading: 'Cloud-related indicators',
        points: ['Anomalous activity: Unusual cloud actions such as unexpected logins, resource creation, or changes in usage patterns that may indicate compromise.', 'Resource compromise: Cloud resources such as virtual machines, storage, or databases being accessed or controlled by unauthorized users.'],
        remember: 'Monitor cloud environments for unexpected activity and resource changes.'
      },
      {
        heading: 'Social engineering attacks',
        points: ['Typosquatting: Attackers create fake websites or domains with names similar to legitimate ones to trick users into visiting them.', 'URL shorteners: Shortened links hide the actual destination and can be used to redirect victims to malicious websites.'],
        remember: 'Always verify URLs before clicking, especially suspicious shortened links.'
      },
      {
        heading: 'Identity-based indicators',
        points: ['IAM account compromise: An identity and access management account is taken over by an attacker and used to perform unauthorized actions.', 'Unauthorized access: Users gain access to systems, applications, or data they are not permitted to use.', 'Impossible travel: The same user account appears to log in from geographically distant locations within an impossible timeframe, indicating possible account compromise.'],
        remember: 'Monitor identity systems for unauthorized access and impossible travel events.'
      },
      {
        heading: 'Email-related attacks',
        points: ['Business Email Compromise (BEC): Attackers impersonate executives, vendors, or trusted contacts through email to trick users into transferring money or revealing sensitive information.'],
        remember: 'Verify requests through secondary channels and watch for impersonation attempts.'
      }
    ]
  },
  {
    id: 'domain-1-3',
    title: 'Tools to Determine Malicious Activity',
    domain: 'Domain 1.0',
    domainName: 'Security Operations',
    module: '1.3',
    moduleName: 'Security Tools and Scripting',
    description: 'CyberChef, Wireshark, Snort, Suricata, Zeek, SIEM, threat-intel platforms, EDR/XDR, reputation lookups, sandboxes, YARA, regex, file formats and scripting languages.',
    lastUpdated: 'Oct 9, 2026',
    access: 'Free',
    icon: Wrench,
    estimatedTime: '5 hours',
    sections: [
      {
        heading: 'Decoding/Parsing',
        points: ['CyberChef: A web-based tool used to decode, encode, decrypt, convert, and analyze suspicious data without writing code.'],
        remember: 'CyberChef is your first stop for encoded or obfuscated data.'
      },
      {
        heading: 'Packet Analysis',
        points: ['Wireshark: A packet capture and analysis tool used to inspect network traffic and identify suspicious communications.', 'tcpdump: A command-line packet analyzer used to capture and investigate network traffic directly from a system.', 'Snort: An intrusion detection and prevention system (IDS/IPS) that analyzes network traffic and generates alerts for suspicious activity.', 'Suricata: A high-performance IDS/IPS that performs deep packet inspection and threat detection on network traffic.', 'Zeek: A network monitoring platform that generates detailed logs and metadata to help investigate security incidents.'],
        remember: 'Wireshark to analyze, tcpdump to capture, Snort/Suricata to alert, Zeek to understand behavior.'
      },
      {
        heading: 'Log Analysis',
        points: ['Security Information and Event Management (SIEM): A centralized platform that collects, correlates, and analyzes logs from multiple systems to detect threats and security incidents.'],
        remember: 'SIEM = central point for collecting, correlating, and analyzing all logs.'
      },
      {
        heading: 'Threat-Intelligence Platforms',
        points: ['Open Threat Exchange (OTX): A community-driven threat intelligence platform that provides indicators of compromise (IOCs) shared by security researchers.', 'Malware Information Sharing Platform (MISP): A threat intelligence platform used to collect, share, and analyze cyber threat information between organizations.', 'Open Cyber Threat Intelligence (OpenCTI): An open-source platform that organizes and visualizes cyber threat intelligence data for investigation and analysis.'],
        remember: 'OTX, MISP, and OpenCTI share threat intelligence and indicators.'
      },
      {
        heading: 'Endpoint Security',
        points: ['Endpoint Detection and Response (EDR) and Extended Detection and Response (XDR): Security solutions that monitor endpoints and enterprise environments to detect, investigate, and respond to threats.', 'Mobile Device Management (MDM): A platform used to manage, monitor, and secure mobile devices across an organization.'],
        remember: 'EDR monitors endpoints, XDR correlates across multiple sources.'
      },
      {
        heading: 'Domain and IP Reputation',
        points: ['WHOIS: A service used to obtain information about domain ownership, registration dates, and contact details.', 'AbuseIPDB: A reputation database that helps identify IP addresses associated with malicious activities.', 'Geolocation by IP Address (GEO-IP): A service that identifies the geographical location of an IP address to support investigations.'],
        remember: 'Use reputation tools to judge the trustworthiness of domains and IPs.'
      },
      {
        heading: 'File Analysis',
        points: ['Strings: A utility that extracts readable text from files to help identify hidden indicators, URLs, commands, or malware artifacts.', 'VirusTotal: An online platform that scans files, URLs, and hashes using multiple antivirus engines to identify malicious content.', 'Yet Another Recursive Acronym (YARA): A rule-based malware analysis tool used to identify and classify malicious files based on specific patterns.'],
        remember: 'Strings extracts text, VirusTotal scans hashes and files, YARA identifies patterns.'
      },
      {
        heading: 'Sandboxing',
        points: ['Joe Sandbox: An automated malware analysis environment that safely executes suspicious files and reports their behavior.', 'Cuckoo Sandbox: An open-source malware analysis platform that observes how files behave in an isolated environment.'],
        remember: 'Sandboxes safely detonate suspicious files in isolation.'
      },
      {
        heading: 'Pattern Recognition',
        points: ['Regular Expressions (Regex): Patterns used to search, match, and analyze text for indicators such as IP addresses, hashes, emails, and other artifacts.', 'Interpreting Suspicious Commands: Analyzing command-line activity to identify actions commonly used by attackers for persistence, execution, or data theft.'],
        remember: 'Regex finds patterns in text, command analysis reveals attacker intent.'
      },
      {
        heading: 'Email Analysis',
        points: ['MXToolbox: A diagnostic tool used to analyze email servers, DNS records, domains, and email security configurations.'],
        remember: 'MXToolbox helps verify email security and DNS settings.'
      },
      {
        heading: 'User and Entity Behavior Analysis (UEBA)',
        points: ['Open User and Entity Behavior Analytics (OpenUBA): A platform that analyzes user and system behavior to detect unusual activities that may indicate insider threats or compromised accounts.'],
        remember: 'UEBA detects deviations from normal behavior patterns.'
      },
      {
        heading: 'File Formats',
        points: ['JSON (JavaScript Object Notation): A lightweight, structured data format commonly used for log files, APIs, and security tool outputs.', 'XML (eXtensible Markup Language): A tag-based data format frequently used for application configuration files and data exchange.', 'YAML (YAML Ain\'t Markup Language): A human-readable configuration format commonly used in automation and cloud environments.', 'EVTX: The native Windows Event Log file format used to store security, application, and system logs.'],
        remember: 'JSON uses braces, XML uses tags, YAML uses indentation, EVTX is Windows logs.'
      },
      {
        heading: 'Programming/Scripting Languages',
        points: ['Python: A versatile programming language commonly used for automation, threat hunting, log analysis, and security scripting.', 'PowerShell: A Windows command-line and scripting language used for system administration but also frequently abused by attackers.', 'Shell Script: A scripting language used in Linux and Unix environments to automate administrative and security-related tasks.'],
        remember: 'Python for cross-platform automation, PowerShell for Windows, Shell for Linux.'
      }
    ]
  },
  {
    id: 'domain-1-4',
    title: 'Threat Intelligence and Threat Hunting',
    domain: 'Domain 1.0',
    domainName: 'Security Operations',
    module: '1.4',
    moduleName: 'Threat Intel & Hunting',
    description: 'Threat actors, TTPs, MITRE ATT&CK, Pyramid of Pain, confidence levels, IoCs, STRIDE, threat mapping and cyber deception.',
    lastUpdated: 'Oct 9, 2026',
    access: 'Free',
    icon: Crosshair,
    estimatedTime: '3 hours',
    sections: [
      {
        heading: 'Threat Actors',
        points: ['Advanced Persistent Threat (APT): A highly skilled and well-funded attacker that gains unauthorized access to a network and remains hidden for a long period while continuously stealing data or conducting espionage.', 'Insider Threat: An employee, contractor, or trusted individual who intentionally or unintentionally causes harm to an organization\'s systems, data, or resources.'],
        remember: 'APT = highly skilled, well-funded, and patient. Insider = already has access.'
      },
      {
        heading: 'Tactics, Techniques, and Procedures (TTPs)',
        points: ['Tactics: The overall goal an attacker is trying to achieve during a cyberattack, such as stealing credentials or disrupting operations.', 'Techniques: The methods attackers use to accomplish their objectives, such as phishing, malware installation, or privilege escalation.', 'Procedures: The specific steps, tools, and actions an attacker follows to carry out a technique against a target.', 'MITRE ATT&CK: A knowledge base that documents real-world attacker tactics and techniques to help security teams understand and detect threats.', 'Heat Maps: A visual chart that highlights areas with the highest security risks, vulnerabilities, or attack activity levels.', 'Pyramid of Pain: A cybersecurity model that shows how difficult it becomes for attackers when defenders can detect and block higher-level indicators such as TTPs.', 'Attribution: The process of identifying the individual, group, or nation responsible for a cyberattack.'],
        remember: 'Tactic = goal, Technique = method, Procedure = exact steps.'
      },
      {
        heading: 'Confidence-Level Impacts',
        points: ['Timeliness: Threat intelligence must be received quickly enough to help organizations respond before significant damage occurs.', 'Relevance: Threat intelligence should relate directly to an organization\'s environment, systems, and potential threats.', 'Accuracy: Threat intelligence must be correct and reliable so that security teams can make informed decisions without wasting resources.'],
        remember: 'TRA: Timeliness, Relevance, Accuracy.'
      },
      {
        heading: 'Collection Methods and Sources',
        points: ['Open-Source Intelligence (OSINT): Information collected from publicly available sources such as websites, social media, news reports, and public databases.', 'Closed-Source Intelligence: Information obtained from private, restricted, or subscription-based sources that are not publicly accessible.', 'Threat Intelligence Sharing: The exchange of threat information between organizations, vendors, and security communities to improve collective cybersecurity awareness.'],
        remember: 'OSINT is public, closed-source is restricted, sharing builds collective defense.'
      },
      {
        heading: 'Indicator of Compromise (IoC)',
        points: ['Collection: The process of gathering evidence such as suspicious files, IP addresses, domains, or logs that may indicate an attack.', 'Analysis: The examination of collected indicators to determine whether malicious activity has occurred or is occurring.', 'Application/Usage: The use of indicators within security tools and processes to detect, monitor, block, or investigate threats.'],
        remember: 'IoC lifecycle: Collect, Analyze, Apply.'
      },
      {
        heading: 'Types of IoCs',
        points: ['Atomic: A single piece of observable evidence, such as an IP address, file hash, domain name, or email address, that may indicate malicious activity.', 'Behavioral: A pattern of activity or attacker behavior that suggests malicious intent, such as repeated failed login attempts or unusual data transfers.'],
        remember: 'Atomic = single value, Behavioral = pattern of actions.'
      },
      {
        heading: 'Threat Modeling (STRIDE)',
        points: ['Spoofing: An attacker pretends to be a legitimate user, device, or system to gain unauthorized access.', 'Tampering: An attacker modifies data, files, configurations, or software without authorization.', 'Repudiation: A user performs an action and later denies carrying out that action because there is insufficient evidence to prove it.', 'Information Disclosure: Sensitive information is exposed to individuals who are not authorized to access it.', 'Denial of Service (DoS): An attacker overwhelms a system or service to make it unavailable to legitimate users.', 'Elevation of Privilege: An attacker gains permissions or access rights beyond those originally granted.'],
        remember: 'STRIDE: Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, Elevation of Privilege.'
      },
      {
        heading: 'Threat Mapping',
        points: ['Threat Mapping: The process of associating known threats, attack techniques, vulnerabilities, and security controls to understand how attackers may target an environment.'],
        remember: 'Map threats to assets and defenses to identify coverage gaps.'
      },
      {
        heading: 'Cyber Deception',
        points: ['Cyber Deception: A security technique that uses fake systems, files, credentials, or services to lure attackers and observe their activities without exposing real assets.', 'Honeypot: A decoy system designed to attract attackers and capture information about their methods and activities.', 'Honeynet: A network of multiple connected honeypots created to simulate a realistic environment for observing attacker behavior.', 'Decoy Assets: Fake files, databases, servers, or accounts intentionally placed within an environment to detect unauthorized access attempts.', 'Fake Credentials: False usernames, passwords, API keys, or tokens planted in systems to alert security teams when attackers attempt to use them.'],
        remember: 'Honeypots and honeytokens provide high-confidence alerts with minimal false positives.'
      }
    ]
  },
  {
    id: 'domain-1-5',
    title: 'Efficiency and Process Improvement',
    domain: 'Domain 1.0',
    domainName: 'Security Operations',
    module: '1.5',
    moduleName: 'Efficiency and Process Improvement',
    description: 'Playbooks and runbooks, SOAR and automation, infrastructure as code, data enrichment, alert tuning, dashboards, APIs, webhooks and plug-ins.',
    lastUpdated: 'Oct 9, 2026',
    access: 'Free',
    icon: Workflow,
    estimatedTime: '2 hours',
    sections: [
      {
        heading: 'Standardize Processes',
        points: ['Manage and Facilitate Team Coordination: A standardized process ensures that all security team members follow the same procedures, improving communication, consistency, and incident response effectiveness.', 'Playbook Creation: A playbook is a documented set of step-by-step instructions that guides security teams on how to respond to specific security events or incidents.', 'Runbook Creation: A runbook is a detailed operational guide that outlines the exact actions required to perform routine security tasks or resolve specific issues.'],
        remember: 'Playbook = response plan, Runbook = exact procedural steps.'
      },
      {
        heading: 'Streamline Operations',
        points: ['Automation and Orchestration: Automation and orchestration reduce manual effort by allowing security tools and processes to work together automatically to detect, investigate, and respond to threats.', 'Security Orchestration, Automation, and Response (SOAR): SOAR is a technology platform that integrates security tools and automates incident response workflows to improve security operations efficiency.', 'Infrastructure as Code (IaC): Infrastructure as Code is the practice of managing and provisioning infrastructure through code instead of manual configuration, ensuring consistency and reducing human error.'],
        remember: 'Automation reduces manual work, SOAR coordinates across tools, IaC ensures consistency.'
      },
      {
        heading: 'Data Enrichment',
        points: ['Data Enrichment: Data enrichment is the process of adding additional context and information to security data to improve analysis and decision-making.', 'Rule/Alert Tuning: Rule or alert tuning is the process of adjusting detection rules to reduce false positives and improve the accuracy of security alerts.', 'Dashboard Creation: Dashboard creation involves building visual displays that present security metrics, alerts, and system activity in an easy-to-understand format for analysts.'],
        remember: 'Enrichment adds context, tuning reduces false positives, dashboards provide visibility.'
      },
      {
        heading: 'Technology and Tool Integration',
        points: ['APIs (Application Programming Interfaces): APIs allow different security tools and applications to communicate and exchange data automatically.', 'Webhooks: Webhooks are automated notifications that send information between systems when a specific event occurs.', 'Plug-ins: Plug-ins are software extensions that add new features or functionality to existing security tools and platforms.'],
        remember: 'APIs enable direct tool communication, webhooks trigger event-based notifications, plugins extend functionality.'
      }
    ]
  },
  {
    id: 'domain-1-6',
    title: 'AI in Security Operations',
    domain: 'Domain 1.0',
    domainName: 'Security Operations',
    module: '1.6',
    moduleName: 'AI in Security Operations',
    description: 'AI risks such as hallucinations, data exposure, model poisoning and malicious prompts, plus governance and practical use cases for analysts.',
    lastUpdated: 'Oct 9, 2026',
    access: 'Free',
    icon: Bot,
    estimatedTime: '1.5 hours',
    sections: [
      {
        heading: 'AI Risks',
        points: ['Hallucinations: Hallucinations occur when an AI system generates incorrect, misleading, or completely fabricated information while presenting it as if it were accurate.', 'Data Exposure: Data exposure occurs when sensitive, confidential, or proprietary information is unintentionally shared with or through an AI system.', 'Model Poisoning: Model poisoning is an attack where malicious data is intentionally inserted into AI training data to influence the model\'s behavior and produce inaccurate or harmful results.', 'Malicious Prompts: Malicious prompts are specially crafted inputs designed to manipulate an AI system into revealing sensitive information, bypassing restrictions, or producing unintended outputs.'],
        remember: 'Hallucinations can sound convincing, data exposure risks arise from unvetted AI tools, model poisoning corrupts AI behavior, malicious prompts manipulate AI into harmful outputs.'
      },
      {
        heading: 'Governance',
        points: ['Legal or Regulatory Compliance: Organizations must ensure that AI systems follow applicable laws, regulations, and industry standards related to privacy, security, and data protection.', 'AI Usage Policies: AI usage policies are documented rules and guidelines that define how AI technologies should be used safely, responsibly, and ethically within an organization.'],
        remember: 'Compliance ensures legal adherence, usage policies define safe and responsible AI use.'
      },
      {
        heading: 'Use Cases',
        points: ['Comparing Artifacts: AI can analyze and compare files, logs, malware samples, hashes, or other security artifacts to identify similarities, differences, and indicators of compromise.', 'Analyzing Log Files: AI can process large volumes of log data to identify suspicious activities, anomalies, and potential security incidents more quickly than manual analysis.', 'Document Creation: AI can assist in creating security reports, incident summaries, policies, procedures, and other documentation based on available data.', 'Incident Investigation: AI can help security analysts investigate incidents by identifying patterns, correlating evidence, and suggesting possible causes or attack paths.', 'Event Correlation: AI can correlate events from multiple security tools and data sources to identify relationships that may indicate a coordinated attack or security incident.', 'Automation and Orchestration: AI can automate repetitive security tasks and coordinate actions across multiple security tools to improve response times and operational efficiency.'],
        remember: 'AI excels at pattern recognition, correlation, and automating repetitive tasks in security operations.'
      }
    ]
  },

  // Domain 2.0: Vulnerability Management (26%)
  {
    id: 'domain-2-1',
    title: 'Vulnerability Discovery and Scanning',
    domain: 'Domain 2.0',
    domainName: 'Vulnerability Management',
    module: '2.1',
    moduleName: 'Vulnerability Discovery',
    description: 'Passive and active scanning, scan types, scanner configuration, agent-based and agentless scanning, credentialed and non-credentialed scanning.',
    lastUpdated: 'Oct 9, 2026',
    access: 'Free',
    icon: Search,
    estimatedTime: '4 hours',
    sections: [
      {
        heading: 'Passive vs Active Scanning',
        explain: 'Vulnerability scanning is the automated process of probing systems for known weaknesses. Passive scanning observes without disruption. Active scanning sends test traffic and may cause performance impacts.',
        points: ['Passive: Network traffic analysis, banner grabbing, WHOIS lookups. No direct probing. Low risk but limited findings.', 'Active: Port scans, service enumeration, exploit attempts. Comprehensive but higher risk to system stability.', 'Passive inside the network: Monitor east-west traffic to find shadow IT and misconfigurations.', 'Combination approach: Use passive to identify, then active to validate.'],
        remember: 'Passive = listening only. Active = poking and prodding. Combined = most thorough.',
        examTip: 'A scenario mentioning "without impacting production" or "during business hours" points to passive scanning.'
      },
      {
        heading: 'Scan Types and Methods',
        explain: 'Different scanning approaches target different scenarios and risk profiles.',
        points: ['Authenticated (Credentialed): Scanner logs in with valid credentials. Sees what users see. Most thorough but requires access.', 'Unauthenticated: Scanner has no credentials. Sees only external-facing information. Realistic attack scenario.', 'Internal vs External: Internal scans from trusted network. External scans from untrusted internet.', 'Full scan: Comprehensive check of all ports and services. Time-consuming.', 'Targeted scan: Focus on specific assets or high-risk areas. Fast but may miss issues.'],
        remember: 'Authenticated finds more. Unauthenticated is realistic. Combine both for complete coverage.',
        examTip: 'A question about "finding what an attacker could find" means unauthenticated scanning.'
      },
      {
        heading: 'Scanner Configuration and Deployment',
        explain: 'Scanners must be configured for your environment to be effective.',
        points: ['Scanner placement: Inside firewall for internal vulnerabilities. Outside for external-facing systems. DMZ for hybrid visibility.', 'Scan frequency: Critical systems daily. Standard systems weekly. Low-risk monthly. Risk and resource balanced.', 'Plugins/updates: Keep vulnerability definitions current or you miss new CVEs.', 'Agent-based: Software installed on each system. Deep visibility into host config and running software. More overhead.', 'Agentless: Network-based scanning. Easier deployment but less deep visibility.'],
        remember: 'Agents = deep but heavy. Agentless = wide but shallow. Use both for defense in depth.',
        examTip: 'If you need to monitor without installing software on endpoints, use agentless (network) scanning.'
      },
      {
        heading: 'Common Vulnerability Scanners',
        explain: 'Industry-standard tools for finding vulnerabilities.',
        points: ['Nessus: Industry leader. Wide range of checks. Proprietary but powerful.', 'OpenVAS: Open-source alternative. Free but less polished UI.', 'Qualys: Cloud-based scanning. Good for organizations without on-prem hardware.', 'Rapid7 Nexpose/InsightVM: Competitor to Nessus. Good for remediation tracking.'],
        remember: 'Nessus is most common. OpenVAS if budget-conscious. Cloud solutions for ease of management.'
      }
    ],
    quickReview: ['Passive scanning observes, active sends test traffic. Use both.', 'Authenticated scanning finds more. Unauthenticated finds what attackers see.', 'Agents = deep visibility. Agentless = easier deployment.', 'Update scanner plugins regularly to detect new CVEs.', 'Scan frequency based on risk: critical daily, standard weekly.', 'Nessus is industry standard. OpenVAS is open-source alternative.'],
    glossary: [{ term: 'Authenticated Scan', meaning: 'Vulnerability scan using valid credentials for deeper visibility.' }, { term: 'Agentless Scanning', meaning: 'Network-based scanning without installing software on targets.' }, { term: 'Plugin', meaning: 'Vulnerability check definition in a scanner.' }]
  },
  {
    id: 'domain-2-2',
    title: 'Vulnerability Analysis and Assessment',
    domain: 'Domain 2.0',
    domainName: 'Vulnerability Management',
    module: '2.2',
    moduleName: 'Vulnerability Analysis',
    description: 'Interpreting scan results, false positives and false negatives, validation techniques, severity assessment, and exploitability analysis.',
    lastUpdated: 'Oct 9, 2026',
    access: 'Free',
    icon: AlertTriangle,
    estimatedTime: '3 hours',
    sections: [
      {
        heading: 'Understanding Scan Results',
        explain: 'Raw scan output contains many findings. Not all are real or important. Analysis separates signal from noise.',
        points: ['Scan report: List of detected services, configurations, and known vulnerabilities with severity ratings.', 'False positives: Scanner reports a vulnerability that does not exist. Common with aggressive scanning.', 'False negatives: Scanner misses a real vulnerability. Usually due to misconfiguration or outdated checks.', 'Validation: Manual verification that a reported issue is real and exploitable.'],
        remember: 'Not everything a scanner reports is a real problem. Validation is critical.',
        examTip: 'A question about confirming a scanner result points to validation/manual testing.'
      },
      {
        heading: 'False Positives and False Negatives',
        explain: 'Every security scanner has accuracy limits. Understanding causes helps improve scan quality.',
        points: ['False positive causes: Scanner misconfiguration, service fingerprinting errors, outdated signature rules, overly aggressive settings.', 'False negative causes: Missing or outdated plugins, insufficient permissions, service running on unexpected port.', 'Reducing false positives: Whitelist known-safe configurations, tune scanner rules, use authenticated scanning.', 'Reducing false negatives: Keep scanner updated, perform periodic comprehensive scans, use multiple scanners for cross-validation.'],
        remember: 'Too many false positives = analyst fatigue = missing real issues. Tune for accuracy.',
        examTip: 'If a scanner is missing vulnerabilities, update the plugins first.'
      },
      {
        heading: 'Validation and Confirmation',
        explain: 'Once a vulnerability is found, verify it is real before wasting resources fixing a false positive.',
        points: ['Manual testing: Run the same test the scanner did. Reproduce the vulnerability.', 'Proof-of-concept: Demonstrate the vulnerability is exploitable in your environment.', 'Context matters: A vulnerability might be theoretical without the right conditions to exploit.', 'Confirmation tools: Use different scanners, manual verification, or vendor confirmation.'],
        remember: 'Validate before you fix. Chasing false positives wastes time and money.'
      },
      {
        heading: 'Severity and Risk Assessment',
        explain: 'Not all vulnerabilities are equally important. Severity helps prioritize.',
        points: ['CVSS (Common Vulnerability Scoring System): Numerical score 0-10. Based on attack complexity, required privileges, impact.', 'CVSS Base Score: Intrinsic properties of the vulnerability.', 'CVSS Environmental Score: Modified based on your specific environment and business context.', 'Temporal Score: Changes over time as patches become available and exploits are published.'],
        remember: 'CVSS is a standard for comparison. Environmental and temporal scores personalize it to your environment.'
      }
    ],
    quickReview: ['Scanners can report false positives. Always validate findings.', 'False positive = reported but not real. False negative = real but not reported.', 'Manual testing confirms a vulnerability is exploitable in your environment.', 'CVSS score helps prioritize. Base score is standard, environmental adjusts for your org.', 'Outdated scanner plugins miss new vulnerabilities.'],
    glossary: [{ term: 'False Positive', meaning: 'Scanner reports a vulnerability that does not actually exist.' }, { term: 'False Negative', meaning: 'Scanner misses a real vulnerability that is present.' }, { term: 'CVSS', meaning: 'Common Vulnerability Scoring System, provides standardized severity rating.' }]
  },
  {
    id: 'domain-2-3',
    title: 'Vulnerability Prioritization and Risk Scoring',
    domain: 'Domain 2.0',
    domainName: 'Vulnerability Management',
    module: '2.3',
    moduleName: 'Vulnerability Prioritization',
    description: 'CVSS scoring details, risk scoring frameworks, business impact analysis, asset criticality, and threat context in prioritization decisions.',
    lastUpdated: 'Oct 9, 2026',
    access: 'Premium',
    icon: BarChart3,
    estimatedTime: '4 hours',
    sections: [
      {
        heading: 'CVSS Scoring in Detail',
        explain: 'CVSS is the industry standard for expressing vulnerability severity. Scores range 0-10 and break down into measurable metrics.',
        points: ['Attack Vector (AV): How can the vulnerability be exploited? Network (remotely), adjacent (local network), local, or physical.', 'Attack Complexity (AC): How much effort to exploit? Low (no special skills) or high (requires significant expertise).', 'Privileges Required (PR): Must attacker have prior access? None, low, or high privileges needed.', 'User Interaction (UI): Must a user perform an action? Yes (clicking link) or no (automatic).', 'Scope (S): Does exploitation affect more than the vulnerable component? Unchanged or changed.', 'Impact (I): Effect on confidentiality, integrity, availability if exploited? None, low, or high.', 'CVSS 4.0: Current standard. CVSS 3.1: Previous version. CVSS 3.0 and 2.0: Legacy versions, do not use.'],
        remember: 'CVSS is reproducible and objective. Environmental and temporal scores add context.',
        examTip: 'Scenarios asking about "exploitable by anyone on the internet" = AV:N, PR:N = higher CVSS score.'
      },
      {
        heading: 'Risk Scoring Beyond CVSS',
        explain: 'CVSS alone does not tell the full story. Business context, threat landscape, and asset value change risk priority.',
        points: ['Environmental scoring: Adjust CVSS based on your configuration, patches applied, mitigating controls.', 'Temporal scoring: Adjust as exploit maturity changes, patches released, or time passes.', 'Business-driven scoring: Does this vulnerability affect revenue, compliance, customer data?', 'Threat landscape: Is there an active exploit? Is it being actively exploited in the wild?', 'Asset value: Are you patching a test system or the CEO\'s laptop? Asset criticality matters.'],
        remember: 'High CVSS + Low asset value = lower priority. Low CVSS + High asset value + Active exploit = high priority.'
      },
      {
        heading: 'Asset Criticality Assessment',
        explain: 'Not all systems are equally important. Criticality determines how urgently to patch.',
        points: ['Tier 1 (Critical): Revenue-generating systems, customer data systems, compliance systems. Patch quickly, test before deploying.', 'Tier 2 (High): Support systems, internal data systems. Patch soon, acceptable short downtime.', 'Tier 3 (Medium): Non-critical support systems. Patch on schedule, wider testing window.', 'Tier 4 (Low): Dev/test systems, unused systems. Patch on regular schedule.'],
        remember: 'A vulnerability on the company webserver is worse than one on a dev laptop.',
        examTip: 'Scenarios about patching order usually place critical systems first.'
      },
      {
        heading: 'Threat Intelligence and Context',
        explain: 'Is this vulnerability actually being exploited? Is it relevant to your organization?',
        points: ['Active exploitation: Is the vulnerability being exploited in the wild right now? Highest priority.', 'Targeted attacks: Is your industry being targeted? Your organization? Raises priority.', 'Proof-of-concept public: Has working exploit code been released? More likely to be exploited.', 'Patch available: Can you fix it immediately? If not, invest in compensating controls.', 'Industry-specific relevance: A Windows vulnerability matters less if your org is all Mac/Linux.'],
        remember: 'Threat context changes priority. Zero-day being exploited in real attacks > theoretical vulnerability.'
      },
      {
        heading: 'Prioritization Frameworks',
        explain: 'Structure your prioritization with a consistent framework.',
        points: ['CVSS + Asset Value + Threat = Priority Score. Calculate consistently.', 'Risk Matrix: Plot likelihood vs impact. Quadrant approach for visual prioritization.', 'Patch Tuesday grouping: Align with vendor release cycles to batch testing and deployment.', 'SLA-driven: Critical patches within 48 hours, high within 2 weeks, medium within 4 weeks.'],
        remember: 'Consistent prioritization = predictable patch schedule = better resource planning.'
      }
    ],
    quickReview: ['CVSS score + Environmental adjustments + Threat context + Asset criticality = True priority.', 'High CVSS does not always mean high priority if the asset is not critical.', 'Active exploits in the wild change priority to "patch immediately."', 'Asset criticality: Tier 1 (revenue) vs Tier 4 (dev/test).', 'CVSS metrics: AV, AC, PR, UI, S, I, A combined give the final score.', 'Environmental scoring adjusts CVSS based on your specific configuration and controls.'],
    glossary: [{ term: 'CVSS', meaning: 'Common Vulnerability Scoring System for standardized severity rating.' }, { term: 'Environmental Score', meaning: 'CVSS adjusted based on specific organizational context and controls.' }, { term: 'Asset Criticality', meaning: 'Business importance ranking of a system or asset.' }, { term: 'Temporal Score', meaning: 'CVSS adjustment based on current threat landscape and exploit maturity.' }]
  },
  {
    id: 'domain-2-4',
    title: 'Vulnerability Remediation and Mitigation',
    domain: 'Domain 2.0',
    domainName: 'Vulnerability Management',
    module: '2.4',
    moduleName: 'Vulnerability Mitigation',
    description: 'Patch management strategies, compensating controls, secure configuration, vendor management, and remediation workflows.',
    lastUpdated: 'Oct 9, 2026',
    access: 'Free',
    icon: Zap,
    estimatedTime: '4 hours',
    sections: [
      {
        heading: 'Patch Management Fundamentals',
        explain: 'Applying patches is the primary way to fix vulnerabilities. Effective patch management balances speed with stability.',
        points: ['Patch cycle: Vulnerability discovered → vendor develops fix → patch released → testing → deployment → verification.', 'Patch Tuesday: Microsoft and major vendors release patches on predictable schedules. Plan around them.', 'Emergency patches: For critical vulnerabilities, expedite testing and deployment. Stability testing may be shortened.', 'Patch testing: Always test in non-production first. Patches can break applications.', 'Rollback plan: Know how to revert if a patch causes problems.'],
        remember: 'Faster patching = lower risk window. But unstable patches = worse than the vulnerability.',
        examTip: 'Scenarios about critical zero-days usually mean expedited patching with shortened testing.'
      },
      {
        heading: 'Compensating Controls',
        explain: 'You cannot always patch immediately. Compensating controls reduce risk while you work on patching.',
        points: ['Network isolation: Restrict access to vulnerable systems via firewall rules or network segmentation.', 'Monitoring: Detect exploitation attempts with IDS/IPS. Alert quickly if attacked.', 'Rate limiting: Slow down or block repeated attempts. Limits brute-force attacks.', 'WAF (Web Application Firewall): Block known exploit patterns hitting web applications.', 'Temporary disable: If the vulnerable feature is not needed, disable it until patched.'],
        remember: 'Compensating controls are temporary. Patch as soon as possible. Do not rely on them forever.',
        examTip: 'A scenario with "cannot patch for 2 weeks due to testing" should mention compensating controls.'
      },
      {
        heading: 'Secure Configuration and Hardening',
        explain: 'Many vulnerabilities come from misconfigurations, not inherent flaws. Proper baseline configuration prevents issues.',
        points: ['CIS Benchmarks: Consensus industry standard configurations for each OS and application.', 'Remove unnecessary services: Disable services not needed. Each service is an attack surface.', 'Disable unnecessary protocols: SSH only if needed. HTTP redirect to HTTPS only.', 'Strong defaults: Change default passwords, disable default accounts, implement strong authentication.', 'Principle of least privilege: Give users/services only the permissions they need.', 'Regular audits: Configuration drift happens. Audit and fix regularly.'],
        remember: 'An ounce of prevention (secure config) is worth a pound of cure (fixing exploited misconfigurations).',
        examTip: 'Questions about preventing vulnerabilities often point to secure configuration and hardening.'
      },
      {
        heading: 'Vendor and Lifecycle Management',
        explain: 'Working with vendors and understanding product lifecycles affects vulnerability management.',
        points: ['Vendor support lifecycle: Products have end-of-life dates. After EOL, no more security patches.', 'Staying on supported versions: Do not run unsupported old versions. Support EOL = security EOL.', 'Vendor communication: Maintain channels to get security advisories and patches quickly.', 'Firmware updates: Routers, switches, and appliances need updates too. Do not forget infrastructure.', 'Hardware replacement: If supporting old hardware, consider replacing it to get current software.'],
        remember: 'Running unsupported software = accepting all future vulnerabilities. Plan upgrades accordingly.'
      },
      {
        heading: 'Remediation Workflow and Metrics',
        explain: 'Effective remediation requires structure and tracking.',
        points: ['Identify: Vulnerability discovered via scan or report.', 'Assess: Validate and determine priority using CVSS + business context.', 'Plan: Determine remediation approach (patch, compensating control, disable feature).', 'Test: Validate fix in non-prod. Verify it works without breaking other systems.', 'Deploy: Roll out to production. Follow change management procedures.', 'Verify: Confirm vulnerability is fixed. Re-scan to confirm.', 'MTTR (Mean Time To Remediate): Track how long from discovery to fix. Industry average is weeks, best-in-class is days.'],
        remember: 'Metrics drive improvement. Measure MTTR and track trends to see if remediation speeds up.'
      }
    ],
    quickReview: ['Patching is the primary fix. Test before deploying to avoid breaking things.', 'Compensating controls buy time while patching. Network isolation and monitoring are common.', 'Secure configuration prevents many vulnerabilities without patches.', 'Plan around Patch Tuesday for predictable release schedules.', 'Do not run unsupported software. EOL = no more security patches.', 'MTTR = Mean Time To Remediate. Track to measure and improve.'],
    glossary: [{ term: 'Patch Tuesday', meaning: 'Predictable vendor patch release schedule, typically second Tuesday of the month.' }, { term: 'Compensating Control', meaning: 'Temporary control reducing risk while permanent fix (patch) is in progress.' }, { term: 'MTTR', meaning: 'Mean Time To Remediate, average duration from vulnerability discovery to fix.' }, { term: 'CIS Benchmarks', meaning: 'Consensus secure configuration standards for OSs and applications.' }]
  },
  {
    id: 'domain-2-5',
    title: 'Vulnerability Reporting and Communication',
    domain: 'Domain 2.0',
    domainName: 'Vulnerability Management',
    module: '2.5',
    moduleName: 'Vulnerability Reporting',
    description: 'Risk reporting formats, executive summaries, technical recommendations, remediation tracking, compliance reporting, and communication strategies.',
    lastUpdated: 'Oct 9, 2026',
    access: 'Premium',
    icon: FileText,
    estimatedTime: '2 hours',
    sections: [
      {
        heading: 'Report Types and Audiences',
        explain: 'Different stakeholders need different information. Tailor reports to the audience.',
        points: ['Executive summary: C-level and business leaders. Focus on business risk, not technical details. One or two pages.', 'Technical report: IT staff and security teams. Detailed findings, CVSS scores, remediation steps.', 'Compliance report: Auditors and regulators. Focus on frameworks (PCI-DSS, HIPAA, etc.) and compliance status.', 'Metrics dashboard: Real-time KPIs. Remediation rate, MTTR, open issues by severity.'],
        remember: 'Executives want risk. Technicians want details. Auditors want compliance proof.'
      },
      {
        heading: 'Executive Summary Best Practices',
        explain: 'Executives make budget decisions based on vulnerability reports. Make the business case clear.',
        points: ['Lead with the business impact: How many systems at risk? What data exposed? Revenue impact?', 'Severity breakdown: Show pie chart of critical/high/medium/low findings. Visual is powerful.', 'Remediation plan: "We have a plan and timeline to fix these."', 'Resource requirements: What budget and people are needed?', 'One page if possible: Executives rarely read multi-page reports. Attachments for details.'],
        remember: 'Executive reports are sales pitch for security resources. Make the case compelling.',
        examTip: 'A question about communicating to senior management usually means executive summary format.'
      },
      {
        heading: 'Technical Recommendations and Remediation',
        explain: 'Technical reports must give clear, actionable recommendations.',
        points: ['Specific remediation steps: "Apply patch KB5123456" not "fix your system."', 'Implementation timeline: How long does patching take? Do we need downtime?', 'Risk if not remediated: What is the downside of not fixing?', 'Validation method: How do we verify the fix worked?', 'Owner assignment: Who is responsible for each remediation task?'],
        remember: 'Vague recommendations get ignored. Specific, actionable steps get done.'
      },
      {
        heading: 'Tracking and Status Reporting',
        explain: 'Monitor remediation progress and keep stakeholders informed.',
        points: ['Remediation tracking system: Record each finding, assigned owner, timeline, status.', 'Status updates: Weekly/monthly progress reports. Track open vs resolved.', 'Escalation paths: If a remediation misses deadline, escalate. Do not let it slip.', 'Metrics: Open/closed ratio, MTTR, trends over time.', 'Aging findings: Findings open for 90 days get executive attention. Do not let them age.'],
        remember: 'Track progress. Trends show if you are improving or falling behind.'
      },
      {
        heading: 'Compliance and Regulatory Reporting',
        explain: 'Many frameworks require vulnerability management documentation.',
        points: ['PCI-DSS: Requires internal and external vulnerability scans at least once every three months. Specific scan requirements.', 'HIPAA: Security risk analysis includes vulnerability assessment.', 'SOC 2: Monitoring and testing of controls, including vulnerability management.', 'ISO 27001: Risk assessment including vulnerability identification and remediation.', 'Documentation: Keep records of scans, findings, remediation plans, and completion dates.'],
        remember: 'Auditors ask: Did you scan? Did you remediate? Can you prove it? Keep records.'
      }
    ],
    quickReview: ['Executive reports focus on business risk and budget. One page, visual, compelling.', 'Technical reports are detailed and actionable. Specific steps, not vague recommendations.', 'Track remediation progress and escalate if timelines slip.', 'Compliance requires documented scans, findings, and remediation proof.', 'Age findings matter: 90+ days open get executive escalation.', 'Different audiences need different report formats.'],
    glossary: [{ term: 'Executive Summary', meaning: 'One-page high-level report focused on business risk and budget impact.' }, { term: 'Remediation Tracking', meaning: 'System to monitor progress of vulnerability fixes from discovery to completion.' }, { term: 'Compliance Reporting', meaning: 'Documentation proving adherence to regulatory framework requirements for vulnerability management.' }]
  },

  // Domain 3.0: Incident Response and Management (24%)
  {
    id: 'domain-3-1',
    title: 'Attack Methodologies and Frameworks',
    domain: 'Domain 3.0',
    domainName: 'Incident Response and Management',
    module: '3.1',
    moduleName: 'Attack Methodologies and Frameworks',
    description: 'MITRE ATT&CK framework, cyber kill chain, attack patterns, threat actor TTPs, and attack lifecycle.',
    lastUpdated: 'Oct 9, 2026',
    access: 'Free',
    icon: Brain,
    estimatedTime: '4 hours',
    sections: [
      {
        heading: 'Cyber Kill Chain Framework',
        explain: 'The kill chain models the stages an attacker progresses through. Understanding each stage helps detect and stop attacks.',
        points: ['Reconnaissance: Attacker gathers intelligence. Website research, social media, WHOIS, DNS queries. No direct contact yet.', 'Weaponization: Attacker prepares tools. Malware, exploit kit, phishing kit. Off your network.', 'Delivery: Attacker sends the weapon. Email, USB drop, website compromise. First contact.', 'Exploitation: Weapon executes on target system. Vulnerability exploited, user clicks link.', 'Installation: Malware establishes persistence. Backdoor created, service installed, scheduled task.', 'Command & Control (C2): Attacker gains remote access. Reverse shell, API callback, agent check-in.', 'Actions on Objectives: Attacker achieves goal. Steal data, ransom, sabotage, espionage.'],
        remember: 'Seven stages from recon to goal. Detect and stop at any stage to prevent attack success.',
        examTip: 'Scenarios asking where to "detect early" usually mean reconnaissance or delivery phases.'
      },
      {
        heading: 'MITRE ATT&CK Framework',
        explain: 'Comprehensive, crowd-sourced knowledge base of attacker techniques observed in the real world.',
        points: ['Tactics: The "why" or goal. Examples: Initial Access, Persistence, Privilege Escalation, Defense Evasion, Discovery, Lateral Movement, Execution, Collection, Exfiltration, Impact.', 'Techniques: The "how" or method. Example: Phishing (tactic: Initial Access), PowerShell (tactic: Execution).', 'Procedures: Real-world implementations by specific threat actors. Example: APT28 uses spear-phishing.', 'Mitigations: How to defend. Example: User training for phishing defense.', 'Detection: How to detect the technique. Example: Monitor for PowerShell child processes.'],
        remember: 'Tactic = goal. Technique = method. Procedure = real-world example.',
        examTip: 'Questions about "detecting technique X" refer to ATT&CK and how defenders should see it.'
      },
      {
        heading: 'Initial Access and Persistence',
        explain: 'Attacker must get in, then stay in. Initial access and persistence are critical stages.',
        points: ['Initial Access methods: Phishing (user action), exploit (vulnerability), supply chain (trusted vendor), physical access, credential reuse.', 'Persistence mechanisms: New user account, scheduled task, service installation, registry run key, cron job, SSH key.', 'Lateral Movement: After initial compromise, move to other systems. Network path depends on network segmentation and permissions.'],
        remember: 'Attackers must get in. Then they must stay in and move around. Detect each stage.'
      },
      {
        heading: 'Detection and Hunting',
        explain: 'Knowing attacker patterns helps defenders hunt for compromises.',
        points: ['Anomalies: Behavior that does not match baseline. Unusual process, odd time of day, strange destination.', 'Known patterns: Attacker techniques from ATT&CK. PowerShell child processes, unusual registry access.', 'Threat hunting: Proactive search for signs of compromise. Assume breach mindset.', 'Timeline analysis: Piece together events to reconstruct attack chain.'],
        remember: 'Threat hunters assume breach and go looking. Use ATT&CK to guide the hunt.'
      }
    ],
    quickReview: ['Kill chain: Recon → Weaponization → Delivery → Exploitation → Installation → C2 → Actions.', 'Detect and stop at ANY stage to prevent attack success.', 'MITRE ATT&CK = crowd-sourced knowledge of real attacks.', 'Tactics = goal (Initial Access). Techniques = method (Phishing). Procedures = real-world example.', 'Persistence mechanisms vary: accounts, tasks, registry, services, cron, SSH keys.', 'Lateral movement requires network access and permissions. Segmentation limits options.'],
    glossary: [{ term: 'Kill Chain', meaning: 'Seven-stage model of attacker progression from recon to achieving objectives.' }, { term: 'Persistence', meaning: 'Mechanism attacker uses to maintain access after reboot or logout.' }, { term: 'C2', meaning: 'Command and Control, communication channel between attacker and compromised system.' }, { term: 'ATT&CK', meaning: 'MITRE knowledge base of adversary tactics and techniques.' }]
  },
  {
    id: 'domain-3-2',
    title: 'Incident Response and Detection Process',
    domain: 'Domain 3.0',
    domainName: 'Incident Response and Management',
    module: '3.2',
    moduleName: 'Incident Response Process',
    description: 'IR phases: detection, analysis, containment, eradication, recovery, and lessons learned. IR team roles and communication.',
    lastUpdated: 'Oct 9, 2026',
    access: 'Free',
    icon: Zap,
    estimatedTime: '5 hours',
    sections: [
      {
        heading: 'Detection and Initial Response',
        explain: 'An incident must first be detected. Detection comes from alerts, user reports, or threat hunting.',
        points: ['Alert sources: SIEM alerts, EDR detections, IDS/IPS alerts, user reports, vendor notifications.', 'Triage: Determine if the alert is real or false positive. Is this actually a security incident?', 'Escalation: If real, escalate to incident response team. Assign severity (Critical/High/Medium/Low).', 'Initial containment: Quick actions to stop immediate harm. Isolate affected system if compromised.'],
        remember: 'Detection starts the clock. Fast response limits damage.',
        examTip: 'Scenarios asking "first thing to do" usually mean containment (stop the bleeding) not investigation.'
      },
      {
        heading: 'Analysis Phase',
        explain: 'Understand the incident. What happened? How? Who did it? What was accessed?',
        points: ['Scope determination: How many systems affected? Which departments?', 'Timeline: When did it start? When was it detected? How long was attacker present?', 'Root cause: How did the attacker get in? Vulnerability, phishing, credential reuse, insider?', 'Evidence collection: Gather data for investigation and possible legal action. Preserve chain of custody.'],
        remember: 'Analysis answers the "what" and "how." Do not skip proper investigation.',
        examTip: 'Questions about "how many systems affected" are asking about scope determination.'
      },
      {
        heading: 'Containment and Eradication',
        explain: 'Stop the attack and remove the attacker.',
        points: ['Short-term containment: Immediate actions to stop ongoing damage. Network isolation, disable account.', 'Long-term containment: Fix the vulnerability while maintaining operations. Patch with workarounds.', 'Eradication: Remove attacker access. Reset passwords, remove backdoors, patch vulnerabilities, update credentials.', 'Verification: Confirm attacker is gone. Re-scan, test for backdoors, monitor for signs of return.'],
        remember: 'Containment stops harm. Eradication removes the attacker. Both are necessary.'
      },
      {
        heading: 'Recovery and Restoration',
        explain: 'Return to normal operations after threat is eliminated.',
        points: ['Restore from clean backups: If malware is present, rebuild from known-good backup.', 'Rebuild if needed: Severe compromise may require full OS reinstall.', 'Test: Confirm systems work and are not re-infected.', 'Restore data: Return data from backups if it was encrypted or deleted.', 'Monitor: Watch closely for weeks after recovery for signs of returning attacker.'],
        remember: 'Do not trust infected system. Rebuild cleanly if possible.'
      },
      {
        heading: 'Post-Incident and Lessons Learned',
        explain: 'After the incident is resolved, learn from it and improve.',
        points: ['Lessons learned meeting: Team debrief. What went right? What went wrong? How do we improve?', 'Documentation: Update runbooks and IR procedures based on what you learned.', 'Improvements: Patch the initial vulnerability. Implement the detective control you missed. Improve monitoring.', 'Communication: Inform leadership and affected parties. Be transparent about what happened.'],
        remember: 'Every incident is a learning opportunity. Use it to improve your security posture.'
      }
    ],
    quickReview: ['IR phases: Detection → Analysis → Containment → Eradication → Recovery → Lessons Learned.', 'Detection sources: SIEM, EDR, IDS/IPS, user reports, vendors.', 'Scope: How many systems? Timeline: When did it start and end?', 'Containment stops harm. Eradication removes attacker. Recovery restores operations.', 'Always verify attacker is gone before returning to normal.', 'Post-incident lessons learned improve future response.'],
    glossary: [{ term: 'Triage', meaning: 'Initial assessment to determine if an alert is a real incident.' }, { term: 'Scope', meaning: 'The extent of an incident (number of systems, users, departments affected).' }, { term: 'Eradication', meaning: 'Complete removal of attacker access and malicious artifacts.' }, { term: 'Chain of Custody', meaning: 'Documented evidence preservation procedures for legal admissibility.' }]
  },
  {
    id: 'domain-3-3',
    title: 'Digital Forensics and Evidence Handling',
    domain: 'Domain 3.0',
    domainName: 'Incident Response and Management',
    module: '3.3',
    moduleName: 'Digital Forensics Concepts',
    description: 'Evidence collection procedures, chain of custody, memory and disk forensics, log analysis, and preservation techniques.',
    lastUpdated: 'Oct 9, 2026',
    access: 'Premium',
    icon: Terminal,
    estimatedTime: '5 hours',
    sections: [
      {
        heading: 'Evidence Collection Principles',
        explain: 'Digital evidence can be fragile and easily corrupted. Proper collection is critical for both investigation and legal proceedings.',
        points: ['Minimize changes: Do not modify evidence. Read-only access when possible.', 'Document everything: Record what, when, where, and by whom. Timestamp all actions.', 'Chain of custody: Track evidence from collection through investigation. Who handled it? When? Why?', 'Volatile data first: RAM disappears on reboot. Collect memory before disk.', 'Hash everything: Create cryptographic hash of evidence. Proves evidence has not been modified.'],
        remember: 'Digital evidence is fragile. One mistake and it is inadmissible in court.',
        examTip: 'Scenarios asking "first action" on a live system often mean collect memory (volatility) before shutdown.'
      },
      {
        heading: 'Chain of Custody',
        explain: 'Legal requirement for evidence admissibility. Every interaction must be documented.',
        points: ['Documentation: Name, date, time, action taken, reason, signature for every interaction.', 'Custody transfer: When evidence moves to a new person, document the handoff.', 'Integrity verification: Use hashes to prove evidence is unchanged.', 'Storage security: Locked storage, limited access, environmental controls.', 'Labeling: Clear identification of evidence, date collected, collector name.'],
        remember: 'Proper documentation = admissible evidence. Sloppy handling = evidence thrown out of court.'
      },
      {
        heading: 'Memory Forensics',
        explain: 'RAM contains running processes, network connections, and sensitive data. Capturing memory is critical.',
        points: ['Volatile data: RAM is lost on reboot. Collect ASAP.', 'Memory dump: Tools like dd, FTK Imager, Memdump to capture RAM image.', 'Analysis: Analyze dump for running processes, open network connections, loaded modules, credentials in memory.', 'Tools: Volatility, Rekall for analyzing memory dumps.', 'What to look for: Malicious processes, hidden processes, injected code, credentials.'],
        remember: 'Memory is volatile. Collect it immediately before power loss or reboot.',
        examTip: 'Scenarios about live systems with potential malware should mention memory capture before other actions.'
      },
      {
        heading: 'Disk Forensics',
        explain: 'Disk contains files, file system metadata, and deleted data. Disk analysis reveals what happened and who did it.',
        points: ['Disk imaging: Create sector-by-sector copy of entire disk. Write-blocker used to prevent modification.', 'File analysis: Timeline of file creation/modification/access. When was malware created?', 'Deleted files: File system marks space as unused but data remains. Carving recovers deleted files.', 'Slack space: Unused area in allocated file. Sometimes contains partial data.', 'Registry (Windows): Configuration, user info, recently used files, installed software. Rich forensic artifact.'],
        remember: 'Disk contains history. File timestamps and deleted files reveal what happened.',
        examTip: 'Questions about "proving file was modified" usually mean timestamp analysis or hash comparison.'
      },
      {
        heading: 'Log Analysis and Timeline',
        explain: 'Logs from systems, applications, and network devices build a complete picture of what happened.',
        points: ['Event logs: Windows Event Viewer, Linux syslog, application logs. Who logged in? What ran? What changed?', 'Web logs: Web server access logs show requests. HTTP 403 = access denied, 200 = success.', 'Network logs: Firewall logs, proxy logs show connections. Who connected to what? When?', 'Timeline: Reconstruct chronological sequence of events. What happened first? How did attack progress?', 'Log retention: Keep logs long enough for investigation. Usually 90 days minimum, compliance may require longer.'],
        remember: 'Logs are your audit trail. Keep them and analyze them thoroughly.',
        examTip: 'Scenarios asking "when did the attacker first connect" require log timeline analysis.'
      }
    ],
    quickReview: ['Volatile data (memory) collected before disk. Minimize changes to evidence.', 'Hash everything to prove integrity. Document who touched evidence and when (chain of custody).', 'Memory forensics finds running processes, hidden malware, and credentials.', 'Disk forensics recovers deleted files and reveals file modification timeline.', 'Logs build comprehensive timeline of attack from initial access to final actions.', 'Write-blockers prevent accidental modification of evidence during collection.'],
    glossary: [{ term: 'Chain of Custody', meaning: 'Documentation of evidence handling from collection through investigation.' }, { term: 'Volatile Data', meaning: 'Data stored in RAM that is lost on reboot.' }, { term: 'Write-Blocker', meaning: 'Device preventing writing to evidence media while allowing reads.' }, { term: 'Memory Dump', meaning: 'Complete image of RAM contents at a point in time.' }]
  },
  {
    id: 'domain-3-4',
    title: 'Incident Investigation and Rootcause Analysis',
    domain: 'Domain 3.0',
    domainName: 'Incident Response and Management',
    module: '3.4',
    moduleName: 'Incident Investigation',
    description: 'Root cause analysis techniques, scope determination, timeline reconstruction, indicator analysis, and hypothesis validation.',
    lastUpdated: 'Oct 9, 2026',
    access: 'Premium',
    icon: Brain,
    estimatedTime: '4 hours',
    sections: [
      {
        heading: 'Root Cause Analysis Methods',
        explain: 'Finding the root cause is critical. Patch the root cause, not just the symptom, or the attack will happen again.',
        points: ['Five Whys: Ask "why" five times to get to root cause. Example: System hacked → why → default password → why → no password policy → why → no one enforced it → why → no process.', '5 Ws and H: Who, What, When, Where, Why, How? Answers build complete picture.', 'Common root causes: Unpatched vulnerability (patch it), weak credential (change policy), misconfiguration (fix config), no monitoring (add detection).', 'Do not stop at symptom: "Malware found" is not root cause. Root cause is "how did malware get in" (unpatched server).'],
        remember: 'Fix root cause, not symptom. Otherwise, attacker exploits same path again.',
        examTip: 'Questions about "preventing recurrence" usually point to root cause vs symptom.'
      },
      {
        heading: 'Scope and Impact Determination',
        explain: 'How many systems, users, and data are affected? Scope determines response urgency and resource allocation.',
        points: ['Affected systems: Which servers, workstations, cloud instances? Network scanning helps.', 'Affected users: Which user accounts were compromised? How many accounts does attacker control?', 'Affected data: What data was accessed or stolen? Passwords? Customer data? Trade secrets?', 'Blast radius: If attacker has admin access, assume all systems are compromised. Start from there and narrow down.'],
        remember: 'Assume worst case initially. Expand scope until you have confidence in boundaries.',
        examTip: 'Scenarios asking "how bad is it" need scope determination.'
      },
      {
        heading: 'Timeline Reconstruction',
        explain: 'When did the attack start? How long was attacker present? Reconstruction uses logs, timestamps, and evidence.',
        points: ['Initial compromise: When did attacker first get in? First malware execution? First C2 callback?', 'Persistence establishment: When did attacker set up backdoor for future access?', 'Lateral movement: When did attacker move to other systems?', 'Objective achievement: When did attacker steal data, encrypt files, or achieve goal?', 'Detection: When was the incident discovered? Dwell time = detection time - compromise time.'],
        remember: 'Dwell time is typically measured in days or weeks. Reduce detection time to limit damage.',
        examTip: 'Questions about "how long was attacker present" need timeline from logs.'
      },
      {
        heading: 'Indicator of Compromise (IoC) Analysis',
        explain: 'IoCs are evidence of compromise. Analyze them to understand scope and find more affected systems.',
        points: ['File hashes: MD5, SHA-256 of malware. Use to find if malware exists elsewhere.', 'IP addresses: Attacker C2 server IPs. Use to find connections to C2 in logs.', 'Domains: C2 domains. Check DNS logs for queries, firewall for connections.', 'Registry keys: Windows malware often creates registry entries. Scan systems for matching keys.', 'Process signatures: Known malware process names, behaviors, parent processes.'],
        remember: 'IoCs are your hunting tools. Find one and hunt for more compromised systems.'
      },
      {
        heading: 'Hypothesis Testing and Validation',
        explain: 'During investigation, develop and test hypotheses about what happened.',
        points: ['Develop hypothesis: "Attacker got in via unpatched web server."', 'Gather evidence: Find logs of initial web request that exploited vulnerability.', 'Test: Can you reproduce the attack path? Can you find evidence of exploitation?', 'Validate or refute: Evidence supports or refutes hypothesis. Adjust and continue.', 'Do not assume: Test theories. Wrong theory wastes investigation time and misses real issue.'],
        remember: 'Follow evidence, not assumptions. Test your theories.'
      }
    ],
    quickReview: ['Root cause is why the attack succeeded, not just how malware got in.', 'Five Whys method: Ask why repeatedly until you find the real underlying issue.', 'Scope: How many systems, users, and what data affected?', 'Timeline: Initial compromise → Persistence → Lateral Movement → Objective → Detection.', 'Dwell time: How long attacker was present before detection. Reduce this metric.', 'IoCs: File hashes, IPs, domains, registry keys for hunting compromised systems.'],
    glossary: [{ term: 'Root Cause', meaning: 'Underlying reason why the attack succeeded.' }, { term: 'Dwell Time', meaning: 'Duration between initial compromise and detection.' }, { term: 'Hypothesis', meaning: 'Proposed explanation for the incident to be tested with evidence.' }, { term: 'IoC', meaning: 'Indicator of Compromise, evidence that a system is compromised.' }]
  },
  {
    id: 'domain-3-5',
    title: 'Post-Incident Activities and Continuous Improvement',
    domain: 'Domain 3.0',
    domainName: 'Incident Response and Management',
    module: '3.5',
    moduleName: 'Post-Incident Activities',
    description: 'Lessons learned process, corrective actions, process improvements, documentation, metrics, and communication with stakeholders.',
    lastUpdated: 'Oct 9, 2026',
    access: 'Free',
    icon: FileText,
    estimatedTime: '3 hours',
    sections: [
      {
        heading: 'Lessons Learned Process',
        explain: 'After the incident, team gathers to extract learning and improve processes.',
        points: ['Timing: Hold meeting 1-2 weeks after resolution. Wait for emotions to settle but while details are fresh.', 'Participants: IR team, system owners, management, process owners. Diverse perspectives.', 'Blameless culture: Focus on process, not blaming individuals. "Why did system not alert us?" not "Why did Fred miss the alert?"', 'Questions to ask: What went well? What went badly? What did we miss? How do we prevent? How do we detect faster?'],
        remember: 'Blameless lessons learned = people speak honestly = team improves.',
        examTip: 'Questions about post-incident improvement usually mention lessons learned meeting.'
      },
      {
        heading: 'Corrective and Preventive Actions',
        explain: 'Translate lessons learned into concrete actions.',
        points: ['Preventive: Stop the attack from happening again. Patch vulnerability, fix misconfiguration, implement control.', 'Detective: Detect if it happens despite prevention. New alert, new monitoring rule, new hunt.', 'Corrective: Fix the process that failed. Improve runbook, update playbook, add tool.', 'Assign owners: Each action needs an owner and deadline. Track to completion.'],
        remember: 'Preventive is ideal. Detective is practical when prevention not possible.'
      },
      {
        heading: 'Process Improvements',
        explain: 'Use incident to improve IR capability.',
        points: ['Runbooks: Update incident response runbooks with new procedures discovered.', 'Playbooks: Specific procedures for similar incidents. Automate responses where possible.', 'Tools: Do you need new tools? Better alert tuning? Improved SIEM searches?', 'Training: Did team lack knowledge? Schedule training. Did new tool fail? Train on it.', 'Detection: Could this have been detected faster? Earlier? Add new detection rules.'],
        remember: 'Each incident reveals gaps. Fill the gap before next incident.'
      },
      {
        heading: 'Incident Metrics and KPIs',
        explain: 'Measure response effectiveness to track improvement over time.',
        points: ['MTTR (Mean Time To Respond): How long from detection to beginning response? Goal: minutes.', 'MTTI (Mean Time To Identify): How long to determine what is actually wrong? Goal: hours.', 'MTTC (Mean Time To Contain): How long from identification to stopping the attack? Goal: hours.', 'MTTR (Mean Time To Recover): How long to return to normal operations? Goal: hours/days.', 'Dwell time: How long attacker was present. Trend should decrease as detection improves.'],
        remember: 'Measure metrics. Track trends. Celebrate improvements.'
      },
      {
        heading: 'Stakeholder Communication',
        explain: 'Keep leadership and affected parties informed.',
        points: ['Executive summary: What happened? How bad? How did we respond? What did we fix?', 'Affected users: If their data was breached, notify them. Explain steps taken to protect them.', 'Regulatory bodies: Some breaches must be reported. Know your obligations.', 'Transparency: Be honest about what went wrong. Attempts to hide hurt trust more than admission.'],
        remember: 'Communication after incident is as important as response. Restore trust through transparency.'
      }
    ],
    quickReview: ['Lessons learned meeting 1-2 weeks after resolution. Blameless culture.', 'Preventive fixes stop reoccurrence. Detective catches it if prevention fails.', 'Update runbooks, playbooks, and add new detection rules based on lessons.', 'Track metrics: MTTR, MTTI, MTTC, MTTR, Dwell Time. Trends show improvement.', 'Communicate with executive, users, and regulators post-incident.', 'Each incident is an opportunity to improve. Do not waste it.'],
    glossary: [{ term: 'MTTR', meaning: 'Mean Time To Respond or Recover (context-dependent).' }, { term: 'Dwell Time', meaning: 'Duration between compromise and detection.' }, { term: 'Corrective Action', meaning: 'Action taken to fix the process that failed.' }, { term: 'Preventive Action', meaning: 'Action taken to prevent the incident from happening again.' }]
  },

  // Domain 4.0: Reporting and Communication (16%)
  {
    id: 'domain-4-1',
    title: 'Reporting Techniques and Report Types',
    domain: 'Domain 4.0',
    domainName: 'Reporting and Communication',
    module: '4.1',
    moduleName: 'Reporting Techniques',
    description: 'Report types and audiences, executive summaries, technical reports, incident reports, vulnerability reports, and risk communication.',
    lastUpdated: 'Oct 9, 2026',
    access: 'Free',
    icon: FileText,
    estimatedTime: '2 hours',
    sections: [
      {
        heading: 'Report Types and Purposes',
        explain: 'Different stakeholders need different information. Reports must be tailored to audience and purpose.',
        points: ['Executive report: High-level summary. What happened? Impact? Cost? What did we do? No technical details.', 'Technical report: Detailed analysis. Attack vectors, indicators of compromise, forensic findings. For technical team.', 'Incident report: What, when, where, who, why, how. Detailed incident description. For documentation.', 'Vulnerability report: What is vulnerable? Severity? How to fix? For development and security teams.', 'Risk report: Risk ranking. Business impact. Remediation timeline. For management decision-making.'],
        remember: 'Match report complexity to audience knowledge level. Executives want bottom line. Technicians want details.',
        examTip: 'Scenarios asking "who should receive this report" require understanding audience and report type.'
      },
      {
        heading: 'Executive Communication',
        explain: 'Executives need business impact, not technical details.',
        points: ['What happened: 1-2 sentence incident description.', 'Impact: How much revenue lost? Customers affected? Compliance violation? What is the business damage?', 'Cost: Investigation cost? Remediation cost? Lost productivity? Total cost to business.', 'Response: What did we do? How fast? What did we fix?', 'Future: Will this happen again? What is the plan?'],
        remember: 'Executives care about risk and cost. Translate technical findings into business impact.'
      },
      {
        heading: 'Technical Report Structure',
        explain: 'Technical reports provide detailed findings for technical teams.',
        points: ['Executive summary: 1-page summary of findings.', 'Methodology: How investigation was conducted. What tools used? Timeline of investigation.', 'Findings: Detailed technical findings. Attack vector, malware analysis, timeline, indicators.', 'Evidence: Forensic evidence supporting findings. Logs, screenshots, file hashes.', 'Recommendations: Specific remediation steps. Priority. Resource requirements.'],
        remember: 'Technical reports need detail and evidence. Back every claim with forensic proof.'
      },
      {
        heading: 'Data Visualization and Clarity',
        explain: 'Clear presentation of findings improves understanding.',
        points: ['Timeline diagrams: Visual representation of attack progression.', 'Impact summary: Affected systems, users, data in easy-to-scan format.', 'Risk heat maps: Visual risk prioritization.', 'Before/after: Show security posture improvements.'],
        remember: 'A picture is worth 1000 words. Use visuals to clarify complex findings.'
      }
    ],
    quickReview: ['Executive report: Business impact, cost, response taken. No technical details.', 'Technical report: Detailed findings, methodology, evidence, recommendations.', 'Match report to audience. Executives = business. Technicians = technical detail.', 'Include: Executive summary, findings, evidence, recommendations in technical report.', 'Use visuals: Timelines, heat maps, charts to clarify findings.', 'Avoid jargon in executive report. Define technical terms in technical report.'],
    glossary: [{ term: 'Executive Summary', meaning: 'High-level overview of findings for non-technical stakeholders.' }, { term: 'Forensic Evidence', meaning: 'Data proving attack methods and attacker actions.' }, { term: 'Risk Ranking', meaning: 'Prioritization of risks by severity and business impact.' }, { term: 'Remediation', meaning: 'Actions taken to fix the vulnerability or incident.' }]
  },
  {
    id: 'domain-4-2',
    title: 'Dashboards and Security Metrics',
    domain: 'Domain 4.0',
    domainName: 'Reporting and Communication',
    module: '4.2',
    moduleName: 'Dashboards and Metrics',
    description: 'KPIs, security metrics, trend analysis, data visualization, compliance metrics, and real-time monitoring dashboards.',
    lastUpdated: 'Oct 9, 2026',
    access: 'Free',
    icon: BarChart3,
    estimatedTime: '2 hours',
    sections: [
      {
        heading: 'Security KPIs and Metrics',
        explain: 'Quantifiable metrics show security program effectiveness.',
        points: ['Vulnerability metrics: Number discovered, remediation rate, time to patch by severity.', 'Detection metrics: Alerts generated, false positive rate, MTTR (Mean Time To Respond).', 'Incident metrics: Incidents per month (trending down is good), average dwell time, MTTR.', 'Compliance metrics: Percentage of controls implemented, audit findings, compliance trending.', 'User metrics: Training completion rate, phishing click rate, policy compliance rate.'],
        remember: 'Metrics should trend in positive direction. Increase detection, decrease incidents. Increase training, decrease clicks.'
      },
      {
        heading: 'Dashboard Design',
        explain: 'Effective dashboards present key metrics at a glance.',
        points: ['Executive dashboard: High-level metrics. Overall security posture. Risk trend. Compliance status.', 'Operations dashboard: Real-time alerts, current incidents, system health, blocked threats.', 'Metrics dashboard: KPI trends over time. Month-over-month comparison. Goal tracking.', 'Drill-down capability: Click on metric to see details. Executive dashboard for leaders, operational details for team.'],
        remember: 'Different roles need different dashboards. Executive vs Technical.',
        examTip: 'Scenarios asking "what should leadership see" point to high-level dashboard vs detailed metrics.'
      },
      {
        heading: 'Metrics Interpretation and Trending',
        explain: 'Raw numbers need context. Trending shows whether security is improving.',
        points: ['Baseline: Establish normal baseline. What is expected? Incidents should trend down after improvements.', 'Trending: Track metric over time (days, weeks, months). Spike might indicate new threat or new detection.', 'Anomalies: Sudden change in metric. Investigate why. New attack? New detection rule? Test?', 'Context: Metric alone is meaningless. Budget spent? People hired? Tools implemented? Context explains metric.'],
        remember: 'Trending is more important than absolute number. Is security posture improving?'
      },
      {
        heading: 'Compliance and Audit Metrics',
        explain: 'Compliance metrics show regulatory requirement fulfillment.',
        points: ['Control implementation: Percentage of required controls implemented and operating.', 'Audit findings: Number, severity, remediation status. Track to closure.', 'Assessment results: Periodic audits and assessments. Trend should improve.', 'Policy compliance: Percentage of users compliant with security policies.'],
        remember: 'Compliance metrics often overlap with security metrics. A strong security program meets compliance.'
      }
    ],
    quickReview: ['Key metrics: Vulnerabilities discovered, incidents per month, MTTR, training completion, phishing click rate.', 'Executive dashboard: Overall posture, risk trend, compliance status. High-level only.', 'Operations dashboard: Real-time alerts, current incidents, system health.', 'Trending is critical. Metrics should improve after security improvements.', 'Baseline establishes normal. Spike requires investigation (threat or detection change?).', 'Compliance metrics show regulatory requirement fulfillment.'],
    glossary: [{ term: 'KPI', meaning: 'Key Performance Indicator, quantifiable metric of effectiveness.' }, { term: 'MTTR', meaning: 'Mean Time To Respond or Resolve.' }, { term: 'Baseline', meaning: 'Normal expected value for a metric.' }, { term: 'Trending', meaning: 'Pattern of metric change over time.' }]
  },
  {
    id: 'domain-4-3',
    title: 'Stakeholder Communication and Escalation',
    domain: 'Domain 4.0',
    domainName: 'Reporting and Communication',
    module: '4.3',
    moduleName: 'Stakeholder Communication',
    description: 'Communicating with technical and non-technical audiences, escalation procedures, risk communication, crisis communication, and audience adaptation.',
    lastUpdated: 'Oct 9, 2026',
    access: 'Free',
    icon: Users,
    estimatedTime: '2 hours',
    sections: [
      {
        heading: 'Audience-Based Communication',
        explain: 'Different audiences need different information presented differently.',
        points: ['Executive audience: Business impact, cost, risk, timeline. Minimal technical detail.', 'IT operations: How to fix, timeline to resolution, business continuity impact.', 'Developers: Vulnerability details, reproduction steps, secure coding solution.', 'End users: What to do, how to protect yourself, when to report suspicious activity.', 'Board of directors: Strategic risk, market impact, competitive advantage, investor confidence.'],
        remember: 'Tailor message to what audience cares about. Executives care about risk/cost. Developers care about how to fix.'
      },
      {
        heading: 'Escalation Procedures',
        explain: 'Clear escalation ensures incident severity gets appropriate attention.',
        points: ['Severity levels: Define what triggers escalation. Loss of service? Sensitive data? Executive notification required?', 'Escalation path: Who do you tell? When? Chain of command matters.', 'Timing: Escalate immediately on serious issues. Do not delay hoping to fix it.', 'Communication cadence: How often to update? Critical issues: hourly. Major issues: daily. Minor issues: weekly.'],
        remember: 'Escalate early. Better to have leadership overreact than find out too late.'
      },
      {
        heading: 'Crisis Communication',
        explain: 'Major incidents require controlled, strategic communication.',
        points: ['Rapid response: Issue initial statement quickly. Acknowledge issue. Show you are taking action.', 'Accurate information: Only communicate what you know. Say "we are investigating" if facts not confirmed.', 'Consistent messaging: Brief all communicators on key points. Prevent contradictions.', 'Transparency vs operational security: Be honest about impact without revealing attack methods to other attackers.', 'Follow-up: Provide updates as situation develops. Radio silence increases speculation.'],
        remember: 'In crisis: Communicate fast, accurately, and consistently.'
      },
      {
        heading: 'Risk Communication',
        explain: 'Helping stakeholders understand and accept security risks.',
        points: ['Risk level: Clearly state risk (high/medium/low). What is at stake? What is probability?', 'Business impact: Why does this matter? Revenue? Customers? Compliance?', 'Mitigation: What will you do? Timeline? Resource requirements?', 'Acceptance: Sometimes organizations accept risk (cost of fix exceeds risk). Ensure decision-makers approve.'],
        remember: 'Risk communication helps stakeholders make informed decisions about risk acceptance.'
      }
    ],
    quickReview: ['Tailor communication to audience. Executives = risk/cost. Technicians = how to fix.', 'Escalate serious issues immediately. Do not delay.', 'Communication cadence: Critical = hourly, Major = daily, Minor = weekly.', 'Crisis communication: Fast, accurate, consistent. Acknowledge and show action.', 'Transparency builds trust. Admit mistakes and what you will fix.', 'Risk communication helps stakeholders accept or mitigate risk.'],
    glossary: [{ term: 'Escalation', meaning: 'Moving issue up chain of command for higher-level attention.' }, { term: 'Risk Acceptance', meaning: 'Decision to accept a risk rather than remediate it.' }, { term: 'Dwell Time', meaning: 'Duration between compromise and detection.' }, { term: 'Cadence', meaning: 'Regular frequency of communication or updates.' }]
  },
  {
    id: 'domain-4-4',
    title: 'Documentation and Compliance Management',
    domain: 'Domain 4.0',
    domainName: 'Reporting and Communication',
    module: '4.4',
    moduleName: 'Documentation and Compliance',
    description: 'Evidence documentation, audit support, regulatory requirements, security records management, retention policies, and compliance frameworks.',
    lastUpdated: 'Oct 9, 2026',
    access: 'Free',
    icon: Shield,
    estimatedTime: '2 hours',
    sections: [
      {
        heading: 'Documentation Requirements',
        explain: 'Proper documentation serves multiple purposes: incident investigation, compliance proof, and legal defense.',
        points: ['Incident documentation: What happened? When? Timeline. Decisions made. Why?', 'Evidence documentation: Chain of custody. Who handled evidence? When? Why? Signatures.', 'Investigation findings: What you discovered. How you discovered it. Evidence supporting conclusions.', 'Remediation documentation: What did you fix? When? Who approved? Verification of fix effectiveness.'],
        remember: 'If it is not documented, it did not happen. Assume legal discovery and need to prove your actions.'
      },
      {
        heading: 'Compliance Frameworks',
        explain: 'Organizations must demonstrate compliance with industry and regulatory frameworks.',
        points: ['NIST Cybersecurity Framework: Five functions (Identify, Protect, Detect, Respond, Recover).', 'ISO 27001: International standard for information security management system.', 'SOC 2: Audits controls over security, availability, processing integrity, confidentiality, privacy.', 'HIPAA: For health care. Requires encryption, access controls, audit logs.', 'PCI DSS: For payment processing. Requires network segmentation, encryption, access control.'],
        remember: 'Compliance is an ongoing process, not a one-time audit. Implement and maintain controls continuously.'
      },
      {
        heading: 'Audit and Assessment Support',
        explain: 'Auditors assess your security program. Good documentation makes audits easier.',
        points: ['Audit readiness: Are you documenting controls? Logging access? Retaining logs?', 'Evidence collection: Auditors request proof. "Show me your backup recovery test results." Ready your documentation.', 'Exceptions: If you cannot meet a requirement, document why and what you are doing instead.', 'Remediation tracking: Auditors find findings. Document your remediation plan and track to closure.'],
        remember: 'Audits go smoother with organized, complete documentation.'
      },
      {
        heading: 'Records Management and Legal Hold',
        explain: 'Security records must be retained properly for legal and compliance purposes.',
        points: ['Retention policy: How long to keep logs? Incident reports? Audit results? Usually 90 days minimum, compliance may require 7 years.', 'Legal hold: If litigation is anticipated, preserve all related evidence. Do not delete anything even if retention period expired.', 'Secure storage: Logs and evidence must be protected from tampering and unauthorized access.', 'Accessibility: Records must be retrievable for investigation or audit. Organize so you can find needed evidence quickly.'],
        remember: 'Retention policy applies during normal operations. Legal hold supersedes retention policy during litigation.'
      }
    ],
    quickReview: ['Document everything: incidents, evidence, findings, remediation. Assume legal discovery.', 'Chain of custody: Name, date, time, action, reason for every evidence interaction.', 'NIST, ISO 27001, SOC 2, HIPAA, PCI DSS are major compliance frameworks.', 'Auditors assess controls. Documentation proves you implemented and maintained them.', 'Retention policy: Keep logs per policy (usually 90 days minimum). Legal hold: Keep everything if litigation anticipated.', 'Accessible organization: Must be able to quickly retrieve evidence for investigation or audit.'],
    glossary: [{ term: 'Chain of Custody', meaning: 'Documentation of evidence handling from collection through investigation.' }, { term: 'Legal Hold', meaning: 'Obligation to preserve evidence when litigation is anticipated.' }, { term: 'Retention Policy', meaning: 'Rules governing how long to keep security records.' }, { term: 'SOC 2', meaning: 'Audit framework assessing controls over security, availability, integrity, confidentiality, privacy.' }]
  },
];

export interface SubSection {
  id: string;
  title: string;
  content: string;
}

export interface Section {
  id: string;
  title: string;
  subsections: SubSection[];
}

export interface HighlightedText {
  id: string;
  text: string;
  color: string;
}

export interface DetailedStudyNote {
  id: string;
  title: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  estimatedTime: string;
  icon: LucideIcon;
  keyConceptsSummary: string;
  sections: Section[];
}

export const detailedStudyNotes: DetailedStudyNote[] = [
  {
    id: 'network-security',
    title: 'Network Security Fundamentals',
    category: 'Network Security',
    difficulty: 'Beginner',
    description: 'Core concepts of network defense, firewalls, VPNs, IDS/IPS systems, and network segmentation.',
    estimatedTime: '4 hours',
    icon: Network,
    keyConceptsSummary: 'Network security protects data in transit across networks. Key concepts include firewalls (filtering traffic), VPNs (encrypting connections), IDS/IPS (detecting threats), and segmentation (isolating critical systems).',
    sections: [
      {
        id: 'firewall-basics',
        title: '1. Firewall Fundamentals',
        subsections: [
          {
            id: 'firewall-def',
            title: 'What is a Firewall?',
            content: 'A firewall is a network security device that monitors and controls incoming and outgoing network traffic based on predetermined security rules. It acts as a barrier between trusted internal networks and untrusted external networks.\n\nTypes of Firewalls:\n• Stateless Firewalls: Examine packets individually without tracking connections\n• Stateful Firewalls: Track active connections and make decisions based on state\n• Next-Generation Firewalls (NGFW): Inspect application layer traffic and use threat intelligence\n• Hardware Firewalls: Protect entire networks\n• Software Firewalls: Protect individual devices',
          },
          {
            id: 'firewall-rules',
            title: 'Firewall Rules & Policies',
            content: 'Firewall policies define how traffic is handled. Rules are processed in order (top-to-bottom) until a match is found.\n\nKey Concepts:\n• Allow Rules: Permit specific traffic\n• Deny Rules: Block specific traffic\n• Default Policy: Action taken when no rule matches (typically Deny)\n• Implicit Deny: All traffic denied unless explicitly allowed (best practice)\n• Logging: Recording matched rules for analysis and troubleshooting',
          },
          {
            id: 'firewall-types',
            title: 'Firewall Technologies',
            content: 'Packet Filtering: Examines source/destination IP, ports, and protocols. Fast but limited.\n\nApplication Layer Gateway: Inspects application data. Slower but more effective against application-level attacks.\n\nProxy Firewall: Intercepts connections. Can mask internal IPs and provide caching.\n\nZone-Based Firewalls: Policies based on network zones (Inside, Outside, DMZ) with different trust levels.',
          },
        ],
      },
      {
        id: 'vpn-security',
        title: '2. Virtual Private Networks (VPNs)',
        subsections: [
          {
            id: 'vpn-overview',
            title: 'VPN Basics',
            content: 'A Virtual Private Network (VPN) creates an encrypted tunnel through a public network, allowing secure remote access and site-to-site connectivity.\n\nVPN Benefits:\n• Encryption: Protects data from eavesdropping\n• Privacy: Hides IP address and location\n• Secure Remote Access: Connect from anywhere securely\n• Site-to-Site Connectivity: Connect multiple office locations\n• Bypass Restrictions: Access resources from different regions',
          },
          {
            id: 'vpn-types',
            title: 'Types of VPNs',
            content: 'Remote Access VPN: Users connect to corporate network from remote locations using VPN client software. Common in modern work environments for telecommuting.\n\nSite-to-Site VPN: Connects multiple office networks together. Two main types:\n• Router-to-Router VPN: Firewalls/routers encrypt tunnel\n• Host-to-Host VPN: End systems establish encrypted connections\n\nClient-to-Site VPN: Single user connects to network resources.',
          },
          {
            id: 'vpn-protocols',
            title: 'VPN Protocols',
            content: 'IPSec: Industry standard, operates at network layer (Layer 3). Two modes:\n• Tunnel Mode: Encrypts entire packet (site-to-site)\n• Transport Mode: Encrypts only payload (end-to-end)\n\nSSL/TLS VPN: Uses HTTPS (port 443). No client software needed, access via web browser.\n\nL2TP/IPSec: Layer 2 protocol, combined with IPSec for security.\n\nWireGuard: Modern, lightweight VPN protocol with smaller attack surface.',
          },
        ],
      },
      {
        id: 'ids-ips',
        title: '3. Intrusion Detection & Prevention',
        subsections: [
          {
            id: 'ids-basics',
            title: 'IDS vs IPS',
            content: 'Intrusion Detection System (IDS):\n• Monitors network traffic for malicious activity\n• Alerts administrators when threats detected\n• Passive - does not stop attacks\n• Deployment: Mirror/SPAN port on switch\n\nIntrusion Prevention System (IPS):\n• Detects AND blocks malicious activity\n• Takes action automatically (drop packets, reset connections)\n• Active - prevents attacks from succeeding\n• Deployment: In-line on network path',
          },
          {
            id: 'ids-detection',
            title: 'IDS Detection Methods',
            content: 'Signature-Based Detection:\n• Compares traffic against known attack signatures\n• Very effective against known threats\n• Cannot detect new/unknown attacks (zero-days)\n• Fast and low false positive rate\n\nAnomaly-Based Detection:\n• Learns normal baseline behavior\n• Alerts on deviations from baseline\n• Detects unknown attacks\n• High false positive rate initially\n• Requires training period',
          },
          {
            id: 'ids-systems',
            title: 'IDS/IPS Systems',
            content: 'Network IDS/IPS (NIDS/NIPS):\n• Monitors entire network segment\n• Examples: Snort, Suricata, Cisco IPS\n• Placed at network perimeter or critical segments\n\nHost IDS/IPS (HIDS/HIPS):\n• Monitors individual host/system\n• Can see application-level attacks\n• Resource intensive\n• Examples: Wazuh, Osquery',
          },
        ],
      },
      {
        id: 'network-segmentation',
        title: '4. Network Segmentation',
        subsections: [
          {
            id: 'segmentation-concept',
            title: 'Segmentation Principles',
            content: 'Network segmentation divides a network into smaller subnets (segments) to improve security and performance.\n\nBenefits:\n• Containment: Limits lateral movement of attackers\n• Reduced Attack Surface: Limits access to critical systems\n• Performance: Reduces congestion and improves speed\n• Compliance: Meets regulatory requirements for data isolation\n• Access Control: Easier to enforce policies between segments',
          },
          {
            id: 'dmz',
            title: 'DMZ (Demilitarized Zone)',
            content: 'A DMZ is a network segment with controlled access between internal network and internet.\n\nDMZ Characteristics:\n• Hosts public-facing servers (web, email, DNS)\n• Restricted access from internal network\n• No direct access to internal servers\n• Usually protected by dual firewalls\n\nTraffic Flow:\nInternet → Firewall 1 → DMZ → Firewall 2 → Internal Network\n\nIf DMZ server compromised, attacker still cannot easily access internal network.',
          },
          {
            id: 'vlan-segmentation',
            title: 'VLAN-Based Segmentation',
            content: 'Virtual LANs (VLANs) allow logical network segmentation on physical infrastructure.\n\nVLAN Benefits:\n• Cost-effective segmentation\n• Flexible network design\n• Easy to implement access control\n• Reduces broadcast domains\n\nCommon VLAN Design:\n• VLAN 1: Management\n• VLAN 10: Servers\n• VLAN 20: Workstations\n• VLAN 30: IoT/Printers\n• VLAN 100: Guest\n\nVLAN Trunking: Allows multiple VLANs over single link using 802.1Q tagging.',
          },
        ],
      },
    ],
  },
  {
    id: 'cryptography-encryption',
    title: 'Cryptography & Encryption',
    category: 'Cryptography',
    difficulty: 'Intermediate',
    description: 'Encryption algorithms, PKI, digital certificates, hashing, and secure communication protocols.',
    estimatedTime: '5 hours',
    icon: Key,
    keyConceptsSummary: 'Cryptography uses mathematical algorithms to protect data confidentiality, integrity, and authenticity. Includes symmetric encryption (same key), asymmetric encryption (public/private keys), and hashing (one-way functions).',
    sections: [
      {
        id: 'encryption-basics',
        title: '1. Encryption Fundamentals',
        subsections: [
          {
            id: 'symmetric-encryption',
            title: 'Symmetric Encryption',
            content: 'Symmetric encryption uses the SAME key for both encryption and decryption.\n\nCharacteristics:\n• Fast and efficient\n• Small key size (128, 256 bits)\n• Challenge: Key distribution and management\n• Suitable for bulk data encryption\n\nCommon Algorithms:\n• AES (Advanced Encryption Standard): 128, 192, or 256-bit keys. NIST standard. Used in SSL/TLS\n• DES (Data Encryption Standard): 56-bit key. DEPRECATED - no longer secure\n• 3DES: Triple DES, applies DES three times. Legacy system support\n• Blowfish: 64-bit block size, 32-448 bit key\n• ChaCha20: Modern stream cipher, used in TLS 1.3',
          },
          {
            id: 'asymmetric-encryption',
            title: 'Asymmetric Encryption',
            content: 'Asymmetric encryption uses a PUBLIC key (encrypt) and PRIVATE key (decrypt).\n\nCharacteristics:\n• Slower than symmetric encryption\n• Larger key sizes (2048, 4096 bits)\n• Solves key distribution problem\n• Used for key exchange and digital signatures\n\nCommon Algorithms:\n• RSA: Most widely used, based on factorization difficulty. 2048+ bits recommended\n• ECC (Elliptic Curve Cryptography): Smaller keys with equivalent security (256-bit ECC ≈ 3072-bit RSA)\n• Diffie-Hellman: Key exchange protocol, not encryption itself',
          },
          {
            id: 'encryption-modes',
            title: 'Encryption Modes',
            content: 'Block cipher modes determine how plaintext blocks are processed:\n\nECB (Electronic Codebook): Simple mode, same plaintext → same ciphertext. INSECURE - reveals patterns\n\nCBC (Cipher Block Chaining): Each block depends on previous. IV required. Secure but vulnerable to padding oracle attacks\n\nCTR (Counter): Converts block cipher to stream cipher. Parallelizable and secure\n\nGCM (Galois/Counter Mode): Provides encryption + authentication. Recommended for new systems\n\nCFB/OFB: Stream cipher modes, suitable for small data units',
          },
        ],
      },
      {
        id: 'hashing-integrity',
        title: '2. Hashing & Integrity',
        subsections: [
          {
            id: 'hash-functions',
            title: 'Hash Functions',
            content: 'Hash functions convert any input into fixed-size output (hash/digest).\n\nProperties:\n• One-way: Cannot reverse hash to get original data\n• Deterministic: Same input = same output\n• Avalanche Effect: Small input change = completely different hash\n• Collision Resistant: Two different inputs produce different hashes\n• Fast: Compute quickly\n\nApplications:\n• Data Integrity: Verify data hasn\'t changed\n• Password Storage: Store hashed passwords, not plaintext\n• Digital Signatures: Hash document then sign hash\n• Blockchain: Chain blocks together using hashes',
          },
          {
            id: 'hash-algorithms',
            title: 'Hash Algorithms',
            content: 'MD5 (Message Digest 5): 128-bit output. DEPRECATED - collisions found, insecure\n\nSHA-1 (Secure Hash Algorithm 1): 160-bit output. DEPRECATED - collisions demonstrated\n\nSHA-2 Family: SHA-256, SHA-384, SHA-512. Current standard, secure\n\nSHA-3: Latest standard, based on Keccak. Greater security margin than SHA-2\n\nBcrypt: Specifically designed for passwords with salt and iterations\n\nArgon2: Modern password hashing, memory-hard to resist GPU attacks',
          },
          {
            id: 'hmac',
            title: 'HMAC (Hash-based Message Authentication Code)',
            content: 'HMAC combines hash function with secret key to provide both authenticity and integrity.\n\nHow it works:\n• Combines message + secret key\n• Hash the combination\n• Receiver with same key can verify message wasn\'t tampered\n\nFormula: HMAC(K,M) = Hash((K⊕opad) || Hash((K⊕ipad) || M))\n\nCommon Use Cases:\n• API Authentication: HMAC header in API requests\n• Cookie Verification: Ensure cookies haven\'t been modified\n• Message Authentication in TLS: Verify message integrity\n• OAuth/JWT: Token validation',
          },
        ],
      },
      {
        id: 'pki-certificates',
        title: '3. Public Key Infrastructure (PKI)',
        subsections: [
          {
            id: 'pki-overview',
            title: 'PKI Concepts',
            content: 'Public Key Infrastructure manages digital certificates and public keys.\n\nPKI Components:\n• Certificate Authority (CA): Issues digital certificates\n• Registration Authority (RA): Verifies identities\n• Certificate Revocation List (CRL): List of revoked certificates\n• OCSP (Online Certificate Status Protocol): Real-time certificate status\n\nTrust Model:\n• Root CA: Self-signed, highest level of trust\n• Intermediate CA: Issued by Root CA\n• End-Entity Certificate: Issued to users/servers\n• Certificate Chain: Root → Intermediate → End-Entity',
          },
          {
            id: 'digital-certificates',
            title: 'Digital Certificates',
            content: 'Digital certificates bind public keys to identities using digital signatures.\n\nX.509 Certificate Contents:\n• Subject: Who the certificate is for (Common Name, Org, Country)\n• Issuer: Which CA issued it\n• Public Key: The actual public key\n• Serial Number: Unique identifier\n• Valid From/To: Validity period (typically 1-3 years)\n• Signature Algorithm: Algorithm used to sign\n• Extensions: Additional info (key usage, extended validation)\n\nCertificate Types:\n• DV (Domain Validation): Verify domain ownership. Cheap, quick\n• OV (Organization Validation): Verify organization identity. More trust\n• EV (Extended Validation): Rigorous verification. Green address bar (mostly removed now)',
          },
          {
            id: 'certificate-management',
            title: 'Certificate Management',
            content: 'Certificate Lifecycle:\n1. Generation: Create key pair\n2. Request: Submit CSR (Certificate Signing Request)\n3. Verification: CA verifies identity\n4. Issuance: CA signs and issues certificate\n5. Installation: Deploy on servers\n6. Renewal: Renew before expiry (usually 30-90 days)\n7. Revocation: If compromised or no longer needed\n\nCRL vs OCSP:\n• CRL: Large file, updated periodically, not real-time\n• OCSP: Real-time status, more current, but higher latency\n\nSelf-Signed Certificates:\n• Signed by themselves (not by CA)\n• No third-party trust\n• Useful for internal systems, testing, development\n• Browsers warn about self-signed certs',
          },
        ],
      },
      {
        id: 'secure-protocols',
        title: '4. Secure Communication Protocols',
        subsections: [
          {
            id: 'ssl-tls',
            title: 'SSL/TLS',
            content: 'SSL (Secure Sockets Layer) and TLS (Transport Layer Security) provide secure communication.\n\nHistory:\n• SSL 3.0: Original protocol (DEPRECATED)\n• TLS 1.0: Successor to SSL 3.0 (DEPRECATED)\n• TLS 1.1: Added protections (DEPRECATED)\n• TLS 1.2: Current standard, widely used\n• TLS 1.3: Latest, simplified handshake, faster\n\nTLS Handshake (simplified):\n1. Client Hello: Client offers cipher suites and TLS versions\n2. Server Hello: Server selects cipher suite and TLS version\n3. Certificate Exchange: Server sends certificate\n4. Key Exchange: Negotiate session key (RSA, DH, ECDH)\n5. Finished: Both sides verify handshake\n6. Data Encryption: All data encrypted with session key',
          },
          {
            id: 'ipsec-protocol',
            title: 'IPSec',
            content: 'IPSec (Internet Protocol Security) provides network-layer encryption and authentication.\n\nComponents:\n• IKE (Internet Key Exchange): Negotiates security parameters\n• ESP (Encapsulating Security Payload): Encrypts and authenticates packets\n• AH (Authentication Header): Authenticates only (less common)\n\nModes:\n• Transport Mode: Encrypts payload only (end-to-end)\n• Tunnel Mode: Encrypts entire IP packet (site-to-site VPN)\n\nAdvantages:\n• Network-layer protection (all applications benefit)\n• VPN capable\n• Perfect Forward Secrecy possible\n\nDisadvantages:\n• Complex configuration\n• Higher overhead than TLS\n• Slower than application-layer encryption',
          },
          {
            id: 'other-protocols',
            title: 'Other Security Protocols',
            content: 'SSH (Secure Shell): Remote login and data transfer. Uses asymmetric for auth, symmetric for data\n\nS/MIME: Email encryption using certificates\n\nPGP (Pretty Good Privacy): Email encryption, hybrid approach (asymmetric + symmetric)\n\nDTLS: DTLS is TLS for UDP (datagram)\n\nWireGuard: Modern VPN protocol, minimalist design, better performance\n\nQuic: New transport protocol with built-in encryption, 0-RTT resumption',
          },
        ],
      },
    ],
  },
  {
    id: 'threat-analysis',
    title: 'Threat Analysis & Assessment',
    category: 'Threat Intelligence',
    difficulty: 'Intermediate',
    description: 'Malware types, attack vectors, threat modeling, vulnerability assessment, and risk analysis.',
    estimatedTime: '6 hours',
    icon: AlertTriangle,
    keyConceptsSummary: 'Understanding threats involves identifying malware types, analyzing attack vectors, modeling potential threats, and assessing vulnerabilities. Critical for building effective defenses.',
    sections: [
      {
        id: 'malware-types',
        title: '1. Malware Types & Characteristics',
        subsections: [
          {
            id: 'malware-basics',
            title: 'Malware Categories',
            content: 'Malware is malicious software designed to cause harm.\n\nViruses:\n• Requires host program to execute\n• Spreads via file sharing, email, USB\n• Self-replicating\n• Payload: Steal data, corrupt files, display messages\n\nWorms:\n• Self-replicating without host\n• Exploits network vulnerabilities\n• Spreads automatically\n• Examples: Conficker, Stuxnet\n\nTrojans:\n• Appears legitimate, contains hidden malware\n• Requires user execution\n• Creates backdoor access\n• Examples: Zeus banking trojan\n\nRootkits:\n• Runs with system privileges\n• Hides from detection\n• Difficult to remove\n• Can compromise entire OS',
          },
          {
            id: 'advanced-malware',
            title: 'Advanced Malware',
            content: 'Ransomware:\n• Encrypts files/systems\n• Demands payment for decryption key\n• Examples: WannaCry, Ryuk\n• Prevention: Backups, patching, education\n\nAdware:\n• Displays unwanted advertisements\n• Can track user behavior\n• Often bundled with free software\n\nSpyware:\n• Secretly collects user information\n• Keyloggers, screen recorders\n• Violates privacy\n\nBotnet:\n• Infected computers (zombies) controlled remotely\n• Used for DDoS, spam, mining\n• Command and Control (C&C) infrastructure',
          },
          {
            id: 'detection-prevention',
            title: 'Malware Detection & Prevention',
            content: 'Signature-Based Detection:\n• Matches malware signatures in database\n• Effective for known malware\n• Cannot detect zero-days\n• Fast detection\n\nHeuristic Detection:\n• Analyzes behavior and code structure\n• Detects variants and unknown malware\n• More false positives\n• Slower than signature detection\n\nBehavioral Detection:\n• Monitors runtime behavior\n• Detects execution of malicious actions\n• Works on unknown malware\n• Can have false positives\n\nSandbox Analysis:\n• Execute in isolated environment\n• Observe behavior safely\n• Time-consuming but thorough',
          },
        ],
      },
      {
        id: 'attack-vectors',
        title: '2. Attack Vectors & Techniques',
        subsections: [
          {
            id: 'social-engineering',
            title: 'Social Engineering Attacks',
            content: 'Phishing:\n• Fraudulent emails/websites mimicking legitimate sources\n• Trick users to provide credentials\n• Largest attack vector\n• 90%+ of breaches start with phishing\n\nSpear Phishing:\n• Targeted at specific individuals\n• Personalized information used\n• Higher success rate\n• More effort but better results\n\nVishing (Voice Phishing):\n• Phishing via phone calls\n• Social engineer pretends to be authority\n• Request sensitive information\n\nPretexting:\n• Create false scenario to trick victim\n• Establish false credibility\n• Extract information or access\n\nBaiting:\n• Offer something enticing (USB, prize)\n• Contains malware\n• Exploits curiosity',
          },
          {
            id: 'network-attacks',
            title: 'Network-Based Attacks',
            content: 'DDoS (Distributed Denial of Service):\n• Overwhelm target with traffic from multiple sources\n• Botnet used to amplify attack\n• Prevents legitimate users from accessing service\n• Mitigation: Rate limiting, CDN, ISP filtering\n\nMan-in-the-Middle (MITM):\n• Intercept communication between two parties\n• Can eavesdrop or modify messages\n• SSL/TLS prevents this\n• ARP spoofing, DNS spoofing techniques\n\nDNS Poisoning:\n• Corrupt DNS cache with false mappings\n• Redirect to malicious sites\n• Affects all users with corrupted cache\n\nPassword Attacks:\n• Brute Force: Try all combinations\n• Dictionary Attack: Try common passwords\n• Rainbow Tables: Pre-computed hash tables\n• Credential Stuffing: Use leaked credentials elsewhere',
          },
          {
            id: 'exploitation',
            title: 'Exploitation Techniques',
            content: 'Zero-Day Exploits:\n• Attack unknown vulnerability (not patched)\n• Attacker has exclusive knowledge\n• Most dangerous\n• Usually sold on dark web\n\nSQL Injection:\n• Inject SQL code into input fields\n• Bypass authentication\n• Steal/modify database data\n• Prevention: Input validation, parameterized queries\n\nXSS (Cross-Site Scripting):\n• Inject malicious scripts into web pages\n• Stored XSS: Permanently stored\n• Reflected XSS: Reflected in URL/request\n• Prevention: Input sanitization, CSP headers\n\nBuffer Overflow:\n• Overflow buffer to overwrite memory\n• Execute arbitrary code\n• ASLR and DEP mitigations reduce risk',
          },
        ],
      },
      {
        id: 'threat-modeling',
        title: '3. Threat Modeling',
        subsections: [
          {
            id: 'threat-models',
            title: 'Threat Modeling Approaches',
            content: 'STRIDE (Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, Elevation of Privilege):\n• Identify threats in each category\n• Systematic approach\n• Good for comprehensive analysis\n\nATT&CK Framework:\n• Matrix of adversary tactics and techniques\n• Based on real attack observations\n• Excellent for threat hunting\n• Used by security professionals globally\n\nKill Chain:\n• Identifies attack stages: Reconnaissance, Weaponization, Delivery, Exploitation, Installation, Command & Control, Actions\n• Helps understand attack progression\n• Identify defensive opportunities',
          },
          {
            id: 'threat-assessment',
            title: 'Threat Assessment Process',
            content: 'Asset Identification:\n• Identify valuable assets\n• Data, systems, applications\n• Criticality rating\n\nThreat Identification:\n• What threats could affect assets?\n• Internal and external threats\n• Intentional and accidental\n\nVulnerability Analysis:\n• What weaknesses exist?\n• Could be in people, processes, or technology\n• Severity assessment\n\nRisk Calculation:\n• Risk = Threat × Vulnerability × Asset Value\n• Prioritize remediation efforts\n• Resource allocation',
          },
          {
            id: 'threat-intelligence',
            title: 'Threat Intelligence',
            content: 'Types of Intelligence:\n• Strategic: Long-term trends, industry impacts\n• Tactical: Specific attack techniques, IOCs\n• Operational: Immediate threat information\n\nData Sources:\n• Open Source Intelligence (OSINT)\n• Dark web monitoring\n• Threat feeds (Shodan, AlienVault OTX)\n• Information sharing organizations\n\nIntelligence-Driven Defense:\n• Use threat intelligence to inform defense strategy\n• Prioritize based on likely threats\n• Continuous improvement\n• Stay ahead of attackers',
          },
        ],
      },
      {
        id: 'vulnerability-assessment',
        title: '4. Vulnerability Assessment & Scanning',
        subsections: [
          {
            id: 'vulnerability-scanning',
            title: 'Vulnerability Scanning',
            content: 'Automated Tools:\n• Nessus: Industry standard, comprehensive\n• OpenVAS: Open source alternative\n• Qualys: Cloud-based scanning\n• Rapid7 Nexpose/InsightVM\n\nScan Types:\n• Credentialed Scan: With system access (more thorough)\n• Non-Credentialed Scan: Without access (realistic external view)\n• Web Application Scan: Specific to web apps\n• Compliance Scan: Check against standards (PCI-DSS, HIPAA)\n\nFalse Positives:\n• Scanning reports vulnerabilities that don\'t actually exist\n• Require manual verification\n• Create "alert fatigue" if ignored\n• Prioritize critical/high severity',
          },
          {
            id: 'penetration-testing',
            title: 'Penetration Testing',
            content: 'Process:\n1. Reconnaissance: Gather information\n2. Scanning: Identify open ports/services\n3. Enumeration: Identify usernames, shares, services\n4. Exploitation: Attempt to gain access\n5. Post-Exploitation: Maintain access, gather data\n6. Reporting: Document findings and recommendations\n\nScope Definition:\n• White Box: Attacker has full information\n• Gray Box: Limited information\n• Black Box: No information (most realistic)\n• Rules of Engagement: What is/isn\'t allowed\n• Legal Authorization: Written permission required!\n\nTools:\n• Metasploit: Exploitation framework\n• Burp Suite: Web application testing\n• Kali Linux: Penetration testing distribution',
          },
          {
            id: 'remediation',
            title: 'Vulnerability Remediation',
            content: 'Prioritization:\n• Risk Rating: CVSS score × Asset criticality\n• Exploitability: How easy to exploit\n• Impact: What damage would occur\n• Compensating Controls: Existing mitigations\n\nRemediation Strategies:\n• Patching: Update software\n• Configuration: Change settings\n• Compensating: Implement controls (WAF, monitoring)\n• Decommission: Remove if not needed\n• Accept: If cost of fix > risk\n\nTracking:\n• SLA for remediation (e.g., Critical: 24 hours)\n• Verification that fix worked\n• Regression testing\n• Documentation for audit',
          },
        ],
      },
    ],
  },
  {
    id: 'identity-access-management',
    title: 'Identity & Access Management',
    category: 'IAM',
    difficulty: 'Intermediate',
    description: 'Authentication methods, authorization models, MFA, SSO, LDAP, and privilege management.',
    estimatedTime: '4 hours',
    icon: Users,
    keyConceptsSummary: 'IAM manages who can access what resources. Involves authentication (verifying identity), authorization (granting permissions), and access control (enforcing policies).',
    sections: [
      {
        id: 'authentication',
        title: '1. Authentication Methods',
        subsections: [
          {
            id: 'password-auth',
            title: 'Password Authentication',
            content: 'Something You Know: Password\n• Most common method\n• Weak: Many users choose weak passwords\n• Subject to: Brute force, dictionary attacks, credential stuffing\n• Phishing vulnerable\n\nPassword Security Best Practices:\n• Minimum length: 12+ characters\n• Complexity: Mix of cases, numbers, symbols\n• No dictionary words\n• No personal information\n• Unique per system\n• Changed regularly (controversial - NIST now recommends not forcing change)\n• Not reused\n\nPassword Storage:\n• NEVER store plaintext\n• Hash with salt: Hash(password + random salt)\n• Slow hashes: bcrypt, Argon2 (resist GPU attacks)\n• Iteration count: Higher = slower but more secure',
          },
          {
            id: 'mfa-biometric',
            title: 'Multi-Factor Authentication (MFA)',
            content: 'Something You Know: Password\n• Knowledge-based (easiest to compromise)\n\nSomething You Have: Token/Device\n• Hardware token (RSA SecurID)\n• Mobile app (Google Authenticator, Duo)\n• SMS code (weakest form - SIM swapping)\n• Email code\n\nSomething You Are: Biometric\n• Fingerprint (FTS devices, phones)\n• Facial recognition (FaceID, FaceTime)\n• Iris scan\n• Voice recognition\n• Unique and hard to fake\n\nSomewhere You Are: Location\n• GPS location\n• IP address\n• Time zone\n\nBest Practices:\n• Combine different factors\n• Not two of same factor type (password + answer = 1 factor)\n• 2FA minimum (2 factors)\n• MFA (2+ factors) recommended',
          },
          {
            id: 'sso-federation',
            title: 'Single Sign-On (SSO)',
            content: 'SSO Concept:\n• Authenticate once, access multiple systems\n• Improves user experience\n• Central authentication\n• Examples: Microsoft Entra ID, Okta, Google Workspace\n\nSSO Protocols:\n• SAML 2.0: XML-based, enterprise standard\n  - Assertion: Claims about user identity\n  - Service Provider (SP): Application needing auth\n  - Identity Provider (IdP): Authenticates user\n  - XML signed and encrypted\n\n• OAuth 2.0: API authorization, not authentication\n  - Delegate access without sharing password\n  - Used for "Login with Google/Facebook"\n  - Access tokens, refresh tokens\n\n• OpenID Connect: OAuth 2.0 + authentication\n  - Adds identity layer to OAuth\n  - ID tokens, UserInfo endpoint\n  - Combines benefits of both',
          },
        ],
      },
      {
        id: 'authorization',
        title: '2. Authorization & Access Control',
        subsections: [
          {
            id: 'access-control-models',
            title: 'Access Control Models',
            content: 'DAC (Discretionary Access Control):\n• Owner controls access to resources\n• User can grant/revoke permissions\n• Flexible but less secure\n• File systems (Windows, Linux)\n• User can share file with others\n\nMAC (Mandatory Access Control):\n• Central policy defines access\n• Users cannot change permissions\n• Very restrictive\n• Military/government systems\n• Example: SELinux\n\nRBAC (Role-Based Access Control):\n• Users assigned to roles\n• Roles have permissions\n• Easier to manage\n• Enterprise systems\n• Example: Admin role → Read/Write/Delete\n\nABAC (Attribute-Based Access Control):\n• Access based on attributes\n• More granular than RBAC\n• Attributes: User (department), Resource (classification), Environment (time, location)\n• Example: (Department=Finance AND Classification=Confidential AND Time=BusinessHours)',
          },
          {
            id: 'privilege-management',
            title: 'Privilege Escalation Prevention',
            content: 'Vertical Escalation:\n• Non-admin gains admin rights\n• More common\n• Example: Buffer overflow to gain root\n• Prevention: Input validation, DEP/ASLR, least privilege\n\nHorizontal Escalation:\n• Access another user\'s data at same privilege level\n• Example: One customer views another\'s data\n• Prevention: Proper authorization checks\n\nLeast Privilege Principle:\n• Users get minimum permissions needed\n• Reduces damage if account compromised\n• Regular access reviews\n• Remove unnecessary permissions\n\nSeperation of Duties:\n• Different users do different steps\n• Prevents fraud\n• Example: One approves purchase, another pays\n• Prevents single person from unauthorized actions',
          },
          {
            id: 'access-control-lists',
            title: 'Access Control Lists (ACLs)',
            content: 'ACL Components:\n• Subject: Who (user, group, process)\n• Object: What (file, printer, network resource)\n• Permissions: What can be done (Read, Write, Execute, Delete)\n• Scope: Where applies (this object only or children)\n\nNetwork ACLs:\n• Control traffic between networks\n• Source/Destination IP\n• Port/Protocol\n• Allow/Deny action\n• Usually deny by default\n• Order matters (first match wins)\n\nFile System ACLs:\n• Control file access\n• Explicit Allow/Deny entries\n• Inherited from parent folders\n• Can override inheritance\n• More powerful than permissions (R, W, X)\n\nBest Practices:\n• Review regularly\n• Remove old/unused entries\n• Group permissions when possible\n• Document reasons for access\n• Audit changes',
          },
        ],
      },
      {
        id: 'directory-services',
        title: '3. Directory Services',
        subsections: [
          {
            id: 'ldap',
            title: 'LDAP (Lightweight Directory Access Protocol)',
            content: 'LDAP Basics:\n• Network protocol for accessing directory services\n• Central repository of user and resource info\n• Hierarchical structure (tree)\n• Distinguished Names (DN): cn=user,ou=sales,dc=example,dc=com\n\nLDAP Operations:\n• Bind: Authenticate to directory\n• Search: Query directory\n• Add/Delete/Modify: CRUD operations\n• Unbind: Close connection\n\nLDAP Uses:\n• User authentication (many systems support LDAP)\n• Address books\n• Employee directories\n• Printer access control\n• Phone system integration\n\nLDAP Security:\n• StartTLS: Encrypt connection\n• Simple Bind: Username/password\n• SASL: More secure authentication\n• ACLs: Control who can read/modify',
          },
          {
            id: 'active-directory',
            title: 'Active Directory (AD)',
            content: 'What is AD:\n• Microsoft\'s implementation of directory services\n• Central management of users, computers, resources\n• Integrated with Windows\n• Enterprise standard\n\nAD Components:\n• Domain: Group of computers sharing trust\n• Forest: Collection of domains\n• Organizational Unit (OU): Hierarchical containers\n• Group Policy: Apply settings to users/computers\n• Domain Controller: Hosts AD database\n\nAD Security Features:\n• Kerberos: Authentication protocol\n• Group Policies: Centralized config\n• Fine-grained password policies\n• Audit logging\n• Delegation: Limit admin rights\n\nAD Attacks:\n• Credential harvesting from LSASS memory\n• Golden Ticket: Forge Kerberos ticket\n• Kerberoasting: Crack service account passwords\n• Pass-the-Hash: Use NTLM hash to authenticate\n• Mitigation: MFA, privilege limiting, monitoring',
          },
          {
            id: 'identity-federation',
            title: 'Identity Federation',
            content: 'Federation Concept:\n• Trust relationship between organizations\n• One IdP authenticates for multiple SPs\n• Enables single identity across domains\n• Cross-organization collaboration\n\nFederation Components:\n• Identity Provider (IdP): Authenticates users\n• Service Provider (SP): Offers service\n• Trust Relationship: Agreement between IdP and SP\n• Federation Metadata: Technical details\n\nUse Cases:\n• B2B collaborations\n• Cloud service SSO\n• Multi-company mergers\n• Government systems\n• Academic institutions (Shibboleth)\n\nSecurity Considerations:\n• Verify Federation Metadata\n• Certificate validation\n• Attribute encryption\n• Audit federation events\n• Principle of least trust',
          },
        ],
      },
      {
        id: 'account-management',
        title: '4. Account Management & Lifecycle',
        subsections: [
          {
            id: 'account-provisioning',
            title: 'Account Provisioning & Deprovisioning',
            content: 'Provisioning (Creating Accounts):\n• User needs access to systems\n• Create accounts, assign permissions\n• Usually manual or workflow-based\n• Automation: Identity governance systems\n\nDeprovisioning (Removing Access):\n• User leaves company/role\n• Remove accounts and permissions\n• Often overlooked, security risk\n• Should be immediate upon termination\n• Offboarding checklist: Email, VPN, systems, physical access\n\nAccessibility Management:\n• Periodic Access Reviews: Ensure users still need access\n• Principle of Least Privilege: Remove unnecessary access\n• Ownership: Managers verify their team\'s access\n• Compliance: Regulatory requirements (SOX, HIPAA)\n\nAutomation Benefits:\n• Faster provisioning\n• Consistent application\n• Audit trail\n• Reduces human error',
          },
          {
            id: 'password-management',
            title: 'Password Management',
            content: 'Password Managers:\n• Encrypted storage of passwords\n• Generate strong random passwords\n• Auto-fill passwords\n• Reduces password reuse\n• Examples: 1Password, LastPass, Bitwarden\n\nEnterprise Solutions:\n• Privileged Access Management (PAM)\n• Rotate passwords automatically\n• Shared account credentials\n• Audit access to credentials\n• Examples: CyberArk, HashiCorp Vault\n\nPassword Synchronization:\n• Same password across systems\n• Not recommended (if one compromised, all are)\n• Better: Unique strong passwords\n• Use password manager instead\n\nPassword Reset:\n• User forgets password\n• Security questions (weak, personal info findable)\n• Email verification (better)\n• MFA confirmation (best)\n• Admin reset (verify identity first)\n• Avoid: Knowledge-based questions alone',
          },
          {
            id: 'privilege-elevation',
            title: 'Privileged Access Management (PAM)',
            content: 'What is PAM:\n• Control and monitor privileged accounts\n• Track who used what credentials and when\n• Reduce standing privileges\n• Minimize damage if account compromised\n\nCore Functions:\n• Just-in-Time (JIT) Access: Grant temporary elevated access\n• Just-Enough-Privilege (JEP): Grant minimal permissions needed\n• Session Recording: Record admin activities\n• MFA for Privilege: Require MFA for admin access\n• Password Vault: Secure storage of service accounts\n\nImplementation:\n• Dedicated admin accounts (separate from regular accounts)\n• Separate admin workstations (clean devices)\n• Time-limited admin access\n• Frequent password rotation\n• Audit and alert on privilege use\n\nBest Practices:\n• No shared credentials\n• Service accounts for automation\n• Separate roles (change mgmt vs read-only)\n• Sunset unused accounts\n• Regular reviews of admin access',
          },
        ],
      },
    ],
  },
];

