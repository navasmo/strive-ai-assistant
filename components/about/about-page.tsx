'use client'

import { motion } from 'framer-motion'
import { Layout } from '../../components/ui/layout'
import { Bot, Zap, BarChart, Heart, BookOpen, Award, Code, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { Button } from '../ui/button'

export function AboutPage() {
  return (
    <Layout>
      <main className="container max-w-5xl mx-auto py-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-12"
        >
          {/* Hero Section */}
          <div className="space-y-5 text-center">
            <div className="inline-flex items-center justify-center p-2 bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full ">
              <Bot className="h-10 w-10 text-strive-primary dark:text-strive-light" />
            </div>
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-600 mb-8 font-brand text-center">
              About Strive AI Assistant
            </h1>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              Your personal career coach helping you navigate your professional journey with confidence and wellbeing support.
            </p>
            <div className="pt-3">
              <Link href="/">
                <Button className="bg-gradient-to-r from-strive-primary to-indigo-600 hover:from-strive-primary/90 hover:to-indigo-600/90 text-white font-medium px-6 py-2 rounded-full">
                  Start a Conversation
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Main Features */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
            <h2 className="text-2xl font-semibold text-strive-primary dark:text-strive-light col-span-full mb-2">
              Key Features
            </h2>
            <FeatureCard 
              icon={<BarChart className="h-6 w-6" />}
              title="Career Development"
              description="Get personalized guidance on resume building, interview preparation, and job search strategies tailored to your skills and goals."
            />
            <FeatureCard 
              icon={<Heart className="h-6 w-6" />}
              title="Wellbeing Support"
              description="Manage job-search stress with guided breathing exercises and practical mental health tips to maintain your wellbeing."
            />
            <FeatureCard 
              icon={<BookOpen className="h-6 w-6" />}
              title="Skill Enhancement"
              description="Identify skill gaps and receive recommendations for courses, resources, and development opportunities to strengthen your profile."
            />
            <FeatureCard 
              icon={<Award className="h-6 w-6" />}
              title="Professional Growth"
              description="Access expertise on networking, personal branding, and career transition strategies to advance your professional journey."
            />
          </section>
          
          {/* How It Works */}
          <section className="bg-white dark:bg-gray-800/50 rounded-xl shadow-md p-8 space-y-8 border border-purple-100 dark:border-purple-900/30 mt-6">
            <h2 className="text-2xl font-semibold text-strive-primary dark:text-strive-light flex items-center">
              <Zap className="mr-2 h-5 w-5 text-strive-primary dark:text-strive-light" />
              How Strive AI Works
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <StepCard 
                number="01"
                title="Chat Naturally"
                description="Simply talk to Strive as you would with a career advisor. Ask questions or express concerns about your professional journey."
              />
              <StepCard 
                number="02"
                title="Get Personalized Advice"
                description="Receive tailored guidance based on your specific situation, goals, and challenges in your career development."
              />
              <StepCard 
                number="03"
                title="Take Action"
                description="Apply the practical advice and strategies to improve your job prospects, reduce stress, and advance your career."
              />
            </div>
          </section>
          
          {/* Tech Stack 
          <section className="space-y-5 mt-8">
            <h2 className="text-2xl font-semibold text-strive-primary dark:text-strive-light flex items-center">
              <Code className="mr-2 h-5 w-5 text-strive-primary dark:text-strive-light" />
              Our Technology Stack
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <TechCard 
                icon={<svg className="h-8 w-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path fill="#000" d="M119.616 0.0689087h16.8085v38.3186h-16.8085V0.0689087zM0 0H16.8085V38.3186H0V0zM39.7833 0.0689087H69.5101v16.5911H56.5918v21.7274H39.7833V0.0689087zM86.3184 0.0689087h29.7268v16.5911h-12.9183v21.7274H86.3184V0.0689087zM16.8085 38.3186H33.617v16.5912H16.8085V38.3186zM136.425 0.0689087H166.152v16.5911H153.234v21.7274h-16.8085V0.0689087zM183.301 0.0345538h9.2447l26.6129 38.3529h-19.172L183.301 17.8296l-16.8429 20.5578h-19.172L173.899 0.0345538h9.4021z" /><path fill="#4A90E2" d="M183.231 17.8296l13.8313 20.5578h35.7609v-4.9599L210.084 0.0345538h-26.8532v17.795z" /><path fill="#000" d="M232.824 38.3874h16.8085v16.5912h-16.8085V38.3874zM39.7833 71.9695H56.5918v21.7618H73.4003v16.5912H39.7833V71.9695zM103.127 71.9695h16.8085v21.7618h16.8085v16.5912h-33.617V71.9695zM166.151 71.9695h16.8085v21.7618h16.8085v16.5912h-33.617V71.9695zM0 71.9695h33.617v38.353H16.8085v-21.7618H0V71.9695zM183.026 71.9695h16.8085v38.353h-16.8085V71.9695zM216.507 71.9695h33.617v38.353h-16.8085v-21.7618h-16.8085V71.9695zM0 127.042h16.8085v38.3186H0V127.042zM119.616 127.042h16.8085v38.3186h-16.8085V127.042zM63.0634 127.042H89.7763c9.2447 0 16.8085 8.5912 16.8085 19.1722 0 10.581-7.5638 19.1722-16.8085 19.1722H63.0634V127.042zM166.151 127.042h16.8085v38.3186h-16.8085V127.042zM216.507 127.042h33.617v38.3186h-16.8085v-21.7274h-16.8085v21.7274h-16.8085v-38.3186h16.8085zM79.872 143.633v5.0978H89.7762c1.5993 0 3.0328-2.2957 3.0328-5.0978 0-2.8021-1.4335-5.0979-3.0328-5.0979H79.872v5.0979zM16.8085 165.361h16.8085v16.5911H16.8085V165.361zM119.616 165.361h16.8085v16.5911h-16.8085V165.361zM79.872 181.952h16.8085v16.5911H79.872V181.952zM136.425 181.952h16.8085v16.5911h-16.8085V181.952zM199.835 181.952h16.8085v16.5911h-16.8085V181.952zM63.0634 181.952H79.872v16.5911H63.0634V181.952zM153.234 181.952H170.042v16.5911H153.234V181.952zM183.026 181.952h16.8085v16.5911H183.026V181.952zM216.507 181.952h16.8085v16.5911h-16.8085V181.952zM39.7833 198.543H56.5918v16.5912H39.7833V198.543zM96.6805 198.543h16.8085v16.5912H96.6805V198.543zM239.835 198.543h16.8085v16.5912h-16.8085V198.543zM0 215.134h33.617v16.5912H16.8085v21.7618H0V215.134zM103.127 215.134h33.617v38.353h-33.617V215.134zM199.835 215.134h33.617v16.5912h-16.8085v21.7618h-16.8085V215.134zM149.85 215.134h43.84v38.3186H149.85V215.134zM63.0634 215.134h33.617v38.353h-33.617V215.134zM243.219 215.134h12.7054v38.3873h-12.7054V215.134zM119.616 231.726h16.8085v21.7618h-16.8085V231.726zM79.8721 231.726H96.6806v21.7618H79.8721V231.726zM166.151 231.726h16.8085v21.7618h-16.8085V231.726z" /><path fill="#000" d="M183.026 143.633H199.835V165.361H183.026zM119.616 76.9638h16.8085v16.5911h-16.8085V76.9638zM119.616 38.3186H136.425V54.9098H119.616zM153.234 215.478H166.151V231.69H153.234z" /></svg>} 
                title="Next.js"
                description="React framework for fast, server-rendered applications with optimized performance."
              />
              <TechCard 
                icon={<svg className="h-8 w-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"><path fill="#00c180" d="M6,25c-0.553,0-1-0.447-1-1V6c0-0.553,0.447-1,1-1h18c0.553,0,1,0.447,1,1v18c0,0.553-0.447,1-1,1H6z"></path><path fill="#00a066" d="M10.91,11.5h2.322v7H10.91V11.5z M10.91,9.5h2.322v1.6H10.91V9.5z M8,17.5h2.182v1H8V17.5z M18.5,14.84V17.5h-2.295v-2.316c0-0.895-0.342-1.184-0.989-1.184c-0.738,0-1.026,0.416-1.026,1.184c0,0.716,0.378,1.105,1.268,1.631c1.584,0.900,2.121,1.695,2.121,3.059C17.579,21.396,16.5,22.5,14.368,22.5C12.251,22.5,11,21.333,11,19.5v-1.065h2.295v1.199c0,0.863,0.379,1.165,1.063,1.165c0.685,0,1.037-0.374,1.037-1.155c0-0.748-0.379-1.137-1.221-1.621C12.523,17.163,12,16.369,12,14.947c0-1.633,1.105-2.747,3.163-2.747C17.367,12.2,18.5,13.334,18.5,14.84z"></path><path fill="#40ddaa" d="M19.5,11.5h2.5v2.5h-2.5V11.5z M19.5,15h2.5v2.5h-2.5V15z M19.5,18.5h2.5V21h-2.5V18.5z M8,11.5h2v2h-2V11.5z M8,15h2v1.5H8V15z"></path></svg>} 
                title="Supabase"
                description="Open source Firebase alternative with authentication and real-time database."
              />
              <TechCard 
                icon={<svg className="h-8 w-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#38bdf8" d="M12 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35.98 1 2.09 2.15 4.59 2.15 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.91-1.35C15.61 7.15 14.5 6 12 6m-5 8c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.91 1.35C8.39 18.85 9.5 20 12 20c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.91-1.35C10.61 15.15 9.5 14 7 14z"/></svg>} 
                title="Tailwind CSS"
                description="Utility-first CSS framework for rapid UI development with responsive design."
              />
              <TechCard 
                icon={<svg className="h-8 w-8" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><rect fill="#3178C6" width="24" height="24" rx="2"/><path fill="#fff" d="M13.874 5H16.5v9.5a5 5 0 0 1-5 5c-2.76 0-5-2.24-5-5S8.74 9.5 11.5 9.5c.5 0 1 .1 1.5.3h-1.5c-1.6568 0-3 1.3432-3 3s1.3432 3 3 3 3-1.3432 3-3V5h-.626ZM6.5 5h3.375v2H8.5v7.5l-2 .0005V5Z"/></svg>} 
                title="TypeScript"
                description="Typed JavaScript for enhanced code quality and developer productivity."
              />
            </div>
          </section>
          */}
          {/* User Benefits */}
          <section className="space-y-5 py-2">
            <h2 className="text-2xl font-semibold text-strive-primary dark:text-strive-light">
              Who Benefits from Strive
            </h2>
            
            <div className="bg-white dark:bg-gray-800/50 rounded-xl p-6 shadow-md grid md:grid-cols-2 gap-6 border border-purple-100 dark:border-purple-900/30">
              <BenefitItem
                title="University Students"
                description="Preparing for internships, placements, or first jobs with guided career planning and skill development."
              />
              <BenefitItem
                title="Recent Graduates"
                description="Navigating the transition from education to employment with expert advice on job searching and interviewing."
              />
              <BenefitItem
                title="Career Changers"
                description="Building confidence and strategies for transitioning to new industries or roles."
              />
              <BenefitItem
                title="Job Seekers"
                description="Managing the stress of job hunting while improving application materials and interview skills."
              />
            </div>
          </section>
          
          {/* GitHub and Documentation */}
          <div className="text-center py-6">
            <Link href="https://github.com/example/strive-ai" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="border-strive-primary/30 dark:border-strive-light/30 hover:bg-strive-primary/5">
                <ExternalLink className="h-5 w-5 mr-2" />
                View on GitHub
              </Button>
            </Link>
          </div>
          
          <div className="text-center text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 pt-8">
            <p> 2025 Strive AI. All rights reserved.</p>
            <p className="mt-1">Empowering career growth and wellbeing through AI assistance.</p>
          </div>
        </motion.div>
      </main>
    </Layout>
  )
}

function FeatureCard({ icon, title, description }: Readonly<{ icon: React.ReactNode, title: string, description: string }>) {
  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
      className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-purple-100 dark:border-purple-800/30 flex flex-col"
    >
      <div className="rounded-full bg-purple-100 dark:bg-purple-900/30 w-12 h-12 flex items-center justify-center mb-4 text-purple-600 dark:text-purple-400">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-300 mb-2">{title}</h3>
      <p className="text-gray-700 dark:text-gray-300 text-sm">{description}</p>
    </motion.div>
  )
}

