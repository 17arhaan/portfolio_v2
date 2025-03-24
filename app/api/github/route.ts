import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Fetch user data
    const userResponse = await fetch('https://api.github.com/users/17arhaan', {
      headers: {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });
    const userData = await userResponse.json();

    // Fetch repositories
    const reposResponse = await fetch('https://api.github.com/users/17arhaan/repos', {
      headers: {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });
    const reposData = await reposResponse.json();

    // Calculate stats
    const totalStars = reposData.reduce((acc: number, repo: any) => acc + repo.stargazers_count, 0);
    const totalForks = reposData.reduce((acc: number, repo: any) => acc + repo.forks_count, 0);

    // Fetch contributions using GraphQL API
    const contributionsQuery = {
      query: `
        query {
          user(login: "17arhaan") {
            contributionsCollection {
              totalCommitContributions
              contributionCalendar {
                totalContributions
              }
            }
          }
        }
      `
    };

    const contributionsResponse = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contributionsQuery),
    });
    const contributionsData = await contributionsResponse.json();
    const totalContributions = contributionsData.data?.user?.contributionsCollection?.contributionCalendar?.totalContributions || 0;

    // Fetch recent activity
    const activityResponse = await fetch('https://api.github.com/users/17arhaan/events', {
      headers: {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });
    const activityData = await activityResponse.json();

    // Process recent activity
    const recentActivity = activityData
      .filter((event: any) => event.type === 'PushEvent')
      .slice(0, 7)
      .map((event: any) => ({
        date: new Date(event.created_at).toLocaleDateString(),
        repo: event.repo.name.split('/')[1],
        repoUrl: event.repo.url.replace('api.', '').replace('/repos', ''),
        commits: event.payload.commits.map((commit: any) => ({
          message: commit.message,
          url: commit.url,
          changes: {
            additions: event.payload.size || 0,
            deletions: event.payload.distinct_size || 0
          }
        }))
      }));

    // Fetch language stats
    const languagePromises = reposData.map(async (repo: any) => {
      const langResponse = await fetch(repo.languages_url, {
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      });
      const langData = await langResponse.json();
      return langData;
    });

    const languagesData = await Promise.all(languagePromises);
    
    // Calculate language percentages
    const totalBytes = languagesData.reduce((acc: number, langData: any) => {
      return acc + Object.values(langData).reduce((sum: number, bytes: number) => sum + bytes, 0);
    }, 0);

    const languageColors: { [key: string]: string } = {
      JavaScript: '#f1e05a',
      TypeScript: '#2b7489',
      Python: '#3572A5',
      Java: '#b07219',
      C: '#555555',
      'C++': '#f34b7d',
      Go: '#00ADD8',
      Rust: '#dea584',
      Ruby: '#701516',
      PHP: '#4F5B93',
      Swift: '#ffac45',
      Kotlin: '#F18E33',
      HTML: '#e34c26',
      CSS: '#563d7c',
      Shell: '#89e051',
      'C#': '#178600',
      R: '#198CE7',
      Dart: '#00B4AB',
      Scala: '#c22d40',
      Haskell: '#5e5086'
    };

    const languageStats = Object.entries(
      languagesData.reduce((acc: any, langData: any) => {
        Object.entries(langData).forEach(([lang, bytes]: [string, number]) => {
          if (languageColors[lang]) {
            acc[lang] = (acc[lang] || 0) + bytes;
          }
        });
        return acc;
      }, {})
    ).map(([name, bytes]: [string, number]) => ({
      name,
      percentage: Math.round((bytes as number / totalBytes) * 100),
      color: languageColors[name]
    }))
    .sort((a, b) => b.percentage - a.percentage)
    .slice(0, 5);

    return NextResponse.json({
      totalRepos: userData.public_repos,
      totalStars,
      totalForks,
      totalContributions,
      languages: languageStats,
      recentActivity
    });
  } catch (error) {
    console.error('Error fetching GitHub stats:', error);
    return NextResponse.json({
      totalRepos: 0,
      totalStars: 0,
      totalForks: 0,
      totalContributions: 0,
      languages: [],
      recentActivity: []
    });
  }
} 