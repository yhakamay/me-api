import { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname === "/top-repos") {
    const repos = await fetchRepos();
    const defaultCount = 5;
    const requestedCount = parseInt(
      req.nextUrl.searchParams.get("count") ?? ""
    );

    if (requestedCount > 100) {
      return Response.json(
        {
          success: false,
          message: "count should be less than or equal to 100",
        },
        {
          status: 400,
        }
      );
    }

    const count = isNaN(requestedCount) ? defaultCount : requestedCount;
    const topRepos = await getTopRepos(repos, count);

    return Response.json(topRepos);
  }
}

async function fetchRepos() {
  const res = await fetch(
    "https://api.github.com/users/yhakamay/repos?sort=updated&direction=desc?per_page=100",
    {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_API_TOKEN}`,
      },
      next: {
        revalidate: 60 * 60 * 24,
      },
    }
  );

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return res.json();
}

async function getTopRepos(repos: any[], count: number) {
  // pop archived repos
  const activeRepos = repos.filter((repo) => !repo.archived);

  // sort repos by updated_at
  const sortedRepos = activeRepos.sort(
    (a, b) =>
      new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
  );

  return sortedRepos.slice(0, count);
}
