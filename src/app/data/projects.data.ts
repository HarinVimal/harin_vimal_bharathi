/**
 * Project content sourced from Harin Vimal Bharathi's resume.
 *
 * The illustrations in /images/projects are intentionally stylised artwork,
 * not application screenshots. No metrics or technologies beyond the resume
 * are recorded here.
 */

export type ProjectContribution = 'independent' | 'collaborative';

export type ProjectTechnologyGroup = 'frontend' | 'backend' | 'database' | 'tools';

export interface ProjectTechnology {
  readonly name: string;
  /** Stable key resolving to an existing icon in /icons/technologies. */
  readonly icon?: string;
  /** Used when the resume names a technology without a matching logo file. */
  readonly monogram?: string;
  readonly group: ProjectTechnologyGroup;
}

export interface ProjectFeature {
  readonly title: string;
  readonly description: string;
}

export interface ProjectResponsibility {
  readonly text: string;
  readonly contribution: ProjectContribution;
}

export interface ProjectTechnicalHighlight {
  readonly label: string;
  readonly detail: string;
}

export interface ProjectData {
  readonly id: string;
  readonly title: string;
  readonly shortTitle: string;
  readonly category: string;
  readonly shortDescription: string;
  readonly fullDescription: string;
  readonly thumbnailImage: string;
  readonly coverImage: string;
  readonly technologies: readonly ProjectTechnology[];
  readonly keyFeatures: readonly ProjectFeature[];
  readonly responsibilities: readonly ProjectResponsibility[];
  readonly technicalHighlights: readonly ProjectTechnicalHighlight[];
  readonly achievements: readonly string[];
  readonly company?: string;
  readonly featured: boolean;
  readonly displayOrder: number;
  readonly liveUrl?: string;
  readonly repositoryUrl?: string;
}

export const NO_PROJECT_METRICS_NOTE =
  'No quantified impact metrics are published for this project.';

const ANPR_TECHNOLOGIES: readonly ProjectTechnology[] = [
  { name: 'ASP.NET Core MVC', icon: 'aspnetcore', group: 'backend' },
  { name: 'C#', icon: 'csharp', group: 'backend' },
  { name: 'Entity Framework Core', monogram: 'EF', group: 'backend' },
  { name: 'SQL Server', icon: 'sqlserver', group: 'database' },
  { name: 'JavaScript', icon: 'javascript', group: 'frontend' },
  { name: 'jQuery', icon: 'jquery', group: 'frontend' },
  { name: 'AJAX', monogram: 'AJAX', group: 'frontend' },
  { name: 'Twilio', monogram: 'TW', group: 'tools' },
  { name: 'IIS', monogram: 'IIS', group: 'tools' },
];

const SAAS_TECHNOLOGIES: readonly ProjectTechnology[] = [
  { name: 'ASP.NET Core', icon: 'aspnetcore', group: 'backend' },
  { name: 'C#', icon: 'csharp', group: 'backend' },
  { name: 'CQRS', monogram: 'CQRS', group: 'backend' },
  { name: 'MediatR', monogram: 'M', group: 'backend' },
  { name: 'Entity Framework Core', monogram: 'EF', group: 'backend' },
  { name: 'SQL Server', icon: 'sqlserver', group: 'database' },
  { name: 'JavaScript', icon: 'javascript', group: 'frontend' },
  { name: 'Konva.js', monogram: 'K', group: 'frontend' },
];

const FINANCE_TECHNOLOGIES: readonly ProjectTechnology[] = [
  { name: 'ASP.NET MVC', monogram: 'MVC', group: 'backend' },
  { name: 'C#', icon: 'csharp', group: 'backend' },
  { name: 'SQL Server', icon: 'sqlserver', group: 'database' },
  { name: 'JavaScript', icon: 'javascript', group: 'frontend' },
  { name: 'jQuery', icon: 'jquery', group: 'frontend' },
  { name: 'AJAX', monogram: 'AJAX', group: 'frontend' },
  { name: 'Bootstrap', icon: 'bootstrap', group: 'frontend' },
];

