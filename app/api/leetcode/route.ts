import { NextResponse } from 'next/server'

interface LeetCodeStats {
  totalSolved: number;
  totalQuestions: number;
  easySolved: number;
  easyTotal: number;
  mediumSolved: number;
  mediumTotal: number;
  hardSolved: number;
  hardTotal: number;
  streak: number;
  maxStreak: number;
  totalDays: number;
  lastSolved: string;
}

export async function GET() {
  try {
    console.log('Starting LeetCode API call...');
    const username = 'arhaan17';

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
          submissionCalendar
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
    const submissionCalendar = JSON.parse(data.data.matchedUser.submissionCalendar);
    const allQuestions = data.data.allQuestionsCount;

    // Get difficulty-specific stats
    const easyStats = stats.find((s: any) => s.difficulty === 'Easy') || { count: 0, submissions: 0 };
    const mediumStats = stats.find((s: any) => s.difficulty === 'Medium') || { count: 0, submissions: 0 };
    const hardStats = stats.find((s: any) => s.difficulty === 'Hard') || { count: 0, submissions: 0 };

    // Calculate total solved problems (sum of all difficulties)
    const totalSolved = easyStats.count + mediumStats.count + hardStats.count;

    // Get total questions by difficulty from the API
    const easyTotal = allQuestions.find((q: any) => q.difficulty === 'Easy')?.count || 0;
    const mediumTotal = allQuestions.find((q: any) => q.difficulty === 'Medium')?.count || 0;
    const hardTotal = allQuestions.find((q: any) => q.difficulty === 'Hard')?.count || 0;

    // Calculate total questions (sum of all difficulties)
    const totalQuestions = easyTotal + mediumTotal + hardTotal;

    // Calculate streak, max streak, and total days
    const today = new Date();
    const dates = Object.keys(submissionCalendar).map(timestamp => parseInt(timestamp));
    const lastSolvedDate = new Date(Math.max(...dates) * 1000);
    
    let streak = 0;
    let maxStreak = 0;
    let currentStreak = 0;
    let totalDays = 0;
    let currentDate = new Date();
    
    // Calculate current streak
    while (submissionCalendar[Math.floor(currentDate.getTime() / 1000)]) {
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    }
    
    // Calculate max streak and total days
    currentDate = new Date();
    const startDate = new Date('2020-01-01'); // Start from a reasonable date
    while (currentDate >= startDate) {
      const timestamp = Math.floor(currentDate.getTime() / 1000);
      if (submissionCalendar[timestamp] && submissionCalendar[timestamp] > 0) {
        currentStreak++;
        maxStreak = Math.max(maxStreak, currentStreak);
        totalDays++;
      } else {
        currentStreak = 0;
      }
      currentDate.setDate(currentDate.getDate() - 1);
    }

    // Alternative calculation for total days using the submission calendar directly
    totalDays = Object.values(submissionCalendar as Record<string, number>).reduce((acc: number, count: number) => {
      return acc + (count > 0 ? 1 : 0);
    }, 0);

    // Format the response
    const responseData = {
      totalSolved,
      totalQuestions,
      easySolved: easyStats.count,
      easyTotal,
      mediumSolved: mediumStats.count,
      mediumTotal,
      hardSolved: hardStats.count,
      hardTotal,
      streak,
      maxStreak,
      totalDays,
      lastSolved: lastSolvedDate.toISOString()
    };

    console.log('Final response prepared successfully');
    return NextResponse.json(responseData);
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
      totalQuestions: 2500,
      easySolved: 0,
      easyTotal: 150,
      mediumSolved: 0,
      mediumTotal: 150,
      hardSolved: 0,
      hardTotal: 75,
      streak: 0,
      maxStreak: 0,
      totalDays: 0,
      lastSolved: new Date().toISOString()
    }, { status: 500 });
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
    streak: 0,
    maxStreak: 0,
    totalDays: 0,
    lastSolved: new Date().toISOString()
  };
} 