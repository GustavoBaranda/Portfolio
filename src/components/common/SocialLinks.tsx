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
  /** Defaults to true. Set false when Contacto already covers email nearby (e.g. mobile drawer). */
  includeEmail?: boolean;
}

export default function SocialLinks({
  className = "flex items-center gap-3",
  linkClassName = "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors opacity-80 hover:opacity-100",
  iconSize = 20,
  includeEmail = true,
}: SocialLinksProps) {
  const links = includeEmail
    ? SOCIAL_LINKS
    : SOCIAL_LINKS.filter(({ href }) => !href.startsWith("mailto:"));

  return (
    <div className={className}>
      {links.map(({ href, label, Icon }) => {
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
