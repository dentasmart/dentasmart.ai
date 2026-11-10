/** Read-only history of immutable saved Blog Editor snapshots (admin-only API). */
import { History, ExternalLink, Loader2 } from "lucide-react";
import { trpc } from "@/lib/trpc";

export default function BlogRevisionHistory({ articleId }: { articleId: number }) {
  const history = trpc.blog.listRevisions.useQuery(
    { id: articleId }, { enabled: Number.isSafeInteger(articleId) && articleId > 0, retry: false },
  );
  return (
    <section className="mx-auto max-w-6xl px-4 py-5 sm:px-6 lg:px-8" aria-label="Blog revision history">
      <div className="rounded-xl border border-stone-200 bg-white p-5">
        <div className="flex items-center gap-2">
          <History className="h-5 w-5 text-teal-700"/>
          <h2 className="text-lg font-semibold text-stone-900">Revision History</h2>
        </div>
        <p className="mt-1 text-sm text-stone-600">
          Saved snapshots are read-only. Viewing them never replaces a draft or changes the live article.
          Revisions created before tracking was enabled cannot be reconstructed.
        </p>
        {history.isLoading ? <p className="mt-4 text-sm text-stone-600"><Loader2 className="mr-2 inline h-4 w-4 animate-spin"/>Loading history…</p>
          : history.error ? <p role="alert" className="mt-4 text-sm text-red-700">Unable to load revision history: {history.error.message}</p>
          : !history.data?.available ? <p className="mt-4 rounded-md border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
              Revision storage is not yet enabled on this isolated test database. The test-only migration and backup verification must be completed first.
            </p>
          : history.data.revisions.length === 0
            ? <p className="mt-4 text-sm text-stone-600">No saved revisions have been recorded yet. New saves will create history.</p>
            : <ol className="mt-4 divide-y divide-stone-100">
                {history.data.revisions.map((item) => (
                  <li key={item.revision} className="flex flex-wrap items-center justify-between gap-3 py-3 text-sm">
                    <div>
                      <span className="font-semibold text-stone-900">Revision {item.revision}</span>
                      <span className="ml-2 capitalize text-stone-600">{item.action.replace("_", " ")}</span>
                      <p className="mt-1 text-stone-500">{item.title} · {item.status} · {new Date(item.createdAt).toLocaleString()}</p>
                    </div>
                    <a className="inline-flex items-center gap-1 rounded-md border border-teal-300 px-3 py-2 text-sm font-semibold text-teal-800 hover:bg-teal-50"
                       href={`/admin/blog-revision-preview/${articleId}/${item.revision}`}
                       target="_blank" rel="noopener noreferrer">
                      View Revision <ExternalLink className="h-3.5 w-3.5"/>
                    </a>
                  </li>
                ))}
              </ol>}
      </div>
    </section>
  );
}
