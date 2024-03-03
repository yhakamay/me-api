import { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname === "/top-repos") {
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

    return Response.json(await res.json());
  }
}
