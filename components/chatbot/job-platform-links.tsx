'use client'

import React from 'react'
import { ExternalLinkIcon, CheckIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

// Define types for job platforms
interface JobPlatform {
  name: string
  url: string
  logo: string
  description: string
  primaryColor: string
  secondaryColor: string
}

interface JobPlatformLinksProps {
  readonly onClose?: () => void
}

// List of popular job search platforms
const jobPlatforms: JobPlatform[] = [
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/jobs',
    logo: 'https://content.linkedin.com/content/dam/me/business/en-us/amp/brand-site/v2/bg/LI-Bug.svg.original.svg',
    description: 'Professional networking and job search platform',
    primaryColor: '#0077B5',
    secondaryColor: '#e6f2f9'
  },
  {
    name: 'Indeed',
    url: 'https://www.indeed.co.uk',
    logo: 'https://www.indeed.com/profile/ember-app/assets/images/indeed-logo.svg',
    description: 'One of the largest job search engines',
    primaryColor: '#003A9B',
    secondaryColor: '#e6eaf5'
  },
  {
    name: 'Reed',
    url: 'https://www.reed.co.uk',
    logo: 'https://www.reed.co.uk/resources/images/reed-logo.svg',
    description: 'UK\'s #1 job site with thousands of jobs',
    primaryColor: '#D71921',
    secondaryColor: '#fbe6e7'
  },
  {
    name: 'Totaljobs',
    url: 'https://www.totaljobs.com',
    logo: 'https://d1hbpr09pwz0sk.cloudfront.net/logo_url/totaljobs-group-ltd-9ace0c1b',
    description: 'Search thousands of UK jobs across all sectors',
    primaryColor: '#E91E63',
    secondaryColor: '#fde8ef'
  },
  {
    name: 'CV-Library',
    url: 'https://www.cv-library.co.uk',
    logo: 'https://www.cv-library.co.uk/assets/images/logos/logotype.svg',
    description: 'UK\'s leading independent job board',
    primaryColor: '#1c6db5',
    secondaryColor: '#e7f0f9'
  },
  {
    name: 'Guardian Jobs',
    url: 'https://jobs.theguardian.com',
    logo: 'https://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2015/8/18/1439911407560/guardian-jobs-logo.png',
    description: 'Quality jobs from The Guardian newspaper',
    primaryColor: '#052962',
    secondaryColor: '#e6eaef'
  }
]

export function JobPlatformLinks({ onClose }: JobPlatformLinksProps) {
  const [visitedSites, setVisitedSites] = React.useState<Record<string, boolean>>({})
  
  const handleVisit = (platform: JobPlatform) => {
    window.open(platform.url, '_blank')
    setVisitedSites(prev => ({ ...prev, [platform.name]: true }))
  }
  
  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          Job Search Platforms
        </h3>
        {onClose && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            Close
          </Button>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {jobPlatforms.map((platform, index) => (
          <motion.div
            key={platform.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="relative bg-white dark:bg-gray-850 rounded-lg border border-gray-200 dark:border-gray-700 p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="absolute top-2 right-2">
              {visitedSites[platform.name] ? (
                <CheckIcon className="h-4 w-4 text-green-500" />
              ) : null}
            </div>
            
            <div className="flex flex-col h-full">
              <div className="flex items-center mb-3">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center mr-3"
                  style={{ backgroundColor: platform.secondaryColor }}
                >
                  <div 
                    className="w-6 h-6 bg-center bg-no-repeat bg-contain"
                    style={{ backgroundImage: `url(${platform.logo})` }}
                  />
                </div>
                <h4 className="font-medium text-lg">{platform.name}</h4>
              </div>
              
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 flex-grow">
                {platform.description}
              </p>
              
              <Button
                onClick={() => handleVisit(platform)}
                className="w-full mt-2"
                style={{ 
                  backgroundColor: platform.primaryColor,
                  borderColor: platform.primaryColor
                }}
              >
                <ExternalLinkIcon className="h-4 w-4 mr-2" /> 
                Visit Site
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
      
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 text-center">
        These platforms can help you find job opportunities that match your skills and experience.
      </p>
    </div>
  )
}
