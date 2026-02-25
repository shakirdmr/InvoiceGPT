/**
 * Team member data.
 * Structured as an exportable array so it can easily be replaced
 * with a dynamic data source (e.g. Prisma / CMS) when we add
 * /@username routes later.
 */

export interface TeamMember {
  /** URL-safe username — will become /@username route */
  username: string;
  name: string;
  role: string;
  bio: string;
  /** Path to photo in /public/team/ — falls back to initials avatar */
  photo?: string;
  links?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
}

export const team: TeamMember[] = [
  {
    username: "shakir",
    name: "Shakir Sajad",
    role: "Lead Developer",
    bio: "Full-stack engineer turning ideas into production-ready code. Loves clean architecture and pixel-perfect UI.",
    photo: "/team/shakir.jpg",
    links: {
      github: "https://github.com/shakirdmr",
    },
  },
];
