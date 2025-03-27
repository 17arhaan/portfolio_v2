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
    today.setHours(0, 0, 0, 0);
    
    let streak = 0;
    let maxStreak = 0;
    let totalDays = 0;
    let lastSolvedDate = new Date();
    
    // Find the last solved date from submission calendar
    const timestamps = Object.keys(submissionCalendar).map(Number);
    if (timestamps.length > 0) {
      const lastTimestamp = Math.max(...timestamps);
      lastSolvedDate = new Date(lastTimestamp * 1000);
    }
    
    // Calculate current streak
    let currentDate = new Date(lastSolvedDate);
    currentDate.setHours(0, 0, 0, 0);
    
    // Check if the last submission was today or yesterday
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    // If the last submission was more than 2 days ago, streak is 0
    if (currentDate < yesterday) {
      streak = 0;
    } else {
      // Calculate current streak
      streak = 1;
      let prevDate = new Date(currentDate);
      prevDate.setDate(prevDate.getDate() - 1);
      
      while (true) {
        const prevTimestamp = Math.floor(prevDate.getTime() / 1000);
        const hasPrevSubmission = submissionCalendar[prevTimestamp] && submissionCalendar[prevTimestamp] > 0;
        
        if (hasPrevSubmission) {
          streak++;
          prevDate.setDate(prevDate.getDate() - 1);
        } else {
          // Check if we missed a day
          const nextTimestamp = Math.floor(prevDate.getTime() / 1000);
          const hasNextSubmission = submissionCalendar[nextTimestamp] && submissionCalendar[nextTimestamp] > 0;
          
          if (hasNextSubmission) {
            // If we have a submission the next day, continue the streak
            streak++;
            prevDate.setDate(prevDate.getDate() - 1);
          } else {
            break;
          }
        }
      }
    }
    
    // Calculate max streak and total days
    // Sort timestamps in descending order
    const sortedTimestamps = timestamps.sort((a, b) => b - a);
    let currentStreak = 1;
    
    // Calculate max streak by checking consecutive days
    for (let i = 0; i < sortedTimestamps.length - 1; i++) {
      const currentTimestamp = sortedTimestamps[i];
      const nextTimestamp = sortedTimestamps[i + 1];
      
      const currentDate = new Date(currentTimestamp * 1000);
      const nextDate = new Date(nextTimestamp * 1000);
      currentDate.setHours(0, 0, 0, 0);
      nextDate.setHours(0, 0, 0, 0);
      
      // Check if the dates are consecutive
      const diffTime = Math.abs(currentDate.getTime() - nextDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        currentStreak++;
        maxStreak = Math.max(maxStreak, currentStreak);
      } else {
        currentStreak = 1;
      }
    }
    
    // Calculate total days with submissions
    totalDays = timestamps.length;

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