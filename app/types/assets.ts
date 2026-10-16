import {
  Home,
  BookOpen,
  BarChart3,
  FileText,
  CreditCard,
  User,
  TrendingUp,
  ArrowUp,
  CheckCircle,
  Trophy,
  Lock,
  Zap,
  Terminal,
  Shield,
  Network,
  Key,
  AlertTriangle,
  ShieldCheck,
  Users,
  Brain,
  Database,
  Search,
  Wrench,
  Crosshair,
  Workflow,
  Bot,
  ListOrdered,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface NavLink {
  href: string;
  label: string;
  icon: LucideIcon;
}

export const navLinks: NavLink[] = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/practice-exam", label: "Practice Exam", icon: BookOpen },
  { href: "/study-notes", label: "Study Notes", icon: BarChart3 },
  { href: "/attempts", label: "Attempts", icon: FileText },
  { href: "/pricing-billing", label: "Pricing & Billing", icon: CreditCard },
];

export const images = {
  logo: "/logo.png",
  logo2: "/TechTree Studies Network Logo.png",
  smallLogo: "/Magenta Purple Circuit Tree.png",
};

export const profile = {
  name: "Sarah Jenkins",
  candidateId: "#1",
  icon: User,
  surname: 'trevor_vance',
  email: 'trevor.vance@university.edu',
  person: "/user.png"
};

export const metrics = {
  examsTaken: {
    value: 14,
    label: "Exams Taken",
    icon: TrendingUp,
    change: "+3",
    changeLabel: "completed this week",
  },
  averageScore: {
    value: 782,
    maxValue: 900,
    label: "Average Score",
    icon: BarChart3,
    change: "+42 pts",
    changeLabel: "vs initial diagnostic baseline",
  },
  bestScore: {
    value: 840,
    maxValue: 900,
    label: "Best Score",
    icon: Trophy,
  },
  passRate: {
    value: "85.7%",
    label: "Pass Rate",
    icon: CheckCircle,
    detail: "12 of 14 passed",
    cutScore: "750 cut score",
  },
  certification: {
    name: "CompTIA Security+",
    accuracy: "93.3%",
    accuracyLabel: "accuracy",
  },
};

export const examAttempts = [
  {
    id: 1,
    examName: "CompTIA Security+",
    examNumber: "SY0-701",
    date: "May 19, 2025",
    time: "12:45 PM",
    score: 782,
    maxScore: 900,
    result: "PASS",
    duration: "1 hr 15 min",
    status: "pass",
  },
  {
    id: 2,
    examName: "CompTIA Security+",
    examNumber: "SY0-601",
    date: "May 19, 2025",
    time: "9:30 AM",
    score: 791,
    maxScore: 900,
    result: "FAIL",
    duration: "1 hr 45 min",
    status: "fail",
  },
];

export interface PracticeExam {
  id: string;
  code: string;
  level: "Foundational" | "Associate" | "Professional";
  title: string;
  description: string;
  access: "Free" | "Pro";
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
    id: "sy0-701-core",
    code: "SY0-701",
    level: "Associate",
    title: "CompTIA Security+ SY0-701 Practice Exam",
    description:
      "Validate network hardening, host monitoring, zero-trust cryptographic implementations, and standard incident remediation.",
    access: "Free",
    items: 50,
    timeCap: 90,
    targetPass: 750,
    maxScore: 900,
    domains: [
      "Threats & Attacks",
      "Cryptography",
      "Identity & Access",
      "Risk Management",
    ],
    icon: CheckCircle,
    features: ["verified", "Simulated Pearson CBT"],
  },
  {
    id: "sy0-701-threats",
    code: "SY0-701",
    level: "Associate",
    title: "Security+ Threat Detection Assessment",
    description:
      "Focus on malware analysis, social engineering attacks, cloud threats, and security monitoring practices.",
    access: "Pro",
    items: 80,
    timeCap: 100,
    targetPass: 750,
    maxScore: 900,
    domains: [
      "Threat Intelligence",
      "Attack Vectors",
      "Monitoring",
      "Incident Response",
    ],
    icon: CheckCircle,
    features: ["adaptive questions", "performance analytics"],
  },
  {
    id: "sy0-701-crypto",
    code: "SY0-701",
    level: "Associate",
    title: "Security+ Cryptography Challenge",
    description:
      "Test encryption standards, PKI concepts, certificate management, and secure communications.",
    access: "Pro",
    items: 65,
    timeCap: 85,
    targetPass: 750,
    maxScore: 900,
    domains: ["Cryptography", "PKI", "Certificates", "Secure Protocols"],
    icon: CheckCircle,
    features: ["exam-ready", "detailed explanations"],
  },
  {
    id: "sy0-701-iam",
    code: "SY0-701",
    level: "Associate",
    title: "Security+ Identity & Access Control Exam",
    description:
      "Measure knowledge of authentication methods, authorization models, MFA, and privilege management.",
    access: "Pro",
    items: 75,
    timeCap: 95,
    targetPass: 750,
    maxScore: 900,
    domains: [
      "Identity Management",
      "Access Control",
      "Federation",
      "Authentication",
    ],
    icon: CheckCircle,
    features: ["PBQs included", "exam simulation"],
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
    id: "personal",
    tier: "PERSONAL",
    name: "Personal",
    description:
      "Perfect for individuals starting their certification journey.",
    price: "R0",
    billing: "/ month",
    features: [
      "Standard Dummy Text: There are many variations of Lorem ipsum available",
      "Randomised Words: Which don't look even slightly unbelievable",
      "Free Event Passes",
    ],
    buttonLabel: "SUBSCRIBE",
    buttonAction: "subscribe",
  },
  {
    id: "team",
    tier: "TEAM",
    name: "Team",
    description:
      "Ideal for small teams and collaborative learning.",
    price: "R300",
    billing: "/ month",
    isPopular: true,
    features: [
      "All benefits of Personal: There are many variations of Lorem ipsum available",
      "Various Versions: All the Lorem ipsum generators on the internet",
      "Unlimited Storage",
    ],
    buttonLabel: "SUBSCRIBE",
    buttonAction: "subscribe",
  },
  {
    id: "corporate",
    tier: "CORPORATE",
    name: "Corporate",
    description:
      "Enterprise solution for large organizations.",
    price: "R600",
    billing: "/ month",
    features: [
      "All benefits of Team: There are many variations of Lorem ipsum available",
      "Sentence Structures: Making this the first true generator on the internet",
      "Lifetime Access to all the content",
    ],
    buttonLabel: "SUBSCRIBE",
    buttonAction: "subscribe",
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
  access: "Free" | "Premium";
  icon: LucideIcon;
  estimatedTime: string;
  sections?: NoteSection[];
  quickReview?: string[];
  glossary?: GlossaryItem[];
}

