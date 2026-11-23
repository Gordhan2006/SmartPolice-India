import { Complaint, PoliceStation, CyberArticle, UserProfile } from '../types';

export const DEMO_USERS: UserProfile[] = [
  {
    id: 'user-citizen-01',
    email: 'citizen@example.com',
    fullName: 'Aarav Sharma',
    phone: '+91 98765 43210',
    role: 'citizen',
    state: 'Delhi',
    createdAt: '2026-01-15T10:00:00Z',
  },
  {
    id: 'user-admin-01',
    email: 'admin@smartpolice.in',
    fullName: 'Inspector Rajesh Verma',
    phone: '+91 94120 11200',
    role: 'admin',
    badgeNumber: 'DL-IPS-7842',
    department: 'Central Cyber & Grievance Cell',
    state: 'Delhi',
    createdAt: '2025-11-01T09:00:00Z',
  }
];

export const INITIAL_COMPLAINTS: Complaint[] = [
  {
    id: 'SPI-2026-CYB-88412',
    citizenId: 'user-citizen-01',
    citizenName: 'Aarav Sharma',
    citizenEmail: 'citizen@example.com',
    citizenPhone: '+91 98765 43210',
    category: 'Cyber Crime & Online Fraud',
    subCategory: 'Unauthorized UPI Debit & Phishing',
    title: 'Fraudulent UPI deduction of ₹45,000 via fake electricity bill SMS',
    description: 'Received an SMS claiming electricity power would be disconnected at 9 PM. Called the provided number and was guided to download a quick support APK. Within 5 minutes, ₹45,000 was debited in three transactions to an unknown VPA.',
    incidentDate: '2026-11-20',
    incidentTime: '20:15',
    state: 'Delhi',
    district: 'New Delhi',
    policeStation: 'Cyber Crime Police Station - Mandir Marg',
    locationAddress: 'Flat 402, Barakhamba Road, Connaught Place, New Delhi',
    priority: 'High Emergency',
    status: 'In Progress',
    assignedOfficer: 'Sub-Inspector Neha Deshmukh',
    assignedOfficerBadge: 'DL-CYB-4091',
    assignedOfficerPhone: '+91 11 2334 5091',
    evidenceFiles: ['bank_statement_nov20.pdf', 'sms_screenshot_phishing.jpg'],
    disclaimerAccepted: true,
    createdAt: '2026-11-20T21:00:00Z',
    updatedAt: '2026-11-22T14:30:00Z',
    timeline: [
      {
        id: 't-101',
        complaintId: 'SPI-2026-CYB-88412',
        title: 'Complaint Registered',
        description: 'Simulated complaint received online. Unique tracking token SPI-2026-CYB-88412 generated.',
        status: 'Submitted',
        timestamp: '2026-11-20T21:00:00Z',
        stageNumber: 1
      },
      {
        id: 't-102',
        complaintId: 'SPI-2026-CYB-88412',
        title: 'Preliminary Review & Verification',
        description: 'Jurisdiction verified under Central Delhi Cyber Cell. Transaction hashes categorized for bank freeze notice.',
        status: 'Under Review',
        timestamp: '2026-11-21T09:15:00Z',
        stageNumber: 2
      },
      {
        id: 't-103',
        complaintId: 'SPI-2026-CYB-88412',
        title: 'Investigating Officer Assigned',
        description: 'Assigned to Sub-Inspector Neha Deshmukh (Badge DL-CYB-4091) for electronic trail tracking.',
        status: 'Officer Assigned',
        officerName: 'SI Neha Deshmukh',
        officerBadge: 'DL-CYB-4091',
        timestamp: '2026-11-21T11:45:00Z',
        stageNumber: 3
      },
      {
        id: 't-104',
        complaintId: 'SPI-2026-CYB-88412',
        title: 'Liaison with Payment Gateway & Nodal Bank',
        description: 'Formal freeze request issued under 91 CrPC/BNS protocols to beneficiary payment gateway. IP address origin logged.',
        status: 'In Progress',
        officerName: 'SI Neha Deshmukh',
        officerBadge: 'DL-CYB-4091',
        timestamp: '2026-11-22T14:30:00Z',
        stageNumber: 4
      }
    ]
  },
  {
    id: 'SPI-2026-THF-71209',
    citizenId: 'user-citizen-01',
    citizenName: 'Aarav Sharma',
    citizenEmail: 'citizen@example.com',
    citizenPhone: '+91 98765 43210',
    category: 'Theft & Burglary',
    subCategory: 'Motorcycle Theft',
    title: 'Theft of Royal Enfield Hunter 350 from Metro Parking',
    description: 'Parked motorcycle registration DL 03 CY 9921 at HUDA City Centre Metro Station parking lot around 8:30 AM. Returned at 7:00 PM and discovered the vehicle missing. Parking attendant ticket is attached.',
    incidentDate: '2026-11-18',
    incidentTime: '19:00',
    state: 'Haryana',
    district: 'Gurugram',
    policeStation: 'Sector 29 Police Station',
    locationAddress: 'HUDA City Centre Metro Gate No. 2, Sector 29, Gurugram',
    priority: 'Standard',
    status: 'Officer Assigned',
    assignedOfficer: 'Assistant Sub-Inspector Vikram Rao',
    assignedOfficerBadge: 'HR-GGN-1822',
    assignedOfficerPhone: '+91 124 238 9100',
    evidenceFiles: ['rc_copy.pdf', 'parking_receipt.jpg'],
    disclaimerAccepted: true,
    createdAt: '2026-11-18T20:10:00Z',
    updatedAt: '2026-11-19T10:00:00Z',
    timeline: [
      {
        id: 't-201',
        complaintId: 'SPI-2026-THF-71209',
        title: 'Complaint Registered',
        description: 'Simulated e-complaint received for stolen two-wheeler.',
        status: 'Submitted',
        timestamp: '2026-11-18T20:10:00Z',
        stageNumber: 1
      },
      {
        id: 't-202',
        complaintId: 'SPI-2026-THF-71209',
        title: 'Initial Scrutiny Completed',
        description: 'Engine and Chassis numbers verified against Vahan National Register.',
        status: 'Under Review',
        timestamp: '2026-11-19T08:30:00Z',
        stageNumber: 2
      },
      {
        id: 't-203',
        complaintId: 'SPI-2026-THF-71209',
        title: 'Officer Assigned for CCTV Review',
        description: 'ASI Vikram Rao deployed to collect CCTV feeds from DMRC parking exit gates.',
        status: 'Officer Assigned',
        officerName: 'ASI Vikram Rao',
        officerBadge: 'HR-GGN-1822',
        timestamp: '2026-11-19T10:00:00Z',
        stageNumber: 3
      }
    ]
  },
  {
    id: 'SPI-2026-WOM-45019',
    citizenId: 'user-citizen-02',
    citizenName: 'Priya Sundaram',
    citizenEmail: 'priya.s@example.com',
    citizenPhone: '+91 97110 54321',
    category: 'Women Safety & Harassment',
    subCategory: 'Cyber Harassment & Stalking',
    title: 'Repeated obscene messages and stalker behavior on Instagram',
    description: 'An anonymous user created multiple lookalike profiles sending abusive threats and morphed pictures to my contact list.',
    incidentDate: '2026-11-12',
    incidentTime: '16:00',
    state: 'Karnataka',
    district: 'Bengaluru Urban',
    policeStation: 'Cyber Crime Police Station - CID Headquarters',
    locationAddress: 'Carlton House, Palace Road, Bengaluru',
    priority: 'High Emergency',
    status: 'Resolved',
    assignedOfficer: 'Inspector K. Sandhya',
    assignedOfficerBadge: 'KA-BLR-0988',
    assignedOfficerPhone: '+91 80 2209 4500',
    evidenceFiles: ['screenshot_threats_bundle.zip'],
    disclaimerAccepted: true,
    createdAt: '2026-11-12T17:30:00Z',
    updatedAt: '2026-11-16T16:00:00Z',
    resolutionRemarks: 'IP address traced to a local resident. Offender summoned with parents, stern warning issued under Juvenile/BNS protective statutes, malicious handles permanently taken down by Meta grievance nodal officer.',
    timeline: [
      {
        id: 't-301',
        complaintId: 'SPI-2026-WOM-45019',
        title: 'Complaint Registered',
        description: 'Priority safety token registered under Women Safety fast-track desk.',
        status: 'Submitted',
        timestamp: '2026-11-12T17:30:00Z',
        stageNumber: 1
      },
      {
        id: 't-302',
        complaintId: 'SPI-2026-WOM-45019',
        title: 'Fast-Track Scrutiny',
        description: 'Transferred to Women Cyber Protection Wing.',
        status: 'Under Review',
        timestamp: '2026-11-12T18:00:00Z',
        stageNumber: 2
      },
      {
        id: 't-303',
        complaintId: 'SPI-2026-WOM-45019',
        title: 'Officer Assigned',
        description: 'Assigned to Inspector K. Sandhya.',
        status: 'Officer Assigned',
        officerName: 'Inspector K. Sandhya',
        officerBadge: 'KA-BLR-0988',
        timestamp: '2026-11-12T19:30:00Z',
        stageNumber: 3
      },
      {
        id: 't-304',
        complaintId: 'SPI-2026-WOM-45019',
        title: 'Digital Forensic Audit & Meta Takedown',
        description: 'Notice served to social media intermediary; user coordinates obtained.',
        status: 'In Progress',
        officerName: 'Inspector K. Sandhya',
        officerBadge: 'KA-BLR-0988',
        timestamp: '2026-11-14T11:00:00Z',
        stageNumber: 4
      },
      {
        id: 't-305',
        complaintId: 'SPI-2026-WOM-45019',
        title: 'Matter Resolved & Closed',
        description: 'Offending accounts deleted. Counseling & formal undertaking executed.',
        status: 'Resolved',
        officerName: 'Inspector K. Sandhya',
        officerBadge: 'KA-BLR-0988',
        timestamp: '2026-11-16T16:00:00Z',
        stageNumber: 5
      }
    ]
  },
  {
    id: 'SPI-2026-MIS-31998',
    citizenId: 'user-citizen-03',
    citizenName: 'Rohan Mehra',
    citizenEmail: 'rohan.m@example.com',
    citizenPhone: '+91 98200 12345',
    category: 'Missing Person / Property',
    subCategory: 'Lost Passport & Wallet',
    title: 'Lost Leather Wallet containing Passport & Aadhaar at Mumbai Airport T2',
    description: 'Misplaced brown wallet while boarding flight UK945 at Terminal 2, Chhatrapati Shivaji Maharaj International Airport.',
    incidentDate: '2026-11-21',
    incidentTime: '14:20',
    state: 'Maharashtra',
    district: 'Mumbai Suburban',
    policeStation: 'Sahar Police Station (Airport Jurisdiction)',
    locationAddress: 'Terminal 2 Departures, Sahar, Andheri East, Mumbai',
    priority: 'Standard',
    status: 'Submitted',
    evidenceFiles: ['boarding_pass.pdf'],
    disclaimerAccepted: true,
    createdAt: '2026-11-21T18:00:00Z',
    updatedAt: '2026-11-21T18:00:00Z',
    timeline: [
      {
        id: 't-401',
        complaintId: 'SPI-2026-MIS-31998',
        title: 'Lost Article Report Registered',
        description: 'Digitally logged in the Non-Cognizable Lost Articles Directory for passport reissue documentation.',
        status: 'Submitted',
        timestamp: '2026-11-21T18:00:00Z',
        stageNumber: 1
      }
    ]
  }
];

