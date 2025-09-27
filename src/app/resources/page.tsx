"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { Calendar, Clock, Download, Heart, MessageCircle, Play, BookOpen, Dumbbell, Brain, Cross, Share2, ThumbsUp, Filter, Search, Users, Star, CheckCircle, ArrowRight, Mail, Phone } from 'lucide-react'

// Mock data for daily recovery content
const dailyContent = [
  {
    id: 1,
    type: 'personal-story',
    title: 'Day 1,825: Finding Strength in Vulnerability',
    description: 'Sharing my experience with accepting help and why it took me 5 years to ask for support.',
    author: 'Recovery Coach',
    date: '2024-01-15',
    duration: '3 min read',
    category: 'Personal Testimony',
    tags: ['vulnerability', 'support', 'recovery-journey'],
    likes: 47,
    comments: 12,
    content: 'Today marks 5 years since I finally asked for help. For so long, I thought asking for support was a sign of weakness...',
    videoUrl: null,
    imageUrl: '/api/placeholder/400/300'
  },
  {
    id: 2,
    type: 'workout',
    title: 'Recovery Strength Training: 20-Minute Morning Routine',
    description: 'A gentle but effective strength training routine designed specifically for people in recovery.',
    author: 'Recovery Coach',
    date: '2024-01-14',
    duration: '20 min',
    category: 'Fitness',
    tags: ['strength-training', 'morning-routine', 'recovery-fitness'],
    likes: 89,
    comments: 23,
    content: 'This 20-minute routine focuses on building both physical and mental strength...',
    videoUrl: '/mock-video/workout-1',
    equipment: ['Dumbbells (optional)', 'Yoga mat', 'Water bottle']
  },
  {
    id: 3,
    type: 'educational',
    title: 'Understanding OCD Triggers: A Therapist\'s Guide',
    description: 'Professional insights into recognizing and managing OCD triggers in daily life.',
    author: 'Recovery Coach',
    date: '2024-01-13',
    duration: '5 min read',
    category: 'Education',
    tags: ['OCD', 'triggers', 'mental-health', 'coping-strategies'],
    likes: 156,
    comments: 34,
    content: 'After 37 years of living with OCD, I\'ve learned to identify the subtle signs that precede compulsive behaviors...'
  },
  {
    id: 4,
    type: 'meditation',
    title: 'Christ-Centered Meditation: Finding Peace in Scripture',
    description: 'A guided meditation focusing on Philippians 4:6-7 for anxiety relief.',
    author: 'Recovery Coach',
    date: '2024-01-12',
    duration: '15 min',
    category: 'Spiritual Guidance',
    tags: ['meditation', 'scripture', 'anxiety-relief', 'peace'],
    likes: 203,
    comments: 45,
    content: 'Let\'s center our hearts and minds on God\'s promise of peace...',
    audioUrl: '/mock-audio/meditation-1'
  },
  {
    id: 5,
    type: 'affirmation',
    title: 'Daily Affirmations for Recovery Resilience',
    description: 'Powerful affirmations to start your day with strength and purpose.',
    author: 'Recovery Coach',
    date: '2024-01-11',
    duration: '2 min',
    category: 'Affirmations',
    tags: ['affirmations', 'positive-thinking', 'morning-routine'],
    likes: 78,
    comments: 19,
    content: 'I am stronger than my struggles. I am worthy of recovery. I choose healing every day...'
  },
  {
    id: 6,
    type: 'educational',
    title: 'Family Recovery: How to Support Without Enabling',
    description: 'Practical guidance for family members navigating the recovery journey together.',
    author: 'Recovery Coach',
    date: '2024-01-10',
    duration: '6 min read',
    category: 'Family Support',
    tags: ['family-recovery', 'boundaries', 'support-vs-enabling'],
    likes: 134,
    comments: 28,
    content: 'Supporting a loved one in recovery requires a delicate balance...'
  }
]

