"use client"

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { Calendar, CalendarIcon, Check, Clock, DollarSign, Heart, Phone, Shield, Star, Users, Video, MapPin, CheckCircle, ArrowRight, Mail } from 'lucide-react'

interface TherapyBooking {
  name: string
  phone: string
  email: string
  issue: string
  sessionType: 'individual' | 'group' | 'family' | 'addiction'
  preferredTime: string
  sessionFormat: 'in-person' | 'telehealth'
  insuranceProvider: string
  previousTherapy: 'yes' | 'no'
  urgency: 'routine' | 'urgent' | 'crisis'
}

interface SpeakingBooking {
  organizationName: string
  contactName: string
  contactPhone: string
  contactEmail: string
  eventDates: string[]
  preferredTimes: string[]
  audienceSize: string
  audienceType: string
  eventType: string
  topicsOfInterest: string[]
  budget: string
  location: string
  additionalInfo: string
}

const therapyServices = [
  {
    id: 'individual',
    title: 'Individual Therapy',
    icon: Heart,
    duration: '60 minutes',
    price: '$150',
    description: 'One-on-one personalized therapy sessions addressing your specific recovery and mental health needs.',
    features: [
      'Personalized treatment plan',
      'Evidence-based approaches',
      'Christ-centered guidance',
      'Trauma-informed care',
      'Addiction recovery focus',
      'Mental health support'
    ],
    availability: 'Mon-Fri: 9AM-6PM'
  },
  {
    id: 'group',
    title: 'Group Therapy',
    icon: Users,
    duration: '90 minutes',
    price: '$75',
    description: 'Supportive group sessions with others on similar recovery journeys, fostering community and shared healing.',
    features: [
      'Peer support network',
      'Shared experiences',
      'Group accountability',
      'Social skills development',
      'Recovery community',
      'Weekly sessions'
    ],
    availability: 'Tues & Thurs: 6PM-7:30PM'
  },
  {
    id: 'family',
    title: 'Family Therapy',
    icon: Users,
    duration: '75 minutes',
    price: '$175',
    description: 'Collaborative sessions for families affected by addiction and mental health challenges, rebuilding relationships.',
    features: [
      'Family system healing',
      'Communication skills',
      'Boundary setting',
      'Trust rebuilding',
      'Codependency recovery',
      'Crisis intervention'
    ],
    availability: 'Mon-Sat: Flexible scheduling'
  },
  {
    id: 'addiction',
    title: 'Addiction Counseling',
    icon: Shield,
    duration: '60 minutes',
    price: '$160',
    description: 'Specialized intensive treatment for substance abuse and behavioral addictions with spiritual integration.',
    features: [
      '20+ years experience',
      'Relapse prevention',
      'Spiritual recovery',
      'Detox support',
      '12-step integration',
      'Family involvement'
    ],
    availability: 'Daily: Including weekends for urgent needs'
  }
]

