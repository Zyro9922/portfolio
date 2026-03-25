import { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "news-app",
    title: "News Application",
    description:
      "A modern news app built with Kotlin and Jetpack Compose following MVVM architecture with Google recommended practices. Features offline-first architecture with a single source of truth, dependency injection using Dagger, and comprehensive unit testing.",
    tech: ["Kotlin", "Jetpack Compose", "Coroutines", "MVVM", "Dagger", "Room"],
    github: "https://github.com/syedalihasan",
  },
  {
    id: "search-your-app",
    title: "Search Your App",
    description:
      "An Android utility app that lets users search for installed apps and launch them instantly. Features Android widgets for Home Screen, efficient RecyclerView-based search, and Light/Dark mode theme support.",
    tech: ["Android", "Kotlin", "RecyclerView", "Widgets"],
    playStore: "https://play.google.com/store",
  },
];
