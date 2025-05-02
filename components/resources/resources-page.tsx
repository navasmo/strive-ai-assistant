'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ExternalLinkIcon, BriefcaseIcon, HeartIcon, CheckIcon, 
        BookOpenIcon, GraduationCapIcon, TimerIcon, TargetIcon,
        BarChart3Icon, TrendingUpIcon, SearchIcon, XIcon,
        LightbulbIcon, BrainIcon, SparklesIcon } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { generateId } from '@/lib/utils'
import { BreathingExercise } from '@/components/chatbot/breathing-exercise'
import { CareerAssessment } from '@/components/chatbot/career-assessment'
import { careerResources, wellbeingResources } from '@/lib/resources'

// Define types for resource platforms
interface ResourcePlatform {
  name: string;
  url: string;
  logo: string;
  description: string;
  primaryColor: string;
  secondaryColor: string;
}

// Job platforms data
const jobPlatforms: ResourcePlatform[] = [
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/jobs',
    logo: '/images/linked.png',
    description: 'Professional networking and job search platform',
    primaryColor: '#0077B5',
    secondaryColor: '#e6f2f9'
  },
  {
    name: 'Indeed',
    url: 'https://www.indeed.co.uk',
    logo: '/images/indeed.png',
    description: 'One of the largest job search engines',
    primaryColor: '#003A9B',
    secondaryColor: '#e6eaf5'
  },
  {
    name: 'Reed',
    url: 'https://www.reed.co.uk',
    logo: '/images/reed.png',
    description: 'UK\'s #1 job site with thousands of jobs',
    primaryColor: '#D71921',
    secondaryColor: '#fbe6e7'
  },
  {
    name: 'Totaljobs',
    url: 'https://www.totaljobs.com',
    logo: '/images/total.png',
    description: 'Search thousands of UK jobs across all sectors',
    primaryColor: '#E91E63',
    secondaryColor: '#fde8ef'
  },
  {
    name: 'Glassdoor',
    url: 'https://www.glassdoor.co.uk',
    logo: '/images/glassdoor.png',
    description: 'Job listings with company reviews and salary insights',
    primaryColor: '#0caa41',
    secondaryColor: '#e5f7ec'
  }
];

// Wellbeing platforms data
const wellbeingPlatforms: ResourcePlatform[] = [
  {
    name: 'Headspace',
    url: 'https://www.headspace.com',
    logo: '/images/headspace.png',
    description: 'Meditation and mindfulness app for better mental health',
    primaryColor: '#F47C30',
    secondaryColor: '#fdf0e9'
  },
  {
    name: 'Calm',
    url: 'https://www.calm.com',
    logo: '/images/calm.png',
    description: 'App for sleep, meditation and relaxation',
    primaryColor: '#4287f5',
    secondaryColor: '#ebf2fd'
  },
  {
    name: 'Wysa',
    url: 'https://www.wysa.io',
    logo: '/images/wysa.png',
    description: 'AI chatbot for emotional support and wellbeing',
    primaryColor: '#6236FF',
    secondaryColor: '#eeeaff'
  },
  {
    name: 'Happify',
    url: 'https://www.happify.com',
    logo: '/images/Happify.png',
    description: 'Science-based activities and games for wellbeing',
    primaryColor: '#30c5ff',
    secondaryColor: '#e9f8ff'
  }
];

