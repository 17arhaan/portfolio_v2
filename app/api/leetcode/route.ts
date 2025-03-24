import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Fetch user's stats
    const response = await fetch('https://leetcode-stats-api.herokuapp.com/arhaan17', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0'
      },
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error('Failed to fetch LeetCode stats');
    }

    const data = await response.json();
    console.log('LeetCode API response:', data);

    // Process the data
    return NextResponse.json({
      totalSolved: data.totalSolved,
      totalQuestions: data.totalQuestions,
      easySolved: data.easySolved,
      easyTotal: data.totalEasy,
      mediumSolved: data.mediumSolved,
      mediumTotal: data.totalMedium,
      hardSolved: data.hardSolved,
      hardTotal: data.totalHard,
      recentSubmissions: [] // This API doesn't provide recent submissions
    });
  } catch (error) {
    console.error('Error fetching LeetCode data:', error);
    // Return default data in case of error
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