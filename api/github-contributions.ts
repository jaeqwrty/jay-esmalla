// Vercel serverless function — proxies GitHub GraphQL API safely
// Token is stored in Vercel environment variables, never exposed to the browser.
//
// HOW TO SET UP:
//   1. Create a GitHub PAT: github.com/settings/tokens → "Fine-grained token"
//      Required scopes: read:user (to read public contribution data)
//   2. In Vercel dashboard → Settings → Environment Variables:
//      Name: GITHUB_TOKEN   Value: ghp_xxxxxxxx   Environment: Production + Preview
//   3. For local dev, run `vercel dev` (not `npm run dev`) so this function loads.
//      OR create a `.env.local` with GITHUB_TOKEN=... and run `vercel dev`.

const USERNAME = "jaeqwrty";

// Last 12 months — GitHub default (no from/to = rolling 52-week window)
const QUERY_LAST = `
  query($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays { date contributionCount color }
          }
        }
      }
    }
  }
`;

// Specific calendar year
const QUERY_YEAR = `
  query($login: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $login) {
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays { date contributionCount color }
          }
        }
      }
    }
  }
`;

export default async function handler(req: any, res: any) {
  // CORS so the Vite dev proxy and production both work
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  if (req.method === "OPTIONS") return res.status(200).end();

  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return res.status(500).json({
      error: "GITHUB_TOKEN environment variable is not set on the server.",
    });
  }

  const yearParam = req.query?.year as string | undefined;
  const isSpecificYear = yearParam && yearParam !== "last";

  let query: string;
  let variables: Record<string, string>;

  if (isSpecificYear) {
    const y = parseInt(yearParam!, 10);
    const now = new Date();
    const isCurrent = y === now.getFullYear();
    query = QUERY_YEAR;
    variables = {
      login: USERNAME,
      from: `${y}-01-01T00:00:00Z`,
      to: isCurrent ? now.toISOString() : `${y}-12-31T23:59:59Z`,
    };
  } else {
    query = QUERY_LAST;
    variables = { login: USERNAME };
  }

  try {
    const ghRes = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `bearer ${token}`,
        "Content-Type": "application/json",
        "User-Agent": "portfolio-contributions-widget/1.0",
      },
      body: JSON.stringify({ query, variables }),
    });

    if (!ghRes.ok) {
      return res.status(502).json({ error: `GitHub API HTTP ${ghRes.status}` });
    }

    const json = await ghRes.json();
    if (json.errors?.length) {
      return res.status(502).json({ error: json.errors[0].message });
    }

    const cal =
      json.data.user.contributionsCollection.contributionCalendar;

    // Cache for 30 min on CDN, serve stale for 1 h while revalidating
    res.setHeader(
      "Cache-Control",
      "public, s-maxage=1800, stale-while-revalidate=3600"
    );

    return res.status(200).json({
      total: cal.totalContributions,
      weeks: cal.weeks.map((w: any) => ({
        days: w.contributionDays.map((d: any) => ({
          date: d.date,
          count: d.contributionCount,
          color: d.color, // GitHub's own hex color (used for level mapping)
        })),
      })),
    });
  } catch (err: any) {
    return res.status(502).json({ error: err.message ?? "Unknown error" });
  }
}
