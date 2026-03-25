import { Experience } from "@/types";

export const experiences: Experience[] = [
  {
    id: "motive",
    company: "Motive",
    role: "Software Engineer - 2",
    location: "Bengaluru",
    period: "May 2025 – Present",
    tech: ["Kotlin", "Jetpack Compose", "Clean Architecture", "Feature Flags"],
    achievements: [
      "Architected and shipped a scalable Driver Rewards platform using Jetpack Compose, Kotlin, and clean modular architecture, integrating challenges, paginated leaderboards, results, and badges with feature flags, remote config, and resilient navigation.",
      "Built reusable, platform-level Compose UI components and state-management patterns, enabling consistent behavior across multiple surfaces while improving testability, maintainability, and cross-team reuse.",
      "Implemented an orientation-aware fullscreen video experience at the system level, using sensor-based tracking, debounce logic, and lifecycle-safe state hoisting to handle OEM-specific edge cases.",
      "Owned features end-to-end in close collaboration with Backend, iOS, Product, and Design, contributing to API contracts, analytics schemas, technical design docs (TDDs), and rollout strategies.",
    ],
  },
  {
    id: "amazon",
    company: "Amazon",
    role: "Software Development Engineer - 1",
    location: "Bengaluru",
    period: "Nov 2022 – Apr 2025",
    tech: ["Android", "AOSP", "Fire OS", "Kotlin", "WindowManager"],
    achievements: [
      "Developed and customized system-level Android applications on Fire OS (AOSP-based) for Amazon tablet devices, working deep in lifecycle management, system services, and framework integrations.",
      "Diagnosed and resolved high-impact stability issues on the Wi-Fi Settings flow by fixing duplicate fragment creation during activity restoration, reducing app crashes by ~6%.",
      "Proposed, designed, and implemented a platform-level floating action framework using Kotlin and WindowManager, enabling system and app shortcuts via an always-on overlay service.",
      "Led exploration and extension of Dynamic Ingress in AOSP, enabling third-party apps to integrate settings dynamically without code changes; reduced Settings-app modifications by ~50%.",
      "Collaborated closely with Product, Design, and Framework teams to deliver customized system flows (Fingerprint Enrollment, SD Card setup wizard).",
    ],
  },
  {
    id: "cginfinity",
    company: "CGInfinity",
    role: "Full-stack Engineer",
    location: "Noida",
    period: "Apr 2021 – Oct 2022",
    tech: [".NET", "C#", "Angular", "MySQL", "MVC"],
    achievements: [
      "Worked on a web application for credentials management catering to drug suppliers in the USA, ensuring compliance with the DSCSA regulations.",
      "Developed backend APIs using .NET C# following the MVC pattern, with an Angular-based frontend.",
      "Designed databases in MySQL based on requirements and ensured normalization principles were followed. Developed and managed stored procedures for querying large, interconnected datasets.",
      "Engaged with clients to gather requirements and proposed UI solutions to streamline the process of tracking credentials.",
    ],
  },
  {
    id: "aztek",
    company: "Aztek",
    role: "Android Developer",
    location: "Noida",
    period: "Jan 2020 – Jun 2020",
    tech: ["Android", "Kotlin", "Room", "MVVM", "Retrofit"],
    achievements: [
      "Published a production-grade document management app that collects customer identity and address proofs for business verification.",
      "Accelerated upload speed by 80% through image compression.",
      "Designed and implemented offline support and upload-later functionality using Room Library.",
      "Introduced the MVVM architecture and migrated the project from Volley to Retrofit.",
    ],
  },
  {
    id: "gsoc",
    company: "Boost C++ (Google Summer of Code)",
    role: "Open Source Contributor",
    location: "Remote",
    period: "Summer 2020",
    tech: ["C++", "Template Meta-Programming", "BFS", "Astronomy"],
    achievements: [
      "Created a versatile system within the Boost C++ Boost.Astronomy Library for interconversion of astronomical coordinate systems using Template Meta-Programming.",
      "Designed specialized frameworks tailored to various Astronomical Coordinate Systems, used for tracking the positions of celestial objects.",
      "Introduced a Conversion Graph utilizing a version of the Breadth First Search algorithm, enabling users to efficiently determine the shortest path for converting between different Astronomical systems.",
    ],
  },
];
