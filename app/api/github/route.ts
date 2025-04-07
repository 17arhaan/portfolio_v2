import { NextResponse } from 'next/server'

// Standard GitHub language colors
const languageColors = {
  JavaScript: '#f1e05a',
  TypeScript: '#2b7489',
  Python: '#3572A5',
  Java: '#b07219',
  'C++': '#f34b7d',
  C: '#555555',
  'C#': '#178600',
  Go: '#00ADD8',
  Rust: '#dea584',
  Swift: '#ffac45',
  Kotlin: '#F18E33',
  Ruby: '#701516',
  PHP: '#4F5B93',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Shell: '#89e051',
  Jupyter: '#DA5B0B',
  Dart: '#00B4AB',
  R: '#198CE7',
  Vue: '#41b883'
};

export async function GET() {
  try {
    if (!process.env.GITHUB_TOKEN) {
      console.error('GitHub token is not configured');
      return NextResponse.json({ error: 'GitHub token not configured' }, { status: 500 });
    }

    const headers = {
      'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
      'Content-Type': 'application/json',
      'Accept': 'application/vnd.github.v3+json',
      'X-GitHub-Api-Version': '2022-11-28'
    };

    // Calculate date range (last 365 days)
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 365);
    
    // GraphQL query for user data, repositories, and contributions
    const query = `
      query {
        user(login: "17arhaan") {
          repositories(first: 100, privacy: PUBLIC) {
            nodes {
              name
              stargazerCount
              forkCount
              languages(first: 10, orderBy: {field: SIZE, direction: DESC}) {
                edges {
                  size
                  node {
                    name
                    color
                  }
                }
              }
            }
          }
          contributionsCollection(from: "${startDate.toISOString()}", to: "${endDate.toISOString()}") {
            totalCommitContributions
            totalIssueContributions
            totalPullRequestContributions
            totalPullRequestReviewContributions
            restrictedContributionsCount
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  contributionCount
                  date
                }
              }
            }
            commitContributionsByRepository {
              repository {
                name
                url
              }
              contributions(first: 5) {
                nodes {
                  commitCount
                  occurredAt
                  repository {
                    name
                    url
                  }
                }
              }
            }
          }
        }
      }
    `;

    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers,
      body: JSON.stringify({ query }),
      next: { revalidate: 300 }
    });

    if (!response.ok) {
      console.error('GitHub API request failed:', response.statusText);
      return NextResponse.json({ error: 'GitHub API request failed' }, { status: response.status });
    }

    const data = await response.json();
    
    if (data.errors) {
      console.error('GitHub API errors:', data.errors);
      return NextResponse.json({ error: 'GitHub API returned errors' }, { status: 500 });
    }

    const repositories = data.data.user.repositories.nodes;
    const contributions = data.data.user.contributionsCollection;

    // Calculate total stats
    const totalRepos = repositories.length;
    const totalStars = repositories.reduce((acc: number, repo: any) => acc + repo.stargazerCount, 0);
    const totalForks = repositories.reduce((acc: number, repo: any) => acc + repo.forkCount, 0);
    
    // Calculate total contributions from the calendar
    const contributionCalendar = contributions.contributionCalendar;
    const totalContributions = contributionCalendar.totalContributions;

    // Calculate language stats with proper sizing
    const languageTotals: { [key: string]: { size: number; color: string } } = {};
    repositories.forEach((repo: any) => {
      repo.languages.edges.forEach((edge: any) => {
        const langName = edge.node.name;
        if (!languageTotals[langName]) {
          languageTotals[langName] = { size: 0, color: edge.node.color };
        }
        languageTotals[langName].size += edge.size;
      });
    });

    const totalBytes = Object.values(languageTotals).reduce((acc, curr) => acc + curr.size, 0);
    const languages = Object.entries(languageTotals)
      .map(([name, data]) => ({
        name,
        percentage: Math.round((data.size / totalBytes) * 100),
        color: data.color || '#8b8b8b'
      }))
      .filter(lang => lang.percentage > 0)
      .sort((a, b) => b.percentage - a.percentage);

    // Process recent activity
    const recentActivity = contributions.commitContributionsByRepository
      .flatMap((repo: any) => 
        repo.contributions.nodes.map((node: any) => ({
          date: new Date(node.occurredAt).toISOString().split('T')[0],
          repo: repo.repository.name,
          repoUrl: repo.repository.url,
          commits: [{
            message: `${node.commitCount} commit${node.commitCount > 1 ? 's' : ''}`,
            url: `${repo.repository.url}/commits`,
            changes: {
              additions: node.commitCount,
              deletions: 0
            }
          }]
        }))
      )
      .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5);

    // Return the response
    const responseData = {
      totalRepos,
      totalStars,
      totalForks,
      totalContributions,
      languages,
      recentActivity
    };

    return NextResponse.json(responseData, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=150'
      }
    });
  } catch (error) {
    console.error('Error fetching GitHub stats:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 