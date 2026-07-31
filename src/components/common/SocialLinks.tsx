import { Github, Linkedin, Mail, LucideIcon } from "lucide-react";

export interface SocialLinkItem {
  href: string;
  label: string;
  Icon: LucideIcon;
}

export const SOCIAL_LINKS: SocialLinkItem[] = [
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

export interface SocialLinksProps {
  className?: string;
  linkClassName?: string;
  iconSize?: number;
}

export default function SocialLinks({
  className = "flex items-center gap-3",
  linkClassName = "text-muted-link transition-colors hover:text-accent opacity-70 hover:opacity-100",
  iconSize = 20,
}: SocialLinksProps) {
  return (
    <div className={className}>
      {SOCIAL_LINKS.map(({ href, label, Icon }) => {
        const isMail = href.startsWith("mailto:");
        return (
          <a
            key={href}
            href={href}
            target={isMail ? undefined : "_blank"}
            rel={isMail ? undefined : "noopener noreferrer"}
            aria-label={label}
            className={linkClassName}
          >
            <Icon size={iconSize} />
          </a>
        );
      })}
    </div>
  );
}
