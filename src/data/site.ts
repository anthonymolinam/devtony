export const site = {
  name: "Anthony Molina",
  role: "Computer Engineer and frontend developer in Bogotá.",
  description:
    "Anthony Molina is a Computer Engineer and frontend developer in Bogotá, Colombia.",
  email: "contact@devtony.net",
  location: "Bogotá, Colombia",
  // TODO(content): confirm both profile URLs.
  github: "https://github.com/anthonymolinam",
  linkedin: "https://www.linkedin.com/in/TODO",
} as const;

export const playlist = {
  name: "Anthony Playlist",
  url: "https://music.apple.com/profile/anthonymolina",
} as const;

export const setup = [
  { icon: "cpu", label: "Processor", value: "Ryzen 5 9600X" },
  { icon: "gpu", label: "Graphics", value: "RTX 3060 Ti" },
  { icon: "keyboard", label: "Keyboard", value: "AJAZZ AK820 Pro" },
  { icon: "mouse", label: "Mouse", value: "Prime Mini Wireless" },
] as const;

// TODO(content): replace with the final skills list.
export const skills = [
  {
    group: "Languages",
    items: ["TypeScript", "JavaScript", "HTML", "CSS", "Python"],
  },
  { group: "Frameworks", items: ["React", "Next.js", "Astro", "Tailwind CSS"] },
  { group: "Tools", items: ["Git", "Vercel", "Bun"] },
] as const;
