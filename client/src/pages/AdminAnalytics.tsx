import { useState, useMemo } from "react";
import AdminLayout from "@/components/AdminLayout";
import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Download,
  MousePointerClick,
  Eye,
  TrendingUp,
  Smartphone,
  Monitor,
  Tablet,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  Calendar,
  Activity,
  Target,
  Loader2,
} from "lucide-react";

// Date range helpers
function getDateRange(range: string): { start: string; end: string } {
  const end = new Date();
  const start = new Date();
  switch (range) {
    case "7d":
      start.setDate(end.getDate() - 7);
      break;
    case "14d":
      start.setDate(end.getDate() - 14);
      break;
    case "30d":
      start.setDate(end.getDate() - 30);
      break;
    case "90d":
      start.setDate(end.getDate() - 90);
      break;
    default:
      start.setDate(end.getDate() - 7);
  }
  return {
    start: start.toISOString().split("T")[0],
    end: end.toISOString().split("T")[0],
  };
}

// Metric card component
function MetricCard({
  title,
  value,
  icon: Icon,
  change,
  subtitle,
  color = "primary",
}: {
  title: string;
  value: number | string;
  icon: any;
  change?: number;
  subtitle?: string;
  color?: string;
}) {
  const colorMap: Record<string, string> = {
    primary: "bg-primary/10 text-primary",
    green: "bg-emerald-50 text-emerald-600",
    blue: "bg-blue-50 text-blue-600",
    orange: "bg-orange-50 text-orange-600",
    purple: "bg-purple-50 text-purple-600",
  };

  return (
    <Card className="border-stone-200">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-stone-500">{title}</p>
            <p className="text-3xl font-semibold text-stone-900">{value}</p>
            {subtitle && (
              <p className="text-xs text-stone-400">{subtitle}</p>
            )}
          </div>
          <div className={`p-3 rounded-xl ${colorMap[color] || colorMap.primary}`}>
            <Icon className="w-5 h-5" />
          </div>
        </div>
        {change !== undefined && (
          <div className="mt-3 flex items-center gap-1">
            {change >= 0 ? (
              <ArrowUpRight className="w-3.5 h-3.5 text-emerald-500" />
            ) : (
              <ArrowDownRight className="w-3.5 h-3.5 text-red-500" />
            )}
            <span
              className={`text-xs font-medium ${
                change >= 0 ? "text-emerald-600" : "text-red-600"
              }`}
            >
              {change >= 0 ? "+" : ""}
              {change}%
            </span>
            <span className="text-xs text-stone-400">vs prev period</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Simple bar chart using divs
function SimpleBarChart({
  data,
  maxValue,
}: {
  data: { label: string; value: number; color?: string }[];
  maxValue: number;
}) {
  return (
    <div className="space-y-3">
      {data.map((item, idx) => (
        <div key={idx} className="space-y-1">
          <div className="flex items-center justify-between text-sm">
            <span className="text-stone-600 truncate max-w-[70%]">{item.label}</span>
            <span className="font-medium text-stone-900">{item.value}</span>
          </div>
          <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                item.color || "bg-primary"
              }`}
              style={{
                width: `${maxValue > 0 ? (item.value / maxValue) * 100 : 0}%`,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

// Daily trend mini chart using divs
function DailyTrendChart({
  data,
}: {
  data: { date: string; count: number }[];
}) {
  const maxVal = Math.max(...data.map((d) => d.count), 1);
  return (
    <div className="flex items-end gap-1 h-32">
      {data.map((d, idx) => (
        <div key={idx} className="flex-1 flex flex-col items-center gap-1">
          <div
            className="w-full bg-primary/80 rounded-t transition-all duration-300 min-h-[2px]"
            style={{ height: `${(d.count / maxVal) * 100}%` }}
            title={`${d.date}: ${d.count}`}
          />
          <span className="text-[9px] text-stone-400 -rotate-45 origin-center whitespace-nowrap">
            {new Date(d.date + "T00:00:00").toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function AdminAnalytics() {
  const [dateRange, setDateRange] = useState("7d");
  const { start, end } = useMemo(() => getDateRange(dateRange), [dateRange]);

  // Fetch all analytics data
  const {
    data: stats,
    isLoading: statsLoading,
    refetch: refetchStats,
  } = trpc.analytics.getStats.useQuery({ startDate: start, endDate: end });

  const { data: topPages, isLoading: pagesLoading } =
    trpc.analytics.getTopPages.useQuery({
      startDate: start,
      endDate: end,
    });

  const { data: downloadPages } = trpc.analytics.getTopPages.useQuery({
    startDate: start,
    endDate: end,
    eventCategory: "download",
  });

  const { data: dailyTrend } = trpc.analytics.getDailyTrend.useQuery({
    startDate: start,
    endDate: end,
  });

  const { data: downloadTrend } = trpc.analytics.getDailyTrend.useQuery({
    startDate: start,
    endDate: end,
    eventCategory: "download",
  });

  const { data: devices } = trpc.analytics.getDeviceBreakdown.useQuery({
    startDate: start,
    endDate: end,
  });

  const { data: recentEvents, isLoading: eventsLoading } =
    trpc.analytics.getRecentEvents.useQuery({ limit: 30 });

  // Compute summary metrics
  const metrics = useMemo(() => {
    if (!stats) return { downloads: 0, ctaClicks: 0, pageViews: 0, leads: 0, quizStarts: 0, engagement: 0 };
    const byCategory: Record<string, number> = {};
    stats.forEach((s) => {
      byCategory[s.eventCategory] = (byCategory[s.eventCategory] || 0) + s.count;
    });
    return {
      downloads: byCategory["download"] || 0,
      ctaClicks: byCategory["cta_click"] || 0,
      pageViews: byCategory["page_view"] || 0,
      leads: byCategory["lead"] || 0,
      quizStarts: byCategory["quiz"] || 0,
      engagement: byCategory["engagement"] || 0,
    };
  }, [stats]);

  // Compute conversion rate
  const conversionRate = useMemo(() => {
    if (metrics.pageViews === 0) return "0%";
    return ((metrics.downloads / metrics.pageViews) * 100).toFixed(1) + "%";
  }, [metrics]);

  // Aggregate daily trend for chart
  const dailyChartData = useMemo(() => {
    if (!dailyTrend) return [];
    const byDate: Record<string, number> = {};
    dailyTrend.forEach((d) => {
      byDate[d.date] = (byDate[d.date] || 0) + d.count;
    });
    return Object.entries(byDate)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, count]) => ({ date, count }));
  }, [dailyTrend]);

  const downloadChartData = useMemo(() => {
    if (!downloadTrend) return [];
    const byDate: Record<string, number> = {};
    downloadTrend.forEach((d) => {
      byDate[d.date] = (byDate[d.date] || 0) + d.count;
    });
    return Object.entries(byDate)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, count]) => ({ date, count }));
  }, [downloadTrend]);

  // Top pages for bar chart
  const topPagesData = useMemo(() => {
    if (!topPages) return [];
    // Aggregate by page
    const byPage: Record<string, number> = {};
    topPages.forEach((p) => {
      byPage[p.sourcePage] = (byPage[p.sourcePage] || 0) + p.count;
    });
    return Object.entries(byPage)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([label, value]) => ({ label, value }));
  }, [topPages]);

  const topDownloadPagesData = useMemo(() => {
    if (!downloadPages) return [];
    const byPage: Record<string, number> = {};
    downloadPages.forEach((p) => {
      byPage[p.sourcePage] = (byPage[p.sourcePage] || 0) + p.count;
    });
    return Object.entries(byPage)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([label, value]) => ({ label, value, color: "bg-emerald-500" }));
  }, [downloadPages]);

  // Device breakdown
  const deviceData = useMemo(() => {
    if (!devices) return { desktop: 0, mobile: 0, tablet: 0 };
    const result: Record<string, number> = { desktop: 0, mobile: 0, tablet: 0 };
    devices.forEach((d) => {
      if (d.deviceType) result[d.deviceType] = (result[d.deviceType] || 0) + d.count;
    });
    return result;
  }, [devices]);

  const totalDevices = deviceData.desktop + deviceData.mobile + deviceData.tablet;

  // Event breakdown for the table
  const eventBreakdown = useMemo(() => {
    if (!stats) return [];
    return stats
      .sort((a, b) => b.count - a.count)
      .map((s) => ({
        name: s.eventName,
        category: s.eventCategory,
        count: s.count,
      }));
  }, [stats]);

  const isLoading = statsLoading || pagesLoading;

  const dateRanges = [
    { label: "7D", value: "7d" },
    { label: "14D", value: "14d" },
    { label: "30D", value: "30d" },
    { label: "90D", value: "90d" },
  ];

  return (
    <AdminLayout activeId="conversion-analytics">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-stone-900">
              Conversion Analytics
            </h1>
            <p className="text-sm text-stone-500 mt-1">
              Track downloads, CTA clicks, and visitor-to-download conversion funnel
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex bg-stone-100 rounded-lg p-0.5">
              {dateRanges.map((r) => (
                <button
                  key={r.value}
                  onClick={() => setDateRange(r.value)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                    dateRange === r.value
                      ? "bg-white text-stone-900 shadow-sm"
                      : "text-stone-500 hover:text-stone-700"
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => refetchStats()}
              className="h-8 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5 mr-1" />
              Refresh
            </Button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <>
            {/* Key Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <MetricCard
                title="App Downloads"
                value={metrics.downloads}
                icon={Download}
                color="green"
                subtitle="iOS + Android clicks"
              />
              <MetricCard
                title="CTA Clicks"
                value={metrics.ctaClicks}
                icon={MousePointerClick}
                color="blue"
                subtitle="All CTA interactions"
              />
              <MetricCard
                title="Conversion Rate"
                value={conversionRate}
                icon={Target}
                color="purple"
                subtitle="Downloads / Page Views"
              />
              <MetricCard
                title="Leads Captured"
                value={metrics.leads}
                icon={TrendingUp}
                color="orange"
                subtitle="Waitlist + quiz emails"
              />
            </div>

            {/* Trend Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card className="border-stone-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-medium text-stone-700 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-primary" />
                    All Events Trend
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {dailyChartData.length > 0 ? (
                    <DailyTrendChart data={dailyChartData} />
                  ) : (
                    <div className="h-32 flex items-center justify-center text-sm text-stone-400">
                      No data yet. Events will appear as visitors interact with your site.
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="border-stone-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-medium text-stone-700 flex items-center gap-2">
                    <Download className="w-4 h-4 text-emerald-600" />
                    Download Clicks Trend
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {downloadChartData.length > 0 ? (
                    <DailyTrendChart data={downloadChartData} />
                  ) : (
                    <div className="h-32 flex items-center justify-center text-sm text-stone-400">
                      No download clicks yet. This chart tracks iOS and Android download button clicks.
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Top Pages + Device Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Top Pages by All Events */}
              <Card className="border-stone-200 lg:col-span-2">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-medium text-stone-700">
                    Top Pages by Event Volume
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {topPagesData.length > 0 ? (
                    <SimpleBarChart
                      data={topPagesData}
                      maxValue={Math.max(...topPagesData.map((d) => d.value))}
                    />
                  ) : (
                    <p className="text-sm text-stone-400 py-8 text-center">
                      No page data yet.
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Device Breakdown */}
              <Card className="border-stone-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-medium text-stone-700">
                    Device Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {totalDevices > 0 ? (
                    <div className="space-y-4">
                      {[
                        {
                          label: "Desktop",
                          value: deviceData.desktop,
                          icon: Monitor,
                          color: "bg-blue-500",
                        },
                        {
                          label: "Mobile",
                          value: deviceData.mobile,
                          icon: Smartphone,
                          color: "bg-emerald-500",
                        },
                        {
                          label: "Tablet",
                          value: deviceData.tablet,
                          icon: Tablet,
                          color: "bg-orange-500",
                        },
                      ].map((device) => (
                        <div key={device.label} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <device.icon className="w-4 h-4 text-stone-400" />
                              <span className="text-sm text-stone-600">
                                {device.label}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-stone-900">
                                {device.value}
                              </span>
                              <span className="text-xs text-stone-400">
                                ({totalDevices > 0
                                  ? ((device.value / totalDevices) * 100).toFixed(0)
                                  : 0}
                                %)
                              </span>
                            </div>
                          </div>
                          <div className="h-1.5 bg-stone-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${device.color}`}
                              style={{
                                width: `${
                                  totalDevices > 0
                                    ? (device.value / totalDevices) * 100
                                    : 0
                                }%`,
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-stone-400 py-8 text-center">
                      No device data yet.
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Download Source Pages + Event Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Pages driving downloads */}
              <Card className="border-stone-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-medium text-stone-700 flex items-center gap-2">
                    <Download className="w-4 h-4 text-emerald-600" />
                    Pages Driving Downloads
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {topDownloadPagesData.length > 0 ? (
                    <SimpleBarChart
                      data={topDownloadPagesData}
                      maxValue={Math.max(
                        ...topDownloadPagesData.map((d) => d.value)
                      )}
                    />
                  ) : (
                    <p className="text-sm text-stone-400 py-8 text-center">
                      No download data yet. This shows which pages lead to app download clicks.
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Event breakdown table */}
              <Card className="border-stone-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-medium text-stone-700">
                    Event Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {eventBreakdown.length > 0 ? (
                    <div className="overflow-auto max-h-80">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-stone-100">
                            <th className="text-left py-2 text-stone-500 font-medium">
                              Event
                            </th>
                            <th className="text-left py-2 text-stone-500 font-medium">
                              Category
                            </th>
                            <th className="text-right py-2 text-stone-500 font-medium">
                              Count
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {eventBreakdown.map((e, idx) => (
                            <tr
                              key={idx}
                              className="border-b border-stone-50 hover:bg-stone-50"
                            >
                              <td className="py-2 text-stone-700 font-mono text-xs">
                                {e.name}
                              </td>
                              <td className="py-2">
                                <span
                                  className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                                    e.category === "download"
                                      ? "bg-emerald-50 text-emerald-700"
                                      : e.category === "cta_click"
                                      ? "bg-blue-50 text-blue-700"
                                      : e.category === "lead"
                                      ? "bg-orange-50 text-orange-700"
                                      : e.category === "quiz"
                                      ? "bg-purple-50 text-purple-700"
                                      : "bg-stone-100 text-stone-600"
                                  }`}
                                >
                                  {e.category}
                                </span>
                              </td>
                              <td className="py-2 text-right font-medium text-stone-900">
                                {e.count}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="text-sm text-stone-400 py-8 text-center">
                      No events recorded yet.
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Recent Events Feed */}
            <Card className="border-stone-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium text-stone-700 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-primary" />
                  Recent Events (Live Feed)
                </CardTitle>
              </CardHeader>
              <CardContent>
                {eventsLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="w-5 h-5 animate-spin text-stone-400" />
                  </div>
                ) : recentEvents && recentEvents.length > 0 ? (
                  <div className="overflow-auto max-h-96">
                    <table className="w-full text-sm">
                      <thead className="sticky top-0 bg-white">
                        <tr className="border-b border-stone-100">
                          <th className="text-left py-2 text-stone-500 font-medium">
                            Time
                          </th>
                          <th className="text-left py-2 text-stone-500 font-medium">
                            Event
                          </th>
                          <th className="text-left py-2 text-stone-500 font-medium">
                            Page
                          </th>
                          <th className="text-left py-2 text-stone-500 font-medium">
                            Device
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentEvents.map((e) => (
                          <tr
                            key={e.id}
                            className="border-b border-stone-50 hover:bg-stone-50"
                          >
                            <td className="py-2 text-stone-500 text-xs whitespace-nowrap">
                              {e.createdAt
                                ? new Date(e.createdAt).toLocaleString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    hour: "numeric",
                                    minute: "2-digit",
                                  })
                                : "-"}
                            </td>
                            <td className="py-2">
                              <span
                                className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                                  e.eventCategory === "download"
                                    ? "bg-emerald-50 text-emerald-700"
                                    : e.eventCategory === "cta_click"
                                    ? "bg-blue-50 text-blue-700"
                                    : e.eventCategory === "lead"
                                    ? "bg-orange-50 text-orange-700"
                                    : "bg-stone-100 text-stone-600"
                                }`}
                              >
                                {e.eventName}
                              </span>
                            </td>
                            <td className="py-2 text-stone-600 text-xs truncate max-w-[200px]">
                              {e.sourcePage}
                            </td>
                            <td className="py-2">
                              {e.deviceType === "mobile" ? (
                                <Smartphone className="w-3.5 h-3.5 text-stone-400" />
                              ) : e.deviceType === "tablet" ? (
                                <Tablet className="w-3.5 h-3.5 text-stone-400" />
                              ) : (
                                <Monitor className="w-3.5 h-3.5 text-stone-400" />
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Activity className="w-10 h-10 text-stone-300 mx-auto mb-3" />
                    <p className="text-sm text-stone-500 font-medium">
                      No events recorded yet
                    </p>
                    <p className="text-xs text-stone-400 mt-1 max-w-sm mx-auto">
                      Events will appear here in real-time as visitors interact with
                      your website. Download clicks, CTA interactions, and quiz
                      completions are all tracked automatically.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </AdminLayout>
  );
}
