import { Github, Linkedin, Mail } from "lucide-react";

export const SOCIAL_LINKS = [
  {
    href: "https://github.com/GustavoBaranda",
    label: "GitHub",
    Icon: Github,
  },
  {
    href: "https://www.linkedin.com/in/gustavobaranda/",
    label: "LinkedIn",
    Icon: Linkedin,
  },
  {
    href: "mailto:baranda.gustavo@gmail.com",
    label: "Email",
    Icon: Mail,
  },
];

export default function SocialLinks({
  className = "flex items-center gap-3",
  linkClassName = "text-muted-link transition-colors hover:text-accent opacity-70 hover:opacity-100",
  iconSize = 20,
}) {
  return (
    <div className={className}>
      {SOCIAL_LINKS.map(({ href, label, Icon }) => (
        <a
          key={href}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className={linkClassName}
        >
          <Icon size={iconSize} />
        </a>
      ))}
    </div>
  );
}
