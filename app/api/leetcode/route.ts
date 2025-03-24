import { NextResponse } from 'next/server'

export async function GET() {
  try {
    console.log('Starting LeetCode API call...');

    // Fetch LeetCode stats using public API
    const statsResponse = await fetch('https://leetcode-stats-api.herokuapp.com/arhaan17', {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Accept': 'application/json'
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

    // Fetch recent submissions using public API
    const submissionsResponse = await fetch('https://leetcode.com/api/submissions/arhaan17/?offset=0&limit=20', {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Accept': 'application/json',
        'Referer': 'https://leetcode.com/arhaan17'
      }
    });

    let recentSubmissions = [];
    if (submissionsResponse.ok) {
      const submissionsData = await submissionsResponse.json();
      console.log('Submissions data:', submissionsData);
      
      if (submissionsData.submissions_dump) {
        recentSubmissions = submissionsData.submissions_dump
          .filter((sub: any) => sub.status_display === 'Accepted')
          .slice(0, 5)
          .map((sub: any) => ({
            title: sub.title,
            difficulty: sub.difficulty || 'Medium',
            date: new Date(sub.timestamp * 1000).toLocaleDateString()
          }));
      }
    }

    // If no submissions were fetched, use placeholder data
    if (recentSubmissions.length === 0) {
      console.log('Using fallback submissions data');
      recentSubmissions = [
        {
          title: "Longest Common Subsequence",
          difficulty: "Medium",
          date: new Date().toLocaleDateString()
        },
        {
          title: "Binary Tree Level Order Traversal",
          difficulty: "Medium",
          date: new Date().toLocaleDateString()
        },
        {
          title: "Maximum Subarray",
          difficulty: "Medium",
          date: new Date().toLocaleDateString()
        },
        {
          title: "Valid Parentheses",
          difficulty: "Easy",
          date: new Date().toLocaleDateString()
        },
        {
          title: "Merge k Sorted Lists",
          difficulty: "Hard",
          date: new Date().toLocaleDateString()
        }
      ];
    }

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
      recentSubmissions
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