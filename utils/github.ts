export interface GitHubStats {
  totalRepos: number;
  totalStars: number;
  totalForks: number;
  totalContributions: number;
  languages: { name: string; percentage: number }[];
  recentActivity: {
    date: string;
    repo: string;
    repoUrl: string;
    commits: {
      message: string;
      url: string;
      changes: {
        additions: number;
        deletions: number;
      };
    }[];
  }[];
}

export async function fetchGitHubStats(username: string): Promise<GitHubStats> {
  try {
    const headers = {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
      'Content-Type': 'application/json',
    };

    // GraphQL query for user data and contributions
    const query = `
      query {
        user(login: "${username}") {
          repositories(first: 100) {
            nodes {
              name
              stargazerCount
              forkCount
              languages(first: 10) {
                nodes {
                  name
                  color
                }
              }
            }
          }
          contributionsCollection {
            contributionCalendar {
              totalContributions
            }
          }
        }
      }
    `;

    // Fetch user data and contributions
    const userResponse = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers,
      body: JSON.stringify({ query }),
    });

    const userData = await userResponse.json();

    if (userData.errors) {
      console.error('GitHub API errors:', userData.errors);
      throw new Error('Failed to fetch GitHub data');
    }

    const repositories = userData.data.user.repositories.nodes;
    const totalRepos = repositories.length;
    const totalStars = repositories.reduce((acc: number, repo: any) => acc + repo.stargazerCount, 0);
    const totalForks = repositories.reduce((acc: number, repo: any) => acc + repo.forkCount, 0);
    const totalContributions = userData.data.user.contributionsCollection.contributionCalendar.totalContributions;

    // Calculate language stats
    const languageTotals: Record<string, number> = {};
    repositories.forEach((repo: any) => {
      repo.languages.nodes.forEach((lang: any) => {
        languageTotals[lang.name] = (languageTotals[lang.name] || 0) + 1;
      });
    });

    const totalLanguages = Object.values(languageTotals).reduce((acc: number, count: number) => acc + count, 0);
    const languages = Object.entries(languageTotals).map(([name, count]) => ({
      name,
      percentage: Math.round((count / totalLanguages) * 100)
    }));

    // Sort languages by percentage
    languages.sort((a, b) => b.percentage - a.percentage);

    // Fetch recent activity
    const activityResponse = await fetch(`https://api.github.com/users/${username}/events`, { headers });
    const activityData = await activityResponse.json();

    const recentActivity = activityData
      .slice(0, 7)
      .map((event: any) => ({
        date: event.created_at.split('T')[0],
        repo: event.repo.name,
        repoUrl: event.repo.url.replace('api.', '').replace('/repos', ''),
        commits: event.type === 'PushEvent' ? event.payload.commits.map((commit: any) => ({
          message: commit.message,
          url: commit.url,
          changes: {
            additions: event.payload.size || 0,
            deletions: event.payload.distinct_size || 0
          }
        })) : []
      }));

    return {
      totalRepos,
      totalStars,
      totalForks,
      totalContributions,
      languages,
      recentActivity
    };
  } catch (error) {
    console.error('Error fetching GitHub stats:', error);
    throw error;
  }
} 