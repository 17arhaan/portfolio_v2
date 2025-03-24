import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const headers = {
      'Authorization': `token ${process.env.GITHUB_TOKEN}`,
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': '17arhaan'
    };

    console.log('Starting GitHub API calls...');
    console.log('Token exists:', !!process.env.GITHUB_TOKEN);

    // Fetch user data
    console.log('Fetching user data...');
    const userResponse = await fetch('https://api.github.com/users/17arhaan', { headers });
    
    if (!userResponse.ok) {
      const errorText = await userResponse.text();
      console.error('User API Error:', {
        status: userResponse.status,
        statusText: userResponse.statusText,
        error: errorText
      });
      throw new Error(`User API failed: ${errorText}`);
    }

    const userData = await userResponse.json();
    console.log('User data fetched successfully:', userData.login);

    // Fetch repositories
    console.log('Fetching repositories...');
    const reposResponse = await fetch('https://api.github.com/users/17arhaan/repos', { headers });
    
    if (!reposResponse.ok) {
      const errorText = await reposResponse.text();
      console.error('Repos API Error:', {
        status: reposResponse.status,
        statusText: reposResponse.statusText,
        error: errorText
      });
      throw new Error(`Repos API failed: ${errorText}`);
    }

    const reposData = await reposResponse.json();
    console.log('Repositories fetched:', reposData.length);

    // Calculate stats
    const totalStars = reposData.reduce((acc: number, repo: any) => acc + repo.stargazers_count, 0);
    const totalForks = reposData.reduce((acc: number, repo: any) => acc + repo.forks_count, 0);
    console.log('Stats calculated:', { totalStars, totalForks });

    // Fetch recent activity
    console.log('Fetching recent activity...');
    const activityResponse = await fetch('https://api.github.com/users/17arhaan/events', { headers });
    
    if (!activityResponse.ok) {
      const errorText = await activityResponse.text();
      console.error('Activity API Error:', {
        status: activityResponse.status,
        statusText: activityResponse.statusText,
        error: errorText
      });
      throw new Error(`Activity API failed: ${errorText}`);
    }

    const activityData = await activityResponse.json();
    console.log('Activity events fetched:', activityData.length);

    // Process recent activity
    const recentActivity = activityData
      .filter((event: any) => event.type === 'PushEvent')
      .slice(0, 7)
      .map((event: any) => ({
        date: new Date(event.created_at).toLocaleDateString(),
        repo: event.repo.name.split('/')[1],
        repoUrl: `https://github.com/${event.repo.name}`,
        commits: event.payload.commits.map((commit: any) => ({
          message: commit.message,
          url: `https://github.com/${event.repo.name}/commit/${commit.sha}`,
          changes: {
            additions: event.payload.size || 0,
            deletions: event.payload.distinct_size || 0
          }
        }))
      }));

    // Fetch language stats
    console.log('Fetching language stats...');
    const languagePromises = reposData.map(async (repo: any) => {
      const langResponse = await fetch(repo.languages_url, { headers });
      if (!langResponse.ok) {
        console.error(`Failed to fetch languages for ${repo.name}`);
        return {};
      }
      return langResponse.json();
    });

    const languagesData = await Promise.all(languagePromises);
    
    // Calculate language percentages
    const totalBytes = languagesData.reduce((acc: number, langData: any) => {
      return acc + Object.values(langData).reduce((sum: any, bytes: any) => sum + bytes, 0);
    }, 0);

    const languageStats = Object.entries(
      languagesData.reduce((acc: any, langData: any) => {
        Object.entries(langData).forEach(([lang, bytes]: [string, any]) => {
          acc[lang] = (acc[lang] || 0) + bytes;
        });
        return acc;
      }, {})
    )
    .map(([name, bytes]: [string, any]) => ({
      name,
      percentage: Math.round((bytes / totalBytes) * 100),
      color: '#' + Math.floor(Math.random()*16777215).toString(16) // Fallback color if not in mapping
    }))
    .sort((a, b) => b.percentage - a.percentage)
    .slice(0, 5);

    console.log('Language stats calculated:', languageStats);

    // Return the response
    const response = {
      totalRepos: userData.public_repos,
      totalStars,
      totalForks,
      totalContributions: userData.public_repos, // Using repos count as a fallback
      languages: languageStats,
      recentActivity
    };

    console.log('Final response prepared successfully');
    return NextResponse.json(response);
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