const ResourceCard = ({ platform }: { readonly platform: ResourcePlatform }) => {
  const [visited, setVisited] = React.useState(false);
  
  const handleVisit = () => {
    window.open(platform.url, '_blank');
    setVisited(true);
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="relative bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 shadow-sm hover:shadow-md transition-all h-full flex flex-col hover:border-strive-primary/30 dark:hover:border-strive-light/30 group"
      whileHover={{ y: -3 }}
    >
      <div className="absolute top-2 right-2">
        {visited && <CheckIcon className="h-4 w-4 text-green-500" />}
      </div>
      
      <div className="flex items-center mb-3">
        <div 
          className="w-12 h-12 rounded-lg flex items-center justify-center mr-3 bg-gray-50 dark:bg-gray-700 p-1 border border-gray-100 dark:border-gray-600"
        >
          {/* Using local image paths */}
          <img 
            src={platform.logo} 
            alt={`${platform.name} logo`} 
            className="w-9 h-9 object-contain"
          />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100">{platform.name}</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 max-w-[200px] truncate group-hover:text-strive-primary dark:group-hover:text-strive-light transition-colors">
            {platform.description}
          </p>
        </div>
      </div>
      
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-6 flex-grow">
        {platform.description.length > 80 ? platform.description.substring(0, 80) + '...' : platform.description}
      </p>
      
      <div className="mt-auto flex justify-between items-center">
        <span className="text-xs text-gray-400 dark:text-gray-500 italic">
          {visited ? 'Previously visited' : 'External resource'}
        </span>
        <Button
          onClick={handleVisit}
          variant="ghost"
          size="sm"
          className="text-strive-primary dark:text-strive-light hover:bg-strive-primary/5 dark:hover:bg-strive-light/5 rounded-full group-hover:translate-x-1 transition-transform"
        >
          <span className="mr-1 text-sm">Visit</span>
          <ExternalLinkIcon className="h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  )
}

// Resource link card for text-based resources
const ResourceLinkCard = ({ title, url, description, icon: Icon }: { 
  readonly title: string;
  readonly url: string;
  readonly description: string;
  readonly icon: React.ElementType;
}) => {
  const [visited, setVisited] = React.useState(false);
  
  const handleVisit = () => {
    window.open(url, '_blank');
    setVisited(true);
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="relative bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 shadow-sm hover:shadow-md transition-all h-full flex flex-col hover:border-strive-primary/30 dark:hover:border-strive-light/30 group"
      whileHover={{ y: -3 }}
    >
      <div className="absolute top-2 right-2">
        {visited && <CheckIcon className="h-4 w-4 text-green-500" />}
      </div>
      
      <div className="flex items-center mb-3">
        <div className="w-10 h-10 rounded-full flex items-center justify-center mr-3 bg-gradient-to-br from-strive-light/10 to-strive-primary/10 dark:from-strive-light/5 dark:to-strive-primary/20 text-strive-primary dark:text-strive-light border border-strive-primary/10 dark:border-strive-light/10">
          <Icon className="h-5 w-5" />
        </div>
        <h3 className="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-strive-primary dark:group-hover:text-strive-light transition-colors">{title}</h3>
      </div>
      
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-6 flex-grow">
        {description.length > 80 ? description.substring(0, 80) + '...' : description}
      </p>
      
      <div className="mt-auto flex justify-between items-center">
        <span className="text-xs text-gray-400 dark:text-gray-500 italic">
          {visited ? 'Previously visited' : 'External resource'}
        </span>
        <Button
          onClick={handleVisit}
          variant="ghost"
          size="sm"
          className="text-strive-primary dark:text-strive-light hover:bg-strive-primary/5 dark:hover:bg-strive-light/5 rounded-full group-hover:translate-x-1 transition-transform"
        >
          <span className="mr-1 text-sm">View</span>
          <ExternalLinkIcon className="h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  )
}

// Interactive Tool Card that expands to full view
const InteractiveToolCard = ({ 
  title, 
  description, 
  icon: Icon, 
  color,
  children 
}: { 
  readonly title: string;
  readonly description: string;
  readonly icon: React.ElementType;
  readonly color: string;
  readonly children: React.ReactNode;
}) => {
  const [expanded, setExpanded] = React.useState(false);
  
  return (
    <>
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center p-4"
            onClick={() => setExpanded(false)}
          >
            <motion.div 
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              exit={{ y: 50 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-white dark:bg-gray-800 z-10 flex justify-between items-center px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center mr-3 bg-gradient-to-br from-strive-light/10 to-strive-primary/10 dark:from-strive-light/5 dark:to-strive-primary/20 text-strive-primary dark:text-strive-light border border-strive-primary/10 dark:border-strive-light/10"
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h2>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setExpanded(false)}
                  className="rounded-full"
                >
                  <XIcon className="h-5 w-5" />
                </Button>
              </div>
              <div className="p-6">
                {children}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    
      <motion.div
        whileHover={{ y: -3, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
        transition={{ duration: 0.2 }}
        className="relative bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md hover:border-strive-primary/30 dark:hover:border-strive-light/30 cursor-pointer h-full flex flex-col overflow-hidden min-h-[160px] group"
        onClick={() => setExpanded(true)}
      >
        <div 
          className="w-full py-3 px-4 mb-1 flex items-center"
        >
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center mr-2 bg-gradient-to-br from-strive-light/10 to-strive-primary/10 dark:from-strive-light/5 dark:to-strive-primary/20 text-strive-primary dark:text-strive-light border border-strive-primary/10 dark:border-strive-light/10"
          >
            <Icon className="h-4 w-4" />
          </div>
          <h4 className="font-medium text-sm text-gray-900 dark:text-white group-hover:text-strive-primary dark:group-hover:text-strive-light transition-colors">{title}</h4>
        </div>
        
        <p className="text-xs text-gray-600 dark:text-gray-300 px-4 py-2 flex-grow">
          {description.length > 80 ? description.substring(0, 80) + '...' : description}
        </p>
        
        <div className="mt-auto flex justify-end px-4 py-3 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center text-strive-primary dark:text-strive-light text-xs font-medium">
            <span>Open tool</span>
            <div className="ml-1 w-5 h-5 rounded-full bg-strive-primary/10 dark:bg-strive-light/10 flex items-center justify-center group-hover:translate-x-1 transition-transform">
              <Icon className="h-3 w-3" />
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export function ResourcesPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
        Resources
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
        A collection of helpful tools for your career and wellbeing journey
      </p>

      <Tabs 
        defaultValue="career" 
        className="w-full"
      >
        <TabsList className="mb-8 w-full max-w-md mx-auto grid grid-cols-2 h-14 bg-purple-50 dark:bg-purple-900/20 p-1.5 rounded-xl shadow-sm">
          <TabsTrigger 
            value="career" 
            className="flex items-center justify-center h-full rounded-lg text-base font-medium transition-all
            data-[state=active]:bg-gradient-to-b data-[state=active]:from-purple-500 data-[state=active]:to-purple-600 
            data-[state=active]:text-white data-[state=active]:shadow-md"
          >
            <BriefcaseIcon className="h-5 w-5 mr-2" />
            Career Resources
          </TabsTrigger>
          <TabsTrigger 
            value="wellbeing" 
            className="flex items-center justify-center h-full rounded-lg text-base font-medium transition-all
            data-[state=active]:bg-gradient-to-b data-[state=active]:from-green-500 data-[state=active]:to-green-600 
            data-[state=active]:text-white data-[state=active]:shadow-md"
          >
            <HeartIcon className="h-5 w-5 mr-2" />
            Wellbeing Resources
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="career" className="mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 mt-3">
            {/* Main Content - Left Column */}
            <div className="lg:col-span-8 order-2 lg:order-1">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200 flex items-center">
                <BriefcaseIcon className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
                Job Search Platforms
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-5">
                Find job opportunities matching your skills and experience.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {jobPlatforms.map((platform) => (
                  <ResourceCard key={generateId()} platform={platform} />
                ))}
              </div>
              
              {/* Career Resources from NCS */}
              <div className="mt-12">
                <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200 flex items-center">
                  <BookOpenIcon className="h-5 w-5 mr-2 text-purple-600 dark:text-purple-400" />
                  Career Development
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-5">
                  Develop your skills and advance your career with these resources.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {careerResources.map((resource, index) => {
                    // Assign icons based on category
                    let icon = SearchIcon;
                    if (resource.category === 'assessment') icon = BarChart3Icon;
                    if (resource.category === 'exploration') icon = SearchIcon;
                    if (resource.category === 'applications') icon = TrendingUpIcon;
                    if (resource.category === 'development') icon = GraduationCapIcon;
                    if (resource.category === 'support') icon = BookOpenIcon;
                    
                    return (
                      <ResourceLinkCard 
                        key={resource.id}
                        title={resource.title}
                        url={resource.url}
                        description={resource.description}
                        icon={icon}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
            
            {/* Interactive Tools - Right Column */}
            <div className="lg:col-span-4 order-1 lg:order-2">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200 flex items-center">
                <SparklesIcon className="h-5 w-5 mr-2 text-purple-600 dark:text-purple-400" />
                Interactive Tools
              </h2>
              <p className="text-purple-700 dark:text-purple-300 mb-5 font-medium">
                Try these tools for your career planning.
              </p>
              
              <div className="grid grid-cols-2 lg:grid-cols-1 gap-3 lg:sticky lg:top-24">
                <div>
                  <InteractiveToolCard
                    title="Career Assessment"
                    description="Discover potential career paths based on your interests, skills, values, and personality."
                    icon={BarChart3Icon}
                    color="#7c3aed"
                  >
                    <CareerAssessment />
                  </InteractiveToolCard>
                </div>
                <div>
                  <InteractiveToolCard
                    title="Skills Explorer"
                    description="Identify your transferable skills and see how they apply to different careers."
                    icon={LightbulbIcon}
                    color="#2563eb"
                  >
                    <div className="p-8 text-center">
                      <h3 className="text-xl font-medium mb-4">Coming Soon</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        We're working on adding more interactive career tools. Check back soon!
                      </p>
                    </div>
                  </InteractiveToolCard>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="wellbeing" className="mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 mt-3">
            {/* Main Content - Left Column */}
            <div className="lg:col-span-8 order-2 lg:order-1">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200 flex items-center">
                <HeartIcon className="h-5 w-5 mr-2 text-pink-600 dark:text-pink-400" />
                Wellbeing Apps & Services
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-5">
                Tools to support your mental health and wellbeing.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {wellbeingPlatforms.map((platform) => (
                  <ResourceCard key={generateId()} platform={platform} />
                ))}
              </div>
              
              {/* Wellbeing resources from NHS */}
              <div className="mt-12">
                <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200 flex items-center">
                  <HeartIcon className="h-5 w-5 mr-2 text-green-600 dark:text-green-400" />
                  NHS Mental Health Resources
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-5">
                  Official NHS resources for mental health support.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {wellbeingResources.map((resource, index) => {
                    // Assign icons based on category
                    let icon = HeartIcon;
                    if (resource.category === 'mental_health') icon = HeartIcon;
                    if (resource.category === 'work_life_balance') icon = TargetIcon;
                    if (resource.category === 'techniques') icon = TimerIcon;
                    if (resource.category === 'support') icon = BookOpenIcon;
                    
                    return (
                      <ResourceLinkCard 
                        key={resource.id}
                        title={resource.title}
                        url={resource.url}
                        description={resource.description}
                        icon={icon}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
            
            {/* Interactive Tools - Right Column */}
            <div className="lg:col-span-4 order-1 lg:order-2">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200 flex items-center">
                <SparklesIcon className="h-5 w-5 mr-2 text-green-600 dark:text-green-400" />
                Interactive Tools
              </h2>
              <p className="text-green-700 dark:text-green-300 mb-5 font-medium">
                Exercises to help manage stress and anxiety.
              </p>
              
              <div className="grid grid-cols-2 lg:grid-cols-1 gap-3 lg:sticky lg:top-24">
                <div>
                  <InteractiveToolCard
                    title="Breathing Exercise"
                    description="Follow this guided breathing technique to reduce anxiety and promote relaxation."
                    icon={TimerIcon}
                    color="#10b981"
                  >
                    <BreathingExercise />
                  </InteractiveToolCard>
                </div>
                <div>
                  <InteractiveToolCard
                    title="Mindfulness Guide"
                    description="Learn and practice mindfulness techniques to improve focus and reduce stress."
                    icon={BrainIcon}
                    color="#8b5cf6"
                  >
                    <div className="p-8 text-center">
                      <h3 className="text-xl font-medium mb-4">Coming Soon</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        We're working on adding more interactive wellbeing tools. Check back soon!
                      </p>
                    </div>
                  </InteractiveToolCard>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="text-center mt-24 text-sm text-purple-600 dark:text-purple-400">
        <p>
          Strive aims to provide helpful resources, but does not endorse any specific platform.
          Always do your own research before using any service.
        </p>
      </div>
    </div>
  );
}