const HRMS_TECHNOLOGIES: readonly ProjectTechnology[] = [
  { name: 'ASP.NET Web Forms', monogram: 'WF', group: 'backend' },
  { name: 'C#', icon: 'csharp', group: 'backend' },
  { name: 'SQL Server', icon: 'sqlserver', group: 'database' },
  { name: 'JavaScript', icon: 'javascript', group: 'frontend' },
  { name: 'jQuery', icon: 'jquery', group: 'frontend' },
  { name: 'AJAX', monogram: 'AJAX', group: 'frontend' },
  { name: 'Bootstrap', icon: 'bootstrap', group: 'frontend' },
];

const VOICE_TECHNOLOGIES: readonly ProjectTechnology[] = [
  { name: '.NET Web API', icon: 'dotnet', group: 'backend' },
  { name: 'C#', icon: 'csharp', group: 'backend' },
  { name: 'PHP', icon: 'php', group: 'backend' },
  { name: 'MySQL', icon: 'mysql', group: 'database' },
  { name: 'JavaScript', icon: 'javascript', group: 'frontend' },
  { name: 'jQuery', icon: 'jquery', group: 'frontend' },
  { name: 'AJAX', monogram: 'AJAX', group: 'frontend' },
  { name: 'HTML', icon: 'html5', group: 'frontend' },
  { name: 'CSS', icon: 'css3', group: 'frontend' },
];

