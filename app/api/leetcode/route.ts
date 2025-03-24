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

    // Fetch recent submissions using LeetCode's GraphQL API
    const submissionsQuery = {
      query: `
        query userProfile($username: String!) {
          matchedUser(username: $username) {
            submitStats {
              acSubmissionNum {
                difficulty
                count
                submissions
              }
            }
            recentSubmissionList {
              title
              timestamp
              statusDisplay
              lang
            }
          }
        }
      `,
      variables: {
        username: "arhaan17"
      }
    };

    const submissionsResponse = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0',
      },
      body: JSON.stringify(submissionsQuery)
    });

    let recentSubmissions = [];
    if (submissionsResponse.ok) {
      const submissionsData = await submissionsResponse.json();
      console.log('Submissions data:', submissionsData);
      
      if (submissionsData.data?.matchedUser?.recentSubmissionList) {
        recentSubmissions = submissionsData.data.matchedUser.recentSubmissionList
          .filter((sub: any) => sub.statusDisplay === 'Accepted')
          .slice(0, 5)
          .map((sub: any) => ({
            title: sub.title,
            difficulty: "Medium", // We'll get this from the problem API
            date: new Date(parseInt(sub.timestamp) * 1000).toLocaleDateString()
          }));
      }
    } else {
      console.log('Using fallback submissions data');
      recentSubmissions = [
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