function StepCard({ number, title, description }: Readonly<{ number: string, title: string, description: string }>) {
  return (
    <div className="flex flex-col items-center text-center space-y-3">
      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-strive-light/20 to-strive-primary/20 dark:from-strive-light/10 dark:to-strive-primary/30 flex items-center justify-center font-bold text-lg text-strive-primary dark:text-strive-light border border-strive-primary/10 dark:border-strive-light/10">
        <span className="font-brand">{number}</span>
      </div>
      <h3 className="font-semibold text-purple-900 dark:text-purple-300">{title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  )
}

function BenefitItem({ title, description }: Readonly<{ title: string, description: string }>) {
  return (
    <div className="flex">
      <div className="flex-shrink-0 h-full">
        <div className="w-2.5 h-2.5 bg-gradient-to-r from-strive-primary to-indigo-600 dark:from-strive-light dark:to-indigo-400 rounded-full mt-1.5 mr-3"></div>
      </div>
      <div>
        <h4 className="font-medium text-strive-primary dark:text-strive-light">{title}</h4>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{description}</p>
      </div>
    </div>
  )
}

function TechCard({ icon, title, description }: Readonly<{ icon: React.ReactNode, title: string, description: string }>) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      className="bg-white dark:bg-gray-800/70 p-5 rounded-xl border border-gray-200 dark:border-gray-700/30 flex flex-col h-full"
    >
      <div className="mb-3 flex justify-center items-center">
        {icon}
      </div>
      <h3 className="text-md font-semibold text-strive-primary dark:text-strive-light mb-1 text-center">{title}</h3>
      <p className="text-xs text-gray-600 dark:text-gray-400 text-center">{description}</p>
    </motion.div>
  )
}