export const PROJECTS_DATA: readonly ProjectData[] = [
  {
    id: 'anpr-warehouse-security',
    title: 'ANPR-Based Warehouse Vehicle Security & Management System',
    shortTitle: 'ANPR Warehouse Security',
    category: 'Security & Logistics',
    shortDescription:
      'Independently built a warehouse vehicle security system with ANPR gate automation, live dashboards and automated notifications.',
    fullDescription:
      'Independently designed, developed and deployed a warehouse vehicle security system handling approximately 100–200 daily vehicle movements. Third-party ANPR APIs are polled every five seconds to manage vehicle detection, gate entry and exit, document tracking, dock assignments and movement status. The system includes permitted-stay monitoring, automated and manual dispute workflows, live dashboards, vehicle history, overstay reports, analytics and Excel/PDF exports.',
    thumbnailImage: '/images/projects/anpr-warehouse-security.svg',
    coverImage: '/images/projects/anpr-warehouse-security.svg',
    technologies: ANPR_TECHNOLOGIES,
    keyFeatures: [
      {
        title: 'ANPR gate automation',
        description:
          'Third-party ANPR APIs are polled every five seconds for vehicle detection, gate entry/exit and dock assignments.',
      },
      {
        title: 'Document & movement tracking',
        description: 'Tracks documents, movement status and complete vehicle history.',
      },
      {
        title: 'Permitted-stay monitoring',
        description: 'Monitors allowed stay duration and produces overstay reports.',
      },
      {
        title: 'Dispute workflows',
        description:
          'Automated and manual disputes with assignment, escalation, resolution and status tracking.',
      },
      {
        title: 'Dashboards & reporting',
        description: 'Live dashboards, analytics and Excel/PDF exports.',
      },
    ],
    responsibilities: [
      {
        text: 'Independently designed, developed and deployed the complete warehouse vehicle security system.',
        contribution: 'independent',
      },
      {
        text: 'Integrated third-party ANPR APIs with five-second automated polling for detection and gate control.',
        contribution: 'independent',
      },
      {
        text: 'Implemented permitted-stay monitoring and automated/manual dispute workflows.',
        contribution: 'independent',
      },
      {
        text: 'Built Twilio SMS/Voice and SMTP email notifications, live dashboards, vehicle history, overstay reports and Excel/PDF exports.',
        contribution: 'independent',
      },
      {
        text: 'Handled company-wise user management, role-based permissions, authentication, database optimisation and IIS deployment with production monitoring.',
        contribution: 'independent',
      },
    ],
    technicalHighlights: [
      {
        label: 'Architecture & backend',
        detail: 'ASP.NET Core MVC with C# and Entity Framework Core.',
      },
      {
        label: 'Frontend implementation',
        detail: 'JavaScript, jQuery and AJAX for live dashboards and workflow interactions.',
      },
      {
        label: 'Database',
        detail: 'SQL Server, with database optimisation for production workloads.',
      },
      {
        label: 'Integrations',
        detail:
          'Third-party ANPR APIs with five-second polling, Twilio SMS/Voice and SMTP email notifications.',
      },
      {
        label: 'Workflow & deployment',
        detail: 'Automated/manual dispute workflows, IIS deployment and production monitoring.',
      },
    ],
    achievements: [
      'Handles approximately 100–200 daily vehicle movements.',
      'Automates ANPR detection through five-second API polling.',
    ],
    company: 'Techcedence',
    featured: true,
    displayOrder: 1,
  },
  {
    id: 'multi-tenant-saas',
    title: 'Multi-Tenant Business Management SaaS Platform',
    shortTitle: 'Multi-Tenant SaaS Platform',
    category: 'Enterprise SaaS',
    shortDescription:
      'Contributed to a multi-tenant SaaS platform for restaurants, salons, webshops and activity businesses, focused on floor plans, reservations and kitchen workflows.',
    fullDescription:
      'Contributed to an existing multi-tenant SaaS platform supporting restaurant, salon, webshop and activity businesses as part of a five-member development team. Developed interactive restaurant floor-plan management using Konva.js with drag-and-drop table positioning, resizing, multiple shapes, floor sections and availability indicators. Implemented table reservation workflows with availability validation, duplicate-booking prevention, walk-in management, status tracking and email notifications. Developed KOT workflows with category-based order splitting, kitchen-wise routing, thermal printer integration, partial order completion, consolidated billing and restaurant configuration, along with CQRS handlers, APIs and validation using MediatR and FluentValidation.',
    thumbnailImage: '/images/projects/multi-tenant-saas.svg',
    coverImage: '/images/projects/multi-tenant-saas.svg',
    technologies: SAAS_TECHNOLOGIES,
    keyFeatures: [
      {
        title: 'Interactive floor plans',
        description:
          'Konva.js canvas with drag-and-drop table positioning, resizing, multiple shapes, floor sections and availability indicators.',
      },
      {
        title: 'Table reservations',
        description:
          'Availability validation, duplicate-booking prevention, walk-in management, status tracking and email notifications.',
      },
      {
        title: 'KOT workflows',
        description:
          'Category-based order splitting, kitchen-wise routing, thermal printer integration, partial completion and consolidated billing.',
      },
      {
        title: 'Restaurant configuration',
        description: 'Configurable restaurant settings within the multi-tenant platform.',
      },
      {
        title: 'Multi-business support',
        description: 'Supports restaurant, salon, webshop and activity businesses.',
      },
    ],
    responsibilities: [
      {
        text: 'Contributed to an existing multi-tenant SaaS platform as part of a five-member development team.',
        contribution: 'collaborative',
      },
      {
        text: 'Developed the interactive Konva.js floor-plan module with drag-and-drop, resizing, shapes, sections and availability indicators.',
        contribution: 'collaborative',
      },
      {
        text: 'Implemented reservation workflows with validation, duplicate-booking prevention, walk-ins, status tracking and email notifications.',
        contribution: 'collaborative',
      },
      {
        text: 'Developed KOT workflows including kitchen routing, thermal printer integration, partial completion and consolidated billing.',
        contribution: 'collaborative',
      },
      {
        text: 'Implemented CQRS handlers, APIs and validation using MediatR and FluentValidation.',
        contribution: 'collaborative',
      },
    ],
    technicalHighlights: [
      {
        label: 'Architecture & backend',
        detail:
          'ASP.NET Core and C# using CQRS with MediatR, along with FluentValidation and API development.',
      },
      {
        label: 'Frontend implementation',
        detail: 'JavaScript and Konva.js for the interactive floor-plan canvas.',
      },
      {
        label: 'Database',
        detail: 'SQL Server with Entity Framework Core for data access.',
      },
      {
        label: 'Integrations & workflows',
        detail:
          'Thermal printer integration, email notifications, reservation validation and kitchen-wise order routing.',
      },
    ],
    achievements: [],
    company: 'Techcedence',
    featured: true,
    displayOrder: 2,
  },
  {
    id: 'finance-management',
    title: 'Finance Management System',
    shortTitle: 'Finance Management',
    category: 'Finance',
    shortDescription:
      'Built an internal finance application from scratch covering payroll, vendor payments, customer receivables, invoicing and reporting.',
    fullDescription:
      'Developed an internal finance management application from scratch covering employee payroll, vendor payments, customer receivables and invoicing. Implemented attendance-based payroll calculations, vendor payment tracking with partial and full settlements, customer collections and outstanding balance monitoring. Invoice generation includes automatic numbering, line items, tax/discount calculations, payment mapping, receipts and PDF/Excel reporting.',
    thumbnailImage: '/images/projects/finance-management.svg',
    coverImage: '/images/projects/finance-management.svg',
    technologies: FINANCE_TECHNOLOGIES,
    keyFeatures: [
      {
        title: 'Attendance-based payroll',
        description: 'Payroll calculated from employee attendance records.',
      },
      {
        title: 'Vendor payments',
        description: 'Payment tracking with partial and full settlements.',
      },
      {
        title: 'Customer receivables',
        description: 'Collections tracking with outstanding balance monitoring.',
      },
      {
        title: 'Invoice generation',
        description:
          'Automatic numbering, line items, tax/discount calculations, payment mapping and receipts.',
      },
      {
        title: 'Reporting',
        description: 'PDF and Excel reports for finance workflows.',
      },
    ],
    responsibilities: [
      {
        text: 'Developed the internal finance management application from scratch.',
        contribution: 'independent',
      },
      {
        text: 'Implemented attendance-based payroll calculations, vendor payment tracking and partial/full settlements.',
        contribution: 'independent',
      },
      {
        text: 'Built customer collections and outstanding balance monitoring.',
        contribution: 'independent',
      },
      {
        text: 'Developed invoice generation with automatic numbering, line items, tax/discount calculations, payment mapping and receipts.',
        contribution: 'independent',
      },
      {
        text: 'Implemented PDF/Excel reporting for the finance workflows.',
        contribution: 'independent',
      },
    ],
    technicalHighlights: [
      {
        label: 'Architecture & backend',
        detail: 'ASP.NET MVC with C# for the internal finance application.',
      },
      {
        label: 'Frontend implementation',
        detail: 'JavaScript, jQuery, AJAX and Bootstrap for the application interface.',
      },
      {
        label: 'Database',
        detail: 'SQL Server for payroll, payment, receivable and invoice data.',
      },
      {
        label: 'Workflows & reporting',
        detail:
          'Payroll calculation, settlement tracking, invoice generation and PDF/Excel exports.',
      },
    ],
    achievements: [],
    company: 'RND Softech',
    featured: true,
    displayOrder: 3,
  },
  {
    id: 'human-resource-management',
    title: 'Human Resource Management System (HRMS)',
    shortTitle: 'HRMS',
    category: 'Human Resources',
    shortDescription:
      'Independently built employee registration, attendance and shift management modules with document uploads and Excel reporting.',
    fullDescription:
      'Independently developed employee registration and profile management with department/designation mapping, reporting managers, document uploads, employee ID generation and status tracking. Implemented attendance tracking, check-in/check-out management, monthly summaries, employee-wise shift assignments and Excel reporting.',
    thumbnailImage: '/images/projects/hrms.svg',
    coverImage: '/images/projects/hrms.svg',
    technologies: HRMS_TECHNOLOGIES,
    keyFeatures: [
      {
        title: 'Employee profiles',
        description:
          'Registration and profile management with department/designation mapping, reporting managers, document uploads, employee ID generation and status tracking.',
      },
      {
        title: 'Attendance tracking',
        description: 'Check-in/check-out management and monthly attendance summaries.',
      },
      {
        title: 'Shift assignments',
        description: 'Employee-wise shift assignment management.',
      },
      {
        title: 'Excel reporting',
        description: 'Excel reports for attendance and employee records.',
      },
    ],
    responsibilities: [
      {
        text: 'Independently developed employee registration and profile management with department/designation mapping and reporting managers.',
        contribution: 'independent',
      },
      {
        text: 'Implemented document uploads, employee ID generation and status tracking.',
        contribution: 'independent',
      },
      {
        text: 'Implemented attendance tracking, check-in/check-out management and monthly summaries.',
        contribution: 'independent',
      },
      {
        text: 'Built employee-wise shift assignments and Excel reporting.',
        contribution: 'independent',
      },
    ],
    technicalHighlights: [
      {
        label: 'Architecture & backend',
        detail: 'ASP.NET Web Forms with C#.',
      },
      {
        label: 'Frontend implementation',
        detail: 'JavaScript, jQuery, AJAX and Bootstrap.',
      },
      {
        label: 'Database',
        detail: 'SQL Server for employee, attendance and shift data.',
      },
      {
        label: 'Workflows & reporting',
        detail: 'Employee onboarding, document handling, attendance summaries and Excel exports.',
      },
    ],
    achievements: [],
    company: 'RND Softech',
    featured: false,
    displayOrder: 4,
  },
  {
    id: 'voice-process-engagement',
    title: 'Voice Process Employee Engagement Platform',
    shortTitle: 'Voice Process Platform',
    category: 'Operations & Engagement',
    shortDescription:
      'Enhanced an insurance voice-process application with a PHP frontend and .NET Web API backend, covering agent, policy and productivity workflows.',
    fullDescription:
      'Enhanced an existing insurance voice-process application with a PHP frontend and .NET Web API backend, integrating frontend and backend through jQuery AJAX. Implemented agent login, user management, insurance customer/policy data entry and case assignment, along with daily/weekly/monthly productivity tracking. Developed dispute status monitoring and Excel/PDF reports to support supervisor reviews and operational tracking.',
    thumbnailImage: '/images/projects/voice-process-engagement.svg',
    coverImage: '/images/projects/voice-process-engagement.svg',
    technologies: VOICE_TECHNOLOGIES,
    keyFeatures: [
      {
        title: 'Agent & user management',
        description: 'Agent login and user management for the voice-process application.',
      },
      {
        title: 'Policy data entry',
        description: 'Insurance customer/policy data entry and case assignment.',
      },
      {
        title: 'Productivity tracking',
        description: 'Daily, weekly and monthly productivity tracking.',
      },
      {
        title: 'Dispute monitoring',
        description: 'Dispute status monitoring for operational tracking.',
      },
      {
        title: 'Supervisor reporting',
        description: 'Excel/PDF reports supporting supervisor reviews.',
      },
    ],
    responsibilities: [
      {
        text: 'Enhanced an existing insurance voice-process application with a PHP frontend and .NET Web API backend.',
        contribution: 'collaborative',
      },
      {
        text: 'Integrated frontend and backend through jQuery AJAX.',
        contribution: 'collaborative',
      },
      {
        text: 'Implemented agent login, user management, insurance customer/policy data entry and case assignment.',
        contribution: 'collaborative',
      },
      {
        text: 'Implemented daily/weekly/monthly productivity tracking and dispute status monitoring.',
        contribution: 'collaborative',
      },
      {
        text: 'Developed Excel/PDF reports to support supervisor reviews and operational tracking.',
        contribution: 'collaborative',
      },
    ],
    technicalHighlights: [
      {
        label: 'Architecture & backend',
        detail: '.NET Web API with C#, serving an existing PHP application.',
      },
      {
        label: 'Frontend implementation',
        detail:
          'PHP frontend with HTML, CSS, JavaScript, jQuery and AJAX for frontend/backend integration.',
      },
      {
        label: 'Database',
        detail: 'MySQL for customer, policy, case and productivity records.',
      },
      {
        label: 'Workflows & reporting',
        detail: 'Case assignment, dispute monitoring and Excel/PDF report generation.',
      },
    ],
    achievements: [],
    company: 'RND Softech',
    featured: false,
    displayOrder: 5,
  },
];