const speakingTopics = [
  'Overcoming Addiction: A 20-Year Journey',
  'Living with OCD: 37 Years of Management & Recovery',
  'Christ-Centered Recovery: Faith in Healing',
  'Family Recovery: Healing Together',
  'Mental Health Awareness & Stigma',
  'Holistic Wellness & Fitness in Recovery',
  'Trauma-Informed Care & Healing',
  'Professional Therapy Insights'
]

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState('therapy')
  const [selectedService, setSelectedService] = useState<string>('')
  const [therapyForm, setTherapyForm] = useState<TherapyBooking>({
    name: '',
    phone: '',
    email: '',
    issue: '',
    sessionType: 'individual',
    preferredTime: '',
    sessionFormat: 'in-person',
    insuranceProvider: '',
    previousTherapy: 'no',
    urgency: 'routine'
  })
  const [speakingForm, setSpeakingForm] = useState<SpeakingBooking>({
    organizationName: '',
    contactName: '',
    contactPhone: '',
    contactEmail: '',
    eventDates: [''],
    preferredTimes: [''],
    audienceSize: '',
    audienceType: '',
    eventType: '',
    topicsOfInterest: [],
    budget: '',
    location: '',
    additionalInfo: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleTherapySubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitSuccess(true)
      // Reset form after success
      setTimeout(() => setSubmitSuccess(false), 5000)
    }, 2000)
  }

  const handleSpeakingSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitSuccess(true)
      // Reset form after success
      setTimeout(() => setSubmitSuccess(false), 5000)
    }, 2000)
  }

  const addEventDate = () => {
    setSpeakingForm(prev => ({
      ...prev,
      eventDates: [...prev.eventDates, ''],
      preferredTimes: [...prev.preferredTimes, '']
    }))
  }

  const updateEventDate = (index: number, value: string) => {
    const newDates = [...speakingForm.eventDates]
    newDates[index] = value
    setSpeakingForm(prev => ({ ...prev, eventDates: newDates }))
  }

  const updatePreferredTime = (index: number, value: string) => {
    const newTimes = [...speakingForm.preferredTimes]
    newTimes[index] = value
    setSpeakingForm(prev => ({ ...prev, preferredTimes: newTimes }))
  }

  const toggleTopic = (topic: string) => {
    setSpeakingForm(prev => ({
      ...prev,
      topicsOfInterest: prev.topicsOfInterest.includes(topic)
        ? prev.topicsOfInterest.filter(t => t !== topic)
        : [...prev.topicsOfInterest, topic]
    }))
  }

  if (submitSuccess) {
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
                <p className="text-xs text-muted-foreground">Services & Booking</p>
              </div>
            </Link>
          </div>
        </header>

        <div className="container py-12 px-4 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <CheckCircle className="h-16 w-16 text-primary mx-auto" />
            <h1 className="text-3xl font-bold text-primary">Booking Request Submitted!</h1>
            <p className="text-lg text-muted-foreground">
              Thank you for reaching out. We'll review your request and contact you within 24 hours to confirm your appointment details and answer any questions you may have.
            </p>
            <div className="p-6 bg-secondary/30 rounded-lg">
              <h3 className="font-semibold mb-2">What happens next?</h3>
              <ul className="text-left space-y-2 text-sm text-muted-foreground">
                <li>• You'll receive a confirmation email shortly</li>
                <li>• Our team will call you within 24 hours</li>
                <li>• We'll discuss your needs and schedule your session</li>
                <li>• You'll receive intake forms to complete before your first visit</li>
              </ul>
            </div>
            <div className="flex gap-4 justify-center">
              <Button asChild>
                <Link href="/">Return Home</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/resources">Explore Daily Resources</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
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
              <p className="text-xs text-muted-foreground">Services & Booking</p>
            </div>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/resources" className="text-sm font-medium hover:text-primary transition-colors">
              Daily Resources
            </Link>
          </nav>
        </div>
      </header>

      <div className="container py-8 px-4">
        {/* Page Header */}
        <div className="text-center space-y-6 mb-12">
          <Badge variant="outline" className="px-4 py-2">
            Professional Recovery Services
          </Badge>
          <h1 className="text-4xl font-bold text-primary">Services & Booking Portal</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Choose from our comprehensive range of therapy services or book a speaking engagement.
            All services combine evidence-based treatment with Christ-centered spiritual guidance.
          </p>
        </div>

        {/* Service Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="therapy" className="text-lg py-3">
              <Heart className="mr-2 h-5 w-5" />
              Therapy Services
            </TabsTrigger>
            <TabsTrigger value="speaking" className="text-lg py-3">
              <Users className="mr-2 h-5 w-5" />
              Speaking Engagements
            </TabsTrigger>
          </TabsList>

          {/* Therapy Services Tab */}
          <TabsContent value="therapy" className="space-y-8">
            {/* Service Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {therapyServices.map((service) => (
                <Card
                  key={service.id}
                  className={`p-6 cursor-pointer transition-all hover:shadow-lg ${
                    selectedService === service.id ? 'ring-2 ring-primary bg-primary/5' : ''
                  }`}
                  onClick={() => {
                    setSelectedService(service.id)
                    setTherapyForm(prev => ({ ...prev, sessionType: service.id as any }))
                  }}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <service.icon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-xl">{service.title}</CardTitle>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {service.duration}
                            </span>
                            <span className="flex items-center gap-1">
                              <DollarSign className="h-4 w-4" />
                              {service.price}
                            </span>
                          </div>
                        </div>
                      </div>
                      {selectedService === service.id && (
                        <Check className="h-6 w-6 text-primary" />
                      )}
                    </div>
                    <CardDescription className="text-base">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span className="font-medium">Available:</span>
                        <span className="text-muted-foreground">{service.availability}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {service.features.slice(0, 4).map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-1 text-sm">
                            <CheckCircle className="h-3 w-3 text-primary flex-shrink-0" />
                            <span className="text-muted-foreground">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Therapy Booking Form */}
            {selectedService && (
              <Card className="max-w-4xl mx-auto p-6">
                <CardHeader>
                  <CardTitle className="text-2xl text-primary">
                    Book {therapyServices.find(s => s.id === selectedService)?.title}
                  </CardTitle>
                  <CardDescription>
                    Please fill out this form to schedule your therapy session. We'll contact you within 24 hours to confirm details.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleTherapySubmit} className="space-y-6">
                    {/* Personal Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Personal Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Full Name *</Label>
                          <Input
                            id="name"
                            value={therapyForm.name}
                            onChange={(e) => setTherapyForm(prev => ({ ...prev, name: e.target.value }))}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone Number *</Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={therapyForm.phone}
                            onChange={(e) => setTherapyForm(prev => ({ ...prev, phone: e.target.value }))}
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={therapyForm.email}
                          onChange={(e) => setTherapyForm(prev => ({ ...prev, email: e.target.value }))}
                          required
                        />
                      </div>
                    </div>

                    <Separator />

                    {/* Session Details */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Session Preferences</h3>
                      <div>
                        <Label>Session Format *</Label>
                        <RadioGroup
                          value={therapyForm.sessionFormat}
                          onValueChange={(value: 'in-person' | 'telehealth') =>
                            setTherapyForm(prev => ({ ...prev, sessionFormat: value }))}
                          className="flex gap-6 mt-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="in-person" id="in-person" />
                            <Label htmlFor="in-person" className="flex items-center gap-2">
                              <MapPin className="h-4 w-4" />
                              In-Person
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="telehealth" id="telehealth" />
                            <Label htmlFor="telehealth" className="flex items-center gap-2">
                              <Video className="h-4 w-4" />
                              Telehealth
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="preferredTime">Preferred Time</Label>
                          <Select onValueChange={(value) => setTherapyForm(prev => ({ ...prev, preferredTime: value }))}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select preferred time" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="morning">Morning (9AM-12PM)</SelectItem>
                              <SelectItem value="afternoon">Afternoon (12PM-5PM)</SelectItem>
                              <SelectItem value="evening">Evening (5PM-8PM)</SelectItem>
                              <SelectItem value="flexible">Flexible</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>Urgency Level *</Label>
                          <RadioGroup
                            value={therapyForm.urgency}
                            onValueChange={(value: 'routine' | 'urgent' | 'crisis') =>
                              setTherapyForm(prev => ({ ...prev, urgency: value }))}
                            className="flex gap-4 mt-2"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="routine" id="routine" />
                              <Label htmlFor="routine">Routine</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="urgent" id="urgent" />
                              <Label htmlFor="urgent">Urgent</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="crisis" id="crisis" />
                              <Label htmlFor="crisis">Crisis</Label>
                            </div>
                          </RadioGroup>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Clinical Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Clinical Information</h3>
                      <div>
                        <Label htmlFor="issue">Primary Concerns/Issues to Address *</Label>
                        <Textarea
                          id="issue"
                          placeholder="Please describe what you'd like to work on in therapy..."
                          value={therapyForm.issue}
                          onChange={(e) => setTherapyForm(prev => ({ ...prev, issue: e.target.value }))}
                          className="min-h-[120px]"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label>Previous Therapy Experience *</Label>
                          <RadioGroup
                            value={therapyForm.previousTherapy}
                            onValueChange={(value: 'yes' | 'no') =>
                              setTherapyForm(prev => ({ ...prev, previousTherapy: value }))}
                            className="flex gap-6 mt-2"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="yes" id="prev-yes" />
                              <Label htmlFor="prev-yes">Yes</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="no" id="prev-no" />
                              <Label htmlFor="prev-no">No</Label>
                            </div>
                          </RadioGroup>
                        </div>
                        <div>
                          <Label htmlFor="insurance">Insurance Provider</Label>
                          <Input
                            id="insurance"
                            placeholder="Your insurance provider"
                            value={therapyForm.insuranceProvider}
                            onChange={(e) => setTherapyForm(prev => ({ ...prev, insuranceProvider: e.target.value }))}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end pt-6">
                      <Button type="submit" size="lg" disabled={isSubmitting} className="px-8">
                        {isSubmitting ? (
                          <>
                            <Clock className="mr-2 h-4 w-4 animate-spin" />
                            Submitting Request...
                          </>
                        ) : (
                          <>
                            <Calendar className="mr-2 h-4 w-4" />
                            Request Appointment
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Speaking Engagements Tab */}
          <TabsContent value="speaking" className="space-y-8">
            {/* Speaking Overview */}
            <Card className="p-6">
              <CardHeader>
                <CardTitle className="text-2xl text-primary">Speaking Engagements</CardTitle>
                <CardDescription className="text-base">
                  Book inspirational speaking engagements featuring personal testimony of overcoming 20 years of addiction
                  and 37 years with OCD. Perfect for recovery centers, churches, conferences, and educational institutions.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <Star className="h-8 w-8 text-primary mx-auto mb-2" />
                    <h3 className="font-semibold">Authentic Testimony</h3>
                    <p className="text-sm text-muted-foreground">Real stories of recovery and transformation</p>
                  </div>
                  <div className="text-center">
                    <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                    <h3 className="font-semibold">Engaging Presentations</h3>
                    <p className="text-sm text-muted-foreground">Interactive talks that inspire hope</p>
                  </div>
                  <div className="text-center">
                    <Shield className="h-8 w-8 text-primary mx-auto mb-2" />
                    <h3 className="font-semibold">Professional Experience</h3>
                    <p className="text-sm text-muted-foreground">Licensed therapist with lived experience</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Available Topics */}
            <Card className="p-6">
              <CardHeader>
                <CardTitle>Available Speaking Topics</CardTitle>
                <CardDescription>
                  Choose from these powerful presentation topics, or request a custom presentation tailored to your audience.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {speakingTopics.map((topic, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-secondary/30 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="font-medium">{topic}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Speaking Booking Form */}
            <Card className="max-w-4xl mx-auto p-6">
              <CardHeader>
                <CardTitle className="text-2xl text-primary">Request Speaking Engagement</CardTitle>
                <CardDescription>
                  Please provide details about your event and we'll get back to you within 48 hours with availability and pricing.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSpeakingSubmit} className="space-y-6">
                  {/* Organization Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Organization Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="orgName">Organization Name *</Label>
                        <Input
                          id="orgName"
                          value={speakingForm.organizationName}
                          onChange={(e) => setSpeakingForm(prev => ({ ...prev, organizationName: e.target.value }))}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="contactName">Contact Person *</Label>
                        <Input
                          id="contactName"
                          value={speakingForm.contactName}
                          onChange={(e) => setSpeakingForm(prev => ({ ...prev, contactName: e.target.value }))}
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="contactPhone">Contact Phone *</Label>
                        <Input
                          id="contactPhone"
                          type="tel"
                          value={speakingForm.contactPhone}
                          onChange={(e) => setSpeakingForm(prev => ({ ...prev, contactPhone: e.target.value }))}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="contactEmail">Contact Email *</Label>
                        <Input
                          id="contactEmail"
                          type="email"
                          value={speakingForm.contactEmail}
                          onChange={(e) => setSpeakingForm(prev => ({ ...prev, contactEmail: e.target.value }))}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Event Details */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Event Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="audienceSize">Expected Audience Size *</Label>
                        <Select onValueChange={(value) => setSpeakingForm(prev => ({ ...prev, audienceSize: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select audience size" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="small">Small (10-50 people)</SelectItem>
                            <SelectItem value="medium">Medium (50-200 people)</SelectItem>
                            <SelectItem value="large">Large (200-500 people)</SelectItem>
                            <SelectItem value="xlarge">Very Large (500+ people)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="audienceType">Audience Type *</Label>
                        <Select onValueChange={(value) => setSpeakingForm(prev => ({ ...prev, audienceType: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select audience type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="recovery">People in recovery</SelectItem>
                            <SelectItem value="families">Families affected by addiction</SelectItem>
                            <SelectItem value="professionals">Healthcare professionals</SelectItem>
                            <SelectItem value="faith">Faith community</SelectItem>
                            <SelectItem value="students">Students</SelectItem>
                            <SelectItem value="general">General public</SelectItem>
                            <SelectItem value="mixed">Mixed audience</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="eventType">Event Type *</Label>
                        <Select onValueChange={(value) => setSpeakingForm(prev => ({ ...prev, eventType: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select event type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="conference">Conference</SelectItem>
                            <SelectItem value="workshop">Workshop</SelectItem>
                            <SelectItem value="church">Church service</SelectItem>
                            <SelectItem value="support-group">Support group</SelectItem>
                            <SelectItem value="corporate">Corporate event</SelectItem>
                            <SelectItem value="educational">Educational institution</SelectItem>
                            <SelectItem value="fundraiser">Fundraiser</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="location">Event Location (City, State) *</Label>
                      <Input
                        id="location"
                        placeholder="Where will the event take place?"
                        value={speakingForm.location}
                        onChange={(e) => setSpeakingForm(prev => ({ ...prev, location: e.target.value }))}
                        required
                      />
                    </div>
                  </div>

                  <Separator />

                  {/* Dates and Times */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">Preferred Dates & Times</h3>
                      <Button type="button" variant="outline" size="sm" onClick={addEventDate}>
                        Add Another Date Option
                      </Button>
                    </div>
                    {speakingForm.eventDates.map((date, index) => (
                      <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-secondary/20 rounded-lg">
                        <div>
                          <Label htmlFor={`date-${index}`}>Date Option {index + 1} *</Label>
                          <Input
                            id={`date-${index}`}
                            type="date"
                            value={date}
                            onChange={(e) => updateEventDate(index, e.target.value)}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor={`time-${index}`}>Preferred Time *</Label>
                          <Input
                            id={`time-${index}`}
                            type="time"
                            value={speakingForm.preferredTimes[index]}
                            onChange={(e) => updatePreferredTime(index, e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  {/* Topic Selection */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Topics of Interest</h3>
                    <p className="text-sm text-muted-foreground">Select all topics that would be relevant for your event:</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {speakingTopics.map((topic, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id={`topic-${index}`}
                            checked={speakingForm.topicsOfInterest.includes(topic)}
                            onChange={() => toggleTopic(topic)}
                            className="rounded"
                          />
                          <Label htmlFor={`topic-${index}`} className="text-sm">{topic}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Budget and Additional Info */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Additional Information</h3>
                    <div>
                      <Label htmlFor="budget">Budget Range</Label>
                      <Select onValueChange={(value) => setSpeakingForm(prev => ({ ...prev, budget: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select budget range (optional)" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="under-1000">Under $1,000</SelectItem>
                          <SelectItem value="1000-2500">$1,000 - $2,500</SelectItem>
                          <SelectItem value="2500-5000">$2,500 - $5,000</SelectItem>
                          <SelectItem value="5000-plus">$5,000+</SelectItem>
                          <SelectItem value="discuss">Prefer to discuss</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="additionalInfo">Additional Information</Label>
                      <Textarea
                        id="additionalInfo"
                        placeholder="Any special requests, accommodations needed, or additional details about your event..."
                        value={speakingForm.additionalInfo}
                        onChange={(e) => setSpeakingForm(prev => ({ ...prev, additionalInfo: e.target.value }))}
                        className="min-h-[120px]"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-6">
                    <Button type="submit" size="lg" disabled={isSubmitting} className="px-8">
                      {isSubmitting ? (
                        <>
                          <Clock className="mr-2 h-4 w-4 animate-spin" />
                          Submitting Request...
                        </>
                      ) : (
                        <>
                          <Mail className="mr-2 h-4 w-4" />
                          Request Speaking Engagement
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Contact Information */}
        <Card className="max-w-4xl mx-auto mt-12 p-6 text-center">
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold mb-4">Need Help or Have Questions?</h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>(555) 123-HEAL</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>info@holisticrecovery.com</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>Mon-Fri: 9AM-6PM</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              All information is kept strictly confidential. Crisis support available 24/7.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}