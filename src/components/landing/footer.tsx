"use client";

import Link from "next/link";
import { Zap, Twitter, Linkedin, Github } from "lucide-react";

const footerLinks = {
  product: {
    title: "Product",
    links: [
      { href: "#features", label: "Features" },
      { href: "#pricing", label: "Pricing" },
      { href: "#how-it-works", label: "How It Works" },
      { href: "/changelog", label: "Changelog" },
    ],
  },
  company: {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/blog", label: "Blog" },
      { href: "/careers", label: "Careers" },
      { href: "/contact", label: "Contact" },
    ],
  },
  resources: {
    title: "Resources",
    links: [
      { href: "/docs", label: "Documentation" },
      { href: "/help", label: "Help Center" },
      { href: "/api", label: "API Reference" },
      { href: "/status", label: "Status" },
    ],
  },
  legal: {
    title: "Legal",
    links: [
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Service" },
      { href: "/cookies", label: "Cookie Policy" },
      { href: "/gdpr", label: "GDPR" },
    ],
  },
};

const socialLinks = [
  { icon: Twitter, href: "https://twitter.com/replyflow", label: "Twitter" },
  { icon: Linkedin, href: "https://linkedin.com/company/replyflow", label: "LinkedIn" },
  { icon: Github, href: "https://github.com/replyflow", label: "GitHub" },
];

export function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 lg:gap-12">
          {/* Logo and description */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative w-9 h-9 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                ReplyFlow
              </span>
            </Link>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 max-w-xs">
              AI-powered review responses that save time and strengthen customer relationships.
            </p>
            <div className="flex gap-4 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([key, section]) => (
            <div key={key}>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} ReplyFlow. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            >
              Terms
            </Link>
            <Link
              href="/cookies"
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
