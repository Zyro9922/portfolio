import { BlogPost } from "@/types";

export const blogPosts: BlogPost[] = [
  {
    slug: "android-aosp-deep-dive",
    title: "Deep Dive into AOSP: Customizing System Apps on Fire OS",
    excerpt:
      "A behind-the-scenes look at building and customizing system-level Android apps on Amazon's Fire OS, covering lifecycle management, system services, and framework integrations.",
    content: `
## Working with AOSP at Amazon

When I joined the Tablet Devices team at Amazon, I knew I'd be working on Android—but AOSP-level Android development is a different beast entirely.

### The Challenge

Unlike typical app development where you work within the Android framework's boundaries, AOSP development means you *are* the framework. Every change you make affects every app running on the device.

At Amazon, we customize Fire OS—an AOSP-based operating system—for tablet devices. This means building system-level applications that interact directly with Android's core services.

### Key Learnings

**1. Lifecycle Management is Everything**

At the system level, lifecycle management becomes critical. The Wi-Fi Settings flow bug I fixed was a perfect example: duplicate fragment creation during activity restoration was causing crashes. Understanding the full lifecycle—including edge cases like process death during configuration changes—was essential.

**2. WindowManager & Overlay Services**

Building the floating action framework taught me the intricacies of Android's window management system. Creating an always-on overlay service that plays well with the rest of the OS requires careful handling of permissions, z-ordering, and input events.

**3. Dynamic Ingress**

Perhaps my most impactful contribution was extending Dynamic Ingress in AOSP. This system allows third-party apps to inject settings tiles into the main Settings app without requiring code changes in the Settings app itself. It reduced our Settings modifications by ~50%.

### Takeaway

AOSP development forces you to think at the platform level. Every decision impacts millions of devices. This experience fundamentally changed how I approach software architecture.
    `.trim(),
    date: "2025-03-15",
    readTime: "8 min read",
    tags: ["Android", "AOSP", "System Development"],
  },
  {
    slug: "jetpack-compose-at-scale",
    title: "Jetpack Compose at Scale: Lessons from Building a Driver Rewards Platform",
    excerpt:
      "How we architected a scalable rewards system at Motive using Jetpack Compose, clean architecture, and feature flags — with tips for building reusable Compose components.",
    content: `
## Building Rewards at Motive

At Motive, we set out to build a Driver Rewards platform from scratch. The goal: incentivize safe driving through challenges, leaderboards, and badges—all built in Jetpack Compose.

### Architecture Decisions

**Clean Modular Architecture**

We broke the feature into self-contained modules:
- \`rewards-ui\` — Pure Compose UI layer
- \`rewards-domain\` — Use cases and business logic  
- \`rewards-data\` — Repositories and data sources

This separation made testing straightforward and allowed parallel development across the team.

**Feature Flags & Remote Config**

Every feature shipped behind flags. This gave us confidence to deploy continuously while controlling the rollout. If metrics showed issues, we could kill a feature instantly.

### Compose Patterns That Worked

**1. State Hoisting**

We aggressively hoisted state to maximize reusability. Every composable function we built accepted state as parameters and emitted events upward.

**2. Platform-Level Components**

Building reusable components that could be shared across teams required extra discipline:
- Consistent theming via our design system
- Predictable state management
- Comprehensive preview functions for design verification

**3. Orientation-Aware Video**

The fullscreen video player was our most complex component. We used sensor-based orientation tracking with debounce logic to handle the transition smoothly, even accounting for OEM-specific quirks.

### Results

The rewards platform launched successfully across our fleet, with drivers actively competing on leaderboards and collecting badges. The modular architecture has made it easy to iterate and add new reward types.
    `.trim(),
    date: "2025-02-20",
    readTime: "6 min read",
    tags: ["Jetpack Compose", "Android", "Architecture"],
  },
  {
    slug: "gsoc-boost-cpp-astronomy",
    title: "My Google Summer of Code Journey with Boost C++ Astronomy",
    excerpt:
      "How I built an astronomical coordinate conversion system using Template Meta-Programming and BFS algorithms for the Boost C++ Libraries during GSoC 2020.",
    content: `
## The GSoC Experience

Google Summer of Code 2020 was a turning point in my career. Contributing to Boost C++—one of the most respected open-source C++ libraries—taught me things no classroom ever could.

### The Project: Boost.Astronomy

The Boost.Astronomy library needed a system for converting between different astronomical coordinate systems. Think of it like a GPS for the cosmos: astronomers use different coordinate systems (equatorial, ecliptic, galactic, etc.) depending on what they're observing.

### The Technical Challenge

**Template Meta-Programming**

C++ templates are powerful but complex. I used template meta-programming to create type-safe coordinate representations that catch errors at compile time rather than runtime. Each coordinate system became a distinct type with compile-time validation.

**The Conversion Graph**

The core innovation was the Conversion Graph. Instead of writing N×N conversion functions for N coordinate systems, I created a directed graph where:
- Each node represents a coordinate system
- Each edge represents a known conversion
- BFS finds the shortest conversion path between any two systems

This meant adding a new coordinate system only required defining its conversions to neighboring systems—the graph would figure out the rest.

**BFS for Shortest Path**

Using a modified Breadth-First Search algorithm, the system finds the most efficient conversion path. For example, if you need to convert from Galactic to Supergalactic coordinates, the algorithm discovers that going through Equatorial is the shortest path, applying each transformation in sequence.

### What I Learned

1. **Open source contributions require more than code** — Documentation, tests, and communication with mentors were equally important.
2. **C++ template meta-programming is an art** — The compile-time guarantees are worth the complexity.
3. **Graph algorithms have beautiful real-world applications** — Using BFS for coordinate conversion was one of the most elegant solutions I've built.

### Impact

The library continues to serve the C++ astronomy community, making coordinate conversions accessible and efficient. It's still one of the projects I'm most proud of.
    `.trim(),
    date: "2024-12-10",
    readTime: "7 min read",
    tags: ["C++", "Open Source", "GSoC", "Algorithms"],
  },
];
