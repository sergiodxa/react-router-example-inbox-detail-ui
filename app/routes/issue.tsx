import { InboxContext } from "~/context/inbox";
import type { Route } from "./+types/issue";
import { href, Link, redirect } from "react-router";
import { issues } from "~/data";

export async function loader({ request, params, context }: Route.LoaderArgs) {
  let isInbox = context.get(InboxContext);

  // If we're in the inbox, and it's a document request, redirect to the
  // non-inbox version of the issue
  if (isInbox && request.headers.get("Sec-Fetch-Dest") === "document") {
    return redirect(href("/:issue", params));
  }

  let issue = issues.get(params.issue);

  if (issue) return { issue, isInbox };
  throw new Error("Issue not found");
}

export default function Component({ loaderData }: Route.ComponentProps) {
  return (
    <div
      className="relative data-[isinbox=false]:p-4"
      data-isinbox={loaderData.isInbox}
    >
      {loaderData.isInbox ? (
        <Link
          to={href("/inbox")}
          className="text-blue-500 underline absolute top-0 right-0"
        >
          ⅹ Close
        </Link>
      ) : (
        <Link
          to={href("/inbox")}
          className="text-blue-500 underline absolute top-4 right-4"
        >
          ← Back to inbox
        </Link>
      )}

      <h1 className="text-2xl">
        {loaderData.issue.title} ({loaderData.issue.id})
      </h1>
      <p className="mt-4">{loaderData.issue.description}</p>
    </div>
  );
}
