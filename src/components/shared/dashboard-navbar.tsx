import { cn } from "@/lib/utils";
import { NavItem } from "@/types";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";

interface DashboardNavbarProps {
  navLinks: NavItem[];
}

export function DashboardNavbar({ navLinks }: DashboardNavbarProps) {
  const pathName = usePathname();
  const isMobileNav = false;
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  if (!navLinks?.length) {
    return null;
  }

  const toggleExpand = (href: string) => {
    setExpandedItems((prev) =>
      prev.includes(href)
        ? prev.filter((item) => item !== href)
        : [...prev, href]
    );
  };

  const renderNavItem = (item: NavItem, depth = 0) => {
    const isActive = pathName === item.href;
    const isExpanded = expandedItems.includes(item.href);
    const hasChildren = item.children && item.children.length > 0;

    return (
      <>
        <Link
          href={item.href}
          className={cn(
            "flex items-center gap-2 overflow-hidden rounded-md text-sm font-medium transition-colors",
            depth === 0
              ? "py-[12px] px-[12px] hover:bg-accent hover:text-accent-foreground"
              : "py-[8px] pl-[12px] w-[90%] hover:underline",
            isActive
              ? depth === 0
                ? "bg-white shadow-md"
                : "bg-gray-100 text-primary"
              : "transparent",
            depth > 0 && ""
          )}
          onClick={(e) => {
            // e.preventDefault();
            if (hasChildren) {
              toggleExpand(item.href);
            }
          }}
        >
          <div
            className={cn(
              "p-[8px] rounded-[5px]",
              isActive
                ? depth === 0
                  ? "bg-main text-white"
                  : "text-primary"
                : ""
            )}
          >
            <item.Icon
              className={cn("flex-none", depth === 0 ? "size-5" : "size-4")}
            />
          </div>
          {!isMobileNav && (
            <span className={cn("mr-2 truncate", depth > 0 && "text-sm")}>
              {item.title}
            </span>
          )}
          {hasChildren && (
            <div className="ml-auto">
              {isExpanded ? (
                <FaChevronDown size={12} />
              ) : (
                <FaChevronRight size={12} />
              )}
            </div>
          )}
        </Link>
        {hasChildren && isExpanded && (
          <div className="mt-1 flex flex-col gap-1 items-end">
            {item.children!.map((child) => renderNavItem(child, depth + 1))}
          </div>
        )}
      </>
    );
  };

  return (
    <nav className="grid items-start gap-2">
      {navLinks.map((item, idx) => (
      <div key={item.href}>{renderNavItem(item)}</div>
      ))}
    </nav>
  );
}
