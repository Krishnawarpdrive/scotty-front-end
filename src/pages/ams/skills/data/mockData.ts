
export interface Skill {
  id: number;
  name: string;
  category: string;
  aliases: string[];
  usageCount: number;
  dateAdded: string;
}

export const mockSkills: Skill[] = [
  {
    id: 1,
    name: "React",
    category: "Frontend Development",
    aliases: ["ReactJS", "React.js"],
    usageCount: 42,
    dateAdded: "2025-01-15"
  },
  {
    id: 2,
    name: "TypeScript",
    category: "Programming Languages",
    aliases: ["TS", "JavaScript with Types"],
    usageCount: 38,
    dateAdded: "2025-01-20"
  },
  {
    id: 3,
    name: "Leadership",
    category: "Soft Skills",
    aliases: ["Team Leadership", "People Management"],
    usageCount: 27,
    dateAdded: "2025-02-03"
  },
  {
    id: 4,
    name: "AWS",
    category: "Cloud Services",
    aliases: ["Amazon Web Services", "Amazon Cloud"],
    usageCount: 35,
    dateAdded: "2025-02-10"
  },
  {
    id: 5,
    name: "Project Management",
    category: "Management",
    aliases: ["PM", "Project Coordination"],
    usageCount: 31,
    dateAdded: "2025-03-05"
  }
];

export const skillCategories = [
  "Frontend Development",
  "Backend Development",
  "Programming Languages",
  "Cloud Services",
  "DevOps",
  "Database",
  "Mobile Development",
  "Soft Skills",
  "Management",
  "Design",
  "QA"
];
