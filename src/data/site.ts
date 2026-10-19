export const site = {
  name: "Anthony Molina",
  role: "Computer Engineer and frontend developer in Bogotá.",
  description: "Anthony Molina is a Computer Engineer and frontend developer in Bogotá, Colombia.",
  email: "admm1225@gmail.com",
  location: "Bogotá, Colombia",
  // TODO(content): confirm both profile URLs.
  github: "https://github.com/TODO",
  linkedin: "https://www.linkedin.com/in/TODO",
} as const;

export const playlist = {
  name: "Anthony Playlist",
  url: "https://music.apple.com/profile/anthonymolina",
} as const;

export const setup = [
  { icon: "cpu", label: "Processor", value: "Ryzen 5 5600G" },
  { icon: "gpu", label: "Graphics", value: "GTX 1660 Super" },
  { icon: "keyboard", label: "Keyboard", value: "AJAZZ AK820 Pro" },
  { icon: "mouse", label: "Mouse", value: "Prime Mini Wireless" },
] as const;

// TODO(content): replace with the final skills list.
export const skills = [
  { group: "Languages", items: ["TypeScript", "JavaScript", "HTML", "CSS"] },
  { group: "Frameworks", items: ["React", "Next.js", "Astro", "Tailwind CSS"] },
  { group: "Tools", items: ["Git", "Vercel", "Bun"] },
] as const;
