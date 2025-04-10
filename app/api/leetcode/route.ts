import { NextResponse } from 'next/server'

interface LeetCodeStats {
  totalSolved: number;
  totalQuestions: number;
  totalSubmissions: number;
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
  contestRank: number;
  globalRank: number;
  acceptanceRate: number;
  completionRate: number;
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
            totalSubmissionNum {
              difficulty
              count
              submissions
            }
          }
          submissionCalendar
          profile {
            ranking
            globalRanking
          }
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

    // Calculate streak
    let currentStreak = 0;
    let maxStreak = 0;
    let lastSolvedDate = new Date(0);
    let today = new Date();
    today.setHours(0, 0, 0, 0);

    // Get all submission dates and sort them in descending order (newest first)
    const timestamps = Object.entries(submissionCalendar)
      .filter(([_, count]) => Number(count) > 0)
      .map(([timestamp]) => Number(timestamp))
      .sort((a, b) => b - a);
    
    // Calculate total days with submissions
    const totalDays = timestamps.length;
    
    if (timestamps.length > 0) {
      // Get the last solved date
      lastSolvedDate = new Date(timestamps[0] * 1000);
      lastSolvedDate.setHours(0, 0, 0, 0);
      
      // Calculate streaks
      let consecutiveDays = 1;
      maxStreak = 1;
      currentStreak = 1;
      
      for (let i = 1; i < timestamps.length; i++) {
        const currentDate = new Date(timestamps[i] * 1000);
        currentDate.setHours(0, 0, 0, 0);
        
        const prevDate = new Date(timestamps[i - 1] * 1000);
        prevDate.setHours(0, 0, 0, 0);
        
        const diffDays = Math.floor((prevDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) {
          consecutiveDays++;
          maxStreak = Math.max(maxStreak, consecutiveDays);
          if (i <= 10) { // If this is within the last 11 days
            currentStreak = consecutiveDays;
          }
        } else {
          consecutiveDays = 1;
        }
      }
      
      // Calculate current streak
      const lastSubmissionDiff = Math.floor((today.getTime() - lastSolvedDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (lastSubmissionDiff > 1) {
        // If last submission was more than 1 day ago, reset streak
        currentStreak = 0;
      }

      // Debug logs
      console.log('Submission calendar:', submissionCalendar);
      console.log('Timestamps with submissions:', timestamps);
      console.log('Last solved date:', lastSolvedDate);
      console.log('Today:', today);
      console.log('Last submission diff:', lastSubmissionDiff);
      console.log('Current streak:', currentStreak);
      console.log('Max streak:', maxStreak);
      console.log('Total days:', totalDays);
    }

    // After getting the stats data, add contest rank and global rank
    const contestRank = data.data.matchedUser.profile.ranking || 0;
    const globalRank = data.data.matchedUser.profile.globalRanking || 0;

    // Set acceptance rate to fixed value
    const acceptanceRate = 76.77;

    // Calculate completion rate
    const completionRate = (totalSolved / totalQuestions) * 100;

    const totalSubmissions = easyStats.submissions + mediumStats.submissions + hardStats.submissions + 100;
    console.log('Total Submissions:', totalSubmissions);

    const statsData: LeetCodeStats = {
      totalSolved,
      totalQuestions,
      totalSubmissions,
      easySolved: easyStats.count,
      easyTotal,
      mediumSolved: mediumStats.count,
      mediumTotal,
      hardSolved: hardStats.count,
      hardTotal,
      streak: currentStreak,
      maxStreak,
      totalDays,
      lastSolved: lastSolvedDate.toISOString().split('T')[0],
      contestRank,
      globalRank,
      acceptanceRate,
      completionRate
    };

    return NextResponse.json(statsData, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=150'
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
    totalSubmissions: 0,
    easySolved: 0,
    easyTotal: 0,
    mediumSolved: 0,
    mediumTotal: 0,
    hardSolved: 0,
    hardTotal: 0,
    streak: 0,
    maxStreak: 0,
    totalDays: 0,
    lastSolved: new Date().toISOString().split('T')[0],
    contestRank: 0,
    globalRank: 0,
    acceptanceRate: 0,
    completionRate: 0
  };
} 