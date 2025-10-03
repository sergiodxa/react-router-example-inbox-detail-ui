import { InboxContext } from "~/context/inbox";
import type { Route } from "./+types/inbox";
import { issues } from "~/data";
import { href, NavLink, Outlet } from "react-router";

export const middleware: Route.MiddlewareFunction[] = [
  ({ context }) => {
    context.set(InboxContext, true);
  },
];

export async function loader() {
  return { issues: Array.from(issues.values()) };
}

export default function Component({ loaderData }: Route.ComponentProps) {
  return (
    <div className="flex divide-x divide-black dark:divide-white">
      <ol className="w-1/4 p-4">
        {loaderData.issues.map((issue) => (
          <li key={issue.id}>
            <NavLink to={href("/inbox/:issue", { issue: issue.id })}>
              {issue.title}
            </NavLink>
          </li>
        ))}
      </ol>
      <div className="w-3/4 p-4">
        <Outlet />
      </div>
    </div>
  );
}