export const POLICE_STATIONS: PoliceStation[] = [
  {
    id: 'ps-del-01',
    name: 'Cyber Crime Police Station - Mandir Marg',
    code: 'DL-CC-01',
    state: 'Delhi',
    district: 'New Delhi',
    city: 'New Delhi',
    pincode: '110001',
    address: 'Police Station Complex, Mandir Marg, Near Birla Mandir, New Delhi',
    phone: '+91 11 2334 5091',
    emergencyPhone: '112 / 1930',
    inChargeOfficer: 'ACP Deepak Chawla',
    type: 'Cyber Crime Cell',
    operatingHours: '24/7 Round the Clock',
    email: 'cybercell.ndd@delhipolice.gov.in'
  },
  {
    id: 'ps-del-02',
    name: 'Connaught Place Police Station',
    code: 'DL-ND-02',
    state: 'Delhi',
    district: 'New Delhi',
    city: 'New Delhi',
    pincode: '110001',
    address: 'Parliament Street, Near Regal Cinema, Connaught Place, New Delhi',
    phone: '+91 11 2374 7100',
    emergencyPhone: '112',
    inChargeOfficer: 'SHO Inspector R. K. Meena',
    type: 'General Station',
    operatingHours: '24/7 Round the Clock',
    email: 'sho-cp@delhipolice.gov.in'
  },
  {
    id: 'ps-mum-01',
    name: 'Bandra Police Station',
    code: 'MH-MUM-14',
    state: 'Maharashtra',
    district: 'Mumbai Suburban',
    city: 'Mumbai',
    pincode: '400050',
    address: 'Hill Road, Near Bandra Railway Station, Bandra West, Mumbai',
    phone: '+91 22 2642 2011',
    emergencyPhone: '112 / 100',
    inChargeOfficer: 'Sr. Inspector Sanjay Kadam',
    type: 'General Station',
    operatingHours: '24/7 Round the Clock',
    email: 'bandra.policestn@mahapolice.gov.in'
  },
  {
    id: 'ps-mum-02',
    name: 'BKC Cyber Crime Police Station',
    code: 'MH-CYB-01',
    state: 'Maharashtra',
    district: 'Mumbai Suburban',
    city: 'Mumbai',
    pincode: '400051',
    address: 'Bandra Kurla Complex, E Block, Near MTNL Building, Bandra East, Mumbai',
    phone: '+91 22 2650 4008',
    emergencyPhone: '1930',
    inChargeOfficer: 'DCP Balsing Rajput',
    type: 'Cyber Crime Cell',
    operatingHours: '24/7 Round the Clock',
    email: 'cybercell.mumbai@mahapolice.gov.in'
  },
  {
    id: 'ps-blr-01',
    name: 'Cubbon Park Police Station',
    code: 'KA-BLR-03',
    state: 'Karnataka',
    district: 'Bengaluru Urban',
    city: 'Bengaluru',
    pincode: '560001',
    address: 'Kasturba Road, Near Chinnaswamy Stadium, Bengaluru',
    phone: '+91 80 2294 2585',
    emergencyPhone: '112',
    inChargeOfficer: 'Inspector Srinivas Murthy',
    type: 'General Station',
    operatingHours: '24/7 Round the Clock',
    email: 'cubbonparkps@ksp.gov.in'
  },
  {
    id: 'ps-blr-02',
    name: 'Bengaluru City Cyber Crime Police Station',
    code: 'KA-CYB-02',
    state: 'Karnataka',
    district: 'Bengaluru Urban',
    city: 'Bengaluru',
    pincode: '560001',
    address: 'CID Annex Building, Palace Road, High Grounds, Bengaluru',
    phone: '+91 80 2209 4500',
    emergencyPhone: '1930 / 112',
    inChargeOfficer: 'SP Rohini Katoch',
    type: 'Cyber Crime Cell',
    operatingHours: '24/7 Round the Clock',
    email: 'cybercrime.bcp@ksp.gov.in'
  },
  {
    id: 'ps-hyd-01',
    name: 'Banjara Hills Police Station',
    code: 'TG-HYD-07',
    state: 'Telangana',
    district: 'Hyderabad',
    city: 'Hyderabad',
    pincode: '500034',
    address: 'Road No. 12, MLA Colony, Banjara Hills, Hyderabad',
    phone: '+91 40 2785 2435',
    emergencyPhone: '112 / 100',
    inChargeOfficer: 'Inspector K. Nageshwar Rao',
    type: 'General Station',
    operatingHours: '24/7 Round the Clock',
    email: 'sho_banjarahills@tspolice.gov.in'
  },
  {
    id: 'ps-chn-01',
    name: 'Marina All Women Police Station',
    code: 'TN-CHN-W02',
    state: 'Tamil Nadu',
    district: 'Chennai',
    city: 'Chennai',
    pincode: '600004',
    address: 'Kamarajar Salai, Near Light House, Mylapore, Chennai',
    phone: '+91 44 2345 2588',
    emergencyPhone: '1091 / 112',
    inChargeOfficer: 'Inspector Revathi Selvam',
    type: 'Women Police Station',
    operatingHours: '24/7 Round the Clock',
    email: 'awps.marina@tnpolice.gov.in'
  },
  {
    id: 'ps-kol-01',
    name: 'Park Street Police Station',
    code: 'WB-KOL-09',
    state: 'West Bengal',
    district: 'Kolkata',
    city: 'Kolkata',
    pincode: '700016',
    address: '89 Park Street, Near Mullick Bazar Crossing, Kolkata',
    phone: '+91 33 2226 8400',
    emergencyPhone: '112 / 100',
    inChargeOfficer: 'OC Debashis Mukherjee',
    type: 'General Station',
    operatingHours: '24/7 Round the Clock',
    email: 'ocparkstreet@kolkatapolice.gov.in'
  },
  {
    id: 'ps-up-01',
    name: 'Gomti Nagar Police Station',
    code: 'UP-LKO-12',
    state: 'Uttar Pradesh',
    district: 'Lucknow',
    city: 'Lucknow',
    pincode: '226010',
    address: 'Vipul Khand, Near Patrakar Puram, Gomti Nagar, Lucknow',
    phone: '+91 522 272 5100',
    emergencyPhone: '112',
    inChargeOfficer: 'Inspector Brijesh Tripathi',
    type: 'General Station',
    operatingHours: '24/7 Round the Clock',
    email: 'sho-gomtinagar@uppolice.gov.in'
  },
  {
    id: 'ps-guj-01',
    name: 'Vastrapur Police Station',
    code: 'GJ-AHM-05',
    state: 'Gujarat',
    district: 'Ahmedabad',
    city: 'Ahmedabad',
    pincode: '380015',
    address: 'Near Vastrapur Lake, Bodakdev Road, Ahmedabad',
    phone: '+91 79 2676 1100',
    emergencyPhone: '112',
    inChargeOfficer: 'PI Hardik Patel',
    type: 'General Station',
    operatingHours: '24/7 Round the Clock',
    email: 'policestn-vastrapur@gujarat.gov.in'
  },
  {
    id: 'ps-pun-01',
    name: 'Sector 17 Central Police Station',
    code: 'CH-CHD-01',
    state: 'Punjab / Chandigarh',
    district: 'Chandigarh',
    city: 'Chandigarh',
    pincode: '160017',
    address: 'Sub City Centre, Sector 17-C, Chandigarh',
    phone: '+91 172 277 3951',
    emergencyPhone: '112',
    inChargeOfficer: 'DSP Gurpreet Singh',
    type: 'General Station',
    operatingHours: '24/7 Round the Clock',
    email: 'sho17@chandigarhpolice.gov.in'
  }
];

