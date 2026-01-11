"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import type { User } from "@prisma/client";
import {
  Zap,
  LayoutDashboard,
  MessageSquare,
  FileText,
  Settings,
  CreditCard,
  History,
  Building2,
  HelpCircle,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface DashboardNavProps {
  user: User;
}

const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Generate Response",
    href: "/dashboard/generate",
    icon: MessageSquare,
  },
  {
    title: "History",
    href: "/history",
    icon: History,
  },
  {
    title: "Templates",
    href: "/templates",
    icon: FileText,
  },
  {
    title: "Businesses",
    href: "/dashboard/businesses",
    icon: Building2,
  },
];

const bottomNavItems = [
  {
    title: "Billing",
    href: "/billing",
    icon: CreditCard,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
  {
    title: "Help",
    href: "/help",
    icon: HelpCircle,
  },
];

export function DashboardNav({ user }: DashboardNavProps) {
  const pathname = usePathname();

  const usagePercent =
    user.responsesLimit > 0
      ? Math.min((user.responsesUsed / user.responsesLimit) * 100, 100)
      : 0;

  const isUnlimited = user.responsesLimit === -1;

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
          {/* Logo */}
          <div className="flex items-center h-16 px-6 border-b border-gray-200 dark:border-gray-700">
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                ReplyFlow
              </span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  pathname === item.href
                    ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.title}
              </Link>
            ))}
          </nav>

          {/* Usage section */}
          <div className="px-4 py-4 border-t border-gray-200 dark:border-gray-700">
            <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Monthly Usage
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                  {user.plan.toLowerCase()}
                </span>
              </div>
              {isUnlimited ? (
                <p className="text-sm text-green-600 dark:text-green-400">
                  Unlimited responses
                </p>
              ) : (
                <>
                  <Progress value={usagePercent} className="h-2 mb-2" />
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {user.responsesUsed} / {user.responsesLimit} responses used
                  </p>
                </>
              )}
              {user.plan === "FREE" && (
                <Link
                  href="/billing"
                  className="mt-3 block text-center text-sm font-medium text-blue-600 hover:text-blue-500"
                >
                  Upgrade Plan
                </Link>
              )}
            </div>
          </div>

          {/* Bottom navigation */}
          <div className="px-4 py-4 border-t border-gray-200 dark:border-gray-700 space-y-1">
            {bottomNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  pathname === item.href
                    ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </aside>

      {/* Mobile bottom navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-around h-16">
          {[navItems[0], navItems[1], navItems[2], bottomNavItems[1]].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full gap-1 text-xs font-medium transition-colors",
                pathname === item.href
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-gray-600 dark:text-gray-400"
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.title}
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}
