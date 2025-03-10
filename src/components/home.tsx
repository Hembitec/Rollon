import React from "react"
import { Link } from "react-router-dom"
import { Navigation, FooterNavigation } from "@/components/Navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Brain, FileInput, BookOpen, Clock, LineChart, Share2, Twitter, Github, Mail, CheckCircle } from "lucide-react"

function Header() {
  return (
    <header>
      <Navigation />
    </header>
  )
}

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full pt-32 pb-16 md:pt-40 md:pb-24 relative overflow-hidden">
          {/* Grid pattern background */}
          <div className="absolute inset-0 -z-10 bg-grid-pattern opacity-30"></div>

          {/* Animated blobs */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
            <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-amber-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
          </div>

          <div className="container px-4 md:px-6 relative">
            <div className="flex flex-col items-center space-y-8 text-center">
              {/* Badge */}
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-blue-500 text-white shadow hover:bg-blue-600">
                <span>✨ AI-Powered Quiz Generation</span>
              </div>

              {/* Heading */}
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl/none max-w-3xl">
                Transform Learning Materials into
                <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                  {" "}
                  Personalized Quizzes
                </span>
              </h1>

              {/* Description */}
              <p className="mx-auto max-w-[700px] text-muted-foreground text-lg md:text-xl">
                Upload text, paste content, or provide links and let our AI generate tailored quiz questions to enhance
                your learning experience.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 min-[400px]:flex-row">
                <Link to="/create-quiz">
                  <Button size="lg" className="bg-blue-500 hover:bg-blue-600 rounded-md px-8 py-6 text-base">
                    Create a Quiz
                  </Button>
                </Link>
                <Link to="/about">
                  <Button size="lg" variant="outline" className="rounded-md px-8 py-6 text-base">
                    Learn More
                  </Button>
                </Link>
              </div>

              {/* Trust badge */}
              <div className="mt-8 flex items-center justify-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
                  <span>Free plan available</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Section */}
        <section id="features" className="w-full py-16 md:py-24 bg-slate-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Why Choose Rollon?</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Our AI-powered platform transforms how you learn and test your knowledge with these powerful features
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="flex flex-col items-center space-y-4 p-6 bg-white rounded-lg shadow-sm">
                <div className="p-3 rounded-full bg-blue-100">
                  <Brain className="h-6 w-6 text-blue-500" />
                </div>
                <h3 className="text-xl font-bold">AI-Powered Quiz Generation</h3>
                <p className="text-center text-muted-foreground">
                  Our advanced AI analyzes your content and creates relevant, contextual questions tailored to your
                  learning needs.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 p-6 bg-white rounded-lg shadow-sm">
                <div className="p-3 rounded-full bg-amber-100">
                  <FileInput className="h-6 w-6 text-amber-500" />
                </div>
                <h3 className="text-xl font-bold">Multiple Input Methods</h3>
                <p className="text-center text-muted-foreground">
                  Upload files, paste text, or provide URLs - we support various ways to import your learning materials.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 p-6 bg-white rounded-lg shadow-sm">
                <div className="p-3 rounded-full bg-green-100">
                  <BookOpen className="h-6 w-6 text-green-500" />
                </div>
                <h3 className="text-xl font-bold">Customizable Quizzes</h3>
                <p className="text-center text-muted-foreground">
                  Choose difficulty levels, question formats, and quiz length to match your learning style and goals.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 p-6 bg-white rounded-lg shadow-sm">
                <div className="p-3 rounded-full bg-blue-100">
                  <Clock className="h-6 w-6 text-blue-500" />
                </div>
                <h3 className="text-xl font-bold">Save Time</h3>
                <p className="text-center text-muted-foreground">
                  Create comprehensive quizzes in seconds instead of spending hours manually crafting questions.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 p-6 bg-white rounded-lg shadow-sm">
                <div className="p-3 rounded-full bg-amber-100">
                  <LineChart className="h-6 w-6 text-amber-500" />
                </div>
                <h3 className="text-xl font-bold">Track Progress</h3>
                <p className="text-center text-muted-foreground">
                  Monitor your learning journey with detailed performance analytics and improvement suggestions.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 p-6 bg-white rounded-lg shadow-sm">
                <div className="p-3 rounded-full bg-green-100">
                  <Share2 className="h-6 w-6 text-green-500" />
                </div>
                <h3 className="text-xl font-bold">Share & Collaborate</h3>
                <p className="text-center text-muted-foreground">
                  Export quizzes as PDFs or share them via links to collaborate with classmates or study groups.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section id="use-cases" className="w-full py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Rollon for Everyone</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  See how different users leverage Rollon to enhance their learning and teaching experience
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="flex flex-col items-start p-6 bg-white rounded-lg shadow-sm border">
                <div className="p-3 rounded-full bg-blue-100 mb-4">
                  <BookOpen className="h-6 w-6 text-blue-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">For Students</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" />
                    <span>Create practice quizzes from lecture notes and textbooks</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" />
                    <span>Test knowledge gaps before exams</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" />
                    <span>Generate flashcards for language learning</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" />
                    <span>Track progress over time with analytics</span>
                  </li>
                </ul>
              </div>
              <div className="flex flex-col items-start p-6 bg-white rounded-lg shadow-sm border">
                <div className="p-3 rounded-full bg-amber-100 mb-4">
                  <FileInput className="h-6 w-6 text-amber-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">For Educators</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" />
                    <span>Create assessments in seconds from lesson plans</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" />
                    <span>Generate diverse question types for better engagement</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" />
                    <span>Share quizzes with students and track results</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" />
                    <span>Identify areas where students need more support</span>
                  </li>
                </ul>
              </div>
              <div className="flex flex-col items-start p-6 bg-white rounded-lg shadow-sm border">
                <div className="p-3 rounded-full bg-green-100 mb-4">
                  <Brain className="h-6 w-6 text-green-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">For Professionals</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" />
                    <span>Create quizzes from training materials and documentation</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" />
                    <span>Test knowledge retention after workshops</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" />
                    <span>Prepare for certification exams with practice tests</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" />
                    <span>Onboard new team members with interactive learning</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-16 md:py-24 bg-blue-500 text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Transform Your Learning?
                </h2>
                <p className="mx-auto max-w-[700px] md:text-xl text-blue-100">
                  Join thousands of students and educators who are already using Rollon to enhance their learning
                  experience.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/create-quiz">
                  <Button size="lg" className="bg-white text-blue-500 hover:bg-blue-50">
                    Create a Quiz Now
                  </Button>
                </Link>
                <Link to="/about">
                  <Button size="lg" variant="outline" className="text-white border-white hover:bg-blue-600">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-6 bg-slate-900 text-slate-200">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-bold">Rollon</h3>
              <p className="text-sm text-slate-400">
                AI-powered quiz generator that transforms any learning material into personalized test questions.
              </p>
              <div className="flex space-x-4">
                <Link to="#" className="text-slate-400 hover:text-white">
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </Link>
                <Link to="#" className="text-slate-400 hover:text-white">
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </Link>
                <Link to="#" className="text-slate-400 hover:text-white">
                  <Mail className="h-5 w-5" />
                  <span className="sr-only">Email</span>
                </Link>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-bold">Quick Links</h3>
              <FooterNavigation />
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-bold">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="#" className="text-slate-400 hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-slate-400 hover:text-white">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-slate-400 hover:text-white">
                    Cookie Policy
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-slate-400 hover:text-white">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-bold">Subscribe</h3>
              <p className="text-sm text-slate-400">Stay updated with our latest features and releases.</p>
              <form className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-slate-800 border-slate-700 text-white"
                />
                <Button type="submit" className="bg-blue-500 hover:bg-blue-600">
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs text-slate-400">&copy; {new Date().getFullYear()} Rollon. All rights reserved.</p>
            <p className="text-xs text-slate-400 mt-2 md:mt-0">Made with ❤️ by Rollon Team</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
