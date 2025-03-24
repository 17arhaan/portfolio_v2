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
                  }
                }
              }
            }
          }
          contributionsCollection {
            totalCommitContributions
            totalIssueContributions
            totalPullRequestContributions
            totalPullRequestReviewContributions
            restrictedContributionsCount
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
    const totalContributions = 
      contributions.totalCommitContributions +
      contributions.totalIssueContributions +
      contributions.totalPullRequestContributions +
      contributions.totalPullRequestReviewContributions +
      contributions.restrictedContributionsCount;

    // Calculate language stats with proper sizing
    const languageTotals: { [key: string]: number } = {};
    repositories.forEach((repo: any) => {
      repo.languages.edges.forEach((edge: any) => {
        const langName = edge.node.name;
        languageTotals[langName] = (languageTotals[langName] || 0) + edge.size;
      });
    });

    const totalBytes = Object.values(languageTotals).reduce((a: number, b: number) => a + b, 0);
    const languages = Object.entries(languageTotals)
      .map(([name, size]) => ({
        name,
        percentage: Math.round((size / totalBytes) * 100),
        color: languageColors[name as keyof typeof languageColors] || '#8b8b8b'
      }))
      .filter(lang => lang.percentage > 0)
      .sort((a, b) => b.percentage - a.percentage);

    // Fetch recent activity with more details
    const activityQuery = `
      query {
        user(login: "17arhaan") {
          contributionsCollection {
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
              additions: 0,
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