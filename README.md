# SmartPolice India – Smart Police & Citizen Service Platform

> **🎓 Academic Disclaimer & Educational Scope**  
> **SmartPolice India** is an independent educational engineering prototype designed to study civic grievance workflows, transparent police milestone tracking, and digital citizen safety.  
> It is **NOT** an official Government of India, State Police Department, or Ministry of Home Affairs website.  
> Submissions on this platform are simulated records for testing only and do **NOT** constitute legal First Information Reports (FIRs) under Section 173 BNSS / Section 154 CrPC. In case of actual emergencies, call **112** (All-India Emergency) or **1930** (Cyber Financial Fraud).

---

## 🌟 Key Features

1. **Home Portal & Navigation**
   - High-authority Navy Blue (`#050D1A`, `#0A192F`), Crisp White, and Red theme with responsive layout.
   - Emergency helpline ticker (112, 1930, 1090, 1098, 1076).
   - Live simulated metrics counter and 4-step procedural lifecycle.

2. **Citizen Registration & Authentication**
   - Dual-mode architecture: connects seamlessly with Supabase Auth or runs out-of-the-box with persistent local simulated accounts.
   - Pre-configured one-click demo credentials for quick evaluation.

3. **Citizen Grievance Docket (e-Complaint Form)**
   - 4-step guided lodging wizard with category-specific routing:
     - *Cyber Crime & Online Fraud* (UPI scams, APK malware, phishing)
     - *Theft & Burglary* (Vehicles, mobile snatching, burglary)
     - *Women Safety & Harassment* (Stalking, cyber abuse)
     - *Missing Person / Property* (Lost passport, Aadhaar, valuables)
     - *Public Nuisance & Traffic*
     - *Corruption & Economic Offense*
   - Automatic unique ID generation: `SPI-YYYY-CAT-XXXXX` (e.g. `SPI-2026-CYB-88412`).
   - Simulated evidence attachments and mandatory academic simulation acknowledgment.
   - Confetti celebration and printable simulated acknowledgment receipt with QR verification token.

4. **Complaint Tracking with Real-Time Milestone Timeline**
   - Track by token ID with stage-by-stage chronological updates:
     1. Complaint Registered
     2. Preliminary Jurisdiction Screening
     3. Investigating Officer (IO) Assigned
     4. Investigation in Progress & Evidence Verification
     5. Official Resolution & Final Closure Report
   - Includes assigned officer badge number, contact desk, and official audit remarks.

5. **Police Station Directory**
   - Searchable and filterable database of verified police stations across 28+ Indian States and Union Territories (Delhi, Maharashtra, Karnataka, Telangana, Tamil Nadu, West Bengal, UP, Gujarat, Punjab, etc.).
   - Filter by station type: *General Station*, *Cyber Crime Cell*, *Women Police Station*, *Traffic HQ*.
   - Direct Google Maps directions and in-charge officer details.

6. **National Cyber Safety Center**
   - Detailed interactive advisories on UPI QR scams, fake electricity bill APKs, AI voice cloning/deepfakes, and "Digital Arrest" video call deception.
   - Emergency **"Golden Hour"** guide for 1930 reporting.
   - Interactive 5-question **Citizen Cyber Readiness Quiz** with instant score calculation and safety feedback.

7. **Rakshak AI — Citizen Legal Sahayak**
   - Conversational AI assistant with natural language understanding of Indian legal rights (Zero FIR, Section 173 BNSS, IT Act 2000, 1930 helpline freeze protocols).
   - Instant quick-prompt chips and copy response utilities.

8. **Police Officer & Admin Control Dashboard**
   - Dedicated portal for department personnel.
   - Analytics cards (Total Dockets, Pending Triage, Under Review, Active Investigation, Resolved).
   - Search and filter by category, status, and priority.
   - Action Modal: update investigation status, assign Investigating Officer name and badge ID, append citizen-facing timeline notices, and export complaints as CSV.

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- Node.js (v18 or higher recommended)
- npm or pnpm

### 2. Run Locally in Development Mode
```bash
# Clone or navigate to the project directory
cd "smartpolice india"

# Start the local development server
npm run dev
```
Open your browser at `http://localhost:5173`.

### 3. Build for Production
```bash
npm run build
```
The optimized production bundle is generated in the `dist/` directory.

---

## 🔑 Demo Test Accounts

| Portal | Email | Password | Role |
| :--- | :--- | :--- | :--- |
| **Citizen Portal** | `citizen@example.com` | `CitizenPass123!` | Citizen (Can lodge & track) |
| **Police Admin Portal** | `admin@smartpolice.in` | `PoliceAdmin2026!` | Officer (Can triage & update status) |

You can also click the **"Demo Citizen"** or **"Demo Police Admin"** buttons inside the Login modal to auto-fill credentials instantly!

### Sample Complaint Tracking Tokens for Testing:
- `SPI-2026-CYB-88412` (Cyber Fraud - In Progress)
- `SPI-2026-THF-71209` (Motorcycle Theft - Officer Assigned)
- `SPI-2026-WOM-45019` (Women Safety - Resolved)
- `SPI-2026-MIS-31998` (Missing Passport - Submitted)

---

## 🗄️ Supabase Connection & Backend Setup

The application features a **Dual-Mode Data Architecture**:
- **Default Mode (Local Demo)**: Works immediately out-of-the-box with full data persistence in local storage.
- **Supabase Connected Mode**: When you enter your Supabase URL and Anon Key in `.env`, the app automatically switches to live Supabase PostgreSQL tables and authentication.

See [SUPABASE_GUIDE.md](file:///c:/Users/Owner/Downloads/smartpolice%20india/SUPABASE_GUIDE.md) and [supabase-schema.sql](file:///c:/Users/Owner/Downloads/smartpolice%20india/supabase-schema.sql) for step-by-step instructions.