export const CYBER_ARTICLES: CyberArticle[] = [
  {
    id: 'cyber-01',
    title: 'UPI & QR Code Scams: How Fake Payment QR Codes Steal Money',
    category: 'Banking & UPI',
    severity: 'Critical',
    summary: 'Fraudsters send QR codes under the pretext of "sending you money" for OLX items or refund processing. Scanning a QR code ALWAYS DEBITS your account, never credits it.',
    description: 'UPI is designed so you NEVER need to enter your 4 or 6-digit UPI PIN to receive money. Fraudsters pose as buyers, send a QR code image via WhatsApp, and trick victims into scanning and entering PINs.',
    redFlags: [
      'Buyer insists on paying only via QR code instead of direct mobile number or bank transfer.',
      'Caller asks you to enter your UPI PIN to "accept" a refund or cashback.',
      'Sender sends a ₹1 test transaction and immediately follows up with a large reverse QR request.'
    ],
    preventionSteps: [
      'Remember: UPI PIN is ONLY entered to deduct money, NEVER to receive money.',
      'Never scan any QR code sent on WhatsApp, Telegram, or email.',
      'Block and report suspicious numbers immediately in your UPI app (GPay, PhonePe, Paytm, BHIM).'
    ],
    emergencyAction: 'If duped: Call 1930 within the Golden Hour (1-2 hours) to freeze the transaction in transit. Then register a formal e-complaint on cybercrime.gov.in.',
    iconName: 'CreditCard'
  },
  {
    id: 'cyber-02',
    title: 'Electricity Bill & Courier APK Malicious Apps',
    category: 'Malware',
    severity: 'Critical',
    summary: 'SMS stating "Your power will be disconnected at 9:30 PM" or "Your courier package address is incomplete. Download APK to update address."',
    description: 'Victims are asked to download a `.apk` file (such as QuickSupport, AnyDesk, or fake BijliApp). Once installed, it gains Accessibility and SMS read permissions to siphon OTPs silently.',
    redFlags: [
      'SMS from unknown 10-digit mobile number instead of an authorized official sender ID (e.g. BSES-DL, TPDDL).',
      'Urgent threats of immediate service cut-off or package cancellation.',
      'Request to install an APK file directly from WhatsApp or a web link outside Google Play Store.'
    ],
    preventionSteps: [
      'Always check electricity dues only on the official state DISCOM portal or trusted utility apps.',
      'Never install `.apk` files received over chat messages or untrusted links.',
      'Disable "Install apps from Unknown Sources" in your Android device settings.'
    ],
    emergencyAction: 'Immediately switch your phone to Airplane Mode, remove the SIM card, and disconnect Wi-Fi. Inform your bank to block net banking, and factory reset the device.',
    iconName: 'Smartphone'
  },
  {
    id: 'cyber-03',
    title: 'Part-Time Work from Home & YouTube Like/Review Scams',
    category: 'Job Scams',
    severity: 'High',
    summary: 'Promising ₹3,000 to ₹8,000 per day simply for liking YouTube videos, rating Google Maps hotels, or completing merchant tasks.',
    description: 'Victims receive small payouts of ₹150–₹500 initially to build trust. Then they are invited to private Telegram VIP groups where they are coerced into investing lakhs into fake crypto or merchant portals.',
    redFlags: [
      'Unsolicited WhatsApp message from international codes (+254, +62, +84, +1, etc.) offering part-time jobs.',
      'Tasks that seem unusually simple with unrealistically high compensation.',
      'Requirement to deposit "security money" or "prepaid task funds" into private individual bank accounts.'
    ],
    preventionSteps: [
      'No legitimate company asks you to pay money to receive salary or commissions.',
      'Avoid joining suspicious Telegram investment and trading task groups.',
      'Verify legitimate jobs through official company career pages and LinkedIn.'
    ],
    emergencyAction: 'Stop transferring additional funds immediately. Do not believe promises that "paying ₹50,000 will unlock your stuck ₹5,00,000 balance." Report immediately to 1930.',
    iconName: 'Briefcase'
  },
  {
    id: 'cyber-04',
    title: 'Deepfake & AI Voice Cloning Extortion',
    category: 'Social Media',
    severity: 'Critical',
    summary: 'AI voice synthesizers mimic the voice of a son, daughter, or relative claiming they are arrested by police or met with a horrific car accident.',
    description: 'Cyber syndicates scrape voice samples from public Instagram reels or YouTube videos and clone the victim voice using generative AI tools. They call parents in a panic, demanding immediate ransom via UPI.',
    redFlags: [
      'Caller claims to be a police officer or hospital doctor demanding immediate money for bail/surgery.',
      'Voice sounds emotionally distressed and background sounds seem artificially intense.',
      'Insistence on not hanging up the call or not calling the person back.'
    ],
    preventionSteps: [
      'Establish a "Family Emergency Passcode" known only to immediate family members.',
      'Stay calm: Hang up and call your family member directly on their actual phone number.',
      'Do not keep social media accounts completely public with audio reels if possible.'
    ],
    emergencyAction: 'Never transfer funds out of panic. Contact local police or dial 112 to verify if any such arrest actually occurred.',
    iconName: 'ShieldAlert'
  },
  {
    id: 'cyber-05',
    title: 'Digital Arrest Scam: Fake CBI, ED & Police Video Calls',
    category: 'Identity Theft',
    severity: 'Critical',
    summary: 'Scammers wearing fake police uniforms on Skype/WhatsApp video calls claim your Aadhaar was found in an illegal parcel with contraband, keeping you under "Digital Arrest".',
    description: 'Government agencies DO NOT conduct "Digital Arrests", nor do police or court judges conduct interrogation or bail hearings over Skype or WhatsApp video calls.',
    redFlags: [
      'Video call showing an officer in uniform with a police logo background.',
      'Threat of "Digital Arrest" and order not to leave the camera frame or tell anyone.',
      'Demand to transfer your savings into a "Reserve Bank verification safety account".'
    ],
    preventionSteps: [
      'Know your rights: There is NO concept of "Digital Arrest" under Indian law or CrPC/BNS.',
      'Government agencies and the RBI never ask citizens to transfer money for security clearance.',
      'Disconnect the video call immediately.'
    ],
    emergencyAction: 'Dial 1930 and inform your state police cyber wing. File an alert immediately.',
    iconName: 'UserX'
  },
  {
    id: 'cyber-06',
    title: 'Safe Social Media & Account Takeover Prevention',
    category: 'Social Media',
    severity: 'Medium',
    summary: 'Best practices for securing Instagram, WhatsApp, Facebook, and Gmail from SIM swap attacks and password compromises.',
    description: 'Protecting your digital identity is the first line of defense against cyber harassment, financial theft, and impersonation.',
    redFlags: [
      'Unexpected password reset emails or WhatsApp 6-digit registration codes arriving.',
      'Sudden loss of mobile network signal while others around you have full network (SIM swap alert).',
      'Direct messages from friends asking for urgent gift cards or emergency transfers.'
    ],
    preventionSteps: [
      'Enable Two-Factor Authentication (2FA) using an Authenticator App (Google Authenticator) instead of SMS OTP wherever possible.',
      'Use strong, unique passphrases with 14+ characters.',
      'Never click on "Vote for me in this contest" or "Look who died in this accident" links.'
    ],
    emergencyAction: 'If your WhatsApp or Instagram is hijacked, report immediately via the platform help center and alert your contact list through family members to ignore requests for money.',
    iconName: 'Lock'
  }
];

export const STATES_LIST = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Delhi (NCT)', 'Jammu & Kashmir', 'Ladakh', 'Chandigarh'
];
