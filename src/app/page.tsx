"use client"

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Heart, Shield, Users, BookOpen, Phone, Mail, CheckCircle, ArrowRight, Star, Calendar, Video, MapPin } from 'lucide-react'

export const dynamic = 'force-dynamic'

const testimonials = [
  {
    name: "Sarah M.",
    role: "In Recovery - 2 Years",
    content: "The holistic approach changed everything. Having Christ-centered guidance alongside professional therapy gave me hope I never had before.",
    rating: 5,
  },
  {
    name: "Michael R.",
    role: "Family Member",
    content: "The family therapy sessions helped us understand addiction better and rebuild trust. Our relationship with our son is stronger than ever.",
    rating: 5,
  },
  {
    name: "Jessica T.",
    role: "Mental Health Journey",
    content: "Finally found someone who understands OCD. The combination of therapy and fitness plans created sustainable change in my life.",
    rating: 5,
  }
]

const services = [
  {
    icon: Heart,
    title: "Individual Therapy",
    description: "One-on-one sessions addressing addiction, mental health, and personal recovery goals",
    features: ["In-person & Telehealth", "Evidence-based treatment", "Christ-centered approach", "Flexible scheduling"],
  },
  {
    icon: Users,
    title: "Group & Family Therapy",
    description: "Collaborative healing sessions for families affected by addiction and mental health challenges",
    features: ["Family dynamics", "Communication skills", "Boundary setting", "Group support"],
  },
  {
    icon: Shield,
    title: "Addiction Counseling",
    description: "Specialized treatment for substance abuse and behavioral addictions with spiritual guidance",
    features: ["20+ years experience", "Relapse prevention", "Spiritual recovery", "Ongoing support"],
  },
  {
    icon: BookOpen,
    title: "Fitness & Wellness Plans",
    description: "Customized fitness programs integrated with recovery to heal mind, body, and spirit",
    features: ["Recovery-focused workouts", "Nutrition guidance", "Stress management", "Accountability"],
  }
]

