;

import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Users, FileText, MailCheck, BarChart2 } from "lucide-react";
import { cn } from "@/shadcn/lib/utils";

export function MainNavigation() {
  const { t } = useTranslation();

  const navItems = [
    {
      path: "/candidates",
      label: t("navigation.candidates"),
      icon: <Users className="h-4 w-4" />,
      color: "from-emerald-500 to-emerald-600",
      hoverColor: "hover:from-blue-600 hover:to-blue-700",
    },
    {
      path: "/emails/send",
      label: t("navigation.sendEmail"),
      icon: <MailCheck className="h-4 w-4" />,
      color: "from-emerald-500 to-emerald-600",
      hoverColor: "hover:from-purple-600 hover:to-purple-700",
    },
    {
      path: "/templates",
      label: t("navigation.templates"),
      icon: <FileText className="h-4 w-4" />,
      color: "from-emerald-500 to-emerald-600",
      hoverColor: "hover:from-emerald-600 hover:to-emerald-700",
    },

    {
      path: "/logs",
      label: t("navigation.logs"),
      icon: <BarChart2 className="h-4 w-4" />,
      color: "from-emerald-500 to-emerald-600",
      hoverColor: "hover:from-amber-600 hover:to-amber-700",
    },
  ];

  return (
    <nav className="text-white border-b  shadow-sm">
      <div className="container mx-auto">
        <div className="grid grid-cols-4 h-10">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  "flex flex-col items-center justify-center py-1.5 px-1 transition-all duration-200 relative overflow-hidden group",
                  "after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:translate-y-0.5 after:bg-gradient-to-r",
                  "after:transition-transform after:duration-200 mr-0.5",
                  isActive
                    ? `text-green-600 font-medium after:translate-y-0 after:${item.color}`
                    : "text-gray-500 hover:text-green-600/70 after:${item.hoverColor} hover:after:translate-y-0"
                )
              }
            >
              {({ isActive }) => (
                <>
                  <div
                    className={cn(
                      "absolute inset-0 opacity-0 bg-gradient-to-b transition-opacity duration-200",
                      item.color,
                      "group-hover:opacity-10",
                      isActive && "opacity-10"
                    )}
                  />
                  <div className="flex items-center space-x-1.5 z-10">
                    <div
                      className={cn(
                        "p-1 rounded-full transition-colors duration-200",
                        isActive ? "text-orange" : "text-gray-500"
                      )}
                    >
                      {item.icon}
                    </div>
                    <span className="text-xs font-medium">{item.label}</span>
                  </div>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}
