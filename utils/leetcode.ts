export interface LeetCodeStats {
  totalSolved: number;
  totalQuestions: number;
  easySolved: number;
  easyTotal: number;
  mediumSolved: number;
  mediumTotal: number;
  hardSolved: number;
  hardTotal: number;
  recentSubmissions: {
    title: string;
    difficulty: string;
    date: string;
    status: string;
    language: string;
  }[];
}

export async function fetchLeetCodeStats(username: string): Promise<LeetCodeStats> {
  try {
    const query = `
      query userProfile($username: String!) {
        allQuestionsCount {
          difficulty
          count
        }
        matchedUser(username: $username) {
          submitStats: submitStatsGlobal {
            acSubmissionNum {
              difficulty
              count
              submissions
            }
          }
        }
        recentSubmissionList(username: $username, limit: 5) {
          title
          titleSlug
          timestamp
          statusDisplay
          lang
          difficulty
        }
      }
    `;

    const response = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: { username }
      })
    });

    const data = await response.json();
    
    if (data.errors) {
      console.error('LeetCode API errors:', data.errors);
      return getDefaultLeetCodeStats();
    }

    const stats = data.data.matchedUser.submitStats.acSubmissionNum;
    const recentSubmissions = data.data.recentSubmissionList;
    const allQuestions = data.data.allQuestionsCount;

    // Calculate total solved problems
    const totalSolved = stats.reduce((acc: number, curr: any) => acc + curr.count, 0);
    const totalQuestions = allQuestions.reduce((acc: number, curr: any) => acc + curr.count, 0);

    // Get difficulty-specific stats
    const easyStats = stats.find((s: any) => s.difficulty === 'Easy') || { count: 0, submissions: 0 };
    const mediumStats = stats.find((s: any) => s.difficulty === 'Medium') || { count: 0, submissions: 0 };
    const hardStats = stats.find((s: any) => s.difficulty === 'Hard') || { count: 0, submissions: 0 };

    // Get total questions by difficulty
    const easyTotal = allQuestions.find((q: any) => q.difficulty === 'Easy')?.count || 150;
    const mediumTotal = allQuestions.find((q: any) => q.difficulty === 'Medium')?.count || 150;
    const hardTotal = allQuestions.find((q: any) => q.difficulty === 'Hard')?.count || 75;

    // Process recent submissions
    const processedSubmissions = recentSubmissions.map((submission: any) => ({
      title: submission.title,
      difficulty: submission.difficulty,
      date: new Date(submission.timestamp * 1000).toISOString().split('T')[0],
      status: submission.statusDisplay,
      language: submission.lang
    }));

    return {
      totalSolved,
      totalQuestions,
      easySolved: easyStats.count,
      easyTotal,
      mediumSolved: mediumStats.count,
      mediumTotal,
      hardSolved: hardStats.count,
      hardTotal,
      recentSubmissions: processedSubmissions
    };
  } catch (error) {
    console.error('Error fetching LeetCode stats:', error);
    return getDefaultLeetCodeStats();
  }
}

function getDefaultLeetCodeStats(): LeetCodeStats {
  return {
    totalSolved: 0,
    totalQuestions: 2500,
    easySolved: 0,
    easyTotal: 150,
    mediumSolved: 0,
    mediumTotal: 150,
    hardSolved: 0,
    hardTotal: 75,
    recentSubmissions: []
  };
} 