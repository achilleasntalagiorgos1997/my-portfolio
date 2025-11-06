import React from "react";
import { Mail, Linkedin, Facebook, Instagram } from "lucide-react";
import site from "../content/site.json";
import type { SiteInfo } from "../types/content";

const data = site as SiteInfo;

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  const name = data.name ?? "—";
  const role = data.role ?? "";
  const email = data.social?.email ?? "";
  const linkedin = data.social?.linkedin ?? "";
  const facebook = data.social?.facebook ?? "";
  const instagram = data.social?.instagram ?? "";

  const LinkIcon = ({
    href,
    label,
    children,
  }: {
    href?: string | null;
    label: string;
    children: React.ReactNode;
  }) =>
    href ? (
      <a
        href={href.startsWith("mailto:") ? href : href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        className="text-muted-foreground hover:text-primary transition-colors"
        aria-label={label}
      >
        {children}
      </a>
    ) : null;

  return (
    <footer
      id="contact"
      className={`
          relative
        `}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px
             bg-gradient-to-r from-transparent via-[var(--primary)]/40 to-transparent
             z-10"
      />
      <div className="container mx-auto px-4 py-4 flex flex-col items-center space-y-4 text-center">
        {/* Name + Role */}
        <div>
          <h3 className="text-lg font-semibold">{name}</h3>
          {role && (
            <p className="text-sm text-muted-foreground/80 dark:text-muted-foreground">
              {role}
            </p>
          )}
        </div>

        {/* Contact Icons */}
        <div className="flex items-center gap-5">
          <LinkIcon href={email ? `mailto:${email}` : null} label="Email">
            <Mail className="h-5 w-5" />
          </LinkIcon>
          <LinkIcon href={linkedin} label="LinkedIn">
            <Linkedin className="h-5 w-5" />
          </LinkIcon>
          <LinkIcon href={facebook} label="Facebook">
            <Facebook className="h-5 w-5" />
          </LinkIcon>
          <LinkIcon href={instagram} label="Instagram">
            <Instagram className="h-5 w-5" />
          </LinkIcon>
        </div>

        {/* Copyright */}
        <div className="text-xs text-muted-foreground/70 dark:text-muted-foreground/70">
          © {year} {name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
