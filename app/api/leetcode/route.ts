import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // First, get the CSRF token
    const csrfResponse = await fetch('https://leetcode.com/api/csrf/', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0',
        'Origin': 'https://leetcode.com',
        'Referer': 'https://leetcode.com/arhaan17/'
      }
    });

    if (!csrfResponse.ok) {
      console.error('Failed to get CSRF token:', csrfResponse.status);
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

    const { csrf } = await csrfResponse.json();

    // Now fetch the user profile data
    const response = await fetch('https://leetcode.com/api/user_progress/arhaan17/', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0',
        'Origin': 'https://leetcode.com',
        'Referer': 'https://leetcode.com/arhaan17/',
        'X-CSRFToken': csrf
      }
    });

    if (!response.ok) {
      console.error('LeetCode API response not ok:', response.status, response.statusText);
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

    const data = await response.json();
    console.log('LeetCode API response:', data); // Debug log

    // Process the data
    const stats = {
      totalSolved: data.total_solved || 0,
      totalQuestions: data.total_questions || 2500,
      easySolved: data.easy_solved || 0,
      easyTotal: data.easy_total || 150,
      mediumSolved: data.medium_solved || 0,
      mediumTotal: data.medium_total || 150,
      hardSolved: data.hard_solved || 0,
      hardTotal: data.hard_total || 75,
      recentSubmissions: data.recent_submissions?.map((sub: any) => ({
        title: sub.title || 'Unknown Problem',
        difficulty: sub.difficulty || 'Unknown',
        date: sub.date ? new Date(sub.date).toLocaleDateString() : 'Unknown Date'
      })) || []
    };

    return NextResponse.json(stats);
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