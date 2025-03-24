"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { Github, Code, CheckCircle2, GitCommit, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

// Types for GitHub data
interface GitHubStats {
  totalRepos: number
  totalStars: number
  totalForks: number
  totalContributions: number
  languages: { name: string; percentage: number; color: string }[]
  recentActivity: {
    date: string
    repo: string
    repoUrl: string
    commits: {
      message: string
      url: string
      changes: {
        additions: number
        deletions: number
      }
    }[]
  }[]
}

// Types for LeetCode data
interface LeetCodeStats {
  totalSolved: number
  totalQuestions: number
  easySolved: number
  easyTotal: number
  mediumSolved: number
  mediumTotal: number
  hardSolved: number
  hardTotal: number
  streak: number
  maxStreak: number
  totalDays: number
  lastSolved: string
}

export default function CodeStats() {
  const [githubStats, setGithubStats] = useState<GitHubStats | null>(null)
  const [leetcodeStats, setLeetcodeStats] = useState<LeetCodeStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [showAllActivities, setShowAllActivities] = useState(false)

  useEffect(() => {
    const fetchGitHubStats = async () => {
      try {
        const response = await fetch('/api/github');
        if (!response.ok) {
          throw new Error('Failed to fetch GitHub stats');
        }
        const data = await response.json();
        setGithubStats(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching GitHub stats:', error);
        setLoading(false);
      }
    };

    const fetchLeetCodeStats = async () => {
      try {
        const response = await fetch('/api/leetcode');
        const data = await response.json();
        
        // Check if we got an error response
        if (data.error) {
          console.error('LeetCode API error:', data.error);
          return;
        }

        setLeetcodeStats(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching LeetCode stats:', error);
        setLoading(false);
      }
    };

    fetchGitHubStats();
    fetchLeetCodeStats();
  }, []);

  // Function to render loading skeletons
  const renderSkeletons = () => (
    <div className="space-y-4">
      <div className="flex justify-between">
        <Skeleton className="h-10 w-[250px]" />
        <Skeleton className="h-10 w-[100px]" />
      </div>
      <Skeleton className="h-[300px] w-full" />
    </div>
  )

  return (
    <section id="code-stats" className="py-20 bg-muted/30">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Coding Activity</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Track my coding progress and contributions on GitHub and LeetCode.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-4xl mx-auto"
        >
          <Tabs defaultValue="github" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="github" className="gap-2">
                <Github className="h-4 w-4" />
                GitHub Stats
              </TabsTrigger>
              <TabsTrigger value="leetcode" className="gap-2">
                <Code className="h-4 w-4" />
                LeetCode Progress
              </TabsTrigger>
            </TabsList>

            <TabsContent value="github" className="space-y-4">
              {loading
                ? renderSkeletons()
                : githubStats && (
                    <>
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-medium">
                          <a
                            href="https://github.com/17arhaan"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 hover:text-primary transition-colors"
                          >
                            <Github className="h-5 w-5" />
                            17arhaan
                          </a>
                        </h3>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <Card>
                          <CardContent className="p-6 flex flex-col items-center justify-center">
                            <p className="text-sm text-muted-foreground mb-1">Repositories</p>
                            <p className="text-3xl font-bold">{githubStats.totalRepos}</p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="p-6 flex flex-col items-center justify-center">
                            <p className="text-sm text-muted-foreground mb-1">Stars</p>
                            <p className="text-3xl font-bold">{githubStats.totalStars}</p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="p-6 flex flex-col items-center justify-center">
                            <p className="text-sm text-muted-foreground mb-1">Forks</p>
                            <p className="text-3xl font-bold">{githubStats.totalForks}</p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="p-6 flex flex-col items-center justify-center">
                            <p className="text-sm text-muted-foreground mb-1">Contributions</p>
                            <p className="text-3xl font-bold">{githubStats.totalContributions}</p>
                          </CardContent>
                        </Card>
                      </div>

                      <Card>
                        <CardHeader>
                          <CardTitle>Languages Used</CardTitle>
                          <CardDescription>Distribution of programming languages in my repositories</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {githubStats.languages.map((language) => (
                              <div key={language.name}>
                                <div className="flex justify-between mb-1">
                                  <div className="flex items-center gap-2">
                                    <div 
                                      className="w-3 h-3 rounded-full" 
                                      style={{ backgroundColor: language.color }}
                                    />
                                    <span className="text-sm font-medium">{language.name}</span>
                                  </div>
                                  <span className="text-sm text-muted-foreground">{language.percentage}%</span>
                                </div>
                                <Progress value={language.percentage} className="h-2" />
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>Recent Activity</CardTitle>
                          <CardDescription>My latest commits across repositories</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {githubStats.recentActivity
                              .slice(0, showAllActivities ? undefined : 2)
                              .map((activity, index) => (
                                <div key={index} className="space-y-2">
                                  <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/50">
                                    <GitCommit className="h-5 w-5 text-primary flex-shrink-0" />
                                    <div className="flex-1">
                                      <a 
                                        href={activity.repoUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="font-medium hover:text-primary transition-colors"
                                      >
                                        {activity.repo.split('/')[1]}
                                      </a>
                                      <p className="text-sm text-muted-foreground">
                                        {new Date(activity.date).toLocaleDateString('en-US', {
                                          year: 'numeric',
                                          month: 'short',
                                          day: 'numeric'
                                        })}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="ml-7 space-y-2">
                                    {activity.commits.map((commit, commitIndex) => (
                                      <div key={commitIndex} className="p-2 rounded-lg bg-muted/30">
                                        <a 
                                          href={commit.url}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="text-sm hover:text-primary transition-colors block"
                                        >
                                          {commit.message}
                                        </a>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                            ))}
                            {githubStats.recentActivity.length > 2 && (
                              <Button
                                variant="ghost"
                                className="w-full"
                                onClick={() => setShowAllActivities(!showAllActivities)}
                              >
                                <ChevronDown className={`h-4 w-4 mr-2 transition-transform ${showAllActivities ? 'rotate-180' : ''}`} />
                                {showAllActivities ? 'Show Less' : `Show ${githubStats.recentActivity.length - 2} More`}
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </>
                  )}
            </TabsContent>

            <TabsContent value="leetcode" className="space-y-4">
              {loading
                ? renderSkeletons()
                : leetcodeStats && (
                    <>
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-medium">
                          <a
                            href="https://leetcode.com/arhaan17/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 hover:text-primary transition-colors"
                          >
                            <Code className="h-5 w-5" />
                            arhaan17
                          </a>
                        </h3>
                      </div>
                      <Card>
                        <CardHeader>
                          <CardTitle>LeetCode Progress</CardTitle>
                          <CardDescription>
                            Solved {leetcodeStats.totalSolved} out of {leetcodeStats.totalQuestions} problems
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="mb-6">
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium">Overall Progress</span>
                              <span className="text-sm text-muted-foreground">
                                {Math.round((leetcodeStats.totalSolved / leetcodeStats.totalQuestions) * 100)}%
                              </span>
                            </div>
                            <Progress
                              value={(leetcodeStats.totalSolved / leetcodeStats.totalQuestions) * 100}
                              className="h-2"
                            />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium text-green-500">Easy</span>
                                <span className="text-sm text-muted-foreground">
                                  {leetcodeStats.easySolved}/{leetcodeStats.easyTotal}
                                </span>
                              </div>
                              <Progress
                                value={(leetcodeStats.easySolved / leetcodeStats.easyTotal) * 100}
                                className="h-2 bg-muted"
                              />
                            </div>
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium text-yellow-500">Medium</span>
                                <span className="text-sm text-muted-foreground">
                                  {leetcodeStats.mediumSolved}/{leetcodeStats.mediumTotal}
                                </span>
                              </div>
                              <Progress
                                value={(leetcodeStats.mediumSolved / leetcodeStats.mediumTotal) * 100}
                                className="h-2 bg-muted"
                              />
                            </div>
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium text-red-500">Hard</span>
                                <span className="text-sm text-muted-foreground">
                                  {leetcodeStats.hardSolved}/{leetcodeStats.hardTotal}
                                </span>
                              </div>
                              <Progress
                                value={(leetcodeStats.hardSolved / leetcodeStats.hardTotal) * 100}
                                className="h-2 bg-muted"
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>Problem Solving Streak</CardTitle>
                          <CardDescription>Your consistency in solving LeetCode problems</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="text-center p-4 rounded-lg bg-muted/50">
                              <p className="text-sm text-muted-foreground mb-1">Current Streak</p>
                              <p className="text-3xl font-bold text-primary">{leetcodeStats.streak} days</p>
                            </div>
                            <div className="text-center p-4 rounded-lg bg-muted/50">
                              <p className="text-sm text-muted-foreground mb-1">Max Streak</p>
                              <p className="text-3xl font-bold text-primary">{leetcodeStats.maxStreak} days</p>
                            </div>
                            <div className="text-center p-4 rounded-lg bg-muted/50">
                              <p className="text-sm text-muted-foreground mb-1">Total Days</p>
                              <p className="text-3xl font-bold text-primary">{leetcodeStats.totalDays} days</p>
                            </div>
                            <div className="text-center p-4 rounded-lg bg-muted/50">
                              <p className="text-sm text-muted-foreground mb-1">Last Solved</p>
                              <p className="text-3xl font-bold text-primary">
                                {new Date(leetcodeStats.lastSolved).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric'
                                })}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </>
                  )}
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </section>
  )
}

