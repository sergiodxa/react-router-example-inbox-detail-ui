import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/_index.tsx"),
  route("inbox", "routes/inbox.tsx", [
    index("routes/inbox-empty.tsx"),
    route(":issue", "routes/issue.tsx", { id: "routes/inbox/:issue" }),
  ]),
  route(":issue", "routes/issue.tsx", { id: "routes/:issue" }),
] satisfies RouteConfig;
