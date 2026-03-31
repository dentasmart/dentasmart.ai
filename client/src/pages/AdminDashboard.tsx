import { useState, useEffect, useMemo } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  FileText,
  Loader2,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { toast } from "sonner";
import AdminLayout from "@/components/AdminLayout";

const STATUSES = ["All", "draft", "published", "unpublished"];

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");
  const [page, setPage] = useState(1);
  const limit = 15;

  // Blog list
  const { data, isLoading, refetch } = trpc.blog.adminList.useQuery({
    search: search || undefined,
    category: category !== "All" ? category : undefined,
    status: status !== "All" ? status : undefined,
    page,
    limit,
  });

  // Stats
  const { data: stats } = trpc.blog.stats.useQuery();

  // Categories
  const { data: categories } = trpc.blog.listCategories.useQuery();

  const categoryMap = useMemo(() => {
    const map = new Map<number, { name: string; color: string; parentId: number | null }>();
    categories?.forEach((c) => map.set(c.id, { name: c.name, color: c.color || "stone", parentId: c.parentId }));
    return map;
  }, [categories]);

  const categoryFilterOptions = useMemo(() => {
    if (!categories) return [{ label: "All", value: "All" }];
    const parents = categories.filter((c) => !c.parentId);
    return [
      { label: "All", value: "All" },
      ...parents.map((p) => ({ label: p.name, value: String(p.id) })),
    ];
  }, [categories]);

  // Mutations
  const publishMutation = trpc.blog.publish.useMutation({
    onSuccess: () => { toast.success("Article published"); refetch(); },
  });
  const unpublishMutation = trpc.blog.unpublish.useMutation({
    onSuccess: () => { toast.success("Article unpublished"); refetch(); },
  });
  const deleteMutation = trpc.blog.delete.useMutation({
    onSuccess: () => { toast.success("Article deleted"); refetch(); },
  });

  const totalPages = data ? Math.ceil(data.total / limit) : 0;

  const getStatusBadge = (s: string) => {
    switch (s) {
      case "published":
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-0">Published</Badge>;
      case "draft":
        return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-200 border-0">Draft</Badge>;
      case "unpublished":
        return <Badge className="bg-stone-100 text-stone-600 hover:bg-stone-200 border-0">Unpublished</Badge>;
      default:
        return <Badge variant="secondary">{s}</Badge>;
    }
  };

  const getCategoryDisplay = (post: any) => {
    const catId = post.categoryId;
    const subId = post.subcategoryId;
    const catInfo = catId ? categoryMap.get(catId) : null;
    const subInfo = subId ? categoryMap.get(subId) : null;

    const colorMap: Record<string, string> = {
      stone: "bg-stone-100 text-stone-700",
      blue: "bg-blue-100 text-blue-700",
      purple: "bg-purple-100 text-purple-700",
      orange: "bg-orange-100 text-orange-700",
      green: "bg-green-100 text-green-700",
      red: "bg-red-100 text-red-700",
      amber: "bg-amber-100 text-amber-700",
      teal: "bg-teal-100 text-teal-700",
      pink: "bg-pink-100 text-pink-700",
      indigo: "bg-indigo-100 text-indigo-700",
    };

    const legacyColors: Record<string, string> = {
      "Dentist Problems": "bg-blue-100 text-blue-700",
      "Dental Problems": "bg-purple-100 text-purple-700",
      "Insurance Problems": "bg-orange-100 text-orange-700",
      "Symptoms": "bg-amber-100 text-amber-700",
      "Gums": "bg-green-100 text-green-700",
      "Cavities": "bg-red-100 text-red-700",
      "X-Rays": "bg-teal-100 text-teal-700",
      "Costs": "bg-indigo-100 text-indigo-700",
    };

    if (catInfo) {
      const catColor = colorMap[catInfo.color] || "bg-stone-100 text-stone-700";
      return (
        <div className="flex flex-col gap-1">
          <Badge className={`${catColor} hover:opacity-80 border-0 text-xs`}>
            {catInfo.name}
          </Badge>
          {subInfo && (
            <Badge className={`${colorMap[subInfo.color] || catColor} hover:opacity-80 border-0 text-[10px] opacity-80`}>
              {subInfo.name}
            </Badge>
          )}
        </div>
      );
    }

    return (
      <Badge className={`${legacyColors[post.category] || "bg-stone-100 text-stone-600"} hover:opacity-80 border-0 text-xs`}>
        {post.category}
      </Badge>
    );
  };

  return (
    <AdminLayout activeId="articles">
      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total Articles" value={stats?.total || 0} icon={<FileText className="w-5 h-5 text-primary" />} />
        <StatCard label="Published" value={stats?.published || 0} icon={<Eye className="w-5 h-5 text-green-600" />} />
        <StatCard label="Drafts" value={stats?.drafts || 0} icon={<Edit className="w-5 h-5 text-amber-600" />} />
        <StatCard label="Unpublished" value={stats?.unpublished || 0} icon={<EyeOff className="w-5 h-5 text-stone-500" />} />
      </div>

      {/* Actions Bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <Input
            placeholder="Search articles..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="pl-10 bg-white border-stone-200"
          />
        </div>
        <Select value={category} onValueChange={(v) => { setCategory(v); setPage(1); }}>
          <SelectTrigger className="w-full sm:w-48 bg-white border-stone-200">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categoryFilterOptions.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={status} onValueChange={(v) => { setStatus(v); setPage(1); }}>
          <SelectTrigger className="w-full sm:w-40 bg-white border-stone-200">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            {STATUSES.map((s) => (
              <SelectItem key={s} value={s}>{s === "All" ? "All Statuses" : s.charAt(0).toUpperCase() + s.slice(1)}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          onClick={() => setLocation("/admin/new")}
          className="bg-primary hover:bg-primary/90 text-white cursor-pointer"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Article
        </Button>
      </div>

      {/* Articles Table */}
      <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-sm">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
          </div>
        ) : data?.posts.length === 0 ? (
          <div className="text-center py-20">
            <FileText className="w-12 h-12 text-stone-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-stone-700 mb-1">No articles found</h3>
            <p className="text-stone-500 text-sm mb-4">
              {search || category !== "All" || status !== "All"
                ? "Try adjusting your filters"
                : "Create your first article to get started"}
            </p>
            {!search && category === "All" && status === "All" && (
              <Button
                onClick={() => setLocation("/admin/new")}
                className="bg-primary hover:bg-primary/90 text-white cursor-pointer"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Article
              </Button>
            )}
          </div>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow className="bg-stone-50/50">
                  <TableHead className="font-semibold text-stone-700">Title</TableHead>
                  <TableHead className="font-semibold text-stone-700 hidden md:table-cell">Category</TableHead>
                  <TableHead className="font-semibold text-stone-700">Status</TableHead>
                  <TableHead className="font-semibold text-stone-700 hidden lg:table-cell">Published</TableHead>
                  <TableHead className="font-semibold text-stone-700 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.posts.map((post) => (
                  <TableRow key={post.id} className="hover:bg-stone-50/50 group">
                    <TableCell>
                      <div>
                        <p className="font-medium text-stone-900 group-hover:text-primary transition-colors line-clamp-1">
                          {post.title}
                        </p>
                        <p className="text-xs text-stone-400 mt-0.5">/oral-health-hub/{post.slug}</p>
                        <div className="md:hidden mt-1">{getCategoryDisplay(post)}</div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {getCategoryDisplay(post)}
                    </TableCell>
                    <TableCell>{getStatusBadge(post.status)}</TableCell>
                    <TableCell className="hidden lg:table-cell text-sm text-stone-500">
                      {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "-"}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setLocation(`/admin/edit/${post.id}`)}
                          className="text-stone-500 hover:text-primary cursor-pointer"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        {post.status === "published" ? (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => unpublishMutation.mutate({ id: post.id })}
                            className="text-stone-500 hover:text-amber-600 cursor-pointer"
                            title="Unpublish"
                            disabled={unpublishMutation.isPending}
                          >
                            <EyeOff className="w-4 h-4" />
                          </Button>
                        ) : (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => publishMutation.mutate({ id: post.id })}
                            className="text-stone-500 hover:text-green-600 cursor-pointer"
                            title="Publish"
                            disabled={publishMutation.isPending}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        )}
                        {post.status === "published" && (
                          <a
                            href={`/oral-health-hub/${post.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-stone-500 hover:text-primary cursor-pointer"
                              title="View live"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </Button>
                          </a>
                        )}
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-stone-500 hover:text-red-600 cursor-pointer"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Article</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete "{post.title}"? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => deleteMutation.mutate({ id: post.id })}
                                className="bg-red-600 hover:bg-red-700 text-white"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-4 py-3 border-t border-stone-200">
                <p className="text-sm text-stone-500">
                  Showing {((page - 1) * limit) + 1}–{Math.min(page * limit, data?.total || 0)} of {data?.total || 0}
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <span className="text-sm text-stone-600 px-2">
                    Page {page} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </AdminLayout>
  );
}

function StatCard({ label, value, icon }: { label: string; value: number; icon: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl border border-stone-200 p-4 flex items-center gap-3">
      <div className="p-2 bg-stone-50 rounded-lg">{icon}</div>
      <div>
        <p className="text-2xl font-semibold text-stone-900">{value}</p>
        <p className="text-xs text-stone-500">{label}</p>
      </div>
    </div>
  );
}