export const studyNotes: StudyNote[] = [
  {
    id: "domain-1-1",
    title: "System & Network Architecture",
    domain: "Domain 1.0",
    domainName: "System & Network Architecture",
    module: "1.1",
    moduleName: "System and Network Architecture",
    description:
      "Logging, operating systems, Infrastructure Architecture, device management, zero trust, identity and access management, encryption, data protection and critical infrastructure.",
    lastUpdated: "Oct 9, 2026",
    access: "Free",
    icon: Network,
    estimatedTime: "1.4 hours",
    sections: [
      {
        heading: "Logging Concepts",
        points: [
          "Ingestion: The process of collecting logs from devices, applications, and systems and sending them to a central location for monitoring and analysis.",
          "Configuration: Setting up logging options such as what events to record, log levels, and where logs should be stored.",
          "Integrity and Security: Ensuring logs cannot be altered, deleted, or accessed by unauthorized users.",
          "Time Synchronization: Keeping all systems on the same accurate time source so log timestamps can be correlated correctly.",
          "Retention: Defining how long logs are kept before they are archived or deleted to meet business and compliance requirements.",
        ],
        remember:
          "Think of logs like a security camera system: collect the footage (ingestion), choose what to record (configuration), lock the tapes away (integrity), stamp the right time (time sync), and keep the tapes long enough (retention).",
        examTip:
          "Match the problem to the keyword. Events out of order or timelines will not line up = time synchronization (NTP). Logs deleted or changed by an attacker = integrity (send logs off-host). Needed for an audit or old investigation = retention.",
      },
      {
        heading: "Operating System Concepts",
        points: [
          "System Hardening: Reducing security risks by disabling unnecessary services, applying patches, and securing configurations.",
          "File Structure: The way files and directories are organized within an operating system.",
          "Critical Files: Important system files required for the operating system or applications to function properly.",
          "System Processes: Running programs and background services that perform tasks within the operating system.",
        ],
        remember:
          "Think of an OS as a house. Hardening = locking the doors and windows. File structure = the floor plan. Critical files = the safe. Processes = the people inside. You need to know who normally lives there to spot the intruder.",
        examTip:
          "Spot the fake using three checks: wrong name (svch0st.exe), wrong location (a system process running from the Temp folder), or wrong parent (Word launching PowerShell). Any one of these = suspicious.",
      },
      {
        heading: "Infrastructure/System Architecture Concepts",
        points: [
          "Cloud Native: Applications designed specifically to run efficiently in cloud environments using cloud services.",
          "Virtualization: Technology that allows multiple virtual machines to run on a single physical computer.",
          "Containerization: Packaging applications and their dependencies into lightweight containers for consistent deployment.",
          "Application Programming Interfaces (APIs): Mechanisms that allow different software applications to communicate and exchange data.",
        ],
        remember:
          "VM = a separate house with its own foundation (own OS). Container = an apartment in a shared building (shared kernel). Cloud native = built for the cloud from day one. API = the waiter carrying requests between you and the kitchen.",
        examTip:
          "Question asks about stronger isolation? Pick VMs. Lighter and faster but shares the kernel? Pick containers. Leaked API key or an API with no authentication? That is an API security problem, so look for answers with strong auth, rate limiting, and an API gateway.",
      },
      {
        heading: "Device Management Concepts",
        points: [
          "Mobile: Managing and securing smartphones, tablets, and other portable devices used by an organization.",
          "Endpoint: Any device connected to a network, such as laptops, desktops, servers, or mobile devices, that requires protection.",
        ],
        remember:
          "Phones = MDM (manage them: lock, encrypt, wipe). Computers = EDR (watch them: detect, isolate). Mobile gets MDM, endpoints get EDR.",
        examTip:
          "Lost or stolen phone = remote wipe through MDM. Suspicious behavior on a laptop or server = use EDR to investigate and isolate the host.",
      },
      {
        heading: "Network Architecture Concepts",
        points: [
          "Zero Trust Network Architecture (ZTNA): A security model that assumes no user or device is trusted by default and requires continuous verification.",
          "Secure Access Service Edge (SASE): A cloud-based architecture that combines networking and security services into a single platform.",
          "Hybrid Cloud: An environment that combines on-premises infrastructure with public and/or private cloud services.",
        ],
        remember:
          "Zero Trust = a guard checks your ID at every door, not just the front gate. SASE = networking and security delivered from the cloud as one package. Hybrid = part of your setup in your own building, part in the cloud.",
        examTip:
          'Watch for keywords. "Never trust, always verify" or "microsegmentation" = Zero Trust. Remote workers or branch offices needing the same security everywhere = SASE. Mix of data center and cloud = Hybrid Cloud.',
      },
      {
        heading: "Identity and Access Management (IAM)",
        points: [
          "Privileged Access Management (PAM): Controls and monitors accounts with elevated permissions to reduce the risk of misuse.",
          "Authentication and Authorization Methods: Authentication verifies a user's identity, while authorization determines what resources they can access.",
          "Secrets Management: Securely storing and controlling sensitive information such as passwords, API keys, and encryption keys.",
        ],
        remember:
          'AuthN = "Who are you?" (prove it). AuthZ = "What can you do?" (your permissions). PAM = a bodyguard for admin accounts. Secrets = kept in a vault, never written in code.',
        examTip:
          "Password or API key found in a GitHub repo or script = secrets management (use a vault and rotate the key). Admin account being misused = PAM (just-in-time access, session recording). Logging in is authentication; what you can open afterward is authorization.",
      },
      {
        heading: "Encryption Techniques",
        points: [
          "Encryption Techniques: Methods used to convert readable data into unreadable ciphertext to protect it from unauthorized access.",
          "Symmetric encryption uses one shared key for speed (AES).",
          "Asymmetric encryption uses public and private key pairs (RSA, ECC).",
          "Hashing creates a one-way fingerprint for integrity (SHA-256).",
        ],
        remember:
          "Symmetric = one key, like a house key you copy for a friend. Asymmetric = a public padlock anyone can snap shut, but only your private key opens it. Hash = a fingerprint, it can never be turned back into the original.",
        examTip:
          'Match the need to the type. Encrypt lots of data quickly = symmetric (AES). Exchange keys or sign something = asymmetric (RSA). Prove a file was not changed = hash (SHA-256). If an answer says "decrypt a hash," it is wrong.',
      },
      {
        heading: "Data Protection Concepts",
        points: [
          "Data Protection Concepts: Strategies and controls used to ensure data confidentiality, integrity, availability, and privacy.",
          "Classification helps prioritize protection: public, internal, confidential, restricted.",
          "DLP tools detect and prevent unauthorized data movement.",
          "Masking and tokenization hide sensitive values from users who should not see them.",
        ],
        remember:
          "Label it, lock it, watch it. You cannot protect data you have not classified. Masking = blur the real value. Tokenization = swap it for a harmless stand-in.",
        examTip:
          "Sensitive data leaving through email, USB, or cloud uploads = DLP. Deciding how strongly to protect something = classification. Developers need realistic test data without exposing real customer values = masking or tokenization.",
      },
      {
        heading: "Critical Infrastructure Concepts",
        points: [
          "Operational Technology (OT): Hardware and software used to monitor and control physical industrial equipment and processes.",
          "Industrial Control System (ICS): Systems used to automate and manage industrial operations such as manufacturing and power generation.",
          "Supervisory Control and Data Acquisition (SCADA): A type of ICS that collects data from remote devices and provides centralized monitoring and control.",
        ],
        remember:
          "OT is the big umbrella, ICS sits under it, and SCADA is an ICS that watches over remote sites. In OT, safety and uptime beat everything, because a patch that crashes a power plant is worse than a delay.",
        examTip:
          "Water, power, or factory scenario? Think availability first. Safe answers: segment OT from IT and monitor passively. Be wary of answers that suggest active scanning, rebooting, or rushing patches on live OT systems.",
      },
    ],
  },
  {
    id: "domain-1-2",
    title: "Analyzing Indicators of Malicious Activity",
    domain: "Domain 1.0",
    domainName: "Security Operations",
    module: "1.2",
    moduleName: "Indicators of Malicious Activity",
    description:
      "Network, host, application, cloud, identity and email indicators, plus social engineering tricks like typosquatting and business email compromise.",
    lastUpdated: "Oct 9, 2026",
    access: "Free",
    icon: Search,
    estimatedTime: "1.3 hours",
    sections: [
      {
        heading: "Network-related indicators",
        points: [
          "Rogue devices: Unauthorized devices connected to the network that could be used to steal data, spread malware, or gain unauthorized access.",
          "Enumeration: An attacker gathers information about systems, users, ports, or services to identify potential targets and vulnerabilities.",
          "Anomalous activity: Unusual network behavior, such as unexpected traffic spikes or connections, that may indicate an attack.",
          "Activity on unexpected ports: Network communication occurring on ports not normally used by the organization, which could indicate malware or unauthorized services.",
        ],
        remember:
          "Think of a burglar casing a neighborhood. Enumeration = knocking on every door and checking every window. Rogue device = a stranger who slipped inside the gate. Unexpected port = a back door nobody knew existed. Knowing your normal traffic is how you spot the abnormal.",
        examTip:
          "Match the clue to the indicator. One host trying many ports or many hosts quickly = enumeration (scanning). An unknown MAC address or device on the network = rogue device. Connections at regular intervals to an outside IP = beaconing (C2). A service running on a strange port (like SSH on 443) = unexpected port activity.",
      },
      {
        heading: "Host-related indicators",
        points: [
          "Resource consumption: Excessive CPU, memory, disk, or network usage that may indicate malware, cryptomining, or unauthorized processes.",
          "Unauthorized software: Programs installed without approval that may introduce security risks or malware.",
          "Anomalous activity: Unusual system behavior such as unexpected crashes, slow performance, or strange user actions that may indicate compromise.",
          "Suspicious or rogue processes: Unknown or unauthorized processes running on a system that could be malicious or performing unauthorized actions.",
          "Living Off the Land Binaries (LOLBins) and Scripts: Attackers abuse legitimate system tools such as PowerShell, cmd, or Windows utilities to avoid detection.",
          "File system changes: Unexpected creation, deletion, modification, or encryption of files that may indicate malware activity.",
          "Data exfiltration: Unauthorized transfer of sensitive data from a system to an external location controlled by an attacker.",
          "Unauthorized configuration: Security settings, permissions, or system configurations changed without approval, potentially weakening security controls.",
        ],
        remember:
          'Think of a thief who uses the house\'s own tools. LOLBins = a burglar using your own ladder and crowbar, so nothing looks "foreign." Exfiltration = carrying the valuables out the door. Resource spike = the lights and meter running hot when nobody is home.',
        examTip:
          "Spot the keyword. Unexplained high CPU with no user activity = cryptominer. PowerShell with -enc or a hidden window, or certutil/mshta/rundll32 used oddly = LOLBins. Mass file renames or new file extensions = ransomware. Large archive created then a big outbound upload = data exfiltration. AV or firewall suddenly turned off = unauthorized configuration.",
      },
      {
        heading: "Application-related indicators",
        points: [
          "Service disruption: An application becomes unavailable or performs poorly due to attacks such as DoS, malware, or unauthorized changes.",
          "Anomalous activity: Unexpected application behavior, errors, or transactions that may indicate compromise or abuse.",
        ],
        remember:
          "Think of a shop. Service disruption = the doors are jammed shut with customers locked out. Anomalous activity = the cash register doing things nobody told it to do, like odd refunds at 3 AM.",
        examTip:
          "App suddenly slow or down, with a flood of requests = DoS. Strange errors, odd database queries, or unexpected input in the logs = injection attempt (SQLi or XSS). A new or unknown account created inside the app, or an unusual spike in API calls = application anomaly, so check the app logs first.",
      },
      {
        heading: "Cloud-related indicators",
        points: [
          "Anomalous activity: Unusual cloud actions such as unexpected logins, resource creation, or changes in usage patterns that may indicate compromise.",
          "Resource compromise: Cloud resources such as virtual machines, storage, or databases being accessed or controlled by unauthorized users.",
        ],
        remember:
          "Think of a company credit card for the cloud. If someone steals it, you see strange purchases: servers in countries you never use, and a bill that suddenly jumps. The bill and the audit log tell on the thief.",
        examTip:
          "Unexpected VMs in a new region plus a huge cost spike = cryptomining on compromised cloud resources. Storage bucket suddenly public = misconfiguration or compromise. Logs showing API calls with leaked access keys from an unusual location = compromised credentials. Look for CloudTrail or activity log evidence.",
      },
      {
        heading: "Social engineering attacks",
        points: [
          "Typosquatting: Attackers create fake websites or domains with names similar to legitimate ones to trick users into visiting them.",
          "URL shorteners: Shortened links hide the actual destination and can be used to redirect victims to malicious websites.",
        ],
        remember:
          'Typosquatting = a fake shop sign with one letter changed (rnicrosoft = "rn" pretending to be "m"). URL shortener = a wrapped gift box: you cannot see what is inside until you open it. Look before you click.',
        examTip:
          "A domain that is one character off from a real brand = typosquatting. A short link (bit.ly style) in an unexpected email = expand it safely and check the destination before opening. Also check WHOIS: a domain registered only days ago is a red flag.",
      },
      {
        heading: "Identity-based indicators",
        points: [
          "IAM account compromise: An identity and access management account is taken over by an attacker and used to perform unauthorized actions.",
          "Unauthorized access: Users gain access to systems, applications, or data they are not permitted to use.",
          "Impossible travel: The same user account appears to log in from geographically distant locations within an impossible timeframe, indicating possible account compromise.",
        ],
        remember:
          "Impossible travel = you swipe your card in New York, and 10 minutes later it is used in Tokyo. Nobody flies that fast, so one of those swipes is a thief. The same logic applies to logins.",
        examTip:
          "Two logins from far-apart locations minutes apart = impossible travel (account compromise). Many failed logins across many accounts with one password = password spraying. Repeated MFA push prompts the user did not start = MFA fatigue. User opening data outside their job role = unauthorized access or privilege escalation.",
      },
      {
        heading: "Email-related attacks",
        points: [
          "Business Email Compromise (BEC): Attackers impersonate executives, vendors, or trusted contacts through email to trick users into transferring money or revealing sensitive information.",
        ],
        remember:
          'BEC = a con artist wearing your boss\'s face. There is often no virus and no bad link, just a believable request like "Wire the payment today, I am in a meeting." The trick is trust and urgency.',
        examTip:
          'Urgent payment request from an "executive," a vendor suddenly changing bank details, or a reply-to address that does not match the sender = BEC. No malware or attachment is involved, so the best defense is verifying by a second channel (phone call). Check SPF, DKIM, and DMARC results in the email header.',
      },
    ],
  },
  {
    id: "domain-1-3",
    title: "Tools to Determine Malicious Activity",
    domain: "Domain 1.0",
    domainName: "Security Operations",
    module: "1.3",
    moduleName: "Security Tools and Scripting",
    description:
      "CyberChef, Wireshark, Snort, Suricata, Zeek, SIEM, threat-intel platforms, EDR/XDR, reputation lookups, sandboxes, YARA, regex, file formats and scripting languages.",
    lastUpdated: "Oct 9, 2026",
    access: "Free",
    icon: Wrench,
    estimatedTime: "1 hours",
    sections: [
      {
        heading: "Decoding/Parsing",
        points: [
          "CyberChef: A web-based tool used to decode, encode, decrypt, convert, and analyze suspicious data without writing code.",
        ],
        remember:
          "CyberChef is a translator for secret messages. Attackers hide their commands in scrambled text (Base64, hex), and CyberChef turns it back into plain words you can read.",
        examTip:
          'See a long string of random letters and numbers, or a PowerShell command with -enc? Think Base64, then CyberChef to decode it. Any question about "decoding," "deobfuscating," or "converting" data without writing code = CyberChef.',
      },
      {
        heading: "Packet Analysis",
        points: [
          "Wireshark: A packet capture and analysis tool used to inspect network traffic and identify suspicious communications.",
          "tcpdump: A command-line packet analyzer used to capture and investigate network traffic directly from a system.",
          "Snort: An intrusion detection and prevention system (IDS/IPS) that analyzes network traffic and generates alerts for suspicious activity.",
          "Suricata: A high-performance IDS/IPS that performs deep packet inspection and threat detection on network traffic.",
          "Zeek: A network monitoring platform that generates detailed logs and metadata to help investigate security incidents.",
        ],
        remember:
          "Think of a phone line. tcpdump = recording the calls from the command line. Wireshark = a screen where you read the call transcripts. Snort and Suricata = security guards who sound the alarm when they hear a known bad phrase. Zeek = a note-taker who writes a summary of every conversation.",
        examTip:
          "Match the keyword. GUI to inspect or follow a stream = Wireshark. Quick command-line capture on a server = tcpdump. Signature-based alerts or blocking = Snort or Suricata (Suricata is multi-threaded and faster). Rich connection, DNS, and HTTP logs for behavior analysis and hunting = Zeek.",
      },
      {
        heading: "Log Analysis",
        points: [
          "Security Information and Event Management (SIEM): A centralized platform that collects, correlates, and analyzes logs from multiple systems to detect threats and security incidents.",
        ],
        remember:
          "A SIEM is a security control room with a wall of screens. Cameras (logs) from every system feed into one room, and the software connects the dots between them to raise the alarm.",
        examTip:
          'Key words: "correlate," "aggregate," "centralized," or "alert across multiple sources" = SIEM. One failed login means nothing, but 500 failed logins followed by a success from the same IP is the kind of pattern a SIEM correlation rule catches.',
      },
      {
        heading: "Threat-Intelligence Platforms",
        points: [
          "Open Threat Exchange (OTX): A community-driven threat intelligence platform that provides indicators of compromise (IOCs) shared by security researchers.",
          "Malware Information Sharing Platform (MISP): A threat intelligence platform used to collect, share, and analyze cyber threat information between organizations.",
          "Open Cyber Threat Intelligence (OpenCTI): An open-source platform that organizes and visualizes cyber threat intelligence data for investigation and analysis.",
        ],
        remember:
          "Think of a neighborhood watch group chat. OTX = the public community board where anyone posts warnings. MISP = a trusted group where organizations swap detailed reports. OpenCTI = the wall of photos and red string that connects who is behind what.",
        examTip:
          'Crowdsourced IoCs from researchers, shared as "pulses" = OTX. Sharing structured threat data between organizations = MISP. Organizing, linking, and visualizing intel as a knowledge graph = OpenCTI. All three are open-source or free-to-use options.',
      },
      {
        heading: "Endpoint Security",
        points: [
          "Endpoint Detection and Response (EDR) and Extended Detection and Response (XDR): Security solutions that monitor endpoints and enterprise environments to detect, investigate, and respond to threats.",
          "Mobile Device Management (MDM): A platform used to manage, monitor, and secure mobile devices across an organization.",
        ],
        remember:
          "EDR = a bodyguard on each laptop and server, watching everything and able to lock the door. XDR = the head of security who also sees email, network, and cloud so the whole picture comes together. MDM = the rulebook and remote control for company phones.",
        examTip:
          "Need to isolate a host, kill a process, or investigate endpoint activity = EDR. Correlating endpoint plus email plus network plus cloud data = XDR. Lost or stolen phone, enforce passcodes, or remote wipe = MDM.",
      },
      {
        heading: "Domain and IP Reputation",
        points: [
          "WHOIS: A service used to obtain information about domain ownership, registration dates, and contact details.",
          "AbuseIPDB: A reputation database that helps identify IP addresses associated with malicious activities.",
          "Geolocation by IP Address (GEO-IP): A service that identifies the geographical location of an IP address to support investigations.",
        ],
        remember:
          "Think of checking a stranger before you trust them. WHOIS = who owns it and when was it created (ID check). AbuseIPDB = has anyone reported this IP (criminal record check). GEO-IP = where in the world is it coming from (address check).",
        examTip:
          "A domain registered only a few days ago = suspicious, check WHOIS. Need to know if an IP has been reported for attacks = AbuseIPDB. Login from an unexpected country, or checking impossible travel = GEO-IP.",
      },
      {
        heading: "File Analysis",
        points: [
          "Strings: A utility that extracts readable text from files to help identify hidden indicators, URLs, commands, or malware artifacts.",
          "VirusTotal: An online platform that scans files, URLs, and hashes using multiple antivirus engines to identify malicious content.",
          "Yet Another Recursive Acronym (YARA): A rule-based malware analysis tool used to identify and classify malicious files based on specific patterns.",
        ],
        remember:
          "Strings = reading the text on the outside of a suspicious package. VirusTotal = asking 70 antivirus experts for a second opinion. YARA = a wanted poster that matches any file with the same suspicious features.",
        examTip:
          "Pull readable URLs, IPs, or commands out of a binary without running it = Strings. Check a file hash or URL against many AV engines = VirusTotal (upload only non-sensitive files, since uploads can be shared). Write rules to match malware families by pattern = YARA.",
      },
      {
        heading: "Sandboxing",
        points: [
          "Joe Sandbox: An automated malware analysis environment that safely executes suspicious files and reports their behavior.",
          "Cuckoo Sandbox: An open-source malware analysis platform that observes how files behave in an isolated environment.",
        ],
        remember:
          "A sandbox is a bomb-disposal chamber. You open the suspicious package inside a sealed room, watch what it does (files, registry, network), and nothing escapes into the real world.",
        examTip:
          "Safely run an unknown file to see its behavior = sandbox (dynamic analysis). Joe Sandbox is commercial and Cuckoo is open-source. Remember that some malware detects sandboxes and stays quiet, so a clean result does not prove the file is safe.",
      },
      {
        heading: "Pattern Recognition",
        points: [
          "Regular Expressions (Regex): Patterns used to search, match, and analyze text for indicators such as IP addresses, hashes, emails, and other artifacts.",
          "Interpreting Suspicious Commands: Analyzing command-line activity to identify actions commonly used by attackers for persistence, execution, or data theft.",
        ],
        remember:
          'Regex = a super-powered Ctrl+F. Instead of searching one word, you describe a pattern like "any four numbers with dots between them" and it finds every IP address in a huge log. Command analysis = reading the attacker\'s handwriting.',
        examTip:
          "Extract all IPs, emails, or hashes from a large log = regex. Red-flag commands to know: powershell -enc (hidden encoded script), certutil -urlcache (downloading a file), curl or wget piped to bash (remote script execution), and bash -i >& /dev/tcp (reverse shell).",
      },
      {
        heading: "Email Analysis",
        points: [
          "MXToolbox: A diagnostic tool used to analyze email servers, DNS records, domains, and email security configurations.",
        ],
        remember:
          "MXToolbox is the email detective. Paste in a domain or header and it tells you where the mail came from, whether the domain is on a blacklist, and whether it passes the email safety checks.",
        examTip:
          "Verifying SPF, DKIM, and DMARC, checking MX records, blacklist lookups, or analyzing email headers for a spoofed sender = MXToolbox. If a phishing email claims to be from your CEO, this is where you check if the sending server is really allowed to send for that domain.",
      },
      {
        heading: "User and Entity Behavior Analysis (UEBA)",
        points: [
          "Open User and Entity Behavior Analytics (OpenUBA): A platform that analyzes user and system behavior to detect unusual activities that may indicate insider threats or compromised accounts.",
        ],
        remember:
          'UEBA is like a store clerk who knows every regular customer. When Sam, who always shops at 10 AM, suddenly shows up at 3 AM and asks for the safe, the clerk knows something is off. It learns "normal" and flags the change.',
        examTip:
          'Questions about baselining normal behavior, insider threats, or a user suddenly downloading huge amounts of data or logging in at odd hours = UEBA. It catches things signature-based tools miss, because nothing is "known bad," just unusual.',
      },
      {
        heading: "File Formats",
        points: [
          "JSON (JavaScript Object Notation): A lightweight, structured data format commonly used for log files, APIs, and security tool outputs.",
          "XML (eXtensible Markup Language): A tag-based data format frequently used for application configuration files and data exchange.",
          "YAML (YAML Ain't Markup Language): A human-readable configuration format commonly used in automation and cloud environments.",
          "EVTX: The native Windows Event Log file format used to store security, application, and system logs.",
        ],
        remember:
          'Spot them by looks. JSON = curly braces { } and "key": "value". XML = angle-bracket tags like <user>. YAML = clean indentation with no braces. EVTX = the Windows event log file you open in Event Viewer.',
        examTip:
          'Cloud and API logs or tool output in {"key": "value"} form = JSON. Tags with opening and closing brackets = XML. Indentation-based config for Kubernetes, playbooks, or Sigma rules = YAML (a wrong indent breaks it). Windows Security, System, or Application logs = EVTX.',
      },
      {
        heading: "Programming/Scripting Languages",
        points: [
          "Python: A versatile programming language commonly used for automation, threat hunting, log analysis, and security scripting.",
          "PowerShell: A Windows command-line and scripting language used for system administration but also frequently abused by attackers.",
          "Shell Script: A scripting language used in Linux and Unix environments to automate administrative and security-related tasks.",
        ],
        remember:
          "Pick the right tool for the platform. Python = the all-purpose Swiss Army knife that works anywhere. PowerShell = the Windows toolbox (and a favorite of attackers). Shell/Bash = the Linux toolbox.",
        examTip:
          "Parse logs, call APIs, or automate across platforms = Python. Windows administration or an attack using built-in tools (LOLBins) = PowerShell. Automate tasks or process logs on Linux = Shell/Bash. PowerShell is both an admin tool and an attacker tool, so look at context.",
      },
    ],
  },
  {
    id: "domain-1-4",
    title: "Threat Intelligence and Threat Hunting",
    domain: "Domain 1.0",
    domainName: "Security Operations",
    module: "1.4",
    moduleName: "Threat Intel & Hunting",
    description:
      "Threat actors, TTPs, MITRE ATT&CK, Pyramid of Pain, confidence levels, IoCs, STRIDE, threat mapping and cyber deception.",
    lastUpdated: "Oct 9, 2026",
    access: "Free",
    icon: Crosshair,
    estimatedTime: "1.3 hours",
    sections: [
      {
        heading: "Threat Actors",
        points: [
          "Advanced Persistent Threat (APT): A highly skilled and well-funded attacker that gains unauthorized access to a network and remains hidden for a long period while continuously stealing data or conducting espionage.",
          "Insider Threat: An employee, contractor, or trusted individual who intentionally or unintentionally causes harm to an organization's systems, data, or resources.",
        ],
        remember:
          "APT = a professional spy who sneaks in, hides for months, and quietly copies secrets. Insider = someone who already has the house keys, so no break-in is needed. One is patient and outside, the other is trusted and inside.",
        examTip:
          "Nation-state, long-term, stealthy, well-funded, or espionage = APT. Employee, contractor, or former staff with access, whether malicious or careless = insider threat. A user clicking a phishing link by accident is still an unintentional insider threat.",
      },
      {
        heading: "Tactics, Techniques, and Procedures (TTPs)",
        points: [
          "Tactics: The overall goal an attacker is trying to achieve during a cyberattack, such as stealing credentials or disrupting operations.",
          "Techniques: The methods attackers use to accomplish their objectives, such as phishing, malware installation, or privilege escalation.",
          "Procedures: The specific steps, tools, and actions an attacker follows to carry out a technique against a target.",
          "MITRE ATT&CK: A knowledge base that documents real-world attacker tactics and techniques to help security teams understand and detect threats.",
          "Heat Maps: A visual chart that highlights areas with the highest security risks, vulnerabilities, or attack activity levels.",
          "Pyramid of Pain: A cybersecurity model that shows how difficult it becomes for attackers when defenders can detect and block higher-level indicators such as TTPs.",
          "Attribution: The process of identifying the individual, group, or nation responsible for a cyberattack.",
        ],
        remember:
          "Think of a bank robbery. Tactic = the goal (get the money). Technique = the method (go through the vault door). Procedure = the exact recipe (this crew, this drill, this time). Pyramid of Pain = the lower you block (a hash), the easier the robber swaps it. The higher you block (their habits), the more it hurts them.",
        examTip:
          "Pyramid of Pain order, easiest to hardest for the attacker to change: hash values, IP addresses, domain names, network/host artifacts, tools, TTPs. Blocking TTPs causes the most pain. MITRE ATT&CK = mapping behavior to known techniques. Heat map = showing which techniques you cover or miss. Attribution is difficult and should never be treated as certain.",
      },
      {
        heading: "Confidence-Level Impacts",
        points: [
          "Timeliness: Threat intelligence must be received quickly enough to help organizations respond before significant damage occurs.",
          "Relevance: Threat intelligence should relate directly to an organization's environment, systems, and potential threats.",
          "Accuracy: Threat intelligence must be correct and reliable so that security teams can make informed decisions without wasting resources.",
        ],
        remember:
          "Think of a weather forecast. If it arrives late (timeliness), is for another city (relevance), or is often wrong (accuracy), you will not trust it and will not plan around it. Intel works the same way.",
        examTip:
          "Match the problem to the factor. Old indicators that are no longer in use = timeliness. A report about a threat to an industry or technology you do not use = relevance. Many false positives or unverified claims = accuracy. Lower confidence means you should verify before acting.",
      },
      {
        heading: "Collection Methods and Sources",
        points: [
          "Open-Source Intelligence (OSINT): Information collected from publicly available sources such as websites, social media, news reports, and public databases.",
          "Closed-Source Intelligence: Information obtained from private, restricted, or subscription-based sources that are not publicly accessible.",
          "Threat Intelligence Sharing: The exchange of threat information between organizations, vendors, and security communities to improve collective cybersecurity awareness.",
        ],
        remember:
          "OSINT = reading the public noticeboard. Closed-source = a paid private newsletter or a secret briefing. Sharing = neighbors telling each other which houses were burgled so everyone locks up.",
        examTip:
          "Free and public (news, social media, WHOIS, public databases) = OSINT. Paid feeds, vendor subscriptions, or restricted government reports = closed-source. Industry groups exchanging indicators (like ISACs, or tools like MISP and OTX) = threat intelligence sharing.",
      },
      {
        heading: "Indicator of Compromise (IoC)",
        points: [
          "Collection: The process of gathering evidence such as suspicious files, IP addresses, domains, or logs that may indicate an attack.",
          "Analysis: The examination of collected indicators to determine whether malicious activity has occurred or is occurring.",
          "Application/Usage: The use of indicators within security tools and processes to detect, monitor, block, or investigate threats.",
        ],
        remember:
          "IoCs are fingerprints and footprints at a crime scene. First collect them (gather the prints), then analyze them (do they match a known criminal?), then apply them (put the suspect on the watchlist in your SIEM, firewall, or EDR).",
        examTip:
          "Follow the order: collect, analyze, apply. Gathering hashes and IPs from logs = collection. Checking whether they are really malicious (VirusTotal, AbuseIPDB) = analysis. Loading them into the SIEM, firewall, or EDR to block or alert = application. Skipping analysis can cause false positives.",
      },
      {
        heading: "Types of IoCs",
        points: [
          "Atomic: A single piece of observable evidence, such as an IP address, file hash, domain name, or email address, that may indicate malicious activity.",
          "Behavioral: A pattern of activity or attacker behavior that suggests malicious intent, such as repeated failed login attempts or unusual data transfers.",
        ],
        remember:
          'Atomic = a single clue, like one fingerprint. Behavioral = a pattern, like "this person always checks the cameras, then picks the lock, then leaves at 3 AM." A fingerprint is easy to change, but a habit is hard to hide.',
        examTip:
          "A single value you can copy and paste (IP, hash, domain, email address) = atomic. A sequence or pattern (many failed logins then a success, Word spawning PowerShell, large night-time uploads) = behavioral. Behavioral IoCs sit higher on the Pyramid of Pain and last longer.",
      },
      {
        heading: "Threat Modeling (STRIDE)",
        points: [
          "Spoofing: An attacker pretends to be a legitimate user, device, or system to gain unauthorized access.",
          "Tampering: An attacker modifies data, files, configurations, or software without authorization.",
          "Repudiation: A user performs an action and later denies carrying out that action because there is insufficient evidence to prove it.",
          "Information Disclosure: Sensitive information is exposed to individuals who are not authorized to access it.",
          "Denial of Service (DoS): An attacker overwhelms a system or service to make it unavailable to legitimate users.",
          "Elevation of Privilege: An attacker gains permissions or access rights beyond those originally granted.",
        ],
        remember:
          'Match each letter to a simple story. S = wearing a fake name tag. T = changing the numbers in the ledger. R = "it was not me" with no proof. I = a secret left on the open table. D = a crowd blocking the shop door. E = a visitor walking into the manager\'s office.',
        examTip:
          "Match the scenario. Fake login or forged email sender = spoofing. Altered file or database record = tampering. User denies an action and there are no logs = repudiation (fix with logging and digital signatures). Data leak or exposed records = information disclosure. Service flooded = DoS. Normal user gains admin rights = elevation of privilege.",
      },
      {
        heading: "Threat Mapping",
        points: [
          "Threat Mapping: The process of associating known threats, attack techniques, vulnerabilities, and security controls to understand how attackers may target an environment.",
        ],
        remember:
          "Threat mapping is a treasure map in reverse. You draw where the attacker could go (threats and techniques), then mark where your guards are (controls). Any path with no guard is a gap you need to fix.",
        examTip:
          "Linking known threats and techniques (often using MITRE ATT&CK) to your assets, vulnerabilities, and controls to find coverage gaps = threat mapping. The goal is to decide where to add detection or protection first.",
      },
      {
        heading: "Cyber Deception",
        points: [
          "Cyber Deception: A security technique that uses fake systems, files, credentials, or services to lure attackers and observe their activities without exposing real assets.",
          "Honeypot: A decoy system designed to attract attackers and capture information about their methods and activities.",
          "Honeynet: A network of multiple connected honeypots created to simulate a realistic environment for observing attacker behavior.",
          "Decoy Assets: Fake files, databases, servers, or accounts intentionally placed within an environment to detect unauthorized access attempts.",
          "Fake Credentials: False usernames, passwords, API keys, or tokens planted in systems to alert security teams when attackers attempt to use them.",
        ],
        remember:
          "Cyber deception is bait in a trap. A honeypot = a fake jar of honey that attracts the bear. A honeynet = a whole fake village. Fake credentials = a planted wallet with a tracker inside. No real employee should ever touch it, so if anyone does, you know it is an intruder.",
        examTip:
          "A single decoy system = honeypot. A network of decoys = honeynet. Fake files or credentials that should never be used = honeytokens. Any interaction with a decoy is suspicious, which gives high-confidence alerts with very few false positives. It also lets you study attacker behavior safely.",
      },
    ],
  },
  {
    id: "domain-1-5",
    title: "Efficiency and Process Improvement",
    domain: "Domain 1.0",
    domainName: "Security Operations",
    module: "1.5",
    moduleName: "Efficiency and Process Improvement",
    description:
      "Playbooks and runbooks, SOAR and automation, infrastructure as code, data enrichment, alert tuning, dashboards, APIs, webhooks and plug-ins.",
    lastUpdated: "Oct 9, 2026",
    access: "Free",
    icon: Workflow,
    estimatedTime: "1.1 hours",
    sections: [
      {
        heading: "Standardize Processes",
        points: [
          "Manage and Facilitate Team Coordination: A standardized process ensures that all security team members follow the same procedures, improving communication, consistency, and incident response effectiveness.",
          "Playbook Creation: A playbook is a documented set of step-by-step instructions that guides security teams on how to respond to specific security events or incidents.",
          "Runbook Creation: A runbook is a detailed operational guide that outlines the exact actions required to perform routine security tasks or resolve specific issues.",
        ],
        remember:
          'Think of a sports team. The playbook = the game plan for a situation ("if we get a phishing report, here is how we respond"). The runbook = the detailed instructions for one move ("how to reset a password or isolate a host, click by click"). When everyone follows the same plan, nobody improvises under pressure.',
        examTip:
          "Responding to a specific type of incident (ransomware, phishing, data breach) with defined steps and roles = playbook. Detailed technical steps for a routine task (isolating a host, blocking an IP) = runbook. New analysts doing things differently each time, or inconsistent responses = standardize with playbooks and runbooks.",
      },
      {
        heading: "Streamline Operations",
        points: [
          "Automation and Orchestration: Automation and orchestration reduce manual effort by allowing security tools and processes to work together automatically to detect, investigate, and respond to threats.",
          "Security Orchestration, Automation, and Response (SOAR): SOAR is a technology platform that integrates security tools and automates incident response workflows to improve security operations efficiency.",
          "Infrastructure as Code (IaC): Infrastructure as Code is the practice of managing and provisioning infrastructure through code instead of manual configuration, ensuring consistency and reducing human error.",
        ],
        remember:
          "Think of a kitchen. Automation = one machine doing one job (a dishwasher). Orchestration = the head chef coordinating all machines and cooks so the meal comes out together. SOAR = that head chef for your security tools. IaC = a written recipe, so every kitchen you open comes out identical.",
        examTip:
          "One task done automatically (auto-block an IP) = automation. Many tools working together in one workflow (alert, enrich, ticket, block) = orchestration, usually through SOAR. Reduce analyst workload or response time = SOAR. Build identical, repeatable environments and avoid manual misconfiguration = IaC (like Terraform).",
      },
      {
        heading: "Data Enrichment",
        points: [
          "Data Enrichment: Data enrichment is the process of adding additional context and information to security data to improve analysis and decision-making.",
          "Rule/Alert Tuning: Rule or alert tuning is the process of adjusting detection rules to reduce false positives and improve the accuracy of security alerts.",
          "Dashboard Creation: Dashboard creation involves building visual displays that present security metrics, alerts, and system activity in an easy-to-understand format for analysts.",
        ],
        remember:
          'Enrichment = a bare IP address is just a number, but add "owned by a hosting company, reported 50 times, in a country we never use" and it becomes a story. Tuning = adjusting a smoke alarm so toast does not set it off. Dashboard = the car dashboard: speed and warning lights at a glance.',
        examTip:
          "Adding context like GeoIP, reputation, or asset owner to an alert = enrichment. Too many false positives or alert fatigue = tune the rules (adjust thresholds, add exceptions), but do not simply turn the alert off. Need a quick visual of metrics or trends for analysts or management = dashboard.",
      },
      {
        heading: "Technology and Tool Integration",
        points: [
          "APIs (Application Programming Interfaces): APIs allow different security tools and applications to communicate and exchange data automatically.",
          "Webhooks: Webhooks are automated notifications that send information between systems when a specific event occurs.",
          "Plug-ins: Plug-ins are software extensions that add new features or functionality to existing security tools and platforms.",
        ],
        remember:
          'API = you call the restaurant and ask "what is on the menu?" (you request, they answer). Webhook = the restaurant texts you when your table is ready (it pushes to you when something happens). Plug-in = a new attachment you snap onto a tool you already own.',
        examTip:
          "One tool pulling data from or sending commands to another on request = API. A system automatically notifying another the moment an event happens (a new alert triggers a Slack message or SOAR workflow) = webhook. Adding a feature to an existing tool, like a SIEM connector for a threat feed = plug-in. Pull = API, push = webhook.",
      },
    ],
  },
  {
    id: "domain-1-6",
    title: "AI in Security Operations",
    domain: "Domain 1.0",
    domainName: "Security Operations",
    module: "1.6",
    moduleName: "AI in Security Operations",
    description:
      "AI risks such as hallucinations, data exposure, model poisoning and malicious prompts, plus governance and practical use cases for analysts.",
    lastUpdated: "Oct 9, 2026",
    access: "Free",
    icon: Bot,
    estimatedTime: "1.5 hours",
    sections: [
      {
        heading: "AI Risks",
        points: [
          "Hallucinations: Hallucinations occur when an AI system generates incorrect, misleading, or completely fabricated information while presenting it as if it were accurate.",
          "Data Exposure: Data exposure occurs when sensitive, confidential, or proprietary information is unintentionally shared with or through an AI system.",
          "Model Poisoning: Model poisoning is an attack where malicious data is intentionally inserted into AI training data to influence the model's behavior and produce inaccurate or harmful results.",
          "Malicious Prompts: Malicious prompts are specially crafted inputs designed to manipulate an AI system into revealing sensitive information, bypassing restrictions, or producing unintended outputs.",
        ],
        remember:
          "Think of AI as a very confident new intern. Hallucination = the intern makes up an answer instead of admitting they do not know. Data exposure = the intern accidentally shares company secrets with outsiders. Model poisoning = someone slipped fake facts into the intern's textbook. Malicious prompt = a stranger sweet-talking the intern into breaking the rules.",
        examTip:
          "Match the scenario. AI gives a confident answer with a fake source, IP, or CVE = hallucination (always verify). Analyst pastes customer data or source code into a public AI tool = data exposure. Attacker corrupts the training data so the model behaves wrongly = model poisoning. Crafted input that tricks the AI into ignoring its rules or leaking data (prompt injection) = malicious prompt.",
      },
      {
        heading: "Governance",
        points: [
          "Legal or Regulatory Compliance: Organizations must ensure that AI systems follow applicable laws, regulations, and industry standards related to privacy, security, and data protection.",
          "AI Usage Policies: AI usage policies are documented rules and guidelines that define how AI technologies should be used safely, responsibly, and ethically within an organization.",
        ],
        remember:
          "Governance is the rulebook for using AI at work. Compliance = obeying the law of the land (privacy and data protection rules like GDPR or HIPAA). Usage policy = your company's house rules: which tools are approved, what data may go in, and who checks the output.",
        examTip:
          "Staff using unapproved AI tools or pasting sensitive data into them = the fix is an AI usage policy (approved tools, data handling rules, training). Concern about privacy laws or where data is stored = legal and regulatory compliance. Governance answers usually involve policy, approval, and human review, not banning AI completely.",
      },
      {
        heading: "Use Cases",
        points: [
          "Comparing Artifacts: AI can analyze and compare files, logs, malware samples, hashes, or other security artifacts to identify similarities, differences, and indicators of compromise.",
          "Analyzing Log Files: AI can process large volumes of log data to identify suspicious activities, anomalies, and potential security incidents more quickly than manual analysis.",
          "Document Creation: AI can assist in creating security reports, incident summaries, policies, procedures, and other documentation based on available data.",
          "Incident Investigation: AI can help security analysts investigate incidents by identifying patterns, correlating evidence, and suggesting possible causes or attack paths.",
          "Event Correlation: AI can correlate events from multiple security tools and data sources to identify relationships that may indicate a coordinated attack or security incident.",
          "Automation and Orchestration: AI can automate repetitive security tasks and coordinate actions across multiple security tools to improve response times and operational efficiency.",
        ],
        remember:
          "AI is a tireless assistant that never gets bored of reading. It can scan a million log lines, spot which files look alike, connect clues from different tools, and draft the report, so the human analyst can focus on decisions. The assistant helps, but the analyst stays in charge.",
        examTip:
          "Best-fit AI tasks: reading huge volumes of logs, comparing files or hashes, correlating events across tools, drafting incident reports, and automating repetitive steps. The safe answer always keeps a human in the loop: AI suggests, the analyst verifies. Be wary of answers that let AI make final decisions or handle sensitive data without controls.",
      },
    ],
  },

  // Domain 2.0: Vulnerability Management (26%)
  {
    id: "domain-2-1",
    title: "Vulnerability Discovery and Scanning",
    domain: "Domain 2.0",
    domainName: "Vulnerability Management",
    module: "2.1",
    moduleName: "Vulnerability Discovery",
    description:
      "Asset inventory, planning considerations, scan types (internal vs external, agent vs agentless, credentialed vs non-credentialed, passive vs active), discovery scanning, and security baseline scanning.",
    lastUpdated: "Oct 13, 2026",
    access: "Free",
    icon: Search,
    estimatedTime: "1.2 hours",
    sections: [
      {
        heading: "Asset Inventory",
        explain:
          "Asset inventory is the foundation of any vulnerability scanning program. Before you can scan, you must know what you have.",
        points: [
          "Process of identifying, documenting, and maintaining a list of all devices, systems, applications, and resources within an organization's environment.",
          "Must be completed before performing vulnerability scans to ensure comprehensive coverage.",
          "Includes hardware, software, cloud resources, IoT devices, and infrastructure components.",
          "Regularly updated to reflect changes in the environment and new acquisitions.",
        ],
        remember:
          "Think of a teacher taking attendance. If a student is not on the list, nobody notices when they go missing. An asset missing from the inventory never gets scanned, so its vulnerabilities stay hidden. Inventory first, scanning second.",
        examTip:
          "Scan results look incomplete, or a breach came through a server nobody knew about (shadow IT, forgotten cloud instance, unmanaged IoT device) = the root cause is an incomplete asset inventory. The fix is to discover and document assets, then keep the list updated.",
      },
      {
        heading: "Planning Considerations",
        explain:
          "Successful vulnerability scanning requires careful planning and coordination.",
        points: [
          "Scheduling: Determine when scans should run to minimize disruptions and ensure systems are regularly assessed. Critical systems may need daily scans, while less critical systems weekly or monthly.",
          "Operations: Ensure scanning activities do not negatively affect normal business processes or critical services. Coordinate with operations teams.",
          "Performance: Evaluate how scanning might impact system resources, network bandwidth, and application responsiveness. Heavy scans may cause noticeable slowdown.",
          "Sensitivity Levels: Classify systems and data so scanning activities are conducted according to importance and risk. High-sensitivity systems may need different scan parameters.",
          "Segmentation: Divide networks into separate sections so scans can be targeted more effectively and reduce security risks. Allows focused scanning by risk level.",
          "Regulatory Requirements: Comply with standards like PCI-DSS, HIPAA, and SOC 2 that mandate how and when vulnerability assessments must be performed.",
        ],
        remember:
          "Think of a building inspection. You do not inspect the hospital during surgery. You pick the right time (scheduling), avoid disturbing the patients (operations and performance), treat the operating room differently from the lobby (sensitivity), inspect one wing at a time (segmentation), and follow the inspector's rulebook (regulations).",
        examTip:
          "Match the clue. Scan slows down a production app = performance or operations, so reschedule to off-hours or lower the intensity. Payment card data = PCI DSS. Patient data = HIPAA. Different zones with different risk = segmentation. Always coordinate with the operations team before scanning critical or fragile systems like OT.",
      },
      {
        heading: "Scan Types - Passive vs Active",
        explain:
          "Vulnerability scanning can be either passive (observation only) or active (sending test traffic).",
        points: [
          "Passive Scan: Monitors network traffic and system activity without directly interacting with target systems. Lower risk but limited findings.",
          "Active Scan: Directly communicates with target systems by sending probes and requests to identify vulnerabilities. More comprehensive but higher risk to stability.",
          "Passive: WHOIS lookups, banner grabbing, traffic analysis. Safe for production.",
          "Active: Port scanning, service enumeration, exploit testing. May cause performance impact.",
        ],
        remember:
          "Passive = a bird watcher with binoculars. You observe from a distance and never disturb anything. Active = a doctor checking reflexes. You touch the patient to get better answers, but you might cause a reaction.",
        examTip:
          "Fragile or business-critical system, or you cannot risk disruption = passive. Need the most complete and accurate results = active, ideally in a maintenance window. Probes sent, ports scanned, or services touched = active. Only watching traffic = passive.",
      },
      {
        heading: "Scan Types - Internal vs External",
        explain:
          "Scanning location determines what vulnerabilities you find and from whose perspective.",
        points: [
          "Internal Scan: Performed from within the organization's network to identify vulnerabilities that could be exploited by insiders or attackers who already have access.",
          "External Scan: Performed from outside the organization's network to identify vulnerabilities that are visible and accessible from the internet.",
          "Internal finds misconfigurations, weak internal security, insider threats. External finds exposed services, web app vulnerabilities, perimeter weaknesses.",
          "Both are necessary for comprehensive security posture.",
        ],
        remember:
          "Think of checking a house. External = walking around outside to see which doors and windows a burglar could try. Internal = walking through the rooms to check what a burglar could reach once inside, or what a guest could get into. You need both walks.",
        examTip:
          "Insider threat, an attacker who already got in, or lateral movement = internal scan. Internet-facing website, firewall, or perimeter exposure = external scan. A question about what the public internet can see = external.",
      },
      {
        heading: "Scan Types - Agent-Based vs Agentless",
        explain:
          "Scanning method determines deployment complexity and depth of visibility.",
        points: [
          "Agent-Based Scan: Uses software installed directly on a device to collect detailed vulnerability and security information. Deep visibility but requires installation on each system.",
          "Agentless Scan: Remotely assesses devices over the network without requiring software installation on the target systems. Easier deployment but less detailed.",
          "Agents provide host-based information: running processes, installed software, local configurations, file integrity.",
          "Agentless provides network-perspective: open ports, services, response patterns, network positioning.",
        ],
        remember:
          "Agent = a security guard stationed inside each building who sees everything and reports back, even when the building is off the main road. Agentless = a patrol car driving past, checking each building from the street. The guard sees more, but you must hire one for every building.",
        examTip:
          "Cannot install software (legacy, OT, or locked-down devices) = agentless. Need deep host details like installed software and local configs, or the device is a remote laptop that is often off the network = agent-based. Easy, fast deployment across many devices = agentless.",
      },
      {
        heading: "Scan Types - Credentialed vs Non-Credentialed",
        explain:
          "Scanning with or without authentication reveals different vulnerability categories.",
        points: [
          "Credentialed Scan: Uses authorized login credentials to access systems and perform a more detailed assessment of vulnerabilities and configurations. Sees what authenticated users see.",
          "Non-Credentialed Scan: Evaluates systems without authentication and identifies vulnerabilities that are visible from an external/unauthenticated perspective.",
          "Credentialed: Better coverage, finds config issues, sees installed software, checks permissions. Requires valid accounts and credential management.",
          "Non-Credentialed: Simulates attacker with no access, finds exposed services, identifies weak authentication, tests default credentials.",
        ],
        remember:
          "Non-credentialed = a stranger standing outside who can only see the front of the house. Credentialed = a home inspector with a key who can check the wiring, the attic, and the locks inside. The inspector finds far more problems.",
        examTip:
          "What could an outside attacker see = non-credentialed. Need accurate results, missing patches, or configuration problems = credentialed (and it usually gives fewer false positives). Too many false positives or missed patches in scan results = switch to credentialed. Protect the scan account with least privilege.",
      },
      {
        heading: "Discovery Scanning",
        explain:
          "Discovery scanning identifies what exists in your network before detailed vulnerability scanning.",
        points: [
          "Discovery: Identifies devices, hosts, services, applications, and resources that exist within a network environment. First step in reconnaissance.",
          "Mapping Scans: Creates a visual or logical representation of network devices, connections, and communication paths. Essential for understanding network topology.",
          "Device Fingerprinting: Identifies the operating system, software version, device type, or hardware characteristics of a target system. Helps prioritize scanning strategy.",
        ],
        remember:
          "Think of exploring a new city. Discovery = finding out which buildings exist. Mapping = drawing the streets that connect them. Fingerprinting = reading the sign on each building to learn what it is (a bank, a school, a warehouse). Do this before you inspect anything in detail.",
        examTip:
          "Which hosts and services are alive on the network = discovery scan. Draw the network layout or connections = mapping scan. Identify the OS or device type from how it responds = device fingerprinting. Discovery comes first, and its results feed your asset inventory and your deeper scans.",
      },
      {
        heading: "Security Baseline Scanning",
        explain:
          "Baseline scanning compares system configurations against established security standards.",
        points: [
          "Security Baseline Scanning: Compares system configurations against established security standards to identify deviations and weaknesses.",
          "PCI DSS (Payment Card Industry Data Security Standard): Security standard defining requirements for protecting credit card information. Requires regular vulnerability assessments.",
          "CIS Benchmarks (Center for Internet Security): Industry-recognized security configuration guidelines providing recommendations for securely configuring systems and applications.",
          "ISO 27000 Series: Collection of international standards providing guidance for establishing and maintaining information security management systems.",
          "Baseline scanning ensures compliance with industry standards and best practices.",
        ],
        remember:
          "A baseline is a report card. The standard is the answer key, and the scan grades your systems against it. PCI DSS = the answer key for card payments. CIS Benchmarks = the answer key for hardening settings. ISO 27000 = the answer key for the whole security program.",
        examTip:
          "Credit card data = PCI DSS. Secure configuration settings for an OS, browser, or cloud platform = CIS Benchmarks. Company-wide security management system or certification = ISO 27001 (part of the ISO 27000 series). A system that has drifted from its approved settings = baseline deviation.",
      },
    ],
  },

  {
    id: "domain-2-2",
    title: "Analyzing Output from Vulnerability Assessment Tools",
    domain: "Domain 2.0",
    domainName: "Vulnerability Management",
    module: "2.2",
    moduleName: "Vulnerability Analysis",
    description:
      "Network scanners, multipurpose tools, web application scanners, vulnerability scanners, cloud assessment tools, breach and attack simulation tools, and how to read scan output.",
    lastUpdated: "Oct 13, 2026",
    access: "Free",
    icon: Search,
    estimatedTime: "1 hours",
    sections: [
      {
        heading: "Network Scanning and Mapping",
        explain:
          "Network scanning tools discover which devices are alive on a network and which ports are open on them. They show what is reachable, which is the first step before any deeper vulnerability testing.",
        points: [
          "Angry IP Scanner: Angry IP Scanner is a fast network scanning tool used to identify active devices, open ports, and basic network information across an IP address range.",
          "Masscan: Masscan is a high-speed port scanner capable of scanning large networks and identifying open ports much faster than traditional scanning tools.",
        ],
        remember:
          "Think of counting which lights are on in a huge apartment block. Angry IP Scanner = a quick walk past to see which windows are lit. Masscan = a helicopter flying over the whole city at once. Both tell you what is on, not what is wrong inside.",
        examTip:
          "Scan a huge range or the whole internet as fast as possible = Masscan. Simple, quick check of which hosts are alive in an IP range = Angry IP Scanner. Both only show live hosts and open ports, so they do not replace a vulnerability scanner.",
      },
      {
        heading: "Multipurpose Tools",
        explain:
          "These tools do several jobs in one: discovery, reconnaissance, and exploit testing. Analysts use them to map a target and to prove whether a weakness can really be used.",
        points: [
          "Nmap: Nmap (Network Mapper) is a network discovery and security auditing tool used to identify hosts, open ports, running services, operating systems, and potential vulnerabilities.",
          "Metasploit Framework (MSF): The Metasploit Framework is a penetration testing platform used to validate vulnerabilities, test exploits, and assess security weaknesses in systems.",
          "Maltego: Maltego is an intelligence-gathering and link-analysis tool used to discover relationships between people, domains, IP addresses, organizations, and other entities.",
          "Recon-ng: Recon-ng is an open-source reconnaissance framework that automates information gathering and OSINT collection during security assessments.",
        ],
        remember:
          "Think of a detective's kit. Nmap = the map and magnifying glass that shows hosts, ports, services, and operating systems. Metasploit = the lock-picking set that proves a door can really be opened. Maltego = the corkboard with red string linking people, domains, and IPs. Recon-ng = the assistant who searches public sources for you.",
        examTip:
          "Identify hosts, open ports, service versions, and the OS = Nmap. Prove a vulnerability is real by exploiting it (validation) = Metasploit. Visual relationships between domains, IPs, and people = Maltego. Automated OSINT collection = Recon-ng. Metasploit exploits systems, so use it only with written authorization.",
      },
      {
        heading: "Web Application Scanners",
        explain:
          "Web application scanners test websites and web servers for flaws in the application code and in the server it runs on, such as injection, weak authentication, and outdated components.",
        points: [
          "Burp Suite: Burp Suite is a web application security testing platform used to identify vulnerabilities such as SQL injection, cross-site scripting (XSS), and authentication weaknesses.",
          "Zed Attack Proxy (ZAP): ZAP is an open-source web application scanner that helps identify security vulnerabilities in web applications through automated and manual testing.",
          "Nikto: Nikto is a web server scanner that identifies dangerous files, outdated software, misconfigurations, and known web server vulnerabilities.",
        ],
        remember:
          "Think of three inspectors for a shop. Burp Suite = the professional who stands between you and the shop, reads and changes every message, and tests the checkout for tricks. ZAP = the same job done by a free community inspector. Nikto = the building inspector who checks the shop's structure for dangerous leftovers and old parts.",
        examTip:
          "SQL injection, XSS, or intercepting and modifying web requests = Burp Suite or ZAP. Free and open-source web app scanner = ZAP. Outdated server software, dangerous default files, or web server misconfiguration = Nikto. Nikto checks the web server, while Burp and ZAP test the web application.",
      },
      {
        heading: "Vulnerability Scanners",
        explain:
          "Vulnerability scanners compare systems and applications against large databases of known flaws and report missing patches, weak settings, and exposed software. They are the main tools for finding known weaknesses at scale.",
        points: [
          "Nessus: Nessus is a vulnerability assessment tool that scans systems and applications for security weaknesses, missing patches, and configuration issues.",
          "Nuclei: Nuclei is a template-based vulnerability scanner that uses predefined templates to quickly identify known vulnerabilities and security exposures.",
          "Open Vulnerability Assessment Scanner (OpenVAS): OpenVAS is an open-source vulnerability scanning solution that detects security flaws, outdated software, and misconfigurations across network assets.",
        ],
        remember:
          "Think of a doctor's checkup. Nessus = the well-known clinic that tests for many known conditions. OpenVAS = a free community clinic doing a similar checkup. Nuclei = a quick test strip: each template checks for exactly one known problem, so new tests can be added fast.",
        examTip:
          "Missing patches, configuration issues, and a broad commercial scanner = Nessus. Free and open-source network vulnerability scanner = OpenVAS. Fast scanning with community-written templates for a specific known flaw = Nuclei. Scanner results can include false positives, so validate important findings.",
      },
      {
        heading: "Cloud Infrastructure Assessment Tools",
        explain:
          "Cloud assessment tools check cloud accounts, containers, and Infrastructure as Code for risky settings, exposed secrets, and compliance gaps. Many can catch problems before anything is deployed.",
        points: [
          "ScoutSuite: ScoutSuite is a multi-cloud security auditing tool that evaluates cloud environments and identifies security risks and misconfigurations.",
          "Prowler: Prowler is a cloud security assessment tool that evaluates environments against security best practices, compliance standards, and configuration benchmarks.",
          "Trivy: Trivy is a security scanner used to detect vulnerabilities, secrets, and misconfigurations in containers, Kubernetes environments, code repositories, and cloud resources.",
          "Checkov: Checkov is an Infrastructure as Code (IaC) security scanner that identifies misconfigurations and compliance violations before resources are deployed.",
        ],
        remember:
          "Think of building a house. Checkov = checking the blueprint before any bricks are laid. Trivy = inspecting the delivered materials (container images) for rot and hidden keys. ScoutSuite = a survey of the finished neighborhood across several cities. Prowler = a compliance inspector with a checklist.",
        examTip:
          "Audit more than one cloud provider = ScoutSuite. Check a cloud account against benchmarks and compliance standards = Prowler. Scan container images, Kubernetes, or repos for vulnerabilities and exposed secrets = Trivy. Find misconfigurations in Terraform or other IaC before deployment = Checkov (shift left: fix it before it goes live).",
      },
      {
        heading: "Breach and Attack Simulation (BAS) Tools",
        explain:
          "Breach and Attack Simulation (BAS) tools simulate real-world attack scenarios to test the effectiveness of security defenses. They do not hunt for vulnerabilities. They check whether your detection and response actually work.",
        points: [
          "Atomic Red Team: Atomic Red Team is a collection of small, controlled security tests that simulate real-world attacker techniques to validate detection and response capabilities.",
          "Caldera: Caldera is an automated adversary emulation platform that simulates attacker behavior based on MITRE ATT&CK techniques to test security defenses.",
        ],
        remember:
          "Think of a fire drill. Atomic Red Team = lighting one small, safe flame to see if one smoke alarm goes off. Caldera = running a whole automated drill that acts out a realistic fire from start to finish. The point is to test whether your alarms and your team react.",
        examTip:
          "Small, individual tests of one attacker technique to check a detection rule = Atomic Red Team. Automated, multi-step adversary emulation based on MITRE ATT&CK = Caldera. If the question asks whether the SOC detects an attack technique, think BAS, not a vulnerability scanner.",
      },
    ],
  },

  {
    id: "domain-2-3",
    title: "Analyzing Data to Prioritize Vulnerabilities",
    domain: "Domain 2.0",
    domainName: "Vulnerability Management",
    module: "2.3",
    moduleName: "Vulnerability Prioritization",
    description:
      "Prioritization criteria, true and false positives, CVSS and EPSS scoring, context awareness, mitigation strategies, compensating controls, and validation of remediation.",
    lastUpdated: "Oct 13, 2026",
    access: "Free",
    icon: ListOrdered,
    estimatedTime: "1.5 hours",
    sections: [
      {
        heading: "Prioritization Criteria",
        explain:
          "No team can fix every vulnerability at once. Analysts rank findings by how easy they are to exploit, whether attackers are using them, what is at stake, and whether a fix exists.",
        points: [
          "Exploitability: Exploitability is the measure of how easily an attacker can successfully take advantage of a vulnerability.",
          "Active Exploitation/Threat Intelligence: A vulnerability becomes a higher priority when threat intelligence shows that attackers are actively exploiting it in real-world attacks.",
          "Asset Value: Asset value refers to the importance of a system, application, or data to business operations and security.",
          "Impact: Impact measures the amount of damage a vulnerability could cause if it is successfully exploited.",
          "Patch/Remediation Availability: Patch or remediation availability indicates whether a fix, update, or mitigation exists to address the vulnerability.",
        ],
        remember:
          "Think of a hospital emergency room. Nurses do not treat patients in the order they arrived. They triage: how bad is it (impact), how fast is it getting worse (active exploitation), how easy is it to treat (exploitability), who is the patient (asset value), and is a treatment available (patch). Treat the most urgent first.",
        examTip:
          "Threat intel says a flaw is being used in attacks right now = move it to the top of the list. A medium-score flaw on a critical server that holds customer data can outrank a high-score flaw on a test machine. No patch available = use mitigations or compensating controls instead of waiting.",
      },
      {
        heading: "True and False Results",
        explain:
          "Scanners are not perfect. Every result is either right or wrong, and analysts must know which kind of mistake they are looking at.",
        points: [
          "True Positives: A true positive occurs when a security tool correctly identifies a real vulnerability.",
          "False Positives: A false positive occurs when a security tool incorrectly reports a vulnerability that does not actually exist.",
          "True Negatives: A true negative occurs when a security tool correctly determines that a vulnerability is not present.",
          "False Negatives: A false negative occurs when a security tool fails to detect an existing vulnerability, creating a hidden security risk.",
        ],
        remember:
          "Think of a smoke alarm. True positive = fire and the alarm rings. False positive = burnt toast and the alarm rings. True negative = no fire and no alarm. False negative = a real fire and the alarm stays silent. The silent alarm during a real fire is the dangerous one.",
        examTip:
          "Scanner reports a flaw that is not there = false positive (wastes time, validate before acting). Scanner misses a real flaw = false negative, which is the most dangerous because nobody knows the risk exists. Fix false negatives with credentialed scans, updated plugins, and a second tool. Fix false positives by manually validating findings.",
      },
      {
        heading: "Scoring Methods",
        explain:
          "Scoring systems turn vulnerabilities into numbers so teams can compare and rank them. CVSS measures how severe a flaw is, and EPSS measures how likely it is to be exploited.",
        points: [
          "Common Vulnerability Scoring System (CVSS) Metrics: CVSS is a standardized scoring system that rates the severity of vulnerabilities based on factors such as exploitability, impact, and complexity.",
          "Base Metrics: Base metrics measure the inherent characteristics of a vulnerability that remain constant over time and across environments.",
          "Temporal Metrics: Temporal metrics measure factors that can change over time, such as exploit availability and remediation status.",
          "Environmental Metrics: Environmental metrics measure the impact of a vulnerability within a specific organization's environment.",
          "Exploit Prediction Scoring System (EPSS): EPSS is a predictive scoring model that estimates the likelihood that a vulnerability will be exploited in the near future.",
        ],
        remember:
          "Think of a storm warning. CVSS = how strong the storm is if it hits (severity). EPSS = the chance it will hit your town this week (likelihood). Base = the storm's strength on paper. Temporal = how the forecast changes as time passes (exploit code appears, a patch is released). Environmental = how bad it is for your town specifically.",
        examTip:
          "Memory tip: CVSS = how severe? EPSS = how likely? Score never changes and is the same everywhere = base. Changes as exploits appear or patches are released = temporal. Adjusted for your own systems and controls = environmental. Best practice is to combine CVSS, EPSS, and your own asset context, not rely on a single number.",
      },
      {
        heading: "Context Awareness",
        explain:
          "The same vulnerability can be a crisis on one system and a minor issue on another. Where a system sits on the network changes its real risk.",
        points: [
          "Internal: An internal vulnerability exists within the organization's network and generally requires internal access to exploit.",
          "External: An external vulnerability exists on internet-facing systems that can be reached directly by outside attackers.",
          "Isolated: An isolated vulnerability exists on systems with limited connectivity, reducing the chance of exploitation.",
        ],
        remember:
          "Think of a leaky window. On the front of the house facing the street (external), anyone walking by can use it. In an interior room (internal), a burglar must get into the house first. In a locked vault with no way in (isolated), it barely matters. Same flaw, very different urgency.",
        examTip:
          "Same CVSS score on an internet-facing web server and an isolated lab machine = patch the external one first. Isolated or air-gapped systems lower the priority but do not remove the vulnerability. Questions that give you network location are hinting that context decides the order.",
      },
      {
        heading: "Mitigation Strategies",
        explain:
          "Once vulnerabilities are ranked, teams choose how to reduce the risk. The best fix is a patch, but when that is not possible, other controls and formal risk decisions fill the gap.",
        points: [
          "Attack Surface Management: Attack surface management is the ongoing process of identifying and reducing potential entry points that attackers can use to compromise systems.",
          "Secure Coding Best Practices: Secure coding best practices involve developing software in a way that prevents common vulnerabilities and strengthens application security.",
          "Patching and Configuration Management: Patching and configuration management involve applying updates and maintaining secure settings to protect systems from known vulnerabilities.",
          "Exceptions: An exception is a formally approved decision to temporarily accept a security risk when remediation cannot be performed immediately.",
          "Compensating Controls: Compensating controls are alternative security measures used to reduce risk when the primary security control cannot be implemented.",
          "Examples of Compensating Controls: Firewall restrictions, multi-factor authentication (MFA), network segmentation, additional monitoring, and access control restrictions.",
        ],
        remember:
          "Think of protecting a village. Attack surface management = closing unused gates. Secure coding = building walls that are strong from the start. Patching = repairing the cracks you know about. Exception = the mayor signing off that one crack stays for now. Compensating control = posting extra guards at the crack until it can be repaired.",
        examTip:
          "Legacy system cannot be patched or the patch would break production = request a documented exception and add compensating controls (segmentation, firewall rules, MFA, extra monitoring). An exception is only valid if approved, documented, and time-limited. Reducing exposed services, ports, and unused assets = attack surface management. Preventing injection flaws in new code = secure coding.",
      },
      {
        heading: "Validation of Remediation",
        explain:
          "A fix is not finished until someone proves it worked. Validation closes the loop and catches problems that come back.",
        points: [
          "Validation of Remediation: Validation of remediation is the process of confirming that a vulnerability has been successfully fixed.",
          "Rescanning: Rescanning involves performing another vulnerability scan after remediation to verify that the issue no longer exists.",
          "Verification Testing: Verification testing confirms that the implemented fix effectively eliminates the vulnerability.",
          "Security Monitoring: Security monitoring ensures that remediated vulnerabilities do not reappear and that systems remain secure over time.",
        ],
        remember:
          "Think of fixing a leaking pipe. Rescanning = turning the water back on and looking for drips. Verification testing = pressure-testing the repair. Security monitoring = checking again next week in case it leaks again. You do not say the pipe is fixed until you have tested it.",
        examTip:
          "Patch was applied and the ticket is about to be closed = the next step is rescan to confirm. Patch applied but the scanner still shows the flaw = investigate (failed install, reboot needed, or false positive). Vulnerabilities returning after being fixed = add security monitoring and review configuration management.",
      },
    ],
  },

  {
    id: "domain-2-4",
    title: "Vulnerability Response, Handling, and Management",
    domain: "Domain 2.0",
    domainName: "Vulnerability Management",
    module: "2.4",
    moduleName: "Vulnerability Mitigation",
    description:
      "Control types and functions, risk concepts, risk management strategies, policies and governance, SLOs, application security testing, and third-party risk.",
    lastUpdated: "Oct 13, 2026",
    access: "Free",
    icon: ShieldCheck,
    estimatedTime: "2 hours",
    sections: [
      {
        heading: "Control Types",
        explain:
          "Security controls are grouped by how they are delivered. Some are rules for people, some are built into technology, and some protect the physical world.",
        points: [
          "Administrative Controls: Administrative controls are policies, procedures, standards, and training programs that guide how people manage and protect organizational resources.",
          "Technical Controls: Technical controls are security measures implemented through hardware or software to protect systems and data. Examples: firewalls, antivirus software, encryption, IDS/IPS, and multi-factor authentication (MFA).",
          "Physical Controls: Physical controls are measures that protect facilities, equipment, and personnel from unauthorized physical access. Examples: security guards, locks, fences, security cameras, and biometric scanners.",
        ],
        remember:
          "Think of a school. Administrative = the rulebook and the safety training for staff. Technical = the electronic gate and the cameras' software. Physical = the fence, the locked doors, and the guard at the entrance. Rules for people, tools in technology, barriers in the real world.",
        examTip:
          "Policy, procedure, standard, or training = administrative. Firewall, encryption, MFA, or IDS = technical. Lock, fence, guard, camera, or biometric scanner = physical. Questions give you an example and ask you to name the type, so match the example first.",
      },
      {
        heading: "Control Functions",
        explain:
          "Controls are also grouped by what they do in the life of an incident: stop it, spot it, react to it, or fix the damage.",
        points: [
          "Preventative Controls: Preventative controls are designed to stop security incidents from occurring before they happen. Examples: firewalls, MFA, access controls, and security awareness training.",
          "Detective Controls: Detective controls identify and alert organizations when suspicious or unauthorized activities occur. Examples: SIEM systems, IDS, log monitoring, and security audits.",
          "Responsive Controls: Responsive controls take action during or immediately after a security event to limit damage and contain threats. Examples: incident response procedures, account lockouts, and automated containment actions.",
          "Corrective Controls: Corrective controls restore systems and operations after a security incident and prevent the issue from reoccurring. Examples: patching, backups, system restoration, and disaster recovery plans.",
        ],
        remember:
          "Think of a house fire. Preventative = the fireproof wiring and the rule not to leave the stove on. Detective = the smoke alarm. Responsive = the sprinklers and the fire brigade putting it out. Corrective = rebuilding the kitchen and fixing the faulty wire. Before, during detection, during response, and after.",
        examTip:
          "Stops it before it happens = preventative. Alerts or logs after something suspicious happens = detective. Contains or limits damage as it happens = responsive. Restores systems or fixes the root cause afterwards = corrective. The same tool can fit more than one function, so read what the scenario says the control is doing. Note that CompTIA often lists the function names as preventive, detective, corrective, and responsive.",
      },
      {
        heading: "Risk Concepts",
        explain:
          "Risk never reaches zero. Analysts describe how much risk exists before controls, how much is left after, and how much the business is willing to live with.",
        points: [
          "Risk Appetite: Risk appetite is the amount of risk an organization is willing to accept in pursuit of its objectives.",
          "Residual Risk: Residual risk is the level of risk that remains after security controls and mitigation measures have been implemented.",
          "Inherent Risk: Inherent risk is the level of risk that exists before any security controls or safeguards are applied.",
          "Memory Tip: Inherent Risk → Controls Applied → Residual Risk.",
        ],
        remember:
          "Think of driving. Inherent risk = the danger of driving with no seatbelt, no airbags, and no rules. Controls = seatbelt, airbags, and speed limits. Residual risk = the danger that is still there after all of that. Risk appetite = how much danger you are willing to accept to get to work on time.",
        examTip:
          "Risk before any controls = inherent. Risk left after controls = residual. If residual risk is higher than the risk appetite, add more controls or choose another strategy. Residual risk is never zero. A question about how much risk leadership will tolerate = risk appetite.",
      },
      {
        heading: "Risk Management Strategies",
        explain:
          "When a risk is identified, an organization has four basic choices: live with it, pass it on, remove it, or reduce it.",
        points: [
          "Accept: Accepting risk means acknowledging a risk and deciding not to take additional action because the impact is considered acceptable.",
          "Transfer: Transferring risk involves shifting the financial or operational impact of a risk to another party. Example: purchasing cyber insurance.",
          "Avoid: Avoiding risk means eliminating activities or conditions that create the risk. Example: disabling an insecure service.",
          "Mitigate: Mitigating risk involves implementing security controls that reduce the likelihood or impact of a threat. Example: applying security patches and enabling MFA.",
        ],
        remember:
          "Think of a rainy day. Accept = go out and get wet because it is only a drizzle. Transfer = take a taxi so the weather becomes the driver's problem (insurance). Avoid = stay home. Mitigate = take an umbrella and wear a raincoat. Four answers to the same storm.",
        examTip:
          "Buying cyber insurance or outsourcing = transfer. Shutting down a risky service or dropping the activity = avoid. Patching, MFA, or segmentation = mitigate. Documenting that leadership knowingly lives with it = accept. Cyber insurance moves the cost but does not remove the risk itself.",
      },
      {
        heading: "Policies, Governance, and Service-Level Objectives (SLOs)",
        explain:
          "Written rules, oversight, and measurable targets keep security work consistent and make sure it supports the business.",
        points: [
          "Policies: Policies are formal documents that define security requirements, expectations, and acceptable behavior within an organization.",
          "Governance: Governance is the framework used to direct, manage, and monitor an organization's security activities to ensure compliance and alignment with business goals.",
          "Service-Level Objectives (SLOs): Service-Level Objectives (SLOs) are measurable targets that define the expected performance, availability, or reliability of a service. Example: maintaining 99.9% system uptime.",
        ],
        remember:
          "Think of a football league. Policies = the rulebook. Governance = the league officials who make sure every team follows the rules and the league's goals are met. SLO = the scoreboard target, like winning 9 of 10 matches. Rules, oversight, and measurable goals.",
        examTip:
          "Formal document stating what is and is not allowed = policy. Framework for oversight, compliance, and alignment with business goals = governance. A number you can measure, like 99.9% uptime or patch critical flaws within 7 days = SLO. A measurable remediation deadline is a classic SLO example.",
      },
      {
        heading: "Application Security",
        explain:
          "Application security testing finds weaknesses in software, either by reading the code or by attacking the running program.",
        points: [
          "Static Application Security Testing (SAST): SAST analyzes application source code, bytecode, or binaries for security vulnerabilities without running the application.",
          "Dynamic Application Security Testing (DAST): DAST analyzes a running application by testing it from the outside to identify security vulnerabilities during operation.",
          "Software Assurance Maturity Model (SAMM): SAMM is a framework that helps organizations evaluate, measure, and improve the security maturity of their software development processes.",
          "Memory Tip: SAST = scan code before execution. DAST = test application while running.",
        ],
        remember:
          "Think of checking a car. SAST = reading the blueprints and engine design before the car is built, looking for mistakes. DAST = taking the finished car on a test drive and trying to make it fail. SAMM = the grading chart that shows how mature your whole car factory is at building safe cars.",
        examTip:
          "Has source code and the app is not running = SAST (finds problems early, in development). Testing a live app from the outside, with no source code = DAST. Measuring how mature the development security program is, or planning improvements = SAMM. SAST can have false positives, and DAST cannot point to the exact line of code.",
      },
      {
        heading: "Third-Party Risk",
        explain:
          "Software and hardware rarely come from one place. Weaknesses in vendors and components can enter your environment even when your own work is secure.",
        points: [
          "Supply Chain: Supply chain risk refers to security threats introduced through vendors, suppliers, service providers, hardware, software, or other external dependencies.",
          "Software Composition Analysis (SCA): Software Composition Analysis is the process of identifying and evaluating third-party and open-source software components used within applications for vulnerabilities and licensing issues.",
          "Software Bill of Materials (SBOM): A Software Bill of Materials is a detailed inventory of all software components, libraries, dependencies, and versions used to build an application.",
          "Memory Tip: SCA = finds vulnerable components. SBOM = lists all components.",
        ],
        remember:
          "Think of a packaged meal. The SBOM = the ingredients label that lists everything inside. SCA = the lab test that checks each ingredient for contamination. Supply chain risk = the farm that grew a bad ingredient. You did not grow it, but it is still in your meal.",
        examTip:
          "A list of every library and version in an application = SBOM. Scanning those components for known vulnerabilities and license problems = SCA. A new flaw like Log4j appears and you must find which apps use it = check the SBOM. Compromised vendor update or tampered component = supply chain attack.",
      },
    ],
  },

  // Domain 3.0: Incident Response and Management (24%)
  {
    id: "domain-3-1",
    title: "Attack Methodologies and Frameworks",
    domain: "Domain 3.0",
    domainName: "Incident Response and Management",
    module: "3.1",
    moduleName: "Attack Methodologies and Frameworks",
    description:
      "MITRE ATT&CK framework, cyber kill chain, attack patterns, threat actor TTPs, and attack lifecycle.",
    lastUpdated: "Oct 9, 2026",
    access: "Free",
    icon: Brain,
    estimatedTime: "2 hours",
    sections: [
      {
        heading: "Cyber kill chain",
        explain:
          "Scanning and mapping the network to understand its structure, devices, and potential vulnerabilities.",
        points: [
          "Reconnaissance: The attacker gathers information about the target, such as users, systems, email addresses, and network infrastructure.",
          "Weaponization: The attacker creates or prepares a malicious payload, such as malware or a phishing document, to use against the target.",
          "Delivery: The attacker delivers the malicious payload to the target through methods such as email, websites, USB devices, or malicious downloads.",
          "Exploitation: The attacker exploits a vulnerability or weakness to execute malicious code on the target system.",
          "Installation: The attacker installs malware or other malicious tools on the compromised system to maintain access.",
          "Command and Control (C2): The compromised system communicates with the attacker's server, allowing the attacker to remotely control the device.",
          "Actions on Objectives: The attacker performs their final objective, such as stealing data, encrypting files, disrupting services, or conducting espionage."
        ],
        remember:
          "The kill chain is a linear, 7-step sequence: Recon, Weaponization, Delivery, Exploitation, Installation, C2, Actions on Objectives. Break the chain at any step and the attack fails.",
        examTip:
          'Memorize the order and match scenarios to phases. A phishing email being sent is Delivery. Code running after a user opens the attachment is Exploitation. A backdoor being planted is Installation. Beaconing to an external server is C2. Also remember that the kill chain is linear, while ATT&CK is not.',
      },
      {
        heading: "Diamond Model Analysis",
        explain:
          "Analytical model to understand and describe cyber attacks through four core features: adversary, capability, infrastructure, and victim.",
        points: [
          'Tactics: The "why" or goal. Examples: Initial Access, Persistence, Privilege Escalation, Defense Evasion, Discovery, Lateral Movement, Execution, Collection, Exfiltration, Impact.',
          'Techniques: The "how" or method. Example: Phishing (tactic: Initial Access), PowerShell (tactic: Execution).',
          "Procedures: Real-world implementations by specific threat actors. Example: APT28 uses spear-phishing.",
          "Mitigations: How to defend. Example: User training for phishing defense.",
          "Detection: How to detect the technique. Example: Monitor for PowerShell child processes.",
        ],
        remember:
          "Every intrusion event has four corners: Adversary, Capability, Infrastructure, Victim. Analysts pivot between them. For example, a known C2 domain can lead you to the adversary and to other victims.",
        examTip:
          "Capability means the tools (malware, exploits). Infrastructure means what the attacker uses to reach the victim (IPs, domains, C2 servers). If a question asks which model relates adversary, victim, and tools to support attribution or pivoting, the answer is the Diamond Model.",
      },
      {
        heading: "MITRE ATT&CK Initial",
        explain:
          "MITRE ATT&CK is a knowledge base and framework that documents real-world attacker behavior by organizing tactics and techniques used throughout the attack lifecycle.",
        points: [
          "Reconnaissance: The attacker gathers information about the target before launching an attack.",
          "Resource Development: The attacker acquires or develops resources such as domains, infrastructure, accounts, or malware.",
          "Initial Access: The attacker gains entry into a target environment.",
          "Execution: The attacker runs malicious code on a target system.",
          "Persistence: The attacker maintains long-term access to compromised systems.",
          "Privilege Escalation: The attacker gains higher levels of access or permissions.",
          "Defense Evasion: The attacker attempts to avoid detection by security controls.",
          "Credential Access: The attacker attempts to steal usernames, passwords, or authentication tokens.",
          "Discovery: The attacker gathers information about systems, users, and network resources.",
          "Lateral Movement: The attacker moves from one system to another within the environment.",
          "Collection: The attacker gathers data of interest from compromised systems.",
          "Command and Control: The attacker communicates with compromised systems remotely.",
          "Exfiltration: The attacker transfers stolen data out of the environment.",
        ],
        remember:
          "Attackers must get in. Then they must stay in and move around. Detect each stage. Tactics are the why, techniques are the how, and procedures are specific real-world implementations.",
        examTip:
          "Know the difference: tactic is the goal (Persistence), technique is the method (Scheduled Task), procedure is how a specific group does it (APT28 spear-phishing). ATT&CK is not a strict linear sequence. Attackers can skip or repeat tactics. It is used for threat hunting, detection gap analysis, and red or purple team planning.",
      },
    ],
  },

  {
    id: "domain-3-2",
    title: "Incident Response and Detection Process",
    domain: "Domain 3.0",
    domainName: "Incident Response and Management",
    module: "3.2",
    moduleName: "Incident Response Process",
    description:
      "IR phases: detection, analysis, containment, eradication, recovery, and lessons learned. IR team roles and communication.",
    lastUpdated: "Oct 9, 2026",
    access: "Free",
    icon: Zap,
    estimatedTime: "5 hours",
    sections: [
      {
        heading: "Incident Response Process",
        explain:
          "IR phases: preparation, detection, analysis, containment, eradication, recovery, and post-incident activities.",
        points: [
          "Preparation: Establish policies, procedures, tools, training, and resources before incidents occur.",
          "Detection: Identify potential security incidents through monitoring systems, alerts, logs, security tools, and threat intelligence.",
          "Analysis: Investigate an incident to determine its cause, scope, severity, affected systems, and potential business impact.",
          "Containment: Limit the spread and impact of an incident by isolating affected systems, accounts, or network segments.",
          "Eradication: Remove the root cause of an incident, including malware, vulnerabilities, malicious accounts, or unauthorized access.",
          "Recovery: Restore systems, applications, and services to normal operation while ensuring they are secure and functioning properly.",
          "Post-Incident: Review the incident, document lessons learned, perform root cause analysis, and implement improvements to prevent future incidents.",
        ],
        remember:
          "Effective incident response requires preparation and structured handling of each phase.",
        examTip:
          "Understand the sequence and purpose of each IR phase. Know key activities and responsibilities.",
      },
    ],
  },

  {
    id: "domain-3-3",
    title: "Digital Forensics and Evidence Handling",
    domain: "Domain 3.0",
    domainName: "Incident Response and Management",
    module: "3.3",
    moduleName: "Digital Forensics Concepts",
    description:
      "Evidence collection procedures, chain of custody, memory and disk forensics, log analysis, and preservation techniques.",
    lastUpdated: "Oct 9, 2026",
    access: "Premium",
    icon: Terminal,
    estimatedTime: "5 hours",
    sections: [
      {
        heading: "Developing Plans",
        explain:
          "Planning for digital forensics involves preparing procedures, tools, and responsibilities before an incident occurs.",
        points: [
          "Incident Response Plan: An incident response plan is a documented set of procedures that outlines how an organization prepares for, detects, responds to, and recovers from security incidents.",
          "Communication Plan: A communication plan defines how incident-related information will be communicated to employees, management, customers, vendors, and other stakeholders during a security incident."
        ],
        remember:
          "Preparation is key. Have your plan written, reviewed, and tested before an incident strikes. The IR Plan is the master procedure; the Communication Plan controls who gets told what.",
        examTip:
          'Questions about "notifying stakeholders" or "reporting to executives" = Communication Plan. Questions about "procedures for handling" an incident = Incident Response Plan.',
      },
      {
        heading: "Creating Playbooks",
        explain:
          "Creating playbooks involves defining step-by-step procedures for handling incidents, ensuring consistency and compliance.",
        points: [
          "Creating Playbooks: Creating playbooks involves developing step-by-step procedures that guide responders through handling specific types of security incidents."
        ],
        remember:
          "Playbooks = the script. They give responders consistent, repeatable steps for a specific type of incident (phishing, ransomware, data breach, etc.).",
        examTip:
          'Scenarios asking "what should the responder do" or needing "step-by-step procedures for a specific incident type" = Playbook.',
      },
      {
        heading: "Defining Roles",
        explain:
          "Defining roles assigns clear responsibilities and authority so nobody is guessing during an incident.",
        points: [
          "Defining Roles: Defining roles ensures that each team member understands their responsibilities and authority during incident response activities."
        ],
        remember:
          "Roles = who says their lines. Everyone must know their part, and who has the authority to make decisions, before the incident starts.",
        examTip:
          'Scenarios asking "who is responsible" or "who has the authority to decide" = Defining Roles.',
      },
      {
        heading: "Performing Training",
        explain:
          "Regular training ensures responders can execute incident response procedures effectively.",
        points: [
          "Tabletop: A tabletop exercise is a discussion-based training session where participants review and walk through a simulated incident scenario.",
          "Simulation: A simulation is a hands-on exercise that allows responders to practice handling realistic security incidents in a controlled environment.",
        ],
        remember:
          "Tabletop = talking through it. Simulation = doing it for real (but in a safe sandbox). Both are essential.",
        examTip:
          'Questions about "discussion-based training" or "walking through a scenario" = Tabletop. Questions about "hands-on practice" or "controlled environment testing" = Simulation.',
      },
      {
        heading: "Log Management",
        explain:
          "Effective log collection and analysis during incidents reveals how the attack unfolded.",
        points: [
          "Log Collection: Log collection is the process of gathering logs from systems, applications, devices, and security tools for monitoring and investigation.",
          "Log Correlation: Log correlation is the process of analyzing and connecting related events from multiple log sources to identify suspicious activity.",
          "Log Augmentation and Enrichment: Log augmentation and enrichment involve adding additional context, metadata, or threat intelligence to logs to improve analysis.",
        ],
        remember:
          "Collect everything. Correlate to find patterns. Enrich with context to understand meaning.",
        examTip:
          "Collecting raw data = Log Collection. Connecting dots between different sources = Log Correlation. Adding threat intel or IP geolocation = Log Augmentation and Enrichment.",
      },
      {
        heading: "Incident Handling",
        explain:
          "Detecting and categorizing incidents properly ensures critical issues are handled first.",
        points: [
          "Alerts and Notifications: Alerts and notifications inform security personnel when suspicious activity or potential security incidents are detected.",
          "Triage: Triage is the process of assessing and categorizing incidents based on their urgency, severity, and business impact.",
          "Establishment of a Timeline: Establishing a timeline involves creating a chronological sequence of events to better understand how an incident occurred.",
          "Determining Severity and Impact: Determining severity and impact involves evaluating the seriousness of an incident and its effect on systems, data, and business operations.",
          "Prioritization: Prioritization is the process of ranking incidents according to risk level, impact, and urgency to ensure the most critical issues are addressed first.",
        ],
        remember:
          "Alert fires. Triage decides which patient is sickest. Timeline shows how it happened. Severity tells you how bad. Prioritization tells you what to fix first.",
        examTip:
          'Scenario with multiple incidents = use Triage and Prioritization to determine order. Scenario asking "when did it start" = Establishment of a Timeline. Scenario about "which data was exposed" = Determining Severity and Impact.',
      },
      {
        heading: "Evidence Gathering",
        explain:
          "Proper evidence handling ensures admissibility in legal proceedings and supports thorough investigations.",
        points: [
          "Chain of Custody: Chain of custody is the documented process of tracking evidence from collection to final disposition to ensure accountability and legal admissibility.",
          "Data Integrity Validation: Data integrity validation is the process of confirming that collected evidence has not been altered, modified, or corrupted.",
          "Preservation: Preservation is the process of protecting evidence in its original state to support investigations and potential legal proceedings.",
          "Legal Hold: A legal hold is a requirement to preserve relevant data and evidence because of current or anticipated legal action.",
        ],
        remember:
          "Evidence is fragile. Protect it, document who touches it, prove it has not changed, and never let it be deleted.",
        examTip:
          'Questions about "admissible in court" or "tracking who handled evidence" = Chain of Custody. Questions about "proof the file was not modified" = Data Integrity Validation. Questions about "protecting evidence in its original state" = Preservation. Questions about "must not delete data" due to legal action = Legal Hold.',
      },
      {
        heading: "Containment and Escalation",
        explain:
          "Stopping the attack from spreading and escalating when additional expertise is needed.",
        points: [
          "Isolating Affected Targets: Isolating affected targets involves separating compromised devices, systems, or accounts from the network to prevent further damage.",
          "Escalation: Escalation is the process of transferring an incident to higher-level personnel or specialized teams when additional expertise or authority is required.",
        ],
        remember:
          "Isolation = build a firewall around the problem. Escalation = call in the specialists or decision makers.",
        examTip:
          "Scenario with compromised system = Isolate it immediately. Scenario needing executive decision or specialized knowledge = Escalate.",
      },
      {
        heading: "Recovery Activities",
        explain:
          "Returning systems to normal operation after the incident is contained and resolved.",
        points: [
          "Remediation and Verification: Remediation and verification involve fixing identified security issues and confirming that the corrective actions successfully resolved the problem.",
          "Release from Isolation: Release from isolation occurs when a previously compromised system is confirmed secure and allowed to reconnect to the production environment.",
          "Performing Restoration: Performing restoration involves returning systems, services, and data to normal operational status after an incident.",
        ],
        remember:
          "Fix it. Verify it is fixed. Release it back carefully. Restore everything to normal.",
        examTip:
          'Scenario about "fixing the vulnerability" = Remediation. Scenario about "testing before reconnecting" = Verification. Scenario about "reconnecting a cleaned system" = Release from Isolation. Scenario about "resuming normal service" = Restoration.',
      },
      {
        heading: "Post-Incident Activities",
        explain:
          "Learning from incidents and improving defenses prevents future occurrences.",
        points: [
          "Root Cause Analysis (RCA): Root cause analysis is the process of identifying the underlying cause of an incident to prevent similar incidents from occurring in the future.",
          "Corrective Action Development: Corrective action development involves creating and implementing improvements to security controls, processes, and procedures based on lessons learned from the incident.",
        ],
        remember:
          "RCA finds the root problem, not just the symptom. Corrective actions fix it so it never happens again.",
        examTip:
          'Questions about "why did this happen" or "what allowed the attack" = RCA. Questions about "how do we prevent this" or "process improvements" = Corrective Action Development.',
      },
    ],
  },


  // Domain 4.0: Reporting and Communication (16%)
  {
    id: "domain-4-1",
    title: "Reporting Techniques and Report Types",
    domain: "Domain 4.0",
    domainName: "Reporting and Communication",
    module: "4.1",
    moduleName: "Reporting Techniques",
    description:
      "Report types and audiences, executive summaries, technical reports, incident reports, vulnerability reports, and risk communication.",
    lastUpdated: "Oct 9, 2026",
    access: "Free",
    icon: FileText,
    estimatedTime: "2 hours",
    sections: [
      {
        heading: "Report Types and Purposes",
        explain:
          "Different stakeholders need different information. Reports must be tailored to audience and purpose.",
        points: [
          "Executive report: High-level summary. What happened? Impact? Cost? What did we do? No technical details.",
          "Technical report: Detailed analysis. Attack vectors, indicators of compromise, forensic findings. For technical team.",
          "Incident report: What, when, where, who, why, how. Detailed incident description. For documentation.",
          "Vulnerability report: What is vulnerable? Severity? How to fix? For development and security teams.",
          "Risk report: Risk ranking. Business impact. Remediation timeline. For management decision-making.",
        ],
        remember:
          "Match report complexity to audience knowledge level. Executives want bottom line. Technicians want details.",
        examTip:
          'Scenarios asking "who should receive this report" require understanding audience and report type.',
      },
      {
        heading: "Executive Communication",
        explain: "Executives need business impact, not technical details.",
        points: [
          "What happened: 1-2 sentence incident description.",
          "Impact: How much revenue lost? Customers affected? Compliance violation? What is the business damage?",
          "Cost: Investigation cost? Remediation cost? Lost productivity? Total cost to business.",
          "Response: What did we do? How fast? What did we fix?",
          "Future: Will this happen again? What is the plan?",
        ],
        remember:
          "Executives care about risk and cost. Translate technical findings into business impact.",
      },
      {
        heading: "Technical Report Structure",
        explain:
          "Technical reports provide detailed findings for technical teams.",
        points: [
          "Executive summary: 1-page summary of findings.",
          "Methodology: How investigation was conducted. What tools used? Timeline of investigation.",
          "Findings: Detailed technical findings. Attack vector, malware analysis, timeline, indicators.",
          "Evidence: Forensic evidence supporting findings. Logs, screenshots, file hashes.",
          "Recommendations: Specific remediation steps. Priority. Resource requirements.",
        ],
        remember:
          "Technical reports need detail and evidence. Back every claim with forensic proof.",
      },
      {
        heading: "Data Visualization and Clarity",
        explain: "Clear presentation of findings improves understanding.",
        points: [
          "Timeline diagrams: Visual representation of attack progression.",
          "Impact summary: Affected systems, users, data in easy-to-scan format.",
          "Risk heat maps: Visual risk prioritization.",
          "Before/after: Show security posture improvements.",
        ],
        remember:
          "A picture is worth 1000 words. Use visuals to clarify complex findings.",
      },
    ],
    quickReview: [
      "Executive report: Business impact, cost, response taken. No technical details.",
      "Technical report: Detailed findings, methodology, evidence, recommendations.",
      "Match report to audience. Executives = business. Technicians = technical detail.",
      "Include: Executive summary, findings, evidence, recommendations in technical report.",
      "Use visuals: Timelines, heat maps, charts to clarify findings.",
      "Avoid jargon in executive report. Define technical terms in technical report.",
    ],
    glossary: [
      {
        term: "Executive Summary",
        meaning:
          "High-level overview of findings for non-technical stakeholders.",
      },
      {
        term: "Forensic Evidence",
        meaning: "Data proving attack methods and attacker actions.",
      },
      {
        term: "Risk Ranking",
        meaning: "Prioritization of risks by severity and business impact.",
      },
      {
        term: "Remediation",
        meaning: "Actions taken to fix the vulnerability or incident.",
      },
    ],
  },
  {
    id: "domain-4-2",
    title: "Dashboards and Security Metrics",
    domain: "Domain 4.0",
    domainName: "Reporting and Communication",
    module: "4.2",
    moduleName: "Dashboards and Metrics",
    description:
      "KPIs, security metrics, trend analysis, data visualization, compliance metrics, and real-time monitoring dashboards.",
    lastUpdated: "Oct 9, 2026",
    access: "Free",
    icon: BarChart3,
    estimatedTime: "2 hours",
    sections: [
      {
        heading: "Security KPIs and Metrics",
        explain: "Quantifiable metrics show security program effectiveness.",
        points: [
          "Vulnerability metrics: Number discovered, remediation rate, time to patch by severity.",
          "Detection metrics: Alerts generated, false positive rate, MTTR (Mean Time To Respond).",
          "Incident metrics: Incidents per month (trending down is good), average dwell time, MTTR.",
          "Compliance metrics: Percentage of controls implemented, audit findings, compliance trending.",
          "User metrics: Training completion rate, phishing click rate, policy compliance rate.",
        ],
        remember:
          "Metrics should trend in positive direction. Increase detection, decrease incidents. Increase training, decrease clicks.",
      },
      {
        heading: "Dashboard Design",
        explain: "Effective dashboards present key metrics at a glance.",
        points: [
          "Executive dashboard: High-level metrics. Overall security posture. Risk trend. Compliance status.",
          "Operations dashboard: Real-time alerts, current incidents, system health, blocked threats.",
          "Metrics dashboard: KPI trends over time. Month-over-month comparison. Goal tracking.",
          "Drill-down capability: Click on metric to see details. Executive dashboard for leaders, operational details for team.",
        ],
        remember:
          "Different roles need different dashboards. Executive vs Technical.",
        examTip:
          'Scenarios asking "what should leadership see" point to high-level dashboard vs detailed metrics.',
      },
      {
        heading: "Metrics Interpretation and Trending",
        explain:
          "Raw numbers need context. Trending shows whether security is improving.",
        points: [
          "Baseline: Establish normal baseline. What is expected? Incidents should trend down after improvements.",
          "Trending: Track metric over time (days, weeks, months). Spike might indicate new threat or new detection.",
          "Anomalies: Sudden change in metric. Investigate why. New attack? New detection rule? Test?",
          "Context: Metric alone is meaningless. Budget spent? People hired? Tools implemented? Context explains metric.",
        ],
        remember:
          "Trending is more important than absolute number. Is security posture improving?",
      },
      {
        heading: "Compliance and Audit Metrics",
        explain: "Compliance metrics show regulatory requirement fulfillment.",
        points: [
          "Control implementation: Percentage of required controls implemented and operating.",
          "Audit findings: Number, severity, remediation status. Track to closure.",
          "Assessment results: Periodic audits and assessments. Trend should improve.",
          "Policy compliance: Percentage of users compliant with security policies.",
        ],
        remember:
          "Compliance metrics often overlap with security metrics. A strong security program meets compliance.",
      },
    ],
    quickReview: [
      "Key metrics: Vulnerabilities discovered, incidents per month, MTTR, training completion, phishing click rate.",
      "Executive dashboard: Overall posture, risk trend, compliance status. High-level only.",
      "Operations dashboard: Real-time alerts, current incidents, system health.",
      "Trending is critical. Metrics should improve after security improvements.",
      "Baseline establishes normal. Spike requires investigation (threat or detection change?).",
      "Compliance metrics show regulatory requirement fulfillment.",
    ],
    glossary: [
      {
        term: "KPI",
        meaning:
          "Key Performance Indicator, quantifiable metric of effectiveness.",
      },
      { term: "MTTR", meaning: "Mean Time To Respond or Resolve." },
      { term: "Baseline", meaning: "Normal expected value for a metric." },
      { term: "Trending", meaning: "Pattern of metric change over time." },
    ],
  },
  {
    id: "domain-4-3",
    title: "Stakeholder Communication and Escalation",
    domain: "Domain 4.0",
    domainName: "Reporting and Communication",
    module: "4.3",
    moduleName: "Stakeholder Communication",
    description:
      "Communicating with technical and non-technical audiences, escalation procedures, risk communication, crisis communication, and audience adaptation.",
    lastUpdated: "Oct 9, 2026",
    access: "Free",
    icon: Users,
    estimatedTime: "2 hours",
    sections: [
      {
        heading: "Audience-Based Communication",
        explain:
          "Different audiences need different information presented differently.",
        points: [
          "Executive audience: Business impact, cost, risk, timeline. Minimal technical detail.",
          "IT operations: How to fix, timeline to resolution, business continuity impact.",
          "Developers: Vulnerability details, reproduction steps, secure coding solution.",
          "End users: What to do, how to protect yourself, when to report suspicious activity.",
          "Board of directors: Strategic risk, market impact, competitive advantage, investor confidence.",
        ],
        remember:
          "Tailor message to what audience cares about. Executives care about risk/cost. Developers care about how to fix.",
      },
      {
        heading: "Escalation Procedures",
        explain:
          "Clear escalation ensures incident severity gets appropriate attention.",
        points: [
          "Severity levels: Define what triggers escalation. Loss of service? Sensitive data? Executive notification required?",
          "Escalation path: Who do you tell? When? Chain of command matters.",
          "Timing: Escalate immediately on serious issues. Do not delay hoping to fix it.",
          "Communication cadence: How often to update? Critical issues: hourly. Major issues: daily. Minor issues: weekly.",
        ],
        remember:
          "Escalate early. Better to have leadership overreact than find out too late.",
      },
      {
        heading: "Crisis Communication",
        explain: "Major incidents require controlled, strategic communication.",
        points: [
          "Rapid response: Issue initial statement quickly. Acknowledge issue. Show you are taking action.",
          'Accurate information: Only communicate what you know. Say "we are investigating" if facts not confirmed.',
          "Consistent messaging: Brief all communicators on key points. Prevent contradictions.",
          "Transparency vs operational security: Be honest about impact without revealing attack methods to other attackers.",
          "Follow-up: Provide updates as situation develops. Radio silence increases speculation.",
        ],
        remember: "In crisis: Communicate fast, accurately, and consistently.",
      },
      {
        heading: "Risk Communication",
        explain: "Helping stakeholders understand and accept security risks.",
        points: [
          "Risk level: Clearly state risk (high/medium/low). What is at stake? What is probability?",
          "Business impact: Why does this matter? Revenue? Customers? Compliance?",
          "Mitigation: What will you do? Timeline? Resource requirements?",
          "Acceptance: Sometimes organizations accept risk (cost of fix exceeds risk). Ensure decision-makers approve.",
        ],
        remember:
          "Risk communication helps stakeholders make informed decisions about risk acceptance.",
      },
    ],
    quickReview: [
      "Tailor communication to audience. Executives = risk/cost. Technicians = how to fix.",
      "Escalate serious issues immediately. Do not delay.",
      "Communication cadence: Critical = hourly, Major = daily, Minor = weekly.",
      "Crisis communication: Fast, accurate, consistent. Acknowledge and show action.",
      "Transparency builds trust. Admit mistakes and what you will fix.",
      "Risk communication helps stakeholders accept or mitigate risk.",
    ],
    glossary: [
      {
        term: "Escalation",
        meaning: "Moving issue up chain of command for higher-level attention.",
      },
      {
        term: "Risk Acceptance",
        meaning: "Decision to accept a risk rather than remediate it.",
      },
      {
        term: "Dwell Time",
        meaning: "Duration between compromise and detection.",
      },
      {
        term: "Cadence",
        meaning: "Regular frequency of communication or updates.",
      },
    ],
  },
  {
    id: "domain-4-4",
    title: "Documentation and Compliance Management",
    domain: "Domain 4.0",
    domainName: "Reporting and Communication",
    module: "4.4",
    moduleName: "Documentation and Compliance",
    description:
      "Evidence documentation, audit support, regulatory requirements, security records management, retention policies, and compliance frameworks.",
    lastUpdated: "Oct 9, 2026",
    access: "Free",
    icon: Shield,
    estimatedTime: "2 hours",
    sections: [
      {
        heading: "Documentation Requirements",
        explain:
          "Proper documentation serves multiple purposes: incident investigation, compliance proof, and legal defense.",
        points: [
          "Incident documentation: What happened? When? Timeline. Decisions made. Why?",
          "Evidence documentation: Chain of custody. Who handled evidence? When? Why? Signatures.",
          "Investigation findings: What you discovered. How you discovered it. Evidence supporting conclusions.",
          "Remediation documentation: What did you fix? When? Who approved? Verification of fix effectiveness.",
        ],
        remember:
          "If it is not documented, it did not happen. Assume legal discovery and need to prove your actions.",
      },
      {
        heading: "Compliance Frameworks",
        explain:
          "Organizations must demonstrate compliance with industry and regulatory frameworks.",
        points: [
          "NIST Cybersecurity Framework: Five functions (Identify, Protect, Detect, Respond, Recover).",
          "ISO 27001: International standard for information security management system.",
          "SOC 2: Audits controls over security, availability, processing integrity, confidentiality, privacy.",
          "HIPAA: For health care. Requires encryption, access controls, audit logs.",
          "PCI DSS: For payment processing. Requires network segmentation, encryption, access control.",
        ],
        remember:
          "Compliance is an ongoing process, not a one-time audit. Implement and maintain controls continuously.",
      },
      {
        heading: "Audit and Assessment Support",
        explain:
          "Auditors assess your security program. Good documentation makes audits easier.",
        points: [
          "Audit readiness: Are you documenting controls? Logging access? Retaining logs?",
          'Evidence collection: Auditors request proof. "Show me your backup recovery test results." Ready your documentation.',
          "Exceptions: If you cannot meet a requirement, document why and what you are doing instead.",
          "Remediation tracking: Auditors find findings. Document your remediation plan and track to closure.",
        ],
        remember: "Audits go smoother with organized, complete documentation.",
      },
      {
        heading: "Records Management and Legal Hold",
        explain:
          "Security records must be retained properly for legal and compliance purposes.",
        points: [
          "Retention policy: How long to keep logs? Incident reports? Audit results? Usually 90 days minimum, compliance may require 7 years.",
          "Legal hold: If litigation is anticipated, preserve all related evidence. Do not delete anything even if retention period expired.",
          "Secure storage: Logs and evidence must be protected from tampering and unauthorized access.",
          "Accessibility: Records must be retrievable for investigation or audit. Organize so you can find needed evidence quickly.",
        ],
        remember:
          "Retention policy applies during normal operations. Legal hold supersedes retention policy during litigation.",
      },
    ],
    quickReview: [
      "Document everything: incidents, evidence, findings, remediation. Assume legal discovery.",
      "Chain of custody: Name, date, time, action, reason for every evidence interaction.",
      "NIST, ISO 27001, SOC 2, HIPAA, PCI DSS are major compliance frameworks.",
      "Auditors assess controls. Documentation proves you implemented and maintained them.",
      "Retention policy: Keep logs per policy (usually 90 days minimum). Legal hold: Keep everything if litigation anticipated.",
      "Accessible organization: Must be able to quickly retrieve evidence for investigation or audit.",
    ],
    glossary: [
      {
        term: "Chain of Custody",
        meaning:
          "Documentation of evidence handling from collection through investigation.",
      },
      {
        term: "Legal Hold",
        meaning:
          "Obligation to preserve evidence when litigation is anticipated.",
      },
      {
        term: "Retention Policy",
        meaning: "Rules governing how long to keep security records.",
      },
      {
        term: "SOC 2",
        meaning:
          "Audit framework assessing controls over security, availability, integrity, confidentiality, privacy.",
      },
    ],
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
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  description: string;
  estimatedTime: string;
  icon: LucideIcon;
  keyConceptsSummary: string;
  sections: Section[];
}

export const detailedStudyNotes: DetailedStudyNote[] = [
  {
    id: "network-security",
    title: "Network Security Fundamentals",
    category: "Network Security",
    difficulty: "Beginner",
    description:
      "Core concepts of network defense, firewalls, VPNs, IDS/IPS systems, and network segmentation.",
    estimatedTime: "4 hours",
    icon: Network,
    keyConceptsSummary:
      "Network security protects data in transit across networks. Key concepts include firewalls (filtering traffic), VPNs (encrypting connections), IDS/IPS (detecting threats), and segmentation (isolating critical systems).",
    sections: [
      {
        id: "firewall-basics",
        title: "1. Firewall Fundamentals",
        subsections: [
          {
            id: "firewall-def",
            title: "What is a Firewall?",
            content:
              "A firewall is a network security device that monitors and controls incoming and outgoing network traffic based on predetermined security rules. It acts as a barrier between trusted internal networks and untrusted external networks.\n\nTypes of Firewalls:\n• Stateless Firewalls: Examine packets individually without tracking connections\n• Stateful Firewalls: Track active connections and make decisions based on state\n• Next-Generation Firewalls (NGFW): Inspect application layer traffic and use threat intelligence\n• Hardware Firewalls: Protect entire networks\n• Software Firewalls: Protect individual devices",
          },
          {
            id: "firewall-rules",
            title: "Firewall Rules & Policies",
            content:
              "Firewall policies define how traffic is handled. Rules are processed in order (top-to-bottom) until a match is found.\n\nKey Concepts:\n• Allow Rules: Permit specific traffic\n• Deny Rules: Block specific traffic\n• Default Policy: Action taken when no rule matches (typically Deny)\n• Implicit Deny: All traffic denied unless explicitly allowed (best practice)\n• Logging: Recording matched rules for analysis and troubleshooting",
          },
          {
            id: "firewall-types",
            title: "Firewall Technologies",
            content:
              "Packet Filtering: Examines source/destination IP, ports, and protocols. Fast but limited.\n\nApplication Layer Gateway: Inspects application data. Slower but more effective against application-level attacks.\n\nProxy Firewall: Intercepts connections. Can mask internal IPs and provide caching.\n\nZone-Based Firewalls: Policies based on network zones (Inside, Outside, DMZ) with different trust levels.",
          },
        ],
      },
      {
        id: "vpn-security",
        title: "2. Virtual Private Networks (VPNs)",
        subsections: [
          {
            id: "vpn-overview",
            title: "VPN Basics",
            content:
              "A Virtual Private Network (VPN) creates an encrypted tunnel through a public network, allowing secure remote access and site-to-site connectivity.\n\nVPN Benefits:\n• Encryption: Protects data from eavesdropping\n• Privacy: Hides IP address and location\n• Secure Remote Access: Connect from anywhere securely\n• Site-to-Site Connectivity: Connect multiple office locations\n• Bypass Restrictions: Access resources from different regions",
          },
          {
            id: "vpn-types",
            title: "Types of VPNs",
            content:
              "Remote Access VPN: Users connect to corporate network from remote locations using VPN client software. Common in modern work environments for telecommuting.\n\nSite-to-Site VPN: Connects multiple office networks together. Two main types:\n• Router-to-Router VPN: Firewalls/routers encrypt tunnel\n• Host-to-Host VPN: End systems establish encrypted connections\n\nClient-to-Site VPN: Single user connects to network resources.",
          },
          {
            id: "vpn-protocols",
            title: "VPN Protocols",
            content:
              "IPSec: Industry standard, operates at network layer (Layer 3). Two modes:\n• Tunnel Mode: Encrypts entire packet (site-to-site)\n• Transport Mode: Encrypts only payload (end-to-end)\n\nSSL/TLS VPN: Uses HTTPS (port 443). No client software needed, access via web browser.\n\nL2TP/IPSec: Layer 2 protocol, combined with IPSec for security.\n\nWireGuard: Modern, lightweight VPN protocol with smaller attack surface.",
          },
        ],
      },
      {
        id: "ids-ips",
        title: "3. Intrusion Detection & Prevention",
        subsections: [
          {
            id: "ids-basics",
            title: "IDS vs IPS",
            content:
              "Intrusion Detection System (IDS):\n• Monitors network traffic for malicious activity\n• Alerts administrators when threats detected\n• Passive - does not stop attacks\n• Deployment: Mirror/SPAN port on switch\n\nIntrusion Prevention System (IPS):\n• Detects AND blocks malicious activity\n• Takes action automatically (drop packets, reset connections)\n• Active - prevents attacks from succeeding\n• Deployment: In-line on network path",
          },
          {
            id: "ids-detection",
            title: "IDS Detection Methods",
            content:
              "Signature-Based Detection:\n• Compares traffic against known attack signatures\n• Very effective against known threats\n• Cannot detect new/unknown attacks (zero-days)\n• Fast and low false positive rate\n\nAnomaly-Based Detection:\n• Learns normal baseline behavior\n• Alerts on deviations from baseline\n• Detects unknown attacks\n• High false positive rate initially\n• Requires training period",
          },
          {
            id: "ids-systems",
            title: "IDS/IPS Systems",
            content:
              "Network IDS/IPS (NIDS/NIPS):\n• Monitors entire network segment\n• Examples: Snort, Suricata, Cisco IPS\n• Placed at network perimeter or critical segments\n\nHost IDS/IPS (HIDS/HIPS):\n• Monitors individual host/system\n• Can see application-level attacks\n• Resource intensive\n• Examples: Wazuh, Osquery",
          },
        ],
      },
      {
        id: "network-segmentation",
        title: "4. Network Segmentation",
        subsections: [
          {
            id: "segmentation-concept",
            title: "Segmentation Principles",
            content:
              "Network segmentation divides a network into smaller subnets (segments) to improve security and performance.\n\nBenefits:\n• Containment: Limits lateral movement of attackers\n• Reduced Attack Surface: Limits access to critical systems\n• Performance: Reduces congestion and improves speed\n• Compliance: Meets regulatory requirements for data isolation\n• Access Control: Easier to enforce policies between segments",
          },
          {
            id: "dmz",
            title: "DMZ (Demilitarized Zone)",
            content:
              "A DMZ is a network segment with controlled access between internal network and internet.\n\nDMZ Characteristics:\n• Hosts public-facing servers (web, email, DNS)\n• Restricted access from internal network\n• No direct access to internal servers\n• Usually protected by dual firewalls\n\nTraffic Flow:\nInternet → Firewall 1 → DMZ → Firewall 2 → Internal Network\n\nIf DMZ server compromised, attacker still cannot easily access internal network.",
          },
          {
            id: "vlan-segmentation",
            title: "VLAN-Based Segmentation",
            content:
              "Virtual LANs (VLANs) allow logical network segmentation on physical infrastructure.\n\nVLAN Benefits:\n• Cost-effective segmentation\n• Flexible network design\n• Easy to implement access control\n• Reduces broadcast domains\n\nCommon VLAN Design:\n• VLAN 1: Management\n• VLAN 10: Servers\n• VLAN 20: Workstations\n• VLAN 30: IoT/Printers\n• VLAN 100: Guest\n\nVLAN Trunking: Allows multiple VLANs over single link using 802.1Q tagging.",
          },
        ],
      },
    ],
  },
  {
    id: "cryptography-encryption",
    title: "Cryptography & Encryption",
    category: "Cryptography",
    difficulty: "Intermediate",
    description:
      "Encryption algorithms, PKI, digital certificates, hashing, and secure communication protocols.",
    estimatedTime: "5 hours",
    icon: Key,
    keyConceptsSummary:
      "Cryptography uses mathematical algorithms to protect data confidentiality, integrity, and authenticity. Includes symmetric encryption (same key), asymmetric encryption (public/private keys), and hashing (one-way functions).",
    sections: [
      {
        id: "encryption-basics",
        title: "1. Encryption Fundamentals",
        subsections: [
          {
            id: "symmetric-encryption",
            title: "Symmetric Encryption",
            content:
              "Symmetric encryption uses the SAME key for both encryption and decryption.\n\nCharacteristics:\n• Fast and efficient\n• Small key size (128, 256 bits)\n• Challenge: Key distribution and management\n• Suitable for bulk data encryption\n\nCommon Algorithms:\n• AES (Advanced Encryption Standard): 128, 192, or 256-bit keys. NIST standard. Used in SSL/TLS\n• DES (Data Encryption Standard): 56-bit key. DEPRECATED - no longer secure\n• 3DES: Triple DES, applies DES three times. Legacy system support\n• Blowfish: 64-bit block size, 32-448 bit key\n• ChaCha20: Modern stream cipher, used in TLS 1.3",
          },
          {
            id: "asymmetric-encryption",
            title: "Asymmetric Encryption",
            content:
              "Asymmetric encryption uses a PUBLIC key (encrypt) and PRIVATE key (decrypt).\n\nCharacteristics:\n• Slower than symmetric encryption\n• Larger key sizes (2048, 4096 bits)\n• Solves key distribution problem\n• Used for key exchange and digital signatures\n\nCommon Algorithms:\n• RSA: Most widely used, based on factorization difficulty. 2048+ bits recommended\n• ECC (Elliptic Curve Cryptography): Smaller keys with equivalent security (256-bit ECC ≈ 3072-bit RSA)\n• Diffie-Hellman: Key exchange protocol, not encryption itself",
          },
          {
            id: "encryption-modes",
            title: "Encryption Modes",
            content:
              "Block cipher modes determine how plaintext blocks are processed:\n\nECB (Electronic Codebook): Simple mode, same plaintext → same ciphertext. INSECURE - reveals patterns\n\nCBC (Cipher Block Chaining): Each block depends on previous. IV required. Secure but vulnerable to padding oracle attacks\n\nCTR (Counter): Converts block cipher to stream cipher. Parallelizable and secure\n\nGCM (Galois/Counter Mode): Provides encryption + authentication. Recommended for new systems\n\nCFB/OFB: Stream cipher modes, suitable for small data units",
          },
        ],
      },
      {
        id: "hashing-integrity",
        title: "2. Hashing & Integrity",
        subsections: [
          {
            id: "hash-functions",
            title: "Hash Functions",
            content:
              "Hash functions convert any input into fixed-size output (hash/digest).\n\nProperties:\n• One-way: Cannot reverse hash to get original data\n• Deterministic: Same input = same output\n• Avalanche Effect: Small input change = completely different hash\n• Collision Resistant: Two different inputs produce different hashes\n• Fast: Compute quickly\n\nApplications:\n• Data Integrity: Verify data hasn't changed\n• Password Storage: Store hashed passwords, not plaintext\n• Digital Signatures: Hash document then sign hash\n• Blockchain: Chain blocks together using hashes",
          },
          {
            id: "hash-algorithms",
            title: "Hash Algorithms",
            content:
              "MD5 (Message Digest 5): 128-bit output. DEPRECATED - collisions found, insecure\n\nSHA-1 (Secure Hash Algorithm 1): 160-bit output. DEPRECATED - collisions demonstrated\n\nSHA-2 Family: SHA-256, SHA-384, SHA-512. Current standard, secure\n\nSHA-3: Latest standard, based on Keccak. Greater security margin than SHA-2\n\nBcrypt: Specifically designed for passwords with salt and iterations\n\nArgon2: Modern password hashing, memory-hard to resist GPU attacks",
          },
          {
            id: "hmac",
            title: "HMAC (Hash-based Message Authentication Code)",
            content:
              "HMAC combines hash function with secret key to provide both authenticity and integrity.\n\nHow it works:\n• Combines message + secret key\n• Hash the combination\n• Receiver with same key can verify message wasn't tampered\n\nFormula: HMAC(K,M) = Hash((K⊕opad) || Hash((K⊕ipad) || M))\n\nCommon Use Cases:\n• API Authentication: HMAC header in API requests\n• Cookie Verification: Ensure cookies haven't been modified\n• Message Authentication in TLS: Verify message integrity\n• OAuth/JWT: Token validation",
          },
        ],
      },
      {
        id: "pki-certificates",
        title: "3. Public Key Infrastructure (PKI)",
        subsections: [
          {
            id: "pki-overview",
            title: "PKI Concepts",
            content:
              "Public Key Infrastructure manages digital certificates and public keys.\n\nPKI Components:\n• Certificate Authority (CA): Issues digital certificates\n• Registration Authority (RA): Verifies identities\n• Certificate Revocation List (CRL): List of revoked certificates\n• OCSP (Online Certificate Status Protocol): Real-time certificate status\n\nTrust Model:\n• Root CA: Self-signed, highest level of trust\n• Intermediate CA: Issued by Root CA\n• End-Entity Certificate: Issued to users/servers\n• Certificate Chain: Root → Intermediate → End-Entity",
          },
          {
            id: "digital-certificates",
            title: "Digital Certificates",
            content:
              "Digital certificates bind public keys to identities using digital signatures.\n\nX.509 Certificate Contents:\n• Subject: Who the certificate is for (Common Name, Org, Country)\n• Issuer: Which CA issued it\n• Public Key: The actual public key\n• Serial Number: Unique identifier\n• Valid From/To: Validity period (typically 1-3 years)\n• Signature Algorithm: Algorithm used to sign\n• Extensions: Additional info (key usage, extended validation)\n\nCertificate Types:\n• DV (Domain Validation): Verify domain ownership. Cheap, quick\n• OV (Organization Validation): Verify organization identity. More trust\n• EV (Extended Validation): Rigorous verification. Green address bar (mostly removed now)",
          },
          {
            id: "certificate-management",
            title: "Certificate Management",
            content:
              "Certificate Lifecycle:\n1. Generation: Create key pair\n2. Request: Submit CSR (Certificate Signing Request)\n3. Verification: CA verifies identity\n4. Issuance: CA signs and issues certificate\n5. Installation: Deploy on servers\n6. Renewal: Renew before expiry (usually 30-90 days)\n7. Revocation: If compromised or no longer needed\n\nCRL vs OCSP:\n• CRL: Large file, updated periodically, not real-time\n• OCSP: Real-time status, more current, but higher latency\n\nSelf-Signed Certificates:\n• Signed by themselves (not by CA)\n• No third-party trust\n• Useful for internal systems, testing, development\n• Browsers warn about self-signed certs",
          },
        ],
      },
      {
        id: "secure-protocols",
        title: "4. Secure Communication Protocols",
        subsections: [
          {
            id: "ssl-tls",
            title: "SSL/TLS",
            content:
              "SSL (Secure Sockets Layer) and TLS (Transport Layer Security) provide secure communication.\n\nHistory:\n• SSL 3.0: Original protocol (DEPRECATED)\n• TLS 1.0: Successor to SSL 3.0 (DEPRECATED)\n• TLS 1.1: Added protections (DEPRECATED)\n• TLS 1.2: Current standard, widely used\n• TLS 1.3: Latest, simplified handshake, faster\n\nTLS Handshake (simplified):\n1. Client Hello: Client offers cipher suites and TLS versions\n2. Server Hello: Server selects cipher suite and TLS version\n3. Certificate Exchange: Server sends certificate\n4. Key Exchange: Negotiate session key (RSA, DH, ECDH)\n5. Finished: Both sides verify handshake\n6. Data Encryption: All data encrypted with session key",
          },
          {
            id: "ipsec-protocol",
            title: "IPSec",
            content:
              "IPSec (Internet Protocol Security) provides network-layer encryption and authentication.\n\nComponents:\n• IKE (Internet Key Exchange): Negotiates security parameters\n• ESP (Encapsulating Security Payload): Encrypts and authenticates packets\n• AH (Authentication Header): Authenticates only (less common)\n\nModes:\n• Transport Mode: Encrypts payload only (end-to-end)\n• Tunnel Mode: Encrypts entire IP packet (site-to-site VPN)\n\nAdvantages:\n• Network-layer protection (all applications benefit)\n• VPN capable\n• Perfect Forward Secrecy possible\n\nDisadvantages:\n• Complex configuration\n• Higher overhead than TLS\n• Slower than application-layer encryption",
          },
          {
            id: "other-protocols",
            title: "Other Security Protocols",
            content:
              "SSH (Secure Shell): Remote login and data transfer. Uses asymmetric for auth, symmetric for data\n\nS/MIME: Email encryption using certificates\n\nPGP (Pretty Good Privacy): Email encryption, hybrid approach (asymmetric + symmetric)\n\nDTLS: DTLS is TLS for UDP (datagram)\n\nWireGuard: Modern VPN protocol, minimalist design, better performance\n\nQuic: New transport protocol with built-in encryption, 0-RTT resumption",
          },
        ],
      },
    ],
  },
  {
    id: "threat-analysis",
    title: "Threat Analysis & Assessment",
    category: "Threat Intelligence",
    difficulty: "Intermediate",
    description:
      "Malware types, attack vectors, threat modeling, vulnerability assessment, and risk analysis.",
    estimatedTime: "6 hours",
    icon: AlertTriangle,
    keyConceptsSummary:
      "Understanding threats involves identifying malware types, analyzing attack vectors, modeling potential threats, and assessing vulnerabilities. Critical for building effective defenses.",
    sections: [
      {
        id: "malware-types",
        title: "1. Malware Types & Characteristics",
        subsections: [
          {
            id: "malware-basics",
            title: "Malware Categories",
            content:
              "Malware is malicious software designed to cause harm.\n\nViruses:\n• Requires host program to execute\n• Spreads via file sharing, email, USB\n• Self-replicating\n• Payload: Steal data, corrupt files, display messages\n\nWorms:\n• Self-replicating without host\n• Exploits network vulnerabilities\n• Spreads automatically\n• Examples: Conficker, Stuxnet\n\nTrojans:\n• Appears legitimate, contains hidden malware\n• Requires user execution\n• Creates backdoor access\n• Examples: Zeus banking trojan\n\nRootkits:\n• Runs with system privileges\n• Hides from detection\n• Difficult to remove\n• Can compromise entire OS",
          },
          {
            id: "advanced-malware",
            title: "Advanced Malware",
            content:
              "Ransomware:\n• Encrypts files/systems\n• Demands payment for decryption key\n• Examples: WannaCry, Ryuk\n• Prevention: Backups, patching, education\n\nAdware:\n• Displays unwanted advertisements\n• Can track user behavior\n• Often bundled with free software\n\nSpyware:\n• Secretly collects user information\n• Keyloggers, screen recorders\n• Violates privacy\n\nBotnet:\n• Infected computers (zombies) controlled remotely\n• Used for DDoS, spam, mining\n• Command and Control (C&C) infrastructure",
          },
          {
            id: "detection-prevention",
            title: "Malware Detection & Prevention",
            content:
              "Signature-Based Detection:\n• Matches malware signatures in database\n• Effective for known malware\n• Cannot detect zero-days\n• Fast detection\n\nHeuristic Detection:\n• Analyzes behavior and code structure\n• Detects variants and unknown malware\n• More false positives\n• Slower than signature detection\n\nBehavioral Detection:\n• Monitors runtime behavior\n• Detects execution of malicious actions\n• Works on unknown malware\n• Can have false positives\n\nSandbox Analysis:\n• Execute in isolated environment\n• Observe behavior safely\n• Time-consuming but thorough",
          },
        ],
      },
      {
        id: "attack-vectors",
        title: "2. Attack Vectors & Techniques",
        subsections: [
          {
            id: "social-engineering",
            title: "Social Engineering Attacks",
            content:
              "Phishing:\n• Fraudulent emails/websites mimicking legitimate sources\n• Trick users to provide credentials\n• Largest attack vector\n• 90%+ of breaches start with phishing\n\nSpear Phishing:\n• Targeted at specific individuals\n• Personalized information used\n• Higher success rate\n• More effort but better results\n\nVishing (Voice Phishing):\n• Phishing via phone calls\n• Social engineer pretends to be authority\n• Request sensitive information\n\nPretexting:\n• Create false scenario to trick victim\n• Establish false credibility\n• Extract information or access\n\nBaiting:\n• Offer something enticing (USB, prize)\n• Contains malware\n• Exploits curiosity",
          },
          {
            id: "network-attacks",
            title: "Network-Based Attacks",
            content:
              "DDoS (Distributed Denial of Service):\n• Overwhelm target with traffic from multiple sources\n• Botnet used to amplify attack\n• Prevents legitimate users from accessing service\n• Mitigation: Rate limiting, CDN, ISP filtering\n\nMan-in-the-Middle (MITM):\n• Intercept communication between two parties\n• Can eavesdrop or modify messages\n• SSL/TLS prevents this\n• ARP spoofing, DNS spoofing techniques\n\nDNS Poisoning:\n• Corrupt DNS cache with false mappings\n• Redirect to malicious sites\n• Affects all users with corrupted cache\n\nPassword Attacks:\n• Brute Force: Try all combinations\n• Dictionary Attack: Try common passwords\n• Rainbow Tables: Pre-computed hash tables\n• Credential Stuffing: Use leaked credentials elsewhere",
          },
          {
            id: "exploitation",
            title: "Exploitation Techniques",
            content:
              "Zero-Day Exploits:\n• Attack unknown vulnerability (not patched)\n• Attacker has exclusive knowledge\n• Most dangerous\n• Usually sold on dark web\n\nSQL Injection:\n• Inject SQL code into input fields\n• Bypass authentication\n• Steal/modify database data\n• Prevention: Input validation, parameterized queries\n\nXSS (Cross-Site Scripting):\n• Inject malicious scripts into web pages\n• Stored XSS: Permanently stored\n• Reflected XSS: Reflected in URL/request\n• Prevention: Input sanitization, CSP headers\n\nBuffer Overflow:\n• Overflow buffer to overwrite memory\n• Execute arbitrary code\n• ASLR and DEP mitigations reduce risk",
          },
        ],
      },
      {
        id: "threat-modeling",
        title: "3. Threat Modeling",
        subsections: [
          {
            id: "threat-models",
            title: "Threat Modeling Approaches",
            content:
              "STRIDE (Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, Elevation of Privilege):\n• Identify threats in each category\n• Systematic approach\n• Good for comprehensive analysis\n\nATT&CK Framework:\n• Matrix of adversary tactics and techniques\n• Based on real attack observations\n• Excellent for threat hunting\n• Used by security professionals globally\n\nKill Chain:\n• Identifies attack stages: Reconnaissance, Weaponization, Delivery, Exploitation, Installation, Command & Control, Actions\n• Helps understand attack progression\n• Identify defensive opportunities",
          },
          {
            id: "threat-assessment",
            title: "Threat Assessment Process",
            content:
              "Asset Identification:\n• Identify valuable assets\n• Data, systems, applications\n• Criticality rating\n\nThreat Identification:\n• What threats could affect assets?\n• Internal and external threats\n• Intentional and accidental\n\nVulnerability Analysis:\n• What weaknesses exist?\n• Could be in people, processes, or technology\n• Severity assessment\n\nRisk Calculation:\n• Risk = Threat × Vulnerability × Asset Value\n• Prioritize remediation efforts\n• Resource allocation",
          },
          {
            id: "threat-intelligence",
            title: "Threat Intelligence",
            content:
              "Types of Intelligence:\n• Strategic: Long-term trends, industry impacts\n• Tactical: Specific attack techniques, IOCs\n• Operational: Immediate threat information\n\nData Sources:\n• Open Source Intelligence (OSINT)\n• Dark web monitoring\n• Threat feeds (Shodan, AlienVault OTX)\n• Information sharing organizations\n\nIntelligence-Driven Defense:\n• Use threat intelligence to inform defense strategy\n• Prioritize based on likely threats\n• Continuous improvement\n• Stay ahead of attackers",
          },
        ],
      },
      {
        id: "vulnerability-assessment",
        title: "4. Vulnerability Assessment & Scanning",
        subsections: [
          {
            id: "vulnerability-scanning",
            title: "Vulnerability Scanning",
            content:
              'Automated Tools:\n• Nessus: Industry standard, comprehensive\n• OpenVAS: Open source alternative\n• Qualys: Cloud-based scanning\n• Rapid7 Nexpose/InsightVM\n\nScan Types:\n• Credentialed Scan: With system access (more thorough)\n• Non-Credentialed Scan: Without access (realistic external view)\n• Web Application Scan: Specific to web apps\n• Compliance Scan: Check against standards (PCI-DSS, HIPAA)\n\nFalse Positives:\n• Scanning reports vulnerabilities that don\'t actually exist\n• Require manual verification\n• Create "alert fatigue" if ignored\n• Prioritize critical/high severity',
          },
          {
            id: "penetration-testing",
            title: "Penetration Testing",
            content:
              "Process:\n1. Reconnaissance: Gather information\n2. Scanning: Identify open ports/services\n3. Enumeration: Identify usernames, shares, services\n4. Exploitation: Attempt to gain access\n5. Post-Exploitation: Maintain access, gather data\n6. Reporting: Document findings and recommendations\n\nScope Definition:\n• White Box: Attacker has full information\n• Gray Box: Limited information\n• Black Box: No information (most realistic)\n• Rules of Engagement: What is/isn't allowed\n• Legal Authorization: Written permission required!\n\nTools:\n• Metasploit: Exploitation framework\n• Burp Suite: Web application testing\n• Kali Linux: Penetration testing distribution",
          },
          {
            id: "remediation",
            title: "Vulnerability Remediation",
            content:
              "Prioritization:\n• Risk Rating: CVSS score × Asset criticality\n• Exploitability: How easy to exploit\n• Impact: What damage would occur\n• Compensating Controls: Existing mitigations\n\nRemediation Strategies:\n• Patching: Update software\n• Configuration: Change settings\n• Compensating: Implement controls (WAF, monitoring)\n• Decommission: Remove if not needed\n• Accept: If cost of fix > risk\n\nTracking:\n• SLA for remediation (e.g., Critical: 24 hours)\n• Verification that fix worked\n• Regression testing\n• Documentation for audit",
          },
        ],
      },
    ],
  },
  {
    id: "identity-access-management",
    title: "Identity & Access Management",
    category: "IAM",
    difficulty: "Intermediate",
    description:
      "Authentication methods, authorization models, MFA, SSO, LDAP, and privilege management.",
    estimatedTime: "4 hours",
    icon: Users,
    keyConceptsSummary:
      "IAM manages who can access what resources. Involves authentication (verifying identity), authorization (granting permissions), and access control (enforcing policies).",
    sections: [
      {
        id: "authentication",
        title: "1. Authentication Methods",
        subsections: [
          {
            id: "password-auth",
            title: "Password Authentication",
            content:
              "Something You Know: Password\n• Most common method\n• Weak: Many users choose weak passwords\n• Subject to: Brute force, dictionary attacks, credential stuffing\n• Phishing vulnerable\n\nPassword Security Best Practices:\n• Minimum length: 12+ characters\n• Complexity: Mix of cases, numbers, symbols\n• No dictionary words\n• No personal information\n• Unique per system\n• Changed regularly (controversial - NIST now recommends not forcing change)\n• Not reused\n\nPassword Storage:\n• NEVER store plaintext\n• Hash with salt: Hash(password + random salt)\n• Slow hashes: bcrypt, Argon2 (resist GPU attacks)\n• Iteration count: Higher = slower but more secure",
          },
          {
            id: "mfa-biometric",
            title: "Multi-Factor Authentication (MFA)",
            content:
              "Something You Know: Password\n• Knowledge-based (easiest to compromise)\n\nSomething You Have: Token/Device\n• Hardware token (RSA SecurID)\n• Mobile app (Google Authenticator, Duo)\n• SMS code (weakest form - SIM swapping)\n• Email code\n\nSomething You Are: Biometric\n• Fingerprint (FTS devices, phones)\n• Facial recognition (FaceID, FaceTime)\n• Iris scan\n• Voice recognition\n• Unique and hard to fake\n\nSomewhere You Are: Location\n• GPS location\n• IP address\n• Time zone\n\nBest Practices:\n• Combine different factors\n• Not two of same factor type (password + answer = 1 factor)\n• 2FA minimum (2 factors)\n• MFA (2+ factors) recommended",
          },
          {
            id: "sso-federation",
            title: "Single Sign-On (SSO)",
            content:
              'SSO Concept:\n• Authenticate once, access multiple systems\n• Improves user experience\n• Central authentication\n• Examples: Microsoft Entra ID, Okta, Google Workspace\n\nSSO Protocols:\n• SAML 2.0: XML-based, enterprise standard\n  - Assertion: Claims about user identity\n  - Service Provider (SP): Application needing auth\n  - Identity Provider (IdP): Authenticates user\n  - XML signed and encrypted\n\n• OAuth 2.0: API authorization, not authentication\n  - Delegate access without sharing password\n  - Used for "Login with Google/Facebook"\n  - Access tokens, refresh tokens\n\n• OpenID Connect: OAuth 2.0 + authentication\n  - Adds identity layer to OAuth\n  - ID tokens, UserInfo endpoint\n  - Combines benefits of both',
          },
        ],
      },
      {
        id: "authorization",
        title: "2. Authorization & Access Control",
        subsections: [
          {
            id: "access-control-models",
            title: "Access Control Models",
            content:
              "DAC (Discretionary Access Control):\n• Owner controls access to resources\n• User can grant/revoke permissions\n• Flexible but less secure\n• File systems (Windows, Linux)\n• User can share file with others\n\nMAC (Mandatory Access Control):\n• Central policy defines access\n• Users cannot change permissions\n• Very restrictive\n• Military/government systems\n• Example: SELinux\n\nRBAC (Role-Based Access Control):\n• Users assigned to roles\n• Roles have permissions\n• Easier to manage\n• Enterprise systems\n• Example: Admin role → Read/Write/Delete\n\nABAC (Attribute-Based Access Control):\n• Access based on attributes\n• More granular than RBAC\n• Attributes: User (department), Resource (classification), Environment (time, location)\n• Example: (Department=Finance AND Classification=Confidential AND Time=BusinessHours)",
          },
          {
            id: "privilege-management",
            title: "Privilege Escalation Prevention",
            content:
              "Vertical Escalation:\n• Non-admin gains admin rights\n• More common\n• Example: Buffer overflow to gain root\n• Prevention: Input validation, DEP/ASLR, least privilege\n\nHorizontal Escalation:\n• Access another user's data at same privilege level\n• Example: One customer views another's data\n• Prevention: Proper authorization checks\n\nLeast Privilege Principle:\n• Users get minimum permissions needed\n• Reduces damage if account compromised\n• Regular access reviews\n• Remove unnecessary permissions\n\nSeperation of Duties:\n• Different users do different steps\n• Prevents fraud\n• Example: One approves purchase, another pays\n• Prevents single person from unauthorized actions",
          },
          {
            id: "access-control-lists",
            title: "Access Control Lists (ACLs)",
            content:
              "ACL Components:\n• Subject: Who (user, group, process)\n• Object: What (file, printer, network resource)\n• Permissions: What can be done (Read, Write, Execute, Delete)\n• Scope: Where applies (this object only or children)\n\nNetwork ACLs:\n• Control traffic between networks\n• Source/Destination IP\n• Port/Protocol\n• Allow/Deny action\n• Usually deny by default\n• Order matters (first match wins)\n\nFile System ACLs:\n• Control file access\n• Explicit Allow/Deny entries\n• Inherited from parent folders\n• Can override inheritance\n• More powerful than permissions (R, W, X)\n\nBest Practices:\n• Review regularly\n• Remove old/unused entries\n• Group permissions when possible\n• Document reasons for access\n• Audit changes",
          },
        ],
      },
      {
        id: "directory-services",
        title: "3. Directory Services",
        subsections: [
          {
            id: "ldap",
            title: "LDAP (Lightweight Directory Access Protocol)",
            content:
              "LDAP Basics:\n• Network protocol for accessing directory services\n• Central repository of user and resource info\n• Hierarchical structure (tree)\n• Distinguished Names (DN): cn=user,ou=sales,dc=example,dc=com\n\nLDAP Operations:\n• Bind: Authenticate to directory\n• Search: Query directory\n• Add/Delete/Modify: CRUD operations\n• Unbind: Close connection\n\nLDAP Uses:\n• User authentication (many systems support LDAP)\n• Address books\n• Employee directories\n• Printer access control\n• Phone system integration\n\nLDAP Security:\n• StartTLS: Encrypt connection\n• Simple Bind: Username/password\n• SASL: More secure authentication\n• ACLs: Control who can read/modify",
          },
          {
            id: "active-directory",
            title: "Active Directory (AD)",
            content:
              "What is AD:\n• Microsoft's implementation of directory services\n• Central management of users, computers, resources\n• Integrated with Windows\n• Enterprise standard\n\nAD Components:\n• Domain: Group of computers sharing trust\n• Forest: Collection of domains\n• Organizational Unit (OU): Hierarchical containers\n• Group Policy: Apply settings to users/computers\n• Domain Controller: Hosts AD database\n\nAD Security Features:\n• Kerberos: Authentication protocol\n• Group Policies: Centralized config\n• Fine-grained password policies\n• Audit logging\n• Delegation: Limit admin rights\n\nAD Attacks:\n• Credential harvesting from LSASS memory\n• Golden Ticket: Forge Kerberos ticket\n• Kerberoasting: Crack service account passwords\n• Pass-the-Hash: Use NTLM hash to authenticate\n• Mitigation: MFA, privilege limiting, monitoring",
          },
          {
            id: "identity-federation",
            title: "Identity Federation",
            content:
              "Federation Concept:\n• Trust relationship between organizations\n• One IdP authenticates for multiple SPs\n• Enables single identity across domains\n• Cross-organization collaboration\n\nFederation Components:\n• Identity Provider (IdP): Authenticates users\n• Service Provider (SP): Offers service\n• Trust Relationship: Agreement between IdP and SP\n• Federation Metadata: Technical details\n\nUse Cases:\n• B2B collaborations\n• Cloud service SSO\n• Multi-company mergers\n• Government systems\n• Academic institutions (Shibboleth)\n\nSecurity Considerations:\n• Verify Federation Metadata\n• Certificate validation\n• Attribute encryption\n• Audit federation events\n• Principle of least trust",
          },
        ],
      },
      {
        id: "account-management",
        title: "4. Account Management & Lifecycle",
        subsections: [
          {
            id: "account-provisioning",
            title: "Account Provisioning & Deprovisioning",
            content:
              "Provisioning (Creating Accounts):\n• User needs access to systems\n• Create accounts, assign permissions\n• Usually manual or workflow-based\n• Automation: Identity governance systems\n\nDeprovisioning (Removing Access):\n• User leaves company/role\n• Remove accounts and permissions\n• Often overlooked, security risk\n• Should be immediate upon termination\n• Offboarding checklist: Email, VPN, systems, physical access\n\nAccessibility Management:\n• Periodic Access Reviews: Ensure users still need access\n• Principle of Least Privilege: Remove unnecessary access\n• Ownership: Managers verify their team's access\n• Compliance: Regulatory requirements (SOX, HIPAA)\n\nAutomation Benefits:\n• Faster provisioning\n• Consistent application\n• Audit trail\n• Reduces human error",
          },
          {
            id: "password-management",
            title: "Password Management",
            content:
              "Password Managers:\n• Encrypted storage of passwords\n• Generate strong random passwords\n• Auto-fill passwords\n• Reduces password reuse\n• Examples: 1Password, LastPass, Bitwarden\n\nEnterprise Solutions:\n• Privileged Access Management (PAM)\n• Rotate passwords automatically\n• Shared account credentials\n• Audit access to credentials\n• Examples: CyberArk, HashiCorp Vault\n\nPassword Synchronization:\n• Same password across systems\n• Not recommended (if one compromised, all are)\n• Better: Unique strong passwords\n• Use password manager instead\n\nPassword Reset:\n• User forgets password\n• Security questions (weak, personal info findable)\n• Email verification (better)\n• MFA confirmation (best)\n• Admin reset (verify identity first)\n• Avoid: Knowledge-based questions alone",
          },
          {
            id: "privilege-elevation",
            title: "Privileged Access Management (PAM)",
            content:
              "What is PAM:\n• Control and monitor privileged accounts\n• Track who used what credentials and when\n• Reduce standing privileges\n• Minimize damage if account compromised\n\nCore Functions:\n• Just-in-Time (JIT) Access: Grant temporary elevated access\n• Just-Enough-Privilege (JEP): Grant minimal permissions needed\n• Session Recording: Record admin activities\n• MFA for Privilege: Require MFA for admin access\n• Password Vault: Secure storage of service accounts\n\nImplementation:\n• Dedicated admin accounts (separate from regular accounts)\n• Separate admin workstations (clean devices)\n• Time-limited admin access\n• Frequent password rotation\n• Audit and alert on privilege use\n\nBest Practices:\n• No shared credentials\n• Service accounts for automation\n• Separate roles (change mgmt vs read-only)\n• Sunset unused accounts\n• Regular reviews of admin access",
          },
        ],
      },
    ],
  },
];
