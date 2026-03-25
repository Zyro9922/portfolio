import { SkillCategory } from "@/types";

export const skillCategories: SkillCategory[] = [
  {
    id: "android",
    title: "Android & AOSP",
    icon: "📱",
    color: "#00c853",
    skills: [
      "Android SDK",
      "AOSP / Fire OS",
      "Activity & Fragment Lifecycle",
      "System Services",
      "WindowManager",
      "ContentProvider",
    ],
  },
  {
    id: "compose",
    title: "Jetpack Compose",
    icon: "🎨",
    color: "#00b4d8",
    skills: [
      "Compose UI",
      "State Management",
      "Navigation",
      "Material3",
      "Animation APIs",
      "Custom Layouts",
    ],
  },
  {
    id: "fullstack",
    title: "Full-Stack",
    icon: "🌐",
    color: "#e63939",
    skills: [
      ".NET / C#",
      "Angular",
      "Next.js / React",
      "MySQL",
      "REST APIs",
      "MVC Architecture",
    ],
  },
  {
    id: "ai-tools",
    title: "AI & Tools",
    icon: "🤖",
    color: "#a855f7",
    skills: [
      "LLM Integration",
      "Prompt Engineering",
      "Git / GitHub",
      "CI/CD",
      "Firebase",
      "Gradle",
    ],
  },
  {
    id: "languages",
    title: "Core Languages",
    icon: "⚡",
    color: "#f59e0b",
    skills: [
      "Kotlin",
      "Java",
      "C++",
      "TypeScript",
      "Python",
      "SQL",
    ],
  },
];
