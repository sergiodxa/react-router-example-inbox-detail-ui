interface Issue {
  id: string;
  title: string;
  description: string;
}

export const issues = new Map<string, Issue>();

issues.set("1", {
  id: "1",
  title: "Create /inbox",
  description: "Create the /inbox route",
});

issues.set("2", {
  id: "2",
  title: "Create /:issue",
  description: "Create the /:issue route",
});

issues.set("3", {
  id: "3",
  title: "Create /inbox/:issue",
  description: "Create the /inbox/:issue route",
});
