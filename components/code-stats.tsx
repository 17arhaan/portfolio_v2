"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { Github, Code, CheckCircle2 } from "lucide-react"

// Types for GitHub data
interface GitHubStats {
  totalRepos: number
  totalStars: number
  totalForks: number
  totalContributions: number
  languages: { name: string; percentage: number }[]
  recentActivity: { date: string; commits: number }[]
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
  recentSubmissions: { title: string; difficulty: string; date: string }[]
}

export default function CodeStats() {
  const [githubStats, setGithubStats] = useState<GitHubStats | null>(null)
  const [leetcodeStats, setLeetcodeStats] = useState<LeetCodeStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API fetch with timeout
    const timer = setTimeout(() => {
      // Mock GitHub data
      setGithubStats({
        totalRepos: 32,
        totalStars: 128,
        totalForks: 47,
        totalContributions: 1243,
        languages: [
          { name: "JavaScript", percentage: 40 },
          { name: "TypeScript", percentage: 25 },
          { name: "HTML", percentage: 15 },
          { name: "CSS", percentage: 12 },
          { name: "Python", percentage: 8 },
        ],
        recentActivity: [
          { date: "2023-03-01", commits: 5 },
          { date: "2023-03-02", commits: 3 },
          { date: "2023-03-03", commits: 7 },
          { date: "2023-03-04", commits: 2 },
          { date: "2023-03-05", commits: 4 },
          { date: "2023-03-06", commits: 6 },
          { date: "2023-03-07", commits: 3 },
        ],
      })

      // Mock LeetCode data
      setLeetcodeStats({
        totalSolved: 187,
        totalQuestions: 2500,
        easySolved: 95,
        easyTotal: 150,
        mediumSolved: 72,
        mediumTotal: 150,
        hardSolved: 20,
        hardTotal: 75,
        recentSubmissions: [
          { title: "Two Sum", difficulty: "Easy", date: "2023-03-07" },
          { title: "Add Two Numbers", difficulty: "Medium", date: "2023-03-05" },
          { title: "LRU Cache", difficulty: "Medium", date: "2023-03-03" },
          { title: "Merge k Sorted Lists", difficulty: "Hard", date: "2023-03-01" },
          { title: "Valid Parentheses", difficulty: "Easy", date: "2023-02-28" },
        ],
      })

      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

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
                                  <span className="text-sm font-medium">{language.name}</span>
                                  <span className="text-sm text-muted-foreground">{language.percentage}%</span>
                                </div>
                                <Progress value={language.percentage} className="h-2" />
                              </div>
                            ))}
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
                          <CardTitle>Recent Submissions</CardTitle>
                          <CardDescription>My latest solved problems on LeetCode</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {leetcodeStats.recentSubmissions.map((submission, index) => (
                              <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                                <div className="flex-1">
                                  <p className="font-medium">{submission.title}</p>
                                  <p className="text-sm text-muted-foreground">{submission.date}</p>
                                </div>
                                <div
                                  className={`text-sm px-2 py-1 rounded-full ${
                                    submission.difficulty === "Easy"
                                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                      : submission.difficulty === "Medium"
                                        ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                                        : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                                  }`}
                                >
                                  {submission.difficulty}
                                </div>
                              </div>
                            ))}
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