export default function HeroLandingPage() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubscribed(true)
    // Here you would typically send the data to your backend
    setTimeout(() => setIsSubscribed(false), 3000)
  }

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle contact form submission
    alert('Thank you for reaching out. We will contact you within 24 hours.')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      {/* Header Navigation */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container flex h-20 items-center justify-between">
          <div className="flex items-center space-x-4">
            <Image
              src="/generated/hands-reaching-logo.png"
              alt="Full Circle Resilience"
              width={40}
              height={40}
              className="rounded"
            />
            <div>
              <h1 className="font-bold text-2xl text-primary tracking-tight">Full Circle Resilience</h1>
              <p className="text-xs text-muted-foreground">Hope • Healing • Transformation</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="#services" className="text-sm font-medium hover:text-primary transition-colors">
              Services
            </Link>
            <Link href="#about" className="text-sm font-medium hover:text-primary transition-colors">
              About
            </Link>
            <Link href="/services" className="text-sm font-medium hover:text-primary transition-colors">
              Book Session
            </Link>
            <Link href="/resources" className="text-sm font-medium hover:text-primary transition-colors">
              Daily Resources
            </Link>
          </nav>
          <div className="flex items-center space-x-2">
            <Button asChild variant="outline" size="sm">
              <Link href="/services">Book Now</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-8 text-center">
            <Badge variant="secondary" className="px-4 py-2">
              Overcoming 20 Years of Addiction • 37 Years with OCD
            </Badge>

            <div className="space-y-6 max-w-4xl">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-primary">
                Your Journey to
                <span className="text-gradient bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"> Recovery</span>
                <br />Starts Here
              </h1>

              <p className="mx-auto max-w-3xl text-lg md:text-xl text-muted-foreground leading-relaxed">
                Professional therapy and recovery services combining personal testimony, Christ-centered spiritual guidance,
                fitness plans, and comprehensive support for addiction recovery, mental health challenges, and family healing.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 min-[400px]:flex-row">
              <Button size="lg" className="px-8 py-4 text-lg" asChild>
                <Link href="/services">
                  Book Your First Session
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="lg" className="px-8 py-4 text-lg">
                    <Phone className="mr-2 h-5 w-5" />
                    Request Information
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Request Information</DialogTitle>
                    <DialogDescription>
                      Share your information and we'll contact you within 24 hours to discuss how we can support your recovery journey.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        placeholder="Your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                      <Input
                        type="tel"
                        placeholder="Phone number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                      />
                    </div>
                    <Input
                      type="email"
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <Textarea
                      placeholder="Tell us about your situation or questions..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="min-h-[100px]"
                    />
                    <Button type="submit" className="w-full">
                      Request Information
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Video className="h-4 w-4" />
                In-Person & Telehealth Available
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Serving Local & Remote Clients
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Flexible Scheduling
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Personal Testimony Section */}
      <section id="about" className="py-12 md:py-16 bg-secondary/30">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/2 space-y-6">
              <Badge className="w-fit">Personal Testimony</Badge>
              <h2 className="text-3xl font-bold text-primary">
                From 20 Years of Addiction & 37 Years with OCD to Helping Others Find Freedom
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p className="text-lg leading-relaxed">
                  I understand the depths of struggle because I've lived it. After battling addiction for two decades
                  and managing OCD for 37 years, I discovered that true recovery comes through a holistic approach
                  that addresses mind, body, and spirit.
                </p>
                <p className="text-lg leading-relaxed">
                  My journey led me to combine evidence-based therapy with Christ-centered spiritual guidance,
                  fitness integration, and comprehensive family support. Now, I dedicate my life to helping others
                  find the same freedom and healing that transformed my life.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Badge variant="secondary">Licensed Therapist</Badge>
                <Badge variant="secondary">Addiction Specialist</Badge>
                <Badge variant="secondary">Faith-Based Recovery</Badge>
                <Badge variant="secondary">Family Counselor</Badge>
              </div>
            </div>
            <div className="lg:w-1/2">
              <Card className="p-6">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl">Recovery Milestones</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">20 Years Addiction Recovery</p>
                      <p className="text-sm text-muted-foreground">Personal experience with substance abuse recovery</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">37 Years OCD Management</p>
                      <p className="text-sm text-muted-foreground">Deep understanding of anxiety and compulsive behaviors</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Christ-Centered Approach</p>
                      <p className="text-sm text-muted-foreground">Spiritual foundation for lasting transformation</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Holistic Integration</p>
                      <p className="text-sm text-muted-foreground">Mind, body, spirit approach to healing</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-6 mb-12">
            <Badge variant="outline">Complete Recovery Services</Badge>
            <h2 className="text-3xl font-bold text-primary">
              Comprehensive Support for Your Journey
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Every recovery journey is unique. Our integrated approach combines professional therapy,
              spiritual guidance, family support, and fitness programs tailored to your specific needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <service.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                  </div>
                  <CardDescription className="text-base">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button asChild className="w-full mt-4">
                    <Link href="/services">
                      Book {service.title}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 md:py-16 bg-secondary/30">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-6 mb-12">
            <Badge variant="outline">Client Testimonials</Badge>
            <h2 className="text-3xl font-bold text-primary">Stories of Hope & Transformation</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6">
                <CardContent className="pt-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <blockquote className="text-muted-foreground mb-4 italic">
                    "{testimonial.content}"
                  </blockquote>
                  <div className="border-t pt-4">
                    <p className="font-medium">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Daily Content Subscription */}
      <section className="py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <Card className="max-w-2xl mx-auto p-6 md:p-8 text-center">
            <CardHeader>
              <CardTitle className="text-2xl md:text-3xl text-primary">
                Daily Recovery Inspiration
              </CardTitle>
              <CardDescription className="text-lg">
                Subscribe to receive daily recovery content including personal stories, educational tips,
                workout demonstrations, meditation guides, and affirmations to support your journey.
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
                    className="text-center"
                  />
                  <Button type="submit" size="lg" className="w-full md:w-auto px-8">
                    <Mail className="mr-2 h-5 w-5" />
                    Subscribe for Daily Support
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    Join our community of over 500 people in recovery
                  </p>
                </form>
              ) : (
                <div className="space-y-4">
                  <CheckCircle className="h-12 w-12 text-primary mx-auto" />
                  <p className="text-lg font-medium text-primary">
                    Welcome to the Recovery Community!
                  </p>
                  <p className="text-muted-foreground">
                    Check your email for a welcome message and your first daily inspiration.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 md:py-16 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6 text-center">
          <div className="space-y-6 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold">
              Ready to Begin Your Recovery Journey?
            </h2>
            <p className="text-lg opacity-90">
              Don't wait another day. Recovery is possible, and you don't have to do it alone.
              Let's work together to create the life of freedom and purpose you deserve.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="px-8 py-4" asChild>
                <Link href="/services">
                  Schedule Your First Session
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="px-8 py-4 text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary">
                <Phone className="mr-2 h-5 w-5" />
                Call for Immediate Support
              </Button>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm opacity-75">
              <span>✓ Confidential consultations</span>
              <span>✓ Insurance accepted</span>
              <span>✓ Flexible scheduling</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-background py-8">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Image
                  src="/generated/hands-reaching-logo.png"
                  alt="Full Circle Resilience"
                  width={24}
                  height={24}
                />
                <span className="font-bold text-primary">Full Circle Resilience</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Professional therapy and recovery services with Christ-centered guidance.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Services</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li><Link href="/services" className="hover:text-primary">Individual Therapy</Link></li>
                <li><Link href="/services" className="hover:text-primary">Group & Family Therapy</Link></li>
                <li><Link href="/services" className="hover:text-primary">Addiction Counseling</Link></li>
                <li><Link href="/services" className="hover:text-primary">Speaking Engagements</Link></li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Resources</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li><Link href="/resources" className="hover:text-primary">Daily Recovery Reels</Link></li>
                <li><Link href="/resources" className="hover:text-primary">Fitness Plans</Link></li>
                <li><Link href="/resources" className="hover:text-primary">Meditation Guides</Link></li>
                <li><Link href="/resources" className="hover:text-primary">Educational Content</Link></li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Contact</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>📧 info@holisticrecovery.com</li>
                <li>📞 (555) 123-HEAL</li>
                <li>🕐 Mon-Fri: 9AM-6PM</li>
                <li>🕐 Weekend: Emergency Only</li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 Full Circle Resilience. All rights reserved. Licensed therapy services.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}