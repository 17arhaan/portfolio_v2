import { NextResponse } from 'next/server'

interface Submission {
  title: string;
  difficulty: string;
  date: string;
}

export async function GET() {
  try {
    // First fetch the basic stats
    const statsResponse = await fetch('https://leetcode-stats-api.herokuapp.com/arhaan17', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0'
      }
    });

    if (!statsResponse.ok) {
      throw new Error('Failed to fetch LeetCode stats');
    }

    const statsData = await statsResponse.json();

    // Now fetch recent submissions using REST API
    const submissionsResponse = await fetch('https://leetcode.com/api/submissions/arhaan17/?offset=0&limit=20', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0',
        'Origin': 'https://leetcode.com',
        'Referer': `https://leetcode.com/arhaan17`
      }
    });

    let recentSubmissions: Submission[] = [];
    if (submissionsResponse.ok) {
      const submissionsData = await submissionsResponse.json();
      console.log('Submissions response:', submissionsData);

      if (submissionsData.submissions_dump) {
        recentSubmissions = submissionsData.submissions_dump
          .filter((sub: any) => sub.status_display === 'Accepted')
          .map((sub: any) => ({
            title: sub.title,
            difficulty: sub.difficulty || 'Unknown',
            date: new Date(sub.timestamp * 1000).toLocaleDateString()
          }))
          .slice(0, 5);
      } else {
        console.error('No recent submissions found in response:', submissionsData);
      }
    } else {
      const errorText = await submissionsResponse.text();
      console.error('Failed to fetch submissions:', submissionsResponse.status, errorText);
    }

    // Return combined data
    const response = {
      totalSolved: statsData.totalSolved,
      totalQuestions: statsData.totalQuestions,
      easySolved: statsData.easySolved,
      easyTotal: statsData.totalEasy,
      mediumSolved: statsData.mediumSolved,
      mediumTotal: statsData.totalMedium,
      hardSolved: statsData.hardSolved,
      hardTotal: statsData.totalHard,
      recentSubmissions
    };

    console.log('Final response:', response);
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching LeetCode data:', error);
    return NextResponse.json({
      totalSolved: 0,
      totalQuestions: 2500,
      easySolved: 0,
      easyTotal: 150,
      mediumSolved: 0,
      mediumTotal: 150,
      hardSolved: 0,
      hardTotal: 75,
      recentSubmissions: []
    });
  }
} 