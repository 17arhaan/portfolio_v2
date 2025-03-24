import { NextResponse } from 'next/server'

export async function GET() {
  try {
    console.log('Starting LeetCode API call...');

    // Fetch LeetCode stats using public API
    const statsResponse = await fetch('https://leetcode-stats-api.herokuapp.com/17arhaan', {
      headers: {
        'User-Agent': '17arhaan'
      }
    });

    if (!statsResponse.ok) {
      const errorText = await statsResponse.text();
      console.error('LeetCode API Error:', {
        status: statsResponse.status,
        statusText: statsResponse.statusText,
        error: errorText
      });
      throw new Error(`LeetCode API failed: ${errorText}`);
    }

    const statsData = await statsResponse.json();
    console.log('LeetCode stats fetched:', statsData);

    // Format the response
    const response = {
      totalSolved: statsData.totalSolved || 0,
      totalQuestions: statsData.totalQuestions || 2000,
      easySolved: statsData.easySolved || 0,
      easyTotal: statsData.totalEasy || 500,
      mediumSolved: statsData.mediumSolved || 0,
      mediumTotal: statsData.totalMedium || 1000,
      hardSolved: statsData.hardSolved || 0,
      hardTotal: statsData.totalHard || 500,
      acceptanceRate: statsData.acceptanceRate || 0,
      ranking: statsData.ranking || 0,
      recentSubmissions: [
        {
          title: "Two Sum",
          difficulty: "Easy",
          date: new Date().toLocaleDateString()
        },
        {
          title: "Add Two Numbers",
          difficulty: "Medium",
          date: new Date().toLocaleDateString()
        },
        {
          title: "Longest Substring Without Repeating Characters",
          difficulty: "Medium",
          date: new Date().toLocaleDateString()
        },
        {
          title: "Median of Two Sorted Arrays",
          difficulty: "Hard",
          date: new Date().toLocaleDateString()
        },
        {
          title: "Longest Palindromic Substring",
          difficulty: "Medium",
          date: new Date().toLocaleDateString()
        }
      ]
    };

    console.log('Final response prepared successfully');
    return NextResponse.json(response);
  } catch (error: any) {
    console.error('LeetCode API Error:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    });

    return NextResponse.json({
      error: 'Failed to fetch LeetCode stats',
      message: error.message,
      totalSolved: 0,
      totalQuestions: 2000,
      easySolved: 0,
      easyTotal: 500,
      mediumSolved: 0,
      mediumTotal: 1000,
      hardSolved: 0,
      hardTotal: 500,
      acceptanceRate: 0,
      ranking: 0,
      recentSubmissions: []
    }, { status: 500 });
  }
} 