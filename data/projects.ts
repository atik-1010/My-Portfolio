import { tr } from 'framer-motion/client';
import type { Project } from './types';

/**
 * ---------------------------------------------------------------------------
 * PROJECTS
 * ---------------------------------------------------------------------------
 * Repository URLs are taken directly from the supplied resume.
 *
 * Case-study prose describes what each system does and how it is built, based
 * on the stated technology stack. Review the wording before publishing and
 * replace anything that does not match your implementation — it is your voice
 * a recruiter will read.
 *
 * `demo` is omitted where no live deployment exists; the UI simply hides the
 * button rather than rendering a dead link.
 *
 * Screenshots: drop <slug>.png into public/projects/ and flip `hasCover` to
 * true. Recommended size 1200×750.
 */
export const projects: Project[] = [
  {
    slug: 'university-management-system',
    name: 'University Management System',
    tagline: 'UMS-ERP',
    summary:
      'A full-stack university ERP built on ASP.NET Core MVC with clean architecture, Entity Framework Core and role-based authorization for students, faculty and administrators.',
    year: '2025',
    category: 'Full-stack · Enterprise',
    featured: true,
    hasCover: true,
    stack: [
      'ASP.NET Core MVC',
      'C#',
      '.NET',
      'Clean Architecture',
      'EF Core',
      'SQL Server',
      'Razor Views',
      'Bootstrap 5',
      'JavaScript',
      'RBAC',
      'BCrypt',
    ],
    links: {
      github: 'https://github.com/atik-1010/UniversitySystem',
    },
    caseStudy: {
      problem:
        'University administration is spread across disconnected spreadsheets, notice boards and paper forms. Students, faculty and administrative staff each need a different slice of the same data, and every one of those slices carries a different access requirement. Without a single system, records drift out of sync and access control becomes an honour system.',
      solution:
        'A single web application that models the university domain once and exposes it through role-aware interfaces. Each user type authenticates into a view scoped to what their role is permitted to see and change, with the domain rules living in the core of the application rather than scattered through controllers.',
      architecture: [
        'Clean Architecture: domain entities and business rules sit at the centre with no dependency on the web or persistence layers',
        'ASP.NET Core MVC with Razor views for server-rendered pages and fast first paint',
        'Entity Framework Core as the data-access layer over SQL Server, with migrations for schema evolution',
        'Cookie-based authentication paired with role-based authorization policies enforced at the controller level',
        'Passwords hashed with BCrypt rather than stored or reversibly encrypted',
      ],
      features: [
        'Role-based access control separating student, faculty and administrator capabilities',
        'Secure authentication with hashed credentials and cookie-backed sessions',
        'CRUD management of core university records through an administrative interface',
        'Server-rendered Razor views styled with Bootstrap 5 for a responsive layout',
        'Relational data model managed through EF Core migrations',
      ],
      challenges: [
        'Keeping the layering honest - resisting the shortcut of calling the database directly from controllers when a use case grew complicated',
        'Designing an authorization model that stays readable as roles and permissions multiply',
        'Modelling relationships between students, courses and faculty so that queries stay efficient as records grow',
      ],
      outcome:
        'The largest project I have built end to end, and the one that taught me the most about architecture. It is where I learned that the structure of a codebase is a feature in its own right — the layering is what let me add capabilities without the earlier ones breaking.',
    },
  },
  {
    slug: 'duetcs-web',
    name: 'DUET Computer Society Website',
    tagline: 'Society web platform',
    summary:
      'A website for the DUET Computer Society, built with modern web technologies to provide a seamless user experience.',
    year: '2024',
    category: 'Web Development · PHP',
    featured: true,
    hasCover: true,
    stack: ['PHP', 'JavaScript', 'MySQL', 'HTML', 'CSS'],
    links: {
      github: 'https://github.com/atik-1010/DUET-Computer-Society-Website',
    },
    caseStudy: {

      problem:

        'A growing university computer society needed a centralized digital platform to manage its public information, events, competitions, projects, resources, memberships, certificates, and user accounts. A static website would make frequent content updates difficult and would not provide the access control required for administrative operations.',

      solution:

        'A full-stack PHP web application that combines a structured routing system, database-driven content, authentication, reusable components, and an administrative dashboard. The platform allows visitors and members to interact with society content while authorized administrators can manage dynamic information through dedicated management workflows.',

      architecture: [

        'Front-controller architecture that validates routes and maps requests to dedicated application controllers',

        'Modular controller structure separating domains such as events, activities, competitions, projects, blog, gallery, resources, membership, certificates, and accounts',

        'Reusable PHP components and helper functions for shared layouts, UI elements, sessions, and application utilities',

        'Database integration for persistent storage of website content, users, and administrative data',

        'Authentication and access-control layer for protecting user and administrative functionality',

      ],

      features: [

        'Dynamic content management for events, activities, competitions, projects, blog posts, gallery items, and resources',

        'User registration, authentication, profile, logout, and dashboard functionality',

        'Administrative dashboard for managing website content and system operations',

        'Committee, membership, and certificate management',

        'Global search across website content',

        'Responsive frontend with reusable components and consistent navigation',

      ],

      challenges: [

        'Designing a scalable routing system that could support a growing number of application modules',

        'Maintaining clear separation between routing, controllers, authentication, database operations, and presentation logic',

        'Implementing access control so administrative functionality remained restricted to authorized users',

        'Avoiding duplicated code by creating reusable components and shared application utilities',

      ],

      outcome:

        'A production-oriented organizational web platform that moved beyond static pages into a maintainable, database-driven application. The project gave me practical experience with backend architecture, routing, authentication, CRUD workflows, database integration, reusable components, and building software around real organizational requirements.',

    },
  },
  {
    slug: 'meal-management-system',
    name: 'Meal Management System',
    tagline: 'Python · Tkinter · MySQL',
    summary:
      'A desktop meal management tool built with Python and Tkinter over MySQL, handling meal records and the arithmetic that goes with shared dining.',
    year: '2023',
    category: 'Desktop · Python',
    featured: false,
    hasCover: false,
    stack: ['Python', 'Tkinter', 'MySQL', 'MySQL Workbench'],
    links: {
      github: 'https://github.com/atik-1010/Meal-Management-System-Tkinter-Project',
    },
  },
  {
    slug: 'programming-quiz-app',
    name: 'Programming Quiz App',
    tagline: 'Java Mobile application',
    summary:
      'A Java quiz application built around clean state handling - question flow, timed answering and scoring modelled as an explicit state machine rather than tangled UI callbacks.',
    year: '2024',
    category: 'Android · Java',
    featured: false,
    hasCover: false,
    stack: ['Java', 'OOP'],
    links: {
      github: 'https://github.com/atik-1010/Programming-Quiz-App',
    },
    caseStudy: {
      problem:
        'Practising programming fundamentals usually means either passive reading or jumping straight into a judge. A quiz sits usefully in between — quick recall, immediate feedback — but building one properly means the flow logic has to be right, because a quiz is mostly state: which question, how much time, what has been answered, what the score is.',
      solution:
        'A desktop quiz application in Java where the question flow, answer capture and scoring are modelled explicitly. The application progresses through a defined sequence of states, and the interface renders whatever the current state is rather than each control managing its own fragment of the truth.',
      architecture: [
        'Object-oriented design with question, quiz session and scoring as distinct responsibilities',
        'Explicit flow control over question sequencing and progression',
        'Separation between the quiz logic and the interface that presents it',
      ],
      features: [
        'Sequential question flow with answer selection and progression',
        'Score calculation and end-of-quiz result presentation',
        'Question set defined independently of the display logic',
      ],
      challenges: [
        'Keeping the interface a projection of the quiz state instead of letting each control hold its own copy',
        'Handling edge cases in progression — the last question, unanswered items, restarting a session',
      ],
      outcome:
        'A compact project that made object-oriented design click for me in a way coursework had not: the value of separating what the program knows from how it is displayed.',
    },
  },
  {
    slug: 'weather-forecast-app',
    name: 'Weather Forecast App',
    tagline: 'Java · Weather API · SQLite',
    summary:
      'A weather application that consumes a third-party forecast API and caches responses in SQLite, so the app stays useful when the network is slow or unavailable.',
    year: '2024',
    category: 'API integration · Java',
    featured: false,
    hasCover: false,
    stack: ['Java', 'Weather API', 'SQLite', 'REST'],
    links: {
      github: 'https://github.com/atik-1010/Weather-Forecast-API-Project',
    },
    caseStudy: {
      problem:
        'Any application that depends on a remote API inherits that API’s failures. On an unreliable connection a naive weather client shows a spinner or an error where it should show the last known forecast — and it re-requests data that has not meaningfully changed, burning quota for nothing.',
      solution:
        'A Java client that fetches forecast data from a weather API, parses the response into typed objects, and persists it locally in SQLite. Reads go through the local store first, so the last successful forecast is always available and repeated lookups do not trigger redundant network calls.',
      architecture: [
        'HTTP client layer responsible for calling the weather API and handling failures',
        'Response parsing into typed Java objects, isolating the rest of the app from the API’s payload shape',
        'SQLite persistence layer storing retrieved forecasts for local reads',
        'Application logic reading through the local store rather than calling the network directly',
      ],
      features: [
        'Live forecast retrieval from a third-party weather API',
        'Local SQLite persistence of retrieved forecast data',
        'Location-based lookup with results kept between sessions',
        'Graceful behaviour when the API is unreachable',
      ],
      challenges: [
        'Deciding when cached data is still good enough to serve and when it must be refreshed',
        'Handling API failures and malformed responses without crashing the application',
        'Mapping a nested JSON payload onto a relational schema that is actually useful to query',
      ],
      outcome:
        'My first real lesson in treating a network call as something that will fail rather than something that might. The caching layer is what turned a demo into an application that works on a bad connection.',
    },
  },
  {
    slug: 'library-management-system',
    name: 'Smart Library Management System',
    tagline: 'Java · Firebase',
    summary:
      'A library management application backed by Firebase Realtime Database, covering catalogue records and borrowing workflow with data synced in real time.',
    year: '2024',
    category: 'Application · Java',
    featured: false,
    hasCover: false,
    stack: ['Java', 'Firebase Realtime Database'],
    links: {
      github: 'https://github.com/atik-1010/Smart-Library-Management-System-App',
    },
  },
  {
    slug: 'iot-fall-detection',
    name: 'IoT Fall Detection System',
    tagline: 'Arduino · Hardware + software',
    summary:
      'An Arduino-based system for detecting wheelchair or person falls, combining sensor hardware with the software that interprets its readings.',
    year: '2023',
    category: 'IoT · Embedded',
    featured: false,
    hasCover: false,
    stack: ['Arduino', 'Embedded C', 'Sensors'],
    links: {
      github:
        'https://github.com/atik-1010/IOT-Based-Wheelchair-Or-Person-Fall-Detection-Project',
    },
  },
];

export const featuredProjects = projects.filter((project) => project.featured);
export const secondaryProjects = projects.filter((project) => !project.featured);

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export const caseStudyProjects = projects.filter((project) => Boolean(project.caseStudy));
