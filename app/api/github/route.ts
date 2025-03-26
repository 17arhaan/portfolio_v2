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
    // Check if token exists
    if (!process.env.GITHUB_TOKEN) {
      throw new Error('GitHub token is not configured');
    }

    const headers = {
      'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
      'Content-Type': 'application/json',
      'Accept': 'application/vnd.github.v3+json',
      'X-GitHub-Api-Version': '2022-11-28'
    };

    console.log('Starting GitHub API calls...');

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
          }
        }
      }
    `;

    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers,
      body: JSON.stringify({ query })
    });

    if (!response.ok) {
      throw new Error('GitHub API request failed');
    }

    const data = await response.json();
    
    if (data.errors) {
      console.error('GitHub API errors:', data.errors);
      throw new Error('Failed to fetch GitHub data');
    }

    const repositories = data.data.user.repositories.nodes;
    const contributions = data.data.user.contributionsCollection;

    // Calculate total stats
    const totalRepos = repositories.length;
    const totalStars = repositories.reduce((acc: number, repo: any) => acc + repo.stargazerCount, 0);
    const totalForks = repositories.reduce((acc: number, repo: any) => acc + repo.forkCount, 0);
    
    // Calculate total contributions properly
    const totalContributions = contributions.contributionCalendar.totalContributions;

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

    // Fetch recent activity with more details
    const activityQuery = `
      query {
        user(login: "17arhaan") {
          contributionsCollection(from: "${startDate.toISOString()}", to: "${endDate.toISOString()}") {
            commitContributionsByRepository {
              repository {
                name
                url
              }
              contributions(first: 5) {
                nodes {
                  commitCount
                  repository {
                    name
                    url
                  }
                  occurredAt
                }
              }
            }
          }
        }
      }
    `;

    const activityResponse = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers,
      body: JSON.stringify({ query: activityQuery })
    });

    if (!activityResponse.ok) {
      throw new Error('Failed to fetch GitHub activity');
    }

    const activityData = await activityResponse.json();
    
    if (activityData.errors) {
      console.error('GitHub Activity API errors:', activityData.errors);
      throw new Error('Failed to fetch GitHub activity');
    }

    // Process recent activity
    const recentActivity = activityData.data.user.contributionsCollection.commitContributionsByRepository
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

    console.log('Final response prepared successfully');
    return NextResponse.json(responseData);
  } catch (error: any) {
    console.error('GitHub API Error:', {
      name: error.name,
      message: error.message,
      stack: error.stack,
      token: process.env.GITHUB_TOKEN ? 'Token exists' : 'No token found'
    });

    return NextResponse.json({
      error: 'Failed to fetch GitHub stats',
      message: error.message,
      totalRepos: 0,
      totalStars: 0,
      totalForks: 0,
      totalContributions: 0,
      languages: [],
      recentActivity: []
    }, { status: 500 });
  }
} 