const fitnessPlans = [
  {
    id: 1,
    title: 'Beginner Recovery Fitness',
    description: 'Gentle introduction to fitness for early recovery',
    duration: '4 weeks',
    level: 'Beginner',
    equipment: 'Bodyweight only',
    sessions: 12,
    features: ['Daily 15-20 min workouts', 'Focus on mental wellness', 'Stress reduction techniques', 'Progress tracking']
  },
  {
    id: 2,
    title: 'Strength & Stability',
    description: 'Building physical and emotional resilience through strength training',
    duration: '6 weeks',
    level: 'Intermediate',
    equipment: 'Basic weights',
    sessions: 18,
    features: ['3x per week strength sessions', 'Balance and coordination', 'Confidence building', 'Goal-oriented progress']
  },
  {
    id: 3,
    title: 'Holistic Wellness Program',
    description: 'Comprehensive mind-body-spirit fitness approach',
    duration: '8 weeks',
    level: 'All levels',
    equipment: 'Minimal equipment',
    sessions: 24,
    features: ['Yoga integration', 'Meditation & movement', 'Nutrition guidance', 'Community support']
  }
]

const categories = ['All', 'Personal Testimony', 'Fitness', 'Education', 'Spiritual Guidance', 'Affirmations', 'Family Support']

export default function ResourcesPage() {
  const [activeTab, setActiveTab] = useState('daily-content')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredContent, setFilteredContent] = useState(dailyContent)
  const [subscriberCount, setSubscriberCount] = useState(1247)
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  useEffect(() => {
    const filtered = dailyContent.filter(content => {
      const matchesCategory = selectedCategory === 'All' || content.category === selectedCategory
      const matchesSearch = content.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           content.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           content.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      return matchesCategory && matchesSearch
    })
    setFilteredContent(filtered)
  }, [selectedCategory, searchTerm])

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubscribed(true)
    setSubscriberCount(prev => prev + 1)
    setTimeout(() => setIsSubscribed(false), 5000)
  }

  const getContentIcon = (type: string) => {
    switch (type) {
      case 'personal-story':
        return <Heart className="h-5 w-5 text-primary" />
      case 'workout':
        return <Dumbbell className="h-5 w-5 text-primary" />
      case 'educational':
        return <BookOpen className="h-5 w-5 text-primary" />
      case 'meditation':
        return <Cross className="h-5 w-5 text-primary" />
      case 'affirmation':
        return <Brain className="h-5 w-5 text-primary" />
      default:
        return <BookOpen className="h-5 w-5 text-primary" />
    }
  }

  const getDaysSincePosting = (dateString: string) => {
    const postDate = new Date(dateString)
    const today = new Date()
    const diffTime = Math.abs(today.getTime() - postDate.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays === 1 ? '1 day ago' : `${diffDays} days ago`
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-4">
            <Image
              src="/generated/hands-reaching-logo.png"
              alt="Holistic Recovery"
              width={40}
              height={40}
              className="rounded"
            />
            <div>
              <h1 className="font-bold text-xl text-primary">Holistic Recovery</h1>
              <p className="text-xs text-muted-foreground">Daily Resources & Community</p>
            </div>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/services" className="text-sm font-medium hover:text-primary transition-colors">
              Book Session
            </Link>
          </nav>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="hidden sm:flex">
              <Users className="h-3 w-3 mr-1" />
              {subscriberCount} Members
            </Badge>
          </div>
        </div>
      </header>

      <div className="container py-8 px-4">
        {/* Page Header */}
        <div className="text-center space-y-6 mb-12">
          <Badge variant="outline" className="px-4 py-2">
            Daily Recovery Support & Resources
          </Badge>
          <h1 className="text-4xl font-bold text-primary">Daily Recovery Resources</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Access daily inspiration, educational content, fitness programs, and spiritual guidance
            to support your recovery journey. Join our growing community of {subscriberCount} members.
          </p>
        </div>

        {/* Resource Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="daily-content" className="text-sm">
              <BookOpen className="mr-2 h-4 w-4" />
              Daily Content
            </TabsTrigger>
            <TabsTrigger value="fitness-plans" className="text-sm">
              <Dumbbell className="mr-2 h-4 w-4" />
              Fitness Plans
            </TabsTrigger>
            <TabsTrigger value="meditation" className="text-sm">
              <Cross className="mr-2 h-4 w-4" />
              Meditation
            </TabsTrigger>
            <TabsTrigger value="community" className="text-sm">
              <Users className="mr-2 h-4 w-4" />
              Community
            </TabsTrigger>
          </TabsList>

          {/* Daily Content Tab */}
          <TabsContent value="daily-content" className="space-y-8">
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search content, topics, or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className="text-xs"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredContent.map((content) => (
                <Card key={content.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        {getContentIcon(content.type)}
                        <Badge variant="secondary" className="text-xs">
                          {content.category}
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {getDaysSincePosting(content.date)}
                      </div>
                    </div>
                    <CardTitle className="text-lg leading-tight line-clamp-2">
                      {content.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                      {content.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      {content.videoUrl && (
                        <div className="relative bg-secondary/30 rounded-lg p-4 text-center">
                          <Play className="h-8 w-8 mx-auto mb-2 text-primary" />
                          <p className="text-sm font-medium">Video Content</p>
                        </div>
                      )}
                      {content.audioUrl && (
                        <div className="relative bg-secondary/30 rounded-lg p-4 text-center">
                          <div className="h-8 w-8 mx-auto mb-2 bg-primary rounded-full flex items-center justify-center">
                            <Play className="h-4 w-4 text-primary-foreground" />
                          </div>
                          <p className="text-sm font-medium">Audio Meditation</p>
                        </div>
                      )}
                      {content.equipment && (
                        <div className="text-xs text-muted-foreground">
                          <strong>Equipment needed:</strong> {content.equipment.join(', ')}
                        </div>
                      )}
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {content.duration}
                        </div>
                        <div className="flex items-center gap-1">
                          <ThumbsUp className="h-3 w-3" />
                          {content.likes}
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="h-3 w-3" />
                          {content.comments}
                        </div>
                      </div>
                      <div className="flex gap-1 flex-wrap">
                        {content.tags.slice(0, 3).map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <Button className="w-full mt-4" size="sm">
                        <Play className="mr-2 h-4 w-4" />
                        View Content
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredContent.length === 0 && (
              <div className="text-center py-12">
                <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-muted-foreground">No content found</h3>
                <p className="text-muted-foreground">Try adjusting your search terms or category filter.</p>
              </div>
            )}
          </TabsContent>

          {/* Fitness Plans Tab */}
          <TabsContent value="fitness-plans" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-primary mb-4">Recovery-Focused Fitness Programs</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Specially designed fitness programs that support your recovery journey by building physical strength,
                mental resilience, and healthy habits.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {fitnessPlans.map((plan) => (
                <Card key={plan.id} className="p-6 hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge className="bg-primary/10 text-primary">
                        {plan.level}
                      </Badge>
                      <div className="text-right text-sm text-muted-foreground">
                        <div>{plan.duration}</div>
                        <div>{plan.sessions} sessions</div>
                      </div>
                    </div>
                    <CardTitle className="text-xl">{plan.title}</CardTitle>
                    <CardDescription className="text-base">
                      {plan.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Dumbbell className="h-4 w-4 text-primary" />
                        <span className="font-medium">Equipment:</span>
                        <span className="text-muted-foreground">{plan.equipment}</span>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-medium text-sm">Program Features:</h4>
                        <ul className="space-y-1">
                          {plan.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm">
                              <CheckCircle className="h-3 w-3 text-primary mt-0.5 flex-shrink-0" />
                              <span className="text-muted-foreground">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <Button className="w-full mt-4">
                        <Download className="mr-2 h-4 w-4" />
                        Access Program
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Meditation Tab */}
          <TabsContent value="meditation" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-primary mb-4">Christ-Centered Meditation & Prayer</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Guided meditations, scripture-based reflections, and prayer practices to center your heart
                and mind on God's healing presence in your recovery journey.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Cross className="h-5 w-5 text-primary" />
                    Morning Devotional Meditations
                  </CardTitle>
                  <CardDescription>
                    Start your day centered on God's word with 10-15 minute guided devotions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-4 bg-secondary/20 rounded-lg">
                      <h4 className="font-medium mb-2">This Week: Finding Peace in Philippians 4</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        "Do not be anxious about anything, but in every situation, by prayer and petition..."
                      </p>
                      <Button size="sm" className="w-full">
                        <Play className="mr-2 h-4 w-4" />
                        Listen Now (12 min)
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <h5 className="text-sm font-medium">Previous Meditations:</h5>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Strength in Isaiah 40:31 (15 min)</li>
                        <li>• Hope in Romans 8:28 (10 min)</li>
                        <li>• Forgiveness in Colossians 3:13 (14 min)</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="p-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-primary" />
                    Anxiety & OCD Prayer Practices
                  </CardTitle>
                  <CardDescription>
                    Specific prayers and breathing exercises for managing anxiety and OCD symptoms
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-4 bg-secondary/20 rounded-lg">
                      <h4 className="font-medium mb-2">Quick Anxiety Relief Prayer</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        3-minute guided prayer for moments of overwhelming anxiety
                      </p>
                      <Button size="sm" className="w-full">
                        <Play className="mr-2 h-4 w-4" />
                        Listen Now (3 min)
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <h5 className="text-sm font-medium">Available Practices:</h5>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• OCD Intrusive Thought Prayer (5 min)</li>
                        <li>• Breathing with Scripture (8 min)</li>
                        <li>• Evening Surrender Prayer (12 min)</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Community Tab */}
          <TabsContent value="community" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-primary mb-4">Recovery Community</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Connect with others on their recovery journey, share encouragement, and find accountability
                in our supportive community.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="text-center p-6">
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-primary mb-2">{subscriberCount}</h3>
                <p className="text-muted-foreground">Community Members</p>
              </Card>
              <Card className="text-center p-6">
                <MessageCircle className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-primary mb-2">847</h3>
                <p className="text-muted-foreground">Encouraging Messages</p>
              </Card>
              <Card className="text-center p-6">
                <Star className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-primary mb-2">156</h3>
                <p className="text-muted-foreground">Success Stories</p>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6">
                <CardHeader>
                  <CardTitle>Recent Community Highlights</CardTitle>
                  <CardDescription>
                    Encouraging updates and milestones from our community members
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>SM</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Sarah M.</p>
                        <p className="text-sm text-muted-foreground">Celebrating 2 years sober today! The daily meditations have been life-changing. 🙏</p>
                        <p className="text-xs text-muted-foreground mt-1">2 days ago</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>JR</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Jake R.</p>
                        <p className="text-sm text-muted-foreground">Started the beginner fitness program last week. Already feeling stronger mentally and physically!</p>
                        <p className="text-xs text-muted-foreground mt-1">4 days ago</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>ML</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Maria L.</p>
                        <p className="text-sm text-muted-foreground">Family therapy sessions are helping us heal together. Thank you for the hope! ❤️</p>
                        <p className="text-xs text-muted-foreground mt-1">1 week ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="p-6">
                <CardHeader>
                  <CardTitle>Join Our Community</CardTitle>
                  <CardDescription>
                    Get daily recovery content, connect with others, and access exclusive resources
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {!isSubscribed ? (
                    <form onSubmit={handleSubscribe} className="space-y-4">
                      <Input
                        type="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                      <Button type="submit" className="w-full">
                        <Mail className="mr-2 h-4 w-4" />
                        Join Community
                      </Button>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <p className="font-medium">Community Benefits:</p>
                        <ul className="space-y-1">
                          <li>• Daily recovery content via email</li>
                          <li>• Access to exclusive fitness programs</li>
                          <li>• Community support and encouragement</li>
                          <li>• Priority booking for group sessions</li>
                        </ul>
                      </div>
                    </form>
                  ) : (
                    <div className="text-center space-y-4">
                      <CheckCircle className="h-12 w-12 text-primary mx-auto" />
                      <p className="text-lg font-medium text-primary">Welcome to the Community!</p>
                      <p className="text-muted-foreground">
                        Check your email for your welcome message and first daily content.
                      </p>
                      <Button asChild variant="outline" className="w-full">
                        <Link href="/services">Book Your First Session</Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Call to Action */}
        <Card className="max-w-4xl mx-auto mt-12 p-6 md:p-8 text-center bg-primary text-primary-foreground">
          <CardContent className="pt-6">
            <h3 className="text-2xl font-bold mb-4">Ready to Take the Next Step?</h3>
            <p className="text-lg opacity-90 mb-6">
              While daily resources provide ongoing support, personalized therapy can accelerate your healing journey.
              Book your first session today and experience the transformative power of holistic recovery.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="px-8" asChild>
                <Link href="/services">
                  Book Therapy Session
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="px-8 text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary">
                <Phone className="mr-2 h-4 w-4" />
                Call for Support
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}