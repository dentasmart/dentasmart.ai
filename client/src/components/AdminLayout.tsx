import { useState, useEffect, useMemo, type ReactNode } from "react";
import { useLocation, Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import {
  LogOut,
  FileText,
  FolderTree,
  Users,
  ShieldAlert,
  Bot,
  Settings,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Loader2,
  BarChart3,
  PanelLeftClose,
  PanelLeft,
  TrendingUp,
  Sparkles,
  ImageIcon,
  LayoutGrid,
  ArrowLeftRight,
  AlertTriangle,
} from "lucide-react";

interface NavItem {
  id: string;
  label: string;
  icon: ReactNode;
  path: string;
  badge?: number;
  section?: string;
}

interface AdminLayoutProps {
  children: ReactNode;
  /** Active nav item id. used to highlight the current page */
  activeId?: string;
  /** Optional badge count for link audit */
  auditIssueCount?: number;
}

export default function AdminLayout({ children, activeId, auditIssueCount }: AdminLayoutProps) {
  const [, setLocation] = useLocation();
  const [location] = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  // Auth check
  const { data: admin, isLoading: authLoading } = trpc.blog.adminMe.useQuery();
  const logoutMutation = trpc.blog.adminLogout.useMutation({
    onSuccess: () => setLocation("/admin/login"),
  });

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !admin) {
      setLocation("/admin/login");
    }
  }, [admin, authLoading, setLocation]);

  // Derive active from path if not explicitly set
  const currentActive = useMemo(() => {
    if (activeId) return activeId;
    if (location.includes("/admin/categories")) return "categories";
    if (location.includes("/admin/leads")) return "leads";
    if (location.includes("/admin/link-audit")) return "link-audit";
    if (location.includes("/admin/ai-blog-agent")) return "ai-blog-agent";
    if (location.includes("/admin/seo-analytics")) return "seo-analytics";
    if (location.includes("/admin/conversion-analytics")) return "conversion-analytics";
    if (location.includes("/admin/aeo-dashboard")) return "aeo-dashboard";
    if (location.includes("/admin/media-library")) return "media-library";
    if (location.includes("/admin/pages")) return "pages";
    if (location.includes("/admin/redirects")) return "redirects";
    if (location.includes("/admin/404s")) return "404s";
    if (location.includes("/admin/edit") || location.includes("/admin/new")) return "articles";
    return "articles";
  }, [activeId, location]);

  const navItems: NavItem[] = [
    {
      id: "articles",
      label: "Articles",
      icon: <FileText className="w-5 h-5" />,
      path: "/admin",
      section: "Content",
    },
    {
      id: "categories",
      label: "Categories",
      icon: <FolderTree className="w-5 h-5" />,
      path: "/admin/categories",
      section: "Content",
    },
    {
      id: "leads",
      label: "Leads",
      icon: <Users className="w-5 h-5" />,
      path: "/admin/leads",
      section: "Content",
    },
    {
      id: "media-library",
      label: "Media Library",
      icon: <ImageIcon className="w-5 h-5" />,
      path: "/admin/media-library",
      section: "Content",
    },
    {
      id: "pages",
      label: "Pages",
      icon: <LayoutGrid className="w-5 h-5" />,
      path: "/admin/pages",
      section: "Content",
    },
    {
      id: "redirects",
      label: "Redirects",
      icon: <ArrowLeftRight className="w-5 h-5" />,
      path: "/admin/redirects",
      section: "Tools",
    },
    {
      id: "404s",
      label: "404 Log",
      icon: <AlertTriangle className="w-5 h-5" />,
      path: "/admin/404s",
      section: "Tools",
    },
    {
      id: "link-audit",
      label: "Link Audit",
      icon: <ShieldAlert className="w-5 h-5" />,
      path: "/admin/link-audit",
      badge: auditIssueCount,
      section: "Tools",
    },
    {
      id: "ai-blog-agent",
      label: "AI Blog Agent",
      icon: <Bot className="w-5 h-5" />,
      path: "/admin/ai-blog-agent",
      section: "AI Agents",
    },
    {
      id: "seo-analytics",
      label: "SEO & Analytics",
      icon: <BarChart3 className="w-5 h-5" />,
      path: "/admin/seo-analytics",
      section: "Tools",
    },
    {
      id: "conversion-analytics",
      label: "Conversions",
      icon: <TrendingUp className="w-5 h-5" />,
      path: "/admin/conversion-analytics",
      section: "Tools",
    },
    {
      id: "aeo-dashboard",
      label: "AEO Tracking",
      icon: <Sparkles className="w-5 h-5" />,
      path: "/admin/aeo-dashboard",
      section: "Tools",
    },
  ];

  // Group items by section
  const sections = useMemo(() => {
    const sectionMap = new Map<string, NavItem[]>();
    navItems.forEach((item) => {
      const section = item.section || "General";
      if (!sectionMap.has(section)) sectionMap.set(section, []);
      sectionMap.get(section)!.push(item);
    });
    return sectionMap;
  }, [auditIssueCount]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!admin) return null;

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      {/* Top Navigation Bar */}
      <header className="bg-white border-b border-stone-200 sticky top-0 z-50">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setCollapsed(!collapsed)}
                className="p-1.5 rounded-lg hover:bg-stone-100 text-stone-500 transition-colors cursor-pointer"
                title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                {collapsed ? <PanelLeft className="w-5 h-5" /> : <PanelLeftClose className="w-5 h-5" />}
              </button>
              <img src="/images/logo.png" alt="DentaSmart" className="h-7" />
              <div className="hidden sm:flex items-center">
                <span className="text-stone-300 mx-2">|</span>
                <span className="text-sm font-medium text-stone-600">Admin</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-stone-500 hidden sm:block">
                <span className="font-medium text-stone-700">{admin.displayName || admin.username}</span>
              </span>
              <a href="/" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="sm" className="text-stone-500 hover:text-stone-700 cursor-pointer h-8">
                  <ExternalLink className="w-4 h-4 mr-1" />
                  <span className="hidden sm:inline text-xs">View Site</span>
                </Button>
              </a>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => logoutMutation.mutate()}
                className="text-stone-500 hover:text-red-600 cursor-pointer h-8"
              >
                <LogOut className="w-4 h-4 mr-1" />
                <span className="hidden sm:inline text-xs">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside
          className={`bg-white border-r border-stone-200 flex flex-col shrink-0 transition-all duration-200 ${
            collapsed ? "w-16" : "w-56"
          }`}
        >
          <nav className="flex-1 py-4 space-y-1 overflow-y-auto">
            {Array.from(sections.entries()).map(([sectionName, items], idx) => (
              <div key={sectionName}>
                {/* Section label */}
                {!collapsed && (
                  <div className={`px-4 ${idx > 0 ? "pt-4" : ""} pb-1`}>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-stone-400">
                      {sectionName}
                    </span>
                  </div>
                )}
                {collapsed && idx > 0 && (
                  <div className="mx-3 my-2 border-t border-stone-100" />
                )}
                {items.map((item) => {
                  const isActive = currentActive === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setLocation(item.path)}
                      title={collapsed ? item.label : undefined}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors cursor-pointer ${
                        isActive
                          ? "bg-primary/10 text-primary border-r-2 border-primary"
                          : "text-stone-600 hover:bg-stone-50 hover:text-stone-900"
                      } ${collapsed ? "justify-center px-0" : ""}`}
                    >
                      <span className={`shrink-0 ${isActive ? "text-primary" : "text-stone-400"}`}>
                        {item.icon}
                      </span>
                      {!collapsed && (
                        <>
                          <span className="flex-1 text-left">{item.label}</span>
                          {item.badge !== undefined && item.badge > 0 && (
                            <span className="bg-red-500 text-white text-[10px] rounded-full px-1.5 py-0.5 leading-none font-semibold">
                              {item.badge}
                            </span>
                          )}
                        </>
                      )}
                      {collapsed && item.badge !== undefined && item.badge > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] rounded-full w-4 h-4 flex items-center justify-center font-semibold">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            ))}
          </nav>

          {/* Sidebar footer */}
          {!collapsed && (
            <div className="p-4 border-t border-stone-100">
              <p className="text-[10px] text-stone-400 text-center">DentaSmart Admin v2.0</p>
            </div>
          )}
        </aside>

        {/* Main content area */}
        <main className="flex-1 min-w-0 overflow-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
