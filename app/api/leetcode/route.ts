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
      }),
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!response.ok) {
      console.error('LeetCode API request failed:', response.statusText);
      return NextResponse.json(getDefaultLeetCodeStats(), { status: response.status });
    }

    const data = await response.json();
    
    if (data.errors) {
      console.error('LeetCode API errors:', data.errors);
      return NextResponse.json(getDefaultLeetCodeStats(), { status: 500 });
    }

    const stats = data.data.matchedUser.submitStats.acSubmissionNum;
    const submissionCalendar = JSON.parse(data.data.matchedUser.submissionCalendar);
    const allQuestions = data.data.allQuestionsCount;

    // Get difficulty-specific stats
    const easyStats = stats.find((s: any) => s.difficulty === 'Easy') || { count: 0, submissions: 0 };
    const mediumStats = stats.find((s: any) => s.difficulty === 'Medium') || { count: 0, submissions: 0 };
    const hardStats = stats.find((s: any) => s.difficulty === 'Hard') || { count: 0, submissions: 0 };

    // Calculate total solved problems
    const totalSolved = easyStats.count + mediumStats.count + hardStats.count;

    // Get total questions by difficulty
    const easyTotal = allQuestions.find((q: any) => q.difficulty === 'Easy')?.count || 0;
    const mediumTotal = allQuestions.find((q: any) => q.difficulty === 'Medium')?.count || 0;
    const hardTotal = allQuestions.find((q: any) => q.difficulty === 'Hard')?.count || 0;
    const totalQuestions = easyTotal + mediumTotal + hardTotal;

    // Calculate streak, max streak, and total days
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    let streak = 0;
    let maxStreak = 0;
    let currentStreak = 0;
    let totalDays = 0;
    let lastSolvedDate = new Date(0);
    
    // Get all submission dates
    const timestamps = Object.keys(submissionCalendar)
      .map(Number)
      .sort((a, b) => b - a); // Sort in descending order
    
    if (timestamps.length > 0) {
      lastSolvedDate = new Date(timestamps[0] * 1000);
      
      // Calculate streaks
      let prevDate = new Date(timestamps[0] * 1000);
      prevDate.setHours(0, 0, 0, 0);
      
      for (const timestamp of timestamps) {
        const currentDate = new Date(timestamp * 1000);
        currentDate.setHours(0, 0, 0, 0);
        
        const diffDays = Math.floor((prevDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));
        
        if (diffDays === 0) {
          // Same day, skip
          continue;
        } else if (diffDays === 1) {
          // Consecutive day
          currentStreak++;
          maxStreak = Math.max(maxStreak, currentStreak);
        } else {
          // Gap in submissions
          currentStreak = 0;
        }
        
        prevDate = currentDate;
        totalDays++;
      }
      
      // Check if last submission was today or yesterday
      const lastSubmissionDiff = Math.floor((today.getTime() - lastSolvedDate.getTime()) / (1000 * 60 * 60 * 24));
      if (lastSubmissionDiff <= 1) {
        streak = currentStreak + 1;
      }
    }

    const statsData: LeetCodeStats = {
      totalSolved,
      totalQuestions,
      easySolved: easyStats.count,
      easyTotal,
      mediumSolved: mediumStats.count,
      mediumTotal,
      hardSolved: hardStats.count,
      hardTotal,
      streak,
      maxStreak: Math.max(maxStreak, streak),
      totalDays,
      lastSolved: lastSolvedDate.toISOString().split('T')[0]
    };

    return NextResponse.json(statsData, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=1800'
      }
    });
  } catch (error) {
    console.error('Error fetching LeetCode stats:', error);
    return NextResponse.json(getDefaultLeetCodeStats(), { status: 500 });
  }
}

function getDefaultLeetCodeStats(): LeetCodeStats {
  return {
    totalSolved: 0,
    totalQuestions: 0,
    easySolved: 0,
    easyTotal: 0,
    mediumSolved: 0,
    mediumTotal: 0,
    hardSolved: 0,
    hardTotal: 0,
    streak: 0,
    maxStreak: 0,
    totalDays: 0,
    lastSolved: new Date().toISOString().split('T')[0]
  };
} 